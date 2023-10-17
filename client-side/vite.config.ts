import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api/weather': {
                target: 'https://api.openweathermap.org/data/2.5/weather',
                changeOrigin: true,
                rewrite: (path) =>
                    path.replace(/^\/api\/weather/, '') +
                    '&units=metric&appid=38d147031dc4e997fc0b84ac609f3f86',
            },
            '/server': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/server/, ''),
            },
            '/api/ipinfo': {
                target: 'https://ipinfo.io/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\/ipinfo/, '') + '?token=750577926759b7',
            },
        },
    },
});
