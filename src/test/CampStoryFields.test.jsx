import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CampStoryFields from '../components/admin/collectionFields/CampStoryFields.jsx';

vi.mock('../lib/content/cmsApi.js', () => ({
  uploadCmsImage: vi.fn(() => Promise.resolve({ id: 'img-1', public_url: 'https://cdn.example.com/frame.jpg' })),
  uploadCmsAudio: vi.fn(() => Promise.resolve({ id: 'aud-1', public_url: 'https://cdn.example.com/a.mp3' })),
  uploadCmsVideo: vi.fn(() => Promise.resolve({ id: 'vid-1', public_url: 'https://cdn.example.com/story.mp4' })),
}));

vi.mock('../lib/content/videoFrame.js', () => ({
  readVideoDuration: vi.fn(() => Promise.resolve(185)),
  captureVideoFrame: vi.fn(() => Promise.resolve(null)),
  captureVideoFrameFile: vi.fn(() => Promise.resolve(new File(['frame'], 'story-frame.jpg', { type: 'image/jpeg' }))),
}));

import { uploadCmsImage, uploadCmsVideo } from '../lib/content/cmsApi.js';
import { captureVideoFrameFile } from '../lib/content/videoFrame.js';

const BASE_FORM = {
  slug: 'chinese',
  content_type: 'camp_story',
  page_key: 'stories',
  status: 'draft',
  title: 'Chinese Cookhouse',
  summary: '',
  body: '',
  category: 'Chinese',
  event_date_label: '',
  image_url: '',
  sort_order: 0,
  metadata: { culture: 'Chinese' },
};

function Harness({ initial = BASE_FORM, onForm }) {
  const [form, setForm] = React.useState(initial);
  onForm?.(form);
  return (
    <div className="admin-form-grid">
      <CampStoryFields form={form} setForm={setForm} entries={[]} />
      <pre data-testid="form-state">{JSON.stringify(form.metadata)}</pre>
      <span data-testid="image-url">{form.image_url}</span>
    </div>
  );
}

function metadata() {
  return JSON.parse(screen.getByTestId('form-state').textContent);
}

describe('CampStoryFields oral history media', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('defaults to audio and offers an audio upload', () => {
    render(<Harness />);
    expect(screen.getByLabelText('Recording type')).toHaveValue('audio');
    expect(screen.getByText(/upload audio/i)).toBeInTheDocument();
    expect(screen.queryByText(/upload video/i)).not.toBeInTheDocument();
  });

  it('switches to video and records the choice in metadata', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.selectOptions(screen.getByLabelText('Recording type'), 'video');

    expect(screen.getByText(/upload video/i)).toBeInTheDocument();
    expect(screen.queryByText(/upload audio/i)).not.toBeInTheDocument();
    expect(metadata().oralHistory.mediaType).toBe('video');
  });

  it('treats an existing video entry as a video recording', () => {
    render(<Harness initial={{
      ...BASE_FORM,
      metadata: { culture: 'Chinese', oralHistory: { video_url: 'https://cdn.example.com/old.mp4' } },
    }} />);
    expect(screen.getByLabelText('Recording type')).toHaveValue('video');
  });

  it('offers full screen playback, on by default, and can turn it off', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.selectOptions(screen.getByLabelText('Recording type'), 'video');

    const fullscreen = screen.getByLabelText(/full screen/i);
    expect(fullscreen).toBeChecked();

    await user.click(fullscreen);
    expect(metadata().oralHistory.allowFullscreen).toBe(false);
  });

  it('uploads a video, stores its duration and captures a frame as the default top image', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.selectOptions(screen.getByLabelText('Recording type'), 'video');

    const file = new File(['fake-video'], 'story.mp4', { type: 'video/mp4' });
    const videoInput = document.querySelector('input[type="file"][accept="video/*"]');
    await user.upload(videoInput, file);

    await waitFor(() => expect(uploadCmsVideo).toHaveBeenCalledWith(file, 'story.mp4'));
    await waitFor(() => expect(metadata().oralHistory.video_url).toBe('https://cdn.example.com/story.mp4'));
    expect(metadata().oralHistory.length).toBe('3m 05s');

    expect(captureVideoFrameFile).toHaveBeenCalled();
    await waitFor(() => expect(uploadCmsImage).toHaveBeenCalled());
    await waitFor(() => expect(metadata().oralHistory.posterUrl).toBe('https://cdn.example.com/frame.jpg'));
    // The captured frame is the default; the camp photo stays free for another image.
    expect(screen.getByTestId('image-url')).toHaveTextContent('');
  });

  it('allows marking a story as Coming Soon (placeholder)', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const checkbox = screen.getByLabelText(/mark as coming soon/i);
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(metadata().isPlaceholder).toBe(true);

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(metadata().isPlaceholder).toBe(false);
  });
});

