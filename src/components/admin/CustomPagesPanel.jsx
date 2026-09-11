import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import {
  deleteCustomPage,
  fetchCustomPages,
  setCustomPageStatus,
} from '../../lib/content/cmsAdminApi.js';
import { customPagePath } from '../../lib/content/links.js';
import PageBuilder from './PageBuilder.jsx';
import StatusBadge from './StatusBadge.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminEmptyState from './AdminEmptyState.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminToolbar from './AdminToolbar.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';

/**
 * Lists CMS-built pages and hands off to the visual builder.
 *
 * @param {{ seed?: { title?: string, slug?: string }, onSeedConsumed?: () => void }} props
 * `seed` pre-fills a new page — used by the "Build a page for this event"
 * shortcut in the Upcoming Events panel.
 */
export default function CustomPagesPanel({ seed, onSeedConsumed }) {
  const { isAdmin, isStaff } = useAuth();
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null); // { page } | { seed } | null
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setRows(await fetchCustomPages());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Arriving from the events panel opens a new page pre-filled with its title.
  useEffect(() => {
    if (!seed) return;
    setEditing({ seed });
    onSeedConsumed?.();
  }, [seed, onSeedConsumed]);

  async function toggleStatus(row) {
    if (!isAdmin) return;
    setError('');
    try {
      const next = row.status === 'published' ? 'draft' : 'published';
      await setCustomPageStatus(row.id, next);
      setMessage(next === 'published' ? 'Page published' : 'Page unpublished');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(row) {
    if (!isAdmin) return;
    setError('');
    try {
      await deleteCustomPage(row.id);
      setMessage('Page deleted');
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (editing) {
    return (
      <PageBuilder
        page={editing.page ?? null}
        seed={editing.seed}
        onDone={() => { setEditing(null); load(); }}
      />
    );
  }

  if (loading) return <p>Loading pages…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Build a page for an event, then point that event’s “Learn more” button at it.
        Pages are published at {customPagePath('page-name')}.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <AdminToolbar>
        {isAdmin && (
          <button type="button" className="btn-primary" onClick={() => setEditing({ seed: undefined })}>
            New page
          </button>
        )}
      </AdminToolbar>

      {rows.length === 0 ? (
        <AdminEmptyState
          title="No pages yet"
          message={isAdmin ? 'Create a page and compose it from blocks.' : 'No pages have been built.'}
          action={isAdmin && (
            <button type="button" className="btn-primary" onClick={() => setEditing({ seed: undefined })}>
              New page
            </button>
          )}
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Address</th>
                <th>Blocks</th>
                <th>Status</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.title}</td>
                  <td>
                    <a href={customPagePath(row.slug)} target="_blank" rel="noopener noreferrer">
                      {customPagePath(row.slug)}
                    </a>
                  </td>
                  <td>{Array.isArray(row.blocks) ? row.blocks.length : 0}</td>
                  <td><StatusBadge value={row.status} /></td>
                  <td>{row.updated_at ? new Date(row.updated_at).toLocaleDateString() : '—'}</td>
                  <td style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {isAdmin && (
                      <>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem' }}
                          onClick={() => setEditing({ page: row })}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem' }}
                          onClick={() => toggleStatus(row)}
                        >
                          {row.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <AdminConfirmButton
                          style={{ fontSize: '0.75rem' }}
                          confirmMessage="Permanently delete this page? Any event linking to it will lose its button."
                          onConfirm={() => remove(row)}
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
