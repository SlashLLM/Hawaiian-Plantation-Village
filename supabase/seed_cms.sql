-- HPV CMS seed (idempotent)
-- Run after: 20260714000000_initial_schema.sql, 20260714100000_cms_full.sql, and seed.sql
-- Requires guided-tour event from seed.sql

-- ---------------------------------------------------------------------------
-- Site settings
-- ---------------------------------------------------------------------------

insert into public.site_settings (id, payload)
values (
  'default',
  '{"brand":{"title":"Hawaii''s Plantation Village","subtitle":"Waipahu, Oʻahu, Hawaiʻi","tagline":"A living plantation village built so future generations can recognize today''s multiethnic society as rooted in Hawaiʻi''s plantation era and lifestyle.","estBadge":"EST. 1992"},"nav":[{"id":"home","label":"Home"},{"id":"visit","label":"Visit"},{"id":"stories","label":"Stories"},{"id":"archives","label":"Archives"},{"id":"play","label":"Play & Learn"},{"id":"learn","label":"Learn"},{"id":"support","label":"Support"},{"id":"about","label":"About"}],"footer":{"brand":"Hawaii''s Plantation Village","text":"Founded by plantation workers and their descendants to preserve plantation heritage and legacy through authentic homes, gardens, and community memory.","copyright":"© 2026 Hawaii''s Plantation Village. All rights reserved.","ctaLinks":[{"label":"Get tickets","page":"tickets"},{"label":"Become a member","page":"support"},{"label":"Make a gift","page":"support"},{"label":"Volunteer with us","page":"support"}],"newsletter":{"heading":"Village updates","description":"Festivals, school tours, and volunteer days from Waipahu.","placeholder":"Your email address","buttonLabel":"Join"}},"contact":{"phone":"(808) 677-0110","phoneHref":"tel:8086770110","email":"info@hawaiianplantationvillage.org","emailHref":"mailto:info@hawaiianplantationvillage.org","address":{"line1":"94-695 Waipahu Street","line2":"Waipahu, Oʻahu, Hawaiʻi 96797"},"mapEmbed":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.141857904033!2d-158.00941912384777!3d21.38428548035626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c0065961d6fbcd7%3A0x7d27e7f6e2b17a19!2sHawaii%27s%20Plantation%20Village!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"},"hours":{"schedule":"Tuesday – Saturday: 9:00 AM – 2:00 PM","toursNote":"Guided tours at 10:00 AM & 12:00 PM","closedNote":"Closed on Sundays, Mondays, and major state holidays.","parking":"Free Visitor Parking Onsite"},"hero":{"eyebrow":"Waipahu, Oʻahu · Living plantation village","headline":"The story of the plantation worker","support":"Homes, furnishings, and gardens for the major ethnic groups who worked Hawaiʻi''s plantations — built so later generations can walk that heritage.","primaryCta":{"label":"Plan your visit"},"secondaryCta":{"label":"Watch the story"},"stats":[{"value":"1973","label":"Friends founded"},{"value":"1992","label":"Village opened"},{"value":"8","label":"Cultures"},{"value":"4","label":"Free festivals"}],"videoSrc":"/Plantation_life_documentary_video_202607131034.mp4","posterSrc":"/digitized-photos/ark_70111_1ZgL.0.jpeg"},"seo":{"title":"Hawaii''s Plantation Village | Plantation Heritage in Waipahu, Oʻahu","description":"Walk a living plantation village in Waipahu: ethnic camp homes, gardens, school tours, and free festivals that honor Hawaiʻi''s plantation workers and immigrant communities.","keywords":["Hawaii''s Plantation Village","Waipahu history","plantation museum","Oʻahu field trips","immigration history Hawaii"]},"donationPresets":[{"amount":25,"label":"$25 helps process artifact and photograph donations."},{"amount":50,"label":"$50 supports volunteer work in the collections archives."},{"amount":100,"label":"$100 helps furnish and care for ethnic camp homes."}]}'::jsonb
)
on conflict (id) do update
  set payload = excluded.payload,
      updated_at = now();

