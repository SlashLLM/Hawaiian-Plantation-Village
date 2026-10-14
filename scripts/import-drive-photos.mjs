import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const SOURCE_DIR = process.argv[2] || 'C:\\Users\\poyil\\Downloads\\drive-download-20260923T055411Z-1-001';
const PUBLIC_DIR = 'public/digitized-photos';
const THUMBS_DIR = path.join(PUBLIC_DIR, 'thumbs');
const OUTPUT_DATA_FILE = 'src/lib/content/photographsData.js';

// Existing 17 seed photographs preserved verbatim
export const ORIGINAL_PHOTOGRAPHS = [
  {
    arkId: 'img_6805',
    title: 'Village path between camp houses and palms',
    imageUrl: '/digitized-photos/IMG_6805.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6805.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Paved path lined with restored cottages, palms, and tropical plantings',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A paved walkway curves through the village between white camp cottages, a croton bush, and tall palm trunks under an overcast sky.',
    relatedArkIds: ['img_6115', 'img_6820'],
    studyNotes:
      'Site paths and plantings date this as museum-era documentation of the living village rather than a plantation-era street scene.',
    provisional: true,
  },
  {
    arkId: 'img_6115',
    title: 'Dark camp cottage with white porch',
    imageUrl: '/digitized-photos/IMG_6115.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6115.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Single-wall camp cottage with dark siding, white porch railings, and an interpretive plaque',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A dark board-and-batten cottage with a white porch and railing sits on a sunny lawn; a small metal plaque marks it as an interpreted exhibit.',
    relatedArkIds: ['img_6122', 'img_6330'],
    studyNotes:
      'The plaque in the foreground is museum evidence: this structure is being read as heritage, not as occupied housing.',
    provisional: true,
  },
  {
    arkId: 'img_6122',
    title: 'Sunlit porch along a white camp house',
    imageUrl: '/digitized-photos/IMG_6122.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6122.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Long porch with lace curtains, screen door, and horseshoe above the doorway',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'Looking down a white camp-house porch: lace curtains in a multi-pane window, a screen door ajar, and a horseshoe mounted above the frame.',
    relatedArkIds: ['img_6115', 'img_6365'],
    studyNotes:
      'Porch depth, rail detail, and door hardware are the kind of construction clues the study guide asks viewers to inventory before guessing date or culture.',
    provisional: true,
  },
  {
    arkId: 'img_6330',
    title: 'Furnished camp interior opening to the lanai',
    imageUrl: '/digitized-photos/IMG_6330.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6330.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Camp house interior with open double doors, woven hats, and a historical group photograph',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'Inside a furnished camp house: open double doors look onto a lanai with red railings; woven hats hang on the wall beside a framed black-and-white group photograph.',
    relatedArkIds: ['img_6115', 'img_6365'],
    studyNotes:
      'Pair this interior with the cottage exterior to practice reading what one frame confirms or complicates about the other.',
    provisional: true,
  },
  {
    arkId: 'img_6365',
    title: 'Camp room with trunks, stool, and books',
    imageUrl: '/digitized-photos/IMG_6365.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6365.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Corner of a furnished camp room with trunks, a three-legged stool, and open books',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A bright camp-house corner: tied lace curtains, stacked trunks with quilts, a low green table holding open books, and a framed group photograph on the wall.',
    relatedArkIds: ['img_6330', 'img_6122'],
    studyNotes:
      'Domestic objects — trunks, quilts, books — are clues to how ethnic historical groups chose to furnish these exhibits.',
    provisional: true,
  },
  {
    arkId: 'img_6400',
    title: 'Household altar between sewing room and kitchen',
    imageUrl: '/digitized-photos/IMG_6400.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6400.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Religious altar with Virgin Mary statue flanked by doorways into adjoining rooms',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A lace-covered altar with a Virgin Mary statue stands against pale green plank walls; doorways open to a sewing machine on one side and a wood stove kitchen on the other.',
    relatedArkIds: ['img_6330', 'img_6350'],
    studyNotes:
      'Faith objects and room adjacencies help identify which ethnic home this exhibit represents and how family life was organized in a small footprint.',
    provisional: true,
  },
  {
    arkId: 'img_6350',
    title: 'Worktable sink in a dark wooden kitchen',
    imageUrl: '/digitized-photos/IMG_6350.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6350.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Historic kitchen or workroom with ceramic sink, enamel bowls, and woven baskets',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'Daylight falls across a timber worktable with a white ceramic sink and enamel bowls; woven baskets and a round mat hang against dark plank walls.',
    relatedArkIds: ['img_6310', 'img_6400'],
    studyNotes:
      'Work surfaces and containers are evidence of daily labor inside the home — cooking, washing, food storage — not only ceremonial display.',
    provisional: true,
  },
  {
    arkId: 'img_6310',
    title: 'Blue shed with watering cans and jars',
    imageUrl: '/digitized-photos/IMG_6310.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6310.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Utility shed interior with long-spout watering cans, glass jars, and a washboard',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A charcoal-blue shed corner holds shelves of jars, a workbench sink, a straw broom, and four long-spout metal watering cans under the bench.',
    relatedArkIds: ['img_6350', 'img_6380'],
    studyNotes:
      'Garden and wash tools document the outdoor labor that supported camp households as much as furniture does indoors.',
    provisional: true,
  },
  {
    arkId: 'img_6380',
    title: 'White outbuilding with packed-earth floor',
    imageUrl: '/digitized-photos/IMG_6380.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6380.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'White-painted wooden outbuilding with dirt floor and open cubby shelving',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A bright white interior with exposed rafters, a packed reddish earth floor, and an open cubby shelf unit beside an open door.',
    relatedArkIds: ['img_6310', 'img_6820'],
    studyNotes:
      'Floor material and roof structure are dating and use clues: packed earth and corrugated roofing point to utility space, not a furnished parlor.',
    provisional: true,
  },
  {
    arkId: 'img_6820',
    title: 'Green cottage with red corrugated roof',
    imageUrl: '/digitized-photos/IMG_6820.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6820.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Small green wooden building with red metal roof and white porch steps under a shade tree',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A forest-green cottage with a bright red corrugated roof and white porch railings sits on a lawn, framed by a large shade tree.',
    relatedArkIds: ['img_6805', 'img_6420'],
    studyNotes:
      'Paint color and roof material help distinguish structures when matching exteriors to interiors across related frames.',
    provisional: true,
  },
  {
    arkId: 'img_6420',
    title: 'Shiroma Saimin stand exhibit',
    imageUrl: '/digitized-photos/IMG_6420.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6420.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Interior exhibit for Shiroma Saimin 1932–1954 with noodle machine and family photographs',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'Looking through glass into the Shiroma Saimin exhibit: a wall sign dated 1932–1954, framed family photographs, ceramic bowls, and a vintage noodle-making machine.',
    relatedArkIds: ['img_6820', 'img_6810'],
    studyNotes:
      'Named businesses and date ranges on exhibit signage are explicit captions — rare in undated field photographs, common in museum interpretation.',
    provisional: true,
  },
  {
    arkId: 'img_6810',
    title: 'Plantation clinic with dental chair',
    imageUrl: '/digitized-photos/IMG_6810.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6810.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Restored medical or dental office with vintage chair, amber bottles, and white cabinets',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A white board-and-batten clinic room holds a purple-upholstered dental chair, amber glass bottles on open shelves, and a window onto a large tree trunk.',
    relatedArkIds: ['img_6420', 'img_6350'],
    studyNotes:
      'Medical equipment and pharmacy bottles document plantation company services — housing was only one part of camp infrastructure.',
    provisional: true,
  },
  {
    arkId: 'img_6103',
    title: 'Red temple porch under blue sky',
    imageUrl: '/digitized-photos/IMG_6103.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6103.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Bright red wooden temple or shrine porch with geometric railing',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'Looking up at a saturated red wooden porch and railing against a clear blue sky, with green foliage framing the structure.',
    relatedArkIds: ['img_6066', 'img_6222'],
    studyNotes:
      'Architectural style and paint color are primary clues when identifying which ethnic community\'s sacred or communal building this is.',
    provisional: true,
  },
  {
    arkId: 'img_6066',
    title: 'Stone memorial markers under a shade tree',
    imageUrl: '/digitized-photos/IMG_6066.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6066.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Upright memorial stones on concrete plinths beneath a leafy tree',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'Dark standing stones on angled concrete bases sit in deep shade beneath a large tree; a wooden fence corner enters the foreground.',
    relatedArkIds: ['img_6103', 'img_6222'],
    studyNotes:
      'Memorial landscapes ask different questions than furnished homes: whose names are present, who is absent, and when the markers were installed.',
    provisional: true,
  },
  {
    arkId: 'img_6222',
    title: 'Camp yard with lamp post and fence',
    imageUrl: '/digitized-photos/IMG_6222.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6222.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Outdoor yard between camp buildings with lamp post, fence, and grassy patch',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'Sunlit asphalt between white and pale-green camp buildings; a plantation-style lamp post stands by a brown fence under a large tree.',
    relatedArkIds: ['img_6805', 'img_6103'],
    studyNotes:
      'Yard spaces between houses are where work, play, and neighbor life happened — look for fences, lamps, and shared open ground.',
    provisional: true,
  },
  {
    arkId: 'img_6271',
    title: 'Timber frame under repair',
    imageUrl: '/digitized-photos/IMG_6271.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6271.webp',
    collection: 'oahu_sugar',
    filingCategory: 'Village site documentation',
    subject: 'Open timber frame of a small building with debris and a stepladder',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A weathered open timber frame with a slanted roof sits on bare earth among construction debris; a stepladder corner enters the foreground.',
    relatedArkIds: ['img_6298'],
    studyNotes:
      'Repair and reconstruction frames document the museum as a working site — preservation is ongoing, not finished.',
    provisional: true,
  },
  {
    arkId: 'img_6298',
    title: 'Elevated wooden frame under construction',
    imageUrl: '/digitized-photos/IMG_6298.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6298.webp',
    collection: 'oahu_sugar',
    filingCategory: 'Village site documentation',
    subject: 'Elevated lumber frame with partial corrugated roofing',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'An elevated wooden frame with diagonal bracing and a partially sheeted roof stands on dirt among dry leaves.',
    relatedArkIds: ['img_6271'],
    studyNotes:
      'Compare framing stages across related construction photos to see how quickly plantation-style structures go up.',
    provisional: true,
  },
  {
    arkId: 'img_6435',
    title: 'Village garden path detail',
    imageUrl: '/digitized-photos/IMG_6435.webp',
    thumbnailUrl: '/digitized-photos/thumbs/IMG_6435.webp',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Garden and path documentation within the village grounds',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 2020s',
    photographer: '',
    caption:
      'A digitized village photograph from the current site documentation set — working title pending staff catalog review.',
    relatedArkIds: ['img_6805', 'img_6222'],
    studyNotes:
      'Use this frame with the path and yard photographs to map how plantings and circulation connect the ethnic homes.',
    provisional: true,
  },
];

