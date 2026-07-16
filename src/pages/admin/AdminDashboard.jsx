import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard, Ticket, Users, Scan, Mail, FileText, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { supabase } from '../../lib/supabase.js';
import BookingsPanel from '../../components/admin/BookingsPanel.jsx';
import MembershipsPanel from '../../components/admin/MembershipsPanel.jsx';
import CmsAdminPanel from '../../components/admin/CmsAdminPanel.jsx';
import QRScanner from '../../components/admin/QRScanner.jsx';
import StatusBadge from '../../components/admin/StatusBadge.jsx';

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: Ticket },
  { id: 'memberships', label: 'Memberships', icon: Users },
  { id: 'scanner', label: 'QR Scanner', icon: Scan },
  { id: 'emails', label: 'Email Log', icon: Mail },
  { id: 'content', label: 'Content', icon: FileText },
];

export default function AdminDashboard() {
  const [section, setSection] = useState('overview');
  const [stats, setStats] = useState({ bookings: 0, memberships: 0, pendingPay: 0, emailsFailed: 0 });
  const [emails, setEmails] = useState([]);
  const [scans, setScans] = useState([]);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { loadOverview(); }, [section]);

  async function loadOverview() {
    const [b, m, e, s] = await Promise.all([
      supabase.from('bookings').select('id', { count: 'exact', head: true }),
      supabase.from('memberships').select('id', { count: 'exact', head: true }),
      supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('payment_status', 'pending'),
      supabase.from('email_deliveries').select('id', { count: 'exact', head: true }).eq('status', 'failed'),
    ]);
    setStats({
      bookings: b.count ?? 0,
      memberships: m.count ?? 0,
      pendingPay: e.count ?? 0,
      emailsFailed: s.count ?? 0,
    });

    if (section === 'emails') {
      const { data } = await supabase.from('email_deliveries').select('*').order('created_at', { ascending: false }).limit(50);
      setEmails(data ?? []);
    }
    if (section === 'overview') {
      const { data } = await supabase.from('scan_logs').select('*').order('created_at', { ascending: false }).limit(10);
      setScans(data ?? []);
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div>
          <span className="ink-stamp green">Operations CMS</span>
          <div style={{ fontFamily: 'var(--font-typewriter)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {profile?.full_name || profile?.email} · {profile?.role}
          </div>
        </div>
        <button type="button" className="btn-secondary" onClick={handleSignOut}>
          <LogOut size={16} /> Sign out
        </button>
      </header>

      <div className="admin-layout">
        <nav className="admin-sidebar paper-card" style={{ padding: '1rem' }} aria-label="Admin sections">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`admin-nav-btn ${section === id ? 'active' : ''}`}
              onClick={() => setSection(id)}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <main className="admin-panel">
          {section === 'overview' && (
            <>
              <h2 style={{ marginBottom: '1rem' }}>Dashboard</h2>
              <div className="admin-stat-grid">
                <div className="admin-stat-card"><div className="admin-stat-label">Bookings</div><div className="admin-stat-value">{stats.bookings}</div></div>
                <div className="admin-stat-card"><div className="admin-stat-label">Memberships</div><div className="admin-stat-value">{stats.memberships}</div></div>
                <div className="admin-stat-card"><div className="admin-stat-label">Pending payment</div><div className="admin-stat-value">{stats.pendingPay}</div></div>
                <div className="admin-stat-card"><div className="admin-stat-label">Failed emails</div><div className="admin-stat-value">{stats.emailsFailed}</div></div>
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>Recent scans</h3>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Result</th><th>Reference</th><th>Time</th></tr></thead>
                  <tbody>
                    {scans.length === 0 ? (
                      <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No scans yet</td></tr>
                    ) : scans.map((s) => (
                      <tr key={s.id}>
                        <td><StatusBadge value={s.scan_result} /></td>
                        <td>{s.reference_id ?? '—'}</td>
                        <td>{new Date(s.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {section === 'bookings' && <><h2 style={{ marginBottom: '1rem' }}>Bookings</h2><BookingsPanel /></>}
          {section === 'memberships' && <><h2 style={{ marginBottom: '1rem' }}>Memberships</h2><MembershipsPanel /></>}
          {section === 'scanner' && <><h2 style={{ marginBottom: '1rem' }}>QR Verification</h2><QRScanner /></>}
          {section === 'emails' && (
            <>
              <h2 style={{ marginBottom: '1rem' }}>Email deliveries</h2>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Recipient</th><th>Subject</th><th>Status</th><th>Sent</th></tr></thead>
                  <tbody>
                    {emails.map((em) => (
                      <tr key={em.id}>
                        <td>{em.recipient_email}</td>
                        <td>{em.subject}</td>
                        <td><StatusBadge value={em.status} /></td>
                        <td>{new Date(em.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {section === 'content' && <CmsAdminPanel />}
        </main>
      </div>
    </div>
  );
}
