import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { formatCents } from '../../lib/api.js';
import {
  fetchCatalogData,
  saveEvent,
  setEventActive,
  saveTicketType,
  setTicketTypeActive,
  saveMembershipTier,
  setMembershipTierActive,
  saveGroupTicketType,
  setGroupTicketActive,
  saveTourSlot,
  setTourSlotActive,
} from '../../lib/content/cmsAdminApi.js';
import { isValidSlug, normalizeSlug } from '../../lib/content/validators.js';
import {
  timeLabelToInputValue,
  inputValueToTimeLabel,
  formatEventSchedule,
  truncateText,
} from '../../lib/timeFormat.js';
import StatusBadge from './StatusBadge.jsx';
import AdminReadOnlyNotice from './AdminReadOnlyNotice.jsx';
import AdminEmptyState from './AdminEmptyState.jsx';
import AdminMessage from './AdminMessage.jsx';
import AdminToolbar from './AdminToolbar.jsx';
import AdminConfirmButton from './AdminConfirmButton.jsx';
import AdminSectionCard from './AdminSectionCard.jsx';

const EMPTY_EVENT = {
  slug: '', title: '', description: '', event_date: '', start_time: '', end_time: '', is_special: false, is_active: true,
};
const EMPTY_TICKET = {
  event_id: '', slug: '', label: '', price_cents: 0, requires_id: false, sort_order: 0, is_active: true,
};
const EMPTY_TIER = {
  slug: '', level: '', price_cents: 0, period_label: 'per year', benefits: '[]', accent_color: '#1b3823', sort_order: 0, is_active: true,
};
const EMPTY_GROUP = {
  slug: '', label: '', price_cents: 0, sort_order: 0, is_active: true,
};
const EMPTY_SLOT = {
  event_id: '', label: '', sort_order: 0, is_active: true,
};