const EVENT_CONFIGS = [
  {
    folderKeyword: 'HPV Chinese New Year 2018 folder',
    collection: 'cny_2018',
    prefix: 'cny18',
    titlePrefix: 'Chinese New Year 2018',
    filingCategory: 'Cultural festivals & celebrations',
    subject: 'Chinese New Year celebrations, lion dances, and community festivities',
    circaDate: 'February 3, 2018',
    captionBase: 'Lion dance performances, martial arts demonstrations, and festive community celebration for Chinese New Year 2018 at Hawaii\'s Plantation Village.',
  },
  {
    folderKeyword: 'HPV Rice Festival 2018 folder',
    collection: 'rice_fest_2018',
    prefix: 'rice18',
    titlePrefix: 'Rice Festival 2018',
    filingCategory: 'Agricultural heritage & festivals',
    subject: 'Traditional rice harvesting, mochi pounding, cooking demonstrations, and community celebrations',
    circaDate: 'January 2018',
    captionBase: 'Traditional rice harvesting demonstrations, mochi pounding, cultural cooking, and community celebration during the Rice Festival at Hawaii\'s Plantation Village.',
  },
  {
    folderKeyword: 'Processed Sel Feb 01 HPV New Year folder',
    collection: 'cny_2020',
    prefix: 'cny20',
    titlePrefix: 'Lunar New Year 2020',
    filingCategory: 'Cultural festivals & celebrations',
    subject: 'Lunar New Year celebrations, cultural costumes, exhibits, and village docents',
    circaDate: 'February 1–2, 2020',
    captionBase: 'Lunar New Year cultural presentations, historic village docents, traditional attire, and family festivities at Hawaii\'s Plantation Village.',
  },
  {
    folderKeyword: 'Sel Nov 2 HPV Dedication folder',
    collection: 'hpv_dedication',
    prefix: 'ded19',
    titlePrefix: 'Village Dedication 2019',
    filingCategory: 'Village site documentation & blessings',
    subject: 'Village dedication ceremonies, cultural blessings, and community leaders',
    circaDate: 'November 2, 2019',
    captionBase: 'Cultural dedication ceremony, community blessing, and village gathering on November 2, 2019 at Hawaii\'s Plantation Village.',
  },
];

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

