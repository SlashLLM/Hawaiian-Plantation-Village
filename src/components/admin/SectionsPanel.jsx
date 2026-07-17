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

/**
 * @param {{ pageKey?: string }} props
 * When `pageKey` is set, the panel is scoped to that page (used by PageEditorPanel).
 * When omitted, keeps a page filter for standalone use.
 */
export default function SectionsPanel({ pageKey: scopedPageKey } = {}) {
  const { isAdmin, isStaff } = useAuth();
  const formRef = useRef(null);
  const isScoped = Boolean(scopedPageKey);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(() => ({
    ...EMPTY,
    page_key: scopedPageKey ?? 'home',
  }));
  const [editingId, setEditingId] = useState(null);
  const [filterPage, setFilterPage] = useState(scopedPageKey ?? 'all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [advanced, setAdvanced] = useState(false);

  useEffect(() => {
    if (!isScoped) return;
    setFilterPage(scopedPageKey);
    setForm((prev) => ({
      ...EMPTY,
      page_key: scopedPageKey,
      section_key: prev.page_key === scopedPageKey ? prev.section_key : '',
      payload: prev.page_key === scopedPageKey ? prev.payload : {},
    }));
    setEditingId(null);
    setAdvanced(false);
  }, [scopedPageKey, isScoped]);

  const sectionChoices = getSectionChoices(form.page_key);
  const existingKeys = rows.filter((r) => r.page_key === form.page_key).map((r) => r.section_key);
  const registryKeys = new Set(sectionChoices.map((s) => s.key));
  const orphanSections = rows
    .filter((r) => r.page_key === form.page_key && !registryKeys.has(r.section_key))
    .map((r) => ({ key: r.section_key, label: r.section_key }));
  const pickerChoices = [...sectionChoices, ...orphanSections];
  const pickerValue = form.section_key && pickerChoices.some((s) => s.key === form.section_key)
    ? form.section_key
    : form.section_key;
  const hasSchema = hasSectionFormSchema(form.page_key, form.section_key);
  const showGuided = !advanced && hasSchema && Boolean(form.section_key);

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
    setForm({ ...EMPTY, page_key: isScoped ? scopedPageKey : 'home' });
    setAdvanced(false);
  }

  function handlePageChange(pageKey) {
    setEditingId(null);
    setForm((prev) => ({
      ...prev,
      page_key: pageKey,
      section_key: '',
      payload: {},
    }));
    setAdvanced(false);
  }

  function handleSectionKeyChange(sectionKey) {
    if (!sectionKey) {
      setEditingId(null);
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
      setForm({
        page_key: existing.page_key,
        section_key: existing.section_key,
        status: existing.status,
        sort_order: existing.sort_order,
        payload: { ...starter, ...(existing.payload ?? {}) },
      });
      setAdvanced(false);
      return;
    }
    const starter = getStarterPayload(form.page_key, sectionKey);
    setEditingId(null);
    setForm((prev) => ({
      ...prev,
      section_key: sectionKey,
      status: 'draft',
      sort_order: 0,
      payload: Object.keys(starter).length ? starter : {},
    }));
    setAdvanced(false);
  }

  function startEdit(row) {
    const starter = getStarterPayload(row.page_key, row.section_key);
    setEditingId(row.id);
    setForm({
      page_key: row.page_key,
      section_key: row.section_key,
      status: row.status,
      sort_order: row.sort_order,
      payload: { ...starter, ...(row.payload ?? {}) },
    });
    setAdvanced(false);
    scrollIntoViewIfSupported(formRef.current, { behavior: 'smooth', block: 'start' });
  }

  async function save(e) {
    e.preventDefault();
    if (!isAdmin) return;
    if (!form.section_key) {
      setError('Select a section to edit');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await savePageSection({ ...form, section_key: form.section_key }, editingId);
      setMessage(editingId ? 'Section updated' : 'Section saved');
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

  const effectiveFilter = isScoped ? scopedPageKey : filterPage;
  const filtered = effectiveFilter === 'all' ? rows : rows.filter((r) => r.page_key === effectiveFilter);
  const pageLabel = effectiveFilter === 'all'
    ? 'page sections'
    : `${PAGE_LABELS[effectiveFilter] ?? effectiveFilter} sections`;

  if (loading) return <p>Loading page sections…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Edit fixed page sections for this page. Choose a section below or click Edit in the list.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      {!isScoped && (
        <AdminToolbar>
          <select
            className="admin-form-select"
            value={filterPage}
            onChange={(e) => setFilterPage(e.target.value)}
            aria-label="Filter by page"
          >
            <option value="all">All pages</option>
            {PAGE_KEYS.map((p) => <option key={p} value={p}>{PAGE_LABELS[p] ?? p}</option>)}
          </select>
        </AdminToolbar>
      )}

      {isAdmin && (
        <form ref={formRef} className="paper-card" onSubmit={save} style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h4>{editingId ? 'Edit section' : 'Select a section'}</h4>
          <div className="admin-form-grid">
            {!isScoped && (
              <div className="admin-form-field">
                <label className="admin-form-label">Page</label>
                <select
                  className="admin-form-select"
                  aria-label="Page"
                  value={form.page_key}
                  onChange={(e) => handlePageChange(e.target.value)}
                >
                  {PAGE_KEYS.map((p) => <option key={p} value={p}>{PAGE_LABELS[p] ?? p}</option>)}
                </select>
              </div>
            )}
            <div className="admin-form-field">
              <label className="admin-form-label">Section</label>
              <select
                className="admin-form-select"
                aria-label="Section"
                required
                value={pickerValue}
                onChange={(e) => handleSectionKeyChange(e.target.value)}
              >
                <option value="">Choose a section…</option>
                {pickerChoices.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}{existingKeys.includes(s.key) ? ' (exists)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-form-field">
              <label className="admin-form-label">Status</label>
              <select
                className="admin-form-select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                disabled={!form.section_key}
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
                disabled={!form.section_key}
              />
            </div>
          </div>

          {form.section_key && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <label className="admin-form-label" style={{ margin: 0 }}>
                  {showGuided ? 'Section content' : 'Payload JSON'}
                </label>
                {hasSchema && (
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => setAdvanced((v) => !v)}
                  >
                    {advanced ? 'Use guided fields' : 'Advanced JSON editor'}
                  </button>
                )}
              </div>

              {showGuided ? (
                <SectionPayloadForm
                  pageKey={form.page_key}
                  sectionKey={form.section_key}
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
                      : 'Selecting a known section loads a starter template.'}
                  </p>
                </>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-primary" disabled={saving || !form.section_key}>
              {saving ? 'Saving…' : 'Save section'}
            </button>
            {form.section_key && (
              <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      )}

      {filtered.length === 0 ? (
        <AdminEmptyState
          title={`No ${pageLabel} yet`}
          message="No sections are saved for this page yet. Choose a section above and save to create it from the starter template."
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {!isScoped && <th>Page</th>}
                <th>Section</th>
                <th>Status</th>
                <th>Order</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id}>
                  {!isScoped && <td>{PAGE_LABELS[row.page_key] ?? row.page_key}</td>}
                  <td>{row.section_key}</td>
                  <td><StatusBadge value={row.status} /></td>
                  <td>{row.sort_order}</td>
                  <td style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {isAdmin && (
                      <>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem' }}
                          onClick={() => startEdit(row)}
                        >
                          Edit
                        </button>
                        {row.status !== 'published' && (
                          <button
                            type="button"
                            className="btn-primary"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => publish(row)}
                          >
                            Publish
                          </button>
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
