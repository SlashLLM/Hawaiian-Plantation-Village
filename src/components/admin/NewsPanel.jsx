import React, { useCallback, useEffect, useRef, useState } from 'react';
import { scrollIntoViewIfSupported } from '../../lib/scrollIntoViewIfSupported.js';
import { useAuth } from '../../hooks/useAuth.js';
import { isValidSlug, normalizeSlug } from '../../lib/content/validators.js';
import {
  fetchAllContentEntries,
  saveContentEntry,
  setContentEntryStatus,
  deleteContentEntry,
} from '../../lib/content/cmsAdminApi.js';
import { dateLabelToInputValue } from '../../lib/timeFormat.js';
import StatusBadge from './StatusBadge.jsx';
import MediaUploadField from './MediaUploadField.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminEmptyState from './AdminEmptyState.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminToolbar from './AdminToolbar.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';

const EMPTY_ENTRY = {
  slug: '',
  content_type: 'news',
  status: 'draft',
  title: '',
  summary: '',
  body: '',
  category: '',
  event_date_label: '',
  image_url: '',
  sort_order: 0,
  metadata: {},
};

export default function NewsPanel() {
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
      const data = await fetchAllContentEntries({ contentType: 'news' });
      setEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function startEdit(entry) {
    setEditingId(entry.id);
    setForm({
      slug: entry.slug,
      content_type: 'news',
      status: entry.status,
      title: entry.title,
      summary: entry.summary ?? '',
      body: entry.body ?? '',
      category: entry.category ?? '',
      event_date_label: dateLabelToInputValue(entry.event_date_label ?? ''),
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
    const slug = editingId
      ? form.slug
      : (normalizeSlug(form.title) || `article-${Date.now()}`);
    if (!isValidSlug(slug)) {
      setError('Could not generate a valid slug from the title. Add letters or numbers to the title.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await saveContentEntry({ ...form, slug, content_type: 'news' }, editingId);
      setMessage(editingId ? 'Article updated' : 'Article created');
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
      setMessage(status === 'published' ? 'Article published' : 'Article archived');
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
      setMessage('Article deleted');
      if (editingId === entry.id) resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading news…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Add, edit, or delete news and announcements shown on the About page.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <AdminToolbar>
        {isAdmin && (
          <button type="button" className="btn-primary" onClick={handleAddNew}>Add article</button>
        )}
      </AdminToolbar>

      {isAdmin && (
        <form ref={formRef} className="paper-card" onSubmit={save} style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h4>{editingId ? 'Edit article' : 'New article'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Status</label>
              <select
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
              <label className="admin-form-label">Sort order</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Category</label>
              <input
                className="admin-form-input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Community"
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Date label</label>
              <input
                type="date"
                className="admin-form-input"
                value={form.event_date_label}
                onChange={(e) => setForm({ ...form, event_date_label: e.target.value })}
              />
            </div>
            <div className="admin-form-field full">
              <label className="admin-form-label">Title</label>
              <input
                className="admin-form-input"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="admin-form-field full">
              <label className="admin-form-label">Summary</label>
              <textarea
                className="admin-form-textarea"
                rows={2}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </div>
            <div className="admin-form-field full">
              <label className="admin-form-label">Body</label>
              <textarea
                className="admin-form-textarea"
                rows={6}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              />
            </div>
            <MediaUploadField
              value={form.image_url ? { url: form.image_url, alt: form.title } : null}
              onChange={(img) => setForm({ ...form, image_url: img?.url ?? '' })}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save article'}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      )}

      {entries.length === 0 ? (
        <AdminEmptyState
          title="No articles yet"
          message={isAdmin ? 'Use the form above to add your first article.' : 'No published news articles.'}
          action={isAdmin && <button type="button" className="btn-primary" onClick={handleAddNew}>Add article</button>}
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Order</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.title}</td>
                  <td>{entry.category || '—'}</td>
                  <td><StatusBadge value={entry.status} /></td>
                  <td>{entry.sort_order}</td>
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
                            confirmMessage="Archive this article? It will be removed from the public site."
                            onConfirm={() => setStatus(entry, 'archived')}
                          >
                            Archive
                          </AdminConfirmButton>
                        )}
                        <AdminConfirmButton
                          style={{ fontSize: '0.75rem' }}
                          confirmMessage="Permanently delete this article? This cannot be undone."
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
