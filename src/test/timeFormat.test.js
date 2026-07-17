import {
  timeLabelToInputValue,
  inputValueToTimeLabel,
  dateLabelToInputValue,
  formatDateLabel,
  formatEventSchedule,
  truncateText,
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
