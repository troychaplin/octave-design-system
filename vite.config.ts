import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { isClientModule, useClientDirective } from './scripts/vite-use-client';

// Client components go in a chunk of their own, so the 'use client' banner only reaches the code
// that needs it. Every other source module goes in a shared chunk that both the entry and the client
// chunk import, which keeps server-safe code out of the client chunk without an import cycle.
const codeSplitting = {
    groups: [
        {
            name: 'client',
            test: isClientModule,
            priority: 2,
            includeDependenciesRecursively: false,
        },
        {
            name: 'shared',
            test: (id: string) => id.includes('/src/') && !id.endsWith('/src/index.ts'),
            priority: 1,
            includeDependenciesRecursively: false,
        },
    ],
};

export default defineConfig({
    plugins: [
        react(),
        useClientDirective(),
        dts({
            include: ['src'],
            tsconfigPath: './tsconfig.build.json',
            rollupTypes: true,
            entryRoot: 'src',
        }),
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es', 'cjs'],
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            // Required by includeDependenciesRecursively: false. The entry keeps every export it
            // declares, and Rolldown may add internal ones.
            preserveEntrySignatures: 'allow-extension',
            output: [
                {
                    format: 'es',
                    entryFileNames: 'index.mjs',
                    chunkFileNames: '_shared/[name]-[hash].mjs',
                    codeSplitting,
                },
                {
                    format: 'cjs',
                    entryFileNames: 'index.cjs',
                    chunkFileNames: '_shared/[name]-[hash].cjs',
                    codeSplitting,
                },
            ],
        },
    },
});
