-- Migration: 20260912101000_educators_title_copy.sql
-- Copy edit: drop "can" from the educators/school headline.
-- "History feels different when you can experience it"
--   -> "History feels different when you experience it"

update public.page_sections
set payload = jsonb_set(
      payload,
      '{title}',
      to_jsonb('History feels different when you experience it'::text)
    ),
    updated_at = now()
where (page_key, section_key) in (('home', 'educators'), ('learn', 'school'))
  and payload->>'title' = 'History feels different when you can experience it';
