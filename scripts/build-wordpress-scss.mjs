import * as sass from 'sass';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join, dirname, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const srcDir = join(root, 'src/styles/wordpress');
const distDir = join(root, 'dist/wordpress');

const entries = await readdir(srcDir, { withFileTypes: true });

await mkdir(distDir, { recursive: true });

for (const entry of entries) {
  if (!entry.isFile() || extname(entry.name) !== '.scss') continue;

  const name = basename(entry.name, '.scss');
  const result = sass.compile(join(srcDir, entry.name));
  await writeFile(join(distDir, `${name}.css`), result.css);
  console.log(`  ✓ ${name}.css`);
}
