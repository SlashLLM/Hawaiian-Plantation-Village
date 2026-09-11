import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Stories from '../pages/vintage/Stories.jsx';
import { DEFAULT_PAGE_SECTIONS } from '../lib/content/fallbacks.js';

const VIDEO_CAMP = {
  id: 'chinese',
  culture: 'Chinese',
  title: 'Chinese Cookhouse',
  arrival: '1852',
  shortDesc: 'Short',
  fullHistory: 'Long',
  image_url: '',
  oralHistory: {
    mediaType: 'video',
    narrator: 'Siu Lung Chang',
    length: '3m 05s',
    audioSimText: 'Recording: Chang family oral archive',
    transcript: 'My grandfather came in 1888.',
    video_url: 'https://cdn.example.com/story.mp4',
    posterUrl: 'https://cdn.example.com/frame.jpg',
  },
};

const AUDIO_CAMP = {
  ...VIDEO_CAMP,
  id: 'japanese',
  culture: 'Japanese',
  title: 'Japanese Furo',
  oralHistory: {
    mediaType: 'audio',
    narrator: 'Aiko Tanaka',
    length: '2m 45s',
    audio_url: 'https://cdn.example.com/story.mp3',
    transcript: 'The bathhouse was the heart of the camp.',
  },
};

let campItems = [VIDEO_CAMP];

vi.mock('../context/ContentProvider.jsx', () => ({
  useContentCollection: () => ({ items: campItems, loading: false }),
  usePageSection: (pageKey, sectionKey) => ({
    section: DEFAULT_PAGE_SECTIONS[pageKey]?.[sectionKey] ?? {},
    loading: false,
  }),
}));

async function openDrawer() {
  const user = userEvent.setup();
  const view = render(<Stories />);
  await user.click(screen.getByRole('button', { name: /explore camp & oral histories/i }));
  return { user, ...view };
}

describe('Stories oral history playback', () => {
  it('plays a video oral history with a full screen control', async () => {
    campItems = [VIDEO_CAMP];
    const { container } = await openDrawer();

    const video = container.querySelector('video');
    expect(video).toBeTruthy();
    expect(video.getAttribute('src')).toBe('https://cdn.example.com/story.mp4');
    expect(video.getAttribute('controlslist')).toBeNull();
    expect(screen.getByLabelText(/full screen/i)).toBeInTheDocument();
    expect(screen.getByText('ORAL HISTORY FILM ARCHIVE')).toBeInTheDocument();
    expect(screen.getByText('Siu Lung Chang')).toBeInTheDocument();
  });

  it('uses the captured video frame as the top image when no camp photo is set', async () => {
    campItems = [VIDEO_CAMP];
    await openDrawer();

    expect(screen.getByRole('img', { name: 'Chinese Cookhouse' })).toHaveAttribute(
      'src',
      'https://cdn.example.com/frame.jpg',
    );
  });

  it('prefers an uploaded camp photo over the video frame', async () => {
    campItems = [{ ...VIDEO_CAMP, image_url: 'https://cdn.example.com/camp.jpg' }];
    await openDrawer();

    expect(screen.getByRole('img', { name: 'Chinese Cookhouse' })).toHaveAttribute(
      'src',
      'https://cdn.example.com/camp.jpg',
    );
  });

  it('hides full screen playback when the editor turned it off', async () => {
    campItems = [{
      ...VIDEO_CAMP,
      oralHistory: { ...VIDEO_CAMP.oralHistory, allowFullscreen: false },
    }];
    const { container } = await openDrawer();

    expect(screen.queryByLabelText(/full screen/i)).not.toBeInTheDocument();
    expect(container.querySelector('video').getAttribute('controlslist')).toContain('nofullscreen');
  });

  it('still renders the vintage audio player for audio oral histories', async () => {
    campItems = [AUDIO_CAMP];
    const { container } = await openDrawer();

    expect(container.querySelector('video')).toBeNull();
    expect(container.querySelector('audio')).toBeTruthy();
    expect(screen.getByText('ORAL HISTORY SOUND ARCHIVE')).toBeInTheDocument();
    expect(screen.getByLabelText(/play oral history recording/i)).toBeInTheDocument();
  });

  it('displays COMING SOON tag for placeholder stories and does not open the side panel when clicked', async () => {
    const user = userEvent.setup();
    const PLACEHOLDER_CAMP = {
      id: 'filipino',
      culture: 'Filipino',
      title: 'The Filipino Single-Men Barracks',
      arrival: '1906',
      shortDesc: 'Filipino Sakadas arrived starting in 1906.',
      fullHistory: 'Full history of the Filipino camp.',
      isPlaceholder: true,
    };
    campItems = [PLACEHOLDER_CAMP];
    render(<Stories />);

    // Tag is present
    expect(screen.getByText('COMING SOON')).toBeInTheDocument();
    expect(screen.getByText('ARRIVED 1906')).toBeInTheDocument();

    // Button is disabled with coming soon label
    const comingSoonBtn = screen.getByRole('button', { name: /oral history coming soon/i });
    expect(comingSoonBtn).toBeDisabled();

    // Attempting to click does NOT open the side panel drawer
    await user.click(comingSoonBtn);
    expect(screen.queryByText('Filipino Community Archive')).not.toBeInTheDocument();
    expect(screen.queryByText('HISTORICAL RECORDS')).not.toBeInTheDocument();
  });

  it('auto-detects stories without audio or video as placeholder', async () => {
    const user = userEvent.setup();
    const NO_MEDIA_CAMP = {
      id: 'korean',
      culture: 'Korean',
      title: 'The Korean Cottage',
      arrival: '1903',
      shortDesc: 'Korean immigrants arrived in 1903.',
      oralHistory: {
        narrator: 'Young-Hee Park',
        length: '3m 50s',
        transcript: 'We gathered at the camp chapel.',
      },
    };
    campItems = [NO_MEDIA_CAMP];
    render(<Stories />);

    expect(screen.getByText('COMING SOON')).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /oral history coming soon/i });
    expect(btn).toBeDisabled();

    await user.click(btn);
    expect(screen.queryByText('Korean Community Archive')).not.toBeInTheDocument();
  });
});

