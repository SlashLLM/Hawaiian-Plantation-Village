/**
 * Static copy from the printed "Welcome to Hawaii's Plantation Village" brochure.
 *
 * Deliberately not CMS-backed: pages import these directly so the official
 * brochure wording is always shown as printed.
 */

export const VISIT_DIRECTIONS = {
  intro: 'Located approximately 30 minutes from Waikīkī and Honolulu.',
  steps: [
    'Take H1 West to exit #7 (Waikele/Waipahu).',
    'Coming off H1, turn left at the stoplight onto Paiwa St.',
    'Turn right at the 5th traffic signal onto Waipahu St.',
    'Entrance is on your left.',
  ],
};

export const TOUR_SLOTS = [
  { label: 'Morning tour', time: '10:00 AM, Monday – Saturday' },
];

export const TOUR_NOTE =
  'Guided tours run Monday – Saturday at 10:00 AM, led by bilingual guides who "talk story." Call (808) 677-0110 to reserve. Self-tours are also available.';

export const MISSION_STATEMENT = {
  statement:
    'The Friends of Waipahu Cultural Garden Park, a non-profit educational organization, has as its purpose ensuring that the experiences, lifestyles, struggles, sacrifices, innovations and contributions of our plantation forebearers are known, acknowledged, and visible as the cornerstones of Hawaiʻi\'s successful multicultural society.',
  operations:
    'The Friends operate and maintain Hawaii\'s Plantation Village, a collection of historic and reconstructed plantation buildings and adjacent land, and the Okada Educational Center, an archival collection, exhibition, and classroom facility.',
};

export const BROCHURE_TIMELINE = [
  {
    year: '1835',
    event:
      'The first successful sugar plantation in Hawaiʻi gets its start in Kōloa, Kauaʻi. From the start, workers are paid not in cash but in coupons or scrip redeemable at the plantation store, and identified not by family name but by numbered metal bango tags.',
  },
  {
    year: '1868',
    event: 'The first group of Japanese workers arrives to work on Hawaiʻi\'s sugar plantations.',
  },
  {
    year: '1875',
    event:
      'The Reciprocity Treaty grants Hawaiʻi the right to export sugar duty-free to the United States. Together with demand from the 1848 California Gold Rush and the 1861 Civil War, it fuels the rapid expansion of Hawaiian sugar plantations.',
  },
  {
    year: '1885',
    event:
      'Plantations now provide workers housing, some food and medical care, with wages of $9 a month for men and $6 a month for women.',
  },
  {
    year: '1900',
    event: 'Puerto Rican workers arrive, followed by Okinawan workers in the early 1900s.',
  },
  {
    year: '1910',
    event: 'Major Filipino immigration takes place, four years after the first Filipino workers arrived in 1906.',
  },
];

/** Merges CMS timeline items with the brochure milestones, sorted by year. */
export function mergeTimeline(items = [], extra = BROCHURE_TIMELINE) {
  const seen = new Set(items.map((item) => `${item.year}|${item.event}`));
  const merged = [...items, ...extra.filter((item) => !seen.has(`${item.year}|${item.event}`))];
  const yearOf = (item) => {
    const match = String(item.year ?? '').match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 9999;
  };
  return merged
    .map((item, index) => ({ item, index }))
    .sort((a, b) => yearOf(a.item) - yearOf(b.item) || a.index - b.index)
    .map(({ item }) => item);
}

export const VILLAGE_LAYOUT = [
  'What you will experience at Hawaii\'s Plantation Village is an overview of plantation buildings that could be found on many sugar plantations throughout Hawaiʻi in the early 1900s.',
  'The Village is not laid out as a typical campsite. Camps were often a close cluster of small, square, three-room structures with their front doors facing each other, and a narrow road winding down the center. Here, a barber shop, community furo, infirmary, garage, store, camp office and social/union hall give you an impression of the other buildings that were part of the plantation setting.',
  'Each home is furnished with items that reflect its ethnic group from around 1900 to the late 1930s, and each is set for a day that group selected. The Filipino family home is set for a baptismal party, and the Japanese Christian home is set for bible study.',
];

export const VILLAGE_BUILDINGS = [
  { name: 'Hālau Waʻa & Hawaiian Hale Moe', year: '1850', cultureId: 'hawaiian' },
  { name: 'Loʻi Kalo', cultureId: 'hawaiian' },
  { name: 'Plantation Store', year: '1900' },
  { name: 'Puerto Rican House', year: '1900s', cultureId: 'puerto_rican' },
  { name: 'Chinese Society Building', year: '1909', cultureId: 'chinese' },
  { name: 'Japanese Duplex', year: '1910', cultureId: 'japanese' },
  { name: 'Korean House', year: '1910', cultureId: 'korean' },
  { name: 'Wakamiya Inari Shrine', year: '1914', cultureId: 'japanese' },
  { name: 'Infirmary', year: '1915' },
  { name: 'Portuguese House', year: '1918', cultureId: 'portuguese' },
  { name: 'Okinawan House', year: '1919', cultureId: 'okinawan' },
  { name: 'Social/Union Hall', year: '1920s' },
  { name: 'Japanese Christian House', year: '1930s', cultureId: 'japanese' },
  { name: 'Camp Office', year: '1930s' },
  { name: 'Filipino House', year: '1935', cultureId: 'filipino' },
  { name: 'Saimin Stand', year: '1940' },
  { name: 'Portuguese Forno', cultureId: 'portuguese' },
  { name: 'Tofu-ya', cultureId: 'japanese' },
  { name: 'Community Furo', cultureId: 'japanese' },
  { name: 'Plantation Hale' },
  { name: 'Barber Shop' },
  { name: 'Lua' },
  { name: 'Fish Pond' },
  { name: 'Time Tunnel' },
];

export function buildingsForCulture(cultureId) {
  return VILLAGE_BUILDINGS.filter((building) => building.cultureId === cultureId);
}
