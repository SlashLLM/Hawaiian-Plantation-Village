import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/visit',
  '/learn',
  '/play',
  '/support',
  '/tickets',
  '/about',
  '/archives',
  '/stories',
];

async function assertNoHorizontalOverflow(page) {
  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      innerWidth: window.innerWidth,
    };
  });

  expect(
    metrics.scrollWidth,
    `Horizontal overflow: scrollWidth=${metrics.scrollWidth} clientWidth=${metrics.clientWidth}`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

for (const route of ROUTES) {
  test(`no horizontal overflow on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    // Allow layout/fonts/Pixi host to settle
    await page.waitForTimeout(500);
    await assertNoHorizontalOverflow(page);
  });
}