function getMd5(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(buffer).digest('hex');
}

function isFresh(outputPath, inputPath) {
  return fs.existsSync(outputPath) && fs.statSync(outputPath).mtimeMs >= fs.statSync(inputPath).mtimeMs;
}

/**
 * Groups visually similar / rapid burst shots and keeps only ONE best representative per scene.
 */
async function deduplicateBurstPhotos(items) {
  if (items.length <= 1) return items;

  console.log(`Analyzing visual similarity across ${items.length} photos...`);

  // Compute 16x16 grayscale thumbnail buffers and EXIF timestamp for perceptual and burst comparison
  const withBuffers = [];
  for (const item of items) {
    const meta = await sharp(item.filePath).metadata();
    const exifStr = meta.exif ? meta.exif.toString('binary') : '';
    const dateMatch = exifStr.match(/\d{4}:\d{2}:\d{2} \d{2}:\d{2}:\d{2}/);
    let timestamp = 0;
    if (dateMatch) {
      const str = dateMatch[0];
      const iso = str.slice(0, 4) + '-' + str.slice(5, 7) + '-' + str.slice(8, 10) + 'T' + str.slice(11);
      timestamp = new Date(iso).getTime();
    }

    const buf = await sharp(item.filePath)
      .resize(16, 16, { fit: 'fill' })
      .grayscale()
      .raw()
      .toBuffer();
    withBuffers.push({ ...item, buf, timestamp });
  }

  // Connected components clustering:
  // Link pairs if:
  // 1) Taken within 15 seconds AND visually similar (avgDiff < 45) -> burst shots of same subject/setup
  // 2) Or visually very high similarity (avgDiff < 26)
  const parent = {};
  withBuffers.forEach((item) => {
    parent[item.filePath] = item.filePath;
  });

  function find(x) {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent[x]));
  }

  function union(x, y) {
    parent[find(x)] = find(y);
  }

  for (let i = 0; i < withBuffers.length; i++) {
    for (let j = i + 1; j < withBuffers.length; j++) {
      const timeDiffSec = (withBuffers[i].timestamp && withBuffers[j].timestamp)
        ? Math.abs(withBuffers[i].timestamp - withBuffers[j].timestamp) / 1000
        : 999;

      let diff = 0;
      for (let k = 0; k < 256; k++) {
        diff += Math.abs(withBuffers[i].buf[k] - withBuffers[j].buf[k]);
      }
      const avgDiff = diff / 256;
      if ((timeDiffSec <= 15 && avgDiff < 45) || avgDiff < 26) {
        union(withBuffers[i].filePath, withBuffers[j].filePath);
      }
    }
  }

  const clusters = {};
  withBuffers.forEach((item) => {
    const root = find(item.filePath);
    if (!clusters[root]) clusters[root] = [];
    clusters[root].push(item);
  });

  const selected = [];
  let droppedCount = 0;

  for (const cluster of Object.values(clusters)) {
    // Sort chronologically/by filename
    cluster.sort((a, b) => a.cleanBaseName.localeCompare(b.cleanBaseName, undefined, { numeric: true }));

    if (cluster.length === 1) {
      selected.push(cluster[0]);
    } else {
      // Pick the middle frame of the burst sequence
      const chosenIndex = Math.floor(cluster.length / 2);
      const chosen = cluster[chosenIndex];
      const dropped = cluster.filter((_, idx) => idx !== chosenIndex);
      droppedCount += dropped.length;

      console.log(`  -> Burst group of ${cluster.length} similar shots: Keeping ${chosen.cleanBaseName}, dropping ${dropped.length} duplicate frames.`);
      selected.push(chosen);
    }
  }

  console.log(`Deduplication complete: Kept ${selected.length} distinct photos, eliminated ${droppedCount} similar/burst duplicates.`);
  return selected;
}

