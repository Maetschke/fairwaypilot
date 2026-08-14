/* Loch-Geometrie eines Golfplatzes aus OpenStreetMap (Overpass), serverseitig.
   Liefert je Loch Abschlag (tee) + Grün/Fahne (pin) als Koordinaten, damit der
   Client die Referenzpunkte automatisch setzen und die Satellitenkarten
   automatisch von unten (Abschlag) nach oben (Fahne) ausrichten kann.

   OSM-Modell: golf=hole  -> Weg (Mittellinie der Bahn), tag ref = Lochnummer.
               golf=green -> Fläche (Grün); Zentroid ~ Fahnenraum.
               golf=pin   -> Knoten (exakte Fahne, falls gemappt).
   Ausrichtung: das Bahn-Ende, das dem nächsten Grün am nächsten liegt, ist das
   Fahnen-Ende; das andere Ende ist der Abschlag. Fahne = Grün-Zentroid bzw.
   pin-Knoten, falls nah genug, sonst das Bahn-Ende selbst. Robust über mehrere
   Overpass-Spiegel; nur plausible Ergebnisse landen im Edge-Cache. */

function _distM(aLat, aLng, bLat, bLng) {
  var latRad = aLat * Math.PI / 180;
  var mLat = 110540, mLng = 111320 * Math.cos(latRad);
  var dx = (bLng - aLng) * mLng, dy = (bLat - aLat) * mLat;
  return Math.sqrt(dx * dx + dy * dy);
}
function _centroid(geom) {
  if (!geom || !geom.length) return null;
  var sLat = 0, sLng = 0, n = 0;
  for (var i = 0; i < geom.length; i++) {
    if (geom[i] && geom[i].lat != null && geom[i].lon != null) { sLat += geom[i].lat; sLng += geom[i].lon; n++; }
  }
  if (!n) return null;
  return { lat: sLat / n, lng: sLng / n };
}

async function handleHoles(url) {
  var lat = parseFloat(url.searchParams.get("lat"));
  var lon = parseFloat(url.searchParams.get("lon"));
  if (!isFinite(lat) || !isFinite(lon)) {
    return new Response(JSON.stringify({ error: "lat/lon fehlt", holes: [] }), {
      status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
  }
  var rad = parseFloat(url.searchParams.get("r"));
  if (!isFinite(rad) || rad <= 0) rad = 0.02;        // ~2 km Halbkante
  if (rad > 0.05) rad = 0.05;
  var s = (lat - rad).toFixed(5), w = (lon - rad).toFixed(5),
      n = (lat + rad).toFixed(5), e = (lon + rad).toFixed(5);
  var bbox = s + "," + w + "," + n + "," + e;

  var cache = caches.default;
  var cacheKey = new Request("https://fairwaypilot.com/__holes_v1_" + bbox);
  try { var hit = await cache.match(cacheKey); if (hit) return hit; } catch (e) {}

  var q = "[out:json][timeout:55];("
    + 'way["golf"="hole"](' + bbox + ");"
    + 'way["golf"="green"](' + bbox + ");"
    + 'node["golf"="pin"](' + bbox + ");"
    + ");out geom;";
  var mirrors = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.private.coffee/api/interpreter"
  ];
  var els = null, lastErr = "no mirror";
  for (var mi = 0; mi < mirrors.length; mi++) {
    try {
      var r = await fetch(mirrors[mi] + "?data=" + encodeURIComponent(q), {
        headers: { "User-Agent": "FairwayPilot/1.0 (+https://fairwaypilot.com)" } });
      if (!r.ok) { lastErr = "upstream " + r.status; continue; }
      var j = await r.json();
      var arr = (j && j.elements) || [];
      if (arr.length) { els = arr; break; }
      lastErr = "leer @" + mirrors[mi];
      els = arr; // leer akzeptieren erst wenn alle Spiegel leer sind -> weiterprobieren
    } catch (e2) { lastErr = String((e2 && e2.message) || e2); }
  }
  if (els == null) {
    return new Response(JSON.stringify({ error: lastErr, holes: [] }), {
      status: 502, headers: { "content-type": "application/json; charset=utf-8" } });
  }

  // Grün-Zentroide und pin-Knoten sammeln
  var greens = [], pins = [];
  for (var i = 0; i < els.length; i++) {
    var el = els[i], t = el.tags || {};
    if (t.golf === "green" && el.geometry) { var c = _centroid(el.geometry); if (c) greens.push(c); }
    else if (t.golf === "pin" && el.lat != null && el.lon != null) pins.push({ lat: el.lat, lng: el.lon });
  }
  function nearestGreen(pt) {
    var best = null, bd = Infinity;
    for (var g = 0; g < greens.length; g++) {
      var d = _distM(pt.lat, pt.lng, greens[g].lat, greens[g].lng);
      if (d < bd) { bd = d; best = greens[g]; }
    }
    return best ? { g: best, d: bd } : null;
  }
  function nearestPin(pt) {
    var best = null, bd = Infinity;
    for (var p = 0; p < pins.length; p++) {
      var d = _distM(pt.lat, pt.lng, pins[p].lat, pins[p].lng);
      if (d < bd) { bd = d; best = pins[p]; }
    }
    return best ? { p: best, d: bd } : null;
  }

  var holes = [], seen = {};
  for (var k = 0; k < els.length; k++) {
    var e0 = els[k], tg = e0.tags || {};
    if (tg.golf !== "hole" || !e0.geometry || e0.geometry.length < 2) continue;
    var num = parseInt(tg.ref, 10);
    if (!isFinite(num) || num < 1 || num > 18) continue;
    if (seen[num]) continue;
    var g0 = e0.geometry;
    var A = { lat: g0[0].lat, lng: g0[0].lon };
    var B = { lat: g0[g0.length - 1].lat, lng: g0[g0.length - 1].lon };
    // Welches Ende ist die Fahne? Das mit geringerem Grün-Abstand.
    var ngA = nearestGreen(A), ngB = nearestGreen(B);
    var dA = ngA ? ngA.d : Infinity, dB = ngB ? ngB.d : Infinity;
    var teeEnd, pinEnd, pinGreen;
    if (dA <= dB) { pinEnd = B; teeEnd = A; pinGreen = ngB; }
    else { pinEnd = A; teeEnd = B; pinGreen = ngA; }
    // Fahne verfeinern: pin-Knoten in Grünnähe > Grün-Zentroid > Bahn-Ende
    var pin = { lat: pinEnd.lat, lng: pinEnd.lng };
    if (pinGreen && pinGreen.d < 60) pin = { lat: pinGreen.g.lat, lng: pinGreen.g.lng };
    var np = nearestPin(pin);
    if (np && np.d < 40) pin = { lat: np.p.lat, lng: np.p.lng };
    seen[num] = 1;
    holes.push({
      hole: num,
      tee: { lat: +teeEnd.lat.toFixed(6), lng: +teeEnd.lng.toFixed(6) },
      pin: { lat: +pin.lat.toFixed(6), lng: +pin.lng.toFixed(6) },
      lengthM: Math.round(_distM(teeEnd.lat, teeEnd.lng, pin.lat, pin.lng))
    });
  }
  holes.sort(function (a, b) { return a.hole - b.hole; });

  var body = JSON.stringify({ holes: holes, count: holes.length, greens: greens.length });
  var resp = new Response(body, {
    headers: { "content-type": "application/json; charset=utf-8",
      "cache-control": holes.length ? "public, max-age=86400" : "no-store" } });
  if (holes.length) { try { await cache.put(cacheKey, resp.clone()); } catch (e3) {} }
  return resp;
}
export { handleHoles };
