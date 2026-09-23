/**
 * Static site content. This file is the source of truth for site settings and
 * page copy: edit here and redeploy. Supabase is not read for these.
 *
 * The exceptions are the Content CMS tabs, which are still loaded at runtime:
 * stories, archives, upcoming events (home.events), event pages, news, careers
 * and curriculum. For those, the lists below are only the offline fallback.
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
      'A living museum that preserves and shares the stories of the people, cultures, communities and legacies that shaped Hawaiʻi\'s plantation era and the islands today.',
    estBadge: 'EST. 1992',
  },
  nav: [
    { id: 'visit', label: 'Visit' },
    { id: 'explore', label: 'Explore' },
    { id: 'stories', label: 'Stories' },
    { id: 'archives', label: 'Collections' },
    { id: 'play', label: 'Play & Learn' },
    { id: 'learn', label: 'Education' },
    { id: 'events', label: 'Events' },
    { id: 'support', label: 'Support Us' },
    { id: 'about', label: 'About' },
  ],
  footer: {
    brand: 'Hawaii\'s Plantation Village',
    invitation: 'There is more to the story. Come discover with us.',
    invitationLinks: [
      { label: 'Plan Your Visit', page: 'visit' },
      { label: 'Get Tickets', page: 'tickets' },
    ],
    text:
      'A living museum that preserves and shares the stories of the people, cultures, communities and legacies that shaped Hawaiʻi\'s plantation era and the islands today.',
    copyright: '© 2026 Hawaii\'s Plantation Village. All rights reserved.',
    ctaLinks: [
      { label: 'Get tickets', page: 'tickets' },
      { label: 'Become a member', page: 'support' },
      { label: 'Make a gift', page: 'support' },
      { label: 'Volunteer with us', page: 'volunteer' },
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
    email: 'Waipahu.hpv@gmail.com',
    emailHref: 'mailto:Waipahu.hpv@gmail.com',
    address: {
      line1: '94-695 Waipahu Street',
      line2: 'Waipahu, Oʻahu, Hawaiʻi 96797',
    },
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.141857904033!2d-158.00941912384777!3d21.38428548035626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c0065961d6fbcd7%3A0x7d27e7f6e2b17a19!2sHawaii%27s%20Plantation%20Village!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
  },
  hours: {
    schedule: 'Monday – Saturday: 9:00 AM – 2:00 PM',
    toursNote: 'Guided tour at 10:00 AM',
    closedNote: 'Closed on Sundays and major state holidays.',
    parking: 'Free Visitor Parking Onsite',
  },
  hero: {
    eyebrow: 'Waipahu, Oʻahu · A living museum',
    headline: 'Experience the stories that shaped Hawaiʻi.',
    support:
      'Discover the homes, gardens, traditions and stories of the people who lived and worked in Hawaiʻi\'s plantation communities and the cultures they carried.',
    rotatingLine: 'History isn\'t only something we remember. It\'s something we live.',
    primaryCta: { label: 'Plan Your Visit' },
    secondaryCta: { label: 'Discover the Village' },
    stats: [
      { value: '1973', label: 'Our story began' },
      { value: '1992', label: 'The Village opened' },
      { value: '8', label: 'Cultural traditions' },
      { value: '4', label: 'Free community festivals' },
    ],
    videoSrc: '/gwr_video_mvp.mp4',
    posterSrc: '/digitized-photos/IMG_6805.webp',
  },
  seo: {
    title: 'Hawaii\'s Plantation Village | A Living Museum in Waipahu, Oʻahu',
    description:
      'Come understand how Hawaiʻi became Hawaiʻi. Step inside historic homes, gardens and cultural traditions at a living museum in Waipahu, Oʻahu, and meet the people who shaped the islands.',
    keywords: [
      'Hawaii\'s Plantation Village',
      'Waipahu history',
      'plantation museum',
      'Oʻahu field trips',
      'immigration history Hawaii',
    ],
  },
  donationPresets: [
    { amount: 25, label: '$25 helps preserve and document photographs and artifacts.' },
    { amount: 50, label: '$50 supports collections care and archival work.' },
    { amount: 100, label: '$100 helps care for historic homes, gardens and exhibits.' },
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
  {
    id: 'cny_2018',
    name: 'Chinese New Year Festival (2018)',
    blurb:
      'Lion dance blessings, martial arts demonstrations, traditional costumes, and festive community celebrations welcoming the Year of the Dog at Hawaii\'s Plantation Village.',
  },
  {
    id: 'rice_fest_2018',
    name: 'Rice Festival (2018)',
    blurb:
      'Traditional rice harvesting demonstrations, mochi pounding, cultural cooking, crafts, and multi-ethnic community celebrations honoring Hawaii\'s agricultural roots.',
  },
  {
    id: 'cny_2020',
    name: 'Lunar New Year Celebration (2020)',
    blurb:
      'Lunar New Year festivities, cultural performances, village docents in historical attire, and family gatherings across the village grounds in February 2020.',
  },
  {
    id: 'hpv_dedication',
    name: 'Village Dedication & Cultural Blessing (2019)',
    blurb:
      'Ceremonial village dedication, cultural blessings, and gatherings of Micronesian and multicultural community leaders on November 2, 2019.',
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
        primary: 'Monday – Saturday: 9:00 AM – 2:00 PM',
        secondary: 'Guided tour at 10:00 AM',
      },
      location: {
        title: 'LOCATION',
        primary: '94-695 Waipahu Street',
        secondary: 'Waipahu, Oʻahu (Free parking onsite)',
      },
      admission: {
        title: 'ADMISSION',
        primary: 'General: $25 | Senior/Kamaʻāina/Military: $20',
        secondary: 'Youth (11–17): $12 | Children (5–10): $8 | 4 & under: Free',
      },
    },
    cultures: {
      eyebrow: 'Homes, gardens & cultural traditions',
      title: 'Many journeys. Different cultures. One shared history.',
      description:
        'People came to Hawaiʻi from across Asia, Europe, the Pacific and the Americas, bringing languages, foods, faiths, celebrations, skills and memories of home.',
      paragraphs: [
        'People came to Hawaiʻi from across Asia, Europe, the Pacific and the Americas, bringing languages, foods, faiths, celebrations, skills and memories of home.',
        'At the Village, historic homes, community spaces, artifacts and gardens reveal how families lived, worked, celebrated and built community across generations.',
      ],
      closing: 'Step inside. Look closely. Every home has a unique story to tell.',
      items: [
        { name: 'Hawaiian', note: 'The land, her people and the world before sugar' },
        { name: 'Chinese', note: 'Migration, family and community' },
        { name: 'Portuguese', note: 'Family, food, faith and celebration' },
        { name: 'Japanese', note: 'Home, work, faith and tradition' },
        { name: 'Okinawan', note: 'Identity, memory and community' },
        { name: 'Puerto Rican', note: 'Home, tradition and island connections' },
        { name: 'Korean', note: 'Migration, community and cultural tradition' },
        { name: 'Filipino', note: 'Sakada journeys, family and resilience' },
      ],
    },
    planVisit: {
      eyebrow: 'Plan your visit',
      title: 'Come walk through history with us.',
      description:
        'Take your time. Breathe as you step inside the homes. Wander our lush gardens. Be curious and ask questions. Hear the stories from the people who lived them.',
      paragraphs: [
        'Take your time. Breathe as you step inside the homes. Wander our lush gardens. Be curious and ask questions. Hear the stories from the people who lived them.',
        'Whether Hawaiʻi is home or you\'re discovering the islands for the first time, a visit to Hawaii\'s Plantation Village offers a deeper understanding of the people and cultures that continue to shape this unique gem in Waipahu.',
      ],
      essentials: [
        'Monday–Saturday · 9:00 AM–2:00 PM',
        '94-695 Waipahu Street · Waipahu, Oʻahu',
        'Free on-site parking',
      ],
      items: [
        { title: 'Tickets & Hours', note: 'Everything you need to plan your day.', page: 'tickets' },
        { title: 'Group Visits', note: 'Tours for community groups, organizations and travel partners.', page: 'visit' },
        { title: 'School Visits', note: 'Bring Hawaiʻi\'s history beyond the classroom.', page: 'learn' },
        { title: 'Accessibility', note: 'Information to help everyone feel welcome at the Village.', page: 'visit' },
      ],
    },
    whyVisit: {
      stamp: 'The village',
      stampClass: 'green',
      title: 'History has a home here.',
      paragraphs: [
        'Hawaii\'s Plantation Village was created by visionaries who understood that an important part of Hawaii\'s story could disappear if no one chose to preserve it.',
        'Beginning in the 1970s, former plantation workers, descendants and community members came together to save the buildings, belongings, photographs, gardens and memories of plantation life.',
        'Rather than telling these stories from a distance, they helped create a place where future generations could walk through a living museum.',
        'Today, visitors can enter historic homes and community structures, encounter objects from everyday life and explore our lush gardens with a plethora of local foods and plants connected to the unique plantation cultures represented here.',
        'Our docents bring these stories to life through animated anecdotes of work and hardship, family and faith, struggle and solidarity, celebration and change.',
        'Together, we experience how people from diverse regions helped shape the Hawaiʻi we know today.',
      ],
      primaryCta: { label: 'Discover Our Story', page: 'about' },
      secondaryCta: { label: 'Plan Your Visit', page: 'visit' },
    },
    featuredBango: {
      stamp: 'Okada Education Center',
      stampClass: 'rust',
      title: 'Where memory becomes history.',
      paragraphs: [
        'Every photograph has a story. Every object carries a memory. Together, these help us understand lives that may otherwise be forgotten.',
        'The Okada Education Center is named after Hideo “Major” Okada, a former sugar worker, labor organizer and one of the founders of Hawaii\'s Plantation Village.',
        'Here, visitors explore exhibitions on immigration, plantation life and labor, as well as the history of World War II incarceration at Honouliuli.',
        'Behind the scenes, volunteers care for a growing collection of photographs, documents and artifacts donated by families across Hawaiʻi.',
        'These are not simply records of the past but treasured pieces of familial history, entrusted to us for the future.',
      ],
      quote: '',
      quoteCite: '',
      cta: { label: 'Explore the Collections', page: 'archives' },
    },
    bellToBell: {
      stamp: 'Interactive history',
      stampClass: 'rust',
      title: 'A day in plantation life',
      description:
        'The whistle sounds before sunrise. What might an ordinary day have looked like for a plantation worker and family? Follow the rhythms of work, meals and community life through an interactive journey inspired by historical accounts and objects in our collection.',
      cta: { label: 'Begin the Journey' },
    },
    educators: {
      stamp: 'For educators & students',
      stampClass: 'teal',
      title: 'History feels different when you experience it',
      paragraphs: [
        'Bring learning beyond the classroom.',
        'At Hawaii\'s Plantation Village, students enter historic homes, explore cultural gardens, encounter everyday objects and hear stories that connect Hawaiʻi\'s plantation era to the islands they know today.',
        'Guided experiences invite students to explore migration, labor, cultural exchange, family, community and change through the lives of real people.',
        'A visit can complement classroom learning before, during and after your field trip and give students something no textbook can: a sense of place.',
      ],
      cta: { label: 'Plan a School Visit', page: 'learn' },
      secondaryCta: { label: 'Educator Resources', page: 'learn' },
    },
    getInvolved: {
      stamp: 'Help us keep our stories alive',
      stampClass: 'green',
      title: 'What we preserve today becomes tomorrow\'s legacy.',
      description:
        'Hawaii\'s Plantation Village exists because generations of people knew these stories mattered. You can help us carry this important work forward.',
      paragraphs: [
        'Hawaii\'s Plantation Village exists because generations of people knew these stories mattered.',
        'You can help us carry this important work forward.',
        'Your support cares for historic homes and gardens, preserves photographs and artifacts, welcomes students, sustains cultural programs and helps ensure that future generations can discover the people who helped shape Hawaiʻi.',
      ],
      donation: {
        title: 'Make a gift',
        description: 'Every gift helps preserve a piece of Hawaiʻi\'s shared history.',
        items: DEFAULT_SITE_SETTINGS.donationPresets,
        closing: 'Every gift matters.',
        cta: { label: 'Donate Today', page: 'support' },
      },
      membership: {
        title: 'Belong to the Village.',
        description:
          'Membership is more than admission. It\'s a way to stand behind a place that keeps Hawaiʻi\'s stories alive. Members help sustain exhibitions, educational programs, community festivals, collections care and the historic Village itself—while enjoying opportunities to return throughout the year.',
        items: [
          { label: 'Visit often', text: 'Enjoy admission throughout your membership year.' },
          { label: 'Bring someone with you', text: 'Share the Village with your loved ones, family and friends.*' },
          { label: 'Stay connected', text: 'Receive news about our programs, festivals and Village life.' },
          { label: 'Make an impact', text: 'Help preserve these stories for generations to come.' },
        ],
        cta: { label: 'Become a Member', page: 'support' },
      },
    },
    volunteer: {
      stamp: 'Volunteer',
      stampClass: 'gold',
      title: 'History needs people – YOU.',
      paragraphs: [
        'The Village exists because people showed up.',
        'They preserved buildings, donated family photographs, planted gardens, recorded memories, led tours, made repairs and shared traditions.',
        'This spirit continues today.',
        'Whether you love history, gardening, education, archives, cultural programs or simply working with the community, there is a place for you at Hawaii\'s Plantation Village.',
        'You do not need to be a historian. You just need to care that these stories survive.',
      ],
      cta: { label: 'Volunteer With Us', page: 'volunteer' },
    },
    eventsHeader: {
      stamp: 'Events at the Village',
      stampClass: 'gold',
      title: 'Come explore our culture with us.',
      description:
        'Throughout the year, Hawaii\'s Plantation Village comes alive with music, food, dance, storytelling, cultural traditions and community celebrations. Come experience traditions passed from one generation to the next and make some memories of your own.',
      cta: { label: 'See All Events', page: 'events' },
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
          desc: 'Ring in the new year with lion blessings, student performers, food and games across the Village.',
          ctaLabel: 'Festival Details',
          image: '',
        },
        {
          slug: 'obon-in-the-village',
          date: 'Seasonal',
          title: 'Obon in the Village',
          time: 'Late afternoon',
          desc: 'Dance with us as lanterns light the Village and taiko drums carry Hawaiʻi\'s Obon season into the evening.',
          ctaLabel: 'Festival Details',
          image: '',
        },
        {
          slug: 'portuguese-festa',
          date: 'Seasonal',
          title: 'Portuguese Festa',
          time: '',
          desc: 'Sweet bread from the forno, music on the Village stage and a community celebration everyone is welcome to join.',
          ctaLabel: 'Festival Details',
          image: '',
        },
        {
          slug: 'harvest-festival',
          date: 'Seasonal',
          title: 'Harvest Festival',
          time: '',
          desc: 'Celebrate Hawaiʻi\'s harvest traditions with food, culture, family activities and community at the Village.',
          ctaLabel: 'Festival Details',
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
      stamp: 'Plan your visit',
      stampClass: 'green',
      title: 'Come walk through history with us.',
      subtitle:
        'Take your time. Breathe as you step inside the homes. Wander our lush gardens. Be curious and ask questions. Hear the stories from the people who lived them.',
    },
    hours: {
      title: 'Opening hours',
      schedule: 'Monday – Saturday: 9:00 AM – 2:00 PM',
      closedNote: 'Closed on Sundays and major state holidays.',
      toursIntro:
        'To experience the stories fully, we highly recommend taking our daily guided tour led by resident docents:',
      tourSlots: [
        { label: 'Morning tour', time: '10:00 AM Mon – Sat' },
      ],
      lastEntryNote: 'Last entry for self-tour is at 1:00 PM.',
      walkInNote:
        'Call (808) 677-0110 to reserve a guided tour. Self-tours are also available.',
    },
    parking: {
      address: '94-695 Waipahu Street, Waipahu, HI 96797',
      directions:
        'Located approximately 30 minutes from Waikīkī and Honolulu. Take H1 West to exit #7 (Waikele/Waipahu). Coming off H1, turn left at the stoplight onto Paiwa St, then turn right at the 5th traffic signal onto Waipahu St. Entrance is on your left.',
      parkingTitle: 'Free visitor parking onsite',
      parkingDesc:
        'We offer free designated parking for passenger cars, school buses, and tour vans inside our secure lot.',
    },
    safety: {
      intro: 'We care about you. You are welcomed here.',
      terrainTitle: 'Terrain and navigation',
      terrainDesc:
        'The Village path is a dirt/gravel trail approximately 0.5 miles long. Comfortable walking shoes are highly recommended. Restrooms are fully ADA-compliant and located in the main visitor courtyard. We do encounter dogs and wildlife like ducks and native birds on the property. Service animals on leash are welcomed.',
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
        { label: 'General Admission', price: '$25.00' },
        { label: 'Senior 62+ / Kamaʻāina / Military (Active/Retired)', price: '$20.00' },
        { label: 'Youth (11 – 17)', price: '$12.00' },
        { label: 'Children (5 – 10)', price: '$8.00' },
        { label: 'Children (4 & under)', price: 'Free' },
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
          a: 'Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings. The only exception is when the City issues a closure of City buildings and services during a tropical storm.',
        },
      ],
    },
  },
  about: {
    header: {
      stamp: 'About Hawaii\'s Plantation Village',
      stampClass: 'green',
      title: 'Built by community. Preserved for generations.',
      subtitle:
        'Hawaii\'s Plantation Village began with a simple but urgent idea: don\'t let these stories disappear.',
    },
    mission: {
      stamp: 'MISSION',
      title: 'What emerged was more than a collection. It became a Village.',
      paragraphs: [
        'In 1973, former plantation workers, descendants and community members began working to preserve the history of plantation life in Hawaiʻi.',
        'Historic structures were gathered and restored. Families donated furniture, photographs and personal belongings. Cultural organizations helped furnish homes and plant gardens. Volunteers shared knowledge that could not always be found in history books.',
        'Hawaii\'s Plantation Village opened to the public in 1992.',
        'Today, we continue that community-led mission: preserving the places, objects and memories of Hawaiʻi\'s plantation era while creating opportunities for new generations to encounter, question and understand that history.',
      ],
      quote: 'A living museum, for the people by the people.',
      quoteCite: '',
    },
    closing: {
      stamp: 'Join us',
      stampClass: 'gold',
      title: 'History lives when people engage with it.',
      paragraphs: [
        'Through exhibitions, guided tours, education, festivals, cultural programs, oral histories and community partnerships, we connect the past with the Hawaiʻi of today.',
        'The Village was built so these stories would survive. Our responsibility now is to make sure they continue to matter.',
        'It really does take a village — so do join us today.',
      ],
      cta: { label: 'Plan Your Visit', page: 'visit' },
      secondaryCta: { label: 'Volunteer With Us', page: 'volunteer' },
    },
    timelineIntro: {
      stamp: 'CHRONICLES',
      stampClass: 'rust',
      title: 'From camps to village',
      description:
        'Immigration waves that shaped plantation Hawaiʻi, and the founding of the Friends and the Village that tells their story.',
    },
    leadershipIntro: {
      title: 'Founders and builders',
    },
    teamIntro: {
      stamp: 'OUR PEOPLE',
      title: 'Staff & Board Leadership',
      description:
        'HPV runs on institutional knowledge carried by the people who’ve stayed — some for decades — alongside new leadership and governance rebuilding the systems around them.',
      staffPhoto: '/images/Staffphotos/staff-group.jpg',
      staffPhotoAlt:
        "Hawaii's Plantation Village staff and team members gathered before the village sugarcane fields",
      staffPhotoCaption:
        "The Hawaii's Plantation Village team and docents at the historic village grounds in Waipahu.",
      staffLabel: 'Staff',
      boardLabel: 'Board of Directors',
      note:
        'Plus a dedicated corps of docents and volunteers — several with decades of service — who lead tours, run programs, and keep the Village open every week.',
    },
    staff: {
      items: [
        {
          slug: 'loretta-chen',
          name: 'Dr. Loretta Chen',
          role: 'Executive Director',
        },
        {
          slug: 'derrick-iwata',
          name: 'Derrick Iwata',
          role: 'Education & Programs Manager',
        },
        {
          slug: 'mil-holliday',
          name: 'Mil Holliday',
          role: 'Administration Manager',
        },
        {
          slug: 'michi-lacar',
          name: 'Michi Lacar',
          role: 'Programs Coordinator',
        },
        {
          slug: 'eli-flores',
          name: 'Eli Flores',
          role: 'Museum Technician',
        },
      ],
    },
    board: {
      items: [
        { slug: 'kats-gustafson', name: 'Dr. Kats Gustafson', role: 'Board President' },
        { slug: 'steven-yuen', name: 'Steven Yuen', role: 'Board Vice President' },
        { slug: 'clement-bautista', name: 'Clement Bautista', role: 'Board Treasurer' },
        { slug: 'william-rol', name: 'William Rol', role: 'Board Member' },
        { slug: 'john-shockley', name: 'John Shockley', role: 'Board Member' },
        { slug: 'carol-takahashi', name: 'Carol Takahashi', role: 'Board Member' },
        {
          slug: 'yoshiko-yamauchi',
          name: 'Yoshiko Yamauchi',
          role: 'Board Member',
        },
        { slug: 'paul-nishimura', name: 'Paul Nishimura', role: 'Board Member' },
      ],
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
      stamp: 'Stories from the Village',
      stampClass: 'green',
      title: 'History is made of human lives.',
      subtitle:
        'Behind every photograph is a person. Behind every object is a story. Behind every home are generations of memories. Meet the workers, families, cultural practitioners and community members whose experiences illuminate Hawaiʻi\'s plantation past and its continuing legacy.',
    },
  },
  archives: {
    header: {
      stamp: 'Collections & archives',
      stampClass: 'green',
      title: 'What families saved, Hawaiʻi remembers.',
      subtitle:
        'Photographs tucked into albums. Letters carried across oceans. Work tools worn smooth by use. Clothing saved for decades. Objects from kitchens, bedrooms and places of worship. Individually, they may seem ordinary. Together, they tell an extraordinary story.',
    },
    collections: {
      eyebrow: 'Featured collections',
      title: 'Photograph collections',
      description:
        'Hawaii\'s Plantation Village cares for photographs, documents, artifacts and oral histories that preserve the experiences of plantation communities across generations. Knowing who kept an image, and why, changes how you read it.',
      items: PHOTOGRAPH_COLLECTIONS,
      cta: { label: 'Explore the Collection', page: 'archives' },
      secondaryCta: { label: 'Donate an Object or Photograph', page: 'about' },
    },
    howToLook: {
      eyebrow: 'Reading a photograph',
      title: 'Questions That Help Us Look Closer',
      description:
        'Photographs can tell us far more than what we see at first glance. When exploring images from our archives, use these questions to look more closely, notice details, consider context and uncover the stories an image may hold.',
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
          arkIds: ['img_6115', 'img_6330'],
          note:
            'In the study guide, Sample 1 uses metadata — filing category, subject, donor, accession year — and clues such as vehicles to date an undated street scene. Here, an exterior and an interior of camp housing work the same way: read what is visible in each frame, then ask what the pair can tell you that either image alone cannot.',
        },
        {
          label: 'Sample 2',
          title: 'A building, then the people and objects inside it',
          arkIds: ['img_6820', 'img_6420'],
          note:
            'Study Guide Sample 2 shows how a group event photograph can contradict assumptions — for example, that the Filipino community was primarily male by 1937. When people and named businesses appear in a frame, ask whether they are the subject or the evidence of when the shutter opened, and what the group composition challenges in your prior knowledge.',
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
      stamp: 'For educators & students',
      stampClass: 'green',
      title: 'History feels different when you experience it',
      subtitle:
        'Bring learning beyond the classroom. At Hawaii\'s Plantation Village, students enter historic homes, explore cultural gardens, encounter everyday objects and hear stories that connect Hawaiʻi\'s plantation era to the islands they know today.',
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
      stamp: 'Help us keep our stories alive',
      stampClass: 'green',
      title: 'What we preserve today becomes tomorrow\'s legacy.',
      subtitle:
        'Hawaii\'s Plantation Village exists because generations of people knew these stories mattered. You can help us carry this important work forward.',
    },
    donate: {
      title: 'Make a gift',
      description:
        'Every gift helps preserve a piece of Hawaiʻi\'s shared history.',
    },
    membershipIntro: {
      title: 'Belong to the Village.',
      description:
        'Membership is more than admission. It\'s a way to stand behind a place that keeps Hawaiʻi\'s stories alive.',
    },
    impactSidebar: {
      title: 'Where your support goes',
      items: [
        'Cares for historic homes and gardens',
        'Preserves photographs and artifacts',
        'Welcomes students and sustains cultural programs',
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
  explore: {
    header: {
      stamp: 'Homes, gardens & cultural traditions',
      stampClass: 'green',
      title: 'Many journeys. Different cultures. One shared history.',
      subtitle:
        'People came to Hawaiʻi from across Asia, Europe, the Pacific and the Americas, bringing languages, foods, faiths, celebrations, skills and memories of home.',
    },
    intro: {
      paragraphs: [
        'At the Village, historic homes, community spaces, artifacts and gardens reveal how families lived, worked, celebrated and built community across generations.',
      ],
      closing: 'Step inside. Look closely. Every home has a unique story to tell.',
    },
  },
  events: {
    header: {
      stamp: 'Events at the Village',
      stampClass: 'gold',
      title: 'Come explore our culture with us.',
      subtitle:
        'Throughout the year, Hawaii\'s Plantation Village comes alive with music, food, dance, storytelling, cultural traditions and community celebrations.',
    },
    intro: {
      paragraphs: [
        'Come experience traditions passed from one generation to the next and make some memories of your own.',
      ],
      cta: { label: 'Plan Your Visit', page: 'visit' },
    },
  },
  volunteer: {
    header: {
      stamp: 'Volunteer',
      stampClass: 'gold',
      title: 'History needs people – YOU.',
      subtitle: 'The Village exists because people showed up.',
    },
    intro: {
      paragraphs: [
        'They preserved buildings, donated family photographs, planted gardens, recorded memories, led tours, made repairs and shared traditions.',
        'This spirit continues today.',
        'Whether you love history, gardening, education, archives, cultural programs or simply working with the community, there is a place for you at Hawaii\'s Plantation Village.',
      ],
      closing: 'You do not need to be a historian. You just need to care that these stories survive.',
    },
    ways: {
      title: 'Where you can help',
      items: [
        { title: 'Docents & tours', note: 'Walk visitors through the homes and share the stories behind them.' },
        { title: 'Gardens & grounds', note: 'Plant, tend and harvest the cultural gardens that surround the Village.' },
        { title: 'Collections & archives', note: 'Help process photographs, documents and artifacts entrusted to us by families.' },
        { title: 'Festivals & programs', note: 'Set up, welcome and celebrate alongside the community at our free festivals.' },
        { title: 'Repairs & preservation', note: 'Keep the historic structures standing with carpentry, painting and maintenance.' },
        { title: 'Office & welcome desk', note: 'Greet visitors, answer questions and keep the day running.' },
      ],
    },
    cta: {
      title: 'Volunteer With Us',
      description:
        'Tell us a little about yourself and what you would like to help with. We will be in touch about upcoming volunteer days and orientations.',
    },
  },
};

// ---------------------------------------------------------------------------
// Content collections
// ---------------------------------------------------------------------------

export const newsArticles = [];

export const careersList = [];

/**
 * Complete photograph archives catalog.
 * Curated historical village photographs and newly digitized event collections.
 */
