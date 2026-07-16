import React from 'react';
import { getSectionFormSchema } from '../../lib/content/sectionFormSchemas.js';
import { getAtPath, updatePayload } from '../../lib/content/sectionFormUtils.js';
import { PAGE_KEYS, PAGE_LABELS } from '../../lib/content/sectionKeys.js';
import FormField from './sectionFields/FormField.jsx';
import StampHeaderFields from './sectionFields/StampHeaderFields.jsx';
import InfoBlockFields from './sectionFields/InfoBlockFields.jsx';
import CtaFields from './sectionFields/CtaFields.jsx';
import ParagraphsEditor from './sectionFields/ParagraphsEditor.jsx';
import StringListEditor from './sectionFields/StringListEditor.jsx';
import ObjectListEditor from './sectionFields/ObjectListEditor.jsx';

function PageSelect({ value, onChange }) {
  return (
    <select className="admin-form-select" value={value ?? ''} onChange={onChange}>
      <option value="">Select page…</option>
      {PAGE_KEYS.map((p) => (
        <option key={p} value={p}>{PAGE_LABELS[p] ?? p}</option>
      ))}
    </select>
  );
}

function renderField(field, payload, onUpdate) {
  switch (field.type) {
    case 'stampHeader':
      return (
        <StampHeaderFields
          key="stampHeader"
          payload={payload}
          onUpdate={onUpdate}
          includeSubtitle={field.includeSubtitle !== false}
          includeStamp={field.includeStamp !== false}
          includeStampClass={field.includeStampClass !== false}
        />
      );
    case 'infoBlock':
      return (
        <InfoBlockFields
          key={field.path}
          payload={payload}
          path={field.path}
          label={field.label}
          onUpdate={onUpdate}
        />
      );
    case 'cta':
      return (
        <CtaFields
          key={field.path}
          payload={payload}
          path={field.path}
          label={field.label}
          onUpdate={onUpdate}
        />
      );
    case 'paragraphs':
      return (
        <ParagraphsEditor
          key={field.path}
          payload={payload}
          path={field.path}
          label={field.label}
          onUpdate={onUpdate}
        />
      );
    case 'stringList':
      return (
        <StringListEditor
          key={field.path}
          payload={payload}
          path={field.path}
          label={field.label}
          itemLabel={field.itemLabel}
          onUpdate={onUpdate}
        />
      );
    case 'objectList':
      return (
        <ObjectListEditor
          key={field.path}
          payload={payload}
          path={field.path}
          label={field.label}
          itemLabel={field.itemLabel}
          blankItem={field.blankItem}
          fields={field.fields}
          onUpdate={onUpdate}
        />
      );
    case 'textarea':
      return (
        <FormField key={field.path} label={field.label} full>
          <textarea
            className="admin-form-textarea"
            rows={field.rows ?? 3}
            value={getAtPath(payload, field.path, '')}
            onChange={(e) => onUpdate(field.path, e.target.value)}
          />
        </FormField>
      );
    case 'number':
      return (
        <FormField key={field.path} label={field.label}>
          <input
            type="number"
            className="admin-form-input"
            value={getAtPath(payload, field.path, '')}
            onChange={(e) => onUpdate(field.path, Number(e.target.value))}
          />
        </FormField>
      );
    case 'page':
      return (
        <FormField key={field.path} label={field.label}>
          <PageSelect
            value={getAtPath(payload, field.path, '')}
            onChange={(e) => onUpdate(field.path, e.target.value)}
          />
        </FormField>
      );
    case 'text':
    default:
      return (
        <FormField key={field.path} label={field.label} full={field.full}>
          <input
            className="admin-form-input"
            value={getAtPath(payload, field.path, '')}
            onChange={(e) => onUpdate(field.path, e.target.value)}
          />
        </FormField>
      );
  }
}

/**
 * Renders guided fields for a known page section payload.
 * Returns null when no schema exists for the given page/section.
 */
export default function SectionPayloadForm({ pageKey, sectionKey, payload, onChange }) {
  const schema = getSectionFormSchema(pageKey, sectionKey);
  if (!schema) return null;

  function onUpdate(path, value) {
    onChange(updatePayload(payload, path, value));
  }

  return (
    <div className="section-payload-form">
      {schema.groups.map((group) => {
        const simpleFields = group.fields.filter((f) =>
          ['text', 'textarea', 'number', 'page'].includes(f.type),
        );
        const complexFields = group.fields.filter(
          (f) => !['text', 'textarea', 'number', 'page'].includes(f.type),
        );

        return (
          <div key={group.title} style={{ marginBottom: '1.25rem' }}>
            <h5 style={{ margin: '0 0 0.75rem' }}>{group.title}</h5>
            {complexFields.map((field) => renderField(field, payload, onUpdate))}
            {simpleFields.length > 0 && (
              <div className="admin-form-grid">
                {simpleFields.map((field) => renderField(field, payload, onUpdate))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
