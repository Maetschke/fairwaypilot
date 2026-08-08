/* Wetter fuer das Radar-Overlay ueber Open-Meteo. Wie beim Wind bewusst serverseitig:
   Open-Meteo sieht nur die Worker-IP, nicht die des Spielers, und die Antwort laesst sich
   am Edge zwischenspeichern. Liefert die aktuellen Werte (Temp, Luftfeuchte, Wind) plus
   die naechsten Stunden (Temperatur, Niederschlag, Wettercode) fuer die Vorschauleiste.
   Das eigentliche Radarbild kommt aus RainViewer und wird direkt vom Client als Kachel-
   Layer geladen (Kachel-Requests brauchen zwingend die Client-IP). */
async function handleWx(url) {
  const lat = Number(url.searchParams.get("lat"));
  const lng = Number(url.searchParams.get("lng"));
  if (!isFinite(lat) || !isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return new Response(JSON.stringify({ error: "bad_coords" }), {
      status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
  }
  const la = lat.toFixed(3), ln = lng.toFixed(3);
  const src = "https://api.open-meteo.com/v1/forecast?latitude=" + la + "&longitude=" + ln +
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code" +
    "&hourly=temperature_2m,precipitation,precipitation_probability,weather_code" +
    "&wind_speed_unit=kmh&forecast_days=2&timezone=auto";
  try {
    const r = await fetch(src, { cf: { cacheTtl: 600, cacheEverything: true } });
    if (!r.ok) throw new Error("upstream " + r.status);
    const j = await r.json();
    const cur = (j && j.current) ? j.current : {};
    const H = (j && j.hourly) ? j.hourly : {};
    const times = H.time || [];
    const nowIso = (cur.time || "").slice(0, 13);
    let start = 0;
    for (let i = 0; i < times.length; i++) {
      if (times[i].slice(0, 13) >= nowIso) { start = i; break; }
    }
    const hours = [];
    for (let i = start; i < Math.min(start + 8, times.length); i++) {
      hours.push({
        t: times[i],
        temp: H.temperature_2m ? H.temperature_2m[i] : null,
        pop: H.precipitation_probability ? H.precipitation_probability[i] : null,
        mm: H.precipitation ? H.precipitation[i] : null,
        code: H.weather_code ? H.weather_code[i] : null
      });
    }
    const out = {
      temp: cur.temperature_2m,
      hum: cur.relative_humidity_2m,
      spd: cur.wind_speed_10m,
      dir: cur.wind_direction_10m,
      code: cur.weather_code,
      at: cur.time || null,
      hours: hours
    };
    return new Response(JSON.stringify(out), {
      headers: { "content-type": "application/json; charset=utf-8",
                 "cache-control": "public, max-age=600" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e && e.message || e) }), {
      status: 502, headers: { "content-type": "application/json; charset=utf-8" } });
  }
}

export { handleWx };
