import { execSync } from 'node:child_process';
import { readdirSync, existsSync, rmSync, mkdirSync, copyFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const srcDir = resolve(root, 'src/components');
const distDir = resolve(root, 'dist/components');
const tempDir = resolve(root, 'dist/.dts-temp');

// Step 1: emit all declarations to a temp directory.
// rootDir defaults to the project root, so each source file lands at
// dist/.dts-temp/src/components/<Name>/index.d.ts — the same relative
// structure as the source tree.
execSync(
    `node_modules/.bin/tsc --project tsconfig.build.json --declaration --emitDeclarationOnly --noEmit false --outDir ${tempDir}`,
    { cwd: root },
);

// The generated tokens source lives in src/styles/auto as JS plus a sibling
// .d.ts file. tsc does not copy that declaration into outDir, so stage it
// manually for rollup-plugin-dts to resolve src/components/tokens/index.d.ts.
const tokensDeclSource = resolve(root, 'src/styles/c2b/octave-tokens.d.ts');
const tokensDeclDest = resolve(tempDir, 'src/styles/c2b/octave-tokens.d.ts');
if (existsSync(tokensDeclSource)) {
    mkdirSync(dirname(tokensDeclDest), { recursive: true });
    copyFileSync(tokensDeclSource, tokensDeclDest);
}

// Step 2: bundle each component's declaration chain into a single index.d.ts.
// rollup-plugin-dts follows all import/re-export references and inlines
// transitive types, so the output is fully self-contained.
const componentDirs = readdirSync(srcDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => {
        return (
            existsSync(resolve(srcDir, name, 'index.ts')) ||
            existsSync(resolve(srcDir, name, 'index.tsx'))
        );
    });

for (const name of componentDirs) {
    const input = resolve(tempDir, 'src/components', name, 'index.d.ts');
    if (!existsSync(input)) {
        console.warn(`  ⚠ no declaration input for ${name} — skipping`);
        continue;
    }

    const bundle = await rollup({
        input,
        plugins: [dts()],
        external: ['react', 'react/jsx-runtime', 'react-dom', /\.(css|scss|json)$/],
    });

    await bundle.write({
        file: resolve(distDir, name, 'index.d.ts'),
        format: 'es',
    });

    await bundle.close();
    console.log(`  ✓ ${name}/index.d.ts`);
}

// Step 3: clean up the intermediate declarations.
rmSync(tempDir, { recursive: true, force: true });
