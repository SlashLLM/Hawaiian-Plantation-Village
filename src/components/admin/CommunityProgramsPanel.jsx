import React, { useCallback, useEffect, useRef, useState } from 'react';
import { scrollIntoViewIfSupported } from '../../lib/scrollIntoViewIfSupported.js';
import { useAuth } from '../../hooks/useAuth.js';
import { isValidSlug, normalizeSlug } from '../../lib/content/validators.js';
import {
  fetchAllPageSections,
  savePageSection,
  setPageSectionStatus,
} from '../../lib/content/cmsAdminApi.js';
import { getStarterPayload } from '../../lib/content/sectionKeys.js';
import StatusBadge from './StatusBadge.jsx';
import MediaUploadField from './MediaUploadField.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminEmptyState from './AdminEmptyState.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminToolbar from './AdminToolbar.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';

const EMPTY_ITEM = {
  slug: '',
  date: '',
  title: '',
  time: '',
  desc: '',
  image: '',
};

export default function CommunityProgramsPanel() {
  const { isAdmin, isStaff } = useAuth();
  const formRef = useRef(null);
  const [section, setSection] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY_ITEM);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const rows = await fetchAllPageSections();
      const row = rows.find((r) => r.page_key === 'home' && r.section_key === 'events') ?? null;
      setSection(row);
      const list = Array.isArray(row?.payload?.items) ? row.payload.items : [];
      setItems(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setEditingIndex(null);
    setForm(EMPTY_ITEM);
  }

  function handleAddNew() {
    resetForm();
    scrollIntoViewIfSupported(formRef.current, { behavior: 'smooth', block: 'start' });
  }

  function startEdit(index) {
    const item = items[index];
    setEditingIndex(index);
    setForm({
      slug: item.slug ?? '',
      date: item.date ?? '',
      title: item.title ?? '',
      time: item.time ?? '',
      desc: item.desc ?? '',
      image: item.image ?? '',
    });
    scrollIntoViewIfSupported(formRef.current, { behavior: 'smooth', block: 'start' });
  }

  async function persistItems(nextItems, { status } = {}) {
    const starter = getStarterPayload('home', 'events');
    const payload = {
      ...(section?.payload ?? starter),
      items: nextItems,
    };
    const record = {
      page_key: 'home',
      section_key: 'events',
      status: status ?? section?.status ?? 'published',
      sort_order: section?.sort_order ?? 9,
      payload,
    };
    await savePageSection(record, section?.id ?? null);
  }

  async function save(e) {
    e.preventDefault();
    if (!isAdmin) return;

    const slug = editingIndex != null && form.slug
      ? form.slug
      : (normalizeSlug(form.title) || `event-${Date.now()}`);
    if (!isValidSlug(slug)) {
      setError('Could not generate a valid slug from the title. Add letters or numbers to the title.');
      return;
    }

    const nextItem = {
      slug,
      date: form.date.trim(),
      title: form.title.trim(),
      time: form.time.trim(),
      desc: form.desc.trim(),
      image: form.image.trim(),
    };

    const nextItems = [...items];
    if (editingIndex != null) {
      nextItems[editingIndex] = nextItem;
    } else {
      if (nextItems.some((item) => item.slug === slug)) {
        setError('An event with this slug already exists.');
        return;
      }
      nextItems.push(nextItem);
    }

    setSaving(true);
    setError('');
    try {
      await persistItems(nextItems);
      setMessage(editingIndex != null ? 'Event updated' : 'Event added');
      resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(index) {
    if (!isAdmin) return;
    setError('');
    try {
      const nextItems = items.filter((_, i) => i !== index);
      await persistItems(nextItems);
      setMessage('Event deleted');
      if (editingIndex === index) resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function setStatus(status) {
    if (!isAdmin || !section?.id) return;
    setError('');
    try {
      await setPageSectionStatus(section.id, status);
      setMessage(status === 'published' ? 'Programs published' : 'Programs set to draft');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading community programs…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Manage Upcoming Community Programs shown on the Home page calendar section.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <AdminToolbar>
        {isAdmin && (
          <>
            <button type="button" className="btn-primary" onClick={handleAddNew}>Add event</button>
            {section?.id && section.status !== 'published' && (
              <button type="button" className="btn-secondary" onClick={() => setStatus('published')}>
                Publish section
              </button>
            )}
            {section?.id && section.status === 'published' && (
              <button type="button" className="btn-secondary" onClick={() => setStatus('draft')}>
                Set section to draft
              </button>
            )}
          </>
        )}
        {section && (
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            Section: <StatusBadge value={section.status} />
          </span>
        )}
      </AdminToolbar>

      {isAdmin && (
        <form ref={formRef} className="paper-card" onSubmit={save} style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h4>{editingIndex != null ? 'Edit event' : 'New event'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-field full">
              <label className="admin-form-label">Title</label>
              <input
                className="admin-form-input"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Date label</label>
              <input
                className="admin-form-input"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="AUG 15"
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Time</label>
              <input
                className="admin-form-input"
                required
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                placeholder="5:00 PM - 9:00 PM"
              />
            </div>
            <div className="admin-form-field full">
              <label className="admin-form-label">Description</label>
              <textarea
                className="admin-form-textarea"
                rows={3}
                required
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </div>
            <MediaUploadField
              label="Event image"
              value={form.image ? { url: form.image, alt: form.title || 'Event image' } : null}
              onChange={(media) => setForm({ ...form, image: media?.url ?? '' })}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save event'}
            </button>
            {editingIndex != null && (
              <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      )}

      {items.length === 0 ? (
        <AdminEmptyState
          title="No community programs yet"
          message={isAdmin ? 'Use the form above to add your first upcoming event.' : 'No published programs.'}
          action={isAdmin && <button type="button" className="btn-primary" onClick={handleAddNew}>Add event</button>}
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.slug ?? index}>
                  <td>{item.title}</td>
                  <td>{item.date || '—'}</td>
                  <td>{item.time || '—'}</td>
                  <td style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {isAdmin && (
                      <>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem' }}
                          onClick={() => startEdit(index)}
                        >
                          Edit
                        </button>
                        <AdminConfirmButton
                          style={{ fontSize: '0.75rem' }}
                          confirmMessage="Permanently delete this event? This cannot be undone."
                          onConfirm={() => remove(index)}
                        >
                          Delete
                        </AdminConfirmButton>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
