import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SNIP = fs.readFileSync(path.join(ROOT, 'scripts/doctor-quote-snippet.html'), 'utf8');
const anchor = `          <span class="ct"><h3>Международное обучение</h3><p>Постоянное повышение квалификации</p></span>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const files = [
  'index.html',
  'luminir/index.html',
  'vinir/index.html',
  'karies/index.html',
  'implantacia/index.html',
];

for (const f of files) {
  const p = path.join(ROOT, f);
  let html = fs.readFileSync(p, 'utf8');
  if (html.includes('doctor-quote')) {
    console.log('skip', f);
    continue;
  }
  if (!html.includes(anchor)) {
    throw new Error(`anchor missing in ${f}`);
  }
  html = html.replace(anchor, anchor + '\n' + SNIP);
  fs.writeFileSync(p, html, 'utf8');
  console.log('OK', f);
}
