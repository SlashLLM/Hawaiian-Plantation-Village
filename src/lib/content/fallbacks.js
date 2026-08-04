/**
 * Offline fallback content for the HPV CMS.
 * Mirrors hardcoded data from Home, Visit, Stories, About, Learn, Play, and Tickets pages.
 */

export { CURRICULUM_MODULES } from '../../data/curriculumModules.js';

// ---------------------------------------------------------------------------
// Site-wide settings
// ---------------------------------------------------------------------------

export const DEFAULT_SITE_SETTINGS = {
  brand: {
    title: 'Hawaii\'s Plantation Village',
    subtitle: 'Waipahu, Oʻahu, Hawaiʻi',
    tagline:
      'A living plantation village built so future generations can recognize today\'s multiethnic society as rooted in Hawaiʻi\'s plantation era and lifestyle.',
    estBadge: 'EST. 1992',
  },
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'visit', label: 'Visit' },
    { id: 'stories', label: 'Stories' },
    { id: 'archives', label: 'Archives' },
    { id: 'play', label: 'Play & Learn' },
    { id: 'learn', label: 'Learn' },
    { id: 'support', label: 'Support' },
    { id: 'about', label: 'About' },
  ],
  footer: {
    brand: 'Hawaii\'s Plantation Village',
    text:
      'Founded by plantation workers and their descendants to preserve plantation heritage and legacy through authentic homes, gardens, and community memory.',
    copyright: '© 2026 Hawaii\'s Plantation Village. All rights reserved.',
    ctaLinks: [
      { label: 'Get tickets', page: 'tickets' },
      { label: 'Become a member', page: 'support' },
      { label: 'Make a gift', page: 'support' },
      { label: 'Volunteer with us', page: 'support' },
    ],
    newsletter: {
      heading: 'Village updates',
      description: 'Festivals, school tours, and volunteer days from Waipahu.',
      placeholder: 'Your email address',
      buttonLabel: 'Join',
    },
  },
  contact: {
    phone: '(808) 677-0110',
    phoneHref: 'tel:8086770110',
    email: 'info@hawaiianplantationvillage.org',
    emailHref: 'mailto:info@hawaiianplantationvillage.org',
    address: {
      line1: '94-695 Waipahu Street',
      line2: 'Waipahu, Oʻahu, Hawaiʻi 96797',
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.141857904033!2d-158.00941912384777!3d21.38428548035626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c0065961d6fbcd7%3A0x7d27e7f6e2b17a19!2sHawaii%27s%20Plantation%20Village!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
  },
  hours: {
    schedule: 'Tuesday – Saturday: 9:00 AM – 2:00 PM',
    toursNote: 'Guided tours at 10:00 AM & 12:00 PM',
    closedNote: 'Closed on Sundays, Mondays, and major state holidays.',
    parking: 'Free Visitor Parking Onsite',
  },
  hero: {
    eyebrow: 'Waipahu, Oʻahu · Living plantation village',
    headline: 'The story of the plantation worker',
    support:
      'Homes, furnishings, and gardens for the major ethnic groups who worked Hawaiʻi\'s plantations — built so later generations can walk that heritage.',
    primaryCta: { label: 'Plan your visit' },
    secondaryCta: { label: 'Watch the story' },
    stats: [
      { value: '1973', label: 'Friends founded' },
      { value: '1992', label: 'Village opened' },
      { value: '8', label: 'Cultures' },
      { value: '4', label: 'Free festivals' },
    ],
    videoSrc: '/Plantation_life_documentary_video_202607131034.mp4',
    posterSrc: '/digitized-photos/ark_70111_1ZgL.0.jpeg',
  },
  seo: {
    title: 'Hawaii\'s Plantation Village | Plantation Heritage in Waipahu, Oʻahu',
    description:
      'Walk a living plantation village in Waipahu: ethnic camp homes, gardens, school tours, and free festivals that honor Hawaiʻi\'s plantation workers and immigrant communities.',
    keywords: [
      'Hawaii\'s Plantation Village',
      'Waipahu history',
      'plantation museum',
      'Oʻahu field trips',
      'immigration history Hawaii',
    ],
  },
  donationPresets: [
    { amount: 25, label: '$25 helps process artifact and photograph donations.' },
    { amount: 50, label: '$50 supports volunteer work in the collections archives.' },
    { amount: 100, label: '$100 helps furnish and care for ethnic camp homes.' },
  ],
};

/**
 * Donor collections the photograph archives are drawn from. Used both as the
 * archives page fallback copy and as the collection filter vocabulary.
 */
export const PHOTOGRAPH_COLLECTIONS = [
  {
    id: 'oahu_sugar',
    name: 'Oahu Sugar Company',
    blurb:
      'Mainly from the 1940s to 1950s: sugar cane cultivation and harvesting, finances, mill operations, water systems, housing, and medical services. R.H. “Harry” Lodge, division overseer, and Ernest Malterre, Jr., housing supervisor, are credited for most of the collection. Lodge’s photographs of Honouliuli Internment Camp remain a constant resource for researchers.',
  },
  {
    id: 'murakoshi',
    name: 'Murakoshi Collection',
    blurb:
      'Mae Okada’s collection of father-and-son photographers Nobunosuke and Henry Murakoshi. Nobunosuke’s photographs are primarily studio work; Henry’s give a peek into everyday Waipahu — school activities, picnics, celebrations, community events, camp homes, businesses, and locations.',
  },
  {
    id: 'fwcgp',
    name: 'Friends of Waipahu Cultural Garden Park',
    blurb:
      'The largest collection in the HPV Photograph Archives: individual donations of family, work culture, WWII induction, group photos, education and recreation from plantation life. There is some overlap with Lodge, Malterre, and Nobunosuke Murakoshi. Includes panoramic class pictures, graduations, recognition and awards, and funeral photos.',
  },
];

// ---------------------------------------------------------------------------
// Page sections (keyed by page → section)
// ---------------------------------------------------------------------------

