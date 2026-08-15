// FairwayPilot – Stripe-Abrechnung + Einlöse-Codes + Entitlement (Cloudflare Worker)
// Env-Variablen (Cloudflare → Workers → fairwaypilot → Variablen und Geheimnisse):
//   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_MONTHLY, STRIPE_PRICE_YEARLY,
//   SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, PUBLIC_BASE_URL (optional)

const JSON_H = { "content-type": "application/json; charset=utf-8" };
const j = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: JSON_H });

function baseUrl(env, request) {
  return env.PUBLIC_BASE_URL || new URL(request.url).origin;
}

// ---- kleine Helfer ----
function encodeForm(obj, prefix, out) {
  out = out || [];
  for (const k in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
    const v = obj[k];
    const key = prefix ? prefix + "[" + k + "]" : k;
    if (v === undefined || v === null) continue;
    if (typeof v === "object") encodeForm(v, key, out);
    else out.push(encodeURIComponent(key) + "=" + encodeURIComponent(v));
  }
  return out;
}
async function stripe(env, path, method, bodyObj) {
  const opt = {
    method: method || "GET",
    headers: {
      "Authorization": "Bearer " + env.STRIPE_SECRET_KEY,
      "content-type": "application/x-www-form-urlencoded",
    },
  };
  if (bodyObj) opt.body = encodeForm(bodyObj).join("&");
  const r = await fetch("https://api.stripe.com/v1/" + path, opt);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error("stripe " + path + ": " + (data.error && data.error.message || r.status));
  return data;
}
async function supa(env, path, method, bodyObj, extraHeaders) {
  const opt = {
    method: method || "GET",
    headers: Object.assign({
      "apikey": env.SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": "Bearer " + env.SUPABASE_SERVICE_ROLE_KEY,
      "content-type": "application/json",
    }, extraHeaders || {}),
  };
  if (bodyObj !== undefined) opt.body = JSON.stringify(bodyObj);
  const r = await fetch(env.SUPABASE_URL + "/rest/v1/" + path, opt);
  const txt = await r.text();
  let data = null; try { data = txt ? JSON.parse(txt) : null; } catch (e) { data = txt; }
  if (!r.ok) throw new Error("supabase " + path + ": " + r.status + " " + txt.slice(0, 200));
  return data;
}
// Nutzer aus dem Bearer-Token (Supabase Access Token) ermitteln
async function getUser(request, env) {
  const auth = request.headers.get("Authorization") || "";
  if (!auth.startsWith("Bearer ")) return null;
  const r = await fetch(env.SUPABASE_URL + "/auth/v1/user", {
    headers: { "apikey": env.SUPABASE_ANON_KEY, "Authorization": auth },
  });
  if (!r.ok) return null;
  const u = await r.json().catch(() => null);
  return (u && u.id) ? u : null;
}
async function upsertSub(env, row) {
  row.updated_at = new Date().toISOString();
  return supa(env, "subscriptions?on_conflict=user_id", "POST", [row], {
    "Prefer": "resolution=merge-duplicates,return=minimal",
  });
}
async function readSub(env, userId) {
  const rows = await supa(env, "subscriptions?user_id=eq." + userId + "&select=*", "GET");
  return (Array.isArray(rows) && rows[0]) || null;
}
function isPremium(sub) {
  if (!sub) return false;
  if (!(sub.status === "active" || sub.status === "trialing")) return false;
  if (!sub.current_period_end) return true;
  return new Date(sub.current_period_end).getTime() > Date.now();
}

