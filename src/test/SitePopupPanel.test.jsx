import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SitePopupPanel from '../components/admin/SitePopupPanel.jsx';
import * as cmsAdminApi from '../lib/content/cmsAdminApi.js';
import * as cmsApi from '../lib/content/cmsApi.js';

vi.mock('../hooks/useAuth.js', () => ({
  useAuth: () => ({ isAdmin: true, isStaff: true, loading: false }),
}));

vi.mock('../components/admin/MediaUploadField.jsx', () => ({
  default: () => <div data-testid="media-upload" />,
}));

const SAVED = {
  id: 'sec-popup',
  page_key: 'site',
  section_key: 'popup',
  status: 'published',
  sort_order: 0,
  payload: {
    enabled: true,
    id: 'popup-1',
    image: '/images/poster.jpg',
    alt: 'Festival poster',
    caption: '',
    showUntil: '',
    link: { enabled: true, label: 'See details', kind: 'site', sitePage: 'events' },
  },
};

describe('SitePopupPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(cmsAdminApi, 'fetchAllPageSections').mockResolvedValue([SAVED]);
    vi.spyOn(cmsAdminApi, 'savePageSection').mockResolvedValue(undefined);
    vi.spyOn(cmsApi, 'fetchPublishedCustomPages').mockResolvedValue([
      { id: 'p1', slug: 'obon-festival', title: 'Obon Festival', status: 'published' },
    ]);
  });

  it('points the popup at a CMS event page', async () => {
    const user = userEvent.setup();
    render(<SitePopupPanel />);
    await screen.findByText(/on the website now/i);

    await user.selectOptions(screen.getByLabelText('Links to'), 'page');
    await user.selectOptions(screen.getByLabelText('Page'), 'obon-festival');
    await user.click(screen.getByRole('button', { name: 'Save popup' }));

    const [record, editingId] = cmsAdminApi.savePageSection.mock.calls.at(-1);
    expect(editingId).toBe('sec-popup');
    expect(record).toMatchObject({ page_key: 'site', section_key: 'popup', status: 'published' });
    expect(record.payload.link).toMatchObject({ kind: 'page', pageSlug: 'obon-festival' });
    // Same artwork, no re-show requested — visitors who closed it stay undisturbed.
    expect(record.payload.id).toBe('popup-1');
  });

  it('issues a new id when asked to re-show the popup', async () => {
    const user = userEvent.setup();
    render(<SitePopupPanel />);
    await screen.findByText(/on the website now/i);

    await user.click(screen.getByRole('checkbox', { name: /show again/i }));
    await user.click(screen.getByRole('button', { name: 'Save popup' }));

    const [record] = cmsAdminApi.savePageSection.mock.calls.at(-1);
    expect(record.payload.id).not.toBe('popup-1');
  });

  it('switches the popup off but keeps the row published', async () => {
    const user = userEvent.setup();
    render(<SitePopupPanel />);
    await screen.findByText(/on the website now/i);

    await user.click(screen.getByRole('checkbox', { name: /show the popup/i }));
    await user.click(screen.getByRole('button', { name: 'Save popup' }));

    const [record] = cmsAdminApi.savePageSection.mock.calls.at(-1);
    expect(record.status).toBe('published');
    expect(record.payload.enabled).toBe(false);
  });

  it('requires a page choice before saving', async () => {
    const user = userEvent.setup();
    render(<SitePopupPanel />);
    await screen.findByText(/on the website now/i);

    await user.selectOptions(screen.getByLabelText('Links to'), 'page');
    await user.click(screen.getByRole('button', { name: 'Save popup' }));

    expect(await screen.findByText(/choose which event page/i)).toBeInTheDocument();
    expect(cmsAdminApi.savePageSection).not.toHaveBeenCalled();
  });
});
