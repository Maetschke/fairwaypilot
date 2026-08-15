import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, cpSync, rmSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => resolve(root, p);
const read = (p) => readFileSync(r(p), 'utf8');

const TOKEN = '/*__FAIRWAYPILOT_APP_JS__*/';
const appJs = read('src/legacy/app.js');
const qrJs = read('src/vendor/qrcode.js');
const parts = read('src/pages/app.html').split(TOKEN);
if (parts.length !== 2) throw new Error('App-JS-Platzhalter nicht eindeutig.');
const tokens = read('src/styles/tokens.css');
let HTML = parts[0] + qrJs + '\n' + appJs + parts[1];
HTML = HTML.replace('<style>', '<style id="fp-tokens">\n' + tokens + '\n</style>\n<style>', 1);

const pages = {
  HTML,
  LANDING_HTML: read('src/pages/landing.html'),
  RECHNER_HTML: read('src/pages/rechner.html'),
  IMPRESSUM_HTML: read('src/pages/impressum.html'),
  DATENSCHUTZ_HTML: read('src/pages/datenschutz.html'),
  AGB_HTML: read('src/pages/agb.html'),
  KUENDIGEN_HTML: read('src/pages/kuendigen.html'),
  TRACER_HTML: read('src/pages/tracer.html'),
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

// Bahnkarten-Icons, Rundenbilder und Platzbilder nach public/ (Cloudflare Static Assets)
cpSync(r('assets/hv'), resolve(pub, 'hv'), { recursive: true });
cpSync(r('assets/round-bg'), resolve(pub, 'round-bg'), { recursive: true });
cpSync(r('assets/course-images'), resolve(pub, 'course-images'), { recursive: true });
try { cpSync(r('assets/shots'), resolve(pub, 'shots'), { recursive: true }); } catch (e) { /* Landing-Screenshots optional */ }
try { cpSync(r('assets/vendor'), resolve(pub, 'vendor'), { recursive: true }); } catch (e) { /* vendor optional */ }
console.log('public/ mit Icons, Rundenbildern und Platzbildern erzeugt.');
// macOS-Muell nicht mitdeployen: .DS_Store rekursiv aus public/ entfernen
const stripDS = (dir) => { for (const e of readdirSync(dir)) { const fp = resolve(dir, e); const st = statSync(fp); if (st.isDirectory()) stripDS(fp); else if (e === '.DS_Store') rmSync(fp, { force: true }); } };
try { stripDS(pub); console.log('public/ von .DS_Store bereinigt.'); } catch (e) {}