export const DEFAULT_PAGE_SECTIONS = {
  home: {
    quickVisit: {
      hours: {
        title: 'HOURS OF OPERATION',
        primary: 'Tuesday – Saturday: 9:00 AM – 2:00 PM',
        secondary: 'Guided tours at 10:00 AM & 12:00 PM',
      },
      location: {
        title: 'LOCATION',
        primary: '94-695 Waipahu Street',
        secondary: 'Waipahu, Oʻahu (Free parking onsite)',
      },
      admission: {
        title: 'ADMISSION',
        primary: 'Adults: $17 | Kamaʻāina/Military: $12',
        secondary: 'Children (5-12): $8 | Under 5: Free',
      },
    },
    cultures: {
      eyebrow: 'Ethnic homes and gardens',
      title: 'Each group furnished a home to tell its story',
      description:
        'Ethnic historical groups planned the exhibits: furnishings, thematic celebrations, and gardens with plants specific to their culture. School and visitor tours walk these homes throughout the year.',
      items: [
        { name: 'Hawaiian', note: 'The land and people before the cane' },
        { name: 'Chinese', note: 'Contract labor roots and community life' },
        { name: 'Japanese', note: 'Home life, celebrations, and tradition' },
        { name: 'Filipino', note: 'Families, work culture, and gatherings' },
        { name: 'Korean', note: 'A cultural celebration in the home' },
        { name: 'Okinawan', note: 'Community memory in the camp' },
        { name: 'Portuguese', note: 'Home, garden, and festa traditions' },
        { name: 'Puerto Rican', note: 'Preparing for Christmas Eve' },
      ],
    },
    planVisit: {
      eyebrow: 'Plan your visit',
      title: 'Walk the homes and gardens',
      description:
        'Tuesday to Saturday, 9:00 AM to 2:00 PM. 94-695 Waipahu Street, Waipahu, Oʻahu. Free parking onsite.',
      items: [
        { title: 'Tickets & hours', note: 'Self-guided and docent-led, Tuesday to Saturday.', page: 'tickets' },
        { title: 'Group tours', note: 'Motorcoach, custom rates, and private group scheduling.', page: 'visit' },
        { title: 'Schools', note: 'Student tours through furnished homes and gardens.', page: 'learn' },
        { title: 'Accessibility', note: 'Paved paths, ADA restrooms, and quieter sensory hours.', page: 'visit' },
      ],
    },
    whyVisit: {
      stamp: 'The village',
      stampClass: 'green',
      title: 'A place to share the laborers\' story',
      paragraphs: [
        'Hawaii\'s Plantation Village focuses on the plantation worker — people from many cultures, natives and immigrants, who were promised a chance to better their lives. The long-range goal has been a collection of structures typifying a plantation village, with each major ethnic group represented by buildings, furnishings, and gardens.',
        'Instead of hiring professionals to plan every exhibit, the village worked with ethnic historical groups to furnish each home with a thematic plan and to design gardens with plants specific to their culture. Docents guide students, teachers, and visitors through the hardships and life-affirming experiences of plantation camp life.',
      ],
      primaryCta: { label: 'Read our story', page: 'about' },
      secondaryCta: { label: 'Plan your visit', page: 'visit' },
    },
    featuredBango: {
      stamp: 'Okada Education Center',
      stampClass: 'rust',
      title: 'Orientation, galleries, and the archives',
      paragraphs: [
        'The Okada Education Center — named after Hideo “Major” Okada, a former sugar worker, labor union organizer, and one of the village founders — houses the main office, meeting room, three exhibit galleries, collections archives and workroom, and gift shop.',
        'Gallery exhibits introduce immigration, plantation work culture, and WWII internment at Honouliuli. Artifact and archives assistants — all volunteers — help process donations that continue to arrive from plantation-era households.',
      ],
      quote: '',
      quoteCite: '',
      cta: { label: 'Explore the photograph archives', page: 'archives' },
    },
    bellToBell: {
      stamp: 'Interactive',
      stampClass: 'rust',
      title: 'Step into their shoes',
      description:
        'Simulate one day on the plantation. Hear the morning whistle, complete tasks in the cane rows, and gather in the community camp at sunset.',
    },
    educators: {
      stamp: 'For educators',
      stampClass: 'teal',
      title: 'School and visitor tours',
      paragraphs: [
        'School and visitor tours are scheduled throughout the year. Students, teachers, and visitors are guided through the furnished homes and survey the gardens around them.',
        'Docents share both the hardships and the life-affirming experiences of living in plantation camps during Hawaiʻi\'s plantation era — a foundation for classroom work before and after the visit.',
      ],
      cta: { label: 'Bring a class', page: 'learn' },
    },
    getInvolved: {
      stamp: 'Get involved',
      stampClass: 'green',
      title: 'Help keep the collections growing',
      description:
        'Volunteers process artifact and photograph donations, care for the village, and make plantation-themed crafts sold in the gift shop to support tours and programs.',
      donation: {
        title: 'Give directly',
        description:
          'Your gift supports the village homes, gardens, galleries, and the collections archives where donations are processed and stored.',
        items: DEFAULT_SITE_SETTINGS.donationPresets,
        cta: { label: 'Make a gift', page: 'support' },
      },
      membership: {
        title: 'Become a steward',
        description:
          'Belong to the village. Membership helps sustain tours, free festivals, and the work of volunteer archives assistants.',
        items: [
          { label: 'Free admission', text: 'for you and your guests all year.' },
          { label: 'Gift shop support', text: 'volunteer crafts fund village programs.' },
          { label: 'Village updates', text: 'festivals, tours, and volunteer days.' },
        ],
        cta: { label: 'See membership', page: 'support' },
      },
    },
    eventsHeader: {
      stamp: 'Free village events',
      stampClass: 'gold',
      title: 'Festivals the community is invited to',
    },
    testimonialsHeader: {
      stamp: 'From our visitors',
      stampClass: 'rust',
      title: 'What people say after they walk it',
      description:
        'Teachers, neighbors, and travelers who have spent a morning in the camps.',
    },
    events: {
      items: [
        {
          slug: 'lunar-new-year',
          date: 'Seasonal',
          title: 'Multi-ethnic Lunar New Year Celebration',
          time: '',
          desc: 'A free village festival with cultural entertainment, food, games, and displays — including Chinese lion blessings and student performers.',
          image: '',
        },
        {
          slug: 'obon-in-the-village',
          date: 'Seasonal',
          title: 'Opening of Hawaiʻi\'s Obon season',
          time: 'Late afternoon',
          desc: 'Obon in the village begins in late afternoon, when lanterns light the dancing area with drum accompaniment.',
          image: '',
        },
        {
          slug: 'portuguese-festa',
          date: 'Seasonal',
          title: 'Portuguese Festa',
          time: '',
          desc: 'A free community festa with entertainment on the village stage, food tasting, and cultural displays.',
          image: '',
        },
        {
          slug: 'harvest-festival',
          date: 'Seasonal',
          title: 'Harvest Festival',
          time: '',
          desc: 'A free harvest celebration with cultural entertainment, food tasting at the homes, and cooking demonstrations.',
          image: '',
        },
      ],
    },
    testimonials: {
      items: [],
    },
    partners: {
      items: [],
    },
  },
  visit: {
    header: {
      stamp: 'Visitor guide',
      stampClass: 'green',
      title: 'Plan your visit',
      subtitle: 'Hours, directions, admission, and everything else you need before you walk the village.',
    },
    hours: {
      title: 'Opening hours',
      schedule: 'Tuesday – Saturday: 9:00 AM – 2:00 PM',
      closedNote: 'Closed on Sundays, Mondays, and major state holidays.',
      toursIntro:
        'To experience the stories fully, we highly recommend taking one of our daily guided tours led by resident docents:',
      tourSlots: [
        { label: 'Morning tour', time: '10:00 AM daily' },
        { label: 'Midday tour', time: '12:00 PM daily' },
      ],
      walkInNote:
        '*Walk-ins are accommodated based on availability. To guarantee your spot, please book tickets online in advance.',
    },
    parking: {
      address: '94-695 Waipahu Street, Waipahu, HI 96797',
      directions:
        'Located approximately 30 minutes from Waikīkī and Honolulu. Take H1 West to Exit 8B (Farrington Hwy), then turn right onto Waipahu Depo Road and right onto Waipahu Street.',
      parkingTitle: 'Free visitor parking onsite',
      parkingDesc:
        'We offer free designated parking for passenger cars, school buses, and tour vans inside our secure lot.',
    },
    safety: {
      terrainTitle: 'Terrain and navigation',
      terrainDesc:
        'The Village path is a dirt/gravel trail approximately 0.5 miles long. Comfortable walking shoes are highly recommended. Restrooms are fully ADA-compliant and located in the main visitor courtyard.',
      guidelinesTitle: 'Preserving cultural heritage',
      guidelinesDesc:
        'Please do not climb on historical structures or touch displays marked with preservation tags. Hawaii\'s Plantation Village is a smoke-free facility.',
    },
    group: {
      title: 'Group visits and private tours',
      intro:
        'We welcome groups of all sizes, including tour operators, family reunions, historical organizations, and corporate outings. Group admission discounts are available for pre-registered groups of 10 or more.',
      commercialTitle: 'Operator scheduling and access',
      commercialDesc:
        'We work closely with local and international tour operators. Commercial bus parking is available onsite. Bookings must be requested at least 14 days in advance to guarantee an exclusive docent guide.',
      groupTypes: [
        'Private Group / Friends',
        'Tour Operator / Business',
        'Corporate / Company',
        'Historical / Cultural Club',
        'Senior Citizen Center',
      ],
    },
    admission: {
      title: 'Admission',
      description:
        'Secure your tickets online to guarantee your guided tour slot and skip the check-in queue at the visitor center desk.',
      rates: [
        { label: 'Adults (13+)', price: '$17.00' },
        { label: 'Kamaʻāina / Military (with ID)', price: '$12.00' },
        { label: 'Seniors (62+)', price: '$12.00' },
        { label: 'Youth (5 - 12)', price: '$8.00' },
        { label: 'Child (Under 5)', price: 'Free' },
      ],
      buttonLabel: 'Get tickets',
      buttonPage: 'tickets',
      schoolCta: {
        title: 'Bringing a school group?',
        description:
          'We host class visits Tuesday through Friday, with curriculum programs and discounted school pricing.',
        buttonLabel: 'School field trips',
        page: 'learn',
      },
      groupCta: {
        title: 'Private and commercial groups',
        description:
          'Organizing a tour, family reunion, or company outing for 10 or more? You get special rates and a dedicated guide.',
        buttonLabel: 'Group admission rates',
      },
    },
    faq: {
      title: 'Common questions',
      items: [
        {
          q: 'How long does a typical visit take?',
          a: 'We recommend allocating at least 1.5 to 2 hours. A full guided tour takes approximately 90 minutes, and you can explore the gardens and exhibits afterward.',
        },
        {
          q: 'Are the historic buildings accessible?',
          a: 'As a historic preservation site, some cottages have elevated steps or narrow doorways that replicate original plantation-era conditions. However, many structures have ramps, and our central pathways are wheelchair-friendly. Please contact us for specialized accessibility support.',
        },
        {
          q: 'Is photography permitted?',
          a: 'Personal photography and filming are highly encouraged! For commercial photography or wedding sessions, please obtain a permit at the managers office.',
        },
        {
          q: 'Is the village open in the rain?',
          a: 'Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings.',
        },
      ],
    },
  },
  about: {
    header: {
      stamp: 'Our story',
      stampClass: 'green',
      title: 'Built by plantation workers and their descendants',
      subtitle:
        'The Friends of Waipahu Cultural Garden Park incorporated in 1973 so future generations would acknowledge today\'s multiethnic society as rooted in Hawaiʻi\'s plantation era and lifestyle.',
    },
    mission: {
      stamp: 'MISSION',
      title: 'A village for plantation heritage and legacy',
      paragraphs: [
        'From its inception, the long-range goal has been a collection of structures typifying a plantation village — each major ethnic group who worked the plantations represented with buildings, furnishings, and gardens that portray an authentic, culturally informed everyday life.',
        'Much of the capital raised came from outside Waipahu. The committee changed the project name to include all of Hawaiʻi\'s plantations rather than focusing only on Waipahu. Hawaii\'s Plantation Village focuses on the plantation worker: natives and immigrants promised a chance to better their lives, whose differing cultural values and traditions form the basis of our multiethnic society today.',
      ],
    },
    timelineIntro: {
      stamp: 'CHRONICLES',
      stampClass: 'rust',
      title: 'From camps to village',
      description:
        'Immigration waves that shaped plantation Hawaiʻi, and the founding of the Friends and the village that tells their story.',
    },
    leadershipIntro: {
      title: 'Founders and builders',
    },
    newsIntro: {
      stamp: 'NEWS',
      title: 'What is happening here',
    },
    careersIntro: {
      stamp: 'WORK WITH US',
      title: 'Join the preservation',
      description:
        'Volunteer openings and paid roles are posted here when available. Artifact and archives assistants — all volunteers — help process donations.',
    },
    contactIntro: {
      stamp: 'CONTACT',
      title: 'Send us a message',
      description:
        'Questions about cottage history, schedules, or support? Write to us and a person will answer.',
      subjectOptions: [
        'General question',
        'Educational tours',
        'Private events',
        'Donation or sponsorship',
        'Volunteering',
      ],
    },
    news: {
      items: [],
    },
    careers: {
      items: [],
    },
    timeline: {
      items: [
        {
          year: '1852',
          event:
            'First waves of Chinese contract laborers arrive in Oʻahu aboard the Thetis, inaugurating the plantation era.',
        },
        {
          year: '1878',
          event:
            'Portuguese workers arrive from Madeira and Azores, bringing stone ovens (forno) and the braguinha (ancestor of the ukulele).',
        },
        {
          year: '1885',
          event:
            'The Kanyaku Imin government-contract Japanese workers arrive, establishing major camp communities and furo baths.',
        },
        {
          year: '1897',
          event:
            'Oahu Sugar Company is incorporated in Waipahu, erecting the massive sugar mill smokestack that dominated the skyline.',
        },
        {
          year: '1903',
          event:
            'First Korean immigrants land in Honolulu, setting up language schools, programs, and active community organizations.',
        },
        {
          year: '1906',
          event:
            'The first Filipino sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment.',
        },
        {
          year: '1973',
          event:
            'The Friends of Waipahu Cultural Garden Park incorporate, founded by a former plantation worker and plantation-worker descendants committed to a village that would teach later generations their heritage.',
        },
        {
          year: '1992',
          event:
            'Hawaii\'s Plantation Village opens in Waipahu after a capital campaign led by executive director Cal Kawamoto raised over $2 million, with another $1 million from the State Legislature for the $2.5 million project.',
        },
      ],
    },
    leadership: {
      items: [
        {
          slug: 'hideo-major-okada',
          name: 'Hideo “Major” Okada',
          role: 'Founder',
          desc: 'Former sugar worker and labor union organizer; one of the village founders. The Okada Education Center is named in his honor.',
        },
        {
          slug: 'cal-kawamoto',
          name: 'Cal Kawamoto',
          role: 'Executive director (capital campaign)',
          desc: 'Created the capital fund drive advisory committee and worked with ethnic historical groups to plan and furnish the village exhibits.',
        },
        {
          slug: 'spencer-leinweber',
          name: 'Spencer Leinweber',
          role: 'Principal architect',
          desc: 'Of Spencer Mason Architecture; selected as principal architect for Hawaii\'s Plantation Village.',
        },
      ],
    },
  },
  stories: {
    header: {
      stamp: 'Oral histories',
      stampClass: 'green',
      title: 'Plantation stories',
      subtitle:
        'The lives, struggles, and music of the eight immigrant communities that built Waipahu.',
    },
  },
  archives: {
    header: {
      stamp: 'Photograph archives',
      stampClass: 'green',
      title: 'Engaging photographs in the archives',
      subtitle:
        'Most old photographs have little significance to others unless you bring context. Ask what you see, what dates or places the image hints at, whether it matches what you know, and how the elements interact — then look for more context.',
    },
    collections: {
      eyebrow: 'Three collections',
      title: 'Photograph collections',
      description:
        'Photographs donated to Hawaii\'s Plantation Village are organized into three primary collections. Knowing who kept an image, and why, changes how you read it.',
      items: PHOTOGRAPH_COLLECTIONS,
    },
    howToLook: {
      eyebrow: 'Looking at photographs',
      title: 'Questions that open an image',
      description:
        'When viewing and interacting with photographs from the archives, these questions help develop a broader understanding of the image. All one needs is more context.',
      steps: [
        {
          title: 'What does one see?',
          note: 'What are you able to identify in the image to indicate who or what is being captured in the photograph?',
        },
        {
          title: 'When or where?',
          note: 'Is there anything in the photograph that indicates when or where the photograph was taken?',
        },
        {
          title: 'Match, reinforce, or conflict?',
          note: 'Does the photograph match, reinforce, or conflict with your own knowledge of what has been captured in the image?',
        },
        {
          title: 'How do the elements interact?',
          note: 'Finally, how do the elements identified in the image interact with each other?',
        },
      ],
    },
    samples: {
      eyebrow: 'Worked examples',
      title: 'How related frames build context',
      description:
        'The study guide reads plantation-era prints with accession cards and backs. Use the same method on the digitized village slides below: observe first, then ask what a second frame confirms or complicates.',
      items: [
        {
          label: 'Sample 1',
          title: 'Outside, then inside the same house',
          arkIds: ['ark_70111_1ZgL', 'ark_70111_1ZgJ'],
          note:
            'In the study guide, Sample 1 uses metadata — filing category, subject, donor, accession year — and clues such as vehicles to date an undated street scene. Here, an exterior and an interior of camp housing work the same way: read what is visible in each frame, then ask what the pair can tell you that either image alone cannot.',
        },
        {
          label: 'Sample 2',
          title: 'A building, then the people in front of it',
          arkIds: ['ark_70111_1ZgR', 'ark_70111_1ZgS'],
          note:
            'Study Guide Sample 2 shows how a group event photograph can contradict assumptions — for example, that the Filipino community was primarily male by 1937. When people appear in a frame, ask whether they are the subject or the evidence of when the shutter opened, and what the group composition challenges in your prior knowledge.',
        },
      ],
    },
    analyze: {
      eyebrow: 'Analyze a photograph',
      title: 'Work through one image',
      description:
        'Based on the National Archives and Records Administration “Analyze an Artifact” form. Your responses save in this browser only; you can print or export the finished worksheet.',
      prompts: [
        {
          id: 'meet',
          heading: 'Meet the photo',
          questions: [
            'What do you notice when you first looked at the photograph?',
            'How would you describe the photograph (portrait, landscape, event, posed, candid, documentary, or other)?',
            'Is there a caption?',
          ],
        },
        {
          id: 'observe',
          heading: 'Observe its parts',
          questions: [
            'List and describe the people, objects, and activities you see.',
            'Write one sentence summarizing this photo.',
          ],
        },
        {
          id: 'sense',
          heading: 'Try to make sense of it',
          questions: [
            'Look at any scans that accompany the image (back, accession card). Who? Where? When?',
            'What was happening at the time in history this photo was taken?',
            'Why was it taken? List evidence from the image or accompanying materials.',
          ],
        },
        {
          id: 'evidence',
          heading: 'Use it as historical evidence',
          questions: [
            'What did you find out from this photo that you might not learn anywhere else?',
            'What other documents, photos, or historical evidence are you going to use to help you understand this event or topic?',
          ],
        },
      ],
    },
    resources: {
      eyebrow: 'Keep researching',
      title: 'Resources for the photograph collections',
      description:
        'A sample of online and library resources related to HPV’s photograph collections. This list is not exhaustive.',
      items: [
        {
          label: 'BYU Joseph F. Smith Library — Filipino Labor Collection',
          note: 'Special collections on Filipino laborers in Hawaiʻi.',
          href: 'https://lib.byu.edu/collections/filipino-laborers-collection/about/',
        },
        {
          label: 'Hawaiʻi State Archives Digital Collections',
          note: 'Chinese, Japanese, and Portuguese passenger manifests; vital statistics 1826–1929; WWI service records.',
          href: 'https://digitalcollections.hawaii.gov/greenstone3/library',
        },
        {
          label: 'UH Mānoa Special Collections — HSPA Collection',
          note: 'Hawaii Sugar Planters Association records and related materials.',
          href: 'https://www2.hawaii.edu/~speccoll/hawaiihspa.html',
        },
        {
          label: 'Kawakami & Kikumura Yano, Picture Bride Stories (2016)',
          note: 'University of Hawaiʻi Press.',
          href: '',
        },
        {
          label: 'Odo, Voices from the Canefields (2013)',
          note: 'Folksongs from Japanese immigrant workers in Hawaiʻi. Oxford University Press.',
          href: '',
        },
        {
          label: 'Poblete, Islanders in the Empire (2014)',
          note: 'Filipino and Puerto Rican laborers in Hawaiʻi. University of Illinois Press.',
          href: '',
        },
        {
          label: 'Kodama-Nishimoto et al., Talking Hawaiʻi’s Story (2009)',
          note: 'Oral histories of an island people. University of Hawaiʻi Press.',
          href: '',
        },
        {
          label: 'UH Center for Oral History — Koloa; Closing of Sugar Plantations',
          note: 'Koloa: an Oral History of a Kauaʻi Community (1988); The Closing of Sugar Plantations: Hamakua and Kaʻu (1997).',
          href: '',
        },
        {
          label: 'National Archives analyze worksheets',
          note: 'Public-domain materials this form is adopted from.',
          href: 'https://www.archives.gov/education/lessons/worksheets',
        },
      ],
    },
  },
  learn: {
    school: {
      stamp: 'For educators',
      stampClass: 'green',
      title: 'Education and field trips',
      subtitle: 'Curriculum packages, classroom lessons, and school visit requests.',
      resourcesIntro:
        'Start our HIDOE standard-aligned interactive lessons. Each package includes videos, guided reading, quizzes, and hands-on activities:',
      fieldTripNote:
        'Field trips require a minimum of 10 students and at least one adult chaperone per 10 children.',
    },
    youth: {
      stamp: 'Youth programs',
      stampClass: 'rust',
      title: 'Student and youth programs',
      subtitle:
        'Grow your skills, discover community history, and shape Waipahu\'s future through internships and volunteer guilds.',
      programs: [
        {
          slug: 'docent-internship',
          type: 'Paid Internship',
          title: '"Preserving Our Roots" Docent Internship',
          desc: 'A semester-long or summer program designed for high school juniors and seniors. Interns study Waipahu\'s multi-ethnic history, train in archival document preservation, and lead educational tours for visiting groups.',
          schedule: '10 weeks • Grades 11-12 • $500 stipend + school credit',
        },
        {
          slug: 'youth-volunteer-guild',
          type: 'Community Service',
          title: 'Youth Volunteer Guild',
          desc: 'Connect with peers and plantation heritage during weekend volunteer days. Guild members participate in historic cottage restoration, maintain our traditional gardens, and host seasonal heritage festivals.',
          schedule: 'Saturday mornings • Grades 9-12 • Service hour certification',
        },
      ],
    },
    family: {
      stamp: 'Ohana learning',
      stampClass: 'teal',
      title: 'Family learning and workshops',
      subtitle:
        'Discover plantation heritage together. Hands-on weekend workshops, storytelling, and self-guided exploration for all ages.',
      workshops: [
        {
          slug: 'talk-story-saturdays',
          type: 'Oral History Sessions',
          title: 'Talk Story Saturdays',
          desc: 'Join us on the second Saturday of each month for family-friendly oral history circles. Plantation kupuna and local storytellers share memories of Waipahu camp life, plantation folklore, and community traditions.',
          schedule: '2nd Saturday of the Month • 10:00 AM - 11:30 AM • Free',
        },
        {
          slug: 'ohana-heritage-gardening',
          type: 'Hands-On Agriculture',
          title: 'Ohana Heritage Gardening',
          desc: 'Discover the crops that sustained generations of plantation families. Learn how traditional Hawaiian canoe plants (Kalo, Uala) and immigrant kitchen crops were grown. Kids will plant their own heritage seed or cutting to take home.',
          schedule: 'Last Saturday of the Month • 9:00 AM - 11:00 AM • Live cuttings & seeds',
        },
        {
          slug: 'village-scavenger-hunt',
          type: 'Interactive Quest',
          title: 'Village Scavenger Hunt & Bingo',
          desc: 'Make your walk through our 30+ historic structures an active quest! Search for immigrant bango tags, spot traditional toys, and match camp kitchen items. Show your completed sheet at the Gift Shop for a prize.',
          schedule: 'Self-guided • Available during open hours',
        },
      ],
    },
  },
  play: {
    header: {
      stamp: 'Play',
      stampClass: 'green',
      title: 'Sugar Mill Tycoon',
      subtitle:
        'Cut the cane, crush it, boil it, spin it. Run the mill the way Waipahu once did.',
    },
    gameSteps: {
      steps: [
        {
          step: 1,
          title: 'Stage 1: Harvesting the Cane',
          instruction:
            'Drag or swipe your mouse/pointer across the dotted lines near the base of the stalks to cut them down!',
          history:
            'In the plantation days, workers used heavy steel cutlasses to cut sugarcane stalks at ground level.',
        },
        {
          step: 2,
          title: 'Stage 2: Crushing & Extraction',
          instruction:
            'Click and drag the large wooden crank handle in a circle to rotate the iron rollers and squeeze out the juice!',
          history:
            'Mills used massive steam-driven iron rollers to crush sugarcane stalks.',
        },
        {
          step: 3,
          title: 'Stage 3: Boiling & Skimming',
          instruction:
            'Select a Heat Burner level to boil the juice, then click on the green floating foam impurities to skim them off!',
          history:
            'Cane juice was boiled in huge clarifiers and impurities were skimmed by hand.',
        },
        {
          step: 4,
          title: 'Stage 4: Spinning the Sugar',
          instruction:
            'Click the blue SPIN button in the center of the drum rapidly to separate molasses from raw crystals!',
          history:
            'Centrifuges spun the boiled sugar syrup at high speeds to separate molasses.',
        },
      ],
    },
  },
  support: {
    header: {
      stamp: 'Support the village',
      stampClass: 'green',
      title: 'Keep these houses standing',
      subtitle:
        'Your gift maintains the cottages, the gardens, and the stories told inside them.',
    },
    donate: {
      title: 'Make a tax-deductible gift',
      description:
        'Every dollar of a direct gift goes to site preservation and educational outreach.',
    },
    membershipIntro: {
      title: 'Become a member',
      description:
        'Join as a steward for year-round benefits while you keep Waipahu heritage standing.',
    },
    impactSidebar: {
      title: 'Where it goes',
      items: [
        'Maintains 25 historic camp cottages',
        'Funds school field trip scholarships',
        'Preserves oral history archives',
      ],
    },
  },
  tickets: {
    header: {
      stamp: 'Book your visit',
      stampClass: 'green',
      title: 'Tickets and reservations',
      subtitle:
        'Reserve a guided tour slot and skip the check-in queue at the visitor center.',
    },
  },
};