// ================= öffentliche Entitlement-Prüfung (für Client) =================
// GET /api/entitlement  -> { premium, plan, status, current_period_end, free: {swing_left, research_left} }
async function handleEntitlement(request, env) {
  const user = await getUser(request, env);
  if (!user) return j({ premium: false, status: "anon" }, 200);
  const sub = await readSub(env, user.id).catch(() => null);
  const premium = isPremium(sub);
  let swingLeft = 1, researchLeft = 1;
  if (!premium) {
    const period = new Date().toISOString().slice(0, 7);
    const cnts = await supa(env, "usage_counters?user_id=eq." + user.id + "&select=metric,period,count", "GET").catch(() => []);
    (cnts || []).forEach((c) => {
      if (c.metric === "swing_analysis" && c.period === period) swingLeft = Math.max(0, 1 - c.count);
      if (c.metric === "course_research" && c.period === "total") researchLeft = Math.max(0, 1 - c.count);
    });
  }
  return j({
    premium: premium, plan: sub && sub.plan || null, status: sub && sub.status || "none",
    current_period_end: sub && sub.current_period_end || null,
    free: { swing_left: premium ? null : swingLeft, research_left: premium ? null : researchLeft },
  });
}

// Serverseitige Verbrauchsprüfung + Zählung (für Kostentreiber). metric: 'course_research'
// Gibt true zurück, wenn erlaubt (und zählt Free-Nutzung hoch); false, wenn Limit erreicht.
async function consumeQuota(env, userId, metric, period) {
  const cnts = await supa(env, "usage_counters?user_id=eq." + userId + "&metric=eq." + metric + "&period=eq." + period + "&select=count", "GET").catch(() => []);
  const cur = (Array.isArray(cnts) && cnts[0]) ? cnts[0].count : 0;
  if (cur >= 1) return false;
  await supa(env, "usage_counters?on_conflict=user_id,metric,period", "POST",
    [{ user_id: userId, metric, period, count: cur + 1, updated_at: new Date().toISOString() }],
    { "Prefer": "resolution=merge-duplicates,return=minimal" }).catch(() => {});
  return true;
}
// Prüft, ob der Aufrufer die (kostentreibende) Recherche nutzen darf. Wird von research.js genutzt.
async function guardResearch(request, env) {
  const user = await getUser(request, env);
  if (!user) return { ok: false, code: 401, error: "Bitte anmelden." };
  const sub = await readSub(env, user.id).catch(() => null);
  if (isPremium(sub)) return { ok: true, premium: true };
  const allowed = await consumeQuota(env, user.id, "course_research", "total");
  if (!allowed) return { ok: false, code: 402, error: "Automatische Platzrecherche ist eine Premium-Funktion. Gratis ist ein Platz enthalten – dein Kontingent ist aufgebraucht." };
  return { ok: true, premium: false };
}

// ================= Checkout =================
async function handleCheckout(request, env) {
  const user = await getUser(request, env);
  if (!user) return j({ error: "Bitte anmelden." }, 401);
  let body = {}; try { body = await request.json(); } catch (e) {}
  if (body.waiver !== true) return j({ error: "Bitte der Zustimmung zum sofortigen Leistungsbeginn zustimmen." }, 400);
  const plan = body.plan === "monthly" ? "monthly" : "yearly";
  const price = plan === "monthly" ? env.STRIPE_PRICE_MONTHLY : env.STRIPE_PRICE_YEARLY;
  if (!price) return j({ error: "Kein Preis konfiguriert." }, 500);
  const sub = await readSub(env, user.id).catch(() => null);
  let customer = sub && sub.stripe_customer_id;
  if (!customer) {
    const c = await stripe(env, "customers", "POST", { email: user.email, metadata: { user_id: user.id } });
    customer = c.id;
    await upsertSub(env, { user_id: user.id, stripe_customer_id: customer, status: sub && sub.status || "none", plan: sub && sub.plan || null }).catch(() => {});
  }
  const origin = baseUrl(env, request);
  const _waiverAt = new Date().toISOString();
  const session = await stripe(env, "checkout/sessions", "POST", {
    mode: "subscription",
    customer: customer,
    client_reference_id: user.id,
    success_url: origin + "/app?abo=ok",
    cancel_url: origin + "/app?abo=abbruch",
    allow_promotion_codes: "true",
    line_items: { 0: { price: price, quantity: 1 } },
    subscription_data: { trial_period_days: 7, metadata: { user_id: user.id, withdrawal_waiver: "yes", waiver_at: _waiverAt } },
    metadata: { withdrawal_waiver: "yes", waiver_at: _waiverAt },
  });
  return j({ url: session.url });
}

