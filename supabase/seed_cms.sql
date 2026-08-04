-- HPV CMS seed (idempotent)
-- Run after: 20260714000000_initial_schema.sql, 20260714100000_cms_full.sql, and seed.sql
-- Requires guided-tour event from seed.sql

-- ---------------------------------------------------------------------------
-- Site settings
-- ---------------------------------------------------------------------------

insert into public.site_settings (id, payload)
values (
  'default',
  '{
    "brand": {
      "title": "Hawaiian Plantation Village",
      "subtitle": "Waipahu, Oʻahu, Hawaiʻi",
      "tagline": "A non-profit cultural heritage destination dedicated to preserving the history of Hawaii''s plantation workers and immigrant roots.",
      "estBadge": "EST. 1992"
    },
    "nav": [
      {"id": "home", "label": "Home"},
      {"id": "visit", "label": "Visit"},
      {"id": "stories", "label": "Stories"},
      {"id": "play", "label": "Play & Learn"},
      {"id": "learn", "label": "Learn"},
      {"id": "support", "label": "Support"},
      {"id": "about", "label": "About"}
    ],
    "footer": {
      "brand": "Hawaiian Plantation Village",
      "text": "A non-profit cultural heritage destination dedicated to preserving the history of Hawaii''s plantation workers and immigrant roots.",
      "copyright": "© 2026 Hawaiian Plantation Village. All rights reserved. Built for cultural stewardship.",
      "ctaLinks": [
        {"label": "Book Excursion Tickets", "page": "tickets"},
        {"label": "Become a Member", "page": "support"},
        {"label": "Make a Donation", "page": "support"},
        {"label": "Volunteer Inquiry", "page": "support"}
      ],
      "newsletter": {
        "heading": "JOIN THE LEDGER NEWSLETTER",
        "description": "Receive updates on seasonal festivals, lectures, and volunteer days.",
        "placeholder": "Your Email Address",
        "buttonLabel": "Join"
      }
    },
    "contact": {
      "phone": "(808) 677-0110",
      "phoneHref": "tel:8086770110",
      "email": "info@hawaiianplantationvillage.org",
      "emailHref": "mailto:info@hawaiianplantationvillage.org",
      "address": {
        "line1": "94-695 Waipahu Street",
        "line2": "Waipahu, Oʻahu, Hawaiʻi 96797"
      }
    },
    "hours": {
      "schedule": "Tuesday – Saturday: 9:00 AM – 2:00 PM",
      "toursNote": "Guided tours at 10:00 AM & 12:00 PM",
      "closedNote": "Closed on Sundays, Mondays, and major state holidays.",
      "parking": "Free Visitor Parking Onsite"
    },
    "hero": {
      "eyebrow": "Hawaiʻi''s living museum · Waipahu, Oʻahu",
      "headline": "History didn''t happen here. It still does.",
      "support": "Walk the camp houses where eight immigrant communities built a life together — and still gather today.",
      "primaryCta": {"label": "Plan your visit"},
      "secondaryCta": {"label": "Watch the story"},
      "stats": [
        {"value": "1992", "label": "Opened"},
        {"value": "8", "label": "Cultures"},
        {"value": "30", "label": "Structures"},
        {"value": "25k+", "label": "Students a year"}
      ],
      "videoSrc": "/Plantation_life_documentary_video_202607131034.mp4",
      "posterSrc": "/digitized-photos/ark_70111_1ZgL.0.jpeg"
    },
    "seo": {
      "title": "Hawaiian Plantation Village | Living History Museum in Waipahu, Oʻahu",
      "description": "Explore 25 restored plantation camp houses and hear the stories of immigrant communities who shaped modern Hawaiʻi.",
      "keywords": ["Hawaiian Plantation Village", "Waipahu history", "plantation museum", "Oʻahu field trips"]
    },
    "donationPresets": [
      {"amount": 25, "label": "$25 buys organic elements for hands-on history classes."},
      {"amount": 50, "label": "$50 maintains camp gardens for three months."},
      {"amount": 100, "label": "$100 funds school admission worksheets for a class of 10."}
    ]
  }'::jsonb
)
on conflict (id) do update
  set payload = excluded.payload,
      updated_at = now();

