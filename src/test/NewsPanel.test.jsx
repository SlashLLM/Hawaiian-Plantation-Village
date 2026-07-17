import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsPanel from '../components/admin/NewsPanel.jsx';
import * as cmsAdminApi from '../lib/content/cmsAdminApi.js';

vi.mock('../hooks/useAuth.js', () => ({
  useAuth: () => ({ isAdmin: true, isStaff: true, loading: false }),
}));

vi.mock('../components/admin/MediaUploadField.jsx', () => ({
  default: () => <div data-testid="media-upload" />,
}));

describe('NewsPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(cmsAdminApi, 'fetchAllContentEntries').mockResolvedValue([
      {
        id: '1',
        slug: 'smokestack-restoration',
        content_type: 'news',
        status: 'published',
        title: 'Smokestack Restoration',
        category: 'Preservation',
        summary: 'Short',
        body: 'Long',
        event_date_label: 'July 10, 2026',
        sort_order: 1,
      },
    ]);
  });

  it('loads and displays articles', async () => {
    render(<NewsPanel />);
    expect(await screen.findByText('Smokestack Restoration')).toBeInTheDocument();
  });

  it('shows add article form for admins', async () => {
    render(<NewsPanel />);
    expect(await screen.findByRole('button', { name: 'Add article' })).toBeInTheDocument();
    expect(screen.getByText('New article')).toBeInTheDocument();
  });

  it('starts edit when Edit is clicked', async () => {
    const user = userEvent.setup();
    render(<NewsPanel />);
    await screen.findByText('Smokestack Restoration');
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByText('Edit article')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Smokestack Restoration')).toBeInTheDocument();
    const dateInput = screen.getByDisplayValue('2026-07-10');
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(screen.queryByLabelText('Slug')).not.toBeInTheDocument();
  });

  it('calls deleteContentEntry when Delete is confirmed', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const deleteSpy = vi.spyOn(cmsAdminApi, 'deleteContentEntry').mockResolvedValue();
    render(<NewsPanel />);
    await screen.findByText('Smokestack Restoration');
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(deleteSpy).toHaveBeenCalledWith('1');
  });
});