export { PHOTOGRAPHS } from './photographsData.js';

export const CAMPS_DATA = [
  {
    id: 'hawaiian',
    culture: 'Hawaiian',
    title: 'The Hawaiian Hale & Taro Patch',
    arrival: 'Before plantation era',
    isPlaceholder: true,
    shortDesc:
      'Native Hawaiian families lived on this land long before the plantation, tending loʻi kalo and sharing traditions with the immigrant camps that grew up around them.',
    fullHistory:
      'Long before contract laborers arrived, Native Hawaiian families cultivated the ahupuaʻa of Waipahu, tending loʻi kalo (taro patches) fed by the ʻauwai (irrigation channels) that later shaped the plantation\'s own ditch system. As the sugar era grew, Hawaiian families remained woven into camp life — teaching neighbors to fish, pound poi, and read the land — even as their own community was reshaped by the plantation around them.',
    oralHistory: {
      narrator: 'Leimomi Kahale (Kupuna, Taro Patch Keeper)',
      length: '3m 05s',
      audioSimText: 'Recording: Kahale ʻohana oral history, recorded 1996.',
      transcript:
        '“My tūtū kept the loʻi going even after the ditch water was diverted for cane. She said the taro remembered this valley long before the mill whistle ever did. Workers from every camp came to trade for poi, and she taught their children the names of the wind and rain here. The plantation changed everything around us, but the kalo kept us rooted.”',
    },
  },
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
    id: 'okinawan',
    culture: 'Okinawan',
    title: 'The Okinawan Sanshin & Prefectural Club',
    arrival: '1900',
    isPlaceholder: true,
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
    id: 'puerto_rican',
    culture: 'Puerto Rican',
    title: 'The Puerto Rican Casita',
    arrival: '1900',
    isPlaceholder: true,
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
    id: 'korean',
    culture: 'Korean',
    title: 'The Korean Protestant Community Cottage',
    arrival: '1903',
    isPlaceholder: true,
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
    id: 'filipino',
    culture: 'Filipino',
    title: 'The Filipino Single-Men Barracks',
    arrival: '1906',
    isPlaceholder: true,
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
];

export const HOME_EVENTS = [
  {
    slug: 'lunar-new-year',
    startDate: '',
    endDate: '',
    date: 'Seasonal',
    title: 'Multi-ethnic Lunar New Year Celebration',
    time: '',
    desc: 'A free village festival with cultural entertainment, food, games, and displays — including Chinese lion blessings and student performers.',
  },
  {
    slug: 'obon-in-the-village',
    startDate: '',
    endDate: '',
    date: 'Seasonal',
    title: 'Opening of Hawaiʻi\'s Obon season',
    time: 'Late afternoon',
    desc: 'Obon in the village begins in late afternoon, when lanterns light the dancing area with drum accompaniment.',
  },
  {
    slug: 'portuguese-festa',
    startDate: '',
    endDate: '',
    date: 'Seasonal',
    title: 'Portuguese Festa',
    time: '',
    desc: 'A free community festa with entertainment on the village stage, food tasting, and cultural displays.',
  },
  {
    slug: 'harvest-festival',
    startDate: '',
    endDate: '',
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
    a: 'Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings. The only exception is when the City issues a closure of City buildings and services during a tropical storm.',
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
