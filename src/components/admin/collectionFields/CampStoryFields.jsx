import React, { useState } from 'react';
import MediaUploadField from '../MediaUploadField.jsx';
import AudioUploadField from '../AudioUploadField.jsx';
import VideoUploadField from '../VideoUploadField.jsx';
import CultureSelectField from './CultureSelectField.jsx';
import { uploadCmsImage } from '../../../lib/content/cmsApi.js';
import {
  collectCampCultureOptions,
  getMetadataAt,
  resolveOralMediaType,
  updateMetadata,
} from '../../../lib/content/collectionFormUtils.js';

export default function CampStoryFields({ form, setForm, entries = [] }) {
  const meta = form.metadata ?? {};
  const oral = meta.oralHistory ?? {};
  const cultureValue = getMetadataAt(meta, 'culture', form.category ?? '');
  const cultureOptions = collectCampCultureOptions(entries, cultureValue);
  const mediaType = resolveOralMediaType(oral);
  const allowFullscreen = oral.allowFullscreen !== false;
  const posterUrl = oral.posterUrl ?? '';
  const [frameError, setFrameError] = useState('');

  function setMeta(path, value) {
    setForm({ ...form, metadata: updateMetadata(meta, path, value) });
  }

  function setCulture(value) {
    setForm({
      ...form,
      category: value,
      metadata: updateMetadata(meta, 'culture', value),
    });
  }

  function setOral(field, value) {
    setMeta(`oralHistory.${field}`, value);
  }

  /** Apply several oralHistory fields at once, against the latest form state. */
  function setOralFields(updates) {
    setForm((prev) => {
      const nextMeta = Object.entries(updates).reduce(
        (acc, [field, value]) => updateMetadata(acc, `oralHistory.${field}`, value),
        prev.metadata ?? {},
      );
      return { ...prev, metadata: nextMeta };
    });
  }

  async function handleFrameCapture(file) {
    setFrameError('');
    try {
      const asset = await uploadCmsImage(file, `${form.title || 'Oral history'} video frame`);
      setOralFields({ posterUrl: asset.public_url });
    } catch (err) {
      setFrameError(err.message);
    }
  }

  return (
    <>
      <CultureSelectField
        value={cultureValue}
        options={cultureOptions}
        onChange={setCulture}
      />
      <div className="admin-form-field">
        <label className="admin-form-label">Arrival year</label>
        <input
          className="admin-form-input"
          value={getMetadataAt(meta, 'arrival', '')}
          onChange={(e) => setMeta('arrival', e.target.value)}
          placeholder="e.g. 1852"
        />
      </div>
      <div className="admin-form-field full">
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
          <input
            type="checkbox"
            aria-label="Mark as Coming Soon"
            checked={Boolean(getMetadataAt(meta, 'isPlaceholder', false))}
            onChange={(e) => setMeta('isPlaceholder', e.target.checked)}
          />
          Mark as Coming Soon (placeholder story; disables opening the side panel)
        </label>
      </div>
      <div className="admin-form-field full">
        <label className="admin-form-label">Card description</label>
        <textarea
          className="admin-form-textarea"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />
      </div>
      <div className="admin-form-field full">
        <label className="admin-form-label">Historical records</label>
        <textarea
          className="admin-form-textarea"
          rows={5}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </div>
      <MediaUploadField
        label="Camp photo (top image)"
        value={form.image_url ? { url: form.image_url, alt: form.title } : null}
        onChange={(img) => setForm({ ...form, image_url: img?.url ?? '' })}
      />
      {mediaType === 'video' && (
        <div className="admin-form-field full" style={{ marginTop: '-0.5rem' }}>
          {posterUrl && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <img
                src={posterUrl}
                alt="Frame captured from the oral history video"
                style={{ maxWidth: '160px', borderRadius: '4px', border: '1px solid var(--kraft-tan-dark)' }}
              />
              <button
                type="button"
                className="btn-secondary"
                style={{ fontSize: '0.75rem' }}
                onClick={() => setOralFields({ posterUrl: '' })}
              >
                Clear video frame
              </button>
            </div>
          )}
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {form.image_url
              ? 'A camp photo is set, so it is shown as the top image instead of the video frame.'
              : 'Leave the camp photo empty to use the captured video frame as the top image.'}
          </p>
        </div>
      )}

      <div className="admin-form-field full" style={{ marginTop: '0.5rem' }}>
        <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem' }}>Oral history</h4>
      </div>
      <div className="admin-form-field full">
        <label className="admin-form-label">Narrator</label>
        <input
          className="admin-form-input"
          value={oral.narrator ?? ''}
          onChange={(e) => setOral('narrator', e.target.value)}
          placeholder="Name and role"
        />
      </div>
      <div className="admin-form-field full">
        <label className="admin-form-label">Recording source</label>
        <input
          className="admin-form-input"
          value={oral.audioSimText ?? ''}
          onChange={(e) => setOral('audioSimText', e.target.value)}
          placeholder="e.g. Recording: Chang family oral archive, interviewed 1994."
        />
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="camp-story-media-type">Recording type</label>
        <select
          id="camp-story-media-type"
          className="admin-form-select"
          value={mediaType}
          onChange={(e) => setOral('mediaType', e.target.value)}
        >
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
      </div>

      {mediaType === 'audio' ? (
        <AudioUploadField
          value={oral.audio_url ? { url: oral.audio_url, lengthFormatted: oral.length ?? '' } : null}
          onChange={(audio) => setOralFields({
            audio_url: audio?.url ?? '',
            length: audio?.lengthFormatted ?? '',
          })}
        />
      ) : (
        <>
          <VideoUploadField
            label="Oral history video"
            withDuration
            frameButtonLabel="Use a frame as the top image"
            value={oral.video_url ? { url: oral.video_url, lengthFormatted: oral.length ?? '' } : null}
            onChange={(video) => setOralFields({
              video_url: video?.url ?? '',
              length: video?.lengthFormatted ?? '',
            })}
            onFrameCapture={handleFrameCapture}
          />
          {frameError && (
            <div className="admin-form-field full">
              <p style={{ color: 'var(--tin-rust)', fontSize: '0.85rem', margin: 0 }}>{frameError}</p>
            </div>
          )}
          <div className="admin-form-field full">
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
              <input
                type="checkbox"
                checked={allowFullscreen}
                onChange={(e) => setOral('allowFullscreen', e.target.checked)}
              />
              Allow visitors to play this video full screen
            </label>
          </div>
        </>
      )}

      <div className="admin-form-field full">
        <label className="admin-form-label">Transcript</label>
        <textarea
          className="admin-form-textarea"
          rows={6}
          value={oral.transcript ?? ''}
          onChange={(e) => setOral('transcript', e.target.value)}
          placeholder="Full oral history transcript…"
        />
      </div>
    </>
  );
}