// ================= Kundenportal (kündigen/Zahlmittel) =================
async function handlePortal(request, env) {
  const user = await getUser(request, env);
  if (!user) return j({ error: "Bitte anmelden." }, 401);
  const sub = await readSub(env, user.id).catch(() => null);
  if (!sub || !sub.stripe_customer_id) return j({ error: "Kein Abo vorhanden." }, 400);
  const origin = baseUrl(env, request);
  const ps = await stripe(env, "billing_portal/sessions", "POST", { customer: sub.stripe_customer_id, return_url: origin + "/app" });
  return j({ url: ps.url });
}

// ================= Einlöse-Code (Clubmitglieder) =================
async function handleRedeem(request, env) {
  const user = await getUser(request, env);
  if (!user) return j({ error: "Bitte anmelden." }, 401);
  let body = {}; try { body = await request.json(); } catch (e) {}
  const code = String(body.code || "").trim().toUpperCase();
  if (!code) return j({ error: "Bitte Code eingeben." }, 400);
  const rows = await supa(env, "redeem_codes?code=eq." + encodeURIComponent(code) + "&select=*", "GET").catch(() => []);
  const rc = (Array.isArray(rows) && rows[0]) || null;
  if (!rc || !rc.active) return j({ error: "Code ungültig." }, 404);
  if (rc.expires_at && new Date(rc.expires_at).getTime() < Date.now()) return j({ error: "Code abgelaufen." }, 410);
  if (rc.redeemed_count >= rc.max_redemptions) return j({ error: "Code bereits vollständig eingelöst." }, 409);
  // schon eingelöst?
  const already = await supa(env, "redemptions?user_id=eq." + user.id + "&code=eq." + encodeURIComponent(code) + "&select=code", "GET").catch(() => []);
  if (Array.isArray(already) && already.length) {
    // bereits eingelöst -> trotzdem als Premium bestätigen
    return j({ ok: true, already: true });
  }
  const end = rc.duration_days ? new Date(Date.now() + rc.duration_days * 864e5).toISOString() : "2099-12-31T00:00:00Z";
  await upsertSub(env, { user_id: user.id, status: "active", plan: rc.plan || "club", current_period_end: end });
  await supa(env, "redemptions", "POST", [{ user_id: user.id, code: code }], { "Prefer": "return=minimal" }).catch(() => {});
  await supa(env, "redeem_codes?code=eq." + encodeURIComponent(code), "PATCH", { redeemed_count: rc.redeemed_count + 1 }, { "Prefer": "return=minimal" }).catch(() => {});
  return j({ ok: true, plan: rc.plan || "club", current_period_end: end });
}

// ================= Stripe-Webhook =================
async function verifySig(payload, sigHeader, secret) {
  if (!sigHeader) return false;
  const parts = {}; sigHeader.split(",").forEach((p) => { const i = p.indexOf("="); if (i > 0) parts[p.slice(0, i)] = p.slice(i + 1); });
  const t = parts.t, v1 = parts.v1;
  if (!t || !v1) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(t + "." + payload));
  const hex = Array.from(new Uint8Array(mac)).map((b) => b.toString(16).padStart(2, "0")).join("");
  // zeitkonstanter Vergleich
  if (hex.length !== v1.length) return false;
  let diff = 0; for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}
