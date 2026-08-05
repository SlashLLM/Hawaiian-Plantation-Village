/**
 * Curated public paths from public/digitized-photos for page imagery.
 * Archives catalog entries live separately in fallbacks.js PHOTOGRAPHS.
 */

const digi = (name) => `/digitized-photos/${name}`;

export const SITE_PHOTOS = {
  heroPoster: digi('IMG_6805.jpeg'),
  homeWhyVisit: digi('IMG_6115.jpeg'),
  homeFeatured: digi('IMG_6420.jpeg'),
  homeEducators: digi('IMG_6330.jpeg'),
  aboutMission: digi('IMG_6066.jpeg'),
  storiesFallback: digi('IMG_6122.jpeg'),
  newsSmokestack: digi('IMG_6810.jpeg'),
  newsFestival: digi('IMG_6103.jpeg'),
  headers: {
    visit: digi('IMG_6820.jpeg'),
    stories: digi('IMG_6103.jpeg'),
    learn: digi('IMG_6365.jpeg'),
    support: digi('IMG_6222.jpeg'),
    play: digi('IMG_6066.jpeg'),
    about: digi('IMG_6825.jpeg'),
  },
};
