#!/usr/bin/env node
/*
 * build-www.js  (M0.2+)
 * Erzeugt www/ direkt aus der modularen src/-Quelle - kein Netzzugriff, kein Token,
 * keine committete worker.js noetig (die ist seit M0.2 ein generiertes Artefakt).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const OUT = path.join(__dirname, '..', 'www');
const r = (...p) => path.join(ROOT, ...p);

const TOKEN = '/*__FAIRWAYPILOT_APP_JS__*/';
const appJs = fs.readFileSync(r('src', 'legacy', 'app.js'), 'utf8');
const parts = fs.readFileSync(r('src', 'pages', 'app.html'), 'utf8').split(TOKEN);
if (parts.length !== 2) throw new Error('App-JS-Platzhalter nicht eindeutig in src/pages/app.html.');
fs.mkdirSync(path.join(OUT, 'icons'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'index.html'), parts[0] + appJs + parts[1], 'utf8');
console.log('index.html geschrieben.');

for (const fn of ['icon-32.png', 'icon-180.png', 'icon-192.png', 'icon-512.png']) {
  fs.copyFileSync(r('assets', 'icons', fn), path.join(OUT, 'icons', fn));
}
console.log('Icons kopiert.');

const manifest = {
  name: 'FairwayPilot', short_name: 'FairwayPilot', start_url: '/index.html',
  display: 'standalone', background_color: '#F5F8F0', theme_color: '#1F8A4D',
  icons: [
    { src: 'icons/icon-180.png', sizes: '180x180', type: 'image/png' },
    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
  ]
};
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log('manifest.json geschrieben.\nFertig: www/ aus src/ erzeugt.');
