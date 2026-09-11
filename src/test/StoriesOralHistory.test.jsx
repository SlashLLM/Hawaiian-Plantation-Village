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
});
