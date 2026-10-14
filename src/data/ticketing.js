/**
 * Static ticketing and membership data for the Visit, Tickets and Support pages.
 *
 * The create-booking and create-membership edge functions still price from
 * the database (ticket_types / membership_tiers, matched by slug), so a price
 * or slug change must be made here AND in a Supabase migration.
 */

/** Bookable events with their ticket types and tour times (Tickets page). */
export const EVENTS = [
  {
    slug: 'guided-tour',
    title: 'Daily Guided Tour',
    description: 'Walk the village trails with a resident guide.',
    is_special: false,
    start_time: '10:00 AM',
    end_time: '12:00 PM',
    ticket_types: [
      { id: 'adult', slug: 'adult', label: 'General Admission', price_cents: 2500 },
      { id: 'local', slug: 'local', label: 'Senior 62+ / Kamaʻāina / Military (Active/Retired)', price_cents: 2000, requires_id: true },
      { id: 'youth', slug: 'youth', label: 'Youth (11 – 17)', price_cents: 1200 },
      { id: 'children', slug: 'children', label: 'Children (5 – 10)', price_cents: 800 },
      { id: 'child', slug: 'child', label: 'Children (4 & under)', price_cents: 0 },
    ],
    tour_time_slots: [
      { id: 'slot-am', label: '10:00 AM', sort_order: 1 },
    ],
  },
  {
    slug: 'obon-festival',
    title: 'Obon Festival & Bon Dance (August 15)',
    description: 'Special event entry with performances and food vouchers.',
    is_special: true,
    event_date: '2026-08-15',
    start_time: '5:00 PM',
    end_time: '9:00 PM',
    ticket_types: [
      { id: 'adult', slug: 'adult', label: 'General Admission', price_cents: 2500 },
      { id: 'local', slug: 'local', label: 'Senior 62+ / Kamaʻāina / Military (Active/Retired)', price_cents: 2000, requires_id: true },
      { id: 'youth', slug: 'youth', label: 'Youth (11 – 17)', price_cents: 1200 },
      { id: 'children', slug: 'children', label: 'Children (5 – 10)', price_cents: 800 },
      { id: 'child', slug: 'child', label: 'Children (4 & under)', price_cents: 0 },
    ],
    tour_time_slots: [
      { id: 'slot-obon', label: '5:00 PM', sort_order: 1 },
    ],
  },
];

const MEMBER_BENEFITS = [
  'Free admission and guided tours for one year',
  'Members-only invitations to special events, exhibits & cultural heritage celebrations',
  '10% off at the gift shop',
];

/** Mirrors the printed membership form (Support page). */
export const MEMBERSHIP_TIERS = [
  {
    slug: 'individual',
    level: 'Individual',
    price: '$35',
    period: 'per year',
    color: 'var(--cane-green)',
    benefits: ['Membership for one adult', ...MEMBER_BENEFITS],
  },
  {
    slug: 'senior',
    level: 'Senior',
    price: '$30',
    period: 'per year',
    color: 'var(--ocean-teal)',
    benefits: ['For members age 62 & above', ...MEMBER_BENEFITS],
  },
  {
    slug: 'family',
    level: 'Family',
    price: '$60',
    period: 'per year',
    color: 'var(--tin-rust)',
    benefits: ['Two adults & children under 18', ...MEMBER_BENEFITS],
  },
];

/** Group admission prices (Visit page, Group visits tab). */
export const GROUP_TICKET_TYPES = [
  { slug: 'group-adult', label: 'Group Adults (10+)', priceCents: 1400, priceDisplay: '$14.00' },
  { slug: 'group-senior-military', label: 'Group Seniors / Military', priceCents: 1000, priceDisplay: '$10.00' },
  { slug: 'group-youth', label: 'Group Youth (5-12)', priceCents: 600, priceDisplay: '$6.00' },
];
