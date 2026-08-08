/* Windabruf ueber Open-Meteo. Bewusst serverseitig statt direkt aus dem Client:
   so sieht Open-Meteo nur die Worker-IP, nicht die des Spielers, und die Antwort
   laesst sich am Edge zwischenspeichern. Koordinaten werden auf drei Nachkommastellen
   gerundet (rund 110 m) - fuer Wind mehr als genau genug und deutlich datensparsamer. */
async function handleWind(url) {
  const lat = Number(url.searchParams.get("lat"));
  const lng = Number(url.searchParams.get("lng"));
  if (!isFinite(lat) || !isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return new Response(JSON.stringify({ error: "bad_coords" }), {
      status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
  }
  const la = lat.toFixed(3), ln = lng.toFixed(3);
  const src = "https://api.open-meteo.com/v1/forecast?latitude=" + la + "&longitude=" + ln +
    "&current=wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_2m" +
    "&wind_speed_unit=kmh&timezone=auto";
  try {
    const r = await fetch(src, { cf: { cacheTtl: 600, cacheEverything: true } });
    if (!r.ok) throw new Error("upstream " + r.status);
    const j = await r.json();
    const cur = j && j.current ? j.current : {};
    const out = {
      spd: cur.wind_speed_10m,
      dir: cur.wind_direction_10m,
      gust: cur.wind_gusts_10m,
      temp: cur.temperature_2m,
      at: cur.time || null
    };
    return new Response(JSON.stringify(out), {
      headers: { "content-type": "application/json; charset=utf-8",
                 "cache-control": "public, max-age=600" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e && e.message || e) }), {
      status: 502, headers: { "content-type": "application/json; charset=utf-8" } });
  }
}

export { handleWind };
