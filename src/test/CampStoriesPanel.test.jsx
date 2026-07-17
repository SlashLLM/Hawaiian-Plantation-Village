import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CampStoriesPanel from '../components/admin/CampStoriesPanel.jsx';
import * as cmsAdminApi from '../lib/content/cmsAdminApi.js';

vi.mock('../hooks/useAuth.js', () => ({
  useAuth: () => ({ isAdmin: true, isStaff: true, loading: false }),
}));

vi.mock('../components/admin/MediaUploadField.jsx', () => ({
  default: () => <div data-testid="media-upload" />,
}));

vi.mock('../components/admin/AudioUploadField.jsx', () => ({
  default: () => <div data-testid="audio-upload" />,
}));

describe('CampStoriesPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(cmsAdminApi, 'fetchAllContentEntries').mockResolvedValue([
      {
        id: '2',
        slug: 'chinese',
        content_type: 'camp_story',
        page_key: 'stories',
        status: 'published',
        title: 'Chinese Cookhouse',
        summary: 'Short',
        body: 'Long',
        category: 'Chinese',
        sort_order: 1,
        metadata: {
          culture: 'Chinese',
          arrival: '1852',
          oralHistory: {
            narrator: 'Siu Lung Chang',
            length: '2m 45s',
            audioSimText: 'Recording: archive',
            transcript: 'My grandfather came in 1888.',
            audio_url: 'https://example.com/a.mp3',
          },
        },
      },
    ]);
  });

  it('loads and displays camp stories', async () => {
    render(<CampStoriesPanel />);
    expect(await screen.findByText('Chinese Cookhouse')).toBeInTheDocument();
  });

  it('shows add camp story form for admins', async () => {
    render(<CampStoriesPanel />);
    expect(await screen.findByRole('button', { name: 'Add camp story' })).toBeInTheDocument();
    expect(screen.getByText('New camp story')).toBeInTheDocument();
  });

  it('shows empty state when no stories', async () => {
    vi.spyOn(cmsAdminApi, 'fetchAllContentEntries').mockResolvedValue([]);
    render(<CampStoriesPanel />);
    expect(await screen.findByText('No camp stories yet')).toBeInTheDocument();
  });

  it('starts edit when Edit is clicked', async () => {
    const user = userEvent.setup();
    render(<CampStoriesPanel />);
    await screen.findByText('Chinese Cookhouse');
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByText('Edit camp story')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Chinese Cookhouse')).toBeInTheDocument();
    expect(screen.queryByLabelText('Slug')).not.toBeInTheDocument();
  });

  it('shows camp story oral history fields', async () => {
    const user = userEvent.setup();
    render(<CampStoriesPanel />);
    await screen.findByText('Chinese Cookhouse');
    await user.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getByText('Oral history')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Culture' })).toHaveValue('Chinese');
    expect(screen.getByDisplayValue('Siu Lung Chang')).toBeInTheDocument();
    expect(screen.getByDisplayValue('My grandfather came in 1888.')).toBeInTheDocument();
    expect(screen.getByTestId('audio-upload')).toBeInTheDocument();
    expect(screen.queryByText('Metadata (JSON)')).not.toBeInTheDocument();
  });

  it('calls deleteContentEntry when Delete is confirmed', async () => {
    const user = userEvent.setup();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const deleteSpy = vi.spyOn(cmsAdminApi, 'deleteContentEntry').mockResolvedValue();
    render(<CampStoriesPanel />);
    await screen.findByText('Chinese Cookhouse');
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(deleteSpy).toHaveBeenCalledWith('2');
  });
});
