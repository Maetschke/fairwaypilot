import { HTML, LANDING_HTML, RECHNER_HTML, IMPRESSUM_HTML, DATENSCHUTZ_HTML, AGB_HTML, KUENDIGEN_HTML, SW_JS, TRACER_HTML } from './pages.generated.js';
import { handleWind } from './wind.js';
import { handleWx } from './wx.js';
import { handleElev } from './elev.js';
import { handleDgm } from './dgm.js';
import { handleCourses } from './courses.js';
const FP_BUILD = '2026-08-18 · 07:15 · birdie-fit';
import { handleHoles } from './holes.js';
import { handleResearch } from './research.js';
import { handleAccountDelete } from './account.js';
import { handleEntitlement, handleCheckout, handlePortal, handleRedeem, handleWebhook, guardResearch, handleCancelButton } from './billing.js';

const MANIFEST_JSON = JSON.stringify({
  name: "FairwayPilot",
  short_name: "FairwayPilot",
  start_url: "/app",
  display: "standalone",
  orientation: "portrait",
  background_color: "#ECF2E4",
  theme_color: "#1F8A4D",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
  ]
});

// Privater Zugangscode fuer /rechner (bei Bedarf hier aendern):
const RECHNER_KEY = "fp-golf-2026";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Wurzel + /start + /landing zeigen die oeffentliche Marketing-/Firmenseite.
    // Die App laeuft unter /app (bzw. jeder sonstigen Route ueber den Default unten).
    if (url.pathname === "/" || url.pathname === "/start" || url.pathname === "/landing") {
      return new Response(LANDING_HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    if (url.pathname === "/impressum") {
      return new Response(IMPRESSUM_HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    if (url.pathname === "/datenschutz") {
      return new Response(DATENSCHUTZ_HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    if (url.pathname === "/agb") {
      return new Response(AGB_HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    if (url.pathname === "/kuendigen") {
      return new Response(KUENDIGEN_HTML, { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    if (url.pathname === "/tracer-test") {
      return new Response(TRACER_HTML, { headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex, nofollow", "cache-control": "no-store" } });
    }
    if (url.pathname === "/rechner") {
      if (url.searchParams.get("k") !== RECHNER_KEY) {
        return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
      }
      return new Response(RECHNER_HTML, { headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex, nofollow", "cache-control": "no-store" } });
    }
    if (url.pathname === "/api/wind") {
      return handleWind(url);
    }
    if (url.pathname === "/api/wx") {
      return handleWx(url);
    }
    if (url.pathname === "/api/elev") {
      return handleElev(url);
    }
    if (url.pathname === "/api/dgm") {
      return handleDgm(url);
    }
    if (url.pathname === "/api/courses") {
      return handleCourses(url);
    }
    if (url.pathname === "/api/holes") {
      return handleHoles(url);
    }
    if (url.pathname === "/sw.js") {
      return new Response(SW_JS, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-cache" } });
    }
    if (url.pathname === "/health") {
      return new Response("ok v9-sisync-filter", { headers: { "content-type": "text/plain" } });
    }
    const _jerr = (e) => new Response(JSON.stringify({ error: String((e && e.message) || e) }), { status: 500, headers: { "content-type": "application/json; charset=utf-8" } });
    if (url.pathname === "/api/entitlement" && request.method === "GET") {
      try { return await handleEntitlement(request, env); } catch (e) { return _jerr(e); }
    }
    if (url.pathname === "/api/checkout" && request.method === "POST") {
      try { return await handleCheckout(request, env); } catch (e) { return _jerr(e); }
    }
    if (url.pathname === "/api/portal" && request.method === "POST") {
      try { return await handlePortal(request, env); } catch (e) { return _jerr(e); }
    }
    if (url.pathname === "/api/kuendigen" && request.method === "POST") {
      try { return await handleCancelButton(request, env); } catch (e) { return _jerr(e); }
    }
    if (url.pathname === "/api/redeem" && request.method === "POST") {
      try { return await handleRedeem(request, env); } catch (e) { return _jerr(e); }
    }
    if (url.pathname === "/api/stripe/webhook" && request.method === "POST") {
      try { return await handleWebhook(request, env); } catch (e) { return _jerr(e); }
    }
    if (url.pathname === "/api/research" && request.method === "POST") {
      const g = await guardResearch(request, env);
      if (!g.ok) return new Response(JSON.stringify({ error: g.error }), { status: g.code, headers: { "content-type": "application/json; charset=utf-8" } });
      return handleResearch(request, env);
    }
    if (url.pathname === "/api/account/delete" && request.method === "POST") {
      return handleAccountDelete(request, env);
    }
    if (url.pathname === "/manifest.json") {
      return new Response(MANIFEST_JSON, { headers: { "content-type": "application/manifest+json; charset=utf-8" } });
    }
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store, no-cache, must-revalidate",
        "x-fp-build": FP_BUILD,
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin"
      }
    });
  }
};
