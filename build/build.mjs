import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => resolve(root, p);
const read = (p) => readFileSync(r(p), 'utf8');

const TOKEN = '/*__FAIRWAYPILOT_APP_JS__*/';
const appJs = read('src/legacy/app.js');
const parts = read('src/pages/app.html').split(TOKEN);
if (parts.length !== 2) throw new Error('App-JS-Platzhalter nicht eindeutig.');
const tokens = read('src/styles/tokens.css');
let HTML = parts[0] + appJs + parts[1];
HTML = HTML.replace('<style>', '<style id="fp-tokens">\n' + tokens + '\n</style>\n<style>', 1);

const pages = {
  HTML,
  LANDING_HTML: read('src/pages/landing.html'),
  IMPRESSUM_HTML: read('src/pages/impressum.html'),
  DATENSCHUTZ_HTML: read('src/pages/datenschutz.html'),
  AGB_HTML: read('src/pages/agb.html'),
  SW_JS: read('src/sw.js'),
};
const gen = Object.entries(pages)
  .map(([k, v]) => 'export const ' + k + ' = ' + JSON.stringify(v) + ';')
  .join('\n') + '\n';
writeFileSync(r('src/worker/pages.generated.js'), gen);

await build({
  entryPoints: [r('src/worker/index.js')],
  bundle: true, format: 'esm', target: 'es2022',
  platform: 'neutral', legalComments: 'none',
  loader: { '.png': 'base64' },
  outfile: r('worker.js'),
});
console.log('Build ok: worker.js geschrieben.');

// M0.6: statische Icons nach public/ kopieren (Cloudflare Static Assets, alle angefragten Pfade)
const pub = r('public');
mkdirSync(pub, { recursive: true });
const cpIcon = (src, names) => names.forEach((n) => copyFileSync(r('assets/icons/' + src), resolve(pub, n)));
cpIcon('icon-180.png', ['apple-touch-icon.png', 'apple-touch-icon-precomposed.png', 'icon-180.png']);
cpIcon('icon-192.png', ['icon-192.png']);
cpIcon('icon-512.png', ['icon-512.png']);
cpIcon('icon-32.png', ['favicon.png', 'favicon.ico', 'icon-32.png']);
cpIcon('logo-mark.png', ['logo-mark.png']);
console.log('public/ mit statischen Icons erzeugt.');
