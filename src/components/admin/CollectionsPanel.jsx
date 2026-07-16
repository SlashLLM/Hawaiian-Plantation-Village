import React, { useCallback, useEffect, useRef, useState } from 'react';
import { scrollIntoViewIfSupported } from '../../lib/scrollIntoViewIfSupported.js';
import { useAuth } from '../../hooks/useAuth.js';
import { isValidSlug } from '../../lib/content/validators.js';
import {
  fetchAllContentEntries,
  saveContentEntry,
  setContentEntryStatus,
} from '../../lib/content/cmsAdminApi.js';
import StatusBadge from './StatusBadge.jsx';
import MediaUploadField from './MediaUploadField.jsx';
import CampStoryFields from './collectionFields/CampStoryFields.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminEmptyState from './AdminEmptyState.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminToolbar from './AdminToolbar.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';

const CONTENT_TYPES = [
  'news', 'program', 'career', 'camp_story', 'faq', 'testimonial',
  'partner', 'timeline', 'leadership', 'workshop',
];

const TYPE_LABELS = {
  news: 'News',
  program: 'Programs / events',
  career: 'Careers',
  camp_story: 'Camp stories',
  faq: 'FAQs',
  testimonial: 'Testimonials',
  partner: 'Partners',
  timeline: 'Timeline',
  leadership: 'Leadership',
  workshop: 'Workshops',
};

const EMPTY_ENTRY = {
  slug: '', content_type: 'news', status: 'draft', title: '', summary: '', body: '',
  category: '', event_date_label: '', image_url: '', sort_order: 0, metadata: {},
};

export default function CollectionsPanel() {
  const { isAdmin, isStaff } = useAuth();
  const formRef = useRef(null);
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all');
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
      const data = await fetchAllContentEntries();
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
      content_type: entry.content_type,
      status: entry.status,
      title: entry.title,
      summary: entry.summary ?? '',
      body: entry.body ?? '',
      category: entry.category ?? '',
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
    if (!isValidSlug(form.slug)) {
      setError('Slug must be lowercase letters, numbers, and hyphens only');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await saveContentEntry(form, editingId);
      setMessage(editingId ? 'Entry updated' : 'Entry created');
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
      setMessage(status === 'published' ? 'Entry published' : 'Entry archived');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const filtered = filter === 'all' ? entries : entries.filter((e) => e.content_type === filter);
  const filterLabel = filter === 'all' ? 'entries' : TYPE_LABELS[filter] ?? filter;

  if (loading) return <p>Loading collections…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Repeatable lists: news, programs, careers, camp stories, FAQs, testimonials, partners, timeline, leadership, workshops.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <AdminToolbar>
        <select className="admin-form-select" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by content type">
          <option value="all">All types</option>
          {CONTENT_TYPES.map((t) => <option key={t} value={t}>{TYPE_LABELS[t] ?? t}</option>)}
        </select>
        {isAdmin && (
          <button type="button" className="btn-primary" onClick={handleAddNew}>Add entry</button>
        )}
      </AdminToolbar>

      {isAdmin && (
        <form ref={formRef} className="paper-card" onSubmit={save} style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h4>{editingId ? 'Edit entry' : 'New collection entry'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Slug</label>
              <input className="admin-form-input" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} disabled={!!editingId} />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Type</label>
              <select className="admin-form-select" value={form.content_type} onChange={(e) => setForm({ ...form, content_type: e.target.value })}>
                {CONTENT_TYPES.map((t) => <option key={t} value={t}>{TYPE_LABELS[t] ?? t}</option>)}
              </select>
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Status</label>
              <select className="admin-form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Sort order</label>
              <input type="number" className="admin-form-input" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
            <div className="admin-form-field full">
              <label className="admin-form-label">Title</label>
              <input className="admin-form-input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            {form.content_type === 'camp_story' ? (
              <CampStoryFields form={form} setForm={setForm} entries={entries} />
            ) : (
              <>
                <div className="admin-form-field">
                  <label className="admin-form-label">Category</label>
                  <input className="admin-form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Date label</label>
                  <input className="admin-form-input" value={form.event_date_label} onChange={(e) => setForm({ ...form, event_date_label: e.target.value })} />
                </div>
                <div className="admin-form-field full">
                  <label className="admin-form-label">Summary</label>
                  <textarea className="admin-form-textarea" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
                </div>
                <div className="admin-form-field full">
                  <label className="admin-form-label">Body</label>
                  <textarea className="admin-form-textarea" rows={5} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
                </div>
                <MediaUploadField
                  value={form.image_url ? { url: form.image_url, alt: form.title } : null}
                  onChange={(img) => setForm({ ...form, image_url: img?.url ?? '' })}
                />
                <div className="admin-form-field full">
                  <label className="admin-form-label">Metadata (JSON)</label>
                  <textarea
                    className="admin-form-textarea"
                    rows={4}
                    value={JSON.stringify(form.metadata, null, 2)}
                    onChange={(e) => {
                      try { setForm({ ...form, metadata: JSON.parse(e.target.value || '{}') }); setError(''); } catch { setError('Metadata must be valid JSON'); }
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save entry'}</button>
            {editingId && <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      )}

      {filtered.length === 0 ? (
        <AdminEmptyState
          title={`No ${filterLabel} yet`}
          message={isAdmin ? 'Use the form above to add your first entry.' : 'No published content in this category.'}
          action={isAdmin && <button type="button" className="btn-primary" onClick={handleAddNew}>Add entry</button>}
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Type</th><th>Status</th><th>Order</th><th /></tr></thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.title}</td>
                  <td>{TYPE_LABELS[entry.content_type] ?? entry.content_type}</td>
                  <td><StatusBadge value={entry.status} /></td>
                  <td>{entry.sort_order}</td>
                  <td style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {isAdmin && (
                      <>
                        <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => startEdit(entry)}>Edit</button>
                        {entry.status !== 'published' && (
                          <button type="button" className="btn-primary" style={{ fontSize: '0.75rem' }} onClick={() => setStatus(entry, 'published')}>Publish</button>
                        )}
                        {entry.status === 'published' && (
                          <AdminConfirmButton
                            style={{ fontSize: '0.75rem' }}
                            confirmMessage="Archive this entry? It will be removed from the public site."
                            onConfirm={() => setStatus(entry, 'archived')}
                          >
                            Archive
                          </AdminConfirmButton>
                        )}
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
