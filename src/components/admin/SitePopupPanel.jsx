import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { fetchAllPageSections, savePageSection } from '../../lib/content/cmsAdminApi.js';
import { fetchPublishedCustomPages } from '../../lib/content/cmsApi.js';
import { isSafeExternalUrl, normalizeLink } from '../../lib/content/links.js';
import {
  DEFAULT_POSTER_PAYLOAD,
  POPUP_PAGE_KEY,
  POPUP_SECTION_KEY,
  isPosterCurrent,
  normalizePoster,
} from '../../lib/eventPoster.js';
import Field from './LabelledField.jsx';
import LinkFields from './LinkFields.jsx';
import MediaUploadField from './MediaUploadField.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminMessage from './AdminMessage.jsx';

function payloadToForm(payload) {
  const source = payload ?? DEFAULT_POSTER_PAYLOAD;
  return {
    enabled: source.enabled !== false,
    id: source.id ?? '',
    image: source.image ?? '',
    alt: source.alt ?? '',
    caption: source.caption ?? '',
    showUntil: source.showUntil ?? '',
    link: { ...normalizeLink(source.link), enabled: true },
    reshow: false,
  };
}

/** One-line summary of what visitors currently get. */
function describeStatus(payload) {
  const poster = normalizePoster(payload);
  if (!poster) return payload?.enabled === false ? 'Off' : 'Off — no poster image';
  if (!isPosterCurrent(poster)) return `Ended on ${poster.showUntil}`;
  return poster.showUntil ? `Showing until ${poster.showUntil}` : 'Showing';
}

/**
 * Admin editor for the popup first-time visitors see on the public site
 * (EventPosterModal). Stored as the `site.popup` page_sections row, always
 * published — switching it off is the `enabled` flag, so the public side can
 * tell "off" apart from "never configured".
 */
export default function SitePopupPanel() {
  const { isAdmin, isStaff } = useAuth();
  const [section, setSection] = useState(null);
  const [form, setForm] = useState(() => payloadToForm(null));
  const [customPages, setCustomPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const rows = await fetchAllPageSections();
      const row = rows.find(
        (r) => r.page_key === POPUP_PAGE_KEY && r.section_key === POPUP_SECTION_KEY,
      ) ?? null;
      setSection(row);
      setForm(payloadToForm(row?.payload));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedCustomPages()
      .then((pages) => { if (!cancelled) setCustomPages(pages); })
      .catch(() => { if (!cancelled) setCustomPages([]); });
    return () => { cancelled = true; };
  }, []);

  function update(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function save(e) {
    e.preventDefault();
    if (!isAdmin) return;

    const image = form.image.trim();
    const link = normalizeLink(form.link);
    if (form.enabled) {
      if (!image) {
        setError('Add a poster image, or switch the popup off.');
        return;
      }
      if (!form.alt.trim()) {
        setError('Describe the poster in the image description field — screen readers read it aloud.');
        return;
      }
      if (link.kind === 'page' && !link.pageSlug) {
        setError('Choose which event page the button opens.');
        return;
      }
      if (link.kind === 'site' && !link.sitePage) {
        setError('Choose which page on this site the button opens.');
        return;
      }
      if (link.kind === 'external' && !isSafeExternalUrl(link.url)) {
        setError('Enter a full address starting with http:// or https://');
        return;
      }
    }

    // A new id re-shows the popup to visitors who closed the previous one.
    const savedImage = (section?.payload ?? DEFAULT_POSTER_PAYLOAD).image ?? '';
    const needsNewId = !form.id || form.reshow || image !== savedImage;
    const payload = {
      enabled: form.enabled,
      id: needsNewId ? `popup-${Date.now()}` : form.id,
      image,
      alt: form.alt.trim(),
      caption: form.caption.trim(),
      showUntil: form.showUntil,
      link: {
        ...link,
        enabled: true,
        label: link.label.trim() || 'Learn more',
        url: link.url.trim(),
      },
    };

    setSaving(true);
    setError('');
    try {
      await savePageSection(
        {
          page_key: POPUP_PAGE_KEY,
          section_key: POPUP_SECTION_KEY,
          status: 'published',
          sort_order: section?.sort_order ?? 0,
          payload,
        },
        section?.id ?? null,
      );
      setMessage(form.enabled ? 'Popup saved' : 'Popup switched off');
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading site popup…</p>;

  const liveStatus = describeStatus(section?.payload ?? DEFAULT_POSTER_PAYLOAD);

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        The poster that pops up once for each first-time visitor to the website. Its button can
        open an event page built in the CMS, or any page on the site such as Events.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <p style={{ marginBottom: '1rem' }}>
        <strong>On the website now:</strong> {liveStatus}
      </p>

      <form className="paper-card" onSubmit={save} style={{ padding: '1.25rem' }}>
        <fieldset disabled={!isAdmin} style={{ border: 0, padding: 0, margin: 0 }}>
          <div className="admin-form-field full">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                id="popup-enabled"
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => update({ enabled: e.target.checked })}
              />
              <label className="admin-form-label" style={{ margin: 0 }} htmlFor="popup-enabled">
                Show the popup to visitors
              </label>
            </span>
          </div>

          {form.enabled && (
            <div className="admin-form-grid">
              <MediaUploadField
                label="Poster image"
                value={form.image ? { url: form.image, alt: form.alt } : null}
                altText={form.alt}
                onChange={(media) => update({
                  image: media?.url ?? '',
                  alt: form.alt || media?.alt || '',
                })}
              />
              <Field
                id="popup-alt"
                label="Image description (alt text)"
                full
                hint="Read aloud by screen readers. Include the event name, date and time shown on the poster."
              >
                <textarea
                  id="popup-alt"
                  className="admin-form-textarea"
                  rows={2}
                  value={form.alt}
                  onChange={(e) => update({ alt: e.target.value })}
                />
              </Field>
              <Field id="popup-caption" label="Caption (optional)" full hint="A short line shown under the poster.">
                <input
                  id="popup-caption"
                  className="admin-form-input"
                  value={form.caption}
                  onChange={(e) => update({ caption: e.target.value })}
                />
              </Field>
              <Field
                id="popup-until"
                label="Show until (optional)"
                hint="Last day the popup appears. It stops by itself afterwards. Leave blank to keep it up."
              >
                <input
                  id="popup-until"
                  className="admin-form-input"
                  type="date"
                  value={form.showUntil}
                  onChange={(e) => update({ showUntil: e.target.value })}
                />
              </Field>

              <LinkFields
                value={form.link}
                onChange={(link) => update({ link })}
                customPages={customPages}
                alwaysEnabled
                idPrefix="popup-link"
              />

              <div className="admin-form-field full">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    id="popup-reshow"
                    type="checkbox"
                    checked={form.reshow}
                    onChange={(e) => update({ reshow: e.target.checked })}
                  />
                  <label className="admin-form-label" style={{ margin: 0 }} htmlFor="popup-reshow">
                    Show again to visitors who already closed it
                  </label>
                </span>
                <small style={{ color: 'var(--text-muted)' }}>
                  Happens automatically when you change the poster image.
                </small>
              </div>
            </div>
          )}

          {isAdmin && (
            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? 'Saving…' : 'Save popup'}
              </button>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
}
