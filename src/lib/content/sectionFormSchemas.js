/**
 * Declarative form schemas for known page section payloads.
 * Keyed as `${pageKey}.${sectionKey}`.
 *
 * Field types:
 * - text | textarea | number
 * - stampHeader { includeSubtitle?, includeStamp?, includeStampClass?, titlePath? }
 * - infoBlock { path, label }
 * - cta { path, label }
 * - paragraphs { path }
 * - stringList { path, label, itemLabel? }
 * - objectList { path, label, itemLabel?, blankItem, fields: [{ key, label, type }] }
 */

const STAMP_HEADER = { type: 'stampHeader', includeSubtitle: true };
const STAMP_HEADER_NO_SUB = { type: 'stampHeader', includeSubtitle: false };
const STAMP_TITLE_ONLY = {
  type: 'stampHeader',
  includeSubtitle: false,
  includeStampClass: false,
  includeStamp: true,
};

function text(path, label, opts = {}) {
  return { type: 'text', path, label, ...opts };
}

function textarea(path, label, opts = {}) {
  return { type: 'textarea', path, label, ...opts };
}

function paragraphs(path = 'paragraphs') {
  return { type: 'paragraphs', path, label: 'Paragraphs' };
}

function cta(path, label = 'Call to action') {
  return { type: 'cta', path, label };
}

function stringList(path, label, itemLabel = 'Item') {
  return { type: 'stringList', path, label, itemLabel };
}

function infoBlock(path, label) {
  return { type: 'infoBlock', path, label };
}

function objectList(path, label, blankItem, fields, itemLabel = 'Item') {
  return { type: 'objectList', path, label, blankItem, fields, itemLabel };
}

