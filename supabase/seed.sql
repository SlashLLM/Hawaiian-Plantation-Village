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
  (
    'individual',
    'Individual',
    4500,
    'per year',
    '["Free admission for one named adult member","10% discount on all gift shop items","Invitations to annual meetings and archives showcase","Subscription to the print Ledger journal"]'::jsonb,
    '#1b3823',
    1
  ),
  (
    'household',
    'Household',
    7500,
    'per year',
    '["Free admission for two named adults and up to four children","2 complimentary guest passes per year","10% discount on all gift shop items","Exclusive advance tour bookings for festivals"]'::jsonb,
    '#22646d',
    2
  ),
  (
    'steward',
    'Steward',
    15000,
    'per year',
    '["All Household membership benefits","Invitation to private reception with the Museum Director","1 hour private research archive consultation","4 complimentary guest passes per year"]'::jsonb,
    '#b24e2c',
    3
  )
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
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
    now()
  ),
  (
    'heritage-festival',
    'news',
    'published',
    'Announcing the 34th Annual Plantation Heritage Festival',
    'Celebrate the rich multicultural heritage of Oʻahu on August 15th with traditional music and living history.',
    'Save the date! On Saturday, August 15, 2026, Hawaiian Plantation Village will host our signature Annual Plantation Heritage Festival.',
    'Community',
    'June 28, 2026',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
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