// ---------------------------------------------------------------------------
// Content collections
// ---------------------------------------------------------------------------

export const newsArticles = [];

export const careersList = [];

/**
 * Photograph archives seed.
 *
 * These 12 records describe the digitized 35mm slides currently in
 * public/digitized-photos. Descriptions are working descriptions written from
 * the images themselves, not catalog records: `provisional: true` tells the UI
 * to say so rather than present them as archive fact. Staff replace them from
 * the accession cards in the CMS.
 */
export const PHOTOGRAPHS = [
  {
    arkId: 'ark_70111_1ZgL',
    title: 'Camp house with corrugated roof and street lamp',
    imageUrl: '/digitized-photos/ark_70111_1ZgL.0.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1ZgL.0.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Single-wall camp house with red trim, plantation street lamp, and a visitor at the doorway',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'Looking down on a restored single-wall camp house. Corrugated iron roof, board-and-batten walls, red door and window frames, and a plantation-era street lamp in the foreground.',
    relatedArkIds: ['ark_70111_1ZgK', 'ark_70111_1ZgJ'],
    studyNotes:
      'The clothing and camera carried by the person in the doorway date the exposure to the museum era, not the plantation era. The structure is the subject; the visitor tells you this is documentation of the village as it was being built or interpreted.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1ZgK',
    title: 'Camp roofs from above, street lamp in foreground',
    imageUrl: '/digitized-photos/ark_70111_1ZgK.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1ZgK.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Corrugated roofs of adjoining camp structures with a red plantation lamp post',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'An elevated view across several camp roofs. The same red lamp post appears here as in the wider view of the camp house, which places the two exposures minutes apart.',
    relatedArkIds: ['ark_70111_1ZgL', 'ark_70111_1Zh0'],
    studyNotes:
      'Matching the lamp post across two frames is the simplest kind of archival evidence: it tells you the photographer moved rather than that the buildings did.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1ZgJ',
    title: 'Interior of an unfurnished camp house',
    imageUrl: '/digitized-photos/ark_70111_1ZgJ.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1ZgJ.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Two people standing in a bare camp house interior beside a double-hung window',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'A bare interior with exposed ceiling joists, single-wall construction, and one double-hung window. Two people stand inside; neither is identified.',
    relatedArkIds: ['ark_70111_1ZgL', 'ark_70111_1Zgr'],
    studyNotes:
      'Single-wall construction — no studs, no insulation, boards nailed straight to the frame — is visible here. It is the detail that explains how quickly plantation housing went up and how little it kept out.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1ZgM',
    title: 'Visitors entering through the village gate',
    imageUrl: '/digitized-photos/ark_70111_1ZgM.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1ZgM.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Events and tours',
    subject: 'A group walking up a path through a tiled gateway structure',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'Visitors walking a paved path beneath a tile-roofed gateway. Utility poles and a street lamp stand behind the gate.',
    relatedArkIds: ['ark_70111_1Zh0', 'ark_70111_1ZgK'],
    studyNotes:
      'Count the people and look at what they are wearing and carrying. Group size and dress often date a photograph more reliably than the buildings do.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1Zgn',
    title: 'Two-story building with red railings',
    imageUrl: '/digitized-photos/ark_70111_1Zgn.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1Zgn.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Two-story wooden building with red posts and railings, seen from the garden below',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'A two-story wooden building with a deep lanai, red posts and railings, and a stone retaining wall and plantings in the foreground.',
    relatedArkIds: ['ark_70111_1Zgx'],
    studyNotes:
      'Two stories and a wraparound lanai set this building apart from the single-story worker housing elsewhere in the archive. Scale is a class marker on a plantation.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1Zgx',
    title: 'Front stairway of the two-story building',
    imageUrl: '/digitized-photos/ark_70111_1Zgx.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1Zgx.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Front elevation and stairway of a two-story red-trimmed building',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'The front of the same two-story building, photographed straight on: a central stairway to the first-floor lanai and a second lanai above it.',
    relatedArkIds: ['ark_70111_1Zgn'],
    studyNotes:
      'Photographers documenting a structure usually shoot a three-quarter view and a straight-on elevation. Finding both in a collection is a sign of deliberate survey work rather than snapshots.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1Zgr',
    title: 'Camp cottage behind a picket fence',
    imageUrl: '/digitized-photos/ark_70111_1Zgr.0.thumbnail (1).jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1Zgr.0.thumbnail (1).jpeg',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'White camp cottage with corrugated roof behind a low picket fence',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'A white cottage with a corrugated roof and a covered side entry, photographed across a low white picket fence.',
    relatedArkIds: ['ark_70111_1ZgR', 'ark_70111_1ZgS'],
    studyNotes:
      'Fences, yards, and plantings are worth noting. They record how families claimed space around housing they did not own.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1ZgR',
    title: 'Dark outbuilding beside a green cottage',
    imageUrl: '/digitized-photos/ark_70111_1ZgR.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1ZgR.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Village site documentation',
    subject: 'Dark-painted outbuilding with white trim next to a pale green cottage',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'A dark-painted outbuilding with white trim stands beside a pale green cottage. A visitor walks along the path between them.',
    relatedArkIds: ['ark_70111_1ZgS', 'ark_70111_1Zgr'],
    studyNotes:
      'The same outbuilding appears in a second frame with a group posed in front of it. Sequences like this often mark a dedication or a work day.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1ZgS',
    title: 'Group standing in front of the outbuilding',
    imageUrl: '/digitized-photos/ark_70111_1ZgS.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1ZgS.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Group photos',
    subject: 'Three people standing at the corner of a dark outbuilding',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'Three people stand at the left edge of the frame beside the dark outbuilding. None are identified on the slide.',
    relatedArkIds: ['ark_70111_1ZgR'],
    studyNotes:
      'Unidentified people in a group photo are the most common gap in this archive. If you recognize someone here, the archives staff want to hear from you.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1Zh0',
    title: 'Visitors between rows of camp cottages',
    imageUrl: '/digitized-photos/ark_70111_1Zh0.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1Zh0.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Events and tours',
    subject: 'A group walking a fenced path between camp cottages with red roofs',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'People walk a fenced path between two rows of camp cottages with red roofs and white trim, in what appears to be a tour or an opening event.',
    relatedArkIds: ['ark_70111_1ZgM', 'ark_70111_1ZgK'],
    studyNotes:
      'This is the closest thing in the set to a crowd scene. Compare the density of housing here with the isolated structures in the other frames.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1Zh3',
    title: 'Overgrown camp house with a parked truck',
    imageUrl: '/digitized-photos/ark_70111_1Zh3.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1Zh3.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Plantation towns',
    subject: 'Weathered camp house under heavy vegetation with a pickup truck in the yard',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: 'ca. 1990s',
    photographer: '',
    caption:
      'A weathered camp house nearly closed in by trees, with a light-colored pickup truck parked in the yard.',
    relatedArkIds: ['ark_70111_1Zgr'],
    studyNotes:
      'The truck is the most datable object in this frame. Vehicle models are one of the standard ways to bracket an undated photograph.',
    provisional: true,
  },
  {
    arkId: 'ark_70111_1Z4t',
    title: 'Slide storage box with color reference bar',
    imageUrl: '/digitized-photos/ark_70111_1Z4t.0.thumbnail.jpeg',
    thumbnailUrl: '/digitized-photos/ark_70111_1Z4t.0.thumbnail.jpeg',
    collection: 'fwcgp',
    filingCategory: 'Archives housing',
    subject: 'Open slide storage box with mounted 35mm slides, photographed with a color reference bar',
    donor: 'Friends of Waipahu Cultural Garden Park',
    accessionNumber: '',
    circaDate: '',
    photographer: '',
    caption:
      'A green slide storage box, open, holding rows of mounted 35mm slides. Two loose slides sit to the right and a color reference bar runs across the top.',
    relatedArkIds: [],
    studyNotes:
      'This frame is part of the digitization record rather than the historical record. The color bar lets a technician correct color shift in every other scan made that day.',
    provisional: true,
  },
];