-- ---------------------------------------------------------------------------
-- Page sections (home, visit, about)
-- ---------------------------------------------------------------------------

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('home', 'quickVisit', 'published', 1, '{"hours":{"title":"HOURS OF OPERATION","primary":"Tuesday – Saturday: 9:00 AM – 2:00 PM","secondary":"Guided tours at 10:00 AM & 12:00 PM"},"location":{"title":"LOCATION","primary":"94-695 Waipahu Street","secondary":"Waipahu, Oʻahu (Free parking onsite)"},"admission":{"title":"ADMISSION","primary":"Adults: $17 | Kamaʻāina/Military: $12","secondary":"Children (5-12): $8 | Under 5: Free"}}'::jsonb, now()),
  ('home', 'cultures', 'published', 2, '{"eyebrow":"Ethnic homes and gardens","title":"Each group furnished a home to tell its story","description":"Ethnic historical groups planned the exhibits: furnishings, thematic celebrations, and gardens with plants specific to their culture. School and visitor tours walk these homes throughout the year.","items":[{"name":"Hawaiian","note":"The land and people before the cane"},{"name":"Chinese","note":"Contract labor roots and community life"},{"name":"Japanese","note":"Home life, celebrations, and tradition"},{"name":"Filipino","note":"Families, work culture, and gatherings"},{"name":"Korean","note":"A cultural celebration in the home"},{"name":"Okinawan","note":"Community memory in the camp"},{"name":"Portuguese","note":"Home, garden, and festa traditions"},{"name":"Puerto Rican","note":"Preparing for Christmas Eve"}]}'::jsonb, now()),
  ('home', 'planVisit', 'published', 3, '{"eyebrow":"Plan your visit","title":"Walk the homes and gardens","description":"Tuesday to Saturday, 9:00 AM to 2:00 PM. 94-695 Waipahu Street, Waipahu, Oʻahu. Free parking onsite.","items":[{"title":"Tickets & hours","note":"Self-guided and docent-led, Tuesday to Saturday.","page":"tickets"},{"title":"Group tours","note":"Motorcoach, custom rates, and private group scheduling.","page":"visit"},{"title":"Schools","note":"Student tours through furnished homes and gardens.","page":"learn"},{"title":"Accessibility","note":"Paved paths, ADA restrooms, and quieter sensory hours.","page":"visit"}]}'::jsonb, now()),
  ('home', 'whyVisit', 'published', 4, '{"stamp":"The village","stampClass":"green","title":"A place to share the laborers'' story","paragraphs":["Hawaii''s Plantation Village focuses on the plantation worker — people from many cultures, natives and immigrants, who were promised a chance to better their lives. The long-range goal has been a collection of structures typifying a plantation village, with each major ethnic group represented by buildings, furnishings, and gardens.","Instead of hiring professionals to plan every exhibit, the village worked with ethnic historical groups to furnish each home with a thematic plan and to design gardens with plants specific to their culture. Docents guide students, teachers, and visitors through the hardships and life-affirming experiences of plantation camp life."],"primaryCta":{"label":"Read our story","page":"about"},"secondaryCta":{"label":"Plan your visit","page":"visit"}}'::jsonb, now()),
  ('home', 'featuredBango', 'published', 5, '{"stamp":"Okada Education Center","stampClass":"rust","title":"Orientation, galleries, and the archives","paragraphs":["The Okada Education Center — named after Hideo “Major” Okada, a former sugar worker, labor union organizer, and one of the village founders — houses the main office, meeting room, three exhibit galleries, collections archives and workroom, and gift shop.","Gallery exhibits introduce immigration, plantation work culture, and WWII internment at Honouliuli. Artifact and archives assistants — all volunteers — help process donations that continue to arrive from plantation-era households."],"quote":"","quoteCite":"","cta":{"label":"Explore the photograph archives","page":"archives"}}'::jsonb, now()),
  ('home', 'bellToBell', 'published', 6, '{"stamp":"Interactive","stampClass":"rust","title":"Step into their shoes","description":"Simulate one day on the plantation. Hear the morning whistle, complete tasks in the cane rows, and gather in the community camp at sunset."}'::jsonb, now()),
  ('home', 'educators', 'published', 7, '{"stamp":"For educators","stampClass":"teal","title":"School and visitor tours","paragraphs":["School and visitor tours are scheduled throughout the year. Students, teachers, and visitors are guided through the furnished homes and survey the gardens around them.","Docents share both the hardships and the life-affirming experiences of living in plantation camps during Hawaiʻi''s plantation era — a foundation for classroom work before and after the visit."],"cta":{"label":"Bring a class","page":"learn"}}'::jsonb, now()),
  ('home', 'getInvolved', 'published', 8, '{"stamp":"Get involved","stampClass":"green","title":"Help keep the collections growing","description":"Volunteers process artifact and photograph donations, care for the village, and make plantation-themed crafts sold in the gift shop to support tours and programs.","donation":{"title":"Give directly","description":"Your gift supports the village homes, gardens, galleries, and the collections archives where donations are processed and stored.","items":[{"amount":25,"label":"$25 helps process artifact and photograph donations."},{"amount":50,"label":"$50 supports volunteer work in the collections archives."},{"amount":100,"label":"$100 helps furnish and care for ethnic camp homes."}],"cta":{"label":"Make a gift","page":"support"}},"membership":{"title":"Become a steward","description":"Belong to the village. Membership helps sustain tours, free festivals, and the work of volunteer archives assistants.","items":[{"label":"Free admission","text":"for you and your guests all year."},{"label":"Gift shop support","text":"volunteer crafts fund village programs."},{"label":"Village updates","text":"festivals, tours, and volunteer days."}],"cta":{"label":"See membership","page":"support"}}}'::jsonb, now()),
  ('home', 'eventsHeader', 'published', 9, '{"stamp":"Free village events","stampClass":"gold","title":"Festivals the community is invited to"}'::jsonb, now()),
  ('home', 'testimonialsHeader', 'published', 10, '{"stamp":"From our visitors","stampClass":"rust","title":"What people say after they walk it","description":"Teachers, neighbors, and travelers who have spent a morning in the camps."}'::jsonb, now()),
  ('home', 'events', 'published', 11, '{"items":[{"slug":"lunar-new-year","date":"Seasonal","title":"Multi-ethnic Lunar New Year Celebration","time":"","desc":"A free village festival with cultural entertainment, food, games, and displays — including Chinese lion blessings and student performers.","image":""},{"slug":"obon-in-the-village","date":"Seasonal","title":"Opening of Hawaiʻi''s Obon season","time":"Late afternoon","desc":"Obon in the village begins in late afternoon, when lanterns light the dancing area with drum accompaniment.","image":""},{"slug":"portuguese-festa","date":"Seasonal","title":"Portuguese Festa","time":"","desc":"A free community festa with entertainment on the village stage, food tasting, and cultural displays.","image":""},{"slug":"harvest-festival","date":"Seasonal","title":"Harvest Festival","time":"","desc":"A free harvest celebration with cultural entertainment, food tasting at the homes, and cooking demonstrations.","image":""}]}'::jsonb, now()),
  ('home', 'testimonials', 'published', 12, '{"items":[]}'::jsonb, now()),
  ('home', 'partners', 'published', 13, '{"items":[]}'::jsonb, now()),
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
    "guidelinesDesc": "Please do not climb on historical structures or touch displays marked with preservation tags. Hawaii''s Plantation Village is a smoke-free facility."
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
  ('about', 'header', 'published', 1, '{"stamp":"Our story","stampClass":"green","title":"Built by plantation workers and their descendants","subtitle":"The Friends of Waipahu Cultural Garden Park incorporated in 1973 so future generations would acknowledge today''s multiethnic society as rooted in Hawaiʻi''s plantation era and lifestyle."}'::jsonb, now()),
  ('about', 'mission', 'published', 2, '{"stamp":"MISSION","title":"A village for plantation heritage and legacy","paragraphs":["From its inception, the long-range goal has been a collection of structures typifying a plantation village — each major ethnic group who worked the plantations represented with buildings, furnishings, and gardens that portray an authentic, culturally informed everyday life.","Much of the capital raised came from outside Waipahu. The committee changed the project name to include all of Hawaiʻi''s plantations rather than focusing only on Waipahu. Hawaii''s Plantation Village focuses on the plantation worker: natives and immigrants promised a chance to better their lives, whose differing cultural values and traditions form the basis of our multiethnic society today."]}'::jsonb, now()),
  ('about', 'timelineIntro', 'published', 3, '{"stamp":"CHRONICLES","stampClass":"rust","title":"From camps to village","description":"Immigration waves that shaped plantation Hawaiʻi, and the founding of the Friends and the village that tells their story."}'::jsonb, now()),
  ('about', 'leadershipIntro', 'published', 4, '{"title":"Founders and builders"}'::jsonb, now()),
  ('about', 'newsIntro', 'published', 5, '{"stamp":"NEWS","title":"What is happening here"}'::jsonb, now()),
  ('about', 'careersIntro', 'published', 6, '{"stamp":"WORK WITH US","title":"Join the preservation","description":"Volunteer openings and paid roles are posted here when available. Artifact and archives assistants — all volunteers — help process donations."}'::jsonb, now()),
  ('about', 'contactIntro', 'published', 7, '{"stamp":"CONTACT","title":"Send us a message","description":"Questions about cottage history, schedules, or support? Write to us and a person will answer.","subjectOptions":["General question","Educational tours","Private events","Donation or sponsorship","Volunteering"]}'::jsonb, now())
