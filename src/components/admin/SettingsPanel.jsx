import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase.js';
import { useAuth } from '../../hooks/useAuth.js';
import { DEFAULT_SITE_SETTINGS } from '../../lib/content/fallbacks.js';
import { saveSiteSettings } from '../../lib/content/cmsAdminApi.js';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminMessage from './AdminMessage.jsx';

function Field({ label, children }) {
  return (
    <div className="admin-form-field">
      <label className="admin-form-label">{label}</label>
      {children}
    </div>
  );
}

export default function SettingsPanel() {
  const { isAdmin, isStaff } = useAuth();
  const [payload, setPayload] = useState(DEFAULT_SITE_SETTINGS);
  const [advanced, setAdvanced] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { data, error: err } = await supabase.from('site_settings').select('payload').eq('id', 'default').maybeSingle();
        if (err) setError(err.message);
        else if (data?.payload) setPayload(data.payload);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function update(path, value) {
    setPayload((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let cursor = next;
      for (let i = 0; i < keys.length - 1; i += 1) {
        if (!cursor[keys[i]]) cursor[keys[i]] = {};
        cursor = cursor[keys[i]];
      }
      cursor[keys[keys.length - 1]] = value;
      return next;
    });
  }

  async function save(e) {
    e.preventDefault();
    if (!isAdmin) return;
    setSaving(true);
    setError('');
    try {
      await saveSiteSettings(payload);
      setMessage('Settings saved');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Loading settings…</p>;

  const brand = payload.brand ?? {};
  const contact = payload.contact ?? {};
  const address = contact.address ?? {};
  const hours = payload.hours ?? {};
  const hero = payload.hero ?? {};
  const seo = payload.seo ?? {};

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Global brand, navigation, footer, contact, hours, hero, SEO, and donation presets.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      {isAdmin ? (
        <form className="paper-card" onSubmit={save} style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h4 style={{ margin: 0 }}>Site settings</h4>
            <button type="button" className="btn-secondary" onClick={() => setAdvanced((v) => !v)}>
              {advanced ? 'Use guided fields' : 'Advanced JSON editor'}
            </button>
          </div>

          {advanced ? (
            <textarea
              className="admin-form-textarea"
              rows={24}
              value={JSON.stringify(payload, null, 2)}
              onChange={(e) => {
                try { setPayload(JSON.parse(e.target.value)); setError(''); } catch { setError('Invalid JSON'); }
              }}
            />
          ) : (
            <>
              <h5>Brand</h5>
              <div className="admin-form-grid">
                <Field label="Site title"><input className="admin-form-input" value={brand.title ?? ''} onChange={(e) => update('brand.title', e.target.value)} /></Field>
                <Field label="Subtitle"><input className="admin-form-input" value={brand.subtitle ?? ''} onChange={(e) => update('brand.subtitle', e.target.value)} /></Field>
                <Field label="Tagline"><textarea className="admin-form-textarea" value={brand.tagline ?? ''} onChange={(e) => update('brand.tagline', e.target.value)} /></Field>
                <Field label="Est. badge"><input className="admin-form-input" value={brand.estBadge ?? ''} onChange={(e) => update('brand.estBadge', e.target.value)} /></Field>
              </div>

              <h5 style={{ marginTop: '1.5rem' }}>Contact</h5>
              <div className="admin-form-grid">
                <Field label="Phone"><input className="admin-form-input" value={contact.phone ?? ''} onChange={(e) => update('contact.phone', e.target.value)} /></Field>
                <Field label="Email"><input className="admin-form-input" value={contact.email ?? ''} onChange={(e) => update('contact.email', e.target.value)} /></Field>
                <Field label="Address line 1"><input className="admin-form-input" value={address.line1 ?? ''} onChange={(e) => update('contact.address.line1', e.target.value)} /></Field>
                <Field label="Address line 2"><input className="admin-form-input" value={address.line2 ?? ''} onChange={(e) => update('contact.address.line2', e.target.value)} /></Field>
              </div>

              <h5 style={{ marginTop: '1.5rem' }}>Hours</h5>
              <div className="admin-form-grid">
                <Field label="Schedule"><input className="admin-form-input" value={hours.schedule ?? ''} onChange={(e) => update('hours.schedule', e.target.value)} /></Field>
                <Field label="Tours note"><input className="admin-form-input" value={hours.toursNote ?? ''} onChange={(e) => update('hours.toursNote', e.target.value)} /></Field>
                <Field label="Closed note"><input className="admin-form-input" value={hours.closedNote ?? ''} onChange={(e) => update('hours.closedNote', e.target.value)} /></Field>
              </div>

              <h5 style={{ marginTop: '1.5rem' }}>Hero</h5>
              <div className="admin-form-grid">
                <Field label="Badge"><input className="admin-form-input" value={hero.badge ?? ''} onChange={(e) => update('hero.badge', e.target.value)} /></Field>
                <Field label="Title"><input className="admin-form-input" value={hero.title ?? ''} onChange={(e) => update('hero.title', e.target.value)} /></Field>
                <Field label="Subtitle"><textarea className="admin-form-textarea" value={hero.subtitle ?? ''} onChange={(e) => update('hero.subtitle', e.target.value)} /></Field>
                <Field label="CTA label"><input className="admin-form-input" value={hero.ctaLabel ?? ''} onChange={(e) => update('hero.ctaLabel', e.target.value)} /></Field>
                <Field label="Video source"><input className="admin-form-input" value={hero.videoSrc ?? ''} onChange={(e) => update('hero.videoSrc', e.target.value)} /></Field>
              </div>

              <h5 style={{ marginTop: '1.5rem' }}>SEO</h5>
              <div className="admin-form-grid">
                <Field label="Page title"><input className="admin-form-input" value={seo.title ?? ''} onChange={(e) => update('seo.title', e.target.value)} /></Field>
                <Field label="Description"><textarea className="admin-form-textarea" value={seo.description ?? ''} onChange={(e) => update('seo.description', e.target.value)} /></Field>
              </div>
            </>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={saving}>
            {saving ? 'Saving…' : 'Save settings'}
          </button>
        </form>
      ) : (
        <pre className="paper-card" style={{ padding: '1rem', overflow: 'auto' }}>{JSON.stringify(payload, null, 2)}</pre>
      )}
    </div>
  );
}
