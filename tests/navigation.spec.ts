import { test, expect } from '@playwright/test';

const destinations = [
  { label: 'Home', path: '/', title: 'Doan Van Tai.' },
  { label: 'About', path: '/about/', title: 'About Doan Van Tai' },
  { label: 'Research', path: '/research/', title: 'Research' },
  { label: 'Projects', path: '/projects/', title: 'Selected Projects' },
  { label: 'Experience', path: '/experience/', title: 'Experience & Education' },
  { label: 'Writing', path: '/writing/', title: 'Writing & Notes' },
  { label: 'CV', path: '/cv/', title: 'Curriculum Vitae' },
];

for (const width of [390, 1440]) {
  test(`main navigation opens dedicated pages and marks the current page at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    for (const destination of destinations) {
      await test.step(destination.label, async () => {
        if (width === 390) await page.getByRole('button', { name: 'Open navigation' }).click();
        const nav = page.getByRole('navigation', { name: 'Main navigation' });
        const link = nav.getByRole('link', { name: destination.label, exact: true });
        await expect(link).toHaveAttribute('href', destination.path);
        await link.click();
        await expect(page).toHaveURL(url => url.pathname === destination.path && !url.hash && !url.search);
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(destination.title, { useInnerText: true });
        const current = page.locator('#main-navigation [aria-current="page"]');
        await expect(current).toHaveCount(1);
        await expect(current).toHaveAttribute('href', destination.path);
        if (width === 390) await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
        if (destination.path !== '/') await expect(page.locator('#hero-title')).toHaveCount(0);
      });
    }
  });

  test(`direct visits, refresh, and browser Back/Forward retain the correct page at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/about/');
    await page.getByRole('navigation', { name: 'Footer navigation' }).getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL(/\/projects\/$/);
    await page.getByRole('link', { name: 'Read Deep RL for SDN Routing', exact: true }).click();
    await expect(page).toHaveURL(/\/work\/deep-rl-routing\/$/);
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Learning adaptive routes in software-defined networks');
    await page.goBack();
    await expect(page).toHaveURL(/\/projects\/$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/about\/$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/projects\/$/);
    await expect(page.locator('#main-navigation [aria-current="page"]')).toHaveText('Projects');
  });
}

