import React from 'react';
import MediaUploadField from '../MediaUploadField.jsx';
import AudioUploadField from '../AudioUploadField.jsx';
import CultureSelectField from './CultureSelectField.jsx';
import { collectCampCultureOptions, getMetadataAt, updateMetadata } from '../../../lib/content/collectionFormUtils.js';

export default function CampStoryFields({ form, setForm, entries = [] }) {
  const meta = form.metadata ?? {};
  const oral = meta.oralHistory ?? {};
  const cultureValue = getMetadataAt(meta, 'culture', form.category ?? '');
  const cultureOptions = collectCampCultureOptions(entries, cultureValue);

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
        label="Camp photo"
        value={form.image_url ? { url: form.image_url, alt: form.title } : null}
        onChange={(img) => setForm({ ...form, image_url: img?.url ?? '' })}
      />

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
      <AudioUploadField
        value={oral.audio_url ? { url: oral.audio_url, lengthFormatted: oral.length ?? '' } : null}
        onChange={(audio) => {
          let nextMeta = updateMetadata(meta, 'oralHistory.audio_url', audio?.url ?? '');
          nextMeta = updateMetadata(nextMeta, 'oralHistory.length', audio?.lengthFormatted ?? '');
          setForm({ ...form, metadata: nextMeta });
        }}
      />
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
