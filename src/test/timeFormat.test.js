import {
  timeLabelToInputValue,
  inputValueToTimeLabel,
  dateLabelToInputValue,
  formatDateLabel,
  formatEventSchedule,
  truncateText,
  toEventDate,
  toEventEndDate,
  eachDateInRange,
  buildMonthGrid,
} from '../lib/timeFormat.js';

describe('timeFormat', () => {
  it('converts AM labels to input values', () => {
    expect(timeLabelToInputValue('10:00 AM')).toBe('10:00');
    expect(timeLabelToInputValue('12:00 AM')).toBe('00:00');
  });

  it('converts PM labels to input values', () => {
    expect(timeLabelToInputValue('5:00 PM')).toBe('17:00');
    expect(timeLabelToInputValue('12:00 PM')).toBe('12:00');
  });

  it('round-trips through input values', () => {
    expect(inputValueToTimeLabel('10:00')).toBe('10:00 AM');
    expect(inputValueToTimeLabel('17:00')).toBe('5:00 PM');
    expect(inputValueToTimeLabel('00:00')).toBe('12:00 AM');
    expect(inputValueToTimeLabel('12:00')).toBe('12:00 PM');
  });

  it('converts date labels to date input values', () => {
    expect(dateLabelToInputValue('2026-07-10')).toBe('2026-07-10');
    expect(dateLabelToInputValue('July 10, 2026')).toBe('2026-07-10');
    expect(dateLabelToInputValue('')).toBe('');
  });

  it('formats ISO dates for display and leaves free-text alone', () => {
    expect(formatDateLabel('2026-07-10')).toBe('July 10, 2026');
    expect(formatDateLabel('July 10, 2026')).toBe('July 10, 2026');
    expect(formatDateLabel('')).toBe('');
  });

  it('formats event schedules with date and time range', () => {
    expect(formatEventSchedule({
      event_date: '2026-08-15',
      start_time: '5:00 PM',
      end_time: '9:00 PM',
    })).toBe('Aug 15, 2026 · 5:00 PM – 9:00 PM');
  });

  it('formats partial schedules', () => {
    expect(formatEventSchedule({ start_time: '10:00 AM', end_time: '12:00 PM' })).toBe('10:00 AM – 12:00 PM');
    expect(formatEventSchedule({ event_date: '2026-08-15' })).toBe('Aug 15, 2026');
    expect(formatEventSchedule({})).toBe('');
  });

  it('truncates long descriptions', () => {
    expect(truncateText('Short')).toBe('Short');
    expect(truncateText('a'.repeat(90), 80).length).toBe(80);
  });
});

describe('calendar helpers', () => {
  it('prefers an explicit ISO startDate over the free-text label', () => {
    expect(toEventDate({ startDate: '2026-08-15', date: 'Seasonal' })).toBe('2026-08-15');
  });

  it('falls back to parsing the date label', () => {
    expect(toEventDate({ startDate: '', date: 'July 10, 2026' })).toBe('2026-07-10');
  });

  it('returns empty for undated seasonal events', () => {
    expect(toEventDate({ startDate: '', date: 'Seasonal' })).toBe('');
    expect(toEventDate({ date: 'Seasonal' })).toBe('');
    expect(toEventDate(null)).toBe('');
  });

  it('only accepts a well-formed ISO end date', () => {
    expect(toEventEndDate({ endDate: '2026-08-17' })).toBe('2026-08-17');
    expect(toEventEndDate({ endDate: 'Seasonal' })).toBe('');
    expect(toEventEndDate({})).toBe('');
  });

  it('expands a multi-day range across a month boundary', () => {
    expect(eachDateInRange('2026-07-30', '2026-08-02')).toEqual([
      '2026-07-30', '2026-07-31', '2026-08-01', '2026-08-02',
    ]);
  });

  it('returns a single day when the end date is absent or backwards', () => {
    expect(eachDateInRange('2026-08-15', '')).toEqual(['2026-08-15']);
    expect(eachDateInRange('2026-08-15', '2026-08-01')).toEqual(['2026-08-15']);
    expect(eachDateInRange('', '2026-08-01')).toEqual([]);
  });

  it('builds a 42-cell Sunday-first month grid', () => {
    const grid = buildMonthGrid(2026, 7); // August 2026
    expect(grid).toHaveLength(42);
    expect(grid[0].iso).toBe('2026-07-26'); // Aug 1 2026 is a Saturday
    expect(grid[0].inMonth).toBe(false);
    expect(grid[6].iso).toBe('2026-08-01');
    expect(grid[6].inMonth).toBe(true);
  });

  it('handles a leap February', () => {
    const grid = buildMonthGrid(2028, 1);
    const inMonth = grid.filter((cell) => cell.inMonth);
    expect(inMonth).toHaveLength(29);
    expect(inMonth[28].iso).toBe('2028-02-29');
  });
});
