import React from 'react';

export default function AdminSectionCard({ title, description, children, actions }) {
  return (
    <section className="admin-section-card">
      <div className="admin-section-card-header">
        <div>
          <h4>{title}</h4>
          {description && <p className="admin-section-card-desc">{description}</p>}
        </div>
        {actions && <div className="admin-section-card-actions">{actions}</div>}
      </div>
      {children}
    </section>
  );
}
