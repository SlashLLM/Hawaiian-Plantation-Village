import React from 'react';
import FormField from './FormField.jsx';
import { getAtPath } from '../../../lib/content/sectionFormUtils.js';
import { PAGE_KEYS, PAGE_LABELS } from '../../../lib/content/sectionKeys.js';

export default function CtaFields({ payload, path, label, onUpdate }) {
  const cta = getAtPath(payload, path, {}) || {};
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      {label ? <h6 style={{ margin: '0 0 0.5rem', color: 'var(--text-muted)' }}>{label}</h6> : null}
      <div className="admin-form-grid">
        <FormField label="Button label">
          <input
            className="admin-form-input"
            value={cta.label ?? ''}
            onChange={(e) => onUpdate(`${path}.label`, e.target.value)}
          />
        </FormField>
        <FormField label="Page">
          <select
            className="admin-form-select"
            value={cta.page ?? ''}
            onChange={(e) => onUpdate(`${path}.page`, e.target.value)}
          >
            <option value="">Select page…</option>
            {PAGE_KEYS.map((p) => (
              <option key={p} value={p}>{PAGE_LABELS[p] ?? p}</option>
            ))}
          </select>
        </FormField>
      </div>
    </div>
  );
}
