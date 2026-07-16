import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CmsAdminPanel from '../components/admin/CmsAdminPanel.jsx';

vi.mock('../lib/supabase.js', () => {
  const chain = {
    select: vi.fn(() => chain),
    order: vi.fn(() => chain),
    eq: vi.fn(() => chain),
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
  fetchCatalogData: vi.fn(() => Promise.resolve({ events: [], tiers: [], groupTickets: [], tourSlots: [] })),
  fetchCurriculumModulesAdmin: vi.fn(() => Promise.resolve([])),
}));

describe('CmsAdminPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all five CMS tabs', () => {
    render(<CmsAdminPanel />);
    expect(screen.getByRole('button', { name: 'Collections' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page sections' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Site settings' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Catalog' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Curriculum' })).toBeInTheDocument();
  });

  it('shows collections panel by default', async () => {
    render(<CmsAdminPanel />);
    expect(await screen.findByText(/Repeatable lists/)).toBeInTheDocument();
  });

  it('switches tabs when clicked', async () => {
    const user = userEvent.setup();
    render(<CmsAdminPanel />);
    await user.click(screen.getByRole('button', { name: 'Catalog' }));
    expect(screen.getByText(/Operational catalog/)).toBeInTheDocument();
  });
});
