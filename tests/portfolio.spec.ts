import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync } from 'node:fs';

test('home, project details, and contact links are usable', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', e=>errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Doan Van Tai.' })).toBeVisible();
  await expect(page.getByAltText('Doan Van Tai looking out over the sea at sunset')).toBeVisible();
  await page.getByRole('link', { name: 'Explore my research' }).click();
  await expect(page).toHaveURL(/#research$/);
  await page.getByRole('link', { name: 'Read the project', exact:true }).click();
  await expect(page.getByRole('heading', { name:'A digital twin for intelligent network management' })).toBeVisible();
  await expect(page.getByRole('heading', { name:'Limitations & open questions' })).toBeVisible();
  await page.getByRole('link', { name:'Discuss this project' }).click();
  await expect(page.locator('a[href^="mailto:"]').first()).toHaveAttribute('href','mailto:taidoan.13072005@gmail.com');
  expect(errors).toEqual([]);
});

test('theme changes persist across pages and reloads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await page.getByRole('button',{name:'Switch to dark mode'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.goto('/about/');
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.reload();
  await expect(page.getByRole('button',{name:'Switch to light mode'})).toBeVisible();
});

test('work filters and research deep link show the correct cards', async ({page}) => {
  await page.goto('/work/');
  await expect(page.locator('[data-project-category]:visible')).toHaveCount(4);
  await page.getByRole('button',{name:'Engineering',exact:true}).click();
  await expect(page.locator('[data-project-category]:visible')).toHaveCount(2);
  await expect(page.getByRole('heading',{name:'Deep RL for SDN Routing'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Network Digital Twin',exact:true})).toBeHidden();
  await page.goto('/work/?filter=research');
  await expect(page.getByRole('button',{name:'Research',exact:true})).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('[data-project-category]:visible')).toHaveCount(2);
  await page.getByRole('button',{name:'All work',exact:true}).click();
  await expect(page.locator('[data-project-category]:visible')).toHaveCount(4);
});

test('mobile navigation opens, closes, and follows a section', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  const button=page.getByRole('button',{name:'Open navigation'});
  await button.click();
  await expect(page.locator('#main-navigation')).toBeVisible();
  await page.locator('#main-navigation').getByRole('link',{name:'Experience',exact:true}).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator('#main-navigation')).toBeHidden();
  await button.click();await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded','false');
});

test('all internal links, images, and PDF resolve; private fields are excluded', async ({ page, request }) => {
  const pages=['/','/about/','/cv/','/work/','/work/network-digital-twin/','/work/state-model-regret/','/work/deep-rl-routing/','/work/cloud-gitops/','/writing/','/writing/digital-twins-as-control-loops/','/writing/state-information-and-model-fidelity/'];
  const targets=new Set<string>();
  for(const route of pages) {
    const response=await page.goto(route); expect(response?.status(),route).toBe(200);
    const text=await page.locator('body').innerText();
    expect(text).not.toMatch(/0395\s?082\s?873|395082873|InSecLab|Student ID|LinkedIn|ORCID|Google Scholar/);
    for(const href of await page.locator('a[href^="/"], img[src^="/"]').evaluateAll(els=>els.map(el=>el.getAttribute('href')||el.getAttribute('src')||'')))targets.add(href);
    // Lazy images load after entering the viewport; allow actual network delivery.
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image, route).toHaveJSProperty('complete', true);
      await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth), { message: route }).toBeGreaterThan(0);
    }
  }
  for(const target of targets) {
    const [path,hash]=target.split('#');
    const response=await request.get(path||'/');expect(response.status(),target).toBe(200);
    if(hash){await page.goto(path||'/');expect(await page.locator(`[id="${hash}"]`).count(),target).toBe(1);}
  }
  const pdf=await request.get('/files/DoanVanTai_CV.pdf');expect((await pdf.body()).subarray(0,4).toString()).toBe('%PDF');
});

test('responsive layouts fit the viewport and produce preview screenshots', async ({page}) => {
  mkdirSync('logs/screenshots',{recursive:true});
  for(const width of [360,390,768,1440]){
    await page.setViewportSize({width,height:1000});await page.goto('/');await page.evaluate(()=>document.fonts.ready);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`${width}px overflow`).toBeTruthy();
    if(width===390||width===1440)await page.screenshot({path:`logs/screenshots/home-${width}-light.png`,fullPage:true});
  }
  await page.getByRole('button',{name:'Switch to dark mode'}).click();
  await page.screenshot({path:'logs/screenshots/home-1440-dark.png',fullPage:true});
  for(const route of ['/work/network-digital-twin/','/about/','/writing/digital-twins-as-control-loops/','/cv/']){
    await page.setViewportSize({width:390,height:844});await page.goto(route);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),route).toBeTruthy();
  }
});

test('main templates pass automated WCAG A/AA checks in light and dark mode', async ({page})=>{
  for(const route of ['/','/work/','/work/network-digital-twin/','/about/','/cv/','/writing/digital-twins-as-control-loops/']){
    await page.goto(route);
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(result.violations,JSON.stringify(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))).toEqual([]);
  }
  await page.goto('/');await page.getByRole('button',{name:'Switch to dark mode'}).click();
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations).toEqual([]);
});
