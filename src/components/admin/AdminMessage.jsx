import React from 'react';

export default function AdminMessage({ message, error, onDismiss }) {
  if (!message && !error) return null;
  return (
    <div className="admin-messages" role="status" aria-live="polite">
      {message && (
        <p className="admin-notice admin-notice-success">
          {message}
          {onDismiss && (
            <button type="button" className="admin-notice-dismiss" onClick={onDismiss} aria-label="Dismiss message">
              ×
            </button>
          )}
        </p>
      )}
      {error && (
        <p className="admin-notice admin-notice-error">
          {error}
          {onDismiss && (
            <button type="button" className="admin-notice-dismiss" onClick={onDismiss} aria-label="Dismiss error">
              ×
            </button>
          )}
        </p>
      )}
    </div>
  );
}
