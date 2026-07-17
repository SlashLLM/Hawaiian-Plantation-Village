import React from 'react';
import FormField from './FormField.jsx';
import { getAtPath, stampClassOptions } from '../../../lib/content/sectionFormUtils.js';

export default function StampHeaderFields({
  payload,
  onUpdate,
  includeSubtitle = true,
  includeStamp = true,
  includeStampClass = true,
}) {
  return (
    <div className="admin-form-grid">
      {includeStamp && (
        <FormField label="Stamp">
          <input
            className="admin-form-input"
            value={getAtPath(payload, 'stamp', '')}
            onChange={(e) => onUpdate('stamp', e.target.value)}
          />
        </FormField>
      )}
      {includeStampClass && (
        <FormField label="Stamp style">
          <select
            className="admin-form-select"
            value={getAtPath(payload, 'stampClass', 'green')}
            onChange={(e) => onUpdate('stampClass', e.target.value)}
          >
            {stampClassOptions().map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </FormField>
      )}
      <FormField label="Title" full={!includeStamp && !includeStampClass}>
        <input
          className="admin-form-input"
          value={getAtPath(payload, 'title', '')}
          onChange={(e) => onUpdate('title', e.target.value)}
        />
      </FormField>
      {includeSubtitle && (
        <FormField label="Subtitle" full>
          <textarea
            className="admin-form-textarea"
            rows={2}
            value={getAtPath(payload, 'subtitle', '')}
            onChange={(e) => onUpdate('subtitle', e.target.value)}
          />
        </FormField>
      )}
    </div>
  );
}