async function main() {
  console.log(`Scanning source folder: ${SOURCE_DIR}`);
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Error: Source directory ${SOURCE_DIR} does not exist!`);
    process.exit(1);
  }

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.mkdirSync(THUMBS_DIR, { recursive: true });

  const allFiles = getAllFiles(SOURCE_DIR);
  console.log(`Found ${allFiles.length} total image files.`);

  // 1. Exact MD5 hash deduplication (eliminates folder copies)
  const seenHashes = new Set();
  const uniqueItems = [];

  for (const filePath of allFiles) {
    const hash = getMd5(filePath);
    if (seenHashes.has(hash)) {
      continue;
    }
    seenHashes.add(hash);

    const normalizedPath = filePath.replace(/\\/g, '/');
    const config = EVENT_CONFIGS.find((cfg) => normalizedPath.includes(cfg.folderKeyword));
    if (!config) {
      console.warn(`Unmatched event folder for file: ${filePath}`);
      continue;
    }

    const filename = path.basename(filePath);
    const cleanBaseName = filename
      .replace(/\.(jpe?g|png)$/i, '')
      .replace(/^[_]/, '')
      .replace(/\s+/g, '_')
      .toLowerCase();

    uniqueItems.push({
      filePath,
      hash,
      config,
      cleanBaseName,
    });
  }

  console.log(`Identified ${uniqueItems.length} unique photos by MD5.`);

  // 2. Group by collection
  const itemsByCollection = {};
  for (const item of uniqueItems) {
    const coll = item.config.collection;
    if (!itemsByCollection[coll]) itemsByCollection[coll] = [];
    itemsByCollection[coll].push(item);
  }

  const processedPhotographs = [];
  const validOutputSlugs = new Set();

  for (const [collectionId, items] of Object.entries(itemsByCollection)) {
    console.log(`\nProcessing collection ${collectionId} (${items.length} candidate photos)...`);
    
    // Sort items consistently
    items.sort((a, b) => a.cleanBaseName.localeCompare(b.cleanBaseName, undefined, { numeric: true }));

    // 3. Perceptual burst deduplication: Keep only 1 photo from each group of visually similar photos
    const distinctItems = await deduplicateBurstPhotos(items);
    distinctItems.sort((a, b) => a.cleanBaseName.localeCompare(b.cleanBaseName, undefined, { numeric: true }));

    for (let i = 0; i < distinctItems.length; i++) {
      const item = distinctItems[i];
      const seq = String(i + 1).padStart(3, '0');
      const slug = `${item.config.prefix}_${seq}_${item.cleanBaseName}`;
      const arkId = slug;
      validOutputSlugs.add(slug);

      const outputFullWebp = path.join(PUBLIC_DIR, `${slug}.webp`);
      const outputThumbWebp = path.join(THUMBS_DIR, `${slug}.webp`);

      // Optimize images using sharp
      if (!isFresh(outputFullWebp, item.filePath)) {
        await sharp(item.filePath)
          .rotate() // respect EXIF rotation
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputFullWebp);
      }

      if (!isFresh(outputThumbWebp, item.filePath)) {
        await sharp(item.filePath)
          .rotate()
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 72 })
          .toFile(outputThumbWebp);
      }

      // Pick 2 neighboring photos as related photos
      const prevArkId = i > 0 ? `${distinctItems[i - 1].config.prefix}_${String(i).padStart(3, '0')}_${distinctItems[i - 1].cleanBaseName}` : null;
      const nextArkId = i < distinctItems.length - 1 ? `${distinctItems[i + 1].config.prefix}_${String(i + 2).padStart(3, '0')}_${distinctItems[i + 1].cleanBaseName}` : null;
      const relatedArkIds = [prevArkId, nextArkId].filter(Boolean);

      processedPhotographs.push({
        arkId,
        title: `${item.config.titlePrefix} — Photograph #${i + 1}`,
        imageUrl: `/digitized-photos/${slug}.webp`,
        thumbnailUrl: `/digitized-photos/thumbs/${slug}.webp`,
        collection: collectionId,
        filingCategory: item.config.filingCategory,
        subject: item.config.subject,
        donor: "Friends of Waipahu Cultural Garden Park",
        accessionNumber: `HPV-${item.config.prefix.toUpperCase()}-${seq}`,
        circaDate: item.config.circaDate,
        photographer: "Hawaii's Plantation Village Archives",
        caption: `${item.config.captionBase} (Frame ${item.cleanBaseName})`,
        relatedArkIds,
        studyNotes: `Digitized event documentation from ${item.config.circaDate} at Hawaii's Plantation Village.`,
        provisional: true,
      });

      if ((i + 1) % 20 === 0 || i === distinctItems.length - 1) {
        console.log(`  Saved ${i + 1}/${distinctItems.length} photos in ${collectionId}`);
      }
    }
  }

  // Cleanup any old generated event webp files that were dropped in deduplication
  const prefixes = EVENT_CONFIGS.map(c => c.prefix);
  for (const dir of [PUBLIC_DIR, THUMBS_DIR]) {
    const existing = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
    for (const file of existing) {
      const isEventFile = prefixes.some(p => file.startsWith(`${p}_`));
      if (isEventFile) {
        const slug = file.replace('.webp', '');
        if (!validOutputSlugs.has(slug)) {
          fs.unlinkSync(path.join(dir, file));
          console.log(`Cleaned up obsolete file: ${path.join(dir, file)}`);
        }
      }
    }
  }

  // Combine original photos + newly processed photos
  const fullCatalog = [...ORIGINAL_PHOTOGRAPHS, ...processedPhotographs];
  console.log(`\nTotal catalog entries: ${fullCatalog.length} photographs.`);

  // Write out src/lib/content/photographsData.js
  const fileContent = `/**
 * Complete catalog of digitized photographs for Hawaii's Plantation Village.
 * Contains ${ORIGINAL_PHOTOGRAPHS.length} permanent historical seed items and ${processedPhotographs.length} digitized festival/event items (with duplicate and burst shots pruned).
 *
 * Generated automatically by scripts/import-drive-photos.mjs
 */

export const PHOTOGRAPHS = ${JSON.stringify(fullCatalog, null, 2)};
`;

  fs.writeFileSync(OUTPUT_DATA_FILE, fileContent, 'utf-8');
  console.log(`Successfully generated ${OUTPUT_DATA_FILE}!`);
}

main().catch((err) => {
  console.error('Fatal error during photo import:', err);
  process.exit(1);
});
