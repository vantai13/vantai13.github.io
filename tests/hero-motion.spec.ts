import { test, expect } from '@playwright/test';

test('the hero gives the photo space and keeps NDT beside it or immediately after it', async ({ page }) => {
  for (const [width, height] of [[320, 720], [360, 800], [390, 844], [768, 1024], [1280, 720], [1440, 900]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await expect(page.locator('.hero-ndt')).toContainText('Doan Van Tai');
    await expect(page.locator('.hero-description')).toContainText('Research Intern at UIT InSecLab');
    await expect(page.locator('.hero-twin-explanation')).toContainText('network’s changing state');
    await expect(page.locator('[data-network-twin]')).toHaveCount(1);
    const image = page.locator('.hero-photo img');
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute('loading', 'eager');
    const photo = (await image.boundingBox())!;
    const title = (await page.locator('#hero-title').boundingBox())!;
    const physical = (await page.locator('.ndt-physical .ndt-node-center').first().boundingBox())!;
    const digital = (await page.locator('.ndt-digital .ndt-node-center').first().boundingBox())!;
    expect(title.y + title.height, `${width}px owner title`).toBeLessThan(height);
    expect(photo.width, `${width}px photo width`).toBeGreaterThanOrEqual(width <= 720 ? Math.min(width - 42, 428) : 258);
    expect(photo.y + photo.height, `${width}px photo visible without scrolling`).toBeLessThan(height);
    if (width <= 720) {
      const portrait = (await page.locator('.hero-photo').boundingBox())!;
      const panel = (await page.locator('.hero-twin-panel').boundingBox())!;
      expect(panel.y - portrait.y - portrait.height).toBeGreaterThanOrEqual(20);
      expect(panel.y - portrait.y - portrait.height).toBeLessThanOrEqual(28);
      expect(await page.locator('.hero-photo').evaluate(element => element.nextElementSibling?.classList.contains('hero-twin-panel'))).toBe(true);
    } else {
      expect(digital.y + digital.height, `${width}px digital layer`).toBeLessThan(height);
      expect(physical.y + physical.height, `${width}px physical layer`).toBeLessThan(height);
    }
  }
});

test('the large hero photo opens About and appears only once on Home', async ({ page }) => {
  await page.goto('/');
  const portrait = page.locator('.hero-photo-frame');
  await expect(page.locator('img[src="/images/tai-sunset.jpg"]')).toHaveCount(1);
  await expect(portrait.locator('img')).toBeVisible();
  await portrait.click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(page.getByAltText('Doan Van Tai at the seaside beneath a pink sunset')).toBeVisible();
});

test('cards and photos respond to mouse hover without causing horizontal overflow', async ({ page }) => {
  await page.goto('/work/');
  const card = page.locator('.project-card').first();
  await card.scrollIntoViewIfNeeded();
  const before = (await card.boundingBox())!;
  await card.hover();
  await expect.poll(async () => (await card.boundingBox())!.y).toBeLessThan(before.y - 3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/about/');
  const photo = page.locator('.about-page-photo .photo-viewport');
  await photo.scrollIntoViewIfNeeded();
  const image = photo.locator('img');
  const start = (await image.boundingBox())!;
  await photo.hover();
  await expect.poll(async () => (await image.boundingBox())!.width).toBeGreaterThan(start.width * 1.02);
});

test('reduced motion keeps site hover and entrance effects still', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work/');
  const card = page.locator('.project-card').first();
  await card.hover();
  await expect(card).toHaveCSS('transform', 'none');
  await page.goto('/about/');
  const photo = page.locator('.about-page-photo .photo-viewport');
  await photo.hover();
  await expect(photo.locator('img')).toHaveCSS('transform', 'none');
  await page.goto('/experience/');
  await page.locator('.timeline-item').first().scrollIntoViewIfNeeded();
  expect(await page.locator('.timeline').evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length)).toBe(0);
});

test('content stays visible when JavaScript is disabled', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/experience/');
  for (const item of await page.locator('.timeline-item').all()) {
    await expect(item).toBeVisible();
    await expect(item).toHaveCSS('opacity', '1');
  }
  await context.close();
});