export const CAMPS_DATA = [
  {
    id: 'chinese',
    culture: 'Chinese',
    title: 'The Chinese Society Cookhouse',
    arrival: '1852',
    shortDesc:
      'One of the earliest immigrant groups who completed contract terms and founded successful merchants and agricultural hubs.',
    fullHistory:
      'Chinese contract laborers arrived in 1852. They introduced rice cultivation techniques to the swampy lowlands of Waipahu. The cookhouse was the heart of the Chinese camp section, serving as a social gathering spot and a place to honor ancestors during festivals.',
    oralHistory: {
      narrator: 'Siu Lung Chang (Grandson of Cookhouse Manager)',
      length: '2m 45s',
      audioSimText: 'Recording: Chang family oral archive, interviewed 1994.',
      transcript:
        '“My grandfather came in 1888. He told me the kitchen fires in the Chinese camp section never went out. They baked buns, boiled tea, and exchanged news. The bango system was tight, but workers pooled their credit slips to buy bulk ingredients directly from Honolulu merchants. That cookhouse kept our community alive.”',
    },
  },
  {
    id: 'japanese',
    culture: 'Japanese',
    title: 'The Japanese Furo & Cottage',
    arrival: '1885',
    shortDesc:
      'Brought traditional bathing customs and established large camp structures, bringing rich family traditions and shrines.',
    fullHistory:
      'Japanese workers arrived under the Government-Contract system in 1885. They constructed traditional furo (hot water baths) which became cultural nodes where workers of different nations interacted. Many cottages represent the post-contract family settlements.',
    oralHistory: {
      narrator: 'Kiyoshi Tanaka (Retired Sugar Mill Stoker)',
      length: '3m 12s',
      audioSimText: 'Recording: Tanaka oral history, interviewed 1989.',
      transcript:
        '“At the end of a 10-hour shift in the boiling sugar house, covered in black dust, the furo bath was heaven. We sat in the hot water and talked. Language didn\'t matter much. We shared cigarettes and laughed. It was where we stopped being contract numbers and became friends.”',
    },
  },
  {
    id: 'filipino',
    culture: 'Filipino',
    title: 'The Filipino Single-Men Barracks',
    arrival: '1906',
    shortDesc:
      'Arrived under the HSPA recruiting system, forming the backbone of late-era plantation field operations.',
    fullHistory:
      'Filipino Sakadas arrived starting in 1906. Initially living in single-men barracks, they brought a rich history of labor organizing, music, and cuisine. They were the largest labor force during the final decades of the sugar era.',
    oralHistory: {
      narrator: 'Espiridion "Pedro" Ramos (Sakada Field Guide)',
      length: '4m 05s',
      audioSimText: 'Recording: Sakada oral archive, interviewed 1991.',
      transcript:
        '“We lived six men to a room in the Waipahu barracks. We brought our guitars, and on Saturday nights, we sang kundiman (love songs) on the porch. The Luna was strict, but when the music started, the fields felt far away. We became brothers in those rooms.”',
    },
  },
  {
    id: 'portuguese',
    culture: 'Portuguese',
    title: 'The Portuguese Forno & Home',
    arrival: '1878',
    shortDesc:
      'Introduced stone bread ovens (fornos) and the ukulele to the islands, moving into supervisory positions.',
    fullHistory:
      'Portuguese immigrants from Madeira and the Azores arrived in 1878. Often arriving as families, they built outdoor stone ovens (forno) to bake large batches of sweet bread, which they shared with neighbors, fostering the plantation-wide community spirit.',
    oralHistory: {
      narrator: 'Maria Da Silva (Cottage Resident descendant)',
      length: '2m 15s',
      audioSimText: 'Recording: Da Silva family history, recorded 1993.',
      transcript:
        '“Every Saturday, my grandmother heated the forno brick oven with eucalyptus wood. The smell of baking sweet bread traveled through all the camps. Japanese, Filipino, and Chinese kids would wait near our yard. She never let a single child walk away without a warm crust.”',
    },
  },
  {
    id: 'korean',
    culture: 'Korean',
    title: 'The Korean Protestant Community Cottage',
    arrival: '1903',
    shortDesc:
      'Formed tightly-knit communities centered around church gatherings, language schools, and independence movements.',
    fullHistory:
      'Korean immigrants arrived in 1903, seeking relief from political turmoil. They established active language schools and churches. Korean camp cottages often had small gardens for making fermented vegetables, introducing kimchi to the local diet.',
    oralHistory: {
      narrator: 'Young-Hee Park (Language School Educator)',
      length: '3m 50s',
      audioSimText: 'Recording: Park family archive, recorded 1995.',
      transcript:
        '“We gathered at the camp chapel on Sundays. It wasn\'t just for church services; it was where we taught our children the Korean alphabet and gathered funds to support the independence movement in Seoul. The cottage garden always had chili pepper stalks growing in the red dirt.”',
    },
  },
  {
    id: 'puerto_rican',
    culture: 'Puerto Rican',
    title: 'The Puerto Rican Casita',
    arrival: '1900',
    shortDesc:
      'Arrived after hurricanes devastated their home island, introducing rich música jibara and pasteles to Hawaiʻi.',
    fullHistory:
      'Following the devastation of Hurricane San Ciriaco in 1899, over 5,000 Puerto Ricans migrated to Hawaiʻi in 1900. They introduced dynamic rhythms, string ensembles, and food traditions like pasteles (similar to tamales, wrapped in banana leaves).',
    oralHistory: {
      narrator: 'Roberto Morales (Cane Hauler & Musician)',
      length: '3m 30s',
      audioSimText: 'Recording: Morales music archives, recorded 1990.',
      transcript:
        '“We brought the cuatro guitar and the güiro scraper. When we played music at the camp borders, the other workers would stand and listen. We blended our rhythms with Portuguese tunes and Hawaiian chants. That\'s how Cachi Cachi music was born in Waipahu.”',
    },
  },
  {
    id: 'okinawan',
    culture: 'Okinawan',
    title: 'The Okinawan Sanshin & Prefectural Club',
    arrival: '1900',
    shortDesc:
      'Brought the traditional three-stringed sanshin, a unique Ryukyuan language, and deep mutual-aid networks.',
    fullHistory:
      'Okinawan contract laborers arrived in Hawaiʻi in 1900, bringing a distinct Ryukyuan language, culture, and musical heritage. Settling in camp clusters, they maintained strong prefectural networks called sonjinkai. They introduced agricultural practices, pig farming, and traditional foods like andagi. The three-stringed sanshin became a cornerstone of plantation community music.',
    oralHistory: {
      narrator: 'Kama Uyehara (Third-Generation Sanshin Instructor)',
      length: '3m 40s',
      audioSimText: 'Recording: Uyehara family tape archive, Waipahu, recorded 1992.',
      transcript:
        '“My father made his first sanshin using an empty cigar box and a piece of eucalyptus wood. In the evenings, when the field dust settled, he would play the old Ryukyuan folk songs. The music was different from the Japanese songs—it was warmer, and the neighbors from all the other camps would lean over the fences to listen. It made this red dirt feel a little bit like Okinawa.”',
    },
  },
  {
    id: 'spanish',
    culture: 'Spanish',
    title: 'The Spanish Andalusian Casa',
    arrival: '1907',
    shortDesc:
      'Arrived in 1907 from Andalusia, introducing the classical Spanish guitar, lace-making, and distinct culinary traditions.',
    fullHistory:
      'Spanish contract laborers arrived in Hawaiʻi starting in 1907, primarily recruited from the Andalusia region. Those who remained in Waipahu contributed rich cultural elements, including classical Spanish guitar techniques, traditional lace-making, and Mediterranean culinary traditions. Their guitars blended with Portuguese braguinhas and Okinawan sanshins during communal gatherings.',
    oralHistory: {
      narrator: 'Isabel Delgado (Andalusian Immigrant Descendant)',
      length: '2m 55s',
      audioSimText: 'Recording: Delgado oral archive, interviewed 1994.',
      transcript:
        '“My grandmother brought her Andalusian guitar all the way across two oceans. She said the fields were exhausting, but music was how they kept their dignity. When she played, the other workers would gather around. The Portuguese brought their braguinha, the Okinawan workers brought their sanshin, and they would all play together on the lanai. We didn\'t speak the same words, but the strings understood each other.”',
    },
  },
];

