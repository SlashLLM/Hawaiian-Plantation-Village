import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import {
  buildMonthGrid,
  eachDateInRange,
  formatDateLabel,
  toEventDate,
  toEventEndDate,
  toISODate,
} from '../lib/timeFormat.js';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Month calendar for CMS event items that carry a resolvable date. */
export default function EventsCalendar({ events = [] }) {
  const today = useMemo(() => toISODate(new Date()), []);

  /** iso day -> events falling on that day */
  const eventsByDay = useMemo(() => {
    const map = new Map();
    events.forEach((event) => {
      const start = toEventDate(event);
      if (!start) return;
      eachDateInRange(start, toEventEndDate(event)).forEach((iso) => {
        const bucket = map.get(iso);
        if (bucket) bucket.push(event);
        else map.set(iso, [event]);
      });
    });
    return map;
  }, [events]);

  /** First day that still lies ahead, else the latest day we know about. */
  const defaultIso = useMemo(() => {
    const days = [...eventsByDay.keys()].sort();
    if (!days.length) return '';
    return days.find((iso) => iso >= today) ?? days[days.length - 1];
  }, [eventsByDay, today]);

  const anchor = defaultIso || today;
  const [viewYear, setViewYear] = useState(() => Number(anchor.slice(0, 4)));
  const [viewMonth, setViewMonth] = useState(() => Number(anchor.slice(5, 7)) - 1);
  const [selectedIso, setSelectedIso] = useState('');

  const cells = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const shiftMonth = (delta) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const goToday = () => {
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
  };

  const detailIso = selectedIso || defaultIso;
  const detailEvents = detailIso ? (eventsByDay.get(detailIso) ?? []) : [];

  return (
    <div>
      <div style={styles.header}>
        <button
          type="button"
          style={styles.navBtn}
          onClick={() => shiftMonth(-1)}
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <h4 style={styles.monthCaption} aria-live="polite">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h4>
        <button
          type="button"
          style={styles.navBtn}
          onClick={() => shiftMonth(1)}
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
        <button type="button" style={styles.todayBtn} onClick={goToday}>
          Today
        </button>
      </div>

      <div className="events-calendar-grid" aria-label="Event calendar">
        {WEEKDAYS.map((day) => (
          <div key={day} style={styles.weekdayCell} aria-hidden="true">{day}</div>
        ))}
        {cells.map((cell) => {
          const dayEvents = eventsByDay.get(cell.iso) ?? [];
          const isSelected = cell.iso === detailIso;
          if (!dayEvents.length) {
            return (
              <div
                key={cell.iso}
                className="events-calendar-day is-empty"
                style={{ ...styles.dayCell, ...(cell.inMonth ? {} : styles.dayCellMuted) }}
              >
                <span style={cell.iso === today ? styles.todayMark : undefined}>{cell.day}</span>
              </div>
            );
          }
          return (
            <button
              key={cell.iso}
              type="button"
              className="events-calendar-day"
              aria-pressed={isSelected}
              aria-label={`${formatDateLabel(cell.iso)} — ${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}`}
              onClick={() => setSelectedIso(cell.iso)}
              style={{
                ...styles.dayCell,
                ...styles.dayCellEvent,
                ...(cell.inMonth ? {} : styles.dayCellMuted),
                ...(isSelected ? styles.dayCellSelected : {}),
              }}
            >
              <span style={cell.iso === today ? styles.todayMark : undefined}>{cell.day}</span>
              <span style={styles.dot} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div style={styles.detailPanel} aria-live="polite">
        {detailEvents.length === 0 ? (
          <p style={styles.detailHint}>
            <CalendarDays size={16} color="var(--muted-sage)" /> Select a marked day to see what is
            happening at the village.
          </p>
        ) : (
          <>
            <p style={styles.detailDate}>{formatDateLabel(detailIso)}</p>
            {detailEvents.map((event, index) => (
              <div key={event.slug ?? index} style={styles.detailEvent}>
                <h4 className="event-title">{event.title}</h4>
                {event.time && <p style={styles.detailTime}>{event.time}</p>}
                <p className="event-note">{event.desc}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem'
  },
  navBtn: {
    background: 'none',
    border: '1px solid var(--hairline)',
    borderRadius: 'var(--border-radius-md)',
    color: 'var(--plantation-ink)',
    cursor: 'pointer',
    padding: '6px 8px',
    display: 'inline-flex',
    alignItems: 'center'
  },
  monthCaption: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.15rem',
    fontWeight: 500,
    minWidth: '11ch',
    textAlign: 'center',
    margin: 0
  },
  todayBtn: {
    marginLeft: 'auto',
    background: 'none',
    border: '1px solid var(--hairline)',
    borderRadius: 'var(--border-radius-md)',
    color: 'var(--muted-sage)',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.82rem',
    padding: '6px 12px'
  },
  weekdayCell: {
    fontSize: '0.72rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--muted-sage)',
    textAlign: 'center',
    padding: '0.5rem 0'
  },
  dayCell: {
    position: 'relative',
    minHeight: '46px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    color: 'var(--plantation-ink)',
    border: '1px solid var(--hairline)',
    background: 'none',
    padding: '4px'
  },
  dayCellMuted: {
    color: 'var(--muted-sage)',
    opacity: 0.45
  },
  dayCellEvent: {
    cursor: 'pointer',
    fontWeight: 600,
    backgroundColor: 'var(--sand)'
  },
  dayCellSelected: {
    outline: '2px solid var(--heritage-gold)',
    outlineOffset: '-2px'
  },
  todayMark: {
    borderBottom: '2px solid var(--cane-green)'
  },
  dot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: 'var(--heritage-gold)'
  },
  detailPanel: {
    marginTop: '1.5rem',
    paddingTop: '1.25rem',
    borderTop: '1px solid var(--hairline)'
  },
  detailHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.92rem',
    color: 'var(--muted-sage)'
  },
  detailDate: {
    fontSize: '0.8rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--muted-sage)',
    marginBottom: '0.75rem'
  },
  detailEvent: {
    marginBottom: '1.25rem'
  },
  detailTime: {
    fontSize: '0.85rem',
    color: 'var(--cane-green)',
    marginBottom: '0.35rem'
  }
};
