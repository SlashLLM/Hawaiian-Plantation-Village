import React from 'react';
import FormField from './FormField.jsx';
import { getAtPath } from '../../../lib/content/sectionFormUtils.js';

export default function InfoBlockFields({ payload, path, label, onUpdate }) {
  return (
    <div className="admin-form-grid">
      <FormField label={`${label} title`} full>
        <input
          className="admin-form-input"
          value={getAtPath(payload, `${path}.title`, '')}
          onChange={(e) => onUpdate(`${path}.title`, e.target.value)}
        />
      </FormField>
      <FormField label="Primary text" full>
        <input
          className="admin-form-input"
          value={getAtPath(payload, `${path}.primary`, '')}
          onChange={(e) => onUpdate(`${path}.primary`, e.target.value)}
        />
      </FormField>
      <FormField label="Secondary text" full>
        <input
          className="admin-form-input"
          value={getAtPath(payload, `${path}.secondary`, '')}
          onChange={(e) => onUpdate(`${path}.secondary`, e.target.value)}
        />
      </FormField>
    </div>
  );
}
