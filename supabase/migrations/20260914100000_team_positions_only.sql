-- Migration: 20260914100000_team_positions_only.sql
-- Staff and board: show positions only (drop role descriptions)
-- Add Paul Nishimura (Board Member) to board of directors

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('about', 'staff', 'published', 14, '{"items":[{"slug":"loretta-chen","name":"Dr. Loretta Chen","role":"Executive Director"},{"slug":"derrick-iwata","name":"Derrick Iwata","role":"Education & Programs Manager"},{"slug":"mil-holliday","name":"Mil Holliday","role":"Administration Manager"},{"slug":"michi-lacar","name":"Michi Lacar","role":"Programs Coordinator"},{"slug":"eli-flores","name":"Eli Flores","role":"Museum Technician"}]}'::jsonb, now()),
  ('about', 'board', 'published', 15, '{"items":[{"slug":"kats-gustafson","name":"Dr. Kats Gustafson","role":"Board President"},{"slug":"steven-yuen","name":"Steven Yuen","role":"Board Vice President"},{"slug":"clement-bautista","name":"Clement Bautista","role":"Board Treasurer"},{"slug":"william-rol","name":"William Rol","role":"Board Member"},{"slug":"john-shockley","name":"John Shockley","role":"Board Member"},{"slug":"carol-takahashi","name":"Carol Takahashi","role":"Board Member"},{"slug":"yoshiko-yamauchi","name":"Yoshiko Yamauchi","role":"Board Member"},{"slug":"paul-nishimura","name":"Paul Nishimura","role":"Board Member"}]}'::jsonb, now())
on conflict (page_key, section_key) do update
set payload = excluded.payload,
    updated_at = now();
