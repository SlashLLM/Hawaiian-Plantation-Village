import { test, expect } from '@playwright/test';

/**
 * Routing smoke tests for CMS-built event pages.
 *
 * These run without seeded data, so they cover the routing and the not-found
 * path. Rendering a real built page is covered by the unit tests and by the
 * manual check once a page has been published in the CMS.
 */

test('an unknown event page shows the not-found state, not the home page', async ({ page }) => {
  await page.goto('/events/not-a-real-page', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(/could not find that page/i)).toBeVisible();
  // The catch-all route would have redirected to "/" — make sure it did not.
  expect(new URL(page.url()).pathname).toBe('/events/not-a-real-page');
});

test('the not-found state links back to the events page', async ({ page }) => {
  await page.goto('/events/not-a-real-page', { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: /see all events/i }).click();
  await expect(page).toHaveURL(/\/events$/);
});

test('the events tab does not link every event to tickets any more', async ({ page }) => {
  await page.goto('/events', { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load');
  // Learn more buttons are opt-in per event now; none of the seeded events
  // enable one, so no event row should carry a link to /tickets.
  const eventRowLinks = page.locator('.event-row a[href="/tickets"]');
  await expect(eventRowLinks).toHaveCount(0);
});
