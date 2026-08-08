async function handleAccountDelete(request, env) {
  const cors = { "content-type": "application/json; charset=utf-8" };
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) {
    return new Response(JSON.stringify({ error: "Nicht angemeldet." }), { status: 401, headers: cors });
  }
  const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return new Response(JSON.stringify({ error: "Server ist nicht fuer die Kontoloeschung konfiguriert (kein Service-Role-Key hinterlegt)." }), { status: 500, headers: cors });
  }
  const SB_URL = "https://qzeesflibjxkdorvxqyf.supabase.co";
  const SB_ANON = "sb_publishable_vjpHBU2YE30WznFuaDoyWg_fxVmNDbW";

  let uid;
  try {
    const userResp = await fetch(SB_URL + "/auth/v1/user", {
      headers: { "Authorization": "Bearer " + token, "apikey": SB_ANON }
    });
    if (!userResp.ok) {
      return new Response(JSON.stringify({ error: "Sitzung ungueltig oder abgelaufen. Bitte neu anmelden und erneut versuchen." }), { status: 401, headers: cors });
    }
    const userJson = await userResp.json();
    uid = userJson && userJson.id;
    if (!uid) throw new Error("Keine User-ID gefunden.");
  } catch (e) {
    return new Response(JSON.stringify({ error: "Verifizierung fehlgeschlagen: " + (e && e.message ? e.message : String(e)) }), { status: 401, headers: cors });
  }

  const svcHeaders = {
    "apikey": serviceKey,
    "Authorization": "Bearer " + serviceKey,
    "content-type": "application/json"
  };

  try {
    await fetch(SB_URL + "/rest/v1/rounds?user_id=eq." + uid, { method: "DELETE", headers: svcHeaders });
    await fetch(SB_URL + "/rest/v1/courses?user_id=eq." + uid, { method: "DELETE", headers: svcHeaders });
    await fetch(SB_URL + "/rest/v1/player_links?owner_id=eq." + uid, { method: "DELETE", headers: svcHeaders });
    await fetch(SB_URL + "/rest/v1/player_links?linked_user_id=eq." + uid, { method: "DELETE", headers: svcHeaders });

    try {
      const listResp = await fetch(SB_URL + "/storage/v1/object/list/avatars", {
        method: "POST",
        headers: svcHeaders,
        body: JSON.stringify({ prefix: uid, limit: 100 })
      });
      if (listResp.ok) {
        const files = await listResp.json();
        const names = (Array.isArray(files) ? files : []).map(function (f) { return f.name; }).filter(Boolean).map(function (n) { return "avatars/" + n; });
        if (names.length) {
          await fetch(SB_URL + "/storage/v1/object/", {
            method: "DELETE",
            headers: svcHeaders,
            body: JSON.stringify({ prefixes: names })
          });
        }
      }
    } catch (e) { /* best effort, Storage-Aufraeumen darf Kontoloeschung nicht blockieren */ }

    const delResp = await fetch(SB_URL + "/auth/v1/admin/users/" + uid, {
      method: "DELETE",
      headers: svcHeaders
    });
    if (!delResp.ok) {
      const errText = await delResp.text();
      throw new Error("Auth-Konto konnte nicht geloescht werden: " + errText.slice(0, 300));
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Loeschung fehlgeschlagen: " + (e && e.message ? e.message : String(e)) }), { status: 500, headers: cors });
  }
}

export { handleAccountDelete };
