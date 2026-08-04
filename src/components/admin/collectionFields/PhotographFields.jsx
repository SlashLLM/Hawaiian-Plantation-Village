import React from 'react';
import MediaUploadField from '../MediaUploadField.jsx';
import { getMetadataAt, updateMetadata } from '../../../lib/content/collectionFormUtils.js';

export const PHOTOGRAPH_COLLECTION_OPTIONS = [
  { value: 'oahu_sugar', label: 'Oahu Sugar Company' },
  { value: 'murakoshi', label: 'Murakoshi Collection' },
  { value: 'fwcgp', label: 'Friends of Waipahu Cultural Garden Park' },
];

export default function PhotographFields({ form, setForm }) {
  const meta = form.metadata ?? {};
  const relatedArkIds = getMetadataAt(meta, 'relatedArkIds', []);

  function setMeta(path, value) {
    setForm({ ...form, metadata: updateMetadata(meta, path, value) });
  }

  function setCollection(value) {
    setForm({
      ...form,
      category: value,
      metadata: updateMetadata(meta, 'collection', value),
    });
  }

  return (
    <>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-ark-id">Ark ID</label>
        <input
          id="photo-ark-id"
          className="admin-form-input"
          value={getMetadataAt(meta, 'arkId', '')}
          onChange={(e) => setMeta('arkId', e.target.value)}
          placeholder="e.g. ark_70111_1ZgL"
        />
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-collection">Collection</label>
        <select
          id="photo-collection"
          className="admin-form-select"
          value={getMetadataAt(meta, 'collection', form.category ?? 'fwcgp')}
          onChange={(e) => setCollection(e.target.value)}
        >
          {PHOTOGRAPH_COLLECTION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-filing-category">Filing category</label>
        <input
          id="photo-filing-category"
          className="admin-form-input"
          value={getMetadataAt(meta, 'filingCategory', '')}
          onChange={(e) => setMeta('filingCategory', e.target.value)}
          placeholder="e.g. Plantation towns"
        />
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-accession">Accession number</label>
        <input
          id="photo-accession"
          className="admin-form-input"
          value={getMetadataAt(meta, 'accessionNumber', '')}
          onChange={(e) => setMeta('accessionNumber', e.target.value)}
          placeholder="e.g. 1985.014"
        />
      </div>
      <div className="admin-form-field full">
        <label className="admin-form-label" htmlFor="photo-subject">Subject</label>
        <input
          id="photo-subject"
          className="admin-form-input"
          value={getMetadataAt(meta, 'subject', '')}
          onChange={(e) => setMeta('subject', e.target.value)}
          placeholder="As written on the accession card"
        />
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-donor">Origin or donor</label>
        <input
          id="photo-donor"
          className="admin-form-input"
          value={getMetadataAt(meta, 'donor', '')}
          onChange={(e) => setMeta('donor', e.target.value)}
        />
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-photographer">Photographer</label>
        <input
          id="photo-photographer"
          className="admin-form-input"
          value={getMetadataAt(meta, 'photographer', '')}
          onChange={(e) => setMeta('photographer', e.target.value)}
          placeholder="e.g. R.H. Lodge"
        />
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-circa">Date or circa date</label>
        <input
          id="photo-circa"
          className="admin-form-input"
          value={getMetadataAt(meta, 'circaDate', '')}
          onChange={(e) => setMeta('circaDate', e.target.value)}
          placeholder="e.g. ca. 1940s"
        />
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-related">Related ark IDs</label>
        <input
          id="photo-related"
          className="admin-form-input"
          value={Array.isArray(relatedArkIds) ? relatedArkIds.join(', ') : ''}
          onChange={(e) => setMeta(
            'relatedArkIds',
            e.target.value.split(',').map((id) => id.trim()).filter(Boolean),
          )}
          placeholder="Comma separated"
        />
      </div>
      <div className="admin-form-field full">
        <label className="admin-form-label" htmlFor="photo-caption">Caption</label>
        <textarea
          id="photo-caption"
          className="admin-form-textarea"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          placeholder="What a viewer can see in the photograph."
        />
      </div>
      <div className="admin-form-field full">
        <label className="admin-form-label" htmlFor="photo-study-notes">Study notes</label>
        <textarea
          id="photo-study-notes"
          className="admin-form-textarea"
          rows={4}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          placeholder="What to look for, what is uncertain, what research is still needed."
        />
      </div>

      <MediaUploadField
        label="Photograph"
        value={form.image_url ? { url: form.image_url, alt: form.title } : null}
        onChange={(img) => setForm({ ...form, image_url: img?.url ?? '' })}
      />
      <div className="admin-form-field full">
        <label className="admin-form-label" htmlFor="photo-thumb">Thumbnail URL</label>
        <input
          id="photo-thumb"
          className="admin-form-input"
          value={getMetadataAt(meta, 'thumbnailUrl', '')}
          onChange={(e) => setMeta('thumbnailUrl', e.target.value)}
          placeholder="Defaults to the full image when empty"
        />
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-back">Back-of-photo scan URL</label>
        <input
          id="photo-back"
          className="admin-form-input"
          value={getMetadataAt(meta, 'backImageUrl', '')}
          onChange={(e) => setMeta('backImageUrl', e.target.value)}
        />
      </div>
      <div className="admin-form-field">
        <label className="admin-form-label" htmlFor="photo-card">Accession card scan URL</label>
        <input
          id="photo-card"
          className="admin-form-input"
          value={getMetadataAt(meta, 'accessionCardUrl', '')}
          onChange={(e) => setMeta('accessionCardUrl', e.target.value)}
        />
      </div>
      <div className="admin-form-field full">
        <label className="admin-form-label" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={Boolean(getMetadataAt(meta, 'provisional', false))}
            onChange={(e) => setMeta('provisional', e.target.checked)}
          />
          Working description — not yet checked against the accession card
        </label>
      </div>
    </>
  );
}
