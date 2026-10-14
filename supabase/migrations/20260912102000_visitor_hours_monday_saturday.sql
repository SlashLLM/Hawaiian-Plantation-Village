-- Migration: 20260912102000_visitor_hours_monday_saturday.sql
-- Visiting hours change: the Village is now open Monday through Saturday.
--   "Tuesday – Saturday: 9:00 AM – 2:00 PM" -> "Monday – Saturday: 9:00 AM – 2:00 PM"
--   "Closed on Sundays, Mondays, and major state holidays." -> "Closed on Sundays and major state holidays."

-- 1. Site settings (hours.schedule, hours.closedNote)
update public.site_settings
set payload = replace(
      replace(
        payload::text,
        'Tuesday – Saturday: 9:00 AM – 2:00 PM',
        'Monday – Saturday: 9:00 AM – 2:00 PM'
      ),
      'Closed on Sundays, Mondays, and major state holidays.',
      'Closed on Sundays and major state holidays.'
    )::jsonb,
    updated_at = now()
where payload::text like '%Tuesday – Saturday%'
   or payload::text like '%Sundays, Mondays%';

-- 2. Page sections (home.quickVisit, home.planVisit essentials, visit.hours)
update public.page_sections
set payload = replace(
      replace(
        replace(
          payload::text,
          'Tuesday – Saturday: 9:00 AM – 2:00 PM',
          'Monday – Saturday: 9:00 AM – 2:00 PM'
        ),
        'Tuesday–Saturday · 9:00 AM–2:00 PM',
        'Monday–Saturday · 9:00 AM–2:00 PM'
      ),
      'Closed on Sundays, Mondays, and major state holidays.',
      'Closed on Sundays and major state holidays.'
    )::jsonb,
    updated_at = now()
where payload::text like '%Tuesday – Saturday%'
   or payload::text like '%Tuesday–Saturday%'
   or payload::text like '%Sundays, Mondays%';
