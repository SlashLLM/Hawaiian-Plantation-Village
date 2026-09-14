import { test, expect } from '@playwright/test';
import { ACTIVE_POSTER } from '../src/lib/eventPoster.js';

// Must match DESIGN_W / DESIGN_H in src/components/SugarMakerPixi.jsx
const DESIGN_W = 700;
const DESIGN_H = 400;

/**
 * Drives the Pixi canvas with real touch input (CDP) on touch projects and the
 * mouse on desktop. Coordinates are given in the game's 700×400 design space.
 */
async function createPointer(page, hasTouch) {
  const canvas = page.locator('.pixi-canvas-host canvas');
  let box;
  // Re-measure before each gesture: clicking the stage buttons can scroll the page
  const measure = async () => {
    await canvas.scrollIntoViewIfNeeded();
    box = await canvas.boundingBox();
  };
  const toPage = ([x, y]) => ({
    x: box.x + (x * box.width) / DESIGN_W,
    y: box.y + (y * box.height) / DESIGN_H,
  });

  if (hasTouch) {
    const cdp = await page.context().newCDPSession(page);
    const touch = (type, point) =>
      cdp.send('Input.dispatchTouchEvent', {
        type,
        touchPoints: type === 'touchEnd' ? [] : [toPage(point)],
      });
    return {
      async drag(points) {
        await measure();
        await touch('touchStart', points[0]);
        for (const point of points.slice(1)) await touch('touchMove', point);
        await touch('touchEnd');
      },
      async tap(point) {
        await measure();
        await touch('touchStart', point);
        await touch('touchEnd');
      },
    };
  }

  return {
    async drag(points) {
      await measure();
      const start = toPage(points[0]);
      await page.mouse.move(start.x, start.y);
      await page.mouse.down();
      for (const point of points.slice(1)) {
        const p = toPage(point);
        await page.mouse.move(p.x, p.y);
      }
      await page.mouse.up();
    },
    async tap(point) {
      await measure();
      const p = toPage(point);
      await page.mouse.click(p.x, p.y);
    },
  };
}

test('Sugar Mill Tycoon can be completed with touch / pointer input', async ({ page }, testInfo) => {
  const hasTouch = Boolean(testInfo.project.use.hasTouch);

  // Skip the promo poster so it never covers the game
  if (ACTIVE_POSTER) {
    await page.addInitScript((id) => {
      window.localStorage.setItem(`hpv:poster-seen:${id}`, '1');
    }, ACTIVE_POSTER.id);
  }

  await page.goto('/play', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.pixi-canvas-host canvas')).toBeVisible();
  const pointer = await createPointer(page, hasTouch);

  // Stage 1: one swipe across every stalk's cut line
  const swipe = [];
  for (let x = 60; x <= 640; x += 20) swipe.push([x, 330]);
  await pointer.drag(swipe);
  await expect(page.getByText('5 / 5')).toBeVisible();
  await page.getByRole('button', { name: /Send Stalks to Mill/ }).click();

  // Stage 2: crank the flywheel three full turns by its rim
  const crank = [];
  for (let i = 0; i <= 3 * 36; i++) {
    const a = -Math.PI / 2 + (i / 36) * Math.PI * 2;
    crank.push([520 + Math.cos(a) * 56, 190 + Math.sin(a) * 56]);
  }
  await pointer.drag(crank);
  await expect(page.getByText('100%')).toBeVisible();
  await page.getByRole('button', { name: /Pump to Boiling Vat/ }).click();

  // Stage 3: turn on heat, then skim the four scum clumps
  await page.getByRole('button', { name: 'HIGH' }).click();
  await expect(page.getByText(/Turn on the burner heat/)).toBeHidden();
  for (const point of [[240, 115], [310, 120], [390, 116], [460, 120]]) {
    await pointer.tap(point);
  }
  await expect(page.getByText('100%')).toBeVisible();
  await page.getByRole('button', { name: /Pump to Centrifuge/ }).click();

  // Stage 4: tap the centrifuge until the sugar is dry (8% per tap)
  for (let i = 0; i < 13; i++) await pointer.tap([350, 200]);
  await expect(page.getByText('100%')).toBeVisible();
  await page.getByRole('button', { name: /Collect Sugar Crystals/ }).click();

  await expect(page.getByRole('heading', { name: 'Mill Master Tycoon!' })).toBeVisible();
});
