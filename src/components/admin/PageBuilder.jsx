import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { isValidSlug, normalizeSlug } from '../../lib/content/validators.js';
import { saveCustomPage } from '../../lib/content/cmsAdminApi.js';
import { fetchPublishedCustomPages } from '../../lib/content/cmsApi.js';
import { BLOCK_TYPE_KEYS, blockTypeLabel, createBlock } from '../../lib/content/pageBlocks.js';
import { customPagePath } from '../../lib/content/links.js';
import BlockRenderer from '../pageBlocks/BlockRenderer.jsx';
import BlockFields from './BlockFields.jsx';
import LabelledField from './LabelledField.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import MediaUploadField from './MediaUploadField.jsx';
import StatusBadge from './StatusBadge.jsx';

function blankPage(seed = {}) {
  return {
    slug: seed.slug ?? '',
    title: seed.title ?? '',
    status: 'draft',
    seo: { description: '', image: '' },
    blocks: [],
  };
}

/**
 * Visual editor for one CMS-built page: an ordered block list on the left, the
 * real published renderer on the right.
 *
 * @param {{ page?: object|null, seed?: object, onDone: () => void }} props
 */
export default function PageBuilder({ page, seed, onDone }) {
  const { isAdmin, isStaff } = useAuth();
  const [form, setForm] = useState(() =>
    page
      ? {
          slug: page.slug ?? '',
          title: page.title ?? '',
          status: page.status ?? 'draft',
          seo: page.seo ?? { description: '', image: '' },
          blocks: Array.isArray(page.blocks) ? page.blocks : [],
        }
      : blankPage(seed),
  );
  const [selectedId, setSelectedId] = useState(null);
  const [addType, setAddType] = useState(BLOCK_TYPE_KEYS[0]);
  const [customPages, setCustomPages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const editingId = page?.id ?? null;

  useEffect(() => {
    let cancelled = false;
    fetchPublishedCustomPages()
      .then((pages) => { if (!cancelled) setCustomPages(pages); })
      .catch(() => { if (!cancelled) setCustomPages([]); });
    return () => { cancelled = true; };
  }, []);

  const blocks = form.blocks;

  function setBlocks(next) {
    setForm((prev) => ({ ...prev, blocks: next }));
  }

  function addBlock() {
    const block = createBlock(addType);
    if (!block) return;
    setBlocks([...blocks, block]);
    setSelectedId(block.id);
  }

  function updateBlock(id, patch) {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }

  function moveBlock(index, delta) {
    const target = index + delta;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    setBlocks(next);
  }

  function removeBlock(id) {
    setBlocks(blocks.filter((b) => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  async function save(status) {
    if (!isAdmin) return;
    const title = form.title.trim();
    if (!title) {
      setError('Give the page a title.');
      return;
    }
    // Slug is derived on create and frozen on edit, so published URLs stay put.
    const slug = editingId && form.slug ? form.slug : (normalizeSlug(form.slug || title) || '');
    if (!isValidSlug(slug)) {
      setError('Could not build a valid web address from the title. Add letters or numbers.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      await saveCustomPage(
        {
          slug,
          title,
          status: status ?? form.status,
          seo: form.seo,
          blocks: form.blocks,
        },
        editingId,
      );
      setMessage(status === 'published' ? 'Page published' : 'Page saved');
      onDone?.();
    } catch (err) {
      setError(
        err.message?.includes('duplicate') || err.message?.includes('unique')
          ? 'Another page already uses that web address. Change the title.'
          : err.message,
      );
    } finally {
      setSaving(false);
    }
  }

  const previewSlug = form.slug || normalizeSlug(form.title);
  const selected = blocks.find((b) => b.id === selectedId) ?? null;

  return (
    <div>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <div style={styles.headerBar}>
        <button type="button" className="btn-secondary" onClick={onDone}>← Back to pages</button>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <StatusBadge value={form.status} />
          {editingId && previewSlug && (
            <a
              className="btn-secondary"
              href={customPagePath(previewSlug)}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <ExternalLink size={14} /> Preview full page
            </a>
          )}
        </span>
      </div>

      <div className="paper-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
        <div className="admin-form-grid">
          <LabelledField id="page-title" label="Page title" full>
            <input
              id="page-title"
              className="admin-form-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              disabled={!isAdmin}
            />
          </LabelledField>
          <LabelledField
            id="page-address"
            label="Web address"
            hint={editingId ? 'Fixed once the page is created.' : 'Built from the title.'}
          >
            <input
              id="page-address"
              className="admin-form-input"
              value={customPagePath(previewSlug || 'your-page')}
              readOnly
              aria-readonly="true"
            />
          </LabelledField>
          <LabelledField
            id="page-description"
            label="Search description"
            full
            hint="Shown in search results and when the page is shared."
          >
            <textarea
              id="page-description"
              className="admin-form-textarea"
              rows={2}
              value={form.seo?.description ?? ''}
              onChange={(e) => setForm({ ...form, seo: { ...form.seo, description: e.target.value } })}
              disabled={!isAdmin}
            />
          </LabelledField>
          <MediaUploadField
            label="Share image"
            value={form.seo?.image ? { url: form.seo.image, alt: form.title || 'Share image' } : null}
            onChange={(media) => setForm({ ...form, seo: { ...form.seo, image: media?.url ?? '' } })}
          />
        </div>
      </div>

      <div style={styles.builderGrid}>
        {/* Blocks */}
        <div>
          <h4 style={{ marginTop: 0 }}>Blocks</h4>
          {blocks.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              No blocks yet. Add one below to start building the page.
            </p>
          ) : (
            blocks.map((block, index) => (
              <div key={block.id} className="paper-card" style={styles.blockCard}>
                <div style={styles.blockCardHead}>
                  <button
                    type="button"
                    style={styles.blockName}
                    onClick={() => setSelectedId(selectedId === block.id ? null : block.id)}
                    aria-expanded={selectedId === block.id}
                  >
                    <strong>{index + 1}. {blockTypeLabel(block.type)}</strong>
                    <span style={styles.blockSummary}>{block.title || block.stamp || block.quote || ''}</span>
                  </button>
                  {isAdmin && (
                    <span style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={styles.iconBtn}
                        disabled={index === 0}
                        onClick={() => moveBlock(index, -1)}
                        aria-label={`Move ${blockTypeLabel(block.type)} up`}
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        style={styles.iconBtn}
                        disabled={index === blocks.length - 1}
                        onClick={() => moveBlock(index, 1)}
                        aria-label={`Move ${blockTypeLabel(block.type)} down`}
                      >
                        <ChevronDown size={14} />
                      </button>
                      <AdminConfirmButton
                        style={styles.iconBtn}
                        confirmMessage="Remove this block from the page?"
                        onConfirm={() => removeBlock(block.id)}
                        label={`Remove ${blockTypeLabel(block.type)}`}
                      >
                        <Trash2 size={14} />
                      </AdminConfirmButton>
                    </span>
                  )}
                </div>
                {selected?.id === block.id && isAdmin && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <BlockFields
                      block={block}
                      customPages={customPages}
                      onChange={(patch) => updateBlock(block.id, patch)}
                    />
                  </div>
                )}
              </div>
            ))
          )}

          {isAdmin && (
            <div style={styles.addRow}>
              <select
                className="admin-form-select"
                value={addType}
                onChange={(e) => setAddType(e.target.value)}
                aria-label="Block type"
              >
                {BLOCK_TYPE_KEYS.map((type) => (
                  <option key={type} value={type}>{blockTypeLabel(type)}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn-primary"
                onClick={addBlock}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Plus size={14} /> Add block
              </button>
            </div>
          )}

          {isAdmin && (
            <div style={styles.saveRow}>
              <button type="button" className="btn-primary" disabled={saving} onClick={() => save()}>
                {saving ? 'Saving…' : 'Save'}
              </button>
              {form.status !== 'published' && (
                <button type="button" className="btn-secondary" disabled={saving} onClick={() => save('published')}>
                  Save &amp; publish
                </button>
              )}
              {form.status === 'published' && (
                <button type="button" className="btn-secondary" disabled={saving} onClick={() => save('draft')}>
                  Unpublish
                </button>
              )}
            </div>
          )}
        </div>

        {/* Live preview — the same renderer the public page uses */}
        <div>
          <h4 style={{ marginTop: 0 }}>Live preview</h4>
          <div className="page-preview" style={styles.previewFrame} data-testid="page-preview">
            {blocks.length === 0 ? (
              <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                Your page will appear here as you add blocks.
              </p>
            ) : (
              <BlockRenderer blocks={blocks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  headerBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  builderGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
    gap: '1.5rem',
    alignItems: 'start',
  },
  blockCard: {
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
  },
  blockCardHead: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  blockName: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.15rem',
    background: 'none',
    border: 'none',
    padding: 0,
    textAlign: 'left',
    cursor: 'pointer',
    color: 'inherit',
    font: 'inherit',
  },
  blockSummary: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
  iconBtn: {
    fontSize: '0.75rem',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.3rem 0.5rem',
  },
  addRow: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  saveRow: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--hairline)',
  },
  previewFrame: {
    border: '1px solid var(--hairline)',
    borderRadius: 'var(--border-radius-md)',
    overflow: 'auto',
    maxHeight: '75vh',
    background: 'var(--sugarcane-cream)',
  },
};