const SECTION_FORM_SCHEMAS = {
  // --- Home ---
  'home.quickVisit': {
    groups: [
      { title: 'Hours', fields: [infoBlock('hours', 'Hours')] },
      { title: 'Location', fields: [infoBlock('location', 'Location')] },
      { title: 'Admission', fields: [infoBlock('admission', 'Admission')] },
    ],
  },
  'home.whyVisit': {
    groups: [
      { title: 'Header', fields: [STAMP_HEADER_NO_SUB] },
      { title: 'Body', fields: [paragraphs()] },
      {
        title: 'Calls to action',
        fields: [
          cta('primaryCta', 'Primary CTA'),
          cta('secondaryCta', 'Secondary CTA'),
        ],
      },
    ],
  },
  'home.featuredBango': {
    groups: [
      { title: 'Header', fields: [STAMP_HEADER_NO_SUB] },
      { title: 'Body', fields: [paragraphs()] },
      {
        title: 'Quote',
        fields: [
          textarea('quote', 'Quote'),
          text('quoteCite', 'Citation'),
        ],
      },
      { title: 'Call to action', fields: [cta('cta')] },
    ],
  },
  'home.bellToBell': {
    groups: [
      {
        title: 'Content',
        fields: [STAMP_HEADER_NO_SUB, textarea('description', 'Description')],
      },
    ],
  },
  'home.educators': {
    groups: [
      { title: 'Header', fields: [STAMP_HEADER_NO_SUB] },
      { title: 'Body', fields: [paragraphs()] },
      { title: 'Call to action', fields: [cta('cta')] },
    ],
  },
  'home.getInvolved': {
    groups: [
      {
        title: 'Header',
        fields: [STAMP_HEADER_NO_SUB, textarea('description', 'Description')],
      },
      {
        title: 'Donation',
        fields: [
          text('donation.title', 'Title'),
          textarea('donation.description', 'Description'),
          objectList(
            'donation.items',
            'Donation presets',
            { amount: '', label: '' },
            [
              { key: 'amount', label: 'Amount', type: 'text' },
              { key: 'label', label: 'Label', type: 'text' },
            ],
            'Preset',
          ),
          cta('donation.cta', 'Donation CTA'),
        ],
      },
      {
        title: 'Membership',
        fields: [
          text('membership.title', 'Title'),
          textarea('membership.description', 'Description'),
          objectList(
            'membership.items',
            'Benefits',
            { label: '', text: '' },
            [
              { key: 'label', label: 'Label', type: 'text' },
              { key: 'text', label: 'Text', type: 'text' },
            ],
            'Benefit',
          ),
          cta('membership.cta', 'Membership CTA'),
        ],
      },
    ],
  },
  'home.eventsHeader': {
    groups: [{ title: 'Header', fields: [STAMP_HEADER_NO_SUB] }],
  },
  'home.testimonialsHeader': {
    groups: [
      {
        title: 'Content',
        fields: [STAMP_HEADER_NO_SUB, textarea('description', 'Description')],
      },
    ],
  },
  'home.events': {
    groups: [
      {
        title: 'Programs & events',
        fields: [
          objectList(
            'items',
            'Events',
            { slug: '', date: '', title: '', time: '', desc: '', image: '' },
            [
              { key: 'slug', label: 'Slug', type: 'text' },
              { key: 'date', label: 'Date label', type: 'text' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'time', label: 'Time', type: 'text' },
              { key: 'desc', label: 'Description', type: 'textarea' },
              { key: 'image', label: 'Image URL', type: 'text' },
            ],
            'Event',
          ),
        ],
      },
    ],
  },
  'home.testimonials': {
    groups: [
      {
        title: 'Testimonials',
        fields: [
          objectList(
            'items',
            'Testimonials',
            { slug: '', quote: '', authorName: '', authorMeta: '' },
            [
              { key: 'slug', label: 'Slug', type: 'text' },
              { key: 'quote', label: 'Quote', type: 'textarea' },
              { key: 'authorName', label: 'Author name', type: 'text' },
              { key: 'authorMeta', label: 'Author meta', type: 'text' },
            ],
            'Testimonial',
          ),
        ],
      },
    ],
  },
  'home.partners': {
    groups: [
      {
        title: 'Partners',
        fields: [
          objectList(
            'items',
            'Partners',
            { slug: '', name: '' },
            [
              { key: 'slug', label: 'Slug', type: 'text' },
              { key: 'name', label: 'Name', type: 'text' },
            ],
            'Partner',
          ),
        ],
      },
    ],
  },

  // --- Visit ---
  'visit.header': {
    groups: [{ title: 'Header', fields: [STAMP_HEADER] }],
  },
  'visit.hours': {
    groups: [
      {
        title: 'Hours',
        fields: [
          text('title', 'Title'),
          text('schedule', 'Schedule'),
          textarea('closedNote', 'Closed note'),
          textarea('toursIntro', 'Tours intro'),
          objectList(
            'tourSlots',
            'Tour slots',
            { label: '', time: '' },
            [
              { key: 'label', label: 'Label', type: 'text' },
              { key: 'time', label: 'Time', type: 'text' },
            ],
            'Slot',
          ),
          textarea('walkInNote', 'Walk-in note'),
        ],
      },
    ],
  },
  'visit.parking': {
    groups: [
      {
        title: 'Parking & directions',
        fields: [
          text('address', 'Address'),
          textarea('directions', 'Directions'),
          text('parkingTitle', 'Parking title'),
          textarea('parkingDesc', 'Parking description'),
        ],
      },
    ],
  },
  'visit.safety': {
    groups: [
      {
        title: 'Safety & guidelines',
        fields: [
          text('terrainTitle', 'Terrain title'),
          textarea('terrainDesc', 'Terrain description'),
          text('guidelinesTitle', 'Guidelines title'),
          textarea('guidelinesDesc', 'Guidelines description'),
        ],
      },
    ],
  },
  'visit.group': {
    groups: [
      {
        title: 'Group visits',
        fields: [
          text('title', 'Title'),
          textarea('intro', 'Intro'),
          text('commercialTitle', 'Commercial title'),
          textarea('commercialDesc', 'Commercial description'),
          stringList('groupTypes', 'Group types', 'Type'),
        ],
      },
    ],
  },
  'visit.admission': {
    groups: [
      {
        title: 'Admission',
        fields: [
          text('title', 'Title'),
          textarea('description', 'Description'),
          objectList(
            'rates',
            'Rates',
            { label: '', price: '' },
            [
              { key: 'label', label: 'Category', type: 'text' },
              { key: 'price', label: 'Price', type: 'text' },
            ],
            'Rate',
          ),
          text('buttonLabel', 'Book button label'),
          { type: 'page', path: 'buttonPage', label: 'Book button page' },
        ],
      },
      {
        title: 'School CTA',
        fields: [
          text('schoolCta.title', 'Title'),
          textarea('schoolCta.description', 'Description'),
          text('schoolCta.buttonLabel', 'Button label'),
          { type: 'page', path: 'schoolCta.page', label: 'Page' },
        ],
      },
      {
        title: 'Group CTA',
        fields: [
          text('groupCta.title', 'Title'),
          textarea('groupCta.description', 'Description'),
          text('groupCta.buttonLabel', 'Button label'),
        ],
      },
    ],
  },
  'visit.faq': {
    groups: [
      {
        title: 'FAQs',
        fields: [
          text('title', 'Section title'),
          objectList(
            'items',
            'Questions',
            { q: '', a: '' },
            [
              { key: 'q', label: 'Question', type: 'text' },
              { key: 'a', label: 'Answer', type: 'textarea' },
            ],
            'FAQ',
          ),
        ],
      },
    ],
  },

  // --- About ---
  'about.header': {
    groups: [{ title: 'Header', fields: [STAMP_HEADER] }],
  },
  'about.mission': {
    groups: [
      {
        title: 'Mission',
        fields: [STAMP_TITLE_ONLY, paragraphs()],
      },
    ],
  },
  'about.timelineIntro': {
    groups: [
      {
        title: 'Timeline intro',
        fields: [STAMP_HEADER_NO_SUB, textarea('description', 'Description')],
      },
    ],
  },
  'about.leadershipIntro': {
    groups: [{ title: 'Leadership', fields: [text('title', 'Title')] }],
  },
  'about.newsIntro': {
    groups: [
      {
        title: 'News intro',
        fields: [
          {
            type: 'stampHeader',
            includeSubtitle: false,
            includeStampClass: false,
            includeStamp: true,
          },
        ],
      },
    ],
  },
  'about.careersIntro': {
    groups: [
      {
        title: 'Careers intro',
        fields: [
          {
            type: 'stampHeader',
            includeSubtitle: false,
            includeStampClass: false,
            includeStamp: true,
          },
          textarea('description', 'Description'),
        ],
      },
    ],
  },
  'about.contactIntro': {
    groups: [
      {
        title: 'Contact intro',
        fields: [
          {
            type: 'stampHeader',
            includeSubtitle: false,
            includeStampClass: false,
            includeStamp: true,
          },
          textarea('description', 'Description'),
          stringList('subjectOptions', 'Subject options', 'Subject'),
        ],
      },
    ],
  },
  'about.news': {
    groups: [
      {
        title: 'News articles',
        fields: [
          objectList(
            'items',
            'Articles',
            { slug: '', title: '', date: '', category: '', summary: '', content: '', image: '' },
            [
              { key: 'slug', label: 'Slug', type: 'text' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'date', label: 'Date', type: 'text' },
              { key: 'category', label: 'Category', type: 'text' },
              { key: 'summary', label: 'Summary', type: 'textarea' },
              { key: 'content', label: 'Content', type: 'textarea' },
              { key: 'image', label: 'Image URL', type: 'text' },
            ],
            'Article',
          ),
        ],
      },
    ],
  },
  'about.careers': {
    groups: [
      {
        title: 'Careers',
        fields: [
          objectList(
            'items',
            'Jobs',
            {
              slug: '',
              title: '',
              type: '',
              department: '',
              compensation: '',
              hours: '',
              summary: '',
              responsibilities: [],
              requirements: [],
            },
            [
              { key: 'slug', label: 'Slug', type: 'text' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'type', label: 'Type', type: 'text' },
              { key: 'department', label: 'Department', type: 'text' },
              { key: 'compensation', label: 'Compensation', type: 'text' },
              { key: 'hours', label: 'Hours', type: 'text' },
              { key: 'summary', label: 'Summary', type: 'textarea' },
              { key: 'responsibilities', label: 'Responsibilities', type: 'stringList', itemLabel: 'Responsibility' },
              { key: 'requirements', label: 'Requirements', type: 'stringList', itemLabel: 'Requirement' },
            ],
            'Job',
          ),
        ],
      },
    ],
  },
  'about.timeline': {
    groups: [
      {
        title: 'Timeline',
        fields: [
          objectList(
            'items',
            'Milestones',
            { year: '', event: '' },
            [
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'event', label: 'Event', type: 'textarea' },
            ],
            'Milestone',
          ),
        ],
      },
    ],
  },
  'about.leadership': {
    groups: [
      {
        title: 'Leadership',
        fields: [
          objectList(
            'items',
            'Leaders',
            { slug: '', name: '', role: '', desc: '' },
            [
              { key: 'slug', label: 'Slug', type: 'text' },
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'role', label: 'Role', type: 'text' },
              { key: 'desc', label: 'Bio', type: 'textarea' },
            ],
            'Leader',
          ),
        ],
      },
    ],
  },

  // --- Stories ---
  'stories.header': {
    groups: [{ title: 'Header', fields: [STAMP_HEADER] }],
  },

  // --- Learn ---
  'learn.school': {
    groups: [
      {
        title: 'School programs',
        fields: [
          STAMP_HEADER,
          textarea('resourcesIntro', 'Resources intro'),
          textarea('fieldTripNote', 'Field trip note'),
        ],
      },
    ],
  },
  'learn.youth': {
    groups: [
      {
        title: 'Youth programs',
        fields: [
          STAMP_HEADER,
          objectList(
            'programs',
            'Programs',
            { slug: '', type: '', title: '', desc: '', schedule: '' },
            [
              { key: 'slug', label: 'Slug', type: 'text' },
              { key: 'type', label: 'Type', type: 'text' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'desc', label: 'Description', type: 'textarea' },
              { key: 'schedule', label: 'Schedule', type: 'text' },
            ],
            'Program',
          ),
        ],
      },
    ],
  },
  'learn.family': {
    groups: [
      {
        title: 'Family programs',
        fields: [
          STAMP_HEADER,
          objectList(
            'workshops',
            'Workshops',
            { slug: '', type: '', title: '', desc: '', schedule: '' },
            [
              { key: 'slug', label: 'Slug', type: 'text' },
              { key: 'type', label: 'Type', type: 'text' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'desc', label: 'Description', type: 'textarea' },
              { key: 'schedule', label: 'Schedule', type: 'text' },
            ],
            'Workshop',
          ),
        ],
      },
    ],
  },

  // --- Play ---
  'play.header': {
    groups: [{ title: 'Header', fields: [STAMP_HEADER] }],
  },
  'play.gameSteps': {
    groups: [
      {
        title: 'Game steps',
        fields: [
          objectList(
            'steps',
            'Steps',
            { step: 1, title: '', instruction: '', history: '' },
            [
              { key: 'step', label: 'Step number', type: 'number' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'instruction', label: 'Instruction', type: 'textarea' },
              { key: 'history', label: 'History', type: 'textarea' },
            ],
            'Step',
          ),
        ],
      },
    ],
  },

  // --- Support ---
  'support.header': {
    groups: [{ title: 'Header', fields: [STAMP_HEADER] }],
  },
  'support.donate': {
    groups: [
      {
        title: 'Donate',
        fields: [
          text('title', 'Title'),
          textarea('description', 'Description'),
        ],
      },
    ],
  },
  'support.membershipIntro': {
    groups: [
      {
        title: 'Membership intro',
        fields: [
          text('title', 'Title'),
          textarea('description', 'Description'),
        ],
      },
    ],
  },
  'support.impactSidebar': {
    groups: [
      {
        title: 'Impact sidebar',
        fields: [
          text('title', 'Title'),
          stringList('items', 'Impact items', 'Item'),
          text('extraItem', 'Extra item (optional)'),
        ],
      },
    ],
  },

  // --- Tickets ---
  'tickets.header': {
    groups: [{ title: 'Header', fields: [STAMP_HEADER] }],
  },
};

export function getSectionFormSchema(pageKey, sectionKey) {
  if (!pageKey || !sectionKey || sectionKey === '__custom__') return null;
  return SECTION_FORM_SCHEMAS[`${pageKey}.${sectionKey}`] ?? null;
}

export function hasSectionFormSchema(pageKey, sectionKey) {
  return getSectionFormSchema(pageKey, sectionKey) != null;
}

export { SECTION_FORM_SCHEMAS };
