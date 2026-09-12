-- Migration: 20260912100000_update_staff_and_board.sql
-- Add Eli Flores (Museum Technician) to staff
-- Update Steven Yuen (Board Vice President) in board of directors

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('about', 'staff', 'published', 14, '{"items":[{"slug":"loretta-chen","name":"Dr. Loretta Chen","role":"Executive Director — leading the organizational turnaround"},{"slug":"derrick-iwata","name":"Derrick Iwata","role":"Education & Programs Manager — schools, events, tours, volunteers"},{"slug":"mil-holliday","name":"Mil Holliday","role":"Administration Manager — front-of-house & operations"},{"slug":"michi-lacar","name":"Michi Lacar","role":"Programs Coordinator — docents, museum curation"},{"slug":"eli-flores","name":"Eli Flores","role":"Museum Technician"}]}'::jsonb, now()),
  ('about', 'board', 'published', 15, '{"items":[{"slug":"kats-gustafson","name":"Dr. Kats Gustafson","role":"Board President"},{"slug":"steven-yuen","name":"Steven Yuen","role":"Board Vice President"},{"slug":"clement-bautista","name":"Clement Bautista","role":"Board Treasurer"},{"slug":"william-rol","name":"William Rol","role":"Board Member"},{"slug":"john-shockley","name":"John Shockley","role":"Board Member"},{"slug":"carol-takahashi","name":"Carol Takahashi","role":"Board Member"},{"slug":"yoshiko-yamauchi","name":"Yoshiko Yamauchi","role":"Board Member; Founding Volunteer, 1976"}]}'::jsonb, now())
on conflict (page_key, section_key) do update
set payload = excluded.payload,
    updated_at = now();
