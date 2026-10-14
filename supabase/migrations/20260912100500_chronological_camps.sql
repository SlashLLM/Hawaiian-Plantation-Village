-- Migration: 20260912100500_chronological_camps.sql
-- Arrange cultural camps and home culture tiles in chronological order of arrival

-- 1. Update sort_order for content_entries (camp stories)
update public.content_entries set sort_order = 1 where content_type = 'camp_story' and slug = 'hawaiian';
update public.content_entries set sort_order = 2 where content_type = 'camp_story' and slug = 'chinese';
update public.content_entries set sort_order = 3 where content_type = 'camp_story' and slug = 'portuguese';
update public.content_entries set sort_order = 4 where content_type = 'camp_story' and slug = 'japanese';
update public.content_entries set sort_order = 5 where content_type = 'camp_story' and slug = 'okinawan';
update public.content_entries set sort_order = 6 where content_type = 'camp_story' and slug = 'puerto_rican';
update public.content_entries set sort_order = 7 where content_type = 'camp_story' and slug = 'korean';
update public.content_entries set sort_order = 8 where content_type = 'camp_story' and slug = 'filipino';

-- 2. Update home.cultures in page_sections
update public.page_sections
set payload = jsonb_set(
  payload,
  '{items}',
  '[
    {"name":"Hawaiian","note":"The land, her people and the world before sugar"},
    {"name":"Chinese","note":"Migration, family and community"},
    {"name":"Portuguese","note":"Family, food, faith and celebration"},
    {"name":"Japanese","note":"Home, work, faith and tradition"},
    {"name":"Okinawan","note":"Identity, memory and community"},
    {"name":"Puerto Rican","note":"Home, tradition and island connections"},
    {"name":"Korean","note":"Migration, community and cultural tradition"},
    {"name":"Filipino","note":"Sakada journeys, family and resilience"}
  ]'::jsonb
),
updated_at = now()
where page_key = 'home' and section_key = 'cultures';
