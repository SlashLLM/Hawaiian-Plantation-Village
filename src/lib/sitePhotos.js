/**
 * Curated public paths from public/digitized-photos for page imagery.
 * Archives catalog entries live separately in staticContent.js PHOTOGRAPHS.
 */

const digi = (name) => `/digitized-photos/${name}`;
// Web-sized header copies (from public/images/Staffphotos and public/digitized-photos originals).
const staffHeader = (page) => `/images/Staffphotos/headers/${page}.webp`;

export const SITE_PHOTOS = {
  heroPoster: digi('IMG_6805.webp'),
  homeWhyVisit: digi('IMG_6115.webp'),
  homeFeatured: '/images/about/okada-education-center-group.webp',
  homeEducators: digi('IMG_6330.webp'),
  aboutMission: '/images/about/hele-mai-foods-exhibit.webp',
  aboutStaff: '/images/Staffphotos/staff-group.jpg',
  storiesFallback: digi('IMG_6122.webp'),
  newsSmokestack: digi('IMG_6810.webp'),
  newsFestival: digi('IMG_6103.webp'),
  headers: {
    visit: staffHeader('visit'),
    explore: staffHeader('explore'),
    stories: staffHeader('stories'),
    learn: staffHeader('learn'),
    events: staffHeader('events'),
    support: staffHeader('support'),
    volunteer: staffHeader('volunteer'),
    play: staffHeader('play'),
    about: staffHeader('about'),
    archives: staffHeader('archives'),
  },
};

// Vertical focal point (object-position) per header so group photos crop around faces.
const HEADER_FOCUS = {
  [SITE_PHOTOS.headers.play]: 'center 48%',
  [SITE_PHOTOS.headers.learn]: 'center 62%',
  [SITE_PHOTOS.headers.visit]: 'center 50%',
  [SITE_PHOTOS.headers.explore]: 'center 50%',
  [SITE_PHOTOS.headers.stories]: 'center 55%',
  [SITE_PHOTOS.headers.events]: 'center 50%',
  [SITE_PHOTOS.headers.support]: 'center 40%',
  [SITE_PHOTOS.headers.volunteer]: 'center 45%',
  [SITE_PHOTOS.headers.about]: 'center 22%',
  [SITE_PHOTOS.headers.archives]: 'center 38%',
};

export const headerImagePosition = (src) => HEADER_FOCUS[src] ?? 'center';
