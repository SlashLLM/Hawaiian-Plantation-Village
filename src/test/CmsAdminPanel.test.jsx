import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CmsAdminPanel from '../components/admin/CmsAdminPanel.jsx';

vi.mock('../lib/supabase.js', () => {
  const chain = {
    select: vi.fn(() => chain),
    order: vi.fn(() => chain),
    eq: vi.fn(() => chain),
    or: vi.fn(() => chain),
    then: (resolve) => Promise.resolve({ data: [], error: null }).then(resolve),
  };
  return {
    supabase: { from: vi.fn(() => chain) },
    isSupabaseConfigured: true,
  };
});

vi.mock('../hooks/useAuth.js', () => ({
  useAuth: () => ({ isAdmin: true, isStaff: true, loading: false }),
}));

vi.mock('../lib/content/cmsAdminApi.js', () => ({
  fetchAllContentEntries: vi.fn(() => Promise.resolve([])),
  fetchAllPageSections: vi.fn(() => Promise.resolve([])),
  saveSiteSettings: vi.fn(),
  saveContentEntry: vi.fn(),
  savePageSection: vi.fn(),
  setContentEntryStatus: vi.fn(),
  setPageSectionStatus: vi.fn(),
  deleteContentEntry: vi.fn(),
  fetchCatalogData: vi.fn(() => Promise.resolve({ events: [], tiers: [], groupTickets: [], tourSlots: [] })),
  fetchCurriculumModulesAdmin: vi.fn(() => Promise.resolve([])),
}));

vi.mock('../components/admin/MediaUploadField.jsx', () => ({
  default: () => <div data-testid="media-upload" />,
}));

vi.mock('../components/admin/AudioUploadField.jsx', () => ({
  default: () => <div data-testid="audio-upload" />,
}));

vi.mock('../components/admin/VideoUploadField.jsx', () => ({
  default: () => <div data-testid="video-upload" />,
}));

describe('CmsAdminPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders item CMS tabs without Pages or Collections', () => {
    render(<CmsAdminPanel />);
    expect(screen.getByRole('button', { name: 'Stories' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upcoming Events' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'News & Announcements' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Careers' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Curriculum' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Site settings' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pages' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Collections' })).not.toBeInTheDocument();
  });

  it('shows stories panel by default', async () => {
    render(<CmsAdminPanel />);
    expect(await screen.findByText(/plantation camp stories/i)).toBeInTheDocument();
  });

  it('switches to news, careers, curriculum, and upcoming events tabs', async () => {
    const user = userEvent.setup();
    render(<CmsAdminPanel />);

    await user.click(screen.getByRole('button', { name: 'News & Announcements' }));
    expect(await screen.findByText(/news and announcements/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Careers' }));
    expect(await screen.findByText(/career openings/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Curriculum' }));
    expect(screen.getByText('No modules yet')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Upcoming Events' }));
    expect(await screen.findByText(/upcoming community programs/i)).toBeInTheDocument();
  });
});
