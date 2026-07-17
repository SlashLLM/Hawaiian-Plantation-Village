import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadCmsVideo } from '../../lib/content/cmsApi.js';

export default function VideoUploadField({ value, onChange, label = 'Video' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const asset = await uploadCmsVideo(file, file.name);
      onChange?.({ url: asset.public_url, assetId: asset.id });
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
    setError('');
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
      <input
        className="admin-form-input"
        style={{ marginTop: '0.5rem' }}
        placeholder="Or paste video URL"
        value={value?.url ?? ''}
        onChange={handleUrlChange}
        aria-label="Video URL"
      />
      <p style={{ margin: '0.35rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        MP4 or WebM recommended. Max 100MB.
      </p>
      {error && <p style={{ color: 'var(--tin-rust)', fontSize: '0.85rem' }}>{error}</p>}
    </div>
  );
}
