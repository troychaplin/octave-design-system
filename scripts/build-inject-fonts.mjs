import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const fontsRaw = readFileSync(resolve(root, 'dist/fonts.css'), 'utf-8');
const styleRaw = readFileSync(resolve(root, 'dist/style.css'), 'utf-8');

// Strip the auto-generated comment header before prepending
const fontsBody = fontsRaw.replace(/^\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\/\s*/, '');

writeFileSync(resolve(root, 'dist/style.css'), fontsBody + styleRaw);
console.log('  ✓ fonts injected into dist/style.css');
