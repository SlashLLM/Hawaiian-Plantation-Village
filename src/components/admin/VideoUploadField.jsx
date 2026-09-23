import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadCmsVideo } from '../../lib/content/cmsApi.js';
import { formatAudioLength } from '../../lib/content/collectionFormUtils.js';
import { readVideoDuration, captureVideoFrameFile } from '../../lib/content/videoFrame.js';

function makeObjectUrl(file) {
  if (typeof URL?.createObjectURL !== 'function') return '';
  try {
    return URL.createObjectURL(file);
  } catch {
    return '';
  }
}

function revokeObjectUrl(url) {
  if (!url || typeof URL?.revokeObjectURL !== 'function') return;
  try {
    URL.revokeObjectURL(url);
  } catch {
    // Ignore: the URL may already have been released.
  }
}

export default function VideoUploadField({
  value,
  onChange,
  label = 'Video',
  withDuration = false,
  onFrameCapture = null,
  frameButtonLabel = 'Capture frame from video',
}) {
  const [uploading, setUploading] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const localUrlRef = useRef('');

  async function captureFrom(src, fileName) {
    if (!onFrameCapture || !src) return;
    setCapturing(true);
    try {
      const frame = await captureVideoFrameFile(src, fileName);
      if (!frame) {
        setNotice('Could not read a frame from this video — upload a top image instead.');
        return;
      }
      setNotice('');
      await onFrameCapture(frame);
    } catch (err) {
      setNotice(err.message);
    } finally {
      setCapturing(false);
    }
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    setNotice('');
    // The local copy is same-origin, so both duration and frame reads stay untainted.
    revokeObjectUrl(localUrlRef.current);
    localUrlRef.current = makeObjectUrl(file);
    try {
      const asset = await uploadCmsVideo(file, file.name);
      const next = { url: asset.public_url, assetId: asset.id };
      if (withDuration) {
        const durationSec = await readVideoDuration(localUrlRef.current || asset.public_url);
        next.lengthFormatted = durationSec != null ? formatAudioLength(durationSec) : '';
        if (durationSec == null) setNotice('Uploaded, but could not read the video duration.');
      }
      onChange?.(next);
      if (onFrameCapture) {
        await captureFrom(localUrlRef.current || asset.public_url, `${file.name.replace(/\.[^.]+$/, '')}-frame.jpg`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function handleUrlChange(e) {
    onChange?.({ url: e.target.value });
  }

  function handleRemove() {
    revokeObjectUrl(localUrlRef.current);
    localUrlRef.current = '';
    setError('');
    setNotice('');
    onChange?.(null);
  }

  return (
    <div className="admin-form-field full">
      <label className="admin-form-label">{label}</label>
      {value?.url && (
        <div style={{ marginBottom: '0.5rem' }}>
          <video
            controls
            src={value.url}
            style={{ maxWidth: '100%', maxHeight: '220px', background: '#000' }}
          >
            <track kind="captions" />
          </video>
          <button type="button" className="btn-secondary" style={{ marginLeft: '0.5rem', marginTop: '0.5rem' }} onClick={handleRemove}>
            <X size={14} /> Remove
          </button>
        </div>
      )}
      <label className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem', cursor: 'pointer' }}>
        <Upload size={14} /> {uploading ? 'Uploading…' : 'Upload video'}
        <input type="file" accept="video/*" hidden onChange={handleFile} disabled={uploading} />
      </label>
      {onFrameCapture && value?.url && (
        <button
          type="button"
          className="btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem', marginLeft: '0.5rem' }}
          onClick={() => captureFrom(localUrlRef.current || value.url, 'video-frame.jpg')}
          disabled={capturing}
        >
          <ImageIcon size={14} /> {capturing ? 'Capturing…' : frameButtonLabel}
        </button>
      )}
      <input
        className="admin-form-input"
        style={{ marginTop: '0.5rem' }}
        placeholder="Or paste video URL"
        value={value?.url ?? ''}
        onChange={handleUrlChange}
        aria-label="Video URL"
      />
      <p style={{ margin: '0.35rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        MP4 or WebM recommended. Max 50MB.
      </p>
      {withDuration && value?.lengthFormatted && (
        <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Duration: {value.lengthFormatted}
        </p>
      )}
      {notice && <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{notice}</p>}
      {error && <p style={{ color: 'var(--tin-rust)', fontSize: '0.85rem' }}>{error}</p>}
    </div>
  );
}