on conflict (page_key, section_key) do nothing;

-- About list sections (page-wise CMS)
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('about', 'news', 'published', 8, '{"items":[]}'::jsonb, now()),
  ('about', 'careers', 'published', 9, '{"items":[]}'::jsonb, now()),
  ('about', 'timeline', 'published', 10, '{"items":[{"year":"1852","event":"First waves of Chinese contract laborers arrive in Oʻahu aboard the Thetis, inaugurating the plantation era."},{"year":"1878","event":"Portuguese workers arrive from Madeira and Azores, bringing stone ovens (forno) and the braguinha (ancestor of the ukulele)."},{"year":"1885","event":"The Kanyaku Imin government-contract Japanese workers arrive, establishing major camp communities and furo baths."},{"year":"1897","event":"Oahu Sugar Company is incorporated in Waipahu, erecting the massive sugar mill smokestack that dominated the skyline."},{"year":"1903","event":"First Korean immigrants land in Honolulu, setting up language schools, programs, and active community organizations."},{"year":"1906","event":"The first Filipino sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment."},{"year":"1973","event":"The Friends of Waipahu Cultural Garden Park incorporate, founded by a former plantation worker and plantation-worker descendants committed to a village that would teach later generations their heritage."},{"year":"1992","event":"Hawaii''s Plantation Village opens in Waipahu after a capital campaign led by executive director Cal Kawamoto raised over $2 million, with another $1 million from the State Legislature for the $2.5 million project."}]}'::jsonb, now()),
  ('about', 'leadership', 'published', 11, '{"items":[{"slug":"hideo-major-okada","name":"Hideo “Major” Okada","role":"Founder","desc":"Former sugar worker and labor union organizer; one of the village founders. The Okada Education Center is named in his honor."},{"slug":"cal-kawamoto","name":"Cal Kawamoto","role":"Executive director (capital campaign)","desc":"Created the capital fund drive advisory committee and worked with ethnic historical groups to plan and furnish the village exhibits."},{"slug":"spencer-leinweber","name":"Spencer Leinweber","role":"Principal architect","desc":"Of Spencer Mason Architecture; selected as principal architect for Hawaii''s Plantation Village."}]}'::jsonb, now())
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

