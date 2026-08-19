import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { scrollIntoViewIfSupported } from '../../lib/scrollIntoViewIfSupported.js';
import { useAuth } from '../../hooks/useAuth.js';
import { isValidSlug, normalizeSlug } from '../../lib/content/validators.js';
import {
  fetchAllContentEntries,
  saveContentEntry,
  setContentEntryStatus,
  deleteContentEntry,
} from '../../lib/content/cmsAdminApi.js';
import StatusBadge from './StatusBadge.jsx';
import PhotographFields, { PHOTOGRAPH_COLLECTION_OPTIONS } from './collectionFields/PhotographFields.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminEmptyState from './AdminEmptyState.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminToolbar from './AdminToolbar.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';

const EMPTY_ENTRY = {
  slug: '',
  content_type: 'photograph',
  page_key: 'archives',
  status: 'draft',
  title: '',
  summary: '',
  body: '',
  category: 'fwcgp',
  event_date_label: '',
  image_url: '',
  sort_order: 0,
  metadata: { collection: 'fwcgp', relatedArkIds: [], provisional: true },
};

function collectionLabel(value) {
  return PHOTOGRAPH_COLLECTION_OPTIONS.find((option) => option.value === value)?.label ?? value ?? '—';
}

export default function PhotographsPanel() {
  const { isAdmin, isStaff } = useAuth();
  const formRef = useRef(null);
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(EMPTY_ENTRY);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllContentEntries({ contentType: 'photograph' });
      setEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const customCollections = useMemo(() => {
    const known = new Set(PHOTOGRAPH_COLLECTION_OPTIONS.map((option) => option.value));
    const extra = [];
    entries.forEach((entry) => {
      const value = entry.metadata?.collection ?? entry.category;
      if (value && !known.has(value)) {
        known.add(value);
        extra.push({ value, label: value });
      }
    });
    return extra;
  }, [entries]);

  function startEdit(entry) {
    setEditingId(entry.id);
    setForm({
      slug: entry.slug,
      content_type: 'photograph',
      page_key: entry.page_key ?? 'archives',
      status: entry.status,
      title: entry.title,
      summary: entry.summary ?? '',
      body: entry.body ?? '',
      category: entry.category ?? 'fwcgp',
      event_date_label: entry.event_date_label ?? '',
      image_url: entry.image_url ?? '',
      sort_order: entry.sort_order ?? 0,
      metadata: entry.metadata ?? {},
    });
    scrollIntoViewIfSupported(formRef.current, { behavior: 'smooth', block: 'start' });
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_ENTRY);
  }

  function handleAddNew() {
    resetForm();
    scrollIntoViewIfSupported(formRef.current, { behavior: 'smooth', block: 'start' });
  }

  async function save(e) {
    e.preventDefault();
    if (!isAdmin) return;
    const arkId = form.metadata?.arkId ?? '';
    const slug = editingId
      ? form.slug
      : (normalizeSlug(arkId || form.title) || `photo-${Date.now()}`);
    if (!isValidSlug(slug)) {
      setError('Could not generate a valid slug from the ark ID or title. Add letters or numbers.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await saveContentEntry({
        ...form,
        slug,
        content_type: 'photograph',
        page_key: 'archives',
      }, editingId);
      setMessage(editingId ? 'Photograph updated' : 'Photograph created');
      resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function setStatus(entry, status) {
    if (!isAdmin) return;
    setError('');
    try {
      await setContentEntryStatus(entry.id, status);
      setMessage(status === 'published' ? 'Photograph published' : 'Photograph archived');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(entry) {
    if (!isAdmin) return;
    setError('');
    try {
      await deleteContentEntry(entry.id);
      setMessage('Photograph deleted');
      if (editingId === entry.id) resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading photographs…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Catalog photographs for the Archives page. Metadata fields follow the accession card:
        filing category, subject, origin or donor, and accession number.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <AdminToolbar>
        {isAdmin && (
          <button type="button" className="btn-primary" onClick={handleAddNew}>Add photograph</button>
        )}
      </AdminToolbar>

      {isAdmin && (
        <form ref={formRef} className="paper-card" onSubmit={save} style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h4>{editingId ? 'Edit photograph' : 'New photograph'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label" htmlFor="photo-status">Status</label>
              <select
                id="photo-status"
                className="admin-form-select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label" htmlFor="photo-sort">Sort order</label>
              <input
                id="photo-sort"
                type="number"
                className="admin-form-input"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-field full">
              <label className="admin-form-label" htmlFor="photo-title">Title</label>
              <input
                id="photo-title"
                className="admin-form-input"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <PhotographFields form={form} setForm={setForm} extraCollections={customCollections} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save photograph'}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      )}

      {entries.length === 0 ? (
        <AdminEmptyState
          title="No photographs yet"
          message={isAdmin ? 'Use the form above to catalog your first photograph.' : 'No published photographs.'}
          action={isAdmin && <button type="button" className="btn-primary" onClick={handleAddNew}>Add photograph</button>}
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Collection</th>
                <th>Ark ID</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.title}</td>
                  <td>{collectionLabel(entry.metadata?.collection ?? entry.category)}</td>
                  <td>{entry.metadata?.arkId ?? '—'}</td>
                  <td><StatusBadge value={entry.status} /></td>
                  <td style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {isAdmin && (
                      <>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem' }}
                          onClick={() => startEdit(entry)}
                        >
                          Edit
                        </button>
                        {entry.status !== 'published' && (
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => setStatus(entry, 'published')}
                          >
                            Publish
                          </button>
                        )}
                        {entry.status === 'published' && (
                          <AdminConfirmButton
                            style={{ fontSize: '0.75rem' }}
                            confirmMessage="Archive this photograph? It will be removed from the public site."
                            onConfirm={() => setStatus(entry, 'archived')}
                          >
                            Archive
                          </AdminConfirmButton>
                        )}
                        <AdminConfirmButton
                          style={{ fontSize: '0.75rem' }}
                          confirmMessage="Permanently delete this photograph? This cannot be undone."
                          onConfirm={() => remove(entry)}
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
