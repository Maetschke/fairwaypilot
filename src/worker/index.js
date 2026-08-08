import { HTML, LANDING_HTML, IMPRESSUM_HTML, DATENSCHUTZ_HTML, AGB_HTML } from './pages.generated.js';
import { ICON_180, ICON_192, ICON_512, ICON_32, ICON_MARK, iconResponse } from './icons.js';
import { handleWind } from './wind.js';
import { handleResearch } from './research.js';
import { handleAccountDelete } from './account.js';

const MANIFEST_JSON = JSON.stringify({
  name: "FairwayPilot",
  short_name: "FairwayPilot",
  start_url: "/",
  display: "standalone",
  background_color: "#F5F8F0",
  theme_color: "#1F8A4D",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
  ]
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/build-check") { return new Response("src-build-ok v1", { headers: { "content-type": "text/plain" } }); }
    if (url.pathname === "/start" || url.pathname === "/landing") {
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
    if (url.pathname === "/api/wind") {
      return handleWind(url);
    }
    if (url.pathname === "/health") {
      return new Response("ok v9-sisync-filter", { headers: { "content-type": "text/plain" } });
    }
    if (url.pathname === "/api/research" && request.method === "POST") {
      return handleResearch(request, env);
    }
    if (url.pathname === "/api/account/delete" && request.method === "POST") {
      return handleAccountDelete(request, env);
    }
    if (url.pathname === "/apple-touch-icon.png" || url.pathname === "/apple-touch-icon-precomposed.png" || url.pathname === "/icon-180.png") {
      return iconResponse(ICON_180);
    }
    if (url.pathname === "/icon-192.png") {
      return iconResponse(ICON_192);
    }
    if (url.pathname === "/icon-512.png") {
      return iconResponse(ICON_512);
    }
    if (url.pathname === "/favicon.png" || url.pathname === "/favicon.ico" || url.pathname === "/icon-32.png") {
      return iconResponse(ICON_32);
    }
    if (url.pathname === "/logo-mark.png") {
      return iconResponse(ICON_MARK);
    }
    if (url.pathname === "/manifest.json") {
      return new Response(MANIFEST_JSON, { headers: { "content-type": "application/manifest+json; charset=utf-8" } });
    }
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-cache",
        "x-content-type-options": "nosniff",
        "referrer-policy": "strict-origin-when-cross-origin"
      }
    });
  }
};
