import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LearnMoreLink from '../components/LearnMoreLink.jsx';
import CustomEventPage from '../pages/vintage/CustomEventPage.jsx';
import * as cmsApi from '../lib/content/cmsApi.js';
import { clearCache } from '../lib/content/cache.js';
import {
  getCachedCustomPage,
  prefetchCustomPage,
  resetPrefetchState,
} from '../lib/content/eventPagePrefetch.js';
import { BLANK_LINK } from '../lib/content/links.js';

const authState = { isAdmin: false, isStaff: false, loading: false };
vi.mock('../hooks/useAuth.js', () => ({ useAuth: () => authState }));

const PAGE = {
  id: 'p1',
  slug: 'obon-festival',
  title: 'Obon Festival',
  status: 'published',
  seo: {},
  blocks: [
    { id: 'b1', type: 'image', background: 'default', image: '/poster.png', imageAlt: 'Poster' },
    { id: 'b2', type: 'richText', background: 'default', title: 'What to expect' },
  ],
};

const PAGE_LINK = { ...BLANK_LINK, enabled: true, kind: 'page', pageSlug: 'obon-festival' };

describe('event page prefetching', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearCache();
    resetPrefetchState();
    authState.isStaff = false;
    vi.spyOn(cmsApi, 'fetchCustomPageBySlug').mockResolvedValue(PAGE);
  });

  it('fetches the page when a visitor hovers the link', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LearnMoreLink link={PAGE_LINK} />
      </MemoryRouter>,
    );

    await user.hover(screen.getByRole('link'));
    await waitFor(() =>
      expect(cmsApi.fetchCustomPageBySlug).toHaveBeenCalledWith('obon-festival', { preview: false }),
    );
    await waitFor(() => expect(getCachedCustomPage('obon-festival')).toEqual(PAGE));
  });

  it('does not prefetch external links', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LearnMoreLink link={{ ...BLANK_LINK, enabled: true, kind: 'external', url: 'https://x.test' }} />
      </MemoryRouter>,
    );
    await user.hover(screen.getByRole('link'));
    expect(cmsApi.fetchCustomPageBySlug).not.toHaveBeenCalled();
  });

  it('collapses repeated warming into a single request', async () => {
    await Promise.all([
      prefetchCustomPage('obon-festival'),
      prefetchCustomPage('obon-festival'),
      prefetchCustomPage('obon-festival'),
    ]);
    expect(cmsApi.fetchCustomPageBySlug).toHaveBeenCalledTimes(1);

    await prefetchCustomPage('obon-festival');
    expect(cmsApi.fetchCustomPageBySlug).toHaveBeenCalledTimes(1);
  });

  it('renders a warmed page with no loading state and no second fetch', async () => {
    await prefetchCustomPage('obon-festival');
    expect(cmsApi.fetchCustomPageBySlug).toHaveBeenCalledTimes(1);

    render(
      <MemoryRouter initialEntries={['/events/obon-festival']}>
        <Routes>
          <Route path="/events/:slug" element={<CustomEventPage />} />
        </Routes>
      </MemoryRouter>,
    );

    // Present on the very first frame — no "Loading…" in between.
    expect(screen.getByText('What to expect')).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(cmsApi.fetchCustomPageBySlug).toHaveBeenCalledTimes(1);
  });

  it('still shows a loading state when nothing was warmed', async () => {
    let release;
    cmsApi.fetchCustomPageBySlug.mockReturnValue(new Promise((r) => { release = r; }));

    render(
      <MemoryRouter initialEntries={['/events/obon-festival']}>
        <Routes>
          <Route path="/events/:slug" element={<CustomEventPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    release(PAGE);
    expect(await screen.findByText('What to expect')).toBeInTheDocument();
  });

  it('caches a known miss so a bad slug is not refetched', async () => {
    cmsApi.fetchCustomPageBySlug.mockResolvedValue(null);
    await prefetchCustomPage('missing');
    expect(getCachedCustomPage('missing')).toBeNull();

    await prefetchCustomPage('missing');
    expect(cmsApi.fetchCustomPageBySlug).toHaveBeenCalledTimes(1);
  });

  it('keeps staff previews separate from the public copy', async () => {
    await prefetchCustomPage('obon-festival', { preview: false });
    expect(getCachedCustomPage('obon-festival', { preview: true })).toBeUndefined();

    await prefetchCustomPage('obon-festival', { preview: true });
    expect(cmsApi.fetchCustomPageBySlug).toHaveBeenCalledTimes(2);
  });

  it('swallows a failed prefetch instead of rejecting', async () => {
    cmsApi.fetchCustomPageBySlug.mockRejectedValue(new Error('offline'));
    await expect(prefetchCustomPage('obon-festival')).resolves.toBeNull();
  });
});
