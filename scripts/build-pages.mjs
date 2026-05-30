/**
 * Build /karies, /luminir, /vinir, /implantacia from zip landings + polished hero CSS.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMPORT = path.resolve(ROOT, '..', 'extracted', 'stoma-import-3', 'Лендинги');

const REF = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function extractHeroBundle(html) {
  const start = html.search(/\/\*\s*[-—]*\s*hero\s*[-—]*\s*\*\//i);
  if (start < 0) throw new Error('hero block not found in reference');
  const end = html.indexOf('.grid{display:grid;gap:18px}');
  if (end < 0) throw new Error('.grid marker not found in reference');
  return html.slice(start, end);
}

function extractDesktop1200(html) {
  const m = html.match(
    /\/\* desktop[\s\S]*?@media \(min-width:1200px\)\{[\s\S]*?\n  \}/
  );
  if (!m) throw new Error('1200px block not found in reference');
  return m[0];
}

const heroBundle = extractHeroBundle(REF);
const desktop1200 = extractDesktop1200(REF);

function fixAssetPaths(html) {
  return html
    .replace(/src="images\//g, 'src="/images/')
    .replace(/href="images\//g, 'href="/images/')
    .replace(/src="image-slot\.js"/g, 'src="/image-slot.js"')
    .replace(/url\(images\//g, 'url(/images/');
}

function applyHeroBundle(html, bundle) {
  const start = html.search(/\/\*\s*[-—]*\s*hero\s*[-—]*\s*\*\//i);
  if (start < 0) throw new Error('hero start not found');
  const end = html.indexOf('.grid{display:grid;gap:18px}');
  if (end < 0) throw new Error('.grid marker not found');
  return html.slice(0, start) + bundle + html.slice(end);
}

function applyDesktop1200(html, block) {
  if (!html.includes('@media (min-width:1200px)')) {
    const anchor = html.indexOf('/* ——— footer ——— */');
    const alt = html.indexOf('/* Footer */');
    const pos = anchor >= 0 ? anchor : alt;
    if (pos < 0) throw new Error('footer anchor not found for 1200 insert');
    return html.slice(0, pos) + '\n  ' + block + '\n\n  ' + html.slice(pos);
  }
  return html.replace(
    /\/\* desktop[\s\S]*?@media \(min-width:1200px\)\{[\s\S]*?\n  \}/,
    block
  );
}

function prepareHtml(raw) {
  let html = fixAssetPaths(raw);
  html = applyHeroBundle(html, heroBundle);
  html = applyDesktop1200(html, desktop1200);
  return html;
}

const pages = [
  { dir: 'luminir', source: path.join(ROOT, 'index.html'), polished: true },
  {
    dir: 'vinir',
    source: path.join(IMPORT, 'Виниры - Лендинг.html'),
  },
  {
    dir: 'karies',
    source: path.join(IMPORT, 'Кариес - Лендинг.html'),
  },
  {
    dir: 'implantacia',
    source: path.join(IMPORT, 'Имплантация - Лендинг.html'),
  },
];

for (const { dir, source, polished } of pages) {
  const raw = fs.readFileSync(source, 'utf8');
  const html = polished ? fixAssetPaths(raw) : prepareHtml(raw);
  const outDir = path.join(ROOT, dir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log('OK', dir, '←', path.basename(source));
}

// Root: absolute asset paths (same as /luminir content)
const rootHtml = fixAssetPaths(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'));
fs.writeFileSync(path.join(ROOT, 'index.html'), rootHtml, 'utf8');
console.log('OK / (root index.html paths)');
