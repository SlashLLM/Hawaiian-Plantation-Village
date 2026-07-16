import React from 'react';
import FormField from './FormField.jsx';
import { getAtPath } from '../../../lib/content/sectionFormUtils.js';

export default function StringListEditor({
  payload,
  path,
  label,
  itemLabel = 'Item',
  onUpdate,
}) {
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
          Add {itemLabel.toLowerCase()}
        </button>
      </div>
      {items.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No items yet.</p>
      ) : (
        items.map((value, index) => (
          <div key={index} className="admin-form-grid" style={{ marginBottom: '0.5rem', alignItems: 'end' }}>
            <FormField label={`${itemLabel} ${index + 1}`}>
              <input
                className="admin-form-input"
                value={value ?? ''}
                onChange={(e) => updateItem(index, e.target.value)}
              />
            </FormField>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', height: 'fit-content', marginBottom: '0.15rem' }}
              onClick={() => removeItem(index)}
              aria-label={`Remove ${itemLabel} ${index + 1}`}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
