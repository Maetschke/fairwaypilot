#!/usr/bin/env node
/*
 * build-www.js
 *
 * Extrahiert aus der aktuellen worker.js (GitHub main) den kompletten,
 * lokal lauffaehigen www/-Ordner fuer Capacitor:
 *   - www/index.html   (die eingebettete App-HTML, 1:1 wie ausgeliefert)
 *   - www/icons/*.png  (aus ICON_180 / ICON_192 / ICON_512 dekodiert)
 *   - www/manifest.json
 *
 * Grund: Apple Guideline 4.2 verbietet reine Remote-URL-WebViews - die App
 * muss ihr HTML/CSS/JS lokal mitbringen. Da FairwayPilot komplett in einer
 * einzigen worker.js (embedded HTML/JS) lebt, wird bei jedem Build einfach
 * der aktuelle Stand von main frisch extrahiert statt manuell gepflegt.
 *
 * Aufruf:
 *   GITHUB_TOKEN=xxx node scripts/build-www.js
 * (Token nur noetig, falls das Repo privat ist / Rate-Limits ohne Token
 * greifen - fuer ein oeffentliches Repo reicht auch ohne Token.)
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO = 'Maetschke/fairwaypilot';
const BRANCH = 'main';
const OUT_DIR = path.join(__dirname, '..', 'www');
const TOKEN = process.env.GITHUB_TOKEN || '';

function fetchRaw(urlPath, headers) {
  return new Promise((resolve, reject) => {
    https.get(urlPath, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchRaw(res.headers.location, headers).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('HTTP ' + res.statusCode + ' fuer ' + urlPath));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Lade worker.js von GitHub (' + REPO + '@' + BRANCH + ') ...');
  const headers = { 'User-Agent': 'fairwaypilot-build-www' };
  if (TOKEN) headers['Authorization'] = 'Bearer ' + TOKEN;
  const raw = await fetchRaw(
    'https://raw.githubusercontent.com/' + REPO + '/' + BRANCH + '/worker.js',
    headers
  );
  const src = raw.toString('utf8');
  console.log('worker.js geladen (' + src.length + ' Zeichen).');

  // ---- 1) Icons extrahieren (var ICON_180 = "..."; etc.) ----
  fs.mkdirSync(path.join(OUT_DIR, 'icons'), { recursive: true });
  const iconMap = { ICON_32: 'icon-32.png', ICON_180: 'icon-180.png', ICON_192: 'icon-192.png', ICON_512: 'icon-512.png' };
  Object.keys(iconMap).forEach((varName) => {
    const re = new RegExp('(?:var|const) ' + varName + ' = "([^"]+)"');
    const m = src.match(re);
    if (!m) {
      console.warn('WARNUNG: ' + varName + ' nicht gefunden - Icon wird uebersprungen.');
      return;
    }
    const buf = Buffer.from(m[1], 'base64');
    fs.writeFileSync(path.join(OUT_DIR, 'icons', iconMap[varName]), buf);
    console.log('Icon geschrieben: icons/' + iconMap[varName] + ' (' + buf.length + ' bytes)');
  });

  // ---- 2) HTML-Konstante extrahieren (const HTML = "...";) ----
  // Gleiche Technik wie im Projekt-Deployment-Workflow: JSON-Decoder ab der
  // oeffnenden Anfuehrungszeichen starten lassen, da der String selbst
  // regulaeres JSON-kompatibles Escaping verwendet (einfach JSON-escaped).
  const marker = 'const HTML = "';
  const startIdx = src.indexOf(marker);
  if (startIdx === -1) throw new Error('HTML-Konstante nicht gefunden - Worker-Struktur hat sich vermutlich geaendert.');
  const quoteStart = startIdx + marker.length - 1; // Position des oeffnenden "
  // Minimaler JSON-String-Scanner (kein voller JSON-Parser noetig - wir
  // kennen den Start, suchen nur das unescaped Ende).
  let i = quoteStart + 1;
  let escaped = false;
  while (i < src.length) {
    const ch = src[i];
    if (escaped) { escaped = false; i++; continue; }
    if (ch === '\\') { escaped = true; i++; continue; }
    if (ch === '"') break;
    i++;
  }
  const jsonLiteral = src.slice(quoteStart, i + 1);
  const html = JSON.parse(jsonLiteral);
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), html, 'utf8');
  console.log('index.html geschrieben (' + html.length + ' Zeichen).');

  // ---- 3) manifest.json (lokal, referenziert die eben geschriebenen Icons) ----
  const manifest = {
    name: 'FairwayPilot',
    short_name: 'FairwayPilot',
    start_url: '/index.html',
    display: 'standalone',
    background_color: '#F5F8F0',
    theme_color: '#1F8A4D',
    icons: [
      { src: 'icons/icon-180.png', sizes: '180x180', type: 'image/png' },
      { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
  fs.writeFileSync(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('manifest.json geschrieben.');

  console.log('\nFertig. www/ enthaelt jetzt den aktuellen Stand von main.');
  console.log('Naechste Schritte: npx cap sync  (dann Xcode/Android Studio oeffnen und bauen).');
}

main().catch((e) => {
  console.error('FEHLER:', e.message);
  process.exit(1);
});
