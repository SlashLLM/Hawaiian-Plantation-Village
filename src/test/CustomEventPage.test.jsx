import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CustomEventPage from '../pages/vintage/CustomEventPage.jsx';
import * as cmsApi from '../lib/content/cmsApi.js';
import { clearCache } from '../lib/content/cache.js';
import { resetPrefetchState } from '../lib/content/eventPagePrefetch.js';

const authState = { isAdmin: false, isStaff: false, loading: false };
vi.mock('../hooks/useAuth.js', () => ({ useAuth: () => authState }));

const PAGE = {
  id: 'p1',
  slug: 'obon-festival',
  title: 'Obon Festival',
  status: 'published',
  seo: { description: 'An evening of dance and food.' },
  blocks: [
    { id: 'b1', type: 'richText', background: 'default', title: 'What to expect', paragraphs: ['Dancing at dusk.'] },
    { id: 'b2', type: 'details', background: 'sand', title: 'Details', items: [{ label: 'Admission', value: 'Free' }] },
    { id: 'b3', type: 'somethingNew', background: 'default' },
  ],
};

function renderAt(slug = 'obon-festival') {
  return render(
    <MemoryRouter initialEntries={[`/events/${slug}`]}>
      <Routes>
        <Route path="/events/:slug" element={<CustomEventPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('CustomEventPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authState.isStaff = false;
    // The page cache is module-level and shared with the prefetcher.
    clearCache();
    resetPrefetchState();
  });

  it('renders the page blocks in order', async () => {
    vi.spyOn(cmsApi, 'fetchCustomPageBySlug').mockResolvedValue(PAGE);
    renderAt();

    expect(await screen.findByText('What to expect')).toBeInTheDocument();
    expect(screen.getByText('Dancing at dusk.')).toBeInTheDocument();
    expect(screen.getByText('Admission')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('ignores block types it does not know', async () => {
    vi.spyOn(cmsApi, 'fetchCustomPageBySlug').mockResolvedValue(PAGE);
    renderAt();
    await screen.findByText('What to expect');
    expect(screen.queryByText('somethingNew')).not.toBeInTheDocument();
  });

  it('looks the page up by its slug', async () => {
    vi.spyOn(cmsApi, 'fetchCustomPageBySlug').mockResolvedValue(PAGE);
    renderAt('obon-festival');
    await screen.findByText('What to expect');
    expect(cmsApi.fetchCustomPageBySlug).toHaveBeenCalledWith('obon-festival', { preview: false });
  });

  it('shows a not-found state with a way back to the events page', async () => {
    vi.spyOn(cmsApi, 'fetchCustomPageBySlug').mockResolvedValue(null);
    renderAt('missing');

    expect(await screen.findByText(/could not find that page/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see all events/i })).toHaveAttribute('href', '/events');
  });

  it('shows the not-found state rather than an error when the lookup fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(cmsApi, 'fetchCustomPageBySlug').mockRejectedValue(new Error('offline'));
    renderAt();
    expect(await screen.findByText(/could not find that page/i)).toBeInTheDocument();
  });

  it('requests drafts and flags the preview for staff', async () => {
    authState.isStaff = true;
    vi.spyOn(cmsApi, 'fetchCustomPageBySlug').mockResolvedValue({ ...PAGE, status: 'draft' });
    renderAt();

    expect(await screen.findByText(/staff preview/i)).toBeInTheDocument();
    expect(cmsApi.fetchCustomPageBySlug).toHaveBeenCalledWith('obon-festival', { preview: true });
  });

  it('does not flag a published page for staff', async () => {
    authState.isStaff = true;
    vi.spyOn(cmsApi, 'fetchCustomPageBySlug').mockResolvedValue(PAGE);
    renderAt();

    await screen.findByText('What to expect');
    expect(screen.queryByText(/staff preview/i)).not.toBeInTheDocument();
  });
});
