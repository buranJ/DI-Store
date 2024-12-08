import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import alias from '@rollup/plugin-alias';
import viteImagemin from 'vite-plugin-imagemin';
import viteCompression from 'vite-plugin-compression';
export default defineConfig({
    plugins: [
        react(),
        svgr(),
        alias({
            entries: [
                { find: 'common', replacement: path.resolve(__dirname, 'src/common') },
                {
                    find: 'components',
                    replacement: path.resolve(__dirname, 'src/common/components'),
                },
                {
                    find: 'assets',
                    replacement: path.resolve(__dirname, 'src/common/assets'),
                },
                {
                    find: 'styles',
                    replacement: path.resolve(__dirname, 'src/common/styles'),
                },
                { find: 'ui', replacement: path.resolve(__dirname, 'src/common/ui') },
                { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
                { find: 'config', replacement: path.resolve(__dirname, 'src/config') },
                { find: 'api', replacement: path.resolve(__dirname, 'src/api') },
                {
                    find: 'contexts',
                    replacement: path.resolve(__dirname, 'src/contexts'),
                },
            ],
        }),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 75,
            },
            pngquant: {
                quality: [0.65, 0.8],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox',
                        active: false,
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: true,
                    },
                ],
            },
        }),
        viteCompression({
            algorithm: 'gzip',
            threshold: 10240,
            ext: '.gz',
        }),
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 10240,
        }),
    ],
    publicDir: 'public',
    resolve: {
        alias: {
            common: path.resolve(__dirname, 'src/common'),
            components: path.resolve(__dirname, 'src/common/components'),
            assets: path.resolve(__dirname, 'src/common/assets'),
            styles: path.resolve(__dirname, 'src/common/styles'),
            ui: path.resolve(__dirname, 'src/common/ui'),
            pages: path.resolve(__dirname, 'src/pages'),
            config: path.resolve(__dirname, 'src/config'),
            api: path.resolve(__dirname, 'src/api'),
            contexts: path.resolve(__dirname, 'src/contexts'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@import \"common/styles/variables.scss\";",
            },
        },
    },
});
