import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoUploadField from '../components/admin/VideoUploadField.jsx';

vi.mock('../lib/content/cmsApi.js', () => ({
  uploadCmsVideo: vi.fn(() => Promise.resolve({
    id: 'asset-1',
    public_url: 'https://cdn.example.com/lesson.mp4',
  })),
}));

import { uploadCmsVideo } from '../lib/content/cmsApi.js';

describe('VideoUploadField', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows upload control and URL field', () => {
    render(<VideoUploadField value={null} onChange={() => {}} />);
    expect(screen.getByText(/upload video/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/video url/i)).toBeInTheDocument();
  });

  it('uploads a video file and reports the public URL', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<VideoUploadField value={null} onChange={onChange} />);

    const file = new File(['fake-video'], 'lesson.mp4', { type: 'video/mp4' });
    const input = document.querySelector('input[type="file"]');
    await user.upload(input, file);

    expect(uploadCmsVideo).toHaveBeenCalledWith(file, 'lesson.mp4');
    expect(onChange).toHaveBeenCalledWith({
      url: 'https://cdn.example.com/lesson.mp4',
      assetId: 'asset-1',
    });
  });

  it('allows pasting a URL', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    function Harness() {
      const [value, setValue] = React.useState(null);
      return (
        <VideoUploadField
          value={value}
          onChange={(next) => {
            onChange(next);
            setValue(next);
          }}
        />
      );
    }
    render(<Harness />);

    await user.type(screen.getByLabelText(/video url/i), 'https://cdn.example.com/clip.mp4');
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls.at(-1)[0]).toEqual({ url: 'https://cdn.example.com/clip.mp4' });
  });
});
