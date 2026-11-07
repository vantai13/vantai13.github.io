import { test, expect } from '@playwright/test';

test('NDT signal animation moves, pauses, resumes, and keeps the pause preference', async ({ page }) => {
  await page.goto('/');
  const graphic = page.locator('[data-network-twin]');
  await graphic.scrollIntoViewIfNeeded();
  await expect(graphic).toHaveAttribute('data-motion', 'running');
  await expect(graphic.getByRole('img', { name: 'Network Digital Twin illustration' })).toBeVisible();
  const clock = () => graphic.locator('svg.ndt-svg').evaluate(svg => (svg as SVGSVGElement).getCurrentTime());
  const before = await clock();
  await expect.poll(clock).toBeGreaterThan(before + .1);
  const positions = () => graphic.locator('.ndt-packet').evaluateAll(elements => elements.map(element => {
    const matrix = (element as SVGGraphicsElement).getCTM()!; return { x: matrix.e, y: matrix.f };
  }));
  const initial = await positions();
  expect(initial.every(point => Math.abs(point.x) + Math.abs(point.y) > 25)).toBe(true);
  await expect.poll(async () => (await positions()).filter((point, index) => Math.hypot(point.x - initial[index].x, point.y - initial[index].y) > .5).length).toBe(4);
  const stage = graphic.locator('[data-ndt-stage]');
  const box = (await stage.boundingBox())!;
  await page.mouse.move(box.x + box.width * .7, box.y + box.height * .4);
  await expect.poll(() => stage.evaluate(element => (element as HTMLElement).style.getPropertyValue('--tilt-x'))).not.toBe('');
  await page.mouse.move(0, 0);
  await expect.poll(() => stage.evaluate(element => (element as HTMLElement).style.getPropertyValue('--tilt-x'))).toBe('');
  await graphic.getByRole('button', { name: 'Pause animation' }).click();
  await expect(graphic).toHaveAttribute('data-motion', 'paused');
  const paused = await clock();
  await page.waitForTimeout(180);
  expect(Math.abs(await clock() - paused)).toBeLessThan(.01);
  await page.reload();
  await graphic.scrollIntoViewIfNeeded();
  await expect(graphic).toHaveAttribute('data-motion', 'paused');
  await graphic.getByRole('button', { name: 'Resume animation' }).click();
  await expect(graphic).toHaveAttribute('data-motion', 'running');
  const resumed = await clock();
  await expect.poll(clock).toBeGreaterThan(resumed + .1);
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await expect(graphic).toHaveAttribute('data-motion', 'idle');
});

test('reduced motion stops SVG and CSS animation and disables parallax', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const graphic = page.locator('[data-network-twin]');
  await graphic.scrollIntoViewIfNeeded();
  await expect(graphic).toHaveAttribute('data-motion', 'reduced');
  await expect(graphic.getByRole('button', { name: 'Animation disabled for reduced motion' })).toBeDisabled();
  expect(await graphic.locator('svg.ndt-svg').evaluate(svg => (svg as SVGSVGElement).animationsPaused())).toBe(true);
  expect(await graphic.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running').length)).toBe(0);
  await graphic.locator('[data-ndt-stage]').hover();
  expect(await graphic.locator('[data-ndt-stage]').evaluate(element => (element as HTMLElement).style.getPropertyValue('--tilt-x'))).toBe('');
});

test('the conceptual illustration remains available without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/');
  const graphic = page.locator('[data-network-twin]');
  await graphic.scrollIntoViewIfNeeded();
  await expect(graphic.getByRole('img', { name: 'Network Digital Twin illustration' })).toBeVisible();
  await expect(graphic).toContainText('Conceptual illustration');
  await expect(graphic.locator('[data-ndt-toggle]')).toBeHidden();
  await expect(graphic.locator('.ndt-packets')).toBeHidden();
  await context.close();
});

test('CV sections and entries have space and mobile dates sit below titles', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/cv/');
    const gaps = await page.locator('.cv-document>section').evaluateAll(sections => sections.slice(1).map((section, index) => section.getBoundingClientRect().top - sections[index].getBoundingClientRect().bottom));
    expect(gaps.length).toBe(5);
    expect(gaps.every(gap => gap >= 32)).toBe(true);
    const entries = await page.locator('.cv-entry+.cv-entry').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().top - element.previousElementSibling!.getBoundingClientRect().bottom));
    expect(entries.every(gap => gap >= 24)).toBe(true);
    if (width === 390) {
      for (const heading of await page.locator('.cv-section-heading').all()) {
        const title = await heading.locator('h3').boundingBox(), date = await heading.locator('span').boundingBox();
        expect(date!.y - title!.y - title!.height).toBeGreaterThanOrEqual(3);
      }
    }
  }
});

test('visible copy and page titles contain no long dashes', async ({ page }) => {
  for (const route of ['/', '/about/', '/research/', '/projects/', '/experience/', '/cv/', '/work/', '/work/network-digital-twin/', '/work/state-model-regret/', '/work/deep-rl-routing/', '/work/cloud-gitops/', '/writing/', '/writing/from-digital-twins-to-routing-decisions/', '/writing/digital-twins-as-control-loops/', '/writing/state-information-and-model-fidelity/']) {
    await page.goto(route);
    expect(await page.locator('body').innerText(), route).not.toMatch(/[\u2013\u2014]/);
    expect(await page.title(), route).not.toMatch(/[\u2013\u2014]/);
  }
});

test('methodology link opens the case study at a visible heading', async ({ page }) => {
  await page.goto('/');
  await page.locator('.featured-research').getByRole('link', { name: 'See methodology' }).click();
  await expect(page).toHaveURL(/\/work\/network-digital-twin\/#methodology$/);
  await expect.poll(() => page.locator('#methodology').evaluate(element => element.getBoundingClientRect().top >= document.querySelector('.site-header')!.getBoundingClientRect().bottom - 1)).toBe(true);
});
