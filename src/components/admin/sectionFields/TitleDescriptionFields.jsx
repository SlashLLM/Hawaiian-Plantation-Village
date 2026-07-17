import React from 'react';
import FormField from './FormField.jsx';
import { getAtPath } from '../../../lib/content/sectionFormUtils.js';

export default function TitleDescriptionFields({
  payload,
  onUpdate,
  titlePath = 'title',
  descriptionPath = 'description',
  titleLabel = 'Title',
  descriptionLabel = 'Description',
}) {
  return (
    <div className="admin-form-grid">
      <FormField label={titleLabel} full>
        <input
          className="admin-form-input"
          value={getAtPath(payload, titlePath, '')}
          onChange={(e) => onUpdate(titlePath, e.target.value)}
        />
      </FormField>
      <FormField label={descriptionLabel} full>
        <textarea
          className="admin-form-textarea"
          rows={3}
          value={getAtPath(payload, descriptionPath, '')}
          onChange={(e) => onUpdate(descriptionPath, e.target.value)}
        />
      </FormField>
    </div>
  );
}
