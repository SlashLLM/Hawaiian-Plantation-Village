import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase.js';
import { formatCents, resendConfirmation } from '../../lib/api.js';
import StatusBadge from './StatusBadge.jsx';

export default function BookingsPanel() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from('bookings')
      .select('*, events(title), booking_items(quantity, ticket_types(label))')
      .order('created_at', { ascending: false })
      .limit(100);
    if (!error) setBookings(data ?? []);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) setMessage(error.message);
    else { setMessage('Booking updated'); load(); }
  }

  async function resendEmail(id) {
    try {
      const res = await resendConfirmation({ bookingId: id });
      setMessage(res.ok ? 'Confirmation resent' : (res.error ?? 'Resend failed'));
      load();
    } catch (err) {
      setMessage(err.message);
    }
  }

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    return !q || [
      b.reference_id,
      b.purchaser_email,
      b.purchaser_first_name,
      b.purchaser_last_name,
      b.events?.title,
    ].some((f) => f?.toLowerCase().includes(q));
  });

  return (
    <div>
      <div className="admin-toolbar">
        <input
          className="admin-form-input admin-search"
          placeholder="Search bookings…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" className="btn-secondary" onClick={load}>Refresh</button>
      </div>
      {message && <p style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}>{message}</p>}
      {loading ? <p>Loading bookings…</p> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Guest</th>
                <th>Event</th>
                <th>Visit</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No bookings yet</td></tr>
              ) : filtered.map((b) => (
                <tr key={b.id}>
                  <td><code>{b.reference_id}</code></td>
                  <td>{b.purchaser_first_name} {b.purchaser_last_name}<br /><small>{b.purchaser_email}</small></td>
                  <td>{b.events?.title}</td>
                  <td>{b.visit_date}<br /><small>{b.visit_time}</small></td>
                  <td>{formatCents(b.total_cents)}</td>
                  <td><StatusBadge value={b.status} /></td>
                  <td><StatusBadge value={b.payment_status} /></td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {b.status === 'registered' && (
                      <button type="button" className="btn-secondary" style={{ marginRight: 6, fontSize: '0.75rem', padding: '4px 8px' }} onClick={() => updateStatus(b.id, 'checked_in')}>Check in</button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button type="button" className="btn-secondary" style={{ marginRight: 6, fontSize: '0.75rem', padding: '4px 8px' }} onClick={() => updateStatus(b.id, 'cancelled')}>Cancel</button>
                    )}
                    <button type="button" className="btn-accent" style={{ fontSize: '0.75rem', padding: '4px 8px' }} onClick={() => resendEmail(b.id)}>Resend email</button>
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
