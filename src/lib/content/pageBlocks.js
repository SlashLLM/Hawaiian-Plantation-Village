import { BLANK_LINK } from './links.js';

/**
 * Block vocabulary for the visual page builder.
 *
 * Declared the same way section_form_schemas declares page sections: each block
 * type carries a label, a blank item and a flat field list. The admin form
 * renderer and the public renderer both read from here, so adding a block type
 * means adding one entry plus one small render component.
 */

export const BACKGROUND_CHOICES = [
  { value: 'default', label: 'Cream (default)' },
  { value: 'sand', label: 'Sand' },
  { value: 'ink', label: 'Dark ink' },
];

/** Maps a block background onto the site's editorial-section modifiers. */
export function backgroundClass(background) {
  if (background === 'sand') return 'editorial-section on-sand';
  if (background === 'ink') return 'editorial-section on-ink';
  return 'editorial-section';
}

const text = (key, label, opts = {}) => ({ key, label, type: 'text', ...opts });
const textarea = (key, label, opts = {}) => ({ key, label, type: 'textarea', ...opts });
const paragraphs = (key = 'paragraphs', label = 'Paragraphs') => ({ key, label, type: 'paragraphs' });
const image = (key = 'image', label = 'Image', altKey = 'imageAlt') => ({ key, label, type: 'image', altKey });
const select = (key, label, options) => ({ key, label, type: 'select', options });
const objectList = (key, label, itemLabel, blankItem, fields) => ({
  key, label, itemLabel, blankItem, fields, type: 'objectList',
});
const link = (key = 'link', label = 'Button') => ({ key, label, type: 'link' });

export const BLOCK_TYPES = {
  hero: {
    label: 'Hero header',
    hint: 'Full-width image header with a stamp, title and subtitle.',
    blank: { stamp: '', title: '', subtitle: '', image: '', imageAlt: '' },
    fields: [
      image('image', 'Header image', 'imageAlt'),
      text('stamp', 'Eyebrow / stamp'),
      text('title', 'Title', { full: true }),
      textarea('subtitle', 'Subtitle', { rows: 2 }),
    ],
    supportsBackground: false,
  },
  richText: {
    label: 'Text section',
    hint: 'An eyebrow, a heading and one or more paragraphs.',
    blank: { eyebrow: '', title: '', paragraphs: [''] },
    fields: [
      text('eyebrow', 'Eyebrow'),
      text('title', 'Heading', { full: true }),
      paragraphs(),
    ],
  },
  twoColumn: {
    label: 'Text + image',
    hint: 'Copy beside a picture or event details.',
    blank: { imageSide: 'left', image: '', imageAlt: '', eyebrow: '', title: '', paragraphs: [''], items: [] },
    fields: [
      image('image', 'Image', 'imageAlt'),
      select('imageSide', 'Image on the', [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ]),
      text('eyebrow', 'Eyebrow'),
      text('title', 'Heading', { full: true }),
      paragraphs(),
      objectList(
        'items',
        'Event details (optional)',
        'Detail',
        { label: '', value: '' },
        [text('label', 'Label'), text('value', 'Value')],
      ),
    ],
  },
  image: {
    label: 'Single image',
    hint: 'One picture with an optional caption.',
    blank: { image: '', imageAlt: '', caption: '' },
    fields: [
      image('image', 'Image', 'imageAlt'),
      text('caption', 'Caption', { full: true }),
    ],
  },
  gallery: {
    label: 'Photo gallery',
    hint: 'A grid of pictures.',
    blank: { title: '', items: [] },
    fields: [
      text('title', 'Heading', { full: true }),
      objectList(
        'items',
        'Photos',
        'Photo',
        { image: '', imageAlt: '', caption: '' },
        [
          image('image', 'Image', 'imageAlt'),
          text('caption', 'Caption', { full: true }),
        ],
      ),
    ],
  },
  details: {
    label: 'Details list',
    hint: 'Date, time, location, admission — label and value pairs.',
    blank: {
      title: 'Event details',
      items: [{ label: '', value: '' }],
    },
    fields: [
      text('title', 'Heading', { full: true }),
      objectList(
        'items',
        'Details',
        'Detail',
        { label: '', value: '' },
        [text('label', 'Label'), text('value', 'Value')],
      ),
    ],
    defaultBackground: 'sand',
  },
  quote: {
    label: 'Pull quote',
    hint: 'A highlighted quotation.',
    blank: { quote: '', attribution: '' },
    fields: [
      textarea('quote', 'Quote', { rows: 3, full: true }),
      text('attribution', 'Attribution'),
    ],
    defaultBackground: 'sand',
  },
  cta: {
    label: 'Call to action',
    hint: 'A heading, a line of copy and a button.',
    blank: { title: '', description: '', link: { ...BLANK_LINK, enabled: true, label: 'Buy Tickets' } },
    fields: [
      text('title', 'Heading', { full: true }),
      textarea('description', 'Description', { rows: 2 }),
      link('link', 'Button'),
    ],
    defaultBackground: 'ink',
  },
  video: {
    label: 'Video',
    hint: 'An embedded video from YouTube or Vimeo.',
    blank: { url: '', title: '' },
    fields: [
      text('url', 'Video URL', { full: true }),
      text('title', 'Accessible title', { full: true }),
    ],
  },
};

export const BLOCK_TYPE_KEYS = Object.keys(BLOCK_TYPES);

export function getBlockType(type) {
  return BLOCK_TYPES[type] ?? null;
}

export function blockTypeLabel(type) {
  return BLOCK_TYPES[type]?.label ?? type;
}

let blockCounter = 0;

/** Stable-enough id for React keys and block addressing within one page. */
export function createBlockId() {
  blockCounter += 1;
  return `blk-${Date.now().toString(36)}-${blockCounter.toString(36)}`;
}

export function createBlock(type) {
  const definition = BLOCK_TYPES[type];
  if (!definition) return null;
  return {
    id: createBlockId(),
    type,
    background: definition.defaultBackground ?? 'default',
    ...structuredClone(definition.blank),
  };
}

/**
 * Turn a YouTube or Vimeo URL into its embed form. Returns null for anything
 * that isn't a recognised http(s) video URL, so the renderer shows nothing
 * rather than framing an arbitrary page.
 */
export function toVideoEmbedUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return null;
  let parsed;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;

  const host = parsed.hostname.replace(/^www\./, '');

  if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.pathname.startsWith('/embed/')) {
      return `https://www.youtube.com${parsed.pathname}`;
    }
    return null;
  }
  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (host === 'vimeo.com') {
    const id = parsed.pathname.split('/').filter(Boolean)[0];
    return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
  }
  if (host === 'player.vimeo.com') {
    return parsed.toString();
  }
  return null;
}
