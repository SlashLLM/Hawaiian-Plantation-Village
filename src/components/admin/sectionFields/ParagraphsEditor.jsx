import React from 'react';
import FormField from './FormField.jsx';
import { getAtPath } from '../../../lib/content/sectionFormUtils.js';

export default function ParagraphsEditor({ payload, path = 'paragraphs', label = 'Paragraphs', onUpdate }) {
  const items = Array.isArray(getAtPath(payload, path, []))
    ? getAtPath(payload, path, [])
    : [];

  function setItems(next) {
    onUpdate(path, next);
  }

  function updateItem(index, value) {
    const next = [...items];
    next[index] = value;
    setItems(next);
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  function addItem() {
    setItems([...items, '']);
  }

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <label className="admin-form-label" style={{ margin: 0 }}>{label}</label>
        <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={addItem}>
          Add paragraph
        </button>
      </div>
      {items.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No paragraphs yet.</p>
      ) : (
        items.map((text, index) => (
          <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
            <FormField label={`Paragraph ${index + 1}`} full>
              <textarea
                className="admin-form-textarea"
                rows={3}
                value={text ?? ''}
                onChange={(e) => updateItem(index, e.target.value)}
              />
            </FormField>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', marginTop: '1.5rem' }}
              onClick={() => removeItem(index)}
              aria-label={`Remove paragraph ${index + 1}`}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
