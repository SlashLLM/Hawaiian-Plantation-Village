import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadCmsImage } from '../../lib/content/cmsApi.js';

export default function MediaUploadField({ value, altText = '', onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [alt, setAlt] = useState(altText);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!alt.trim()) {
      setError('Alt text is required before upload');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const asset = await uploadCmsImage(file, alt.trim());
      onChange?.({ url: asset.public_url, alt: alt.trim(), assetId: asset.id });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div className="admin-form-field full">
      <label className="admin-form-label">{label}</label>
      {value?.url && (
        <div style={{ marginBottom: '0.5rem', position: 'relative' }}>
          <img src={value.url} alt={value.alt || alt} style={{ maxWidth: '200px', borderRadius: '4px' }} />
          <button type="button" className="btn-secondary" style={{ marginLeft: '0.5rem' }} onClick={() => onChange?.(null)}>
            <X size={14} /> Remove
          </button>
        </div>
      )}
      <input
        className="admin-form-input"
        placeholder="Alt text (required for uploads)"
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
      />
      <label className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem', cursor: 'pointer' }}>
        <Upload size={14} /> {uploading ? 'Uploading…' : 'Upload image'}
        <input type="file" accept="image/*" hidden onChange={handleFile} disabled={uploading} />
      </label>
      <input
        className="admin-form-input"
        style={{ marginTop: '0.5rem' }}
        placeholder="Or paste image URL"
        value={value?.url ?? ''}
        onChange={(e) => onChange?.({ url: e.target.value, alt })}
      />
      {error && <p style={{ color: 'var(--tin-rust)', fontSize: '0.85rem' }}>{error}</p>}
    </div>
  );
}
