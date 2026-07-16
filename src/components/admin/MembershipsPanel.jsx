import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase.js';
import { formatCents, resendConfirmation } from '../../lib/api.js';
import StatusBadge from './StatusBadge.jsx';

export default function MembershipsPanel() {
  const [memberships, setMemberships] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('memberships')
      .select('*, membership_tiers(level)')
      .order('created_at', { ascending: false })
      .limit(100);
    if (!error) setMemberships(data ?? []);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase.from('memberships').update({ status }).eq('id', id);
    if (error) setMessage(error.message);
    else { setMessage('Membership updated'); load(); }
  }

  async function resendEmail(id) {
    try {
      const res = await resendConfirmation({ membershipId: id });
      setMessage(res.ok ? 'Confirmation resent' : (res.error ?? 'Resend failed'));
    } catch (err) {
      setMessage(err.message);
    }
  }

  const filtered = memberships.filter((m) => {
    const q = search.toLowerCase();
    return !q || [
      m.reference_id,
      m.member_email,
      m.member_first_name,
      m.member_last_name,
      m.membership_tiers?.level,
    ].some((f) => f?.toLowerCase().includes(q));
  });

  return (
    <div>
      <div className="admin-toolbar">
        <input className="admin-form-input admin-search" placeholder="Search memberships…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="button" className="btn-secondary" onClick={load}>Refresh</button>
      </div>
      {message && <p style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>{message}</p>}
      {loading ? <p>Loading memberships…</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Member</th>
                <th>Tier</th>
                <th>Valid</th>
                <th>Price</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No memberships yet</td></tr>
              ) : filtered.map((m) => (
                <tr key={m.id}>
                  <td><code>{m.reference_id}</code></td>
                  <td>{m.member_first_name} {m.member_last_name}<br /><small>{m.member_email}</small></td>
                  <td>{m.membership_tiers?.level}</td>
                  <td>{m.starts_on} → {m.ends_on}</td>
                  <td>{formatCents(m.price_cents)}</td>
                  <td><StatusBadge value={m.status} /></td>
                  <td><StatusBadge value={m.payment_status} /></td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {m.status === 'active' && (
                      <button type="button" className="btn-secondary" style={{ marginRight: 6, fontSize: '0.75rem', padding: '4px 8px' }} onClick={() => updateStatus(m.id, 'revoked')}>Revoke</button>
                    )}
                    <button type="button" className="btn-accent" style={{ fontSize: '0.75rem', padding: '4px 8px' }} onClick={() => resendEmail(m.id)}>Resend email</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
