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
    title: 'Hawaiian Plantation Village',
    subtitle: 'Waipahu, Oʻahu, Hawaiʻi',
    tagline: 'A non-profit cultural heritage destination dedicated to preserving the history of Hawaii\'s plantation workers and immigrant roots.',
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
    brand: 'Hawaiian Plantation Village',
    text: 'A non-profit cultural heritage destination dedicated to preserving the history of Hawaii\'s plantation workers and immigrant roots.',
    copyright: '© 2026 Hawaiian Plantation Village. All rights reserved. Built for cultural stewardship.',
    ctaLinks: [
      { label: 'Get tickets', page: 'tickets' },
      { label: 'Become a member', page: 'support' },
      { label: 'Make a gift', page: 'support' },
      { label: 'Volunteer with us', page: 'support' },
    ],
    newsletter: {
      heading: 'THE LEDGER',
      description: 'Seasonal festivals, lectures, and volunteer days, once a month.',
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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.141857904033!2d-158.00941912384777!3d21.38428548035626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c0065961d6fbcd7%3A0x7d27e7f6e2b17a19!2sHawaiian%20Plantation%20Village!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
  },
  hours: {
    schedule: 'Tuesday – Saturday: 9:00 AM – 2:00 PM',
    toursNote: 'Guided tours at 10:00 AM & 12:00 PM',
    closedNote: 'Closed on Sundays, Mondays, and major state holidays.',
    parking: 'Free Visitor Parking Onsite',
  },
  hero: {
    eyebrow: 'Hawaiʻi\'s living museum · Waipahu, Oʻahu',
    headline: 'History didn\'t happen here. It still does.',
    support:
      'Walk the camp houses where eight immigrant communities built a life together — and still gather today.',
    primaryCta: { label: 'Plan your visit' },
    secondaryCta: { label: 'Watch the story' },
    stats: [
      { value: '1992', label: 'Opened' },
      { value: '8', label: 'Cultures' },
      { value: '30', label: 'Structures' },
      { value: '25k+', label: 'Students a year' },
    ],
    videoSrc: '/Plantation_life_documentary_video_202607131034.mp4',
    posterSrc: '/digitized-photos/ark_70111_1ZgL.0.jpeg',
  },
  seo: {
    title: 'Hawaiian Plantation Village | Living History Museum in Waipahu, Oʻahu',
    description:
      'Explore 25 restored plantation camp houses and hear the stories of immigrant communities who shaped modern Hawaiʻi. Plan your visit, book tickets, and discover educational programs.',
    keywords: [
      'Hawaiian Plantation Village',
      'Waipahu history',
      'plantation museum',
      'Oʻahu field trips',
      'immigration history Hawaii',
    ],
  },
  donationPresets: [
    { amount: 25, label: '$25 buys organic elements for hands-on history classes.' },
    { amount: 50, label: '$50 maintains camp gardens for three months.' },
    { amount: 100, label: '$100 funds school admission worksheets for a class of 10.' },
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
      'Mainly 1940s to 1950s: cane cultivation and harvesting, mill operations, water systems, housing, and medical services. Most images are credited to R.H. “Harry” Lodge, division overseer, and Ernest Malterre Jr., housing supervisor.',
  },
  {
    id: 'murakoshi',
    name: 'Murakoshi Collection',
    blurb:
      'Mae Okada’s collection of father-and-son photographers Nobunosuke and Henry Murakoshi. Nobunosuke worked mostly in the studio; Henry photographed school activities, picnics, camp homes, and businesses around Waipahu.',
  },
  {
    id: 'fwcgp',
    name: 'Friends of Waipahu Cultural Garden Park',
    blurb:
      'The largest collection in the archives, built from family donations: work culture, WWII induction, graduations, funerals, panoramic class pictures, and documentation of the village site itself.',
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
      eyebrow: 'Eight cultures, one village',
      title: 'Every camp house belongs to somebody\'s family.',
      description:
        'Each home was furnished by the community it belongs to — their gardens, their kitchens, their celebrations. Pick a culture and hear from the people who lived it.',
      items: [
        { name: 'Hawaiian', note: 'The land before the cane' },
        { name: 'Chinese', note: 'First contract workers, 1852' },
        { name: 'Japanese', note: 'Furo, temples, picture brides' },
        { name: 'Filipino', note: 'Sakada families and pancit' },
        { name: 'Korean', note: 'Small camp, long memory' },
        { name: 'Okinawan', note: 'Sanshin on the porch' },
        { name: 'Portuguese', note: 'Stone forno and sweet bread' },
        { name: 'Puerto Rican', note: 'Christmas Eve in the parlor' },
      ],
    },
    planVisit: {
      eyebrow: 'Plan your visit',
      title: 'Walk in. Sit down. Stay a while.',
      description:
        'Tuesday to Saturday, 9:00 AM to 2:00 PM. 94-695 Waipahu Street, Waipahu, Oʻahu. Free parking onsite.',
      items: [
        { title: 'Tickets & hours', note: 'Self-guided and docent-led, Tuesday to Saturday.', page: 'tickets' },
        { title: 'Group tours', note: 'Motorcoach, custom rates, and private group scheduling.', page: 'visit' },
        { title: 'Schools', note: 'DOE-aligned field trips and classroom curriculum.', page: 'learn' },
        { title: 'Accessibility', note: 'Paved paths, ADA restrooms, and quieter sensory hours.', page: 'visit' },
      ],
    },
    whyVisit: {
      stamp: 'Living museum',
      stampClass: 'green',
      title: 'Where Hawaiʻi\'s roots run deep',
      paragraphs: [
        'Hawaiian Plantation Village is an outdoor, living history museum located in Waipahu. It tells the story of the immigrants who arrived in Hawaiʻi from China, Portugal, Japan, Puerto Rico, Korea, the Philippines, Okinawa, and other nations during the sugar plantation era (1852–1946).',
        'Explore 25 authentic, fully restored camp houses, complete with period furniture, personal artifacts, and lush heritage gardens. Walk the same paths as the workers, feel the heat of the stone ovens, and hear the stories of the community that shaped Hawaii\'s unique multicultural society.',
      ],
      primaryCta: { label: 'Read our story', page: 'about' },
      secondaryCta: { label: 'Plan your visit', page: 'visit' },
    },
    featuredBango: {
      stamp: 'Featured narrative',
      stampClass: 'rust',
      title: 'The bango system: numbers replacing names',
      paragraphs: [
        'Upon arrival at the plantation, each immigrant worker was stripped of their name in the company ledgers and issued a small, stamped metal disk called a Bango tag.',
        'Because the plantation managers and overseers (Lunas) could not pronounce or easily spell the names of Chinese, Japanese, Portuguese, Korean, or Filipino workers, the Bango number became their identity. It dictated their work assignment, their pay ledger, and their credit at the company store.',
      ],
      quote:
        'My grandfather told me the bango was a constant weight in his pocket. But it also forced the camps to find a common language—Pidgin—to connect their true names behind those metal numbers.',
      quoteCite: '— Siu Lung Chang, Oral History Archive',
      cta: { label: 'Hear the camp stories', page: 'stories' },
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
      title: 'Curriculum and field trips',
      paragraphs: [
        'Bring history to life for your students. We offer structured field trips and curriculum-linked educational packages that cover the waves of plantation immigration, camp structures, cultural preservation, and the economic history of Oʻahu.',
        'Our resources align directly with Hawaii Department of Education social studies and history standards, making field trips educational, engaging, and memorable.',
      ],
      cta: { label: 'Bring a class', page: 'learn' },
    },
    getInvolved: {
      stamp: 'Get involved',
      stampClass: 'green',
      title: 'Keep these houses standing',
      description:
        'Whether you become an annual member or make a one-time donation, your contribution directly funds critical cottage upkeep and cultural stewardship programs.',
      donation: {
        title: 'Give directly',
        description:
          'Help us protect the structural timbers and maintain the historical gardens surrounding our 25 camp cottages. 100% of direct donations go to site preservation.',
        items: DEFAULT_SITE_SETTINGS.donationPresets,
        cta: { label: 'Make a gift', page: 'support' },
      },
      membership: {
        title: 'Become a steward',
        description:
          'Belong to the village. Support repeat access and gain exclusive member benefits while securing the heritage of immigrant communities.',
        items: [
          { label: 'Free admission', text: 'for you and your guests all year.' },
          { label: '10% off', text: 'at the camp gift shop.' },
          { label: 'Ledger circular', text: 'print magazine subscription.' },
        ],
        cta: { label: 'See membership', page: 'support' },
      },
    },
    eventsHeader: {
      stamp: 'Happening at the village',
      stampClass: 'gold',
      title: 'Come for a festival, stay for the food',
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
          slug: 'obon-festival-event',
          date: 'AUG 15',
          title: 'Obon Festival & Bon Dance',
          time: '5:00 PM - 9:00 PM',
          desc: 'Celebrate plantation ancestral roots with traditional music, dancing, and local food stalls in the central courtyard.',
          image: '',
        },
        {
          slug: 'heritage-day-event',
          date: 'SEP 12',
          title: 'Plantation Heritage Day',
          time: '10:00 AM - 3:00 PM',
          desc: 'Live cultural demonstrations, including Portuguese stone-oven bread baking, Okinawan sanshin playing, and historic crafts.',
          image: '',
        },
      ],
    },
    testimonials: {
      items: [
        {
          slug: 'sarah-l',
          quote:
            'The curriculum-aligned worksheets made our field trip incredibly easy to organize. The students were completely absorbed in exploring the camp houses—they didn\'t want to leave!',
          authorName: 'Sarah L.',
          authorMeta: '4th Grade Teacher, HIDOE',
        },
        {
          slug: 'david-k',
          quote:
            'Standing inside the Japanese furo and seeing the Portuguese forno stone ovens brought back stories my grandmother used to tell me about Waipahu. It is incredibly authentic.',
          authorName: 'David K.',
          authorMeta: 'Honolulu Resident',
        },
        {
          slug: 'michael-r',
          quote:
            'One of the best visitor attraction sites on Oʻahu. It feels completely different from a static museum. The docents tell real human stories that make the plantation era come alive.',
          authorName: 'Michael R.',
          authorMeta: 'Traveler from Seattle',
        },
      ],
    },
    partners: {
      items: [
        { slug: 'hidoe', name: 'Hawaiʻi Department of Education' },
        { slug: 'tripadvisor-2026', name: 'Tripadvisor Travelers\' Choice 2026' },
        { slug: 'historic-hawaii', name: 'Historic Hawaiʻi Foundation' },
      ],
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
        'Please do not climb on historical structures or touch displays marked with preservation tags. Hawaiian Plantation Village is a smoke-free facility.',
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
      title: 'Built by the people who lived it',
      subtitle:
        'Founded by plantation workers and their descendants so their grandchildren would know where they came from.',
    },
    mission: {
      stamp: 'MISSION',
      title: 'Preserving the roots of modern Hawaiʻi',
      paragraphs: [
        'Hawaiian Plantation Village is an outdoor museum cataloging the historical memories of the waves of immigration that arrived between 1852 and 1946. Our mission is to share the history, culture, and values of the communities that shaped modern Hawaii.',
        'We maintain 25 authentic or reconstructed camp homes representing the domestic lives of the Chinese, Japanese, Filipino, Portuguese, Korean, Puerto Rican, Okinawan, and Spanish workers. It is a testament to the resilience, solidarity, and cross-cultural unity that gave birth to Hawaii\'s unique local identity.',
      ],
    },
    timelineIntro: {
      stamp: 'CHRONICLES',
      stampClass: 'rust',
      title: 'Plantation era timeline',
      description:
        'Key historical milestones of immigration waves, industrial growth, and cultural synthesis in Hawaii.',
    },
    leadershipIntro: {
      title: 'Leadership and board',
    },
    newsIntro: {
      stamp: 'NEWS',
      title: 'What is happening here',
    },
    careersIntro: {
      stamp: 'WORK WITH US',
      title: 'Join the preservation',
      description:
        'Help keep the stories of Waipahu\'s immigrant communities alive. Here is what we are hiring for.',
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
      items: [
        {
          slug: 'smokestack-restoration',
          title: 'Historic Oahu Sugar Co. Smokestack Restoration Underway',
          date: 'July 10, 2026',
          category: 'Preservation',
          summary:
            'A team of local masonry experts has begun repairing structural joints on the iconic 1917 smokestack to preserve Waipahu\'s skyline.',
          content:
            'We are thrilled to announce the commencement of the Oahu Sugar Co. Smokestack Restoration Project. Standing as a beacon of Waipahu\'s industrial sugar heritage, the 1917 concrete smokestack has faced severe weathering over the decades. Thanks to a generous grant from the Historic Hawaiʻi Foundation and community donations, local structural preservationists have begun scaffolding the column to repair micro-cracks and reinforce historical masonry joints. The project is expected to run through September, with no interruption to scheduled village tours.',
          image:
            'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
        },
        {
          slug: 'heritage-festival',
          title: 'Announcing the 34th Annual Plantation Heritage Festival',
          date: 'June 28, 2026',
          category: 'Community',
          summary:
            'Celebrate the rich multicultural heritage of Oʻahu on August 15th with traditional music, ethnic food booths, and living history demonstrations.',
          content:
            'Save the date! On Saturday, August 15, 2026, from 9:00 AM to 4:00 PM, Hawaiian Plantation Village will host our signature Annual Plantation Heritage Festival. Celebrate the multi-ethnic legacy that formed modern Hawaiʻi. The event features live performances including Japanese Taiko drumming, Portuguese folk dancing, Filipino Kulintang music, and Hawaiian hula. Food booths will serve authentic plantation-era treats like fresh malasadas, Chinese manapua, and plantation-style plate lunches. Admission is free, with voluntary donations supporting our educational outreach programs.',
          image:
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
        },
        {
          slug: 'bango-exhibit',
          title: 'New Permanent Exhibit: The Secret Language of Bango Tags',
          date: 'May 15, 2026',
          category: 'Exhibits',
          summary:
            'Explore the newly opened display in the Japanese Camp Cottage featuring over 150 authenticated bango metal identification tags.',
          content:
            'We are proud to unveil our latest permanent installation: "The Secret Language of Bango Tags." Located inside the Japanese Camp Cottage, this exhibit showcases a collection of original brass, copper, and tin bango tags used by workers to receive wages and identify themselves to camp lunas (overseers). Visitors will learn about the numbering codes, racial categorizations, and how workers personalized these tags. The exhibit also features oral history recordings from descendants sharing what these tags meant to their families.',
          image:
            'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=600&q=80',
        },
      ],
    },
    careers: {
      items: [
        {
          slug: 'docent',
          title: 'Cultural Heritage Docent & Tour Guide',
          type: 'Part-Time',
          department: 'Education & Guest Services',
          compensation: '$19.50 / hour',
          hours: '15-20 hours / week (includes Saturdays)',
          summary:
            'Bring plantation history to life by leading educational group excursions and public tours through our 25 camp cottages.',
          responsibilities: [
            'Lead groups of 10-25 visitors (students, tourists, and locals) through the historic camp houses.',
            'Explain the cultural history, lifestyles, and contributions of the various immigrant groups (1852-1946).',
            'Ensure the safety of visitors and the protection of museum artifacts during tours.',
            'Assist in setting up tour resources and answering guest questions at the visitor center.',
          ],
          requirements: [
            'Strong public speaking skills and enthusiasm for local history and multicultural storytelling.',
            'Basic knowledge of Hawaiʻi\'s history and plantation era (additional training provided).',
            'Ability to walk and stand outdoors on gravel pathways for up to 2 hours.',
            'Prior experience in education, museum docentry, or hospitality is highly preferred.',
          ],
        },
        {
          slug: 'restoration',
          title: 'Site Preservationist & Historical Carpenter',
          type: 'Full-Time',
          department: 'Maintenance & Preservation',
          compensation: '$26.00 - $30.00 / hour (DOE)',
          hours: '40 hours / week (Monday - Friday)',
          summary:
            'Maintain and restore the structural integrity of 25 authentic and reconstructed camp cottages using period-appropriate materials.',
          responsibilities: [
            'Inspect, repair, and maintain the wooden structures, roofs, and fences of the village cottage sites.',
            'Source and use period-appropriate building materials (e.g. Douglas fir, redwood, corrugated iron).',
            'Apply historic carpentry and joinery techniques to preserve the original architectural look and feel.',
            'Ensure all structural repairs adhere to historic preservation guidelines and safety standards.',
          ],
          requirements: [
            '3+ years of experience in carpentry, timber framing, or historic building preservation.',
            'Proficiency with hand and power tools; ability to read structural plans.',
          ],
        },
      ],
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
            'The First Filipino Sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment.',
        },
        {
          year: '1946',
          event:
            'The Oahu Sugar Company operations peak, transitioning into late-era modern farming until the mill\'s eventual closure in 1995.',
        },
        {
          year: '1992',
          event:
            'Hawaiian Plantation Village opens in Waipahu as a living cultural museum to preserve history and honor worker roots.',
        },
      ],
    },
    leadership: {
      items: [
        {
          slug: 'jeanne-ishikawa',
          name: 'Jeanne Ishikawa',
          role: 'Executive Director',
          desc: 'Oversees daily operations, site preservation projects, and curates cultural programs.',
        },
        {
          slug: 'glenn-kawatachi',
          name: 'Dr. Glenn Kawatachi',
          role: 'Board President',
          desc: 'Leads institutional fundraising, historical verification committees, and university partnerships.',
        },
        {
          slug: 'alvin-ramos',
          name: 'Alvin Ramos',
          role: 'Head Site Preservationist',
          desc: 'Maintains structural integrity of the 25 camp homes using original wood-grain carpentry tools.',
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
      title: 'Look closely at the record',
      subtitle:
        'Thousands of photographs survive from the plantation era and from the building of this village. Read them the way historians do: observe first, then ask what the image can and cannot tell you.',
    },
    collections: {
      eyebrow: 'Three collections',
      title: 'Where these photographs came from',
      description:
        'Every photograph in the archives arrives through one of three donations. Knowing who kept an image, and why, changes how you read it.',
      items: PHOTOGRAPH_COLLECTIONS,
    },
    howToLook: {
      eyebrow: 'How to look',
      title: 'A photograph is evidence, not a caption',
      description:
        'Captions on old prints are often written years later, by someone who was not there. Start with what is visible, then move outward to what it implies.',
      steps: [
        {
          title: 'Meet the photograph',
          note: 'Quick scan. What is the overall impression, before you name anything in it?',
        },
        {
          title: 'Observe its parts',
          note: 'People, objects, buildings, text, weather, light. List what you actually see.',
        },
        {
          title: 'Try to make sense of it',
          note: 'Who made it and for whom? What was happening around it? What is deliberately posed?',
        },
        {
          title: 'Use it as historical evidence',
          note: 'What does it prove, what does it only suggest, and what would you need to confirm it?',
        },
      ],
    },
    samples: {
      eyebrow: 'Worked examples',
      title: 'Two photographs read in sequence',
      description:
        'Single images rarely settle a question. Photographs taken minutes apart, by the same person, are what let you check a reading against a second view.',
      items: [
        {
          label: 'Sample 1',
          title: 'Outside, then inside the same house',
          arkIds: ['ark_70111_1ZgL', 'ark_70111_1ZgJ'],
          note:
            'The exterior shows a finished camp house: painted trim, intact roof, a lamp on the path. The interior of the same kind of structure shows bare single-wall boards and no ceiling. Read together, they explain why plantation housing could be raised quickly and why families remembered the heat, the cold, and every sound from the next room.',
        },
        {
          label: 'Sample 2',
          title: 'A building, then the people in front of it',
          arkIds: ['ark_70111_1ZgR', 'ark_70111_1ZgS'],
          note:
            'The first frame records a structure. The second puts a group in front of it, and the group is what dates the photograph: their clothing belongs to the museum era, not the plantation era. When people appear in a frame, ask whether they are the subject or the evidence of when the shutter opened.',
        },
      ],
    },
    analyze: {
      eyebrow: 'Analyze a photograph',
      title: 'Work through one image',
      description:
        'Answer in your own words. Your responses save in this browser only, so you can come back to them, and you can print or export the finished worksheet.',
      prompts: [
        {
          id: 'meet',
          heading: 'Meet the photograph',
          questions: [
            'Quickly scan the image. What do you notice first?',
            'Is it black and white, color, or hand-tinted? Posed or candid?',
          ],
        },
        {
          id: 'observe',
          heading: 'Observe its parts',
          questions: [
            'List the people, objects, and structures you can see.',
            'What words, numbers, or signs appear in the image?',
            'What activity is taking place?',
          ],
        },
        {
          id: 'sense',
          heading: 'Try to make sense of it',
          questions: [
            'When and where do you think it was taken, and what tells you that?',
            'Why do you think it was taken, and who was meant to see it?',
            'What is missing from the frame?',
          ],
        },
        {
          id: 'evidence',
          heading: 'Use it as historical evidence',
          questions: [
            'What does this photograph tell you about plantation life?',
            'What questions does it leave unanswered?',
            'What other source would help you confirm what you see?',
          ],
        },
      ],
    },
    resources: {
      eyebrow: 'Keep researching',
      title: 'Where to go next',
      description:
        'The archives are one entry point. These collections and books carry the research further.',
      items: [
        {
          label: 'Hawaiʻi Plantation Village archives',
          note: 'Request research access to originals, accession cards, and back-of-photo notes.',
          href: '',
        },
        {
          label: 'Hawaiʻi State Archives',
          note: 'Government records, immigration papers, and territorial photograph collections.',
          href: 'https://ags.hawaii.gov/archives/',
        },
        {
          label: 'Bishop Museum Library and Archives',
          note: 'Hawaiian language sources, maps, and one of the largest photograph holdings in the islands.',
          href: 'https://www.bishopmuseum.org/library-archives/',
        },
        {
          label: 'Ronald Takaki, Pau Hana: Plantation Life and Labor in Hawaii',
          note: 'The standard narrative history of plantation labor, camp life, and resistance.',
          href: '',
        },
        {
          label: 'National Archives photograph analysis worksheet',
          note: 'The observe / reflect / question method this page adapts for classroom use.',
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

export const newsArticles = [
  {
    id: 1,
    slug: 'smokestack-restoration',
    title: 'Historic Oahu Sugar Co. Smokestack Restoration Underway',
    date: 'July 10, 2026',
    category: 'Preservation',
    summary:
      'A team of local masonry experts has begun repairing structural joints on the iconic 1917 smokestack to preserve Waipahu\'s skyline.',
    content:
      'We are thrilled to announce the commencement of the Oahu Sugar Co. Smokestack Restoration Project. Standing as a beacon of Waipahu\'s industrial sugar heritage, the 1917 concrete smokestack has faced severe weathering over the decades. Thanks to a generous grant from the Historic Hawaiʻi Foundation and community donations, local structural preservationists have begun scaffolding the column to repair micro-cracks and reinforce historical masonry joints. The project is expected to run through September, with no interruption to scheduled village tours.',
    image:
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    slug: 'heritage-festival',
    title: 'Announcing the 34th Annual Plantation Heritage Festival',
    date: 'June 28, 2026',
    category: 'Community',
    summary:
      'Celebrate the rich multicultural heritage of Oʻahu on August 15th with traditional music, ethnic food booths, and living history demonstrations.',
    content:
      'Save the date! On Saturday, August 15, 2026, from 9:00 AM to 4:00 PM, Hawaiian Plantation Village will host our signature Annual Plantation Heritage Festival. Celebrate the multi-ethnic legacy that formed modern Hawaiʻi. The event features live performances including Japanese Taiko drumming, Portuguese folk dancing, Filipino Kulintang music, and Hawaiian hula. Food booths will serve authentic plantation-era treats like fresh malasadas, Chinese manapua, and plantation-style plate lunches. Admission is free, with voluntary donations supporting our educational outreach programs.',
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    slug: 'bango-exhibit',
    title: 'New Permanent Exhibit: The Secret Language of Bango Tags',
    date: 'May 15, 2026',
    category: 'Exhibits',
    summary:
      'Explore the newly opened display in the Japanese Camp Cottage featuring over 150 authenticated bango metal identification tags.',
    content:
      'We are proud to unveil our latest permanent installation: "The Secret Language of Bango Tags." Located inside the Japanese Camp Cottage, this exhibit showcases a collection of original brass, copper, and tin bango tags used by workers to receive wages and identify themselves to camp lunas (overseers). Visitors will learn about the numbering codes, racial categorizations, and how workers personalized these tags. The exhibit also features oral history recordings from descendants sharing what these tags meant to their families.',
    image:
      'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    slug: 'garden-volunteers',
    title: 'Volunteers Needed: Native Botanical Garden Maintenance',
    date: 'April 22, 2026',
    category: 'Volunteer',
    summary:
      'Join our weekly Tuesday gardening cohort to help nurture and catalog traditional medicinal plants brought by immigrant workers.',
    content:
      'Our ethno-botanical gardens are in need of green thumbs! Hawaiian Plantation Village houses a collection of native plants and medicinal herbs brought by successive waves of immigrants—from Chinese ginger and Portuguese rosemary to Filipino moringa (unggay) and traditional Hawaiian kalo. We are recruiting volunteers for our Tuesday Morning Gardening Cohort (8:30 AM - 11:30 AM). No professional gardening experience required; training on native cultivation and plant history will be provided by our senior landscape docent.',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
  },
];

export const careersList = [
  {
    id: 'docent',
    title: 'Cultural Heritage Docent & Tour Guide',
    type: 'Part-Time',
    department: 'Education & Guest Services',
    compensation: '$19.50 / hour',
    hours: '15-20 hours / week (includes Saturdays)',
    summary:
      'Bring plantation history to life by leading educational group excursions and public tours through our 25 camp cottages.',
    responsibilities: [
      'Lead groups of 10-25 visitors (students, tourists, and locals) through the historic camp houses.',
      'Explain the cultural history, lifestyles, and contributions of the various immigrant groups (1852-1946).',
      'Ensure the safety of visitors and the protection of museum artifacts during tours.',
      'Assist in setting up tour resources and answering guest questions at the visitor center.',
    ],
    requirements: [
      'Strong public speaking skills and enthusiasm for local history and multicultural storytelling.',
      'Basic knowledge of Hawaiʻi\'s history and plantation era (additional training provided).',
      'Ability to walk and stand outdoors on gravel pathways for up to 2 hours.',
      'Prior experience in education, museum docentry, or hospitality is highly preferred.',
    ],
  },
  {
    id: 'restoration',
    title: 'Site Preservationist & Historical Carpenter',
    type: 'Full-Time',
    department: 'Maintenance & Preservation',
    compensation: '$26.00 - $30.00 / hour (DOE)',
    hours: '40 hours / week (Monday - Friday)',
    summary:
      'Maintain and restore the structural integrity of 25 authentic and reconstructed camp cottages using period-appropriate materials.',
    responsibilities: [
      'Inspect, repair, and maintain the wooden structures, roofs, and fences of the village cottage sites.',
      'Source and use period-appropriate building materials (e.g. Douglas fir, redwood, corrugated iron).',
      'Apply historic carpentry and joinery techniques to preserve the original architectural look and feel.',
      'Ensure all structural repairs adhere to historic preservation guidelines and safety standards.',
    ],
    requirements: [
      '3+ years of experience in carpentry, timber framing, or historic building preservation.',
      'Proficiency with hand and power tools; ability to read structural plans.',
      'Knowledge of local wood rot prevention and historical preservation standards.',
      'Ability to lift up to 50 lbs and work comfortably on ladders/scaffolding.',
    ],
  },
  {
    id: 'gardener',
    title: 'Ethno-Botanical Garden Coordinator',
    type: 'Part-Time',
    department: 'Horticulture & Landscape',
    compensation: '$21.00 / hour',
    hours: '20 hours / week',
    summary:
      'Oversee the cultivation, labelling, and care of our historical crop plots, native plants, and immigrant medicinal gardens.',
    responsibilities: [
      'Maintain, plant, and weed the plantation-era agricultural plots (sugar cane, taro, sweet potato).',
      'Care for ethnic medicinal herb gardens representing Chinese, Japanese, Filipino, and Portuguese remedies.',
      'Lead and coordinate weekly volunteer gardening cohorts.',
      'Collaborate with the education team to update botanical signage and guide resources.',
    ],
    requirements: [
      'Experience in gardening, tropical horticulture, or organic farming.',
      'Interest in ethno-botany and the history of crop introduction in Hawaiʻi.',
      'Ability to perform physical outdoor labor in various weather conditions.',
      'Experience leading volunteers or working in community garden settings is a plus.',
    ],
  },
];

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
    slug: 'obon-festival-event',
    date: 'AUG 15',
    title: 'Obon Festival & Bon Dance',
    time: '5:00 PM - 9:00 PM',
    desc: 'Celebrate plantation ancestral roots with traditional music, dancing, and local food stalls in the central courtyard.',
  },
  {
    slug: 'heritage-day-event',
    date: 'SEP 12',
    title: 'Plantation Heritage Day',
    time: '10:00 AM - 3:00 PM',
    desc: 'Live cultural demonstrations, including Portuguese stone-oven bread baking, Okinawan sanshin playing, and historic crafts.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'The curriculum-aligned worksheets made our field trip incredibly easy to organize. The students were completely absorbed in exploring the camp houses—they didn\'t want to leave!',
    authorName: 'Sarah L.',
    authorMeta: '4th Grade Teacher, HIDOE',
  },
  {
    quote:
      'Standing inside the Japanese furo and seeing the Portuguese forno stone ovens brought back stories my grandmother used to tell me about Waipahu. It is incredibly authentic.',
    authorName: 'David K.',
    authorMeta: 'Honolulu Resident',
  },
  {
    quote:
      'One of the best visitor attraction sites on Oʻahu. It feels completely different from a static museum. The docents tell real human stories that make the plantation era come alive.',
    authorName: 'Michael R.',
    authorMeta: 'Traveler from Seattle',
  },
];

export const PARTNERS = [
  'HAWAIʻI DEPARTMENT OF EDUCATION',
  'TRIPADVISOR TRAVELER CHOICE 2026',
  'HISTORIC HAWAIʻI FOUNDATION',
];

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
      'The First Filipino Sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment.',
  },
  {
    year: '1946',
    event:
      'The Oahu Sugar Company operations peak, transitioning into late-era modern farming until the mill\'s eventual closure in 1995.',
  },
  {
    year: '1992',
    event:
      'Hawaiian Plantation Village opens in Waipahu as a living cultural museum to preserve history and honor worker roots.',
  },
];

export const LEADERSHIP = [
  {
    name: 'Jeanne Ishikawa',
    role: 'Executive Director',
    desc: 'Oversees daily operations, site preservation projects, and curates cultural programs.',
  },
  {
    name: 'Dr. Glenn Kawatachi',
    role: 'Board President',
    desc: 'Leads institutional fundraising, historical verification committees, and university partnerships.',
  },
  {
    name: 'Alvin Ramos',
    role: 'Head Site Preservationist',
    desc: 'Maintains structural integrity of the 25 camp homes using original wood-grain carpentry tools.',
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
