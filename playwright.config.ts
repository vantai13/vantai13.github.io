import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const cachedBrowser = join(homedir(), '.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell');
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || (existsSync(cachedBrowser) ? cachedBrowser : undefined);
export default defineConfig({
  testDir: './tests', fullyParallel: false, workers: 1,
  reporter: [['list'], ['json', { outputFile: 'logs/playwright-results.json' }]],
  use: { baseURL: process.env.PREVIEW_URL || 'http://127.0.0.1:4321', headless: true, launchOptions: { executablePath }, trace: 'retain-on-failure' },
});