-- ---------------------------------------------------------------------------
-- Page sections (home, visit, about)
-- ---------------------------------------------------------------------------

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('home', 'quickVisit', 'published', 1, '{
    "hours": {"title": "HOURS OF OPERATION", "primary": "Tuesday – Saturday: 9:00 AM – 2:00 PM", "secondary": "Guided tours at 10:00 AM & 12:00 PM"},
    "location": {"title": "LOCATION", "primary": "94-695 Waipahu Street", "secondary": "Waipahu, Oʻahu (Free parking onsite)"},
    "admission": {"title": "ADMISSION", "primary": "Adults: $17 | Kamaʻāina/Military: $12", "secondary": "Children (5-12): $8 | Under 5: Free"}
  }'::jsonb, now()),
  ('home', 'cultures', 'published', 2, '{
    "eyebrow": "Eight cultures, one village",
    "title": "Every camp house belongs to somebody''s family.",
    "description": "Each home was furnished by the community it belongs to — their gardens, their kitchens, their celebrations. Pick a culture and hear from the people who lived it.",
    "items": [
      {"name": "Hawaiian", "note": "The land before the cane"},
      {"name": "Chinese", "note": "First contract workers, 1852"},
      {"name": "Japanese", "note": "Furo, temples, picture brides"},
      {"name": "Filipino", "note": "Sakada families and pancit"},
      {"name": "Korean", "note": "Small camp, long memory"},
      {"name": "Okinawan", "note": "Sanshin on the porch"},
      {"name": "Portuguese", "note": "Stone forno and sweet bread"},
      {"name": "Puerto Rican", "note": "Christmas Eve in the parlor"}
    ]
  }'::jsonb, now()),
  ('home', 'planVisit', 'published', 3, '{
    "eyebrow": "Plan your visit",
    "title": "Walk in. Sit down. Stay a while.",
    "description": "Tuesday to Saturday, 9:00 AM to 2:00 PM. 94-695 Waipahu Street, Waipahu, Oʻahu. Free parking onsite.",
    "items": [
      {"title": "Tickets & hours", "note": "Self-guided and docent-led, Tuesday to Saturday.", "page": "tickets"},
      {"title": "Group tours", "note": "Motorcoach, custom rates, and private group scheduling.", "page": "visit"},
      {"title": "Schools", "note": "DOE-aligned field trips and classroom curriculum.", "page": "learn"},
      {"title": "Accessibility", "note": "Paved paths, ADA restrooms, and quieter sensory hours.", "page": "visit"}
    ]
  }'::jsonb, now()),
  ('home', 'whyVisit', 'published', 4, '{
    "stamp": "Living museum", "stampClass": "green",
    "title": "Where Hawaiʻi''s roots run deep",
    "paragraphs": [
      "Hawaiian Plantation Village is an outdoor, living history museum located in Waipahu. It tells the story of the immigrants who arrived in Hawaiʻi from China, Portugal, Japan, Puerto Rico, Korea, the Philippines, Okinawa, and other nations during the sugar plantation era (1852–1946).",
      "Explore 25 authentic, fully restored camp houses, complete with period furniture, personal artifacts, and lush heritage gardens. Walk the same paths as the workers, feel the heat of the stone ovens, and hear the stories of the community that shaped Hawaii''s unique multicultural society."
    ],
    "primaryCta": {"label": "Discover Our History", "page": "about"},
    "secondaryCta": {"label": "Plan Your Visit", "page": "visit"}
  }'::jsonb, now()),
  ('home', 'featuredBango', 'published', 3, '{
    "stamp": "Featured Narrative", "stampClass": "rust",
    "title": "The Bango System: Numbers Replacing Names",
    "paragraphs": [
      "Upon arrival at the plantation, each immigrant worker was stripped of their name in the company ledgers and issued a small, stamped metal disk called a Bango tag.",
      "Because the plantation managers and overseers (Lunas) could not pronounce or easily spell the names of Chinese, Japanese, Portuguese, Korean, or Filipino workers, the Bango number became their identity."
    ],
    "quote": "My grandfather told me the bango was a constant weight in his pocket. But it also forced the camps to find a common language—Pidgin—to connect their true names behind those metal numbers.",
    "quoteCite": "— Siu Lung Chang, Oral History Archive",
    "cta": {"label": "Explore Camp Stories", "page": "stories"}
  }'::jsonb, now()),
  ('home', 'bellToBell', 'published', 4, '{
    "stamp": "Interactive Log", "stampClass": "rust",
    "title": "Step Into Their Shoes",
    "description": "Simulate one day on the plantation. Hear the morning whistle, complete tasks in the cane rows, and gather in the community camp at sunset."
  }'::jsonb, now()),
  ('home', 'educators', 'published', 5, '{
    "stamp": "For Educators", "stampClass": "teal",
    "title": "Curriculum & Field Trips",
    "paragraphs": [
      "Bring history to life for your students. We offer structured field trips and curriculum-linked educational packages that cover the waves of plantation immigration, camp structures, cultural preservation, and the economic history of Oʻahu.",
      "Our resources align directly with Hawaii Department of Education social studies and history standards, making field trips educational, engaging, and memorable."
    ],
    "cta": {"label": "Schedule a Field Trip", "page": "learn"}
  }'::jsonb, now()),
  ('home', 'getInvolved', 'published', 6, '{
    "stamp": "Get Involved", "stampClass": "green",
    "title": "Support the Preservation of Waipahu''s History",
    "description": "Whether you become an annual member or make a one-time donation, your contribution directly funds critical cottage upkeep and cultural stewardship programs."
  }'::jsonb, now()),
  ('home', 'eventsHeader', 'published', 7, '{
    "stamp": "Calendar", "stampClass": "gold",
    "title": "Upcoming Community Programs"
  }'::jsonb, now()),
  ('home', 'testimonialsHeader', 'published', 8, '{
    "stamp": "Testimonials", "stampClass": "rust",
    "title": "What Visitors & Educators Say",
    "description": "Hear from our community of school teachers, local residents, and travelers who have experienced the living history."
  }'::jsonb, now()),
  ('home', 'events', 'published', 9, '{
    "items": [
      {"slug": "obon-festival-event", "date": "AUG 15", "title": "Obon Festival & Bon Dance", "time": "5:00 PM - 9:00 PM", "desc": "Celebrate plantation ancestral roots with traditional music, dancing, and local food stalls in the central courtyard.", "image": ""},
      {"slug": "heritage-day-event", "date": "SEP 12", "title": "Plantation Heritage Day", "time": "10:00 AM - 3:00 PM", "desc": "Live cultural demonstrations, including Portuguese stone-oven bread baking, Okinawan sanshin playing, and historic crafts.", "image": ""}
    ]
  }'::jsonb, now()),
  ('home', 'testimonials', 'published', 10, '{
    "items": [
      {"slug": "testimonial-sarah-l", "quote": "The curriculum-aligned worksheets made our field trip incredibly easy to organize. The students were completely absorbed in exploring the camp houses—they didn''t want to leave!", "authorName": "Sarah L.", "authorMeta": "4th Grade Teacher, HIDOE"},
      {"slug": "testimonial-david-k", "quote": "Standing inside the Japanese furo and seeing the Portuguese forno stone ovens brought back stories my grandmother used to tell me about Waipahu. It is incredibly authentic.", "authorName": "David K.", "authorMeta": "Honolulu Resident"},
      {"slug": "testimonial-michael-r", "quote": "One of the best visitor attraction sites on Oʻahu. It feels completely different from a static museum. The docents tell real human stories that make the plantation era come alive.", "authorName": "Michael R.", "authorMeta": "Traveler from Seattle"}
    ]
  }'::jsonb, now()),
  ('home', 'partners', 'published', 11, '{
    "items": [
      {"slug": "partner-hidoe", "name": "HAWAIʻI DEPARTMENT OF EDUCATION"},
      {"slug": "partner-tripadvisor", "name": "TRIPADVISOR TRAVELER CHOICE 2026"},
      {"slug": "partner-hhf", "name": "HISTORIC HAWAIʻI FOUNDATION"}
    ]
  }'::jsonb, now()),
  ('visit', 'header', 'published', 1, '{
    "stamp": "VISITOR GUIDE", "stampClass": "green",
    "title": "Plan Your Visit",
    "subtitle": "Everything you need to know to prepare for your journey into Waipahu''s history."
  }'::jsonb, now()),
  ('visit', 'hours', 'published', 2, '{
    "schedule": "Tuesday – Saturday: 9:00 AM – 2:00 PM",
    "closedNote": "Closed on Sundays, Mondays, and major state holidays.",
    "toursIntro": "To experience the stories fully, we highly recommend taking one of our daily guided tours led by resident docents:",
    "tourSlots": [
      {"label": "Morning Tour", "time": "10:00 AM daily"},
      {"label": "Midday Tour", "time": "12:00 PM daily"}
    ],
    "walkInNote": "*Walk-ins are accommodated based on availability. To guarantee your spot, please book tickets online in advance."
  }'::jsonb, now()),
  ('visit', 'parking', 'published', 3, '{
    "address": "94-695 Waipahu Street, Waipahu, HI 96797",
    "directions": "Located approximately 30 minutes from Waikīkī and Honolulu. Take H1 West to Exit 8B (Farrington Hwy), then turn right onto Waipahu Depo Road and right onto Waipahu Street.",
    "parkingTitle": "Free Visitor Parking Onsite",
    "parkingDesc": "We offer free designated parking for passenger cars, school buses, and tour vans inside our secure lot."
  }'::jsonb, now()),
  ('visit', 'safety', 'published', 4, '{
    "terrainTitle": "Terrain & Navigation",
    "terrainDesc": "The Village path is a dirt/gravel trail approximately 0.5 miles long. Comfortable walking shoes are highly recommended. Restrooms are fully ADA-compliant and located in the main visitor courtyard.",
    "guidelinesTitle": "Preserving Cultural Heritage",
    "guidelinesDesc": "Please do not climb on historical structures or touch displays marked with preservation tags. Hawaiian Plantation Village is a smoke-free facility."
  }'::jsonb, now()),
  ('visit', 'group', 'published', 5, '{
    "title": "Group Visits & Private Tours",
    "intro": "We welcome groups of all sizes, including tour operators, family reunions, historical organizations, and corporate outings. Group admission discounts are available for pre-registered groups of 10 or more.",
    "commercialTitle": "Operator Scheduling & Access",
    "commercialDesc": "We work closely with local and international tour operators. Commercial bus parking is available onsite. Bookings must be requested at least 14 days in advance to guarantee an exclusive docent guide."
  }'::jsonb, now()),
  ('visit', 'admission', 'published', 6, '{
    "title": "Admission Tickets",
    "description": "Secure your tickets online to guarantee your guided tour slot and skip the check-in queue at the visitor center desk.",
    "rates": [
      {"label": "Adults (13+)", "price": "$17.00"},
      {"label": "Kamaʻāina / Military (with ID)", "price": "$12.00"},
      {"label": "Seniors (62+)", "price": "$12.00"},
      {"label": "Youth (5 - 12)", "price": "$8.00"},
      {"label": "Child (Under 5)", "price": "Free"}
    ],
    "buttonLabel": "Book Tickets Online",
    "buttonPage": "tickets",
    "schoolCta": {
      "title": "Bringing a School Group?",
      "description": "We host educational class visits Tuesday through Friday. Learn about specialized curriculum programs and discounted school group pricing.",
      "buttonLabel": "School Field Trips",
      "page": "learn"
    },
    "groupCta": {
      "title": "Private & Commercial Groups",
      "description": "Are you organizing a tour operator, family reunion, or corporate event for 10+ people? Get special rates and a dedicated guide.",
      "buttonLabel": "Group Admission Rates"
    }
  }'::jsonb, now()),
  ('visit', 'faq', 'published', 7, '{
    "title": "Frequently Asked Questions",
    "items": [
      {
        "q": "How long does a typical visit take?",
        "a": "We recommend allocating at least 1.5 to 2 hours. A full guided tour takes approximately 90 minutes, and you can explore the gardens and exhibits afterward."
      },
      {
        "q": "Are the historic buildings accessible?",
        "a": "As a historic preservation site, some cottages have elevated steps or narrow doorways that replicate original plantation-era conditions. However, many structures have ramps, and our central pathways are wheelchair-friendly. Please contact us for specialized accessibility support."
      },
      {
        "q": "Is photography permitted?",
        "a": "Personal photography and filming are highly encouraged! For commercial photography or wedding sessions, please obtain a permit at the managers office."
      },
      {
        "q": "Is the village open in the rain?",
        "a": "Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings."
      }
    ]
  }'::jsonb, now()),
  ('about', 'header', 'published', 1, '{
    "stamp": "Preservation", "stampClass": "green",
    "title": "About the Village",
    "subtitle": "A cultural sanctuary in Waipahu preserving stories and memories of Oʻahu''s plantation communities."
  }'::jsonb, now()),
  ('about', 'mission', 'published', 2, '{
    "stamp": "MISSION & VISION",
    "title": "Preserving the Roots of Modern Hawaiʻi",
    "paragraphs": [
      "Hawaiian Plantation Village is an outdoor museum cataloging the historical memories of the waves of immigration that arrived between 1852 and 1946. Our mission is to share the history, culture, and values of the communities that shaped modern Hawaii.",
      "We maintain 25 authentic or reconstructed camp homes representing the domestic lives of the Chinese, Japanese, Filipino, Portuguese, Korean, Puerto Rican, Okinawan, and Spanish workers."
    ]
  }'::jsonb, now()),
  ('about', 'timelineIntro', 'published', 3, '{
    "stamp": "CHRONICLES", "stampClass": "rust",
    "title": "Plantation Era Timeline",
    "description": "Key historical milestones of immigration waves, industrial growth, and cultural synthesis in Hawaii."
  }'::jsonb, now()),
  ('about', 'leadershipIntro', 'published', 4, '{
    "title": "Leadership & Board"
  }'::jsonb, now())
on conflict (page_key, section_key) do nothing;