test('research, engineering, and experience have distinct content with confirmed supervision', async ({ page }) => {
  await page.goto('/research/');
  await expect(page.locator('[data-project-category="research"]')).toHaveCount(2);
  await expect(page.locator('[data-project-category="engineering"]')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Current research question', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'From DT4N to State-Model-Regret', exact: true })).toBeVisible();
  await expect(page.locator('.research-context')).toContainText('Dr. Huynh Van Dang');
  await page.goto('/projects/');
  await expect(page.locator('[data-project-category="engineering"]')).toHaveCount(2);
  await expect(page.locator('[data-project-category="research"]')).toHaveCount(0);
  await page.goto('/experience/');
  await expect(page.locator('.timeline-item')).toHaveCount(3);
  for (const item of await page.locator('[data-experience-kind="research"]').all()) await expect(item).toContainText('Dr. Huynh Van Dang');
  await expect(page.getByRole('heading', { name: 'Education', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Certification', exact: true })).toBeVisible();
  await expect(page.locator('#inseclab')).toContainText('Research Intern');
  await expect(page.locator('#inseclab')).toContainText('AI for Security');
});

test('case studies and notes retain their section and appropriate overview links', async ({ page }) => {
  for (const [slug, label, overview] of [
    ['network-digital-twin', 'Research', '/research/'],
    ['state-model-regret', 'Research', '/research/'],
    ['deep-rl-routing', 'Projects', '/projects/'],
    ['cloud-gitops', 'Projects', '/projects/'],
  ]) {
    await page.goto(`/work/${slug}/`);
    await expect(page.locator('#main-navigation [aria-current="page"]')).toHaveText(label);
    await expect(page.locator('.breadcrumb')).toHaveAttribute('href', overview);
    await expect(page.locator('.next-work a').first()).toHaveAttribute('href', overview);
    const next = page.locator('.next-work a').last();
    await next.click();
    await expect(page.locator('#main-navigation [aria-current="page"]')).toHaveText(label);
    await page.locator('.breadcrumb').click();
    await expect(page).toHaveURL(url => url.pathname === overview);
  }
  await page.goto('/writing/from-digital-twins-to-routing-decisions/');
  await expect(page.locator('#main-navigation [aria-current="page"]')).toHaveText('Writing');
  await expect(page.locator('.breadcrumb')).toHaveAttribute('href', '/writing/');
});

test('mobile disclosure supports keyboard, Escape, outside interaction, resize, and short screens', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/about/');
  const menu = page.locator('.menu-toggle');
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-navigation a').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Space');
  await page.mouse.click(380, 800);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.locator('main a').first().focus();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#main-navigation')).toBeVisible();
  await page.setViewportSize({ width: 568, height: 320 });
  await expect(page.locator('#main-navigation')).toBeHidden();
  await menu.click();
  const contact = page.locator('#main-navigation').getByRole('link', { name: 'Contact', exact: true });
  await contact.scrollIntoViewIfNeeded();
  const box = await contact.boundingBox();
  expect(box!.y + box!.height).toBeLessThanOrEqual(320);
  await contact.click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('work archive filters survive refresh and browser history', async ({ page }) => {
  await page.goto('/work/');
  await page.getByRole('button', { name: 'Engineering', exact: true }).click();
  await expect(page).toHaveURL(/\/work\/\?filter=engineering$/);
  await expect(page.locator('#main-navigation [aria-current="page"]')).toHaveText('Projects');
  await page.getByRole('button', { name: 'Research', exact: true }).click();
  await expect(page).toHaveURL(/\/work\/\?filter=research$/);
  await page.reload();
  await expect(page.locator('[data-project-category="research"]:visible')).toHaveCount(2);
  await page.goBack();
  await expect(page.getByRole('button', { name: 'Engineering', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-project-category="engineering"]:visible')).toHaveCount(2);
  await page.goForward();
  await expect(page.getByRole('button', { name: 'Research', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page).toHaveURL(/\/work\/$/);
  await expect(page.locator('[data-project-category]:visible')).toHaveCount(4);
  await page.goBack();
  await expect(page.locator('[data-project-category="research"]:visible')).toHaveCount(2);
});

test('direct heading links remain visible below the sticky header', async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [route, id] of [['/#about', 'about-title'], ['/work/network-digital-twin/#results', 'results']]) {
      await page.goto(route);
      await expect.poll(() => page.evaluate(id => {
        const top = document.getElementById(id)!.getBoundingClientRect().top;
        return top >= document.querySelector('.site-header')!.getBoundingClientRect().bottom - 1 && top < innerHeight;
      }, id)).toBe(true);
    }
  }
});

test('sitemap and social metadata use the custom domain and include dedicated pages', async ({ page, request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  expect(new Set(urls).size).toBe(urls.length);
  for (const destination of destinations) {
    const expected = `https://taidv.id.vn${destination.path}`;
    expect(urls).toContain(expected);
    await page.goto(destination.path);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', expected);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', expected);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://taidv.id.vn/images/tai-sunset.jpg');
  }
});

test('conceptual diagram captions stay inside their image frames', async ({ page }) => {
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/research/', '/projects/', '/work/']) {
      await page.goto(route);
      const captions = await page.locator('.project-image .figure-caption').evaluateAll(elements => elements.map(element => {
        const caption = element.getBoundingClientRect();
        const frame = element.closest('.project-image')!.getBoundingClientRect();
        return { text: element.textContent, fits: caption.top >= frame.top && caption.bottom <= frame.bottom + 1 && caption.left >= frame.left && caption.right <= frame.right + 1 };
      }));
      expect(captions.length, route).toBeGreaterThan(0);
      expect(captions.filter(caption => !caption.fits), `${route} at ${width}px`).toEqual([]);
    }
  }
});
