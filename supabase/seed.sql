-- Seed HPV catalog and CMS content (idempotent)

insert into public.events (slug, title, description, event_date, start_time, end_time, is_special, is_active)
values
  (
    'guided-tour',
    'Daily Guided Tour',
    'Walk the village trails with a resident guide. Explore restored camp structures and hear stories of wave immigration.',
    null,
    '10:00 AM',
    '12:00 PM',
    false,
    true
  ),
  (
    'obon-festival',
    'Obon Festival & Bon Dance',
    'Special event entry with traditional performances, temple dancing access, and food court entry vouchers.',
    '2026-08-15',
    '5:00 PM',
    '9:00 PM',
    true,
    true
  )
on conflict (slug) do nothing;

insert into public.ticket_types (event_id, slug, label, price_cents, requires_id, sort_order)
select e.id, t.slug, t.label, t.price_cents, t.requires_id, t.sort_order
from public.events e
cross join (
  values
    ('adult', 'General Admission (Adults 13+)', 1700, false, 1),
    ('local', 'Kamaʻāina / Military / Seniors', 1200, true, 2),
    ('youth', 'Youth (Ages 5 – 12)', 800, false, 3),
    ('child', 'Child (Under 5)', 0, false, 4)
) as t(slug, label, price_cents, requires_id, sort_order)
where e.slug = 'guided-tour'
on conflict (event_id, slug) do nothing;

insert into public.ticket_types (event_id, slug, label, price_cents, requires_id, sort_order)
select e.id, t.slug, t.label, t.price_cents, t.requires_id, t.sort_order
from public.events e
cross join (
  values
    ('adult', 'General Admission (Adults 13+)', 1700, false, 1),
    ('local', 'Kamaʻāina / Military / Seniors', 1200, true, 2),
    ('youth', 'Youth (Ages 5 – 12)', 800, false, 3),
    ('child', 'Child (Under 5)', 0, false, 4)
) as t(slug, label, price_cents, requires_id, sort_order)
where e.slug = 'obon-festival'
on conflict (event_id, slug) do nothing;

insert into public.membership_tiers (slug, level, price_cents, period_label, benefits, accent_color, sort_order)
values
  ('individual', 'Individual', 3500, 'per year', '["Membership for one adult","Free admission and guided tours for one year","Members-only invitations to special events, exhibits & cultural heritage celebrations","10% off at the gift shop"]'::jsonb, '#1b3823', 1),
  ('senior', 'Senior', 3000, 'per year', '["For members age 62 & above","Free admission and guided tours for one year","Members-only invitations to special events, exhibits & cultural heritage celebrations","10% off at the gift shop"]'::jsonb, '#22646d', 2),
  ('family', 'Family', 6000, 'per year', '["Two adults & children under 18","Free admission and guided tours for one year","Members-only invitations to special events, exhibits & cultural heritage celebrations","10% off at the gift shop"]'::jsonb, '#b24e2c', 3)
on conflict (slug) do nothing;

insert into public.content_entries (slug, content_type, status, title, summary, body, category, event_date_label, image_url, published_at)
values
  (
    'smokestack-restoration',
    'news',
    'published',
    'Historic Oahu Sugar Co. Smokestack Restoration Underway',
    'A team of local masonry experts has begun repairing structural joints on the iconic 1917 smokestack.',
    'We are thrilled to announce the commencement of the Oahu Sugar Co. Smokestack Restoration Project.',
    'Preservation',
    'July 10, 2026',
    '/digitized-photos/IMG_6810.jpeg',
    now()
  ),
  (
    'heritage-festival',
    'news',
    'published',
    'Announcing the 34th Annual Plantation Heritage Festival',
    'Celebrate the rich multicultural heritage of Oʻahu on August 15th with traditional music and living history.',
    'Save the date! On Saturday, August 15, 2026, Hawaii''s Plantation Village will host our signature Annual Plantation Heritage Festival.',
    'Community',
    'June 28, 2026',
    '/digitized-photos/IMG_6103.jpeg',
    now()
  ),
  (
    'obon-festival-event',
    'program',
    'published',
    'Obon Festival & Bon Dance',
    'Celebrate plantation ancestral roots with traditional music, dancing, and local food stalls.',
    'Join us August 15 for our signature Obon Festival & Bon Dance in the central courtyard.',
    'Community',
    'AUG 15',
    null,
    now()
  ),
  (
    'heritage-day-event',
    'program',
    'published',
    'Plantation Heritage Day',
    'Live cultural demonstrations including Portuguese stone-oven bread baking and historic crafts.',
    'Plantation Heritage Day runs September 12 with demonstrations across the village.',
    'Community',
    'SEP 12',
    null,
    now()
  )
on conflict (slug) do nothing;
