import React from 'react';

export default function AdminReadOnlyNotice({ isAdmin, isStaff }) {
  if (isAdmin || !isStaff) return null;
  return (
    <p className="admin-notice admin-notice-info" role="status">
      Read-only access. Contact an administrator to add or edit content.
    </p>
  );
}
