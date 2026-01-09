import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // ეს ხაზი დაემატა, რომ Render-მა აღარ დაბლოკოს ჰოსტი
      allowedHosts: true
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
      // ესეც აუცილებელია, თუ Render-ი preview რეჟიმს იყენებს
      allowedHosts: true
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});