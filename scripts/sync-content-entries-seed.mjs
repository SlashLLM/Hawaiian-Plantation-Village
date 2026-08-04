/**
 * Clears invented news/careers/partners/testimonials content_entries and
 * updates programs, timeline, and leadership to match study-guide fallbacks.
 * Run after sync-home-about-seed.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const SEED_PATH = fileURLToPath(new URL('../supabase/seed_cms.sql', import.meta.url));
let seed = readFileSync(SEED_PATH, 'utf8').replace(/\r\n/g, '\n');

const partnerStart = seed.indexOf('-- Partner logos / social proof');
const campStart = seed.indexOf('-- ---------------------------------------------------------------------------\n-- Content entries: camp_stories');
if (partnerStart < 0 || campStart < 0) {
  throw new Error('Could not find partner/camp_stories markers');
}

const midReplacement = `-- Partner logos / social proof (cleared — no verified partner claims in study guide)
-- insert intentionally omitted

-- ---------------------------------------------------------------------------
-- Content entries: news (0) — cleared invented news; CMS falls back to empty
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- Content entries: programs (4) — free village festivals from study guide
-- ---------------------------------------------------------------------------

insert into public.content_entries (slug, content_type, status, title, summary, body, category, event_date_label, sort_order, metadata, published_at)
values
  (
    'lunar-new-year',
    'program',
    'published',
    'Multi-ethnic Lunar New Year Celebration',
    'A free village festival with cultural entertainment, food, games, and displays — including Chinese lion blessings and student performers.',
    'A free village festival with cultural entertainment, food, games, and displays — including Chinese lion blessings and student performers.',
    'Community',
    'Seasonal',
    1,
    '{"time": "", "date": "Seasonal"}'::jsonb,
    now()
  ),
  (
    'obon-in-the-village',
    'program',
    'published',
    'Opening of Hawaiʻi''s Obon season',
    'Obon in the village begins in late afternoon, when lanterns light the dancing area with drum accompaniment.',
    'Obon in the village begins in late afternoon, when lanterns light the dancing area with drum accompaniment.',
    'Community',
    'Seasonal',
    2,
    '{"time": "Late afternoon", "date": "Seasonal"}'::jsonb,
    now()
  ),
  (
    'portuguese-festa',
    'program',
    'published',
    'Portuguese Festa',
    'A free community festa with entertainment on the village stage, food tasting, and cultural displays.',
    'A free community festa with entertainment on the village stage, food tasting, and cultural displays.',
    'Community',
    'Seasonal',
    3,
    '{"time": "", "date": "Seasonal"}'::jsonb,
    now()
  ),
  (
    'harvest-festival',
    'program',
    'published',
    'Harvest Festival',
    'A free harvest celebration with cultural entertainment, food tasting at the homes, and cooking demonstrations.',
    'A free harvest celebration with cultural entertainment, food tasting at the homes, and cooking demonstrations.',
    'Community',
    'Seasonal',
    4,
    '{"time": "", "date": "Seasonal"}'::jsonb,
    now()
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Content entries: careers (0) — cleared invented job postings
-- ---------------------------------------------------------------------------

`;

seed = seed.slice(0, partnerStart) + midReplacement + seed.slice(campStart);

const faqBlockStart = seed.indexOf('-- Content entries: faqs (4), testimonials (3), timeline (8), leadership (3)');
const workshopStart = seed.indexOf('-- Content entries: workshops from Learn');
if (faqBlockStart < 0 || workshopStart < 0) {
  throw new Error('Could not find faqs/workshops markers');
}

const faqReplacement = `-- Content entries: faqs (4), timeline (8), leadership (3) — testimonials cleared
-- ---------------------------------------------------------------------------

insert into public.content_entries (slug, content_type, status, title, summary, body, sort_order, metadata, published_at)
values
  ('faq-visit-duration', 'faq', 'published', 'How long does a typical visit take?', null,
   'We recommend allocating at least 1.5 to 2 hours. A full guided tour takes approximately 90 minutes, and you can explore the gardens and exhibits afterward.',
   1, '{}'::jsonb, now()),
  ('faq-accessibility', 'faq', 'published', 'Are the historic buildings accessible?', null,
   'As a historic preservation site, some cottages have elevated steps or narrow doorways that replicate original plantation-era conditions. However, many structures have ramps, and our central pathways are wheelchair-friendly. Please contact us for specialized accessibility support.',
   2, '{}'::jsonb, now()),
  ('faq-photography', 'faq', 'published', 'Is photography permitted?', null,
   'Personal photography and filming are highly encouraged! For commercial photography or wedding sessions, please obtain a permit at the managers office.',
   3, '{}'::jsonb, now()),
  ('faq-rain', 'faq', 'published', 'Is the village open in the rain?', null,
   'Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings.',
   4, '{}'::jsonb, now()),

  ('timeline-1852', 'timeline', 'published', '1852', null,
   'First waves of Chinese contract laborers arrive in Oʻahu aboard the Thetis, inaugurating the plantation era.',
   1, '{"year": "1852"}'::jsonb, now()),
  ('timeline-1878', 'timeline', 'published', '1878', null,
   'Portuguese workers arrive from Madeira and Azores, bringing stone ovens (forno) and the braguinha (ancestor of the ukulele).',
   2, '{"year": "1878"}'::jsonb, now()),
  ('timeline-1885', 'timeline', 'published', '1885', null,
   'The Kanyaku Imin government-contract Japanese workers arrive, establishing major camp communities and furo baths.',
   3, '{"year": "1885"}'::jsonb, now()),
  ('timeline-1897', 'timeline', 'published', '1897', null,
   'Oahu Sugar Company is incorporated in Waipahu, erecting the massive sugar mill smokestack that dominated the skyline.',
   4, '{"year": "1897"}'::jsonb, now()),
  ('timeline-1903', 'timeline', 'published', '1903', null,
   'First Korean immigrants land in Honolulu, setting up language schools, programs, and active community organizations.',
   5, '{"year": "1903"}'::jsonb, now()),
  ('timeline-1906', 'timeline', 'published', '1906', null,
   'The first Filipino sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment.',
   6, '{"year": "1906"}'::jsonb, now()),
  ('timeline-1973', 'timeline', 'published', '1973', null,
   'The Friends of Waipahu Cultural Garden Park incorporate, founded by a former plantation worker and plantation-worker descendants committed to a village that would teach later generations their heritage.',
   7, '{"year": "1973"}'::jsonb, now()),
  ('timeline-1992', 'timeline', 'published', '1992', null,
   'Hawaii''s Plantation Village opens in Waipahu after a capital campaign led by executive director Cal Kawamoto raised over $2 million, with another $1 million from the State Legislature for the $2.5 million project.',
   8, '{"year": "1992"}'::jsonb, now()),

  ('leadership-okada', 'leadership', 'published', 'Hideo “Major” Okada',
   'Former sugar worker and labor union organizer; one of the village founders. The Okada Education Center is named in his honor.', null,
   1, '{"role": "Founder"}'::jsonb, now()),
  ('leadership-kawamoto', 'leadership', 'published', 'Cal Kawamoto',
   'Created the capital fund drive advisory committee and worked with ethnic historical groups to plan and furnish the village exhibits.', null,
   2, '{"role": "Executive director (capital campaign)"}'::jsonb, now()),
  ('leadership-leinweber', 'leadership', 'published', 'Spencer Leinweber',
   'Of Spencer Mason Architecture; selected as principal architect for Hawaii''s Plantation Village.', null,
   3, '{"role": "Principal architect"}'::jsonb, now())
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
`;

const faqHeaderStart = seed.lastIndexOf('-- ---------------------------------------------------------------------------\n', faqBlockStart);
seed = seed.slice(0, faqHeaderStart) + `-- ---------------------------------------------------------------------------\n${faqReplacement}` + seed.slice(workshopStart);

writeFileSync(SEED_PATH, seed.replace(/\n/g, '\r\n'), 'utf8');
console.log('Updated content_entries for partners/news/programs/careers/timeline/leadership');
