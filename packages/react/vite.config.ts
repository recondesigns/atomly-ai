
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react({
        jsxImportSource: '@emotion/react'
    })],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                'atoms/index': resolve(__dirname, 'src/atoms/index.ts'),
                'molecules/index': resolve(__dirname, 'src/molecules/index.ts'),
            },
            formats: ['es'],
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                /^@emotion\/.*/,
                'stylis',
                '@emotion/react',
                '@emotion/styled',
                'react-aria',
                /^react-aria\/.*/,
                /^@react-aria\/.*/,
                /^@react-stately\/.*/,
            ],
            output: {
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
        },
    },
});
