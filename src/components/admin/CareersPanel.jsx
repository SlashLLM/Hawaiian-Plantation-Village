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
import { getMetadataAt, updateMetadata } from '../../lib/content/collectionFormUtils.js';
import StatusBadge from './StatusBadge.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminEmptyState from './AdminEmptyState.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminToolbar from './AdminToolbar.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';

const EMPTY_ENTRY = {
  slug: '',
  content_type: 'career',
  status: 'draft',
  title: '',
  summary: '',
  body: '',
  category: '',
  event_date_label: '',
  image_url: '',
  sort_order: 0,
  metadata: {
    type: '',
    department: '',
    compensation: '',
    hours: '',
    responsibilities: [],
    requirements: [],
  },
};

function StringListField({ label, itemLabel, values, onChange }) {
  const items = Array.isArray(values) ? values : [];

  return (
    <div className="admin-form-field full">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
        <label className="admin-form-label" style={{ margin: 0 }}>{label}</label>
        <button
          type="button"
          className="btn-secondary"
          style={{ fontSize: '0.75rem' }}
          onClick={() => onChange([...items, ''])}
        >
          Add {itemLabel.toLowerCase()}
        </button>
      </div>
      {items.length === 0 ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>No items yet.</p>
      ) : (
        items.map((text, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.35rem' }}>
            <input
              className="admin-form-input"
              value={text ?? ''}
              onChange={(e) => {
                const next = items.map((t, idx) => (idx === i ? e.target.value : t));
                onChange(next);
              }}
              aria-label={`${itemLabel} ${i + 1}`}
            />
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem' }}
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              aria-label={`Remove ${itemLabel} ${i + 1}`}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default function CareersPanel() {
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
      const data = await fetchAllContentEntries({ contentType: 'career' });
      setEntries(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function setMeta(path, value) {
    setForm((prev) => ({
      ...prev,
      metadata: updateMetadata(prev.metadata, path, value),
    }));
  }

  function startEdit(entry) {
    const meta = entry.metadata ?? {};
    setEditingId(entry.id);
    setForm({
      slug: entry.slug,
      content_type: 'career',
      status: entry.status,
      title: entry.title,
      summary: entry.summary ?? '',
      body: entry.body ?? '',
      category: entry.category ?? '',
      event_date_label: entry.event_date_label ?? '',
      image_url: entry.image_url ?? '',
      sort_order: entry.sort_order ?? 0,
      metadata: {
        type: meta.type ?? '',
        department: meta.department ?? '',
        compensation: meta.compensation ?? '',
        hours: meta.hours ?? '',
        responsibilities: Array.isArray(meta.responsibilities) ? meta.responsibilities : [],
        requirements: Array.isArray(meta.requirements) ? meta.requirements : [],
      },
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
      : (normalizeSlug(form.title) || `job-${Date.now()}`);
    if (!isValidSlug(slug)) {
      setError('Could not generate a valid slug from the title. Add letters or numbers to the title.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await saveContentEntry({
        ...form,
        slug,
        content_type: 'career',
        body: form.summary,
        metadata: {
          ...form.metadata,
          responsibilities: (form.metadata.responsibilities ?? []).filter((s) => String(s).trim()),
          requirements: (form.metadata.requirements ?? []).filter((s) => String(s).trim()),
        },
      }, editingId);
      setMessage(editingId ? 'Job updated' : 'Job created');
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
      setMessage(status === 'published' ? 'Job published' : 'Job archived');
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
      setMessage('Job deleted');
      if (editingId === entry.id) resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading careers…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Add, edit, or delete career openings shown on the About page.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <AdminToolbar>
        {isAdmin && (
          <button type="button" className="btn-primary" onClick={handleAddNew}>Add job</button>
        )}
      </AdminToolbar>

      {isAdmin && (
        <form ref={formRef} className="paper-card" onSubmit={save} style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h4>{editingId ? 'Edit job' : 'New job'}</h4>
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
              <label className="admin-form-label">Type</label>
              <input
                className="admin-form-input"
                value={getMetadataAt(form.metadata, 'type', '')}
                onChange={(e) => setMeta('type', e.target.value)}
                placeholder="Part-Time"
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Department</label>
              <input
                className="admin-form-input"
                value={getMetadataAt(form.metadata, 'department', '')}
                onChange={(e) => setMeta('department', e.target.value)}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Compensation</label>
              <input
                className="admin-form-input"
                value={getMetadataAt(form.metadata, 'compensation', '')}
                onChange={(e) => setMeta('compensation', e.target.value)}
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Hours</label>
              <input
                className="admin-form-input"
                value={getMetadataAt(form.metadata, 'hours', '')}
                onChange={(e) => setMeta('hours', e.target.value)}
              />
            </div>
            <div className="admin-form-field full">
              <label className="admin-form-label">Summary</label>
              <textarea
                className="admin-form-textarea"
                rows={3}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </div>
            <StringListField
              label="Responsibilities"
              itemLabel="Responsibility"
              values={form.metadata.responsibilities}
              onChange={(next) => setMeta('responsibilities', next)}
            />
            <StringListField
              label="Requirements"
              itemLabel="Requirement"
              values={form.metadata.requirements}
              onChange={(next) => setMeta('requirements', next)}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save job'}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      )}

      {entries.length === 0 ? (
        <AdminEmptyState
          title="No jobs yet"
          message={isAdmin ? 'Use the form above to add your first job posting.' : 'No published careers.'}
          action={isAdmin && <button type="button" className="btn-primary" onClick={handleAddNew}>Add job</button>}
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Order</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.title}</td>
                  <td>{entry.metadata?.type || '—'}</td>
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
                            confirmMessage="Archive this job? It will be removed from the public site."
                            onConfirm={() => setStatus(entry, 'archived')}
                          >
                            Archive
                          </AdminConfirmButton>
                        )}
                        <AdminConfirmButton
                          style={{ fontSize: '0.75rem' }}
                          confirmMessage="Permanently delete this job? This cannot be undone."
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
