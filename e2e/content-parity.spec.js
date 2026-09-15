import { test, expect } from '@playwright/test';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * Content parity gate for the static-content migration.
 *
 * Captures the rendered text, title/meta and image sources of every public
 * route (and every in-page tab) against the Supabase project in .env.
 *
 *   PARITY=record  npx playwright test content-parity --project=desktop
 *     → writes e2e/__parity__/baseline.json
 *   PARITY=compare npx playwright test content-parity --project=desktop
 *     → writes e2e/__parity__/current.json and fails on any difference
 *
 * Skipped unless PARITY is set, so the normal e2e run is unaffected.
 */

const MODE = process.env.PARITY;
const DIR = fileURLToPath(new URL('./__parity__/', import.meta.url));

const CULTURES = ['hawaiian', 'chinese', 'portuguese', 'japanese', 'okinawan', 'puerto_rican', 'korean', 'filipino'];

/** Route → tab button labels to click through (local-state tabs). */
const ROUTES = [
  ['/', []],
  ['/visit', ['Hours and tours', 'Directions and parking', 'Accessibility', 'Group visits', 'Upcoming events']],
  ['/explore', []],
  ...CULTURES.map((c) => [`/explore/${c}`, []]),
  ['/stories', []],
  ['/archives', []],
  ['/archives/newsletters', []],
  ['/archives/img_6115', []],
  ['/play', []],
  ['/learn', ['School & Group Visits', 'Youth Internships & Volunteering', 'Family Learning']],
  ['/learn/elementary', []],
  ['/learn/middle', []],
  ['/learn/high', []],
  ['/events', []],
  ['/support', []],
  ['/volunteer', []],
  ['/about', ['History and mission', 'Team', 'News', 'Careers', 'Contact']],
  ['/tickets', []],
  ['/give-aloha', ['Interactive Steps', 'Original Cashier Sheet']],
];

/**
 * Page copy, site settings and ticketing are static in code, and the code is
 * newer than the linked database for those tables. Blank them out so the
 * baseline (recorded before the migration) shows the code's copy, while the
 * CMS-managed data (content entries, curriculum, custom pages, home.events)
 * still comes from Supabase in both runs.
 */
const STATIC_TABLES = ['site_settings', 'group_ticket_types', 'tour_time_slots', 'events', 'membership_tiers'];

async function blankStaticTables(page) {
  await page.route(/\/rest\/v1\/(\w+)/, async (route) => {
    const table = new URL(route.request().url()).pathname.split('/').pop();
    if (STATIC_TABLES.includes(table)) {
      return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
    }
    if (table === 'page_sections') {
      const response = await route.fetch();
      const rows = await response.json();
      const kept = Array.isArray(rows)
        ? rows.filter((r) => r.page_key === 'home' && r.section_key === 'events')
        : rows;
      return route.fulfill({ response, body: JSON.stringify(kept) });
    }
    return route.continue();
  });
}

async function settle(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);
}

async function capture(page) {
  return page.evaluate(() => ({
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
    text: document.body.innerText.replace(/[ \t]+\n/g, '\n').trim(),
    images: [...document.querySelectorAll('body img')].map((img) => img.getAttribute('src')),
  }));
}

test.describe('content parity', () => {
  test.skip(!MODE, 'Set PARITY=record or PARITY=compare to run');
  test.setTimeout(10 * 60_000);

  test('every public route renders the same content', async ({ page }) => {
    const snapshot = {};
    await blankStaticTables(page);

    for (const [route, tabs] of ROUTES) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await settle(page);
      snapshot[route] = await capture(page);

      for (const label of tabs) {
        await page.locator('main button', { hasText: label }).first().click();
        await settle(page);
        snapshot[`${route}#${label}`] = await capture(page);
      }
    }

    if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });

    if (MODE === 'record') {
      writeFileSync(`${DIR}baseline.json`, JSON.stringify(snapshot, null, 2));
      return;
    }

    writeFileSync(`${DIR}current.json`, JSON.stringify(snapshot, null, 2));
    const baseline = JSON.parse(readFileSync(`${DIR}baseline.json`, 'utf8'));
    expect(Object.keys(snapshot).sort()).toEqual(Object.keys(baseline).sort());
    for (const key of Object.keys(baseline)) {
      expect.soft(snapshot[key], `content changed on ${key}`).toEqual(baseline[key]);
    }
  });
});