export const HOME_EVENTS = [
  {
    slug: 'lunar-new-year',
    date: 'Seasonal',
    title: 'Multi-ethnic Lunar New Year Celebration',
    time: '',
    desc: 'A free village festival with cultural entertainment, food, games, and displays — including Chinese lion blessings and student performers.',
  },
  {
    slug: 'obon-in-the-village',
    date: 'Seasonal',
    title: 'Opening of Hawaiʻi\'s Obon season',
    time: 'Late afternoon',
    desc: 'Obon in the village begins in late afternoon, when lanterns light the dancing area with drum accompaniment.',
  },
  {
    slug: 'portuguese-festa',
    date: 'Seasonal',
    title: 'Portuguese Festa',
    time: '',
    desc: 'A free community festa with entertainment on the village stage, food tasting, and cultural displays.',
  },
  {
    slug: 'harvest-festival',
    date: 'Seasonal',
    title: 'Harvest Festival',
    time: '',
    desc: 'A free harvest celebration with cultural entertainment, food tasting at the homes, and cooking demonstrations.',
  },
];

export const TESTIMONIALS = [];

export const PARTNERS = [];

export const VISIT_FAQS = [
  {
    q: 'How long does a typical visit take?',
    a: 'We recommend allocating at least 1.5 to 2 hours. A full guided tour takes approximately 90 minutes, and you can explore the gardens and exhibits afterward.',
  },
  {
    q: 'Are the historic buildings accessible?',
    a: 'As a historic preservation site, some cottages have elevated steps or narrow doorways that replicate original plantation-era conditions. However, many structures have ramps, and our central pathways are wheelchair-friendly. Please contact us for specialized accessibility support.',
  },
  {
    q: 'Is photography permitted?',
    a: 'Personal photography and filming are highly encouraged! For commercial photography or wedding sessions, please obtain a permit at the managers office.',
  },
  {
    q: 'Is the village open in the rain?',
    a: 'Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings.',
  },
];

