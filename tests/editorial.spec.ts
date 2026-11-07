import { test, expect } from '@playwright/test';

test('homepage introduces the person and DT4N without experiment metrics', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-description').first()).toContainText('Computer Networks student');
  await expect(page.locator('.hero-description').first()).toContainText('UIT, VNU-HCM');
  await expect(page.locator('.hero-statement')).toHaveText('Research with curiosity.Engineering with purpose.');
  const body = await page.locator('body').innerText();
  expect(body).not.toMatch(/\bp95\b|1\.017\s*s|30 trials|95%\s*CI|confidence interval|statistical test/i);
  const project = page.locator('.featured-research');
  await expect(project).toContainText('Network Digital Twin for Intelligent Network Management');
  await expect(project).toContainText('Project Lead');
  await expect(project).toContainText('Dr. Huynh Van Dang');
  await expect(project.getByRole('link', { name: 'View project', exact: true })).toHaveAttribute('href', '/work/network-digital-twin/');
});

test('technical results and their evaluation limits remain in the case study', async ({ page }) => {
  await page.goto('/work/network-digital-twin/');
  const results = page.locator('.metric-grid');
  await expect(results).toContainText('1.017 s');
  await expect(results).toContainText('30 trials');
  await expect(results).toContainText('20260915');
  await expect(results).toContainText('0.295 → 2.146 Mbps');
  await expect(results).toContainText('32 trials in 8 blocks');
  await expect(results).toContainText('95% CI [1.7729, 1.9122]');
  await expect(results).toContainText('0.0078125');
  await expect(results).toContainText('entries are not independent trials');
  await expect(page.locator('.prose')).toContainText('0.40 against a target of 0.875');
  await expect(page.locator('.prose')).toContainText('20 s against a 3 s target');
});

test('confirmed internship is consistent across Home, About, Experience, and CV', async ({ page }) => {
  for (const route of ['/', '/about/', '/experience/', '/cv/']) {
    await page.goto(route);
    await expect(page.locator('main')).toContainText('Research Intern');
    await expect(page.locator('main')).toContainText('InSecLab');
    await expect(page.locator('main')).toContainText('2026');
  }
  await page.goto('/experience/#inseclab');
  const lab = page.locator('#inseclab');
  await expect(lab).toContainText('Nov 2026 to Present');
  await expect(lab).toContainText('AI for Security');
  await expect(lab).toContainText('exploratory');
  await expect(lab).toContainText('retrieval');
  await expect(lab).toContainText('reinforcement learning');
  await expect(lab.locator('a[href*="vdanghuynh"]')).toHaveCount(0);
  await page.goto('/research/');
  await expect(page.locator('[data-project-category="research"]')).toHaveCount(2);
  await expect(page.locator('main')).not.toContainText('InSecLab');
  await expect(page.locator('main')).toContainText('uses operational data to reflect its state');
  await page.goto('/cv/');
  await expect(page.locator('[data-cv-experience="inseclab"] a[href*="vdanghuynh"]')).toHaveCount(0);
});

test('ordinary section and page headings avoid trailing full stops', async ({ page }) => {
  for (const route of ['/', '/about/', '/research/', '/projects/', '/experience/', '/writing/', '/cv/', '/work/']) {
    await page.goto(route);
    const headings = await page.locator('h1:not(#hero-title),h2,h3').evaluateAll(elements => elements.filter(element => getComputedStyle(element).display !== 'none').map(element => element.textContent?.trim()));
    expect(headings.filter(text => text?.endsWith('.')), route).toEqual([]);
  }
});
