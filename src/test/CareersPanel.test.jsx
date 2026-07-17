import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CareersPanel from '../components/admin/CareersPanel.jsx';
import * as cmsAdminApi from '../lib/content/cmsAdminApi.js';

vi.mock('../hooks/useAuth.js', () => ({
  useAuth: () => ({ isAdmin: true, isStaff: true, loading: false }),
}));

describe('CareersPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(cmsAdminApi, 'fetchAllContentEntries').mockResolvedValue([
      {
        id: '1',
        slug: 'docent',
        content_type: 'career',
        status: 'published',
        title: 'Cultural Heritage Docent',
        summary: 'Lead tours',
        sort_order: 1,
        metadata: {
          type: 'Part-Time',
          department: 'Education',
          compensation: '$19.50 / hour',
          hours: '15-20 hours / week',
          responsibilities: ['Lead groups'],
          requirements: ['Public speaking'],
        },
      },
    ]);
  });

  it('loads and displays jobs', async () => {
    render(<CareersPanel />);
    expect(await screen.findByText('Cultural Heritage Docent')).toBeInTheDocument();
  });

  it('shows guided career fields on edit', async () => {
    const user = userEvent.setup();
    render(<CareersPanel />);
    await screen.findByText('Cultural Heritage Docent');
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByText('Edit job')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Part-Time')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Lead groups')).toBeInTheDocument();
    expect(screen.queryByText('Metadata (JSON)')).not.toBeInTheDocument();
  });

  it('calls deleteContentEntry when Delete is confirmed', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const deleteSpy = vi.spyOn(cmsAdminApi, 'deleteContentEntry').mockResolvedValue();
    render(<CareersPanel />);
    await screen.findByText('Cultural Heritage Docent');
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(deleteSpy).toHaveBeenCalledWith('1');
  });
});
