import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { isSupabaseConfigured } from '../../lib/supabase.js';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signIn, session, isStaff } = useAuth();
  const navigate = useNavigate();

  if (session && isStaff) {
    navigate('/admin', { replace: true });
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message ?? 'Sign in failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="admin-shell" style={{ alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <form className="paper-card animate-fade-in" onSubmit={handleSubmit} style={{ maxWidth: 420, width: '100%', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <Lock size={32} color="var(--cane-green)" style={{ marginBottom: '0.5rem' }} />
          <span className="ink-stamp green">Staff Portal</span>
          <h1 style={{ fontSize: '1.75rem', marginTop: '0.5rem' }}>Admin Sign In</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Manage bookings, memberships, and village content.
          </p>
        </div>

        {!isSupabaseConfigured && (
          <p style={{ color: 'var(--tin-rust)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            Supabase is not configured. Set real `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` (from Supabase → Project Settings → API), then restart `npm run dev`.
          </p>
        )}

        {error && (
          <p role="alert" style={{ color: 'var(--tin-rust)', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>
        )}

        <div className="admin-form-field" style={{ marginBottom: '1rem' }}>
          <label className="admin-form-label" htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            className="admin-form-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="admin-form-field" style={{ marginBottom: '1.5rem' }}>
          <label className="admin-form-label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className="admin-form-input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn-primary" disabled={submitting} style={{ width: '100%', justifyContent: 'center' }}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
