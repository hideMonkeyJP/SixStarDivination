import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Astroの環境変数設定
  vite: {
    define: {
      'import.meta.env.PUBLIC_GEMINI_API_KEY': JSON.stringify(process.env.PUBLIC_GEMINI_API_KEY)
    }
  }
});