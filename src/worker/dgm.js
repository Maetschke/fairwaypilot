/* Hochaufgeloestes Gelaendemodell (DGM1, 1 m) fuer die Gruen-Ansicht (M9a/b).
   Quelle: Geobasis NRW WCS (nur NRW-Plaetze!). Der Worker rechnet WGS84 -> UTM32 (EPSG:25832),
   fragt eine kleine Kachel (Standard 64 m) um das Gruen per WCS GetCoverage als GeoTIFF ab
   und reicht die Bytes an den Client durch (der parst sie mit geotiff.js). Vermeidet CORS
   und haelt die Spieler-IP vom Geodienst fern. Nicht-NRW / Fehler -> JSON-Diagnose. */
function _ll2utm32(lat, lon) {
  var a = 6378137.0, f = 1 / 298.257223563;
  var k0 = 0.9996, lon0 = 9 * Math.PI / 180, E0 = 500000;
  var e2 = f * (2 - f), ep2 = e2 / (1 - e2);
  var phi = lat * Math.PI / 180, lam = lon * Math.PI / 180;
  var N = a / Math.sqrt(1 - e2 * Math.sin(phi) * Math.sin(phi));
  var T = Math.tan(phi) * Math.tan(phi);
  var C = ep2 * Math.cos(phi) * Math.cos(phi);
  var A = Math.cos(phi) * (lam - lon0);
  var M = a * ((1 - e2 / 4 - 3 * e2 * e2 / 64 - 5 * e2 * e2 * e2 / 256) * phi
      - (3 * e2 / 8 + 3 * e2 * e2 / 32 + 45 * e2 * e2 * e2 / 1024) * Math.sin(2 * phi)
      + (15 * e2 * e2 / 256 + 45 * e2 * e2 * e2 / 1024) * Math.sin(4 * phi)
      - (35 * e2 * e2 * e2 / 3072) * Math.sin(6 * phi));
  var E = E0 + k0 * N * (A + (1 - T + C) * A * A * A / 6
      + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * A * A * A * A * A / 120);
  var Nn = k0 * (M + N * Math.tan(phi) * (A * A / 2
      + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24
      + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * A * A * A * A * A * A / 720));
  return { e: E, n: Nn };
}
function _dgmJson(o, status) {
  return new Response(JSON.stringify(o), { status: status || 200,
    headers: { "content-type": "application/json; charset=utf-8", "access-control-allow-origin": "*" } });
}
async function handleDgm(url) {
  const lat = Number(url.searchParams.get("lat"));
  const lng = Number(url.searchParams.get("lng"));
  let size = Number(url.searchParams.get("size")) || 64;
  size = Math.max(24, Math.min(900, size));
  if (!isFinite(lat) || !isFinite(lng)) return _dgmJson({ error: "bad_coords" }, 400);
  // grobe NRW-Bounding-Box
  if (lat < 50.0 || lat > 52.6 || lng < 5.7 || lng > 9.6) return _dgmJson({ error: "out_of_nrw" });
  const c = _ll2utm32(lat, lng);
  const h = size / 2;
  const eMin = (c.e - h).toFixed(1), eMax = (c.e + h).toFixed(1);
  const nMin = (c.n - h).toFixed(1), nMax = (c.n + h).toFixed(1);
  const wcs = "https://www.wcs.nrw.de/geobasis/wcs_nw_dgm?SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCoverage"
    + "&COVERAGEID=nw_dgm&FORMAT=image/tiff"
    + "&SUBSET=x(" + eMin + "," + eMax + ")&SUBSET=y(" + nMin + "," + nMax + ")"
    + "&SUBSETTINGCRS=http://www.opengis.net/def/crs/EPSG/0/25832"
    + "&OUTPUTCRS=http://www.opengis.net/def/crs/EPSG/0/25832";
  try {
    const r = await fetch(wcs, { cf: { cacheTtl: 604800, cacheEverything: true } });
    const ct = (r.headers.get("content-type") || "").toLowerCase();
    if (!r.ok || ct.indexOf("xml") >= 0 || ct.indexOf("html") >= 0) {
      const t = await r.text().catch(function () { return ""; });
      return _dgmJson({ error: "wcs_" + r.status, ct: ct, detail: t.slice(0, 400) });
    }
    const buf = await r.arrayBuffer();
    if (!buf || buf.byteLength < 200) return _dgmJson({ error: "empty", bytes: buf ? buf.byteLength : 0 });
    return new Response(buf, { headers: {
      "content-type": "image/tiff",
      "cache-control": "public, max-age=604800",
      "access-control-allow-origin": "*",
      "x-dgm-size": String(size),
      "x-dgm-e": String(c.e.toFixed(1)),
      "x-dgm-n": String(c.n.toFixed(1))
    }});
  } catch (e) {
    return _dgmJson({ error: String(e && e.message || e) });
  }
}
export { handleDgm };