-- Partner logos / social proof (cleared — no verified partner claims in study guide)
-- insert intentionally omitted

-- ---------------------------------------------------------------------------
-- Content entries: news (0) — cleared invented news; CMS falls back to empty
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- Content entries: programs (4) — free village festivals from study guide
-- ---------------------------------------------------------------------------

insert into public.content_entries (slug, content_type, status, title, summary, body, category, event_date_label, sort_order, metadata, published_at)
values
  (
    'lunar-new-year',
    'program',
    'published',
    'Multi-ethnic Lunar New Year Celebration',
    'A free village festival with cultural entertainment, food, games, and displays — including Chinese lion blessings and student performers.',
    'A free village festival with cultural entertainment, food, games, and displays — including Chinese lion blessings and student performers.',
    'Community',
    'Seasonal',
    1,
    '{"time": "", "date": "Seasonal"}'::jsonb,
    now()
  ),
  (
    'obon-in-the-village',
    'program',
    'published',
    'Opening of Hawaiʻi''s Obon season',
    'Obon in the village begins in late afternoon, when lanterns light the dancing area with drum accompaniment.',
    'Obon in the village begins in late afternoon, when lanterns light the dancing area with drum accompaniment.',
    'Community',
    'Seasonal',
    2,
    '{"time": "Late afternoon", "date": "Seasonal"}'::jsonb,
    now()
  ),
  (
    'portuguese-festa',
    'program',
    'published',
    'Portuguese Festa',
    'A free community festa with entertainment on the village stage, food tasting, and cultural displays.',
    'A free community festa with entertainment on the village stage, food tasting, and cultural displays.',
    'Community',
    'Seasonal',
    3,
    '{"time": "", "date": "Seasonal"}'::jsonb,
    now()
  ),
  (
    'harvest-festival',
    'program',
    'published',
    'Harvest Festival',
    'A free harvest celebration with cultural entertainment, food tasting at the homes, and cooking demonstrations.',
    'A free harvest celebration with cultural entertainment, food tasting at the homes, and cooking demonstrations.',
    'Community',
    'Seasonal',
    4,
    '{"time": "", "date": "Seasonal"}'::jsonb,
    now()
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Content entries: careers (0) — cleared invented job postings
-- ---------------------------------------------------------------------------

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
-- Content entries: faqs (4), timeline (8), leadership (3) — testimonials cleared
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
   'The first Filipino sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment.',
   6, '{"year": "1906"}'::jsonb, now()),
  ('timeline-1973', 'timeline', 'published', '1973', null,
   'The Friends of Waipahu Cultural Garden Park incorporate, founded by a former plantation worker and plantation-worker descendants committed to a village that would teach later generations their heritage.',
   7, '{"year": "1973"}'::jsonb, now()),
  ('timeline-1992', 'timeline', 'published', '1992', null,
   'Hawaii''s Plantation Village opens in Waipahu after a capital campaign led by executive director Cal Kawamoto raised over $2 million, with another $1 million from the State Legislature for the $2.5 million project.',
   8, '{"year": "1992"}'::jsonb, now()),

  ('leadership-okada', 'leadership', 'published', 'Hideo “Major” Okada',
   'Former sugar worker and labor union organizer; one of the village founders. The Okada Education Center is named in his honor.', null,
   1, '{"role": "Founder"}'::jsonb, now()),
  ('leadership-kawamoto', 'leadership', 'published', 'Cal Kawamoto',
   'Created the capital fund drive advisory committee and worked with ethnic historical groups to plan and furnish the village exhibits.', null,
   2, '{"role": "Executive director (capital campaign)"}'::jsonb, now()),
  ('leadership-leinweber', 'leadership', 'published', 'Spencer Leinweber',
   'Of Spencer Mason Architecture; selected as principal architect for Hawaii''s Plantation Village.', null,
   3, '{"role": "Principal architect"}'::jsonb, now())
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
  ('archives', 'header', 'published', 1, '{"stamp":"Photograph archives","stampClass":"green","title":"Engaging photographs in the archives","subtitle":"Most old photographs have little significance to others unless you bring context. Ask what you see, what dates or places the image hints at, whether it matches what you know, and how the elements interact — then look for more context."}'::jsonb, now()),
  ('archives', 'collections', 'published', 2, '{"eyebrow":"Three collections","title":"Photograph collections","description":"Photographs donated to Hawaii''s Plantation Village are organized into three primary collections. Knowing who kept an image, and why, changes how you read it.","items":[{"id":"oahu_sugar","name":"Oahu Sugar Company","blurb":"Mainly from the 1940s to 1950s: sugar cane cultivation and harvesting, finances, mill operations, water systems, housing, and medical services. R.H. “Harry” Lodge, division overseer, and Ernest Malterre, Jr., housing supervisor, are credited for most of the collection. Lodge’s photographs of Honouliuli Internment Camp remain a constant resource for researchers."},{"id":"murakoshi","name":"Murakoshi Collection","blurb":"Mae Okada’s collection of father-and-son photographers Nobunosuke and Henry Murakoshi. Nobunosuke’s photographs are primarily studio work; Henry’s give a peek into everyday Waipahu — school activities, picnics, celebrations, community events, camp homes, businesses, and locations."},{"id":"fwcgp","name":"Friends of Waipahu Cultural Garden Park","blurb":"The largest collection in the HPV Photograph Archives: individual donations of family, work culture, WWII induction, group photos, education and recreation from plantation life. There is some overlap with Lodge, Malterre, and Nobunosuke Murakoshi. Includes panoramic class pictures, graduations, recognition and awards, and funeral photos."}]}'::jsonb, now()),
  ('archives', 'howToLook', 'published', 3, '{"eyebrow":"Looking at photographs","title":"Questions that open an image","description":"When viewing and interacting with photographs from the archives, these questions help develop a broader understanding of the image. All one needs is more context.","steps":[{"title":"What does one see?","note":"What are you able to identify in the image to indicate who or what is being captured in the photograph?"},{"title":"When or where?","note":"Is there anything in the photograph that indicates when or where the photograph was taken?"},{"title":"Match, reinforce, or conflict?","note":"Does the photograph match, reinforce, or conflict with your own knowledge of what has been captured in the image?"},{"title":"How do the elements interact?","note":"Finally, how do the elements identified in the image interact with each other?"}]}'::jsonb, now()),
  ('archives', 'samples', 'published', 4, '{"eyebrow":"Worked examples","title":"How related frames build context","description":"The study guide reads plantation-era prints with accession cards and backs. Use the same method on the digitized village slides below: observe first, then ask what a second frame confirms or complicates.","items":[{"label":"Sample 1","title":"Outside, then inside the same house","arkIds":["ark_70111_1ZgL","ark_70111_1ZgJ"],"note":"In the study guide, Sample 1 uses metadata — filing category, subject, donor, accession year — and clues such as vehicles to date an undated street scene. Here, an exterior and an interior of camp housing work the same way: read what is visible in each frame, then ask what the pair can tell you that either image alone cannot."},{"label":"Sample 2","title":"A building, then the people in front of it","arkIds":["ark_70111_1ZgR","ark_70111_1ZgS"],"note":"Study Guide Sample 2 shows how a group event photograph can contradict assumptions — for example, that the Filipino community was primarily male by 1937. When people appear in a frame, ask whether they are the subject or the evidence of when the shutter opened, and what the group composition challenges in your prior knowledge."}]}'::jsonb, now()),
  ('archives', 'analyze', 'published', 5, '{"eyebrow":"Analyze a photograph","title":"Work through one image","description":"Based on the National Archives and Records Administration “Analyze an Artifact” form. Your responses save in this browser only; you can print or export the finished worksheet.","prompts":[{"id":"meet","heading":"Meet the photo","questions":["What do you notice when you first looked at the photograph?","How would you describe the photograph (portrait, landscape, event, posed, candid, documentary, or other)?","Is there a caption?"]},{"id":"observe","heading":"Observe its parts","questions":["List and describe the people, objects, and activities you see.","Write one sentence summarizing this photo."]},{"id":"sense","heading":"Try to make sense of it","questions":["Look at any scans that accompany the image (back, accession card). Who? Where? When?","What was happening at the time in history this photo was taken?","Why was it taken? List evidence from the image or accompanying materials."]},{"id":"evidence","heading":"Use it as historical evidence","questions":["What did you find out from this photo that you might not learn anywhere else?","What other documents, photos, or historical evidence are you going to use to help you understand this event or topic?"]}]}'::jsonb, now()),
  ('archives', 'resources', 'published', 6, '{"eyebrow":"Keep researching","title":"Resources for the photograph collections","description":"A sample of online and library resources related to HPV’s photograph collections. This list is not exhaustive.","items":[{"label":"BYU Joseph F. Smith Library — Filipino Labor Collection","note":"Special collections on Filipino laborers in Hawaiʻi.","href":"https://lib.byu.edu/collections/filipino-laborers-collection/about/"},{"label":"Hawaiʻi State Archives Digital Collections","note":"Chinese, Japanese, and Portuguese passenger manifests; vital statistics 1826–1929; WWI service records.","href":"https://digitalcollections.hawaii.gov/greenstone3/library"},{"label":"UH Mānoa Special Collections — HSPA Collection","note":"Hawaii Sugar Planters Association records and related materials.","href":"https://www2.hawaii.edu/~speccoll/hawaiihspa.html"},{"label":"Kawakami & Kikumura Yano, Picture Bride Stories (2016)","note":"University of Hawaiʻi Press.","href":""},{"label":"Odo, Voices from the Canefields (2013)","note":"Folksongs from Japanese immigrant workers in Hawaiʻi. Oxford University Press.","href":""},{"label":"Poblete, Islanders in the Empire (2014)","note":"Filipino and Puerto Rican laborers in Hawaiʻi. University of Illinois Press.","href":""},{"label":"Kodama-Nishimoto et al., Talking Hawaiʻi’s Story (2009)","note":"Oral histories of an island people. University of Hawaiʻi Press.","href":""},{"label":"UH Center for Oral History — Koloa; Closing of Sugar Plantations","note":"Koloa: an Oral History of a Kauaʻi Community (1988); The Closing of Sugar Plantations: Hamakua and Kaʻu (1997).","href":""},{"label":"National Archives analyze worksheets","note":"Public-domain materials this form is adopted from.","href":"https://www.archives.gov/education/lessons/worksheets"}]}'::jsonb, now())
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
