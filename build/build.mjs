import { build } from 'esbuild';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => resolve(root, p);
const read = (p) => readFileSync(r(p), 'utf8');

const TOKEN = '/*__FAIRWAYPILOT_APP_JS__*/';
const appJs = read('src/legacy/app.js');
const parts = read('src/pages/app.html').split(TOKEN);
if (parts.length !== 2) throw new Error('App-JS-Platzhalter nicht eindeutig.');
const HTML = parts[0] + appJs + parts[1];

const pages = {
  HTML,
  LANDING_HTML: read('src/pages/landing.html'),
  IMPRESSUM_HTML: read('src/pages/impressum.html'),
  DATENSCHUTZ_HTML: read('src/pages/datenschutz.html'),
  AGB_HTML: read('src/pages/agb.html'),
};
const gen = Object.entries(pages)
  .map(([k, v]) => 'export const ' + k + ' = ' + JSON.stringify(v) + ';')
  .join('\n') + '\n';
writeFileSync(r('src/worker/pages.generated.js'), gen);

await build({
  entryPoints: [r('src/worker/index.js')],
  bundle: true, format: 'esm', target: 'es2022',
  platform: 'neutral', legalComments: 'none',
  outfile: r('worker.js'),
});
console.log('Build ok: worker.js geschrieben.');