export const TIMELINE = [
  {
    year: '1852',
    event:
      'First waves of Chinese contract laborers arrive in Oʻahu aboard the Thetis, inaugurating the plantation era.',
  },
  {
    year: '1878',
    event:
      'Portuguese workers arrive from Madeira and Azores, bringing stone ovens (forno) and the braguinha (ancestor of the ukulele).',
  },
  {
    year: '1885',
    event:
      'The Kanyaku Imin government-contract Japanese workers arrive, establishing major camp communities and furo baths.',
  },
  {
    year: '1897',
    event:
      'Oahu Sugar Company is incorporated in Waipahu, erecting the massive sugar mill smokestack that dominated the skyline.',
  },
  {
    year: '1903',
    event:
      'First Korean immigrants land in Honolulu, setting up language schools, programs, and active community organizations.',
  },
  {
    year: '1906',
    event:
      'The first Filipino sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment.',
  },
  {
    year: '1973',
    event:
      'The Friends of Waipahu Cultural Garden Park incorporate, founded by a former plantation worker and plantation-worker descendants committed to a village that would teach later generations their heritage.',
  },
  {
    year: '1992',
    event:
      'Hawaii\'s Plantation Village opens in Waipahu after a capital campaign led by executive director Cal Kawamoto raised over $2 million, with another $1 million from the State Legislature for the $2.5 million project.',
  },
];

