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
      { label: 'Book Excursion Tickets', page: 'tickets' },
      { label: 'Become a Member', page: 'support' },
      { label: 'Make a Donation', page: 'support' },
      { label: 'Volunteer Inquiry', page: 'support' },
    ],
    newsletter: {
      heading: 'JOIN THE LEDGER NEWSLETTER',
      description: 'Receive updates on seasonal festivals, lectures, and volunteer days.',
      placeholder: 'Your Email Address',
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
    badge: 'EST. 1992',
    title: 'Experience a Living History',
    subtitle: 'Walk in the footsteps of the immigrant communities that built modern Hawaiʻi.',
    ctaLabel: 'Explore the Village',
    videoSrc: '/Plantation_life_documentary_video_202607131034.mp4',
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
    whyVisit: {
      stamp: 'Living Museum',
      stampClass: 'green',
      title: 'Where Hawaiʻi\'s Roots Run Deep',
      paragraphs: [
        'Hawaiian Plantation Village is an outdoor, living history museum located in Waipahu. It tells the story of the immigrants who arrived in Hawaiʻi from China, Portugal, Japan, Puerto Rico, Korea, the Philippines, Okinawa, and other nations during the sugar plantation era (1852–1946).',
        'Explore 25 authentic, fully restored camp houses, complete with period furniture, personal artifacts, and lush heritage gardens. Walk the same paths as the workers, feel the heat of the stone ovens, and hear the stories of the community that shaped Hawaii\'s unique multicultural society.',
      ],
      primaryCta: { label: 'Discover Our History', page: 'about' },
      secondaryCta: { label: 'Plan Your Visit', page: 'visit' },
    },
    featuredBango: {
      stamp: 'Featured Narrative',
      stampClass: 'rust',
      title: 'The Bango System: Numbers Replacing Names',
      paragraphs: [
        'Upon arrival at the plantation, each immigrant worker was stripped of their name in the company ledgers and issued a small, stamped metal disk called a Bango tag.',
        'Because the plantation managers and overseers (Lunas) could not pronounce or easily spell the names of Chinese, Japanese, Portuguese, Korean, or Filipino workers, the Bango number became their identity. It dictated their work assignment, their pay ledger, and their credit at the company store.',
      ],
      quote:
        'My grandfather told me the bango was a constant weight in his pocket. But it also forced the camps to find a common language—Pidgin—to connect their true names behind those metal numbers.',
      quoteCite: '— Siu Lung Chang, Oral History Archive',
      cta: { label: 'Explore Camp Stories', page: 'stories' },
    },
    bellToBell: {
      stamp: 'Interactive Log',
      stampClass: 'rust',
      title: 'Step Into Their Shoes',
      description:
        'Simulate one day on the plantation. Hear the morning whistle, complete tasks in the cane rows, and gather in the community camp at sunset.',
    },
    educators: {
      stamp: 'For Educators',
      stampClass: 'teal',
      title: 'Curriculum & Field Trips',
      paragraphs: [
        'Bring history to life for your students. We offer structured field trips and curriculum-linked educational packages that cover the waves of plantation immigration, camp structures, cultural preservation, and the economic history of Oʻahu.',
        'Our resources align directly with Hawaii Department of Education social studies and history standards, making field trips educational, engaging, and memorable.',
      ],
      cta: { label: 'Schedule a Field Trip', page: 'learn' },
    },
    getInvolved: {
      stamp: 'Get Involved',
      stampClass: 'green',
      title: 'Support the Preservation of Waipahu\'s History',
      description:
        'Whether you become an annual member or make a one-time donation, your contribution directly funds critical cottage upkeep and cultural stewardship programs.',
      donation: {
        title: 'Direct Donation Impact',
        description:
          'Help us protect the structural timbers and maintain the historical gardens surrounding our 25 camp cottages. 100% of direct donations go to site preservation.',
        items: DEFAULT_SITE_SETTINGS.donationPresets,
        cta: { label: 'Make a Direct Gift', page: 'support' },
      },
      membership: {
        title: 'Steward Membership',
        description:
          'Belong to the village. Support repeat access and gain exclusive member benefits while securing the heritage of immigrant communities.',
        items: [
          { label: 'Free Admission', text: 'for you and guests all year round.' },
          { label: '10% Discount', text: 'at the historical camp gift shop.' },
          { label: 'Ledger circular', text: 'print magazine subscription.' },
        ],
        cta: { label: 'Join as a Member', page: 'support' },
      },
    },
    eventsHeader: {
      stamp: 'Calendar',
      stampClass: 'gold',
      title: 'Upcoming Community Programs',
    },
    testimonialsHeader: {
      stamp: 'Testimonials',
      stampClass: 'rust',
      title: 'What Visitors & Educators Say',
      description:
        'Hear from our community of school teachers, local residents, and travelers who have experienced the living history.',
    },
  },
  visit: {
    header: {
      stamp: 'VISITOR GUIDE',
      stampClass: 'green',
      title: 'Plan Your Visit',
      subtitle: 'Everything you need to know to prepare for your journey into Waipahu\'s history.',
    },
    hours: {
      title: 'Opening Hours',
      schedule: 'Tuesday – Saturday: 9:00 AM – 2:00 PM',
      closedNote: 'Closed on Sundays, Mondays, and major state holidays.',
      toursIntro:
        'To experience the stories fully, we highly recommend taking one of our daily guided tours led by resident docents:',
      tourSlots: [
        { label: 'Morning Tour', time: '10:00 AM daily' },
        { label: 'Midday Tour', time: '12:00 PM daily' },
      ],
      walkInNote:
        '*Walk-ins are accommodated based on availability. To guarantee your spot, please book tickets online in advance.',
    },
    parking: {
      address: '94-695 Waipahu Street, Waipahu, HI 96797',
      directions:
        'Located approximately 30 minutes from Waikīkī and Honolulu. Take H1 West to Exit 8B (Farrington Hwy), then turn right onto Waipahu Depo Road and right onto Waipahu Street.',
      parkingTitle: 'Free Visitor Parking Onsite',
      parkingDesc:
        'We offer free designated parking for passenger cars, school buses, and tour vans inside our secure lot.',
    },
    safety: {
      terrainTitle: 'Terrain & Navigation',
      terrainDesc:
        'The Village path is a dirt/gravel trail approximately 0.5 miles long. Comfortable walking shoes are highly recommended. Restrooms are fully ADA-compliant and located in the main visitor courtyard.',
      guidelinesTitle: 'Preserving Cultural Heritage',
      guidelinesDesc:
        'Please do not climb on historical structures or touch displays marked with preservation tags. Hawaiian Plantation Village is a smoke-free facility.',
    },
    group: {
      title: 'Group Visits & Private Tours',
      intro:
        'We welcome groups of all sizes, including tour operators, family reunions, historical organizations, and corporate outings. Group admission discounts are available for pre-registered groups of 10 or more.',
      commercialTitle: 'Operator Scheduling & Access',
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
      title: 'Admission Tickets',
      description:
        'Secure your tickets online to guarantee your guided tour slot and skip the check-in queue at the visitor center desk.',
      rates: [
        { label: 'Adults (13+)', price: '$17.00' },
        { label: 'Kamaʻāina / Military (with ID)', price: '$12.00' },
        { label: 'Seniors (62+)', price: '$12.00' },
        { label: 'Youth (5 - 12)', price: '$8.00' },
        { label: 'Child (Under 5)', price: 'Free' },
      ],
      buttonLabel: 'Book Tickets Online',
      buttonPage: 'tickets',
      schoolCta: {
        title: 'Bringing a School Group?',
        description:
          'We host educational class visits Tuesday through Friday. Learn about specialized curriculum programs and discounted school group pricing.',
        buttonLabel: 'School Field Trips',
        page: 'learn',
      },
      groupCta: {
        title: 'Private & Commercial Groups',
        description:
          'Are you organizing a tour operator, family reunion, or corporate event for 10+ people? Get special rates and a dedicated guide.',
        buttonLabel: 'Group Admission Rates',
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
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
      stamp: 'Preservation',
      stampClass: 'green',
      title: 'About the Village',
      subtitle:
        'A cultural sanctuary in Waipahu preserving stories and memories of Oʻahu\'s plantation communities.',
    },
    mission: {
      stamp: 'MISSION & VISION',
      title: 'Preserving the Roots of Modern Hawaiʻi',
      paragraphs: [
        'Hawaiian Plantation Village is an outdoor museum cataloging the historical memories of the waves of immigration that arrived between 1852 and 1946. Our mission is to share the history, culture, and values of the communities that shaped modern Hawaii.',
        'We maintain 25 authentic or reconstructed camp homes representing the domestic lives of the Chinese, Japanese, Filipino, Portuguese, Korean, Puerto Rican, Okinawan, and Spanish workers. It is a testament to the resilience, solidarity, and cross-cultural unity that gave birth to Hawaii\'s unique local identity.',
      ],
    },
    timelineIntro: {
      stamp: 'CHRONICLES',
      stampClass: 'rust',
      title: 'Plantation Era Timeline',
      description:
        'Key historical milestones of immigration waves, industrial growth, and cultural synthesis in Hawaii.',
    },
    leadershipIntro: {
      title: 'Leadership & Board',
    },
    newsIntro: {
      stamp: 'LEDGER REPORTS',
      title: 'News & Announcements',
    },
    careersIntro: {
      stamp: 'LABOR & STEWARDSHIP',
      title: 'Join the Preservation',
      description:
        'Help us keep the stories of Waipahu\'s immigrant communities alive. Discover our active career and volunteering opportunities below.',
    },
    contactIntro: {
      stamp: 'INQUIRY REGISTRATION',
      title: 'Send a Message',
      description:
        'Have questions about cottage history, schedules, or support? Fill out the registration form.',
      subjectOptions: [
        'General Inquiry',
        'Educational Tours',
        'Private Events',
        'Donation/Sponsorship',
        'Volunteering',
      ],
    },
  },
  stories: {
    header: {
      stamp: 'ORAL HISTORIES',
      stampClass: 'green',
      title: 'Plantation Stories',
      subtitle:
        'Explore the lives, struggles, and music of the eight immigrant communities that built Waipahu.',
    },
  },
  learn: {
    school: {
      stamp: 'Educator Experience',
      stampClass: 'green',
      title: 'Education & Field Trips',
      subtitle: 'Bring history to life. Explore educational packages and request school visits below.',
      resourcesIntro:
        'Start our HIDOE standard-aligned interactive lessons. Each package includes videos, guided reading, quizzes, and hands-on activities:',
      fieldTripNote:
        'Field trips require a minimum of 10 students and at least one adult chaperone per 10 children.',
    },
    youth: {
      stamp: 'Youth Paths & Service',
      stampClass: 'rust',
      title: 'Student & Youth Programs',
      subtitle:
        'Grow your skills, discover community history, and shape Waipahu\'s future through internships and volunteer guilds.',
    },
    family: {
      stamp: 'Ohana Learning',
      stampClass: 'teal',
      title: 'Family Learning & Workshops',
      subtitle:
        'Discover plantation heritage together. Hands-on weekend workshops, storytelling, and self-guided exploration for all ages.',
    },
  },
  play: {
    header: {
      stamp: 'KIDS PLAYGROUND',
      stampClass: 'green',
      title: 'Sugar Mill Tycoon',
      subtitle:
        'Experience the historical process of manufacturing sugar from raw crop in our PixiJS 2D Mill simulator!',
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
      stamp: 'STEWARDSHIP',
      stampClass: 'green',
      title: 'Support the Village',
      subtitle:
        'Your membership and donations directly fund cottage preservation and cultural programs.',
    },
    donate: {
      title: 'Make a Direct Gift',
      description:
        '100% of direct donations go to site preservation and educational outreach.',
    },
    membershipIntro: {
      title: 'Become a Member',
      description:
        'Join as a steward and enjoy year-round benefits while supporting Waipahu heritage.',
    },
    impactSidebar: {
      title: 'Your Impact',
      items: [
        'Maintains 25 historic camp cottages',
        'Funds school field trip scholarships',
        'Preserves oral history archives',
      ],
    },
  },
  tickets: {
    header: {
      stamp: 'BOOK YOUR VISIT',
      stampClass: 'green',
      title: 'Tickets & Reservations',
      subtitle:
        'Secure your guided tour slot and skip the check-in queue at the visitor center.',
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
