import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SNIP = fs.readFileSync(path.join(ROOT, 'scripts/doctor-quote-snippet.html'), 'utf8');

const files = [
  'index.html',
  'luminir/index.html',
  'vinir/index.html',
  'karies/index.html',
  'implantacia/index.html',
];

// Match from the start comment to the closing </section> of doctor-quote.
// .doctor-quote section ends with </section>, followed by blank line and next comment.
const re = /\n<!-- ============ DOCTOR QUOTE ============ -->[\s\S]*?<\/section>\n/;

for (const f of files) {
  const p = path.join(ROOT, f);
  let html = fs.readFileSync(p, 'utf8');
  if (!re.test(html)) {
    throw new Error(`doctor quote section not found in ${f}`);
  }
  // SNIP starts with a leading newline; trim so we don't double-newline
  const replacement = '\n' + SNIP.replace(/^\n/, '');
  html = html.replace(re, replacement);
  fs.writeFileSync(p, html, 'utf8');
  console.log('OK', f);
}