export const LEADERSHIP = [
  {
    slug: 'hideo-major-okada',
    name: 'Hideo “Major” Okada',
    role: 'Founder',
    desc: 'Former sugar worker and labor union organizer; one of the village founders. The Okada Education Center is named in his honor.',
  },
  {
    slug: 'cal-kawamoto',
    name: 'Cal Kawamoto',
    role: 'Executive director (capital campaign)',
    desc: 'Created the capital fund drive advisory committee and worked with ethnic historical groups to plan and furnish the village exhibits.',
  },
  {
    slug: 'spencer-leinweber',
    name: 'Spencer Leinweber',
    role: 'Principal architect',
    desc: 'Of Spencer Mason Architecture; selected as principal architect for Hawaii\'s Plantation Village.',
  },
];

export const WORKSHOPS = [
  {
    slug: 'talk-story-saturdays',
    type: 'Oral History Sessions',
    title: 'Talk Story Saturdays',
    desc: 'Join us on the second Saturday of each month for family-friendly oral history circles. Plantation kupuna and local storytellers share memories of Waipahu camp life, plantation folklore, and community traditions.',
    schedule: '2nd Saturday of the Month • 10:00 AM - 11:30 AM • Free',
  },
  {
    slug: 'ohana-heritage-gardening',
    type: 'Hands-On Agriculture',
    title: 'Ohana Heritage Gardening',
    desc: 'Discover the crops that sustained generations of plantation families. Learn how traditional Hawaiian canoe plants (Kalo, Uala) and immigrant kitchen crops were grown. Kids will plant their own heritage seed or cutting to take home.',
    schedule: 'Last Saturday of the Month • 9:00 AM - 11:00 AM • Live cuttings & seeds',
  },
  {
    slug: 'village-scavenger-hunt',
    type: 'Interactive Quest',
    title: 'Village Scavenger Hunt & Bingo',
    desc: 'Make your walk through our 30+ historic structures an active quest! Search for immigrant bango tags, spot traditional toys, and match camp kitchen items. Show your completed sheet at the Gift Shop for a prize.',
    schedule: 'Self-guided • Available during open hours',
  },
  {
    slug: 'docent-internship',
    type: 'Paid Internship',
    title: '"Preserving Our Roots" Docent Internship',
    desc: 'A semester-long or summer program designed for high school juniors and seniors. Interns study Waipahu\'s multi-ethnic history, train in archival document preservation, and lead educational tours for visiting groups.',
    schedule: '10 weeks • Grades 11-12 • $500 stipend + school credit',
  },
  {
    slug: 'youth-volunteer-guild',
    type: 'Community Service',
    title: 'Youth Volunteer Guild',
    desc: 'Connect with peers and plantation heritage during weekend volunteer days. Guild members participate in historic cottage restoration, maintain our traditional gardens, and host seasonal heritage festivals.',
    schedule: 'Saturday mornings • Grades 9-12 • Service hour certification',
  },
];