export default function CatalogPanel() {
  const { isAdmin, isStaff } = useAuth();
  const [events, setEvents] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [groupTickets, setGroupTickets] = useState([]);
  const [tourSlots, setTourSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [eventForm, setEventForm] = useState(EMPTY_EVENT);
  const [editingEventId, setEditingEventId] = useState(null);
  const [ticketForm, setTicketForm] = useState(EMPTY_TICKET);
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [tierForm, setTierForm] = useState(EMPTY_TIER);
  const [editingTierId, setEditingTierId] = useState(null);
  const [groupForm, setGroupForm] = useState(EMPTY_GROUP);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [slotForm, setSlotForm] = useState(EMPTY_SLOT);
  const [editingSlotId, setEditingSlotId] = useState(null);

  const [showEventForm, setShowEventForm] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showTierForm, setShowTierForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showSlotForm, setShowSlotForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchCatalogData();
      setEvents(data.events);
      setTiers(data.tiers);
      setGroupTickets(data.groupTickets);
      setTourSlots(data.tourSlots);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function runSave(action, successMsg) {
    if (!isAdmin) return false;
    setSaving(true);
    setError('');
    try {
      await action();
      setMessage(successMsg);
      await load();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  function resetEventForm() {
    setEditingEventId(null);
    setEventForm(EMPTY_EVENT);
    setShowEventForm(false);
  }

  function startEditEvent(ev) {
    setEditingEventId(ev.id);
    setEventForm({
      slug: ev.slug,
      title: ev.title,
      description: ev.description ?? '',
      event_date: ev.event_date ?? '',
      start_time: ev.start_time ?? '',
      end_time: ev.end_time ?? '',
      is_special: ev.is_special ?? false,
      is_active: ev.is_active ?? true,
    });
    setShowEventForm(true);
  }

  async function handleSaveEvent(e) {
    e.preventDefault();
    const slug = normalizeSlug(eventForm.slug);
    if (!isValidSlug(slug)) {
      setError('Event slug must use lowercase letters, numbers, and hyphens (e.g. special-tour)');
      return;
    }
    const record = { ...eventForm, slug };
    const ok = await runSave(
      () => saveEvent(record, editingEventId),
      editingEventId ? 'Event updated' : 'Event created',
    );
    if (ok) resetEventForm();
  }

  function resetTicketForm() {
    setEditingTicketId(null);
    setTicketForm({ ...EMPTY_TICKET, event_id: events[0]?.id ?? '' });
    setShowTicketForm(false);
  }

  function startEditTicket(ticket) {
    setEditingTicketId(ticket.id);
    setTicketForm({
      event_id: ticket.event_id,
      slug: ticket.slug,
      label: ticket.label,
      price_cents: ticket.price_cents,
      requires_id: ticket.requires_id ?? false,
      sort_order: ticket.sort_order ?? 0,
      is_active: ticket.is_active ?? true,
    });
    setShowTicketForm(true);
  }

  async function handleSaveTicket(e) {
    e.preventDefault();
    const slug = normalizeSlug(ticketForm.slug);
    if (!ticketForm.event_id) {
      setError('Select an event for this ticket type');
      return;
    }
    if (!isValidSlug(slug)) {
      setError('Ticket slug must use lowercase letters, numbers, and hyphens (e.g. kids-admission)');
      return;
    }
    const record = { ...ticketForm, slug };
    const ok = await runSave(
      () => saveTicketType(record, editingTicketId),
      editingTicketId ? 'Ticket type updated' : 'Ticket type created',
    );
    if (ok) resetTicketForm();
  }

  function resetTierForm() {
    setEditingTierId(null);
    setTierForm(EMPTY_TIER);
    setShowTierForm(false);
  }

  function startEditTier(tier) {
    setEditingTierId(tier.id);
    setTierForm({
      slug: tier.slug,
      level: tier.level,
      price_cents: tier.price_cents,
      period_label: tier.period_label ?? 'per year',
      benefits: JSON.stringify(tier.benefits ?? [], null, 2),
      accent_color: tier.accent_color ?? '#1b3823',
      sort_order: tier.sort_order ?? 0,
      is_active: tier.is_active ?? true,
    });
    setShowTierForm(true);
  }

  async function handleSaveTier(e) {
    e.preventDefault();
    const slug = normalizeSlug(tierForm.slug);
    if (!isValidSlug(slug)) {
      setError('Tier slug must use lowercase letters, numbers, and hyphens (e.g. household)');
      return;
    }
    let benefits;
    try {
      benefits = JSON.parse(tierForm.benefits || '[]');
    } catch {
      setError('Benefits must be valid JSON array');
      return;
    }
    const record = {
      slug,
      level: tierForm.level,
      price_cents: tierForm.price_cents,
      period_label: tierForm.period_label,
      benefits,
      accent_color: tierForm.accent_color,
      sort_order: tierForm.sort_order,
      is_active: tierForm.is_active,
    };
    const ok = await runSave(
      () => saveMembershipTier(record, editingTierId),
      editingTierId ? 'Membership tier updated' : 'Membership tier created',
    );
    if (ok) resetTierForm();
  }

  function resetGroupForm() {
    setEditingGroupId(null);
    setGroupForm(EMPTY_GROUP);
    setShowGroupForm(false);
  }

  function startEditGroup(gt) {
    setEditingGroupId(gt.id);
    setGroupForm({
      slug: gt.slug,
      label: gt.label,
      price_cents: gt.price_cents,
      sort_order: gt.sort_order ?? 0,
      is_active: gt.is_active ?? true,
    });
    setShowGroupForm(true);
  }

  async function handleSaveGroup(e) {
    e.preventDefault();
    const slug = normalizeSlug(groupForm.slug);
    if (!isValidSlug(slug)) {
      setError('Group ticket slug must use lowercase letters, numbers, and hyphens (e.g. group-youth)');
      return;
    }
    const record = { ...groupForm, slug };
    const ok = await runSave(
      () => saveGroupTicketType(record, editingGroupId),
      editingGroupId ? 'Group ticket updated' : 'Group ticket created',
    );
    if (ok) resetGroupForm();
  }

  function resetSlotForm() {
    setEditingSlotId(null);
    setSlotForm({ ...EMPTY_SLOT, event_id: events.find((ev) => ev.slug === 'guided-tour')?.id ?? events[0]?.id ?? '' });
    setShowSlotForm(false);
  }

  function startEditSlot(slot) {
    setEditingSlotId(slot.id);
    setSlotForm({
      event_id: slot.event_id,
      label: slot.label,
      sort_order: slot.sort_order ?? 0,
      is_active: slot.is_active ?? true,
    });
    setShowSlotForm(true);
  }

  async function handleSaveSlot(e) {
    e.preventDefault();
    if (!slotForm.event_id) {
      setError('Select an event for this tour slot');
      return;
    }
    const ok = await runSave(
      () => saveTourSlot(slotForm, editingSlotId),
      editingSlotId ? 'Tour slot updated' : 'Tour slot created',
    );
    if (ok) resetSlotForm();
  }

  if (loading) return <p>Loading catalog…</p>;

  return (
    <div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Operational catalog: events, ticket types, membership tiers, group pricing, and tour schedules.
      </p>
      <AdminReadOnlyNotice isAdmin={isAdmin} isStaff={isStaff} />
      <AdminMessage message={message} error={error} onDismiss={() => { setMessage(''); setError(''); }} />

      {(showTicketForm && error) && (
        <p className="admin-notice admin-notice-error" style={{ marginBottom: '0.75rem' }} role="alert">
          {error}
        </p>
      )}

      <AdminSectionCard
        title="Events & ticket types"
        description="Ticketing events shown on the Tickets page and used for bookings."
        actions={isAdmin && (
          <button type="button" className="btn-primary" onClick={() => { resetEventForm(); setShowEventForm(true); }}>
            Add event
          </button>
        )}
      >
        {events.length === 0 ? (
          <AdminEmptyState
            title="No events yet"
            message="Add your first event to start selling tickets."
            action={isAdmin && (
              <button type="button" className="btn-primary" onClick={() => { resetEventForm(); setShowEventForm(true); }}>
                Add event
              </button>
            )}
          />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Event</th><th>Description</th><th>Schedule</th><th>Tickets</th><th>Active</th><th /></tr></thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev.id}>
                    <td><strong>{ev.title}</strong><br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ev.slug}</span></td>
                    <td style={{ maxWidth: '220px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {ev.description ? truncateText(ev.description, 80) : '—'}
                    </td>
                    <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                      {formatEventSchedule(ev) || '—'}
                    </td>
                    <td>{(ev.ticket_types ?? []).map((t) => `${t.label}: ${formatCents(t.price_cents)}`).join(', ') || '—'}</td>
                    <td><StatusBadge value={ev.is_active ? 'published' : 'archived'} /></td>
                    <td style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {isAdmin && (
                        <>
                          <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => startEditEvent(ev)}>Edit</button>
                          <AdminConfirmButton
                            style={{ fontSize: '0.75rem' }}
                            confirmMessage={ev.is_active ? 'Archive this event? It will no longer appear on the public site.' : 'Reactivate this event?'}
                            onConfirm={() => runSave(() => setEventActive(ev.id, !ev.is_active), ev.is_active ? 'Event archived' : 'Event reactivated')}
                          >
                            {ev.is_active ? 'Archive' : 'Activate'}
                          </AdminConfirmButton>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isAdmin && showEventForm && (
          <form className="paper-card admin-inline-form" onSubmit={handleSaveEvent}>
            <h5>{editingEventId ? 'Edit event' : 'New event'}</h5>
            <div className="admin-form-grid">
              <div className="admin-form-field"><label className="admin-form-label">Slug</label><input className="admin-form-input" required value={eventForm.slug} onChange={(e) => setEventForm({ ...eventForm, slug: e.target.value })} disabled={!!editingEventId} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Title</label><input className="admin-form-input" required value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} /></div>
              <div className="admin-form-field full"><label className="admin-form-label">Description</label><textarea className="admin-form-textarea" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Event date</label><input type="date" className="admin-form-input" value={eventForm.event_date ?? ''} onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value || null })} /></div>
              <div className="admin-form-field">
                <label className="admin-form-label">Start time</label>
                <input
                  type="time"
                  className="admin-form-input"
                  value={timeLabelToInputValue(eventForm.start_time)}
                  onChange={(e) => setEventForm({ ...eventForm, start_time: inputValueToTimeLabel(e.target.value) })}
                />
              </div>
              <div className="admin-form-field">
                <label className="admin-form-label">End time</label>
                <input
                  type="time"
                  className="admin-form-input"
                  value={timeLabelToInputValue(eventForm.end_time)}
                  onChange={(e) => setEventForm({ ...eventForm, end_time: inputValueToTimeLabel(e.target.value) })}
                />
              </div>
              {formatEventSchedule(eventForm) && (
                <div className="admin-form-field full">
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    Preview: {formatEventSchedule(eventForm)}
                  </p>
                </div>
              )}
              <div className="admin-form-field"><label className="admin-form-label"><input type="checkbox" checked={eventForm.is_special} onChange={(e) => setEventForm({ ...eventForm, is_special: e.target.checked })} /> Special event</label></div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save event'}</button>
              <button type="button" className="btn-secondary" onClick={resetEventForm}>Cancel</button>
            </div>
          </form>
        )}

        <AdminToolbar title="Ticket types">
          {isAdmin && (
            <button type="button" className="btn-primary" onClick={() => { resetTicketForm(); setShowTicketForm(true); }} disabled={events.length === 0}>
              Add ticket type
            </button>
          )}
        </AdminToolbar>

        {events.flatMap((ev) => (ev.ticket_types ?? []).map((t) => ({ ...t, eventTitle: ev.title }))).length === 0 ? (
          <AdminEmptyState title="No ticket types" message="Add ticket types to an event so visitors can book admission." />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Event</th><th>Label</th><th>Price</th><th>Active</th><th /></tr></thead>
              <tbody>
                {events.flatMap((ev) => (ev.ticket_types ?? []).map((t) => (
                  <tr key={t.id}>
                    <td>{ev.title}</td>
                    <td>{t.label}</td>
                    <td>{formatCents(t.price_cents)}</td>
                    <td><StatusBadge value={t.is_active ? 'published' : 'archived'} /></td>
                    <td style={{ display: 'flex', gap: '4px' }}>
                      {isAdmin && (
                        <>
                          <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => startEditTicket(t)}>Edit</button>
                          <AdminConfirmButton
                            style={{ fontSize: '0.75rem' }}
                            confirmMessage={t.is_active ? 'Archive this ticket type?' : 'Reactivate this ticket type?'}
                            onConfirm={() => runSave(() => setTicketTypeActive(t.id, !t.is_active), 'Ticket type updated')}
                          >
                            {t.is_active ? 'Archive' : 'Activate'}
                          </AdminConfirmButton>
                        </>
                      )}
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        )}

        {isAdmin && showTicketForm && (
          <form className="paper-card admin-inline-form" onSubmit={handleSaveTicket}>
            <h5>{editingTicketId ? 'Edit ticket type' : 'New ticket type'}</h5>
            <div className="admin-form-grid">
              <div className="admin-form-field">
                <label className="admin-form-label">Event</label>
                <select className="admin-form-select" required value={ticketForm.event_id} onChange={(e) => setTicketForm({ ...ticketForm, event_id: e.target.value })} disabled={!!editingTicketId}>
                  <option value="">Select event</option>
                  {events.map((ev) => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                </select>
              </div>
              <div className="admin-form-field">
                <label className="admin-form-label">Slug</label>
                <input
                  className="admin-form-input"
                  required
                  placeholder="kids-admission"
                  value={ticketForm.slug}
                  onChange={(e) => setTicketForm({ ...ticketForm, slug: e.target.value })}
                  onBlur={(e) => setTicketForm({ ...ticketForm, slug: normalizeSlug(e.target.value) || e.target.value })}
                  disabled={!!editingTicketId}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Lowercase letters, numbers, and hyphens only. Spaces become hyphens on save.
                </p>
              </div>
              <div className="admin-form-field"><label className="admin-form-label">Label</label><input className="admin-form-input" required value={ticketForm.label} onChange={(e) => setTicketForm({ ...ticketForm, label: e.target.value })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Price (cents)</label><input type="number" className="admin-form-input" required value={ticketForm.price_cents} onChange={(e) => setTicketForm({ ...ticketForm, price_cents: Number(e.target.value) })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Sort order</label><input type="number" className="admin-form-input" value={ticketForm.sort_order} onChange={(e) => setTicketForm({ ...ticketForm, sort_order: Number(e.target.value) })} /></div>
              <div className="admin-form-field"><label className="admin-form-label"><input type="checkbox" checked={ticketForm.requires_id} onChange={(e) => setTicketForm({ ...ticketForm, requires_id: e.target.checked })} /> Requires ID</label></div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save ticket type'}</button>
              <button type="button" className="btn-secondary" onClick={resetTicketForm}>Cancel</button>
            </div>
          </form>
        )}
      </AdminSectionCard>

      <AdminSectionCard
        title="Membership tiers"
        description="Membership levels shown on the Support page."
        actions={isAdmin && (
          <button type="button" className="btn-primary" onClick={() => { resetTierForm(); setShowTierForm(true); }}>Add tier</button>
        )}
      >
        {tiers.length === 0 ? (
          <AdminEmptyState title="No membership tiers" message="Add tiers so visitors can join as members." action={isAdmin && <button type="button" className="btn-primary" onClick={() => { resetTierForm(); setShowTierForm(true); }}>Add tier</button>} />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Tier</th><th>Price</th><th>Active</th><th /></tr></thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.id}>
                    <td><strong>{t.level}</strong><br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.slug}</span></td>
                    <td>{formatCents(t.price_cents)}/{t.period_label?.replace('per ', '') ?? 'yr'}</td>
                    <td><StatusBadge value={t.is_active ? 'published' : 'archived'} /></td>
                    <td style={{ display: 'flex', gap: '4px' }}>
                      {isAdmin && (
                        <>
                          <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => startEditTier(t)}>Edit</button>
                          <AdminConfirmButton
                            style={{ fontSize: '0.75rem' }}
                            confirmMessage={t.is_active ? 'Archive this tier?' : 'Reactivate this tier?'}
                            onConfirm={() => runSave(() => setMembershipTierActive(t.id, !t.is_active), 'Tier updated')}
                          >
                            {t.is_active ? 'Archive' : 'Activate'}
                          </AdminConfirmButton>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isAdmin && showTierForm && (
          <form className="paper-card admin-inline-form" onSubmit={handleSaveTier}>
            <h5>{editingTierId ? 'Edit membership tier' : 'New membership tier'}</h5>
            <div className="admin-form-grid">
              <div className="admin-form-field"><label className="admin-form-label">Slug</label><input className="admin-form-input" required value={tierForm.slug} onChange={(e) => setTierForm({ ...tierForm, slug: e.target.value })} disabled={!!editingTierId} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Level name</label><input className="admin-form-input" required value={tierForm.level} onChange={(e) => setTierForm({ ...tierForm, level: e.target.value })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Price (cents)</label><input type="number" className="admin-form-input" required value={tierForm.price_cents} onChange={(e) => setTierForm({ ...tierForm, price_cents: Number(e.target.value) })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Period label</label><input className="admin-form-input" value={tierForm.period_label} onChange={(e) => setTierForm({ ...tierForm, period_label: e.target.value })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Accent color</label><input className="admin-form-input" value={tierForm.accent_color} onChange={(e) => setTierForm({ ...tierForm, accent_color: e.target.value })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Sort order</label><input type="number" className="admin-form-input" value={tierForm.sort_order} onChange={(e) => setTierForm({ ...tierForm, sort_order: Number(e.target.value) })} /></div>
              <div className="admin-form-field full"><label className="admin-form-label">Benefits (JSON array)</label><textarea className="admin-form-textarea" rows={4} value={tierForm.benefits} onChange={(e) => setTierForm({ ...tierForm, benefits: e.target.value })} /></div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save tier'}</button>
              <button type="button" className="btn-secondary" onClick={resetTierForm}>Cancel</button>
            </div>
          </form>
        )}
      </AdminSectionCard>

      <AdminSectionCard
        title="Group ticket types"
        description="Discounted group admission rates shown on the Visit page."
        actions={isAdmin && (
          <button type="button" className="btn-primary" onClick={() => { resetGroupForm(); setShowGroupForm(true); }}>Add group ticket</button>
        )}
      >
        {groupTickets.length === 0 ? (
          <AdminEmptyState title="No group tickets" message="Add group pricing for tour operators and large parties." action={isAdmin && <button type="button" className="btn-primary" onClick={() => { resetGroupForm(); setShowGroupForm(true); }}>Add group ticket</button>} />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Label</th><th>Price</th><th>Active</th><th /></tr></thead>
              <tbody>
                {groupTickets.map((gt) => (
                  <tr key={gt.id}>
                    <td>{gt.label}</td>
                    <td>{formatCents(gt.price_cents)}</td>
                    <td><StatusBadge value={gt.is_active ? 'published' : 'archived'} /></td>
                    <td style={{ display: 'flex', gap: '4px' }}>
                      {isAdmin && (
                        <>
                          <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => startEditGroup(gt)}>Edit</button>
                          <AdminConfirmButton
                            style={{ fontSize: '0.75rem' }}
                            confirmMessage={gt.is_active ? 'Archive this group ticket?' : 'Reactivate this group ticket?'}
                            onConfirm={() => runSave(() => setGroupTicketActive(gt.id, !gt.is_active), 'Group ticket updated')}
                          >
                            {gt.is_active ? 'Archive' : 'Activate'}
                          </AdminConfirmButton>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isAdmin && showGroupForm && (
          <form className="paper-card admin-inline-form" onSubmit={handleSaveGroup}>
            <h5>{editingGroupId ? 'Edit group ticket' : 'New group ticket'}</h5>
            <div className="admin-form-grid">
              <div className="admin-form-field"><label className="admin-form-label">Slug</label><input className="admin-form-input" required value={groupForm.slug} onChange={(e) => setGroupForm({ ...groupForm, slug: e.target.value })} disabled={!!editingGroupId} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Label</label><input className="admin-form-input" required value={groupForm.label} onChange={(e) => setGroupForm({ ...groupForm, label: e.target.value })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Price (cents)</label><input type="number" className="admin-form-input" required value={groupForm.price_cents} onChange={(e) => setGroupForm({ ...groupForm, price_cents: Number(e.target.value) })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Sort order</label><input type="number" className="admin-form-input" value={groupForm.sort_order} onChange={(e) => setGroupForm({ ...groupForm, sort_order: Number(e.target.value) })} /></div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save group ticket'}</button>
              <button type="button" className="btn-secondary" onClick={resetGroupForm}>Cancel</button>
            </div>
          </form>
        )}
      </AdminSectionCard>

      <AdminSectionCard
        title="Tour time slots"
        description="Available guided tour times linked to events."
        actions={isAdmin && (
          <button type="button" className="btn-primary" onClick={() => { resetSlotForm(); setShowSlotForm(true); }} disabled={events.length === 0}>Add tour slot</button>
        )}
      >
        {tourSlots.length === 0 ? (
          <AdminEmptyState title="No tour slots" message="Add tour times so visitors can choose a guided tour slot." action={isAdmin && <button type="button" className="btn-primary" onClick={() => { resetSlotForm(); setShowSlotForm(true); }}>Add tour slot</button>} />
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Event</th><th>Time</th><th>Active</th><th /></tr></thead>
              <tbody>
                {tourSlots.map((s) => (
                  <tr key={s.id}>
                    <td>{s.events?.title ?? s.events?.slug ?? '—'}</td>
                    <td>{s.label}</td>
                    <td><StatusBadge value={s.is_active ? 'published' : 'archived'} /></td>
                    <td style={{ display: 'flex', gap: '4px' }}>
                      {isAdmin && (
                        <>
                          <button type="button" className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => startEditSlot(s)}>Edit</button>
                          <AdminConfirmButton
                            style={{ fontSize: '0.75rem' }}
                            confirmMessage={s.is_active ? 'Archive this tour slot?' : 'Reactivate this tour slot?'}
                            onConfirm={() => runSave(() => setTourSlotActive(s.id, !s.is_active), 'Tour slot updated')}
                          >
                            {s.is_active ? 'Archive' : 'Activate'}
                          </AdminConfirmButton>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isAdmin && showSlotForm && (
          <form className="paper-card admin-inline-form" onSubmit={handleSaveSlot}>
            <h5>{editingSlotId ? 'Edit tour slot' : 'New tour slot'}</h5>
            <div className="admin-form-grid">
              <div className="admin-form-field">
                <label className="admin-form-label">Event</label>
                <select className="admin-form-select" required value={slotForm.event_id} onChange={(e) => setSlotForm({ ...slotForm, event_id: e.target.value })} disabled={!!editingSlotId}>
                  <option value="">Select event</option>
                  {events.map((ev) => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
                </select>
              </div>
              <div className="admin-form-field"><label className="admin-form-label">Time label</label><input className="admin-form-input" required placeholder="10:00 AM" value={slotForm.label} onChange={(e) => setSlotForm({ ...slotForm, label: e.target.value })} /></div>
              <div className="admin-form-field"><label className="admin-form-label">Sort order</label><input type="number" className="admin-form-input" value={slotForm.sort_order} onChange={(e) => setSlotForm({ ...slotForm, sort_order: Number(e.target.value) })} /></div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save tour slot'}</button>
              <button type="button" className="btn-secondary" onClick={resetSlotForm}>Cancel</button>
            </div>
          </form>
        )}
      </AdminSectionCard>
    </div>
  );
}
