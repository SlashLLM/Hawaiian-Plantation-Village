const TIME_LABEL_RE = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i;
const INPUT_TIME_RE = /^(\d{1,2}):(\d{2})$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function pad2(n) {
  return String(n).padStart(2, '0');
}

/** Convert stored date label ("July 10, 2026" or "2026-07-10") to HTML date input value. */
export function dateLabelToInputValue(label) {
  if (!label || typeof label !== 'string') return '';
  const trimmed = label.trim();
  if (ISO_DATE_RE.test(trimmed)) return trimmed;
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return '';
  return `${parsed.getFullYear()}-${pad2(parsed.getMonth() + 1)}-${pad2(parsed.getDate())}`;
}

/** Format ISO date ("2026-07-10") for display; leave free-text labels unchanged. */
export function formatDateLabel(value) {
  if (!value || typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!ISO_DATE_RE.test(trimmed)) return trimmed;
  const parsed = new Date(`${trimmed}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return trimmed;
  return parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/** Convert stored label ("10:00 AM") to HTML time input value ("10:00"). */
export function timeLabelToInputValue(label) {
  if (!label || typeof label !== 'string') return '';
  const trimmed = label.trim();
  const match = trimmed.match(TIME_LABEL_RE);
  if (!match) {
    const inputMatch = trimmed.match(INPUT_TIME_RE);
    return inputMatch ? `${pad2(Number(inputMatch[1]))}:${inputMatch[2]}` : '';
  }
  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = match[3].toUpperCase();
  if (meridiem === 'AM') {
    if (hours === 12) hours = 0;
  } else if (hours !== 12) {
    hours += 12;
  }
  return `${pad2(hours)}:${minutes}`;
}

/** Convert HTML time input value ("10:00") to stored label ("10:00 AM"). */
export function inputValueToTimeLabel(value) {
  if (!value || typeof value !== 'string') return '';
  const match = value.trim().match(INPUT_TIME_RE);
  if (!match) return value.trim();
  let hours = Number(match[1]);
  const minutes = match[2];
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${meridiem}`;
}

function formatEventDate(dateStr) {
  if (!dateStr) return '';
  const parsed = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTimeRange(startTime, endTime) {
  if (startTime && endTime) return `${startTime} – ${endTime}`;
  return startTime || endTime || '';
}

/** Build a human-readable schedule from event fields. */
export function formatEventSchedule({ event_date, start_time, end_time } = {}) {
  const datePart = formatEventDate(event_date);
  const timePart = formatTimeRange(start_time, end_time);
  if (datePart && timePart) return `${datePart} · ${timePart}`;
  return datePart || timePart || '';
}

/** Truncate text for admin table cells. */
export function truncateText(text, max = 80) {
  if (!text) return '';
  const trimmed = String(text).trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1)}…`;
}

/**
 * Resolve the calendar date for a CMS event item.
 * Prefers the explicit ISO `startDate`; falls back to parsing the free-text
 * `date` label. Returns '' for undated items (e.g. "Seasonal"), which is the
 * single predicate for "can this event be placed on the calendar?".
 */
export function toEventDate(item) {
  if (!item || typeof item !== 'object') return '';
  const explicit = typeof item.startDate === 'string' ? item.startDate.trim() : '';
  if (ISO_DATE_RE.test(explicit)) return explicit;
  return dateLabelToInputValue(item.date);
}

/** Resolve the optional ISO end date for a CMS event item. */
export function toEventEndDate(item) {
  if (!item || typeof item !== 'object') return '';
  const explicit = typeof item.endDate === 'string' ? item.endDate.trim() : '';
  return ISO_DATE_RE.test(explicit) ? explicit : '';
}

/** Every ISO day from start through end inclusive; [start] when end is absent or invalid. */
export function eachDateInRange(startISO, endISO) {
  if (!ISO_DATE_RE.test(startISO ?? '')) return [];
  if (!ISO_DATE_RE.test(endISO ?? '') || endISO < startISO) return [startISO];
  const days = [];
  const cursor = new Date(`${startISO}T12:00:00`);
  const last = new Date(`${endISO}T12:00:00`);
  while (cursor <= last && days.length < 366) {
    days.push(`${cursor.getFullYear()}-${pad2(cursor.getMonth() + 1)}-${pad2(cursor.getDate())}`);
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

/** ISO day string for a Date. */
export function toISODate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

/**
 * Sunday-first 6x7 month grid of { iso, day, inMonth } cells,
 * padded with the trailing/leading days of the adjacent months.
 * `month` is 0-indexed.
 */
export function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const cells = [];
  for (let i = 0; i < 42; i += 1) {
    const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    cells.push({
      iso: toISODate(cursor),
      day: cursor.getDate(),
      inMonth: cursor.getMonth() === month && cursor.getFullYear() === year,
    });
  }
  return cells;
}