// ---------------------------------------------------------------------------
// Ticketing
// ---------------------------------------------------------------------------

export const ADMISSION_TICKET_TYPES = [
  { slug: 'adult', label: 'Adults (13+)', priceCents: 1700, priceDisplay: '$17.00' },
  { slug: 'local', label: 'Kamaʻāina / Military (with ID)', priceCents: 1200, priceDisplay: '$12.00', requiresId: true },
  { slug: 'senior', label: 'Seniors (62+)', priceCents: 1200, priceDisplay: '$12.00' },
  { slug: 'youth', label: 'Youth (5 - 12)', priceCents: 800, priceDisplay: '$8.00' },
  { slug: 'child', label: 'Child (Under 5)', priceCents: 0, priceDisplay: 'Free' },
];

export const GROUP_TICKET_TYPES = [
  { slug: 'group-adult', label: 'Group Adults (10+)', priceCents: 1400, priceDisplay: '$14.00' },
  { slug: 'group-senior-military', label: 'Group Seniors / Military', priceCents: 1000, priceDisplay: '$10.00' },
  { slug: 'group-youth', label: 'Group Youth (5-12)', priceCents: 600, priceDisplay: '$6.00' },
];

export const TOUR_TIME_SLOTS = [
  { label: '10:00 AM', description: 'Morning Tour', sortOrder: 1 },
  { label: '12:00 PM', description: 'Midday Tour', sortOrder: 2 },
];

// Keep page-section list payloads in sync with legacy collection exports
DEFAULT_PAGE_SECTIONS.home.events = {
  items: HOME_EVENTS.map((e) => ({ ...e, image: e.image ?? '' })),
};
DEFAULT_PAGE_SECTIONS.home.testimonials = {
  items: TESTIMONIALS.map((t, i) => ({
    slug: t.slug ?? `testimonial-${i + 1}`,
    quote: t.quote,
    authorName: t.authorName,
    authorMeta: t.authorMeta,
  })),
};
DEFAULT_PAGE_SECTIONS.home.partners = {
  items: PARTNERS.map((p, i) =>
    typeof p === 'string'
      ? { slug: `partner-${i + 1}`, name: p }
      : { slug: p.slug ?? `partner-${i + 1}`, name: p.name ?? p.title },
  ),
};
DEFAULT_PAGE_SECTIONS.about.news = {
  items: newsArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    date: a.date,
    category: a.category,
    summary: a.summary,
    content: a.content,
    image: a.image,
  })),
};
DEFAULT_PAGE_SECTIONS.about.careers = {
  items: careersList.map((c) => ({
    slug: c.id ?? c.slug,
    title: c.title,
    type: c.type,
    department: c.department,
    compensation: c.compensation,
    hours: c.hours,
    summary: c.summary,
    responsibilities: c.responsibilities ?? [],
    requirements: c.requirements ?? [],
  })),
};
DEFAULT_PAGE_SECTIONS.about.timeline = { items: [...TIMELINE] };
DEFAULT_PAGE_SECTIONS.about.leadership = {
  items: LEADERSHIP.map((l, i) => ({
    slug: l.slug ?? l.name?.toLowerCase().replace(/\s+/g, '-') ?? `leader-${i + 1}`,
    name: l.name,
    role: l.role,
    desc: l.desc,
  })),
};
DEFAULT_PAGE_SECTIONS.learn.youth = {
  ...DEFAULT_PAGE_SECTIONS.learn.youth,
  programs: WORKSHOPS.filter((w) =>
    ['docent-internship', 'youth-volunteer-guild'].includes(w.slug),
  ),
};
DEFAULT_PAGE_SECTIONS.learn.family = {
  ...DEFAULT_PAGE_SECTIONS.learn.family,
  workshops: WORKSHOPS.filter((w) =>
    ['talk-story-saturdays', 'ohana-heritage-gardening', 'village-scavenger-hunt'].includes(w.slug),
  ),
};

// ---------------------------------------------------------------------------
// Play page game steps (Play.jsx)
// ---------------------------------------------------------------------------

export const GAME_STEPS = [
  {
    step: 1,
    title: 'Stage 1: Harvesting the Cane',
    instruction:
      'Drag or swipe your mouse/pointer across the dotted lines near the base of the stalks to cut them down!',
    history:
      'In the plantation days, workers used heavy steel cutlasses to cut sugarcane stalks at ground level. This was tough work done under the hot Hawaiian sun.',
  },
  {
    step: 2,
    title: 'Stage 2: Crushing & Extraction',
    instruction:
      'Click and drag the large wooden crank handle in a circle to rotate the iron rollers and squeeze out the juice!',
    history:
      'Mills used massive steam-driven iron rollers. They crushed sugarcane stalks under thousands of pounds of pressure to squeeze out every drop of juice.',
  },
  {
    step: 3,
    title: 'Stage 3: Boiling & Skimming',
    instruction:
      'Select a Heat Burner level to boil the juice, then click on the green floating foam impurities to skim them off!',
    history:
      'Cane juice was boiled in huge clarifiers. Impurities floated to the top as foam, which workers skimmed off by hand to ensure the sugar ended up pure and white.',
  },
  {
    step: 4,
    title: 'Stage 4: Spinning the Sugar',
    instruction:
      'Click the blue "SPIN" button in the center of the drum rapidly to separate molasses from raw crystals!',
    history:
      'Centrifuges spun the boiled sugar syrup at high speeds. Centrifugal force pushed the liquid molasses out through tiny holes, leaving dry raw sugar crystals behind.',
  },
];
