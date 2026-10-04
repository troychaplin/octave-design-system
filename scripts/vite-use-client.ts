import { readFileSync } from 'node:fs';
import type { Plugin } from 'vite';

const sourceFile = /\.[cm]?[jt]sx?$/;
const directive = /^['"]use client['"]/;
const cache = new Map<string, boolean>();

// True when a source module starts with the 'use client' directive
export const isClientModule = (id: string): boolean => {
    if (id.startsWith('\0') || id.includes('/node_modules/') || !sourceFile.test(id)) {
        return false;
    }

    let result = cache.get(id);

    if (result === undefined) {
        result = directive.test(readFileSync(id, 'utf8').trimStart());
        cache.set(id, result);
    }

    return result;
};

// Rolldown drops module-level directives when it bundles, but Next.js needs 'use client' at the top
// of every file that uses React context, or importing it from a Server Component fails. Put the
// directive back on each output chunk that contains a client module.
export const useClientDirective = (): Plugin => ({
    name: 'octave:use-client',
    banner: (chunk) => (chunk.moduleIds.some(isClientModule) ? "'use client';" : ''),
});
