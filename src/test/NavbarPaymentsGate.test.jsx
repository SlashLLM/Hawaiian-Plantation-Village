import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_SITE_SETTINGS } from '../lib/content/fallbacks.js';

vi.mock('../context/ContentProvider.jsx', () => ({
  useSiteSettings: () => ({ settings: DEFAULT_SITE_SETTINGS, loading: false }),
}));

async function renderNavbar(paymentsEnabled) {
  vi.resetModules();
  vi.doMock('../lib/features.js', async (importOriginal) => {
    const actual = await importOriginal();
    const isComingSoon = (pageId) => !paymentsEnabled && actual.GATED_PAGE_IDS.includes(pageId);
    return {
      ...actual,
      paymentsEnabled,
      isComingSoon,
      linkIsComingSoon: (link) => isComingSoon(link?.page ?? link?.id),
    };
  });
  const { default: Navbar } = await import('../components/Navbar.jsx');
  return render(<MemoryRouter><Navbar activePage="home" /></MemoryRouter>);
}

describe('Navbar coming-soon state', () => {
  afterEach(() => vi.doUnmock('../lib/features.js'));

  it('keeps the desktop nav row free of badges so it cannot wrap', async () => {
    await renderNavbar(false);

    // The CTAs and the Support tab are all still present and clickable.
    const donate = screen.getByRole('button', { name: /donate/i });
    const tickets = screen.getByRole('button', { name: /get tickets/i });
    const support = screen.getByRole('button', { name: /support/i });
    for (const el of [donate, tickets, support]) {
      expect(el).toBeTruthy();
      expect(el.hasAttribute('disabled')).toBe(false);
    }

    // ...but none of them carries an inline badge — three of those overflow the nav.
    expect(donate.textContent).not.toMatch(/soon/i);
    expect(tickets.textContent).not.toMatch(/soon/i);
    expect(support.textContent).not.toMatch(/soon/i);
  });

  it('badges the CTAs inside the mobile menu, where there is room', async () => {
    const { container } = await renderNavbar(false);
    await import('@testing-library/user-event').then(({ default: userEvent }) =>
      userEvent.setup().click(container.querySelector('.nav-mobile-toggle')),
    );

    const menu = container.querySelector('.nav-mobile-toggle').parentElement.nextSibling;
    expect(within(menu).getByRole('button', { name: /donate/i }).textContent).toMatch(/coming soon/i);
    expect(within(menu).getByRole('button', { name: /get tickets/i }).textContent).toMatch(/coming soon/i);
  });

  it('drops every badge once payments are enabled', async () => {
    const { container } = await renderNavbar(true);
    await import('@testing-library/user-event').then(({ default: userEvent }) =>
      userEvent.setup().click(container.querySelector('.nav-mobile-toggle')),
    );
    expect(container.textContent).not.toMatch(/coming soon/i);
    expect(container.textContent).not.toMatch(/\bsoon\b/i);
  });
});
