import { DEFAULT_PAGE_SECTIONS } from './fallbacks.js';

export const PAGE_KEYS = [
  'home',
  'visit',
  'explore',
  'about',
  'learn',
  'play',
  'stories',
  'archives',
  'events',
  'support',
  'volunteer',
  'tickets',
];

export const PAGE_LABELS = {
  home: 'Home',
  visit: 'Visit',
  explore: 'Explore',
  about: 'About',
  learn: 'Education',
  play: 'Play & Learn',
  stories: 'Stories',
  archives: 'Collections',
  events: 'Events',
  support: 'Support Us',
  volunteer: 'Volunteer',
  tickets: 'Tickets',
};

/** Canonical section keys per page with labels and starter payloads from fallbacks. */
const SECTION_LABEL_OVERRIDES = {
  'home.events': 'Upcoming Community Programs',
  'home.eventsHeader': 'Events Header',
};

export const SECTION_REGISTRY = Object.fromEntries(
  PAGE_KEYS.map((pageKey) => {
    const sections = DEFAULT_PAGE_SECTIONS[pageKey] ?? {};
    return [
      pageKey,
      Object.entries(sections).map(([sectionKey, payload]) => ({
        key: sectionKey,
        label:
          SECTION_LABEL_OVERRIDES[`${pageKey}.${sectionKey}`] ??
          sectionKey.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()),
        starterPayload: payload,
      })),
    ];
  }),
);

export function getSectionChoices(pageKey) {
  return SECTION_REGISTRY[pageKey] ?? [];
}

export function getStarterPayload(pageKey, sectionKey) {
  const match = getSectionChoices(pageKey).find((s) => s.key === sectionKey);
  return match?.starterPayload ?? {};
}

export function getAllSectionKeys() {
  return PAGE_KEYS.flatMap((pageKey) =>
    getSectionChoices(pageKey).map((s) => ({ pageKey, sectionKey: s.key, label: s.label })),
  );
}
