import React from 'react';

export default function AdminEmptyState({ title, message, action }) {
  return (
    <div className="admin-empty-state" role="status">
      <p className="admin-empty-title">{title}</p>
      {message && <p className="admin-empty-message">{message}</p>}
      {action && <div className="admin-empty-action">{action}</div>}
    </div>
  );
}
