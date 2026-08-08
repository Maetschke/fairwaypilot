/* Hoehendaten fuer "Entfernung & KI" ueber Open-Meteo Elevation. Wie Wind/Wetter bewusst
   serverseitig: Open-Meteo sieht nur die Worker-IP. Zwei Punkte (Standort + Ziel) in einem
   Aufruf; Koordinaten auf 5 Nachkommastellen (rund 1 m) gerundet - fuer Hoehen sinnvoll
   feiner als beim Wind. */
async function handleElev(url) {
  const p = ["lat1","lng1","lat2","lng2"].map((k) => Number(url.searchParams.get(k)));
  const [la1, ln1, la2, ln2] = p;
  if (p.some((v) => !isFinite(v)) || Math.abs(la1) > 90 || Math.abs(la2) > 90 || Math.abs(ln1) > 180 || Math.abs(ln2) > 180) {
    return new Response(JSON.stringify({ error: "bad_coords" }), {
      status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
  }
  const src = "https://api.open-meteo.com/v1/elevation?latitude=" +
    la1.toFixed(5) + "," + la2.toFixed(5) + "&longitude=" + ln1.toFixed(5) + "," + ln2.toFixed(5);
  try {
    const r = await fetch(src, { cf: { cacheTtl: 86400, cacheEverything: true } });
    if (!r.ok) throw new Error("upstream " + r.status);
    const j = await r.json();
    const e = (j && j.elevation) ? j.elevation : [];
    if (e.length < 2) throw new Error("no_elevation");
    return new Response(JSON.stringify({ a: e[0], b: e[1] }), {
      headers: { "content-type": "application/json; charset=utf-8",
                 "cache-control": "public, max-age=86400" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e && e.message || e) }), {
      status: 502, headers: { "content-type": "application/json; charset=utf-8" } });
  }
}

export { handleElev };
