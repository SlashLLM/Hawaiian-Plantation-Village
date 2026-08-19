import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { DEFAULT_PAGE_SECTIONS } from '../lib/content/fallbacks.js';

const listItems = { current: DEFAULT_PAGE_SECTIONS.home.events.items };

vi.mock('../context/ContentProvider.jsx', () => ({
  useContent: () => ({ groupTickets: [], tourSlots: [] }),
  usePageSection: (pageKey, sectionKey) => ({
    section: DEFAULT_PAGE_SECTIONS[pageKey]?.[sectionKey] ?? {},
    loading: false,
  }),
  usePageListSection: () => ({ items: listItems.current, section: {}, loading: false }),
}));

const { default: Visit } = await import('../pages/vintage/Visit.jsx');

describe('Visit → Upcoming events tab', () => {
  it('shows the empty state when every CMS event is undated', async () => {
    listItems.current = DEFAULT_PAGE_SECTIONS.home.events.items;
    const user = userEvent.setup();
    render(<MemoryRouter><Visit /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Upcoming events' }));
    expect(screen.getByText(/No dated events are scheduled right now/)).toBeTruthy();
  });

  it('renders the calendar once an event has a startDate', async () => {
    listItems.current = [
      { slug: 'obon', startDate: '2026-08-15', date: 'Aug 15', title: 'Obon', time: '', desc: 'd' },
      ...DEFAULT_PAGE_SECTIONS.home.events.items,
    ];
    const user = userEvent.setup();
    render(<MemoryRouter><Visit /></MemoryRouter>);
    await user.click(screen.getByRole('button', { name: 'Upcoming events' }));
    expect(screen.getByText('August 2026')).toBeTruthy();
    expect(screen.getByRole('button', { name: /August 15, 2026 — 1 event/ })).toBeTruthy();
    // undated seasonal events stay hidden
    expect(screen.queryByText('Portuguese Festa')).toBeNull();
  });

  it('leaves the other four tabs working', async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Visit /></MemoryRouter>);
    expect(screen.getByText(/Opening hours/)).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Directions and parking' }));
    expect(screen.getByText(/Directions to the village/)).toBeTruthy();
  });
});
