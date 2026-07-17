import React, { useEffect, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { uploadCmsAudio } from '../../lib/content/cmsApi.js';
import { formatAudioLength } from '../../lib/content/collectionFormUtils.js';

function readAudioDuration(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve(null);
      return;
    }
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.onloadedmetadata = () => {
      const seconds = audio.duration;
      resolve(Number.isFinite(seconds) ? seconds : null);
      audio.removeAttribute('src');
      audio.load();
    };
    audio.onerror = () => resolve(null);
    audio.src = url;
  });
}

export default function AudioUploadField({ value, onChange, label = 'Audio file' }) {
  const [uploading, setUploading] = useState(false);
  const [resolvingDuration, setResolvingDuration] = useState(false);
  const [error, setError] = useState('');
  const lastResolvedUrl = useRef('');
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const url = value?.url?.trim() ?? '';
    if (!url) {
      lastResolvedUrl.current = '';
      return undefined;
    }
    if (url === lastResolvedUrl.current) return undefined;

    let cancelled = false;
    const timer = setTimeout(() => {
      setResolvingDuration(true);
      setError('');
      readAudioDuration(url).then((durationSec) => {
        if (cancelled) return;
        lastResolvedUrl.current = url;
        setResolvingDuration(false);
        if (durationSec == null) {
          setError('Could not read audio duration from this file');
          return;
        }
        const lengthFormatted = formatAudioLength(durationSec);
        if (value?.lengthFormatted !== lengthFormatted) {
          onChangeRef.current?.({
            url,
            lengthFormatted,
            assetId: value?.assetId,
          });
        }
      });
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [value?.url, value?.lengthFormatted, value?.assetId]);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const asset = await uploadCmsAudio(file, file.name);
      const durationSec = await readAudioDuration(asset.public_url);
      lastResolvedUrl.current = asset.public_url;
      onChange?.({
        url: asset.public_url,
        lengthFormatted: durationSec != null ? formatAudioLength(durationSec) : '',
        assetId: asset.id,
      });
      if (durationSec == null) setError('Uploaded, but could not read audio duration');
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function handleUrlChange(e) {
    const url = e.target.value;
    lastResolvedUrl.current = '';
    onChange?.({ url, lengthFormatted: '' });
  }

  function handleRemove() {
    lastResolvedUrl.current = '';
    setError('');
    onChange?.(null);
  }

  return (
    <div className="admin-form-field full">
      <label className="admin-form-label">{label}</label>
      {value?.url && (
        <div style={{ marginBottom: '0.5rem' }}>
          <audio controls src={value.url} style={{ maxWidth: '100%', height: '36px' }}>
            <track kind="captions" />
          </audio>
          <button type="button" className="btn-secondary" style={{ marginLeft: '0.5rem' }} onClick={handleRemove}>
            <X size={14} /> Remove
          </button>
        </div>
      )}
      <label className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem', cursor: 'pointer' }}>
        <Upload size={14} /> {uploading ? 'Uploading…' : 'Upload audio'}
        <input type="file" accept="audio/*" hidden onChange={handleFile} disabled={uploading} />
      </label>
      <input
        className="admin-form-input"
        style={{ marginTop: '0.5rem' }}
        placeholder="Or paste audio URL"
        value={value?.url ?? ''}
        onChange={handleUrlChange}
      />
      {(value?.lengthFormatted || resolvingDuration) && (
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Duration: {resolvingDuration ? 'Reading from audio…' : value.lengthFormatted}
        </p>
      )}
      {error && <p style={{ color: 'var(--tin-rust)', fontSize: '0.85rem' }}>{error}</p>}
    </div>
  );
}
