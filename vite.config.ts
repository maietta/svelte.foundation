import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin';
import { defineConfig } from 'vite';

const port = parseInt(process.env.PORT || '5173');
const hmrClientPort = parseInt(process.env.PORTLESS_PORT || '0') || (process.env.PORT ? 1355 : port);

export default defineConfig({
    plugins: [tailwindcss(), sveltekit(), sveltekitOG({ esmImport: false }), devtoolsJson()],
    build: {
        cssMinify: 'esbuild'
    },
    server: {
        port,
        host: '0.0.0.0',
        strictPort: true,
        hmr: {
            // When running behind portless, HMR websocket must use the proxy port
            clientPort: hmrClientPort
        }
    }
});
