import React from 'react';
import FormField from './sectionFields/FormField.jsx';
import ParagraphsEditor from './sectionFields/ParagraphsEditor.jsx';
import MediaUploadField from './MediaUploadField.jsx';
import LinkFields from './LinkFields.jsx';
import { BACKGROUND_CHOICES, getBlockType } from '../../lib/content/pageBlocks.js';

/**
 * Renders the edit form for one block, dispatching on the field types declared
 * in pageBlocks.js — the same declarative approach SectionPayloadForm uses for
 * page sections.
 */

function ImageField({ field, block, onChange }) {
  const url = block[field.key] ?? '';
  const alt = block[field.altKey] ?? '';
  return (
    <MediaUploadField
      label={field.label}
      altText={alt}
      value={url ? { url, alt } : null}
      onChange={(media) =>
        onChange({ [field.key]: media?.url ?? '', [field.altKey]: media?.alt ?? '' })
      }
    />
  );
}

/**
 * A repeater of typed objects. Unlike the shared ObjectListEditor this one
 * supports image sub-fields (galleries) and reordering.
 */
function BlockObjectList({ field, block, onChange }) {
  const items = Array.isArray(block[field.key]) ? block[field.key] : [];

  function setItems(next) {
    onChange({ [field.key]: next });
  }

  function updateItem(index, patch) {
    setItems(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function move(index, delta) {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  }

  return (
    <div style={{ gridColumn: '1 / -1', marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span className="admin-form-label" style={{ margin: 0 }}>{field.label}</span>
        <button
          type="button"
          className="btn-secondary"
          style={{ fontSize: '0.75rem' }}
          onClick={() => setItems([...items, { ...field.blankItem }])}
        >
          Add {field.itemLabel.toLowerCase()}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', gap: '0.35rem' }}>
              <strong style={{ fontSize: '0.85rem' }}>{field.itemLabel} {index + 1}</strong>
              <span style={{ display: 'flex', gap: '0.25rem' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '0.7rem' }}
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={`Move ${field.itemLabel} ${index + 1} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '0.7rem' }}
                  disabled={index === items.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={`Move ${field.itemLabel} ${index + 1} down`}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '0.7rem' }}
                  onClick={() => setItems(items.filter((_, i) => i !== index))}
                  aria-label={`Remove ${field.itemLabel} ${index + 1}`}
                >
                  Remove
                </button>
              </span>
            </div>
            <div className="admin-form-grid">
              {field.fields.map((sub) =>
                sub.type === 'image' ? (
                  <ImageField
                    key={sub.key}
                    field={sub}
                    block={item}
                    onChange={(patch) => updateItem(index, patch)}
                  />
                ) : (
                  <FormField key={sub.key} label={sub.label} full={sub.full}>
                    <input
                      className="admin-form-input"
                      value={item[sub.key] ?? ''}
                      onChange={(e) => updateItem(index, { [sub.key]: e.target.value })}
                    />
                  </FormField>
                ),
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function renderField(field, block, onChange, customPages) {
  switch (field.type) {
    case 'image':
      return <ImageField key={field.key} field={field} block={block} onChange={onChange} />;
    case 'objectList':
      return <BlockObjectList key={field.key} field={field} block={block} onChange={onChange} />;
    case 'paragraphs':
      return (
        <div key={field.key} style={{ gridColumn: '1 / -1' }}>
          <ParagraphsEditor
            payload={block}
            path={field.key}
            label={field.label}
            onUpdate={(path, value) => onChange({ [path]: value })}
          />
        </div>
      );
    case 'link':
      return (
        <LinkFields
          key={field.key}
          value={block[field.key]}
          onChange={(link) => onChange({ [field.key]: link })}
          customPages={customPages}
          alwaysEnabled
          idPrefix={`block-${field.key}`}
        />
      );
    case 'select':
      return (
        <FormField key={field.key} label={field.label}>
          <select
            className="admin-form-select"
            value={block[field.key] ?? ''}
            onChange={(e) => onChange({ [field.key]: e.target.value })}
          >
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </FormField>
      );
    case 'textarea':
      return (
        <FormField key={field.key} label={field.label} full>
          <textarea
            className="admin-form-textarea"
            rows={field.rows ?? 3}
            value={block[field.key] ?? ''}
            onChange={(e) => onChange({ [field.key]: e.target.value })}
          />
        </FormField>
      );
    case 'text':
    default:
      return (
        <FormField key={field.key} label={field.label} full={field.full}>
          <input
            className="admin-form-input"
            value={block[field.key] ?? ''}
            onChange={(e) => onChange({ [field.key]: e.target.value })}
          />
        </FormField>
      );
  }
}

export default function BlockFields({ block, onChange, customPages = [] }) {
  const definition = getBlockType(block?.type);
  if (!definition) return null;

  return (
    <div>
      {definition.hint && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 0 }}>
          {definition.hint}
        </p>
      )}
      <div className="admin-form-grid">
        {definition.fields.map((field) => renderField(field, block, onChange, customPages))}
        {definition.supportsBackground !== false && (
          <FormField label="Background">
            <select
              className="admin-form-select"
              value={block.background ?? 'default'}
              onChange={(e) => onChange({ background: e.target.value })}
            >
              {BACKGROUND_CHOICES.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </FormField>
        )}
      </div>
    </div>
  );
}
