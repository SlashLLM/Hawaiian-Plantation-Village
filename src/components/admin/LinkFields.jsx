import React, { useId } from 'react';
import Field from './LabelledField.jsx';
import {
  BLANK_LINK,
  LINK_KINDS,
  SITE_PAGE_CHOICES,
  isSafeExternalUrl,
  normalizeLink,
} from '../../lib/content/links.js';

/**
 * Editor for the shared link model — used by the per-event "Learn more"
 * button and the page builder's call-to-action block.
 *
 * @param {object} props
 * @param {object} props.value            the stored link
 * @param {(next: object) => void} props.onChange
 * @param {Array<{slug: string, title: string, status?: string}>} [props.customPages]
 * @param {string} [props.toggleLabel]    label for the enable checkbox
 * @param {boolean} [props.alwaysEnabled] hide the toggle (CTA blocks always link)
 * @param {() => void} [props.onCreatePage] shows a "build a page" shortcut
 * @param {string} [props.idPrefix]       readable prefix for generated input ids
 */
export default function LinkFields({
  value,
  onChange,
  customPages = [],
  toggleLabel = 'Show a “Learn more” button',
  alwaysEnabled = false,
  onCreatePage,
  idPrefix = 'link',
}) {
  const uid = useId();
  const id = (name) => `${idPrefix}-${name}-${uid}`;

  const link = normalizeLink(value);
  const enabled = alwaysEnabled || link.enabled;

  function update(patch) {
    onChange({ ...link, ...patch });
  }

  const urlInvalid =
    link.kind === 'external' && link.url.trim() !== '' && !isSafeExternalUrl(link.url);

  return (
    <div style={{ gridColumn: '1 / -1' }}>
      {!alwaysEnabled && (
        <div className="admin-form-field full">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              id={id('enabled')}
              type="checkbox"
              checked={link.enabled}
              onChange={(e) => update({ enabled: e.target.checked })}
            />
            <label className="admin-form-label" style={{ margin: 0 }} htmlFor={id('enabled')}>
              {toggleLabel}
            </label>
          </span>
          <small style={{ color: 'var(--text-muted)' }}>
            When on, the event shows a button on the Events page, the home page and the calendar.
          </small>
        </div>
      )}

      {enabled && (
        <div className="admin-form-grid">
          <Field id={id('label')} label="Button label">
            <input
              id={id('label')}
              className="admin-form-input"
              value={link.label}
              placeholder="Learn More"
              onChange={(e) => update({ label: e.target.value })}
            />
          </Field>

          <Field id={id('kind')} label="Links to">
            <select
              id={id('kind')}
              className="admin-form-select"
              value={link.kind}
              onChange={(e) => update({ kind: e.target.value })}
            >
              {LINK_KINDS.map((k) => (
                <option key={k.value} value={k.value}>{k.label}</option>
              ))}
            </select>
          </Field>

          {link.kind === 'page' && (
            <Field
              id={id('page')}
              label="Page"
              full
              hint={customPages.length === 0
                ? 'No pages built yet. Create one in the Event Pages tab.'
                : undefined}
            >
              <select
                id={id('page')}
                className="admin-form-select"
                value={link.pageSlug}
                onChange={(e) => update({ pageSlug: e.target.value })}
              >
                <option value="">Choose a page…</option>
                {customPages.map((page) => (
                  <option key={page.slug} value={page.slug}>
                    {page.title}
                    {page.status && page.status !== 'published' ? ` (${page.status})` : ''}
                  </option>
                ))}
              </select>
              {onCreatePage && (
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', marginTop: '0.5rem', alignSelf: 'flex-start' }}
                  onClick={onCreatePage}
                >
                  Build a page for this event
                </button>
              )}
            </Field>
          )}

          {link.kind === 'site' && (
            <Field id={id('site')} label="Page on this site">
              <select
                id={id('site')}
                className="admin-form-select"
                value={link.sitePage}
                onChange={(e) => update({ sitePage: e.target.value })}
              >
                <option value="">Choose a page…</option>
                {SITE_PAGE_CHOICES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </Field>
          )}

          {link.kind === 'external' && (
            <Field
              id={id('url')}
              label="Article URL"
              full
              hintId={id('url-hint')}
              hint={urlInvalid
                ? 'Enter a full address starting with http:// or https://'
                : 'Opens in a new tab.'}
            >
              <input
                id={id('url')}
                className="admin-form-input"
                type="url"
                inputMode="url"
                placeholder="https://example.com/article"
                value={link.url}
                onChange={(e) => update({ url: e.target.value })}
                aria-invalid={urlInvalid || undefined}
                aria-describedby={id('url-hint')}
              />
            </Field>
          )}
        </div>
      )}
    </div>
  );
}

export { BLANK_LINK };
