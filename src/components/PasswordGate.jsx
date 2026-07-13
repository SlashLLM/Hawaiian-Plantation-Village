import { useState } from 'react';

export default function PasswordGate({ onLogin, isSubmitting, error }) {
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password.trim() || isSubmitting) return;
    await onLogin(password);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <p style={styles.eyebrow}>Private Preview</p>
        <h1 style={styles.title}>Hawaiian Plantation Village</h1>
        <p style={styles.subtitle}>
          Enter the access password to continue to the site.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="site-password" style={styles.label}>
            Password
          </label>
          <input
            id="site-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            disabled={isSubmitting}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={isSubmitting || !password.trim()} style={styles.button}>
            {isSubmitting ? 'Verifying…' : 'Enter Site'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: 'var(--paper-light)',
    backgroundImage:
      'radial-gradient(circle at top, rgba(212, 152, 30, 0.12), transparent 55%), linear-gradient(180deg, var(--paper-light), var(--paper-dark))',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '2.5rem',
    borderRadius: 'var(--border-radius-lg)',
    backgroundColor: 'var(--kraft-tan)',
    border: '1px solid var(--kraft-tan-dark)',
    boxShadow: 'var(--shadow-lg)',
  },
  eyebrow: {
    fontFamily: 'var(--font-typewriter)',
    fontSize: '0.75rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--tin-rust)',
    marginBottom: '0.75rem',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'var(--cane-green)',
    marginBottom: '0.75rem',
  },
  subtitle: {
    fontFamily: 'var(--font-body)',
    color: 'var(--text-muted)',
    marginBottom: '1.75rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  label: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--koa-wood)',
  },
  input: {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--kraft-tan-dark)',
    backgroundColor: 'var(--paper-light)',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    color: 'var(--text-dark)',
  },
  error: {
    fontFamily: 'var(--font-sans)',
    fontSize: '0.875rem',
    color: 'var(--tin-rust)',
    margin: 0,
  },
  button: {
    marginTop: '0.5rem',
    padding: '0.875rem 1rem',
    border: 'none',
    borderRadius: 'var(--border-radius-md)',
    backgroundColor: 'var(--cane-green)',
    color: 'var(--paper-light)',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
