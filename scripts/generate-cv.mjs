import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
const cached = join(homedir(), '.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell');
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || (existsSync(cached) ? cached : undefined);
const browser = await chromium.launch({ executablePath });
try {
  const page = await browser.newPage();
  const response = await page.goto(`${process.env.PREVIEW_URL || 'http://127.0.0.1:4321'}/cv/`, { waitUntil: 'networkidle' });
  if (!response?.ok()) throw new Error('CV page did not load');
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  mkdirSync('public/files', { recursive: true });
  await page.pdf({ path: 'public/files/DoanVanTai_CV.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('Created public/files/DoanVanTai_CV.pdf from the public, phone-free CV page.');
} finally { await browser.close(); }