-- About list sections (page-wise CMS)
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('about', 'news', 'published', 8, '{
    "items": [
      {"slug": "smokestack-restoration", "title": "Historic Oahu Sugar Co. Smokestack Restoration Underway", "date": "July 10, 2026", "category": "Preservation", "summary": "A team of local masonry experts has begun repairing structural joints on the iconic 1917 smokestack to preserve Waipahu''s skyline.", "content": "We are thrilled to announce the commencement of the Oahu Sugar Co. Smokestack Restoration Project.", "image": "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80"},
      {"slug": "heritage-festival", "title": "Announcing the 34th Annual Plantation Heritage Festival", "date": "June 28, 2026", "category": "Community", "summary": "Celebrate the rich multicultural heritage of Oʻahu on August 15th with traditional music, ethnic food booths, and living history demonstrations.", "content": "Save the date! On Saturday, August 15, 2026, Hawaiian Plantation Village will host our signature Annual Plantation Heritage Festival.", "image": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80"},
      {"slug": "bango-exhibit", "title": "New Permanent Exhibit: The Secret Language of Bango Tags", "date": "May 15, 2026", "category": "Exhibits", "summary": "Explore the newly opened display in the Japanese Camp Cottage featuring over 150 authenticated bango metal identification tags.", "content": "We are proud to unveil our latest permanent installation: The Secret Language of Bango Tags.", "image": "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=600&q=80"},
      {"slug": "garden-volunteers", "title": "Volunteers Needed: Native Botanical Garden Maintenance", "date": "April 22, 2026", "category": "Volunteer", "summary": "Join our weekly Tuesday gardening cohort to help nurture and catalog traditional medicinal plants brought by immigrant workers.", "content": "Our ethno-botanical gardens are in need of green thumbs!", "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"}
    ]
  }'::jsonb, now()),
  ('about', 'careers', 'published', 9, '{
    "items": [
      {"slug": "docent", "title": "Cultural Heritage Docent & Tour Guide", "type": "Part-Time", "department": "Education & Guest Services", "compensation": "$19.50 / hour", "hours": "15-20 hours / week (includes Saturdays)", "summary": "Bring plantation history to life by leading educational group excursions and public tours through our 25 camp cottages.", "responsibilities": ["Lead groups of 10-25 visitors through the historic camp houses.", "Explain the cultural history of immigrant groups (1852-1946).", "Ensure visitor safety and artifact protection.", "Assist at the visitor center."], "requirements": ["Strong public speaking skills.", "Basic knowledge of Hawaiʻi plantation history.", "Ability to walk outdoors for up to 2 hours.", "Prior education or hospitality experience preferred."]},
      {"slug": "restoration", "title": "Site Preservationist & Historical Carpenter", "type": "Full-Time", "department": "Maintenance & Preservation", "compensation": "$26.00 - $30.00 / hour (DOE)", "hours": "40 hours / week (Monday - Friday)", "summary": "Maintain and restore the structural integrity of 25 authentic and reconstructed camp cottages using period-appropriate materials.", "responsibilities": ["Inspect and repair wooden structures, roofs, and fences.", "Source period-appropriate building materials.", "Apply historic carpentry techniques.", "Follow historic preservation guidelines."], "requirements": ["3+ years carpentry or historic preservation experience.", "Proficiency with hand and power tools.", "Knowledge of wood rot prevention.", "Ability to lift 50 lbs and work on ladders."]},
      {"slug": "gardener", "title": "Ethno-Botanical Garden Coordinator", "type": "Part-Time", "department": "Horticulture & Landscape", "compensation": "$21.00 / hour", "hours": "20 hours / week", "summary": "Oversee the cultivation, labelling, and care of our historical crop plots, native plants, and immigrant medicinal gardens.", "responsibilities": ["Maintain plantation-era agricultural plots.", "Care for ethnic medicinal herb gardens.", "Coordinate weekly volunteer gardening cohorts.", "Update botanical signage."], "requirements": ["Experience in gardening or tropical horticulture.", "Interest in ethno-botany.", "Ability to perform outdoor labor.", "Experience leading volunteers is a plus."]}
    ]
  }'::jsonb, now()),
  ('about', 'timeline', 'published', 10, '{
    "items": [
      {"year": "1852", "event": "First waves of Chinese contract laborers arrive in Oʻahu aboard the Thetis, inaugurating the plantation era."},
      {"year": "1878", "event": "Portuguese workers arrive from Madeira and Azores, bringing stone ovens (forno) and the braguinha (ancestor of the ukulele)."},
      {"year": "1885", "event": "The Kanyaku Imin government-contract Japanese workers arrive, establishing major camp communities and furo baths."},
      {"year": "1897", "event": "Oahu Sugar Company is incorporated in Waipahu, erecting the massive sugar mill smokestack that dominated the skyline."},
      {"year": "1903", "event": "First Korean immigrants land in Honolulu, setting up language schools, programs, and active community organizations."},
      {"year": "1906", "event": "The First Filipino Sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment."},
      {"year": "1946", "event": "The Oahu Sugar Company operations peak, transitioning into late-era modern farming until the mill''s eventual closure in 1995."},
      {"year": "1992", "event": "Hawaiian Plantation Village opens in Waipahu as a living cultural museum to preserve history and honor worker roots."}
    ]
  }'::jsonb, now()),
  ('about', 'leadership', 'published', 11, '{
    "items": [
      {"slug": "jeanne-ishikawa", "name": "Jeanne Ishikawa", "role": "Executive Director", "desc": "Oversees daily operations, site preservation projects, and curates cultural programs."},
      {"slug": "glenn-kawatachi", "name": "Dr. Glenn Kawatachi", "role": "Board President", "desc": "Leads institutional fundraising, historical verification committees, and university partnerships."},
      {"slug": "alvin-ramos", "name": "Alvin Ramos", "role": "Head Site Preservationist", "desc": "Maintains structural integrity of the 25 camp homes using original wood-grain carpentry tools."}
    ]
  }'::jsonb, now())
on conflict (page_key, section_key) do nothing;

-- Additional page sections (learn, play, stories, support, tickets)
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('learn', 'school', 'published', 1, '{
    "stamp": "Educator Experience", "stampClass": "green",
    "title": "Education & Field Trips",
    "subtitle": "Bring history to life. Explore educational packages and request school visits below.",
    "resourcesIntro": "Start our HIDOE standard-aligned interactive lessons. Each package includes videos, guided reading, quizzes, and hands-on activities:",
    "fieldTripNote": "Field trips require a minimum of 10 students and at least one adult chaperone per 10 children."
  }'::jsonb, now()),
  ('learn', 'youth', 'published', 2, '{
    "stamp": "Youth Paths & Service", "stampClass": "rust",
    "title": "Student & Youth Programs",
    "subtitle": "Grow your skills, discover community history, and shape Waipahu''s future through internships and volunteer guilds.",
    "programs": [
      {"slug": "docent-internship", "type": "Paid Internship", "title": "\"Preserving Our Roots\" Docent Internship", "desc": "A semester-long or summer program designed for high school juniors and seniors. Interns study Waipahu''s multi-ethnic history, train in archival document preservation, and lead educational tours for visiting groups.", "schedule": "10 weeks • Grades 11-12 • $500 stipend + school credit"},
      {"slug": "youth-volunteer-guild", "type": "Community Service", "title": "Youth Volunteer Guild", "desc": "Connect with peers and plantation heritage during weekend volunteer days. Guild members participate in historic cottage restoration, maintain our traditional gardens, and host seasonal heritage festivals.", "schedule": "Saturday mornings • Grades 9-12 • Service hour certification"}
    ]
  }'::jsonb, now()),
  ('learn', 'family', 'published', 3, '{
    "stamp": "Ohana Learning", "stampClass": "teal",
    "title": "Family Learning & Workshops",
    "subtitle": "Discover plantation heritage together. Hands-on weekend workshops, storytelling, and self-guided exploration for all ages.",
    "workshops": [
      {"slug": "talk-story-saturdays", "type": "Oral History Sessions", "title": "Talk Story Saturdays", "desc": "Join us on the second Saturday of each month for family-friendly oral history circles. Plantation kupuna and local storytellers share memories of Waipahu camp life, plantation folklore, and community traditions.", "schedule": "2nd Saturday of the Month • 10:00 AM - 11:30 AM • Free"},
      {"slug": "ohana-heritage-gardening", "type": "Hands-On Agriculture", "title": "Ohana Heritage Gardening", "desc": "Discover the crops that sustained generations of plantation families. Learn how traditional Hawaiian canoe plants (Kalo, Uala) and immigrant kitchen crops were grown. Kids will plant their own heritage seed or cutting to take home.", "schedule": "Last Saturday of the Month • 9:00 AM - 11:00 AM • Live cuttings & seeds"},
      {"slug": "village-scavenger-hunt", "type": "Interactive Quest", "title": "Village Scavenger Hunt & Bingo", "desc": "Make your walk through our 30+ historic structures an active quest! Search for immigrant bango tags, spot traditional toys, and match camp kitchen items. Show your completed sheet at the Gift Shop for a prize.", "schedule": "Self-guided • Available during open hours"}
    ]
  }'::jsonb, now()),
  ('play', 'header', 'published', 1, '{
    "stamp": "KIDS PLAYGROUND", "stampClass": "green",
    "title": "Sugar Mill Tycoon",
    "subtitle": "Experience the historical process of manufacturing sugar from raw crop in our PixiJS 2D Mill simulator!"
  }'::jsonb, now()),
  ('play', 'gameSteps', 'published', 2, '{
    "steps": [
      {"step": 1, "title": "Stage 1: Harvesting the Cane", "instruction": "Drag or swipe your mouse/pointer across the dotted lines near the base of the stalks to cut them down!", "history": "In the plantation days, workers used heavy steel cutlasses to cut sugarcane stalks at ground level."},
      {"step": 2, "title": "Stage 2: Crushing & Extraction", "instruction": "Click and drag the large wooden crank handle in a circle to rotate the iron rollers and squeeze out the juice!", "history": "Mills used massive steam-driven iron rollers to crush sugarcane stalks."},
      {"step": 3, "title": "Stage 3: Boiling & Skimming", "instruction": "Select a Heat Burner level to boil the juice, then click on the green floating foam impurities to skim them off!", "history": "Cane juice was boiled in huge clarifiers and impurities were skimmed by hand."},
      {"step": 4, "title": "Stage 4: Spinning the Sugar", "instruction": "Click the blue SPIN button in the center of the drum rapidly to separate molasses from raw crystals!", "history": "Centrifuges spun the boiled sugar syrup at high speeds to separate molasses."}
    ]
  }'::jsonb, now()),
  ('stories', 'header', 'published', 1, '{
    "stamp": "ORAL HISTORIES", "stampClass": "green",
    "title": "Plantation Stories",
    "subtitle": "Explore the lives, struggles, and music of the eight immigrant communities that built Waipahu."
  }'::jsonb, now()),
  ('support', 'header', 'published', 1, '{
    "stamp": "STEWARDSHIP", "stampClass": "green",
    "title": "Support the Village",
    "subtitle": "Your membership and donations directly fund cottage preservation and cultural programs."
  }'::jsonb, now()),
  ('support', 'donate', 'published', 2, '{
    "title": "Make a Direct Gift",
    "description": "100% of direct donations go to site preservation and educational outreach."
  }'::jsonb, now()),
  ('support', 'membershipIntro', 'published', 3, '{
    "title": "Become a Member",
    "description": "Join as a steward and enjoy year-round benefits while supporting Waipahu heritage."
  }'::jsonb, now()),
  ('support', 'impactSidebar', 'published', 4, '{
    "title": "Your Impact",
    "items": ["Maintains 25 historic camp cottages", "Funds school field trip scholarships", "Preserves oral history archives"]
  }'::jsonb, now()),
  ('tickets', 'header', 'published', 1, '{
    "stamp": "BOOK YOUR VISIT", "stampClass": "green",
    "title": "Tickets & Reservations",
    "subtitle": "Secure your guided tour slot and skip the check-in queue at the visitor center."
  }'::jsonb, now())
on conflict (page_key, section_key) do nothing;

-- Partner logos / social proof
insert into public.content_entries (slug, content_type, status, title, summary, sort_order, published_at)
values
  ('partner-hidoe', 'partner', 'published', 'HAWAIʻI DEPARTMENT OF EDUCATION', 'Official education partner', 1, now()),
  ('partner-tripadvisor', 'partner', 'published', 'TRIPADVISOR TRAVELER CHOICE 2026', 'Travel recognition', 2, now()),
  ('partner-hhf', 'partner', 'published', 'HISTORIC HAWAIʻI FOUNDATION', 'Preservation grant partner', 3, now())
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Content entries: news (4)
-- ---------------------------------------------------------------------------

insert into public.content_entries (slug, content_type, status, title, summary, body, category, event_date_label, image_url, sort_order, published_at)
values
  (
    'smokestack-restoration',
    'news',
    'published',
    'Historic Oahu Sugar Co. Smokestack Restoration Underway',
    'A team of local masonry experts has begun repairing structural joints on the iconic 1917 smokestack to preserve Waipahu''s skyline.',
    'We are thrilled to announce the commencement of the Oahu Sugar Co. Smokestack Restoration Project. Standing as a beacon of Waipahu''s industrial sugar heritage, the 1917 concrete smokestack has faced severe weathering over the decades. Thanks to a generous grant from the Historic Hawaiʻi Foundation and community donations, local structural preservationists have begun scaffolding the column to repair micro-cracks and reinforce historical masonry joints. The project is expected to run through September, with no interruption to scheduled village tours.',
    'Preservation',
    'July 10, 2026',
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
    1,
    now()
  ),
  (
    'heritage-festival',
    'news',
    'published',
    'Announcing the 34th Annual Plantation Heritage Festival',
    'Celebrate the rich multicultural heritage of Oʻahu on August 15th with traditional music, ethnic food booths, and living history demonstrations.',
    'Save the date! On Saturday, August 15, 2026, from 9:00 AM to 4:00 PM, Hawaiian Plantation Village will host our signature Annual Plantation Heritage Festival. Celebrate the multi-ethnic legacy that formed modern Hawaiʻi. The event features live performances including Japanese Taiko drumming, Portuguese folk dancing, Filipino Kulintang music, and Hawaiian hula. Food booths will serve authentic plantation-era treats like fresh malasadas, Chinese manapua, and plantation-style plate lunches. Admission is free, with voluntary donations supporting our educational outreach programs.',
    'Community',
    'June 28, 2026',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    2,
    now()
  ),
  (
    'bango-exhibit',
    'news',
    'published',
    'New Permanent Exhibit: The Secret Language of Bango Tags',
    'Explore the newly opened display in the Japanese Camp Cottage featuring over 150 authenticated bango metal identification tags.',
    'We are proud to unveil our latest permanent installation: "The Secret Language of Bango Tags." Located inside the Japanese Camp Cottage, this exhibit showcases a collection of original brass, copper, and tin bango tags used by workers to receive wages and identify themselves to camp lunas (overseers). Visitors will learn about the numbering codes, racial categorizations, and how workers personalized these tags. The exhibit also features oral history recordings from descendants sharing what these tags meant to their families.',
    'Exhibits',
    'May 15, 2026',
    'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=600&q=80',
    3,
    now()
  ),
  (
    'garden-volunteers',
    'news',
    'published',
    'Volunteers Needed: Native Botanical Garden Maintenance',
    'Join our weekly Tuesday gardening cohort to help nurture and catalog traditional medicinal plants brought by immigrant workers.',
    'Our ethno-botanical gardens are in need of green thumbs! Hawaiian Plantation Village houses a collection of native plants and medicinal herbs brought by successive waves of immigrants—from Chinese ginger and Portuguese rosemary to Filipino moringa (unggay) and traditional Hawaiian kalo. We are recruiting volunteers for our Tuesday Morning Gardening Cohort (8:30 AM - 11:30 AM). No professional gardening experience required; training on native cultivation and plant history will be provided by our senior landscape docent.',
    'Volunteer',
    'April 22, 2026',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    4,
    now()
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Content entries: programs (2) — home events
-- ---------------------------------------------------------------------------

insert into public.content_entries (slug, content_type, status, title, summary, body, category, event_date_label, sort_order, metadata, published_at)
values
  (
    'obon-festival-event',
    'program',
    'published',
    'Obon Festival & Bon Dance',
    'Celebrate plantation ancestral roots with traditional music, dancing, and local food stalls in the central courtyard.',
    'Celebrate plantation ancestral roots with traditional music, dancing, and local food stalls in the central courtyard.',
    'Community',
    'AUG 15',
    1,
    '{"time": "5:00 PM - 9:00 PM", "date": "AUG 15"}'::jsonb,
    now()
  ),
  (
    'heritage-day-event',
    'program',
    'published',
    'Plantation Heritage Day',
    'Live cultural demonstrations, including Portuguese stone-oven bread baking, Okinawan sanshin playing, and historic crafts.',
    'Live cultural demonstrations, including Portuguese stone-oven bread baking, Okinawan sanshin playing, and historic crafts.',
    'Community',
    'SEP 12',
    2,
    '{"time": "10:00 AM - 3:00 PM", "date": "SEP 12"}'::jsonb,
    now()
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Content entries: careers (3)
-- ---------------------------------------------------------------------------

insert into public.content_entries (slug, content_type, status, title, summary, body, sort_order, metadata, published_at)
values
  (
    'docent',
    'career',
    'published',
    'Cultural Heritage Docent & Tour Guide',
    'Bring plantation history to life by leading educational group excursions and public tours through our 25 camp cottages.',
    'Bring plantation history to life by leading educational group excursions and public tours through our 25 camp cottages.',
    1,
    '{
      "type": "Part-Time",
      "department": "Education & Guest Services",
      "compensation": "$19.50 / hour",
      "hours": "15-20 hours / week (includes Saturdays)",
      "responsibilities": [
        "Lead groups of 10-25 visitors (students, tourists, and locals) through the historic camp houses.",
        "Explain the cultural history, lifestyles, and contributions of the various immigrant groups (1852-1946).",
        "Ensure the safety of visitors and the protection of museum artifacts during tours.",
        "Assist in setting up tour resources and answering guest questions at the visitor center."
      ],
      "requirements": [
        "Strong public speaking skills and enthusiasm for local history and multicultural storytelling.",
        "Basic knowledge of Hawaiʻi''s history and plantation era (additional training provided).",
        "Ability to walk and stand outdoors on gravel pathways for up to 2 hours.",
        "Prior experience in education, museum docentry, or hospitality is highly preferred."
      ]
    }'::jsonb,
    now()
  ),
  (
    'restoration',
    'career',
    'published',
    'Site Preservationist & Historical Carpenter',
    'Maintain and restore the structural integrity of 25 authentic and reconstructed camp cottages using period-appropriate materials.',
    'Maintain and restore the structural integrity of 25 authentic and reconstructed camp cottages using period-appropriate materials.',
    2,
    '{
      "type": "Full-Time",
      "department": "Maintenance & Preservation",
      "compensation": "$26.00 - $30.00 / hour (DOE)",
      "hours": "40 hours / week (Monday - Friday)",
      "responsibilities": [
        "Inspect, repair, and maintain the wooden structures, roofs, and fences of the village cottage sites.",
        "Source and use period-appropriate building materials (e.g. Douglas fir, redwood, corrugated iron).",
        "Apply historic carpentry and joinery techniques to preserve the original architectural look and feel.",
        "Ensure all structural repairs adhere to historic preservation guidelines and safety standards."
      ],
      "requirements": [
        "3+ years of experience in carpentry, timber framing, or historic building preservation.",
        "Proficiency with hand and power tools; ability to read structural plans.",
        "Knowledge of local wood rot prevention and historical preservation standards.",
        "Ability to lift up to 50 lbs and work comfortably on ladders/scaffolding."
      ]
    }'::jsonb,
    now()
  ),
  (
    'gardener',
    'career',
    'published',
    'Ethno-Botanical Garden Coordinator',
    'Oversee the cultivation, labelling, and care of our historical crop plots, native plants, and immigrant medicinal gardens.',
    'Oversee the cultivation, labelling, and care of our historical crop plots, native plants, and immigrant medicinal gardens.',
    3,
    '{
      "type": "Part-Time",
      "department": "Horticulture & Landscape",
      "compensation": "$21.00 / hour",
      "hours": "20 hours / week",
      "responsibilities": [
        "Maintain, plant, and weed the plantation-era agricultural plots (sugar cane, taro, sweet potato).",
        "Care for ethnic medicinal herb gardens representing Chinese, Japanese, Filipino, and Portuguese remedies.",
        "Lead and coordinate weekly volunteer gardening cohorts.",
        "Collaborate with the education team to update botanical signage and guide resources."
      ],
      "requirements": [
        "Experience in gardening, tropical horticulture, or organic farming.",
        "Interest in ethno-botany and the history of crop introduction in Hawaiʻi.",
        "Ability to perform physical outdoor labor in various weather conditions.",
        "Experience leading volunteers or working in community garden settings is a plus."
      ]
    }'::jsonb,
    now()
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Content entries: camp_stories (8)
-- ---------------------------------------------------------------------------

insert into public.content_entries (slug, content_type, status, title, summary, body, category, sort_order, metadata, published_at)
values
  (
    'chinese',
    'camp_story',
    'published',
    'The Chinese Society Cookhouse',
    'One of the earliest immigrant groups who completed contract terms and founded successful merchants and agricultural hubs.',
    'Chinese contract laborers arrived in 1852. They introduced rice cultivation techniques to the swampy lowlands of Waipahu. The cookhouse was the heart of the Chinese camp section, serving as a social gathering spot and a place to honor ancestors during festivals.',
    'Chinese',
    1,
    '{"culture": "Chinese", "arrival": "1852", "oralHistory": {"narrator": "Siu Lung Chang (Grandson of Cookhouse Manager)", "length": "2m 45s", "audioSimText": "Recording: Chang family oral archive, interviewed 1994.", "transcript": "My grandfather came in 1888. He told me the kitchen fires in the Chinese camp section never went out. They baked buns, boiled tea, and exchanged news. The bango system was tight, but workers pooled their credit slips to buy bulk ingredients directly from Honolulu merchants. That cookhouse kept our community alive."}}'::jsonb,
    now()
  ),
  (
    'japanese',
    'camp_story',
    'published',
    'The Japanese Furo & Cottage',
    'Brought traditional bathing customs and established large camp structures, bringing rich family traditions and shrines.',
    'Japanese workers arrived under the Government-Contract system in 1885. They constructed traditional furo (hot water baths) which became cultural nodes where workers of different nations interacted. Many cottages represent the post-contract family settlements.',
    'Japanese',
    2,
    '{"culture": "Japanese", "arrival": "1885", "oralHistory": {"narrator": "Kiyoshi Tanaka (Retired Sugar Mill Stoker)", "length": "3m 12s", "audioSimText": "Recording: Tanaka oral history, interviewed 1989.", "transcript": "At the end of a 10-hour shift in the boiling sugar house, covered in black dust, the furo bath was heaven. We sat in the hot water and talked. Language did not matter much. We shared cigarettes and laughed. It was where we stopped being contract numbers and became friends."}}'::jsonb,
    now()
  ),
  (
    'filipino',
    'camp_story',
    'published',
    'The Filipino Single-Men Barracks',
    'Arrived under the HSPA recruiting system, forming the backbone of late-era plantation field operations.',
    'Filipino Sakadas arrived starting in 1906. Initially living in single-men barracks, they brought a rich history of labor organizing, music, and cuisine. They were the largest labor force during the final decades of the sugar era.',
    'Filipino',
    3,
    '{"culture": "Filipino", "arrival": "1906", "oralHistory": {"narrator": "Espiridion Pedro Ramos (Sakada Field Guide)", "length": "4m 05s", "audioSimText": "Recording: Sakada oral archive, interviewed 1991.", "transcript": "We lived six men to a room in the Waipahu barracks. We brought our guitars, and on Saturday nights, we sang kundiman love songs on the porch. The Luna was strict, but when the music started, the fields felt far away. We became brothers in those rooms."}}'::jsonb,
    now()
  ),
  (
    'portuguese',
    'camp_story',
    'published',
    'The Portuguese Forno & Home',
    'Introduced stone bread ovens (fornos) and the ukulele to the islands, moving into supervisory positions.',
    'Portuguese immigrants from Madeira and the Azores arrived in 1878. Often arriving as families, they built outdoor stone ovens (forno) to bake large batches of sweet bread, which they shared with neighbors, fostering the plantation-wide community spirit.',
    'Portuguese',
    4,
    '{"culture": "Portuguese", "arrival": "1878", "oralHistory": {"narrator": "Maria Da Silva (Cottage Resident descendant)", "length": "2m 15s", "audioSimText": "Recording: Da Silva family history, recorded 1993.", "transcript": "Every Saturday, my grandmother heated the forno brick oven with eucalyptus wood. The smell of baking sweet bread traveled through all the camps. Japanese, Filipino, and Chinese kids would wait near our yard. She never let a single child walk away without a warm crust."}}'::jsonb,
    now()
  ),
  (
    'korean',
    'camp_story',
    'published',
    'The Korean Protestant Community Cottage',
    'Formed tightly-knit communities centered around church gatherings, language schools, and independence movements.',
    'Korean immigrants arrived in 1903, seeking relief from political turmoil. They established active language schools and churches. Korean camp cottages often had small gardens for making fermented vegetables, introducing kimchi to the local diet.',
    'Korean',
    5,
    '{"culture": "Korean", "arrival": "1903", "oralHistory": {"narrator": "Young-Hee Park (Language School Educator)", "length": "3m 50s", "audioSimText": "Recording: Park family archive, recorded 1995.", "transcript": "We gathered at the camp chapel on Sundays. It was not just for church services; it was where we taught our children the Korean alphabet and gathered funds to support the independence movement in Seoul. The cottage garden always had chili pepper stalks growing in the red dirt."}}'::jsonb,
    now()
  ),
  (
    'puerto_rican',
    'camp_story',
    'published',
    'The Puerto Rican Casita',
    'Arrived after hurricanes devastated their home island, introducing rich música jibara and pasteles to Hawaiʻi.',
    'Following the devastation of Hurricane San Ciriaco in 1899, over 5,000 Puerto Ricans migrated to Hawaiʻi in 1900. They introduced dynamic rhythms, string ensembles, and food traditions like pasteles (similar to tamales, wrapped in banana leaves).',
    'Puerto Rican',
    6,
    '{"culture": "Puerto Rican", "arrival": "1900", "oralHistory": {"narrator": "Roberto Morales (Cane Hauler & Musician)", "length": "3m 30s", "audioSimText": "Recording: Morales music archives, recorded 1990.", "transcript": "We brought the cuatro guitar and the güiro scraper. When we played music at the camp borders, the other workers would stand and listen. We blended our rhythms with Portuguese tunes and Hawaiian chants. That is how Cachi Cachi music was born in Waipahu."}}'::jsonb,
    now()
  ),
  (
    'okinawan',
    'camp_story',
    'published',
    'The Okinawan Sanshin & Prefectural Club',
    'Brought the traditional three-stringed sanshin, a unique Ryukyuan language, and deep mutual-aid networks.',
    'Okinawan contract laborers arrived in Hawaiʻi in 1900, bringing a distinct Ryukyuan language, culture, and musical heritage. Settling in camp clusters, they maintained strong prefectural networks called sonjinkai. They introduced agricultural practices, pig farming, and traditional foods like andagi.',
    'Okinawan',
    7,
    '{"culture": "Okinawan", "arrival": "1900", "oralHistory": {"narrator": "Kama Uyehara (Third-Generation Sanshin Instructor)", "length": "3m 40s", "audioSimText": "Recording: Uyehara family tape archive, Waipahu, recorded 1992.", "transcript": "My father made his first sanshin using an empty cigar box and a piece of eucalyptus wood. In the evenings, when the field dust settled, he would play the old Ryukyuan folk songs. The music was different from the Japanese songs—it was warmer, and the neighbors from all the other camps would lean over the fences to listen."}}'::jsonb,
    now()
  ),
  (
    'spanish',
    'camp_story',
    'published',
    'The Spanish Andalusian Casa',
    'Arrived in 1907 from Andalusia, introducing the classical Spanish guitar, lace-making, and distinct culinary traditions.',
    'Spanish contract laborers arrived in Hawaiʻi starting in 1907, primarily recruited from the Andalusia region. Those who remained in Waipahu contributed rich cultural elements, including classical Spanish guitar techniques, traditional lace-making, and Mediterranean culinary traditions.',
    'Spanish',
    8,
    '{"culture": "Spanish", "arrival": "1907", "oralHistory": {"narrator": "Isabel Delgado (Andalusian Immigrant Descendant)", "length": "2m 55s", "audioSimText": "Recording: Delgado oral archive, interviewed 1994.", "transcript": "My grandmother brought her Andalusian guitar all the way across two oceans. She said the fields were exhausting, but music was how they kept their dignity. When she played, the other workers would gather around. We did not speak the same words, but the strings understood each other."}}'::jsonb,
    now()
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Content entries: faqs (4), testimonials (3), timeline (8), leadership (3)
-- ---------------------------------------------------------------------------

insert into public.content_entries (slug, content_type, status, title, summary, body, sort_order, metadata, published_at)
values
  ('faq-visit-duration', 'faq', 'published', 'How long does a typical visit take?', null,
   'We recommend allocating at least 1.5 to 2 hours. A full guided tour takes approximately 90 minutes, and you can explore the gardens and exhibits afterward.',
   1, '{}'::jsonb, now()),
  ('faq-accessibility', 'faq', 'published', 'Are the historic buildings accessible?', null,
   'As a historic preservation site, some cottages have elevated steps or narrow doorways that replicate original plantation-era conditions. However, many structures have ramps, and our central pathways are wheelchair-friendly. Please contact us for specialized accessibility support.',
   2, '{}'::jsonb, now()),
  ('faq-photography', 'faq', 'published', 'Is photography permitted?', null,
   'Personal photography and filming are highly encouraged! For commercial photography or wedding sessions, please obtain a permit at the managers office.',
   3, '{}'::jsonb, now()),
  ('faq-rain', 'faq', 'published', 'Is the village open in the rain?', null,
   'Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings.',
   4, '{}'::jsonb, now()),

  ('testimonial-sarah-l', 'testimonial', 'published', 'Sarah L.', null,
   'The curriculum-aligned worksheets made our field trip incredibly easy to organize. The students were completely absorbed in exploring the camp houses—they did not want to leave!',
   1, '{"authorName": "Sarah L.", "authorMeta": "4th Grade Teacher, HIDOE"}'::jsonb, now()),
  ('testimonial-david-k', 'testimonial', 'published', 'David K.', null,
   'Standing inside the Japanese furo and seeing the Portuguese forno stone ovens brought back stories my grandmother used to tell me about Waipahu. It is incredibly authentic.',
   2, '{"authorName": "David K.", "authorMeta": "Honolulu Resident"}'::jsonb, now()),
  ('testimonial-michael-r', 'testimonial', 'published', 'Michael R.', null,
   'One of the best visitor attraction sites on Oʻahu. It feels completely different from a static museum. The docents tell real human stories that make the plantation era come alive.',
   3, '{"authorName": "Michael R.", "authorMeta": "Traveler from Seattle"}'::jsonb, now()),

  ('timeline-1852', 'timeline', 'published', '1852', null,
   'First waves of Chinese contract laborers arrive in Oʻahu aboard the Thetis, inaugurating the plantation era.',
   1, '{"year": "1852"}'::jsonb, now()),
  ('timeline-1878', 'timeline', 'published', '1878', null,
   'Portuguese workers arrive from Madeira and Azores, bringing stone ovens (forno) and the braguinha (ancestor of the ukulele).',
   2, '{"year": "1878"}'::jsonb, now()),
  ('timeline-1885', 'timeline', 'published', '1885', null,
   'The Kanyaku Imin government-contract Japanese workers arrive, establishing major camp communities and furo baths.',
   3, '{"year": "1885"}'::jsonb, now()),
  ('timeline-1897', 'timeline', 'published', '1897', null,
   'Oahu Sugar Company is incorporated in Waipahu, erecting the massive sugar mill smokestack that dominated the skyline.',
   4, '{"year": "1897"}'::jsonb, now()),
  ('timeline-1903', 'timeline', 'published', '1903', null,
   'First Korean immigrants land in Honolulu, setting up language schools, programs, and active community organizations.',
   5, '{"year": "1903"}'::jsonb, now()),
  ('timeline-1906', 'timeline', 'published', '1906', null,
   'The First Filipino Sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment.',
   6, '{"year": "1906"}'::jsonb, now()),
  ('timeline-1946', 'timeline', 'published', '1946', null,
   'The Oahu Sugar Company operations peak, transitioning into late-era modern farming until the mill''s eventual closure in 1995.',
   7, '{"year": "1946"}'::jsonb, now()),
  ('timeline-1992', 'timeline', 'published', '1992', null,
   'Hawaiian Plantation Village opens in Waipahu as a living cultural museum to preserve history and honor worker roots.',
   8, '{"year": "1992"}'::jsonb, now()),

  ('leadership-ishikawa', 'leadership', 'published', 'Jeanne Ishikawa',
   'Oversees daily operations, site preservation projects, and curates cultural programs.', null,
   1, '{"role": "Executive Director"}'::jsonb, now()),
  ('leadership-kawatachi', 'leadership', 'published', 'Dr. Glenn Kawatachi',
   'Leads institutional fundraising, historical verification committees, and university partnerships.', null,
   2, '{"role": "Board President"}'::jsonb, now()),
  ('leadership-ramos', 'leadership', 'published', 'Alvin Ramos',
   'Maintains structural integrity of the 25 camp homes using original wood-grain carpentry tools.', null,
   3, '{"role": "Head Site Preservationist"}'::jsonb, now())
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Content entries: workshops from Learn (5)
-- ---------------------------------------------------------------------------

insert into public.content_entries (slug, content_type, status, title, summary, body, category, sort_order, metadata, published_at)
values
  (
    'talk-story-saturdays',
    'workshop',
    'published',
    'Talk Story Saturdays',
    'Join us on the second Saturday of each month for family-friendly oral history circles.',
    'Join us on the second Saturday of each month for family-friendly oral history circles. Plantation kupuna and local storytellers share memories of Waipahu camp life, plantation folklore, and community traditions.',
    'Oral History Sessions',
    1,
    '{"type": "Oral History Sessions", "schedule": "2nd Saturday of the Month • 10:00 AM - 11:30 AM • Free"}'::jsonb,
    now()
  ),
  (
    'ohana-heritage-gardening',
    'workshop',
    'published',
    'Ohana Heritage Gardening',
    'Discover the crops that sustained generations of plantation families.',
    'Discover the crops that sustained generations of plantation families. Learn how traditional Hawaiian canoe plants (Kalo, Uala) and immigrant kitchen crops were grown. Kids will plant their own heritage seed or cutting to take home.',
    'Hands-On Agriculture',
    2,
    '{"type": "Hands-On Agriculture", "schedule": "Last Saturday of the Month • 9:00 AM - 11:00 AM • Live cuttings & seeds"}'::jsonb,
    now()
  ),
  (
    'village-scavenger-hunt',
    'workshop',
    'published',
    'Village Scavenger Hunt & Bingo',
    'Make your walk through our 30+ historic structures an active quest!',
    'Make your walk through our 30+ historic structures an active quest! Search for immigrant bango tags, spot traditional toys, and match camp kitchen items. Show your completed sheet at the Gift Shop for a prize.',
    'Interactive Quest',
    3,
    '{"type": "Interactive Quest", "schedule": "Self-guided • Available during open hours"}'::jsonb,
    now()
  ),
  (
    'docent-internship',
    'workshop',
    'published',
    '"Preserving Our Roots" Docent Internship',
    'A semester-long or summer program designed for high school juniors and seniors.',
    'A semester-long or summer program designed for high school juniors and seniors. Interns study Waipahu''s multi-ethnic history, train in archival document preservation, and lead educational tours for visiting groups.',
    'Paid Internship',
    4,
    '{"type": "Paid Internship", "schedule": "10 weeks • Grades 11-12 • $500 stipend + school credit"}'::jsonb,
    now()
  ),
  (
    'youth-volunteer-guild',
    'workshop',
    'published',
    'Youth Volunteer Guild',
    'Connect with peers and plantation heritage during weekend volunteer days.',
    'Connect with peers and plantation heritage during weekend volunteer days. Guild members participate in historic cottage restoration, maintain our traditional gardens, and host seasonal heritage festivals.',
    'Community Service',
    5,
    '{"type": "Community Service", "schedule": "Saturday mornings • Grades 9-12 • Service hour certification"}'::jsonb,
    now()
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Group ticket types
-- ---------------------------------------------------------------------------

insert into public.group_ticket_types (slug, label, price_cents, sort_order)
values
  ('group-adult', 'Group Adults (10+)', 1400, 1),
  ('group-senior-military', 'Group Seniors / Military', 1000, 2),
  ('group-youth', 'Group Youth (5-12)', 600, 3)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Tour time slots (guided-tour event)
-- ---------------------------------------------------------------------------

insert into public.tour_time_slots (event_id, label, sort_order)
select e.id, t.label, t.sort_order
from public.events e
cross join (
  values
    ('10:00 AM', 1),
    ('12:00 PM', 2)
) as t(label, sort_order)
where e.slug = 'guided-tour'
  and not exists (
    select 1
    from public.tour_time_slots s
    where s.event_id = e.id
      and s.label = t.label
  );

-- ---------------------------------------------------------------------------
-- Curriculum modules (all 3)
-- ---------------------------------------------------------------------------

insert into public.curriculum_modules (slug, title, grades, sort_order)
values
  ('elementary', 'Elementary Curriculum Package: Waves of Immigration', 'Grades 3-5', 1),
  ('middle', 'Middle School Research Guide: Life in the Camp Sectors', 'Grades 6-8', 2),
  ('high', 'High School Analytical Package: Sugar Economics & Labor Struggles', 'Grades 9-12', 3)
on conflict (slug) do nothing;

-- Elementary checkpoints (4)
insert into public.curriculum_checkpoints (module_id, slug, label, video_url, body_text, challenge, sort_order)
select m.id, c.slug, c.label, c.video_url, c.body_text, c.challenge::jsonb, c.sort_order
from public.curriculum_modules m
cross join (
  values
    (
      'immigration-waves',
      'Immigration Waves',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'Between 1850 and 1920, thousands of families traveled across the Pacific Ocean to work on Hawaii''s sugar plantations. Workers came from Japan, China, the Philippines, Portugal, Korea, Puerto Rico, and many other places. Each group brought their own language, food, and traditions that helped shape local culture in Waipahu.',
      '{"type": "quiz", "question": "Why did many families immigrate to Hawaii in the late 1800s?", "choices": ["To work on sugar plantations", "To build railroads in California", "To study at universities", "To join the Hawaiian royal court"], "correctIndex": 0, "feedback": {"correct": "Correct! Sugar plantations needed many workers, and immigrants came seeking jobs and a new life.", "incorrect": "Not quite. Most immigrant families came to Hawaii to work on sugar plantations."}}',
      1
    ),
    (
      'camp-map',
      'Camp Origins',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'Plantation camps were organized into sectors, often grouped by where workers came from. Families lived in small cottages near the fields. Mapping these origins helps us understand how different communities lived side by side and shared spaces like stores, schools, and bathhouses.',
      '{"type": "quiz", "question": "What did plantation camp sectors often reflect?", "choices": ["Where immigrant workers came from", "Which crops grew tallest", "How much rain fell each month", "Which ships arrived first"], "correctIndex": 0, "feedback": {"correct": "Right! Camp sectors often grouped families by homeland, though neighbors from many places still shared daily life.", "incorrect": "Try again. Camp sectors were often organized around the homelands immigrant workers came from."}}',
      2
    ),
    (
      'bango-tags',
      'Bango Tags',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'Every plantation worker received a metal bango tag with a unique number. The company store used this number to track purchases and deduct wages. Tags were worn daily and became a symbol of plantation life. Match each worker to their correct bango number in the activity below!',
      '{"type": "game", "gameId": "bango-match", "title": "Match each worker to their bango tag number", "pairs": [{"id": "tag-142", "number": "142", "name": "Tanaka", "origin": "Japan"}, {"id": "tag-087", "number": "087", "name": "Santos", "origin": "Philippines"}, {"id": "tag-203", "number": "203", "name": "Silva", "origin": "Portugal"}, {"id": "tag-056", "number": "056", "name": "Wong", "origin": "China"}]}',
      3
    ),
    (
      'vocabulary',
      'Key Words',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'Kaukau means food or a meal in Hawaiian Pidgin. A Luna was a field overseer who assigned daily work. Hole-hole is the work of stripping dead leaves from sugarcane stalks. Learning these words helps you read primary sources and oral histories from plantation days.',
      '{"type": "quiz", "question": "What does \"kaukau\" mean in Hawaiian Pidgin?", "choices": ["Food or a meal", "A metal worker tag", "A field overseer", "A sugar boiling pot"], "correctIndex": 0, "feedback": {"correct": "Great job! Kaukau is one of many Pidgin words that grew from shared plantation life.", "incorrect": "Not quite. Kaukau means food or a meal — workers talked about kaukau tins they carried to the fields."}}',
      4
    )
) as c(slug, label, video_url, body_text, challenge, sort_order)
where m.slug = 'elementary'
  and not exists (
    select 1 from public.curriculum_checkpoints cp
    where cp.module_id = m.id and cp.slug = c.slug
  );

-- Middle checkpoints (3)
insert into public.curriculum_checkpoints (module_id, slug, label, video_url, body_text, challenge, sort_order)
select m.id, c.slug, c.label, c.video_url, c.body_text, c.challenge::jsonb, c.sort_order
from public.curriculum_modules m
cross join (
  values
    (
      'camp-sectors',
      'Camp Sectors',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'Waipahu''s plantation camps were divided into sectors — Filipino Camp, Japanese Camp, Puerto Rican Camp, and others. Each sector had cottages, shared bathhouses, and community gathering spots. Understanding sector layout reveals how the plantation structured daily life and how communities maintained cultural identity.',
      '{"type": "quiz", "question": "What was a primary purpose of dividing the plantation into camp sectors?", "choices": ["To organize housing and community life by worker groups", "To separate sugarcane fields by height", "To rank workers by age", "To store different types of sugar"], "correctIndex": 0, "feedback": {"correct": "Correct. Sectors organized where families lived and how communities formed within the plantation system.", "incorrect": "Think about housing and community — sectors organized where worker families lived."}}',
      1
    ),
    (
      'oral-histories',
      'Oral Histories',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'Oral histories are firsthand accounts recorded from people who lived through plantation days. Transcripts preserve voices that might otherwise be lost. When reading oral histories, note who is speaking, when they lived in the camp, and what details reveal daily routines, struggles, and celebrations.',
      '{"type": "quiz", "question": "Why are oral history transcripts valuable for researchers?", "choices": ["They preserve firsthand accounts from people who lived the history", "They replace all written government records", "They are always shorter than textbooks", "They only describe sugar manufacturing machines"], "correctIndex": 0, "feedback": {"correct": "Exactly. Oral histories give personal perspectives that official records often leave out.", "incorrect": "Oral histories are valuable because they capture firsthand experiences from people who lived it."}}',
      2
    ),
    (
      'period-tools',
      'Period Tools',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'Digital catalogs of plantation-era tools — cane knives, kaukau tins, bango tags, and store ledgers — connect objects to stories. Each artifact shows how technology, labor, and daily survival intersected. Use catalog entries to trace who used a tool and what it reveals about camp life.',
      '{"type": "quiz", "question": "What can a plantation-era artifact like a bango tag tell us?", "choices": ["How the company tracked workers and store purchases", "The exact sugar content of each harvest", "Which ships sailed to Japan", "The weather forecast for Waipahu"], "correctIndex": 0, "feedback": {"correct": "Well done. Artifacts like bango tags reveal how the plantation system tracked and managed workers.", "incorrect": "Artifacts like bango tags show how companies tracked workers and deducted store purchases from wages."}}',
      3
    )
) as c(slug, label, video_url, body_text, challenge, sort_order)
where m.slug = 'middle'
  and not exists (
    select 1 from public.curriculum_checkpoints cp
    where cp.module_id = m.id and cp.slug = c.slug
  );

-- High checkpoints (4)
insert into public.curriculum_checkpoints (module_id, slug, label, video_url, body_text, challenge, sort_order)
select m.id, c.slug, c.label, c.video_url, c.body_text, c.challenge::jsonb, c.sort_order
from public.curriculum_modules m
cross join (
  values
    (
      'masters-servants',
      'Masters & Servants Act',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'The Masters and Servants Act of 1850 created a legal framework that bound laborers to plantation contracts. It limited workers'' ability to leave jobs and gave employers significant control. This law was a key economic force behind Hawaii''s plantation labor system and shaped immigration patterns for decades.',
      '{"type": "quiz", "question": "What did the Masters and Servants Act of 1850 primarily do?", "choices": ["Bound laborers to plantation contracts with limited freedom to leave", "Granted all workers full land ownership", "Abolished the sugar industry in Hawaii", "Established free public universities"], "correctIndex": 0, "feedback": {"correct": "Correct. The Act legally bound workers to contracts, reinforcing plantation labor control.", "incorrect": "The Act bound laborers to contracts, limiting their ability to leave plantation work."}}',
      1
    ),
    (
      'camp-evolution',
      'Camp Evolution',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'Plantation camps evolved from rough barracks for single men to family cottages with schools, stores, and churches. This structural change reflected shifting labor needs — recruiting families meant stabilizing the workforce. Analyzing camp layout over time reveals how economic demands reshaped community life.',
      '{"type": "quiz", "question": "Why did plantation camps evolve from barracks to family cottages?", "choices": ["Plantations sought a more stable workforce by recruiting families", "Workers demanded luxury housing", "Sugar cane grew better near cottages", "Barracks were banned by international law"], "correctIndex": 0, "feedback": {"correct": "Right. Family housing helped plantations retain workers across generations.", "incorrect": "Camps evolved to house families because plantations wanted a more stable, long-term workforce."}}',
      2
    ),
    (
      'labor-strike',
      '1920 Strike',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'The 1920 labor strike was a pivotal moment when thousands of plantation workers across ethnic groups united to demand better wages and conditions. Despite divisions the company tried to exploit, shared grievances over pay, hours, and treatment drove collective action — a landmark in Hawaii labor history.',
      '{"type": "quiz", "question": "What made the 1920 plantation strike historically significant?", "choices": ["Workers across ethnic groups united for better wages and conditions", "It ended all sugar production permanently", "It was the first strike ever in world history", "It was led only by plantation owners"], "correctIndex": 0, "feedback": {"correct": "Correct. Cross-ethnic solidarity despite company divide-and-rule tactics was a defining feature.", "incorrect": "The 1920 strike was significant because workers across ethnic groups united for better conditions."}}',
      3
    ),
    (
      'synthesis',
      'Analysis',
      '/Plantation_life_documentary_video_202607131034.mp4',
      'Sugar economics, restrictive labor laws, camp architecture, and strikes are interconnected. Economic demand for cheap labor drove immigration; laws like the Masters and Servants Act enforced it; camp design managed daily life; and strikes like 1920 pushed back. Strong analysis connects these forces rather than treating them in isolation.',
      '{"type": "quiz", "question": "Which best describes the relationship between sugar economics and labor struggles in Hawaii?", "choices": ["Economic demand for labor shaped laws, camp life, and worker resistance together", "They were completely unrelated historical topics", "Labor struggles only happened after sugar ended", "Economics mattered but laws and camps did not"], "correctIndex": 0, "feedback": {"correct": "Excellent analysis. Economic forces, legal frameworks, daily camp life, and labor action were deeply linked.", "incorrect": "These topics connect — economic demand shaped laws, camp structure, and the conditions that led to strikes."}}',
      4
    )
) as c(slug, label, video_url, body_text, challenge, sort_order)
where m.slug = 'high'
  and not exists (
    select 1 from public.curriculum_checkpoints cp
    where cp.module_id = m.id and cp.slug = c.slug
  );

-- Scope camp stories to the Stories page (page-wise CMS)
update public.content_entries
set page_key = 'stories'
where content_type = 'camp_story'
  and (page_key is null or page_key = '');

-- ---------------------------------------------------------------------------
-- Archives: page sections and photographs (12) — study guide
-- Generated by scripts/generate-photograph-seed.mjs; do not hand-edit.
-- ---------------------------------------------------------------------------

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('archives', 'header', 'published', 1, '{"stamp":"Photograph archives","stampClass":"green","title":"Look closely at the record","subtitle":"Thousands of photographs survive from the plantation era and from the building of this village. Read them the way historians do: observe first, then ask what the image can and cannot tell you."}'::jsonb, now()),
  ('archives', 'collections', 'published', 2, '{"eyebrow":"Three collections","title":"Where these photographs came from","description":"Every photograph in the archives arrives through one of three donations. Knowing who kept an image, and why, changes how you read it.","items":[{"id":"oahu_sugar","name":"Oahu Sugar Company","blurb":"Mainly 1940s to 1950s: cane cultivation and harvesting, mill operations, water systems, housing, and medical services. Most images are credited to R.H. “Harry” Lodge, division overseer, and Ernest Malterre Jr., housing supervisor."},{"id":"murakoshi","name":"Murakoshi Collection","blurb":"Mae Okada’s collection of father-and-son photographers Nobunosuke and Henry Murakoshi. Nobunosuke worked mostly in the studio; Henry photographed school activities, picnics, camp homes, and businesses around Waipahu."},{"id":"fwcgp","name":"Friends of Waipahu Cultural Garden Park","blurb":"The largest collection in the archives, built from family donations: work culture, WWII induction, graduations, funerals, panoramic class pictures, and documentation of the village site itself."}]}'::jsonb, now()),
  ('archives', 'howToLook', 'published', 3, '{"eyebrow":"How to look","title":"A photograph is evidence, not a caption","description":"Captions on old prints are often written years later, by someone who was not there. Start with what is visible, then move outward to what it implies.","steps":[{"title":"Meet the photograph","note":"Quick scan. What is the overall impression, before you name anything in it?"},{"title":"Observe its parts","note":"People, objects, buildings, text, weather, light. List what you actually see."},{"title":"Try to make sense of it","note":"Who made it and for whom? What was happening around it? What is deliberately posed?"},{"title":"Use it as historical evidence","note":"What does it prove, what does it only suggest, and what would you need to confirm it?"}]}'::jsonb, now()),
  ('archives', 'samples', 'published', 4, '{"eyebrow":"Worked examples","title":"Two photographs read in sequence","description":"Single images rarely settle a question. Photographs taken minutes apart, by the same person, are what let you check a reading against a second view.","items":[{"label":"Sample 1","title":"Outside, then inside the same house","arkIds":["ark_70111_1ZgL","ark_70111_1ZgJ"],"note":"The exterior shows a finished camp house: painted trim, intact roof, a lamp on the path. The interior of the same kind of structure shows bare single-wall boards and no ceiling. Read together, they explain why plantation housing could be raised quickly and why families remembered the heat, the cold, and every sound from the next room."},{"label":"Sample 2","title":"A building, then the people in front of it","arkIds":["ark_70111_1ZgR","ark_70111_1ZgS"],"note":"The first frame records a structure. The second puts a group in front of it, and the group is what dates the photograph: their clothing belongs to the museum era, not the plantation era. When people appear in a frame, ask whether they are the subject or the evidence of when the shutter opened."}]}'::jsonb, now()),
  ('archives', 'analyze', 'published', 5, '{"eyebrow":"Analyze a photograph","title":"Work through one image","description":"Answer in your own words. Your responses save in this browser only, so you can come back to them, and you can print or export the finished worksheet.","prompts":[{"id":"meet","heading":"Meet the photograph","questions":["Quickly scan the image. What do you notice first?","Is it black and white, color, or hand-tinted? Posed or candid?"]},{"id":"observe","heading":"Observe its parts","questions":["List the people, objects, and structures you can see.","What words, numbers, or signs appear in the image?","What activity is taking place?"]},{"id":"sense","heading":"Try to make sense of it","questions":["When and where do you think it was taken, and what tells you that?","Why do you think it was taken, and who was meant to see it?","What is missing from the frame?"]},{"id":"evidence","heading":"Use it as historical evidence","questions":["What does this photograph tell you about plantation life?","What questions does it leave unanswered?","What other source would help you confirm what you see?"]}]}'::jsonb, now()),
  ('archives', 'resources', 'published', 6, '{"eyebrow":"Keep researching","title":"Where to go next","description":"The archives are one entry point. These collections and books carry the research further.","items":[{"label":"Hawaiʻi Plantation Village archives","note":"Request research access to originals, accession cards, and back-of-photo notes.","href":""},{"label":"Hawaiʻi State Archives","note":"Government records, immigration papers, and territorial photograph collections.","href":"https://ags.hawaii.gov/archives/"},{"label":"Bishop Museum Library and Archives","note":"Hawaiian language sources, maps, and one of the largest photograph holdings in the islands.","href":"https://www.bishopmuseum.org/library-archives/"},{"label":"Ronald Takaki, Pau Hana: Plantation Life and Labor in Hawaii","note":"The standard narrative history of plantation labor, camp life, and resistance.","href":""},{"label":"National Archives photograph analysis worksheet","note":"The observe / reflect / question method this page adapts for classroom use.","href":"https://www.archives.gov/education/lessons/worksheets"}]}'::jsonb, now())
on conflict (page_key, section_key) do nothing;

insert into public.content_entries (slug, content_type, page_key, status, title, summary, body, category, event_date_label, image_url, sort_order, metadata, published_at)
values
  (
    'ark-70111-1zgl',
    'photograph',
    'archives',
    'published',
    'Camp house with corrugated roof and street lamp',
    'Looking down on a restored single-wall camp house. Corrugated iron roof, board-and-batten walls, red door and window frames, and a plantation-era street lamp in the foreground.',
    'The clothing and camera carried by the person in the doorway date the exposure to the museum era, not the plantation era. The structure is the subject; the visitor tells you this is documentation of the village as it was being built or interpreted.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1ZgL.0.jpeg',
    1,
    '{"arkId":"ark_70111_1ZgL","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Single-wall camp house with red trim, plantation street lamp, and a visitor at the doorway","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1ZgL.0.jpeg","imageUrl":"/digitized-photos/ark_70111_1ZgL.0.jpeg","relatedArkIds":["ark_70111_1ZgK","ark_70111_1ZgJ"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"The clothing and camera carried by the person in the doorway date the exposure to the museum era, not the plantation era. The structure is the subject; the visitor tells you this is documentation of the village as it was being built or interpreted.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zgk',
    'photograph',
    'archives',
    'published',
    'Camp roofs from above, street lamp in foreground',
    'An elevated view across several camp roofs. The same red lamp post appears here as in the wider view of the camp house, which places the two exposures minutes apart.',
    'Matching the lamp post across two frames is the simplest kind of archival evidence: it tells you the photographer moved rather than that the buildings did.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1ZgK.0.thumbnail.jpeg',
    2,
    '{"arkId":"ark_70111_1ZgK","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Corrugated roofs of adjoining camp structures with a red plantation lamp post","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1ZgK.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1ZgK.0.thumbnail.jpeg","relatedArkIds":["ark_70111_1ZgL","ark_70111_1Zh0"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Matching the lamp post across two frames is the simplest kind of archival evidence: it tells you the photographer moved rather than that the buildings did.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zgj',
    'photograph',
    'archives',
    'published',
    'Interior of an unfurnished camp house',
    'A bare interior with exposed ceiling joists, single-wall construction, and one double-hung window. Two people stand inside; neither is identified.',
    'Single-wall construction — no studs, no insulation, boards nailed straight to the frame — is visible here. It is the detail that explains how quickly plantation housing went up and how little it kept out.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1ZgJ.0.thumbnail.jpeg',
    3,
    '{"arkId":"ark_70111_1ZgJ","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Two people standing in a bare camp house interior beside a double-hung window","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1ZgJ.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1ZgJ.0.thumbnail.jpeg","relatedArkIds":["ark_70111_1ZgL","ark_70111_1Zgr"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Single-wall construction — no studs, no insulation, boards nailed straight to the frame — is visible here. It is the detail that explains how quickly plantation housing went up and how little it kept out.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zgm',
    'photograph',
    'archives',
    'published',
    'Visitors entering through the village gate',
    'Visitors walking a paved path beneath a tile-roofed gateway. Utility poles and a street lamp stand behind the gate.',
    'Count the people and look at what they are wearing and carrying. Group size and dress often date a photograph more reliably than the buildings do.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1ZgM.0.thumbnail.jpeg',
    4,
    '{"arkId":"ark_70111_1ZgM","collection":"fwcgp","filingCategory":"Events and tours","subject":"A group walking up a path through a tiled gateway structure","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1ZgM.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1ZgM.0.thumbnail.jpeg","relatedArkIds":["ark_70111_1Zh0","ark_70111_1ZgK"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Count the people and look at what they are wearing and carrying. Group size and dress often date a photograph more reliably than the buildings do.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zgn',
    'photograph',
    'archives',
    'published',
    'Two-story building with red railings',
    'A two-story wooden building with a deep lanai, red posts and railings, and a stone retaining wall and plantings in the foreground.',
    'Two stories and a wraparound lanai set this building apart from the single-story worker housing elsewhere in the archive. Scale is a class marker on a plantation.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1Zgn.0.thumbnail.jpeg',
    5,
    '{"arkId":"ark_70111_1Zgn","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Two-story wooden building with red posts and railings, seen from the garden below","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1Zgn.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1Zgn.0.thumbnail.jpeg","relatedArkIds":["ark_70111_1Zgx"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Two stories and a wraparound lanai set this building apart from the single-story worker housing elsewhere in the archive. Scale is a class marker on a plantation.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zgx',
    'photograph',
    'archives',
    'published',
    'Front stairway of the two-story building',
    'The front of the same two-story building, photographed straight on: a central stairway to the first-floor lanai and a second lanai above it.',
    'Photographers documenting a structure usually shoot a three-quarter view and a straight-on elevation. Finding both in a collection is a sign of deliberate survey work rather than snapshots.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1Zgx.0.thumbnail.jpeg',
    6,
    '{"arkId":"ark_70111_1Zgx","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Front elevation and stairway of a two-story red-trimmed building","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1Zgx.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1Zgx.0.thumbnail.jpeg","relatedArkIds":["ark_70111_1Zgn"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Photographers documenting a structure usually shoot a three-quarter view and a straight-on elevation. Finding both in a collection is a sign of deliberate survey work rather than snapshots.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zgr',
    'photograph',
    'archives',
    'published',
    'Camp cottage behind a picket fence',
    'A white cottage with a corrugated roof and a covered side entry, photographed across a low white picket fence.',
    'Fences, yards, and plantings are worth noting. They record how families claimed space around housing they did not own.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1Zgr.0.thumbnail (1).jpeg',
    7,
    '{"arkId":"ark_70111_1Zgr","collection":"fwcgp","filingCategory":"Village site documentation","subject":"White camp cottage with corrugated roof behind a low picket fence","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1Zgr.0.thumbnail (1).jpeg","imageUrl":"/digitized-photos/ark_70111_1Zgr.0.thumbnail (1).jpeg","relatedArkIds":["ark_70111_1ZgR","ark_70111_1ZgS"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Fences, yards, and plantings are worth noting. They record how families claimed space around housing they did not own.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zgr',
    'photograph',
    'archives',
    'published',
    'Dark outbuilding beside a green cottage',
    'A dark-painted outbuilding with white trim stands beside a pale green cottage. A visitor walks along the path between them.',
    'The same outbuilding appears in a second frame with a group posed in front of it. Sequences like this often mark a dedication or a work day.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1ZgR.0.thumbnail.jpeg',
    8,
    '{"arkId":"ark_70111_1ZgR","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Dark-painted outbuilding with white trim next to a pale green cottage","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1ZgR.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1ZgR.0.thumbnail.jpeg","relatedArkIds":["ark_70111_1ZgS","ark_70111_1Zgr"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"The same outbuilding appears in a second frame with a group posed in front of it. Sequences like this often mark a dedication or a work day.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zgs',
    'photograph',
    'archives',
    'published',
    'Group standing in front of the outbuilding',
    'Three people stand at the left edge of the frame beside the dark outbuilding. None are identified on the slide.',
    'Unidentified people in a group photo are the most common gap in this archive. If you recognize someone here, the archives staff want to hear from you.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1ZgS.0.thumbnail.jpeg',
    9,
    '{"arkId":"ark_70111_1ZgS","collection":"fwcgp","filingCategory":"Group photos","subject":"Three people standing at the corner of a dark outbuilding","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1ZgS.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1ZgS.0.thumbnail.jpeg","relatedArkIds":["ark_70111_1ZgR"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Unidentified people in a group photo are the most common gap in this archive. If you recognize someone here, the archives staff want to hear from you.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zh0',
    'photograph',
    'archives',
    'published',
    'Visitors between rows of camp cottages',
    'People walk a fenced path between two rows of camp cottages with red roofs and white trim, in what appears to be a tour or an opening event.',
    'This is the closest thing in the set to a crowd scene. Compare the density of housing here with the isolated structures in the other frames.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1Zh0.0.thumbnail.jpeg',
    10,
    '{"arkId":"ark_70111_1Zh0","collection":"fwcgp","filingCategory":"Events and tours","subject":"A group walking a fenced path between camp cottages with red roofs","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1Zh0.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1Zh0.0.thumbnail.jpeg","relatedArkIds":["ark_70111_1ZgM","ark_70111_1ZgK"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"This is the closest thing in the set to a crowd scene. Compare the density of housing here with the isolated structures in the other frames.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1zh3',
    'photograph',
    'archives',
    'published',
    'Overgrown camp house with a parked truck',
    'A weathered camp house nearly closed in by trees, with a light-colored pickup truck parked in the yard.',
    'The truck is the most datable object in this frame. Vehicle models are one of the standard ways to bracket an undated photograph.',
    'fwcgp',
    'ca. 1990s',
    '/digitized-photos/ark_70111_1Zh3.0.thumbnail.jpeg',
    11,
    '{"arkId":"ark_70111_1Zh3","collection":"fwcgp","filingCategory":"Plantation towns","subject":"Weathered camp house under heavy vegetation with a pickup truck in the yard","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 1990s","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1Zh3.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1Zh3.0.thumbnail.jpeg","relatedArkIds":["ark_70111_1Zgr"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"The truck is the most datable object in this frame. Vehicle models are one of the standard ways to bracket an undated photograph.","provisional":true}'::jsonb,
    now()
  ),
  (
    'ark-70111-1z4t',
    'photograph',
    'archives',
    'published',
    'Slide storage box with color reference bar',
    'A green slide storage box, open, holding rows of mounted 35mm slides. Two loose slides sit to the right and a color reference bar runs across the top.',
    'This frame is part of the digitization record rather than the historical record. The color bar lets a technician correct color shift in every other scan made that day.',
    'fwcgp',
    '',
    '/digitized-photos/ark_70111_1Z4t.0.thumbnail.jpeg',
    12,
    '{"arkId":"ark_70111_1Z4t","collection":"fwcgp","filingCategory":"Archives housing","subject":"Open slide storage box with mounted 35mm slides, photographed with a color reference bar","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"","photographer":"","thumbnailUrl":"/digitized-photos/ark_70111_1Z4t.0.thumbnail.jpeg","imageUrl":"/digitized-photos/ark_70111_1Z4t.0.thumbnail.jpeg","relatedArkIds":[],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"This frame is part of the digitization record rather than the historical record. The color bar lets a technician correct color shift in every other scan made that day.","provisional":true}'::jsonb,
    now()
  )
on conflict (slug) do nothing;
