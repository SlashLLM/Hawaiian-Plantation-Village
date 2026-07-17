import React from 'react';

export default function AdminToolbar({ children, title }) {
  return (
    <div className="admin-toolbar">
      {title && <h4 className="admin-toolbar-title">{title}</h4>}
      <div className="admin-toolbar-actions">{children}</div>
    </div>
  );
}