async function handleWebhook(request, env) {
  const payload = await request.text();
  const ok = await verifySig(payload, request.headers.get("stripe-signature"), env.STRIPE_WEBHOOK_SECRET).catch(() => false);
  if (!ok) return new Response("bad signature", { status: 400 });
  let event = {}; try { event = JSON.parse(payload); } catch (e) { return new Response("bad json", { status: 400 }); }
  const obj = event.data && event.data.object || {};
  try {
    if (event.type === "checkout.session.completed") {
      const userId = obj.client_reference_id;
      if (userId && obj.subscription) {
        const s = await stripe(env, "subscriptions/" + obj.subscription, "GET");
        await upsertSub(env, subRow(userId, obj.customer, s));
      }
    } else if (event.type && event.type.indexOf("customer.subscription.") === 0) {
      const userId = (obj.metadata && obj.metadata.user_id) || null;
      let uid = userId;
      if (!uid) { const ex = await supa(env, "subscriptions?stripe_customer_id=eq." + obj.customer + "&select=user_id", "GET").catch(() => []); uid = (ex && ex[0] && ex[0].user_id) || null; }
      if (uid) await upsertSub(env, subRow(uid, obj.customer, obj));
    }
  } catch (e) { /* Fehler schlucken, Stripe wiederholt */ return new Response("err", { status: 200 }); }
  return new Response("ok", { status: 200 });
}
function subRow(userId, customer, s) {
  const item = (s.items && s.items.data && s.items.data[0]) || {};
  const status = s.status === "canceled" || s.status === "incomplete_expired" ? "canceled" : s.status;
  // Stripe hat current_period_end + interval ab API 2025-... auf die Item-Ebene verschoben;
  // wir lesen beide Stellen (neu zuerst, dann alt), damit es versionsuebergreifend stimmt.
  const interval = (item.price && item.price.recurring && item.price.recurring.interval)
    || (item.plan && item.plan.interval) || null;
  const plan = interval === "month" ? "monthly" : "yearly";
  const cpeUnix = item.current_period_end || s.current_period_end || s.trial_end || null;
  const cpe = cpeUnix ? new Date(cpeUnix * 1000).toISOString() : null;
  return { user_id: userId, status: status, plan: plan, stripe_customer_id: customer, stripe_subscription_id: s.id, current_period_end: cpe };
}

// ============ Kuendigungsbutton (§ 312k BGB) ============
async function handleCancelButton(request, env) {
  let body = {};
  try { body = await request.json(); } catch (e) {}
  const email = (body.email || "").trim();
  const name = (body.name || "").trim();
  const art = (body.art === "ausserordentlich") ? "ausserordentlich" : "ordentlich";
  const grund = (body.grund || "").trim().slice(0, 2000);
  const kundennr = (body.kundennr || "").trim().slice(0, 120);
  if (!email || email.indexOf("@") < 1 || !name) {
    return j({ ok: false, error: "Name und gültige E-Mail sind erforderlich." }, 400);
  }
  const ref = "K-" + (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase();
  const received_at = new Date().toISOString();
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const ua = (request.headers.get("User-Agent") || "").slice(0, 300);
  let matched_customer = null, matched_subscription = null;
  let effect = "kein aktives Abo zu dieser E-Mail gefunden – wird manuell geprüft";
  try {
    const cust = await stripe(env, "customers?email=" + encodeURIComponent(email) + "&limit=10");
    const list = (cust && cust.data) || [];
    for (const c of list) {
      const subs = await stripe(env, "subscriptions?customer=" + encodeURIComponent(c.id) + "&status=all&limit=10");
      const sd = (subs && subs.data) || [];
      const active = sd.find((x) => x.status === "active" || x.status === "trialing" || x.status === "past_due");
      if (active) {
        matched_customer = c.id; matched_subscription = active.id;
        if (!active.cancel_at_period_end) {
          await stripe(env, "subscriptions/" + active.id, "POST", { cancel_at_period_end: true });
        }
        effect = "Abo wird zum Ende der laufenden Abrechnungsperiode beendet";
        break;
      }
    }
  } catch (e) {
    effect = "Eingang erfasst – Verarbeitung erfolgt manuell";
  }
  try {
    await supa(env, "cancellation_requests", "POST",
      [{ email, name, art, grund, kundennr, matched_customer, matched_subscription, effect, ip, user_agent: ua, created_at: received_at }],
      { "Prefer": "return=minimal" });
  } catch (e) {}
  return j({ ok: true, ref, received_at, effect });
}

export { handleEntitlement, handleCheckout, handlePortal, handleRedeem, handleWebhook, guardResearch, handleCancelButton };
