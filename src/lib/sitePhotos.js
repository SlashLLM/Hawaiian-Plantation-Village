/**
 * Curated public paths from public/digitized-photos for page imagery.
 * Archives catalog entries live separately in fallbacks.js PHOTOGRAPHS.
 */

const digi = (name) => `/digitized-photos/${name}`;

export const SITE_PHOTOS = {
  heroPoster: digi('IMG_6805.webp'),
  homeWhyVisit: digi('IMG_6115.webp'),
  homeFeatured: digi('IMG_6420.webp'),
  homeEducators: digi('IMG_6330.webp'),
  aboutMission: digi('IMG_6066.webp'),
  storiesFallback: digi('IMG_6122.webp'),
  newsSmokestack: digi('IMG_6810.webp'),
  newsFestival: digi('IMG_6103.webp'),
  headers: {
    visit: digi('IMG_6820.webp'),
    stories: digi('IMG_6103.webp'),
    learn: digi('IMG_6365.webp'),
    support: digi('IMG_6222.webp'),
    play: digi('IMG_6066.webp'),
    about: digi('IMG_6825.webp'),
  },
};
