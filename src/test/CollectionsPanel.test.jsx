import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CollectionsPanel from '../components/admin/CollectionsPanel.jsx';
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

describe('CollectionsPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(cmsAdminApi, 'fetchAllContentEntries').mockResolvedValue([
      { id: '1', slug: 'test-news', content_type: 'news', status: 'published', title: 'Test News', sort_order: 1 },
    ]);
  });

  it('loads and displays entries', async () => {
    render(<CollectionsPanel />);
    expect(await screen.findByText('Test News')).toBeInTheDocument();
  });

  it('shows add entry form for admins', async () => {
    render(<CollectionsPanel />);
    expect(await screen.findByRole('button', { name: 'Add entry' })).toBeInTheDocument();
    expect(screen.getByText('New collection entry')).toBeInTheDocument();
  });

  it('shows empty state when no entries match filter', async () => {
    vi.spyOn(cmsAdminApi, 'fetchAllContentEntries').mockResolvedValue([]);
    render(<CollectionsPanel />);
    expect(await screen.findByText('No entries yet')).toBeInTheDocument();
  });

  it('starts edit when Edit is clicked', async () => {
    const user = userEvent.setup();
    render(<CollectionsPanel />);
    await screen.findByText('Test News');
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByText('Edit entry')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test-news')).toBeInTheDocument();
  });

  it('shows camp story oral history fields instead of raw JSON metadata', async () => {
    const user = userEvent.setup();
    vi.spyOn(cmsAdminApi, 'fetchAllContentEntries').mockResolvedValue([
      {
        id: '2',
        slug: 'chinese',
        content_type: 'camp_story',
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
    render(<CollectionsPanel />);
    await screen.findByText('Chinese Cookhouse');
    await user.click(screen.getByRole('button', { name: 'Edit' }));

    expect(screen.getByText('Oral history')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Culture' })).toHaveValue('Chinese');
    expect(screen.getByDisplayValue('Siu Lung Chang')).toBeInTheDocument();
    expect(screen.getByDisplayValue('My grandfather came in 1888.')).toBeInTheDocument();
    expect(screen.getByTestId('audio-upload')).toBeInTheDocument();
    expect(screen.queryByText('Metadata (JSON)')).not.toBeInTheDocument();
  });
});