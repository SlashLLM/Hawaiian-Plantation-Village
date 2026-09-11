-- About page: Team tab (staff & board leadership).
--
-- Adds the three page_sections the /about "Team" sub-tab reads. Inserted with
-- `do nothing` so a database where staff have already edited these sections
-- through /admin keeps its own copy.

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('about', 'teamIntro', 'published', 13, '{"stamp":"OUR PEOPLE","title":"Staff & Board Leadership","description":"HPV runs on institutional knowledge carried by the people who’ve stayed — some for decades — alongside new leadership and governance rebuilding the systems around them.","staffLabel":"Staff","boardLabel":"Board of Directors","note":"Plus a dedicated corps of docents and volunteers — several with decades of service — who lead tours, run programs, and keep the Village open every week."}'::jsonb, now()),
  ('about', 'staff', 'published', 14, '{"items":[{"slug":"loretta-chen","name":"Dr. Loretta Chen","role":"Executive Director — leading the organizational turnaround"},{"slug":"derrick-iwata","name":"Derrick Iwata","role":"Education & Programs Manager — schools, events, tours, volunteers"},{"slug":"mil-holliday","name":"Mil Holliday","role":"Administration Manager — front-of-house & operations"},{"slug":"michi-lacar","name":"Michi Lacar","role":"Programs Coordinator — docents, museum curation"}]}'::jsonb, now()),
  ('about', 'board', 'published', 15, '{"items":[{"slug":"kats-gustafson","name":"Dr. Kats Gustafson","role":"Board President"},{"slug":"clement-bautista","name":"Clement Bautista","role":"Board Treasurer"},{"slug":"william-rol","name":"William Rol","role":"Board Member"},{"slug":"john-shockley","name":"John Shockley","role":"Board Member"},{"slug":"carol-takahashi","name":"Carol Takahashi","role":"Board Member"},{"slug":"yoshiko-yamauchi","name":"Yoshiko Yamauchi","role":"Board Member; Founding Volunteer, 1976"},{"slug":"stephen-yuen","name":"Stephen Yuen","role":"Board Member"}]}'::jsonb, now())
on conflict (page_key, section_key) do nothing;
