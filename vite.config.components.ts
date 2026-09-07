import { defineConfig } from 'vite';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdirSync, existsSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import react from '@vitejs/plugin-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

const srcComponentsDir = resolve(__dirname, 'src/components');

// Auto-discover every src/components/<Name>/ directory that has an index.ts or
// index.tsx. Adding a new component directory is enough — no config update needed.
const entry = Object.fromEntries(
  readdirSync(srcComponentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) => {
      const tsxPath = resolve(srcComponentsDir, d.name, 'index.tsx');
      const tsPath = resolve(srcComponentsDir, d.name, 'index.ts');
      const filePath = existsSync(tsxPath) ? tsxPath : existsSync(tsPath) ? tsPath : null;
      if (!filePath) return [];
      return [[`${d.name}/index`, filePath]];
    }),
);

const assetFileNames = (assetInfo: { names?: string[] }) => {
  if (assetInfo.names?.[0]?.endsWith('.css')) {
    return '[name][extname]';
  }
  return 'assets/[name]-[hash][extname]';
};

// Vite's per-component lib build emits a combined stylesheet at the dist root
// as a side effect of the CSS imports inside each component. We don't expose it
// in package.json's exports map — consumers get either the full library stylesheet
// (dist/style.css) or per-component CSS (dist/components/<Name>/styles.css, built
// separately by scripts/build-components-scss.mjs). Drop the dead combined output.
//
// Vite extracts CSS through a separate pipeline that doesn't show up in the
// Rollup bundle, so we delete the file from disk in `closeBundle` instead.
const dropRootCss = {
  name: 'octave:drop-root-css',
  closeBundle: async () => {
    try {
      await unlink(join(__dirname, 'dist/components/octave-design-system.css'));
    } catch (err: unknown) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
    }
  },
};

export default defineConfig({
  // Don't copy public/ assets into dist/components — they already live in dist/.
  publicDir: false,
  plugins: [react(), dropRootCss],
  build: {
    emptyOutDir: false,
    outDir: 'dist/components',
    lib: {
      entry,
      // Formats are configured per-output below so chunkFileNames can use the
      // correct extension for each format (.mjs for ES, .cjs for CJS).
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      // Output array gives one config per format. Shared chunks land in
      // dist/components/_shared/ instead of cluttering the root.
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          chunkFileNames: '_shared/[name]-[hash].mjs',
          assetFileNames,
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: '_shared/[name]-[hash].cjs',
          assetFileNames,
        },
      ],
    },
  },
});
