/* Golfplaetze in Deutschland ueber Overpass (OpenStreetMap). Serverseitig, damit die
   Nutzer-IP nicht bei Overpass landet. Robust: mehrere Overpass-Spiegel als Fallback,
   nur GUELTIGE Ergebnisse (>50) werden im Edge-Cache (caches.default) abgelegt. So kann
   ein einzelner kaputter/leerer Overpass-Response nicht 24h haengenbleiben. */
async function handleCourses(url) {
  const cache = caches.default;
  const cacheKey = new Request("https://fairwaypilot.com/__courses_cache_v3");
  try { const hit = await cache.match(cacheKey); if (hit) return hit; } catch (e) {}

  const bbox = "47.2,5.8,55.15,15.25";
  const q = "[out:json][timeout:55];("
    + 'way["leisure"="golf_course"](' + bbox + ");"
    + 'relation["leisure"="golf_course"](' + bbox + ");"
    + 'node["leisure"="golf_course"](' + bbox + ");"
    + ");out center tags;";
  const mirrors = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.private.coffee/api/interpreter"
  ];
  let out = null, lastErr = "no mirror";
  for (const base of mirrors) {
    try {
      const r = await fetch(base + "?data=" + encodeURIComponent(q), {
        headers: { "User-Agent": "FairwayPilot/1.0 (+https://fairwaypilot.com)" }
      });
      if (!r.ok) { lastErr = "upstream " + r.status + " @" + base; continue; }
      const j = await r.json();
      const els = (j && j.elements) || [];
      const arr = [], seen = {};
      for (const el of els) {
        const t = el.tags || {};
        const name = t.name || t["name:de"] || "";
        if (!name) continue;
        const lat = el.lat != null ? el.lat : (el.center ? el.center.lat : null);
        const lon = el.lon != null ? el.lon : (el.center ? el.center.lon : null);
        if (lat == null || lon == null) continue;
        const key = name.toLowerCase() + "@" + lat.toFixed(2) + "," + lon.toFixed(2);
        if (seen[key]) continue; seen[key] = 1;
        let holes = null;
        const h = t["golf:holes"] || t["holes"];
        if (h) { const n = parseInt(h, 10); if (isFinite(n) && n > 0 && n < 100) holes = n; }
        arr.push({ ref: "osm:" + el.type[0] + el.id, name: name, lat: +lat.toFixed(5), lon: +lon.toFixed(5), holes: holes });
      }
      if (arr.length > 50) { out = arr; break; }
      lastErr = "too few (" + arr.length + ") @" + base;
    } catch (e) { lastErr = String((e && e.message) || e) + " @" + base; }
  }

  if (!out) {
    return new Response(JSON.stringify({ error: lastErr, courses: [] }), {
      status: 502, headers: { "content-type": "application/json; charset=utf-8" } });
  }
  out.sort(function (a, b) { return a.name.localeCompare(b.name); });
  const body = JSON.stringify({ courses: out, count: out.length });
  const resp = new Response(body, {
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=86400" } });
  try { await cache.put(cacheKey, resp.clone()); } catch (e) {}
  return resp;
}
export { handleCourses };
