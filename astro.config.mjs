import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { existsSync, readFileSync } from 'node:fs';

const cnameFile = new URL('./CNAME', import.meta.url);
const customDomain = existsSync(cnameFile) ? readFileSync(cnameFile, 'utf8').trim() : '';

export default defineConfig({
  site: process.env.SITE_URL || (customDomain ? `https://${customDomain}` : 'https://vantai13.github.io'),
  output: 'static',
  trailingSlash: 'always',
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
