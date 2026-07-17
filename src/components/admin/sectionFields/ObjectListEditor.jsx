import React from 'react';
import FormField from './FormField.jsx';
import { getAtPath } from '../../../lib/content/sectionFormUtils.js';

function NestedStringList({ value, label, itemLabel, onChange }) {
  const items = Array.isArray(value) ? value : [];

  return (
    <div style={{ marginBottom: '0.5rem', gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
        <label className="admin-form-label" style={{ margin: 0 }}>{label}</label>
        <button
          type="button"
          className="btn-secondary"
          style={{ fontSize: '0.7rem' }}
          onClick={() => onChange([...items, ''])}
        >
          Add {itemLabel.toLowerCase()}
        </button>
      </div>
      {items.length === 0 ? (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>No items yet.</p>
      ) : (
        items.map((text, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.35rem' }}>
            <input
              className="admin-form-input"
              value={text ?? ''}
              onChange={(e) => {
                const next = items.map((t, idx) => (idx === i ? e.target.value : t));
                onChange(next);
              }}
              aria-label={`${itemLabel} ${i + 1}`}
            />
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.7rem' }}
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              aria-label={`Remove ${itemLabel} ${i + 1}`}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default function ObjectListEditor({
  payload,
  path,
  label,
  itemLabel = 'Item',
  blankItem,
  fields,
  onUpdate,
}) {
  const items = Array.isArray(getAtPath(payload, path, []))
    ? getAtPath(payload, path, [])
    : [];

  function setItems(next) {
    onUpdate(path, next);
  }

  function updateField(index, key, value) {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    setItems(next);
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  function addItem() {
    const blank = typeof blankItem === 'function' ? blankItem(items.length) : { ...blankItem };
    setItems([...items, blank]);
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
        items.map((item, index) => (
          <div
            key={index}
            className="paper-card"
            style={{ padding: '0.75rem', marginBottom: '0.5rem', background: 'var(--paper-dark)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.85rem' }}>{itemLabel} {index + 1}</strong>
              <button
                type="button"
                className="btn-secondary"
                style={{ fontSize: '0.75rem' }}
                onClick={() => removeItem(index)}
                aria-label={`Remove ${itemLabel} ${index + 1}`}
              >
                Remove
              </button>
            </div>
            <div className="admin-form-grid">
              {fields.map((field) => {
                if (field.type === 'stringList') {
                  return (
                    <NestedStringList
                      key={field.key}
                      value={item[field.key]}
                      label={field.label}
                      itemLabel={field.itemLabel ?? 'Item'}
                      onChange={(next) => updateField(index, field.key, next)}
                    />
                  );
                }
                return (
                  <FormField key={field.key} label={field.label} full={field.type === 'textarea'}>
                    {field.type === 'textarea' ? (
                      <textarea
                        className="admin-form-textarea"
                        rows={2}
                        value={item[field.key] ?? ''}
                        onChange={(e) => updateField(index, field.key, e.target.value)}
                      />
                    ) : field.type === 'number' ? (
                      <input
                        type="number"
                        className="admin-form-input"
                        value={item[field.key] ?? ''}
                        onChange={(e) => updateField(index, field.key, Number(e.target.value))}
                      />
                    ) : (
                      <input
                        className="admin-form-input"
                        value={item[field.key] ?? ''}
                        onChange={(e) => updateField(index, field.key, e.target.value)}
                      />
                    )}
                  </FormField>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
