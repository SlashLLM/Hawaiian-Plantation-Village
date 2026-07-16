import React, { useCallback, useEffect, useRef, useState } from 'react';
import { scrollIntoViewIfSupported } from '../../lib/scrollIntoViewIfSupported.js';
import { useAuth } from '../../hooks/useAuth.js';
import {
  fetchAllPageSections,
  savePageSection,
  setPageSectionStatus,
} from '../../lib/content/cmsAdminApi.js';
import {
  PAGE_KEYS,
  PAGE_LABELS,
  getSectionChoices,
  getStarterPayload,
} from '../../lib/content/sectionKeys.js';
import { hasSectionFormSchema } from '../../lib/content/sectionFormSchemas.js';
import StatusBadge from './StatusBadge.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminEmptyState from './AdminEmptyState.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminToolbar from './AdminToolbar.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';
import SectionPayloadForm from './SectionPayloadForm.jsx';

const EMPTY = { page_key: 'home', section_key: '', status: 'draft', sort_order: 0, payload: {} };

export default function SectionsPanel() {
  const { isAdmin, isStaff } = useAuth();
  const formRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [filterPage, setFilterPage] = useState('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [advanced, setAdvanced] = useState(false);
  const [customKey, setCustomKey] = useState('');

  const sectionChoices = getSectionChoices(form.page_key);
  const existingKeys = rows.filter((r) => r.page_key === form.page_key).map((r) => r.section_key);
  const registryKeys = new Set(sectionChoices.map((s) => s.key));
  const orphanSections = rows
    .filter((r) => r.page_key === form.page_key && !registryKeys.has(r.section_key))
    .map((r) => ({ key: r.section_key, label: r.section_key }));
  const pickerChoices = [...sectionChoices, ...orphanSections];
  const pickerValue = form.section_key && pickerChoices.some((s) => s.key === form.section_key)
    ? form.section_key
    : (form.section_key === '__custom__' || customKey ? '__custom__' : form.section_key);
  const effectiveSectionKey = pickerValue === '__custom__' ? '' : form.section_key;
  const hasSchema = hasSectionFormSchema(form.page_key, effectiveSectionKey);
  const showGuided = !advanced && hasSchema;

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllPageSections();
      setRows(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY);
    setAdvanced(false);
    setCustomKey('');
  }

  function handleAddNew() {
    resetForm();
    scrollIntoViewIfSupported(formRef.current, { behavior: 'smooth', block: 'start' });
  }

  function handlePageChange(pageKey) {
    setEditingId(null);
    setForm((prev) => ({
      ...prev,
      page_key: pageKey,
      section_key: '',
      payload: {},
    }));
    setCustomKey('');
    setAdvanced(false);
  }

  function handleSectionKeyChange(sectionKey) {
    if (sectionKey === '__custom__') {
      setEditingId(null);
      setCustomKey('');
      setForm((prev) => ({ ...prev, section_key: '__custom__', status: 'draft', sort_order: 0, payload: {} }));
      setAdvanced(false);
      return;
    }
    if (!sectionKey) {
      setEditingId(null);
      setCustomKey('');
      setForm((prev) => ({ ...prev, section_key: '', status: 'draft', sort_order: 0, payload: {} }));
      setAdvanced(false);
      return;
    }
    const existing = rows.find(
      (r) => r.page_key === form.page_key && r.section_key === sectionKey,
    );
    if (existing) {
      const starter = getStarterPayload(form.page_key, sectionKey);
      setEditingId(existing.id);
      setCustomKey('');
      setForm({
        page_key: existing.page_key,
        section_key: existing.section_key,
        status: existing.status,
        sort_order: existing.sort_order,
        // Fill missing fields (e.g. rates) from starter so guided form shows full structure
        payload: { ...starter, ...(existing.payload ?? {}) },
      });
      setAdvanced(false);
      return;
    }
    const starter = getStarterPayload(form.page_key, sectionKey);
    setEditingId(null);
    setCustomKey('');
    setForm((prev) => ({
      ...prev,
      section_key: sectionKey,
      status: 'draft',
      sort_order: 0,
      payload: Object.keys(starter).length ? starter : {},
    }));
    setAdvanced(false);
  }

  async function save(e) {
    e.preventDefault();
    if (!isAdmin) return;
    const sectionKey = form.section_key === '__custom__' ? customKey.trim() : form.section_key;
    if (!sectionKey) {
      setError('Select or enter a section key');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await savePageSection({ ...form, section_key: sectionKey }, editingId);
      setMessage(editingId ? 'Section updated' : 'Section created');
      resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function publish(row) {
    if (!isAdmin) return;
    try {
      await setPageSectionStatus(row.id, 'published');
      setMessage('Section published');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function archive(row) {
    if (!isAdmin) return;
    try {
      await setPageSectionStatus(row.id, 'archived');
      setMessage('Section archived');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  const filtered = filterPage === 'all' ? rows : rows.filter((r) => r.page_key === filterPage);
  const pageLabel = filterPage === 'all' ? 'page sections' : `${PAGE_LABELS[filterPage] ?? filterPage} sections`;

  if (loading) return <p>Loading page sections…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Fixed-layout page sections keyed by page + section (hero blocks, quick visit, mission copy, etc.).
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <AdminToolbar>
        <select className="admin-form-select" value={filterPage} onChange={(e) => setFilterPage(e.target.value)} aria-label="Filter by page">
          <option value="all">All pages</option>
          {PAGE_KEYS.map((p) => <option key={p} value={p}>{PAGE_LABELS[p] ?? p}</option>)}
        </select>
        {isAdmin && <button type="button" className="btn-primary" onClick={handleAddNew}>Add section</button>}
      </AdminToolbar>

      {isAdmin && (
        <form ref={formRef} className="paper-card" onSubmit={save} style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h4>{editingId ? 'Edit section' : 'New page section'}</h4>
          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label className="admin-form-label">Page</label>
              <select className="admin-form-select" aria-label="Page" value={form.page_key} onChange={(e) => handlePageChange(e.target.value)}>
                {PAGE_KEYS.map((p) => <option key={p} value={p}>{PAGE_LABELS[p] ?? p}</option>)}
              </select>
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Section</label>
              <select className="admin-form-select" aria-label="Section" required value={pickerValue} onChange={(e) => handleSectionKeyChange(e.target.value)}>
                <option value="">Choose a section…</option>
                {pickerChoices.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}{existingKeys.includes(s.key) ? ' (exists)' : ''}
                  </option>
                ))}
                <option value="__custom__">Custom section key…</option>
              </select>
            </div>
            {!editingId && pickerValue === '__custom__' && (
              <div className="admin-form-field">
                <label className="admin-form-label">Custom section key</label>
                <input
                  className="admin-form-input"
                  placeholder="mySectionKey"
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                />
              </div>
            )}
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
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <label className="admin-form-label" style={{ margin: 0 }}>
                {showGuided ? 'Section content' : 'Payload JSON'}
              </label>
              {hasSchema && (
                <button type="button" className="btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => setAdvanced((v) => !v)}>
                  {advanced ? 'Use guided fields' : 'Advanced JSON editor'}
                </button>
              )}
            </div>

            {showGuided ? (
              <SectionPayloadForm
                pageKey={form.page_key}
                sectionKey={effectiveSectionKey}
                payload={form.payload}
                onChange={(payload) => setForm((prev) => ({ ...prev, payload }))}
              />
            ) : (
              <>
                <textarea
                  className="admin-form-textarea"
                  rows={10}
                  value={JSON.stringify(form.payload, null, 2)}
                  onChange={(e) => {
                    try {
                      setForm({ ...form, payload: JSON.parse(e.target.value || '{}') });
                      setError('');
                    } catch {
                      setError('Payload must be valid JSON');
                    }
                  }}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  {hasSchema
                    ? 'Edit the raw JSON payload, or switch back to guided fields.'
                    : 'Selecting a known section loads a starter template. Custom sections use JSON only.'}
                </p>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save section'}</button>
            {editingId && <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      )}

      {filtered.length === 0 ? (
        <AdminEmptyState
          title={`No ${pageLabel} yet`}
          message={isAdmin ? 'Add a section using the form above. Starter templates are provided for each page.' : 'No sections configured for this page.'}
          action={isAdmin && <button type="button" className="btn-primary" onClick={handleAddNew}>Add section</button>}
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Page</th><th>Section</th><th>Status</th><th>Order</th><th /></tr></thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td>{PAGE_LABELS[row.page_key] ?? row.page_key}</td>
                  <td>{row.section_key}</td>
                  <td><StatusBadge value={row.status} /></td>
                  <td>{row.sort_order}</td>
                  <td style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {isAdmin && (
                      <>
                        {row.status !== 'published' && (
                          <button type="button" className="btn-primary" style={{ fontSize: '0.75rem' }} onClick={() => publish(row)}>Publish</button>
                        )}
                        {row.status === 'published' && (
                          <AdminConfirmButton
                            style={{ fontSize: '0.75rem' }}
                            confirmMessage="Archive this section? It will be removed from the public site."
                            onConfirm={() => archive(row)}
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
