/* Golfplaetze in Deutschland ueber die Overpass-API (OpenStreetMap). Serverseitig,
   damit die Nutzer-IP nicht bei Overpass landet und die Antwort am Edge lange
   zwischengespeichert werden kann (Plaetze aendern sich selten). */
async function handleCourses(url) {
  const bbox = "47.2,5.8,55.15,15.25"; // Deutschland (grob)
  const q = "[out:json][timeout:60];("
    + 'way["leisure"="golf_course"](' + bbox + ");"
    + 'relation["leisure"="golf_course"](' + bbox + ");"
    + 'node["leisure"="golf_course"](' + bbox + ");"
    + ");out center tags;";
  const src = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(q);
  try {
    const r = await fetch(src, {
      cf: { cacheTtl: 86400, cacheEverything: true },
      headers: { "User-Agent": "FairwayPilot/1.0 (+https://fairwaypilot.com)" }
    });
    if (!r.ok) throw new Error("upstream " + r.status);
    const j = await r.json();
    const els = (j && j.elements) || [];
    const out = [], seen = {};
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
      out.push({ ref: "osm:" + el.type[0] + el.id, name: name, lat: +lat.toFixed(5), lon: +lon.toFixed(5), holes: holes });
    }
    out.sort(function (a, b) { return a.name.localeCompare(b.name); });
    return new Response(JSON.stringify({ courses: out, count: out.length }), {
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=86400" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e && e.message || e), courses: [] }), {
      status: 502, headers: { "content-type": "application/json; charset=utf-8" } });
  }
}
export { handleCourses };
