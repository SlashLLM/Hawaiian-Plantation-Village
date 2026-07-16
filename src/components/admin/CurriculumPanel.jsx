import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { isValidSlug } from '../../lib/content/validators.js';
import {
  fetchCurriculumModulesAdmin,
  fetchCurriculumCheckpoints,
  saveCurriculumModule,
  setCurriculumModuleActive,
  saveCurriculumCheckpoint,
} from '../../lib/content/cmsAdminApi.js';
import StatusBadge from './StatusBadge.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminEmptyState from './AdminEmptyState.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminToolbar from './AdminToolbar.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';

const LOCKED_GAME_IDS = ['bell-to-bell', 'bango-match', 'camp-map', 'pidgin-bridge'];

const EMPTY_MODULE = { slug: '', title: '', grades: '', sort_order: 0, is_active: true };
const EMPTY_CHECKPOINT = {
  slug: '', label: '', video_url: '', body_text: '', sort_order: 0,
  challenge: { type: 'quiz', question: '', choices: [], correctIndex: 0, feedback: { correct: '', incorrect: '' } },
};

export default function CurriculumPanel() {
  const { isAdmin, isStaff } = useAuth();
  const [modules, setModules] = useState([]);
  const [selected, setSelected] = useState(null);
  const [checkpoints, setCheckpoints] = useState([]);
  const [moduleForm, setModuleForm] = useState(EMPTY_MODULE);
  const [editingModuleId, setEditingModuleId] = useState(null);
  const [checkpointForm, setCheckpointForm] = useState(EMPTY_CHECKPOINT);
  const [editingCheckpointId, setEditingCheckpointId] = useState(null);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showCheckpointForm, setShowCheckpointForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadModules = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCurriculumModulesAdmin();
      setModules(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadModules(); }, [loadModules]);

  async function selectModule(mod) {
    setSelected(mod);
    setModuleForm({
      slug: mod.slug,
      title: mod.title,
      grades: mod.grades,
      sort_order: mod.sort_order ?? 0,
      is_active: mod.is_active ?? true,
    });
    setEditingModuleId(mod.id);
    try {
      const data = await fetchCurriculumCheckpoints(mod.id);
      setCheckpoints(data);
    } catch (err) {
      setError(err.message);
    }
  }

  function resetModuleForm() {
    setEditingModuleId(null);
    setModuleForm(EMPTY_MODULE);
    setShowModuleForm(false);
  }

  function resetCheckpointForm() {
    setEditingCheckpointId(null);
    setCheckpointForm({ ...EMPTY_CHECKPOINT, sort_order: checkpoints.length + 1 });
    setShowCheckpointForm(false);
  }

  async function runSave(action, successMsg) {
    if (!isAdmin) return;
    setSaving(true);
    setError('');
    try {
      await action();
      setMessage(successMsg);
      await loadModules();
      if (selected) {
        const updated = (await fetchCurriculumModulesAdmin()).find((m) => m.id === selected.id);
        if (updated) await selectModule(updated);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveModule(e) {
    e.preventDefault();
    if (!isValidSlug(moduleForm.slug)) {
      setError('Module slug must be lowercase letters, numbers, and hyphens only');
      return;
    }
    await runSave(
      () => saveCurriculumModule(moduleForm, editingModuleId),
      editingModuleId ? 'Module updated' : 'Module created',
    );
    if (!editingModuleId) resetModuleForm();
  }

  function startEditCheckpoint(cp) {
    setEditingCheckpointId(cp.id);
    setCheckpointForm({
      slug: cp.slug,
      label: cp.label,
      video_url: cp.video_url ?? '',
      body_text: cp.body_text ?? '',
      sort_order: cp.sort_order ?? 0,
      challenge: cp.challenge ?? EMPTY_CHECKPOINT.challenge,
      module_id: cp.module_id,
    });
    setShowCheckpointForm(true);
  }

  async function handleSaveCheckpoint(e) {
    e.preventDefault();
    if (!selected) return;
    if (!isValidSlug(checkpointForm.slug)) {
      setError('Checkpoint slug must be lowercase letters, numbers, and hyphens only');
      return;
    }
    const gameId = checkpointForm.challenge?.gameId;
    if (gameId && !LOCKED_GAME_IDS.includes(gameId) && checkpointForm.challenge?.type === 'game') {
      setError(`Game ID must be one of: ${LOCKED_GAME_IDS.join(', ')}`);
      return;
    }
    const record = { ...checkpointForm, module_id: selected.id };
    await runSave(
      () => saveCurriculumCheckpoint(record, editingCheckpointId),
      editingCheckpointId ? 'Checkpoint updated' : 'Checkpoint created',
    );
    resetCheckpointForm();
  }

  if (loading) return <p>Loading curriculum…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Curriculum modules and checkpoints. Game IDs are locked to implemented React/Pixi games.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      <AdminToolbar>
        {isAdmin && (
          <button type="button" className="btn-primary" onClick={() => { resetModuleForm(); setShowModuleForm(true); setSelected(null); }}>
            Add module
          </button>
        )}
      </AdminToolbar>

      <div className="admin-curriculum-layout">
        <div className="admin-curriculum-sidebar">
          {modules.length === 0 ? (
            <AdminEmptyState title="No modules yet" message="Add a curriculum module to get started." />
          ) : (
            modules.map((m) => (
              <button key={m.id} type="button" className={`admin-nav-btn ${selected?.id === m.id ? 'active' : ''}`} onClick={() => selectModule(m)}>
                {m.title}
                <span style={{ display: 'block', fontSize: '0.75rem', opacity: 0.7 }}>{m.grades}</span>
              </button>
            ))
          )}
        </div>

        <div className="admin-curriculum-detail">
          {!selected && !showModuleForm && (
            <AdminEmptyState
              title="Select a module"
              message="Choose a module from the sidebar or add a new one."
              action={isAdmin && <button type="button" className="btn-primary" onClick={() => { resetModuleForm(); setShowModuleForm(true); }}>Add module</button>}
            />
          )}

          {isAdmin && showModuleForm && (
            <form className="paper-card admin-inline-form" onSubmit={handleSaveModule}>
              <h5>{editingModuleId ? 'Edit module' : 'New module'}</h5>
              <div className="admin-form-grid">
                <div className="admin-form-field"><label className="admin-form-label">Slug</label><input className="admin-form-input" required value={moduleForm.slug} onChange={(e) => setModuleForm({ ...moduleForm, slug: e.target.value })} disabled={!!editingModuleId} /></div>
                <div className="admin-form-field"><label className="admin-form-label">Title</label><input className="admin-form-input" required value={moduleForm.title} onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })} /></div>
                <div className="admin-form-field"><label className="admin-form-label">Grades</label><input className="admin-form-input" required value={moduleForm.grades} onChange={(e) => setModuleForm({ ...moduleForm, grades: e.target.value })} /></div>
                <div className="admin-form-field"><label className="admin-form-label">Sort order</label><input type="number" className="admin-form-input" value={moduleForm.sort_order} onChange={(e) => setModuleForm({ ...moduleForm, sort_order: Number(e.target.value) })} /></div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save module'}</button>
                <button type="button" className="btn-secondary" onClick={resetModuleForm}>Cancel</button>
              </div>
            </form>
          )}

          {selected && (
            <div className="paper-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <h4>{selected.title}</h4>
                  <p style={{ color: 'var(--text-muted)' }}>{selected.grades} · {selected.slug}</p>
                  <StatusBadge value={selected.is_active ? 'published' : 'archived'} />
                </div>
                {isAdmin && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => { setShowModuleForm(true); }}>Edit module</button>
                    <AdminConfirmButton
                      style={{ fontSize: '0.75rem' }}
                      confirmMessage={selected.is_active ? 'Archive this module?' : 'Reactivate this module?'}
                      onConfirm={() => runSave(() => setCurriculumModuleActive(selected.id, !selected.is_active), 'Module updated')}
                    >
                      {selected.is_active ? 'Archive' : 'Activate'}
                    </AdminConfirmButton>
                    <button type="button" className="btn-primary" style={{ fontSize: '0.75rem' }} onClick={() => { resetCheckpointForm(); setShowCheckpointForm(true); }}>Add checkpoint</button>
                  </div>
                )}
              </div>

              <h5 style={{ marginTop: '1.5rem' }}>Checkpoints</h5>
              {checkpoints.length === 0 ? (
                <AdminEmptyState title="No checkpoints" message="Add checkpoints for lessons, videos, and quizzes." />
              ) : (
                checkpoints.map((cp) => (
                  <div key={cp.id} className="admin-checkpoint-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <strong>{cp.label}</strong>
                      {isAdmin && (
                        <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => startEditCheckpoint(cp)}>Edit</button>
                      )}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cp.slug} · order {cp.sort_order}</p>
                    {cp.body_text && <p style={{ marginTop: '0.5rem' }}>{cp.body_text.slice(0, 120)}{cp.body_text.length > 120 ? '…' : ''}</p>}
                  </div>
                ))
              )}

              {isAdmin && showCheckpointForm && (
                <form className="admin-inline-form" style={{ marginTop: '1rem' }} onSubmit={handleSaveCheckpoint}>
                  <h5>{editingCheckpointId ? 'Edit checkpoint' : 'New checkpoint'}</h5>
                  <div className="admin-form-grid">
                    <div className="admin-form-field"><label className="admin-form-label">Slug</label><input className="admin-form-input" required value={checkpointForm.slug} onChange={(e) => setCheckpointForm({ ...checkpointForm, slug: e.target.value })} disabled={!!editingCheckpointId} /></div>
                    <div className="admin-form-field"><label className="admin-form-label">Label</label><input className="admin-form-input" required value={checkpointForm.label} onChange={(e) => setCheckpointForm({ ...checkpointForm, label: e.target.value })} /></div>
                    <div className="admin-form-field"><label className="admin-form-label">Sort order</label><input type="number" className="admin-form-input" value={checkpointForm.sort_order} onChange={(e) => setCheckpointForm({ ...checkpointForm, sort_order: Number(e.target.value) })} /></div>
                    <div className="admin-form-field full"><label className="admin-form-label">Video URL</label><input className="admin-form-input" value={checkpointForm.video_url} onChange={(e) => setCheckpointForm({ ...checkpointForm, video_url: e.target.value })} /></div>
                    <div className="admin-form-field full"><label className="admin-form-label">Body text</label><textarea className="admin-form-textarea" rows={4} value={checkpointForm.body_text} onChange={(e) => setCheckpointForm({ ...checkpointForm, body_text: e.target.value })} /></div>
                    <div className="admin-form-field full">
                      <label className="admin-form-label">Challenge (JSON)</label>
                      <textarea
                        className="admin-form-textarea"
                        rows={6}
                        value={JSON.stringify(checkpointForm.challenge, null, 2)}
                        onChange={(e) => {
                          try { setCheckpointForm({ ...checkpointForm, challenge: JSON.parse(e.target.value || '{}') }); setError(''); } catch { setError('Challenge must be valid JSON'); }
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save checkpoint'}</button>
                    <button type="button" className="btn-secondary" onClick={resetCheckpointForm}>Cancel</button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
