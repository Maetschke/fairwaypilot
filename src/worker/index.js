import { HTML, LANDING_HTML, IMPRESSUM_HTML, DATENSCHUTZ_HTML, AGB_HTML, SW_JS } from './pages.generated.js';
import { handleWind } from './wind.js';
import { handleWx } from './wx.js';
import { handleElev } from './elev.js';
import { handleDgm } from './dgm.js';
import { handleCourses } from './courses.js';
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
    if (url.pathname === "/sw.js") {
      return new Response(SW_JS, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-cache" } });
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
