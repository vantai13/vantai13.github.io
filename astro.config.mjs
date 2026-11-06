import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || 'https://vantai13.github.io',
  output: 'static',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
