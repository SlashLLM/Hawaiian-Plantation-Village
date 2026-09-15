-- HPV CMS seed (idempotent)
-- Run after: 20260714000000_initial_schema.sql, 20260714100000_cms_full.sql, and seed.sql
-- Requires guided-tour event from seed.sql

-- ---------------------------------------------------------------------------
-- Site settings
-- ---------------------------------------------------------------------------

insert into public.site_settings (id, payload)
values (
  'default',
  '{"brand":{"title":"Hawaii''s Plantation Village","subtitle":"Waipahu, Oʻahu, Hawaiʻi","tagline":"A living museum that preserves and shares the stories of the people, cultures, communities and legacies that shaped Hawaiʻi''s plantation era and the islands today.","estBadge":"EST. 1992"},"nav":[{"id":"visit","label":"Visit"},{"id":"explore","label":"Explore"},{"id":"stories","label":"Stories"},{"id":"archives","label":"Collections"},{"id":"play","label":"Play & Learn"},{"id":"learn","label":"Education"},{"id":"events","label":"Events"},{"id":"support","label":"Support Us"},{"id":"about","label":"About"}],"footer":{"brand":"Hawaii''s Plantation Village","invitation":"There is more to the story. Come discover with us.","invitationLinks":[{"label":"Plan Your Visit","page":"visit"},{"label":"Get Tickets","page":"tickets"}],"text":"A living museum that preserves and shares the stories of the people, cultures, communities and legacies that shaped Hawaiʻi''s plantation era and the islands today.","copyright":"© 2026 Hawaii''s Plantation Village. All rights reserved.","ctaLinks":[{"label":"Get tickets","page":"tickets"},{"label":"Become a member","page":"support"},{"label":"Make a gift","page":"support"},{"label":"Volunteer with us","page":"volunteer"}],"newsletter":{"heading":"Village updates","description":"Festivals, school tours, and volunteer days from Waipahu.","placeholder":"Your email address","buttonLabel":"Join"}},"contact":{"phone":"(808) 677-0110","phoneHref":"tel:8086770110","email":"Waipahu.hpv@gmail.com","emailHref":"mailto:Waipahu.hpv@gmail.com","address":{"line1":"94-695 Waipahu Street","line2":"Waipahu, Oʻahu, Hawaiʻi 96797"},"mapEmbed":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.141857904033!2d-158.00941912384777!3d21.38428548035626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c0065961d6fbcd7%3A0x7d27e7f6e2b17a19!2sHawaii%27s%20Plantation%20Village!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"},"hours":{"schedule":"Monday – Saturday: 9:00 AM – 2:00 PM","toursNote":"Guided tour at 10:00 AM","closedNote":"Closed on Sundays and major state holidays.","parking":"Free Visitor Parking Onsite"},"hero":{"eyebrow":"Waipahu, Oʻahu · A living museum","headline":"Experience the stories that shaped Hawaiʻi.","support":"Discover the homes, gardens, traditions and stories of the people who lived and worked in Hawaiʻi''s plantation communities and the cultures they carried.","rotatingLine":"History isn''t only something we remember. It''s something we live.","primaryCta":{"label":"Plan Your Visit"},"secondaryCta":{"label":"Discover the Village"},"stats":[{"value":"1973","label":"Our story began"},{"value":"1992","label":"The Village opened"},{"value":"8","label":"Cultural traditions"},{"value":"4","label":"Free community festivals"}],"videoSrc":"/gwr_video_mvp.mp4","posterSrc":"/digitized-photos/IMG_6805.webp"},"seo":{"title":"Hawaii''s Plantation Village | A Living Museum in Waipahu, Oʻahu","description":"Come understand how Hawaiʻi became Hawaiʻi. Step inside historic homes, gardens and cultural traditions at a living museum in Waipahu, Oʻahu, and meet the people who shaped the islands.","keywords":["Hawaii''s Plantation Village","Waipahu history","plantation museum","Oʻahu field trips","immigration history Hawaii"]},"donationPresets":[{"amount":25,"label":"$25 helps preserve and document photographs and artifacts."},{"amount":50,"label":"$50 supports collections care and archival work."},{"amount":100,"label":"$100 helps care for historic homes, gardens and exhibits."}]}'::jsonb
)
on conflict (id) do update
  set payload = excluded.payload,
      updated_at = now();

-- ---------------------------------------------------------------------------
-- Page sections (all pages, generated from src/lib/content/fallbacks.js)
-- ---------------------------------------------------------------------------

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('home', 'quickVisit', 'published', 1, '{"hours":{"title":"HOURS OF OPERATION","primary":"Monday – Saturday: 9:00 AM – 2:00 PM","secondary":"Guided tour at 10:00 AM"},"location":{"title":"LOCATION","primary":"94-695 Waipahu Street","secondary":"Waipahu, Oʻahu (Free parking onsite)"},"admission":{"title":"ADMISSION","primary":"General: $25 | Senior/Kamaʻāina/Military: $20","secondary":"Youth (11–17): $12 | Children (5–10): $8 | 4 & under: Free"}}'::jsonb, now()),
  ('home', 'cultures', 'published', 2, '{"eyebrow":"Homes, gardens & cultural traditions","title":"Many journeys. Different cultures. One shared history.","description":"People came to Hawaiʻi from across Asia, Europe, the Pacific and the Americas, bringing languages, foods, faiths, celebrations, skills and memories of home.","paragraphs":["People came to Hawaiʻi from across Asia, Europe, the Pacific and the Americas, bringing languages, foods, faiths, celebrations, skills and memories of home.","At the Village, historic homes, community spaces, artifacts and gardens reveal how families lived, worked, celebrated and built community across generations."],"closing":"Step inside. Look closely. Every home has a unique story to tell.","items":[{"name":"Hawaiian","note":"The land, her people and the world before sugar"},{"name":"Chinese","note":"Migration, family and community"},{"name":"Portuguese","note":"Family, food, faith and celebration"},{"name":"Japanese","note":"Home, work, faith and tradition"},{"name":"Okinawan","note":"Identity, memory and community"},{"name":"Puerto Rican","note":"Home, tradition and island connections"},{"name":"Korean","note":"Migration, community and cultural tradition"},{"name":"Filipino","note":"Sakada journeys, family and resilience"}]}'::jsonb, now()),
  ('home', 'planVisit', 'published', 3, '{"eyebrow":"Plan your visit","title":"Come walk through history with us.","description":"Take your time. Breathe as you step inside the homes. Wander our lush gardens. Be curious and ask questions. Hear the stories from the people who lived them.","paragraphs":["Take your time. Breathe as you step inside the homes. Wander our lush gardens. Be curious and ask questions. Hear the stories from the people who lived them.","Whether Hawaiʻi is home or you''re discovering the islands for the first time, a visit to Hawaii''s Plantation Village offers a deeper understanding of the people and cultures that continue to shape this unique gem in Waipahu."],"essentials":["Monday–Saturday · 9:00 AM–2:00 PM","94-695 Waipahu Street · Waipahu, Oʻahu","Free on-site parking"],"items":[{"title":"Tickets & Hours","note":"Everything you need to plan your day.","page":"tickets"},{"title":"Group Visits","note":"Tours for community groups, organizations and travel partners.","page":"visit"},{"title":"School Visits","note":"Bring Hawaiʻi''s history beyond the classroom.","page":"learn"},{"title":"Accessibility","note":"Information to help everyone feel welcome at the Village.","page":"visit"}]}'::jsonb, now()),
  ('home', 'whyVisit', 'published', 4, '{"stamp":"The village","stampClass":"green","title":"History has a home here.","paragraphs":["Hawaii''s Plantation Village was created by visionaries who understood that an important part of Hawaii''s story could disappear if no one chose to preserve it.","Beginning in the 1970s, former plantation workers, descendants and community members came together to save the buildings, belongings, photographs, gardens and memories of plantation life.","Rather than telling these stories from a distance, they helped create a place where future generations could walk through a living museum.","Today, visitors can enter historic homes and community structures, encounter objects from everyday life and explore our lush gardens with a plethora of local foods and plants connected to the unique plantation cultures represented here.","Our docents bring these stories to life through animated anecdotes of work and hardship, family and faith, struggle and solidarity, celebration and change.","Together, we experience how people from diverse regions helped shape the Hawaiʻi we know today."],"primaryCta":{"label":"Discover Our Story","page":"about"},"secondaryCta":{"label":"Plan Your Visit","page":"visit"}}'::jsonb, now()),
  ('home', 'featuredBango', 'published', 5, '{"stamp":"Okada Education Center","stampClass":"rust","title":"Where memory becomes history.","paragraphs":["Every photograph has a story. Every object carries a memory. Together, these help us understand lives that may otherwise be forgotten.","The Okada Education Center is named after Hideo “Major” Okada, a former sugar worker, labor organizer and one of the founders of Hawaii''s Plantation Village.","Here, visitors explore exhibitions on immigration, plantation life and labor, as well as the history of World War II incarceration at Honouliuli.","Behind the scenes, volunteers care for a growing collection of photographs, documents and artifacts donated by families across Hawaiʻi.","These are not simply records of the past but treasured pieces of familial history, entrusted to us for the future."],"quote":"","quoteCite":"","cta":{"label":"Explore the Collections","page":"archives"}}'::jsonb, now()),
  ('home', 'bellToBell', 'published', 6, '{"stamp":"Interactive history","stampClass":"rust","title":"A day in plantation life","description":"The whistle sounds before sunrise. What might an ordinary day have looked like for a plantation worker and family? Follow the rhythms of work, meals and community life through an interactive journey inspired by historical accounts and objects in our collection.","cta":{"label":"Begin the Journey"}}'::jsonb, now()),
  ('home', 'educators', 'published', 7, '{"stamp":"For educators & students","stampClass":"teal","title":"History feels different when you experience it","paragraphs":["Bring learning beyond the classroom.","At Hawaii''s Plantation Village, students enter historic homes, explore cultural gardens, encounter everyday objects and hear stories that connect Hawaiʻi''s plantation era to the islands they know today.","Guided experiences invite students to explore migration, labor, cultural exchange, family, community and change through the lives of real people.","A visit can complement classroom learning before, during and after your field trip and give students something no textbook can: a sense of place."],"cta":{"label":"Plan a School Visit","page":"learn"},"secondaryCta":{"label":"Educator Resources","page":"learn"}}'::jsonb, now()),
  ('home', 'getInvolved', 'published', 8, '{"stamp":"Help us keep our stories alive","stampClass":"green","title":"What we preserve today becomes tomorrow''s legacy.","description":"Hawaii''s Plantation Village exists because generations of people knew these stories mattered. You can help us carry this important work forward.","paragraphs":["Hawaii''s Plantation Village exists because generations of people knew these stories mattered.","You can help us carry this important work forward.","Your support cares for historic homes and gardens, preserves photographs and artifacts, welcomes students, sustains cultural programs and helps ensure that future generations can discover the people who helped shape Hawaiʻi."],"donation":{"title":"Make a gift","description":"Every gift helps preserve a piece of Hawaiʻi''s shared history.","items":[{"amount":25,"label":"$25 helps preserve and document photographs and artifacts."},{"amount":50,"label":"$50 supports collections care and archival work."},{"amount":100,"label":"$100 helps care for historic homes, gardens and exhibits."}],"closing":"Every gift matters.","cta":{"label":"Donate Today","page":"support"}},"membership":{"title":"Belong to the Village.","description":"Membership is more than admission. It''s a way to stand behind a place that keeps Hawaiʻi''s stories alive. Members help sustain exhibitions, educational programs, community festivals, collections care and the historic Village itself—while enjoying opportunities to return throughout the year.","items":[{"label":"Visit often","text":"Enjoy admission throughout your membership year."},{"label":"Bring someone with you","text":"Share the Village with your loved ones, family and friends.*"},{"label":"Stay connected","text":"Receive news about our programs, festivals and Village life."},{"label":"Make an impact","text":"Help preserve these stories for generations to come."}],"cta":{"label":"Become a Member","page":"support"}}}'::jsonb, now()),
  ('home', 'volunteer', 'published', 9, '{"stamp":"Volunteer","stampClass":"gold","title":"History needs people – YOU.","paragraphs":["The Village exists because people showed up.","They preserved buildings, donated family photographs, planted gardens, recorded memories, led tours, made repairs and shared traditions.","This spirit continues today.","Whether you love history, gardening, education, archives, cultural programs or simply working with the community, there is a place for you at Hawaii''s Plantation Village.","You do not need to be a historian. You just need to care that these stories survive."],"cta":{"label":"Volunteer With Us","page":"volunteer"}}'::jsonb, now()),
  ('home', 'eventsHeader', 'published', 10, '{"stamp":"Events at the Village","stampClass":"gold","title":"Come explore our culture with us.","description":"Throughout the year, Hawaii''s Plantation Village comes alive with music, food, dance, storytelling, cultural traditions and community celebrations. Come experience traditions passed from one generation to the next and make some memories of your own.","cta":{"label":"See All Events","page":"events"}}'::jsonb, now()),
  ('home', 'testimonialsHeader', 'published', 11, '{"stamp":"From our visitors","stampClass":"rust","title":"What people say after they walk it","description":"Teachers, neighbors, and travelers who have spent a morning in the camps."}'::jsonb, now()),
  ('home', 'events', 'published', 12, '{"items":[{"slug":"lunar-new-year","startDate":"","endDate":"","date":"Seasonal","title":"Multi-ethnic Lunar New Year Celebration","time":"","desc":"A free village festival with cultural entertainment, food, games, and displays — including Chinese lion blessings and student performers.","image":""},{"slug":"obon-in-the-village","startDate":"","endDate":"","date":"Seasonal","title":"Opening of Hawaiʻi''s Obon season","time":"Late afternoon","desc":"Obon in the village begins in late afternoon, when lanterns light the dancing area with drum accompaniment.","image":""},{"slug":"portuguese-festa","startDate":"","endDate":"","date":"Seasonal","title":"Portuguese Festa","time":"","desc":"A free community festa with entertainment on the village stage, food tasting, and cultural displays.","image":""},{"slug":"harvest-festival","startDate":"","endDate":"","date":"Seasonal","title":"Harvest Festival","time":"","desc":"A free harvest celebration with cultural entertainment, food tasting at the homes, and cooking demonstrations.","image":""}]}'::jsonb, now()),
  ('home', 'testimonials', 'published', 13, '{"items":[]}'::jsonb, now()),
  ('home', 'partners', 'published', 14, '{"items":[]}'::jsonb, now()),
  ('visit', 'header', 'published', 1, '{"stamp":"Plan your visit","stampClass":"green","title":"Come walk through history with us.","subtitle":"Take your time. Breathe as you step inside the homes. Wander our lush gardens. Be curious and ask questions. Hear the stories from the people who lived them."}'::jsonb, now()),
  ('visit', 'hours', 'published', 2, '{"title":"Opening hours","schedule":"Monday – Saturday: 9:00 AM – 2:00 PM","closedNote":"Closed on Sundays and major state holidays.","toursIntro":"To experience the stories fully, we highly recommend taking our daily guided tour led by resident docents:","tourSlots":[{"label":"Morning tour","time":"10:00 AM daily"}],"lastEntryNote":"Last entry for self-tour is at 1:00 PM.","walkInNote":"*Walk-ins are accommodated based on availability. To guarantee your spot, please book tickets online in advance."}'::jsonb, now()),
  ('visit', 'parking', 'published', 3, '{"address":"94-695 Waipahu Street, Waipahu, HI 96797","directions":"Located approximately 30 minutes from Waikīkī and Honolulu. Take H1 West to Exit 8B (Farrington Hwy), then turn right onto Waipahu Depo Road and right onto Waipahu Street.","parkingTitle":"Free visitor parking onsite","parkingDesc":"We offer free designated parking for passenger cars, school buses, and tour vans inside our secure lot."}'::jsonb, now()),
  ('visit', 'safety', 'published', 4, '{"intro":"We care about you. You are welcomed here.","terrainTitle":"Terrain and navigation","terrainDesc":"The Village path is a dirt/gravel trail approximately 0.5 miles long. Comfortable walking shoes are highly recommended. Restrooms are fully ADA-compliant and located in the main visitor courtyard. We do encounter dogs and wildlife like ducks and native birds on the property. Service animals on leash are welcomed.","guidelinesTitle":"Preserving cultural heritage","guidelinesDesc":"Please do not climb on historical structures or touch displays marked with preservation tags. Hawaii''s Plantation Village is a smoke-free facility."}'::jsonb, now()),
  ('visit', 'group', 'published', 5, '{"title":"Group visits and private tours","intro":"We welcome groups of all sizes, including tour operators, family reunions, historical organizations, and corporate outings. Group admission discounts are available for pre-registered groups of 10 or more.","commercialTitle":"Operator scheduling and access","commercialDesc":"We work closely with local and international tour operators. Commercial bus parking is available onsite. Bookings must be requested at least 14 days in advance to guarantee an exclusive docent guide.","groupTypes":["Private Group / Friends","Tour Operator / Business","Corporate / Company","Historical / Cultural Club","Senior Citizen Center"]}'::jsonb, now()),
  ('visit', 'admission', 'published', 6, '{"title":"Admission","description":"Secure your tickets online to guarantee your guided tour slot and skip the check-in queue at the visitor center desk.","rates":[{"label":"General Admission","price":"$25.00"},{"label":"Senior 62+ / Kamaʻāina / Military (Active/Retired)","price":"$20.00"},{"label":"Youth (11 – 17)","price":"$12.00"},{"label":"Children (5 – 10)","price":"$8.00"},{"label":"Children (4 & under)","price":"Free"}],"buttonLabel":"Get tickets","buttonPage":"tickets","schoolCta":{"title":"Bringing a school group?","description":"We host class visits Tuesday through Friday, with curriculum programs and discounted school pricing.","buttonLabel":"School field trips","page":"learn"},"groupCta":{"title":"Private and commercial groups","description":"Organizing a tour, family reunion, or company outing for 10 or more? You get special rates and a dedicated guide.","buttonLabel":"Group admission rates"}}'::jsonb, now()),
  ('visit', 'faq', 'published', 7, '{"title":"Common questions","items":[{"q":"How long does a typical visit take?","a":"We recommend allocating at least 1.5 to 2 hours. A full guided tour takes approximately 90 minutes, and you can explore the gardens and exhibits afterward."},{"q":"Are the historic buildings accessible?","a":"As a historic preservation site, some cottages have elevated steps or narrow doorways that replicate original plantation-era conditions. However, many structures have ramps, and our central pathways are wheelchair-friendly. Please contact us for specialized accessibility support."},{"q":"Is photography permitted?","a":"Personal photography and filming are highly encouraged! For commercial photography or wedding sessions, please obtain a permit at the managers office."},{"q":"Is the village open in the rain?","a":"Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings. The only exception is when the City issues a closure of City buildings and services during a tropical storm."}]}'::jsonb, now()),
  ('explore', 'header', 'published', 1, '{"stamp":"Homes, gardens & cultural traditions","stampClass":"green","title":"Many journeys. Different cultures. One shared history.","subtitle":"People came to Hawaiʻi from across Asia, Europe, the Pacific and the Americas, bringing languages, foods, faiths, celebrations, skills and memories of home."}'::jsonb, now()),
  ('explore', 'intro', 'published', 2, '{"paragraphs":["At the Village, historic homes, community spaces, artifacts and gardens reveal how families lived, worked, celebrated and built community across generations."],"closing":"Step inside. Look closely. Every home has a unique story to tell."}'::jsonb, now()),
  ('about', 'header', 'published', 1, '{"stamp":"About Hawaii''s Plantation Village","stampClass":"green","title":"Built by community. Preserved for generations.","subtitle":"Hawaii''s Plantation Village began with a simple but urgent idea: don''t let these stories disappear."}'::jsonb, now()),
  ('about', 'mission', 'published', 2, '{"stamp":"MISSION","title":"What emerged was more than a collection. It became a Village.","paragraphs":["In 1973, former plantation workers, descendants and community members began working to preserve the history of plantation life in Hawaiʻi.","Historic structures were gathered and restored. Families donated furniture, photographs and personal belongings. Cultural organizations helped furnish homes and plant gardens. Volunteers shared knowledge that could not always be found in history books.","Hawaii''s Plantation Village opened to the public in 1992.","Today, we continue that community-led mission: preserving the places, objects and memories of Hawaiʻi''s plantation era while creating opportunities for new generations to encounter, question and understand that history."],"quote":"A living museum, for the people by the people.","quoteCite":""}'::jsonb, now()),
  ('about', 'closing', 'published', 3, '{"stamp":"Join us","stampClass":"gold","title":"History lives when people engage with it.","paragraphs":["Through exhibitions, guided tours, education, festivals, cultural programs, oral histories and community partnerships, we connect the past with the Hawaiʻi of today.","The Village was built so these stories would survive. Our responsibility now is to make sure they continue to matter.","It really does take a village — so do join us today."],"cta":{"label":"Plan Your Visit","page":"visit"},"secondaryCta":{"label":"Volunteer With Us","page":"volunteer"}}'::jsonb, now()),
  ('about', 'timelineIntro', 'published', 4, '{"stamp":"CHRONICLES","stampClass":"rust","title":"From camps to village","description":"Immigration waves that shaped plantation Hawaiʻi, and the founding of the Friends and the Village that tells their story."}'::jsonb, now()),
  ('about', 'leadershipIntro', 'published', 5, '{"title":"Founders and builders"}'::jsonb, now()),
  ('about', 'newsIntro', 'published', 6, '{"stamp":"NEWS","title":"What is happening here"}'::jsonb, now()),
  ('about', 'careersIntro', 'published', 7, '{"stamp":"WORK WITH US","title":"Join the preservation","description":"Volunteer openings and paid roles are posted here when available. Artifact and archives assistants — all volunteers — help process donations."}'::jsonb, now()),
  ('about', 'contactIntro', 'published', 8, '{"stamp":"CONTACT","title":"Send us a message","description":"Questions about cottage history, schedules, or support? Write to us and a person will answer.","subjectOptions":["General question","Educational tours","Private events","Donation or sponsorship","Volunteering"]}'::jsonb, now()),
  ('about', 'news', 'published', 9, '{"items":[]}'::jsonb, now()),
  ('about', 'careers', 'published', 10, '{"items":[]}'::jsonb, now()),
  ('about', 'timeline', 'published', 11, '{"items":[{"year":"1852","event":"First waves of Chinese contract laborers arrive in Oʻahu aboard the Thetis, inaugurating the plantation era."},{"year":"1878","event":"Portuguese workers arrive from Madeira and Azores, bringing stone ovens (forno) and the braguinha (ancestor of the ukulele)."},{"year":"1885","event":"The Kanyaku Imin government-contract Japanese workers arrive, establishing major camp communities and furo baths."},{"year":"1897","event":"Oahu Sugar Company is incorporated in Waipahu, erecting the massive sugar mill smokestack that dominated the skyline."},{"year":"1903","event":"First Korean immigrants land in Honolulu, setting up language schools, programs, and active community organizations."},{"year":"1906","event":"The first Filipino sakadas arrive, recruited by the Hawaii Sugar Planters Association (HSPA), eventually forming the largest labor segment."},{"year":"1973","event":"The Friends of Waipahu Cultural Garden Park incorporate, founded by a former plantation worker and plantation-worker descendants committed to a village that would teach later generations their heritage."},{"year":"1992","event":"Hawaii''s Plantation Village opens in Waipahu after a capital campaign led by executive director Cal Kawamoto raised over $2 million, with another $1 million from the State Legislature for the $2.5 million project."}]}'::jsonb, now()),
  ('about', 'leadership', 'published', 12, '{"items":[{"slug":"hideo-major-okada","name":"Hideo “Major” Okada","role":"Founder","desc":"Former sugar worker and labor union organizer; one of the village founders. The Okada Education Center is named in his honor."},{"slug":"cal-kawamoto","name":"Cal Kawamoto","role":"Executive director (capital campaign)","desc":"Created the capital fund drive advisory committee and worked with ethnic historical groups to plan and furnish the village exhibits."},{"slug":"spencer-leinweber","name":"Spencer Leinweber","role":"Principal architect","desc":"Of Spencer Mason Architecture; selected as principal architect for Hawaii''s Plantation Village."}]}'::jsonb, now()),
  ('about', 'teamIntro', 'published', 13, '{"stamp":"OUR PEOPLE","title":"Staff & Board Leadership","description":"HPV runs on institutional knowledge carried by the people who’ve stayed — some for decades — alongside new leadership and governance rebuilding the systems around them.","staffLabel":"Staff","boardLabel":"Board of Directors","note":"Plus a dedicated corps of docents and volunteers — several with decades of service — who lead tours, run programs, and keep the Village open every week."}'::jsonb, now()),
  ('about', 'staff', 'published', 14, '{"items":[{"slug":"loretta-chen","name":"Dr. Loretta Chen","role":"Executive Director"},{"slug":"derrick-iwata","name":"Derrick Iwata","role":"Education & Programs Manager"},{"slug":"mil-holliday","name":"Mil Holliday","role":"Administration Manager"},{"slug":"michi-lacar","name":"Michi Lacar","role":"Programs Coordinator"},{"slug":"eli-flores","name":"Eli Flores","role":"Museum Technician"}]}'::jsonb, now()),
  ('about', 'board', 'published', 15, '{"items":[{"slug":"kats-gustafson","name":"Dr. Kats Gustafson","role":"Board President"},{"slug":"steven-yuen","name":"Steven Yuen","role":"Board Vice President"},{"slug":"clement-bautista","name":"Clement Bautista","role":"Board Treasurer"},{"slug":"william-rol","name":"William Rol","role":"Board Member"},{"slug":"john-shockley","name":"John Shockley","role":"Board Member"},{"slug":"carol-takahashi","name":"Carol Takahashi","role":"Board Member"},{"slug":"yoshiko-yamauchi","name":"Yoshiko Yamauchi","role":"Board Member"},{"slug":"paul-nishimura","name":"Paul Nishimura","role":"Board Member"}]}'::jsonb, now()),
  ('learn', 'school', 'published', 1, '{"stamp":"For educators & students","stampClass":"green","title":"History feels different when you experience it","subtitle":"Bring learning beyond the classroom. At Hawaii''s Plantation Village, students enter historic homes, explore cultural gardens, encounter everyday objects and hear stories that connect Hawaiʻi''s plantation era to the islands they know today.","resourcesIntro":"Start our HIDOE standard-aligned interactive lessons. Each package includes videos, guided reading, quizzes, and hands-on activities:","fieldTripNote":"Field trips require a minimum of 10 students and at least one adult chaperone per 10 children."}'::jsonb, now()),
  ('learn', 'youth', 'published', 2, '{"stamp":"Youth programs","stampClass":"rust","title":"Student and youth programs","subtitle":"Grow your skills, discover community history, and shape Waipahu''s future through internships and volunteer guilds.","programs":[{"slug":"docent-internship","type":"Paid Internship","title":"\"Preserving Our Roots\" Docent Internship","desc":"A semester-long or summer program designed for high school juniors and seniors. Interns study Waipahu''s multi-ethnic history, train in archival document preservation, and lead educational tours for visiting groups.","schedule":"10 weeks • Grades 11-12 • $500 stipend + school credit"},{"slug":"youth-volunteer-guild","type":"Community Service","title":"Youth Volunteer Guild","desc":"Connect with peers and plantation heritage during weekend volunteer days. Guild members participate in historic cottage restoration, maintain our traditional gardens, and host seasonal heritage festivals.","schedule":"Saturday mornings • Grades 9-12 • Service hour certification"}]}'::jsonb, now()),
  ('learn', 'family', 'published', 3, '{"stamp":"Ohana learning","stampClass":"teal","title":"Family learning and workshops","subtitle":"Discover plantation heritage together. Hands-on weekend workshops, storytelling, and self-guided exploration for all ages.","workshops":[{"slug":"talk-story-saturdays","type":"Oral History Sessions","title":"Talk Story Saturdays","desc":"Join us on the second Saturday of each month for family-friendly oral history circles. Plantation kupuna and local storytellers share memories of Waipahu camp life, plantation folklore, and community traditions.","schedule":"2nd Saturday of the Month • 10:00 AM - 11:30 AM • Free"},{"slug":"ohana-heritage-gardening","type":"Hands-On Agriculture","title":"Ohana Heritage Gardening","desc":"Discover the crops that sustained generations of plantation families. Learn how traditional Hawaiian canoe plants (Kalo, Uala) and immigrant kitchen crops were grown. Kids will plant their own heritage seed or cutting to take home.","schedule":"Last Saturday of the Month • 9:00 AM - 11:00 AM • Live cuttings & seeds"},{"slug":"village-scavenger-hunt","type":"Interactive Quest","title":"Village Scavenger Hunt & Bingo","desc":"Make your walk through our 30+ historic structures an active quest! Search for immigrant bango tags, spot traditional toys, and match camp kitchen items. Show your completed sheet at the Gift Shop for a prize.","schedule":"Self-guided • Available during open hours"}]}'::jsonb, now()),
  ('play', 'header', 'published', 1, '{"stamp":"Play","stampClass":"green","title":"Sugar Mill Tycoon","subtitle":"Cut the cane, crush it, boil it, spin it. Run the mill the way Waipahu once did."}'::jsonb, now()),
  ('play', 'gameSteps', 'published', 2, '{"steps":[{"step":1,"title":"Stage 1: Harvesting the Cane","instruction":"Drag or swipe your mouse/pointer across the dotted lines near the base of the stalks to cut them down!","history":"In the plantation days, workers used heavy steel cutlasses to cut sugarcane stalks at ground level."},{"step":2,"title":"Stage 2: Crushing & Extraction","instruction":"Click and drag the large wooden crank handle in a circle to rotate the iron rollers and squeeze out the juice!","history":"Mills used massive steam-driven iron rollers to crush sugarcane stalks."},{"step":3,"title":"Stage 3: Boiling & Skimming","instruction":"Select a Heat Burner level to boil the juice, then click on the green floating foam impurities to skim them off!","history":"Cane juice was boiled in huge clarifiers and impurities were skimmed by hand."},{"step":4,"title":"Stage 4: Spinning the Sugar","instruction":"Click the blue SPIN button in the center of the drum rapidly to separate molasses from raw crystals!","history":"Centrifuges spun the boiled sugar syrup at high speeds to separate molasses."}]}'::jsonb, now()),
  ('stories', 'header', 'published', 1, '{"stamp":"Stories from the Village","stampClass":"green","title":"History is made of human lives.","subtitle":"Behind every photograph is a person. Behind every object is a story. Behind every home are generations of memories. Meet the workers, families, cultural practitioners and community members whose experiences illuminate Hawaiʻi''s plantation past and its continuing legacy."}'::jsonb, now()),
  ('archives', 'header', 'published', 1, '{"stamp":"Collections & archives","stampClass":"green","title":"What families saved, Hawaiʻi remembers.","subtitle":"Photographs tucked into albums. Letters carried across oceans. Work tools worn smooth by use. Clothing saved for decades. Objects from kitchens, bedrooms and places of worship. Individually, they may seem ordinary. Together, they tell an extraordinary story."}'::jsonb, now()),
  ('archives', 'collections', 'published', 2, '{"eyebrow":"Three collections","title":"Photograph collections","description":"Hawaii''s Plantation Village cares for photographs, documents, artifacts and oral histories that preserve the experiences of plantation communities across generations. Knowing who kept an image, and why, changes how you read it.","items":[{"id":"oahu_sugar","name":"Oahu Sugar Company","blurb":"Mainly from the 1940s to 1950s: sugar cane cultivation and harvesting, finances, mill operations, water systems, housing, and medical services. R.H. “Harry” Lodge, division overseer, and Ernest Malterre, Jr., housing supervisor, are credited for most of the collection. Lodge’s photographs of Honouliuli Internment Camp remain a constant resource for researchers."},{"id":"murakoshi","name":"Murakoshi Collection","blurb":"Mae Okada’s collection of father-and-son photographers Nobunosuke and Henry Murakoshi. Nobunosuke’s photographs are primarily studio work; Henry’s give a peek into everyday Waipahu — school activities, picnics, celebrations, community events, camp homes, businesses, and locations."},{"id":"fwcgp","name":"Friends of Waipahu Cultural Garden Park","blurb":"The largest collection in the HPV Photograph Archives: individual donations of family, work culture, WWII induction, group photos, education and recreation from plantation life. There is some overlap with Lodge, Malterre, and Nobunosuke Murakoshi. Includes panoramic class pictures, graduations, recognition and awards, and funeral photos."}],"cta":{"label":"Explore the Collection","page":"archives"},"secondaryCta":{"label":"Donate an Object or Photograph","page":"about"}}'::jsonb, now()),
  ('archives', 'howToLook', 'published', 3, '{"eyebrow":"Looking at photographs","title":"Questions that open an image","description":"When viewing and interacting with photographs from the archives, these questions help develop a broader understanding of the image. All one needs is more context.","steps":[{"title":"What does one see?","note":"What are you able to identify in the image to indicate who or what is being captured in the photograph?"},{"title":"When or where?","note":"Is there anything in the photograph that indicates when or where the photograph was taken?"},{"title":"Match, reinforce, or conflict?","note":"Does the photograph match, reinforce, or conflict with your own knowledge of what has been captured in the image?"},{"title":"How do the elements interact?","note":"Finally, how do the elements identified in the image interact with each other?"}]}'::jsonb, now()),
  ('archives', 'samples', 'published', 4, '{"eyebrow":"Worked examples","title":"How related frames build context","description":"The study guide reads plantation-era prints with accession cards and backs. Use the same method on the digitized village slides below: observe first, then ask what a second frame confirms or complicates.","items":[{"label":"Sample 1","title":"Outside, then inside the same house","arkIds":["img_6115","img_6330"],"note":"In the study guide, Sample 1 uses metadata — filing category, subject, donor, accession year — and clues such as vehicles to date an undated street scene. Here, an exterior and an interior of camp housing work the same way: read what is visible in each frame, then ask what the pair can tell you that either image alone cannot."},{"label":"Sample 2","title":"A building, then the people and objects inside it","arkIds":["img_6820","img_6420"],"note":"Study Guide Sample 2 shows how a group event photograph can contradict assumptions — for example, that the Filipino community was primarily male by 1937. When people and named businesses appear in a frame, ask whether they are the subject or the evidence of when the shutter opened, and what the group composition challenges in your prior knowledge."}]}'::jsonb, now()),
  ('archives', 'analyze', 'published', 5, '{"eyebrow":"Analyze a photograph","title":"Work through one image","description":"Based on the National Archives and Records Administration “Analyze an Artifact” form. Your responses save in this browser only; you can print or export the finished worksheet.","prompts":[{"id":"meet","heading":"Meet the photo","questions":["What do you notice when you first looked at the photograph?","How would you describe the photograph (portrait, landscape, event, posed, candid, documentary, or other)?","Is there a caption?"]},{"id":"observe","heading":"Observe its parts","questions":["List and describe the people, objects, and activities you see.","Write one sentence summarizing this photo."]},{"id":"sense","heading":"Try to make sense of it","questions":["Look at any scans that accompany the image (back, accession card). Who? Where? When?","What was happening at the time in history this photo was taken?","Why was it taken? List evidence from the image or accompanying materials."]},{"id":"evidence","heading":"Use it as historical evidence","questions":["What did you find out from this photo that you might not learn anywhere else?","What other documents, photos, or historical evidence are you going to use to help you understand this event or topic?"]}]}'::jsonb, now()),
  ('archives', 'resources', 'published', 6, '{"eyebrow":"Keep researching","title":"Resources for the photograph collections","description":"A sample of online and library resources related to HPV’s photograph collections. This list is not exhaustive.","items":[{"label":"BYU Joseph F. Smith Library — Filipino Labor Collection","note":"Special collections on Filipino laborers in Hawaiʻi.","href":"https://lib.byu.edu/collections/filipino-laborers-collection/about/"},{"label":"Hawaiʻi State Archives Digital Collections","note":"Chinese, Japanese, and Portuguese passenger manifests; vital statistics 1826–1929; WWI service records.","href":"https://digitalcollections.hawaii.gov/greenstone3/library"},{"label":"UH Mānoa Special Collections — HSPA Collection","note":"Hawaii Sugar Planters Association records and related materials.","href":"https://www2.hawaii.edu/~speccoll/hawaiihspa.html"},{"label":"Kawakami & Kikumura Yano, Picture Bride Stories (2016)","note":"University of Hawaiʻi Press.","href":""},{"label":"Odo, Voices from the Canefields (2013)","note":"Folksongs from Japanese immigrant workers in Hawaiʻi. Oxford University Press.","href":""},{"label":"Poblete, Islanders in the Empire (2014)","note":"Filipino and Puerto Rican laborers in Hawaiʻi. University of Illinois Press.","href":""},{"label":"Kodama-Nishimoto et al., Talking Hawaiʻi’s Story (2009)","note":"Oral histories of an island people. University of Hawaiʻi Press.","href":""},{"label":"UH Center for Oral History — Koloa; Closing of Sugar Plantations","note":"Koloa: an Oral History of a Kauaʻi Community (1988); The Closing of Sugar Plantations: Hamakua and Kaʻu (1997).","href":""},{"label":"National Archives analyze worksheets","note":"Public-domain materials this form is adopted from.","href":"https://www.archives.gov/education/lessons/worksheets"}]}'::jsonb, now()),
  ('events', 'header', 'published', 1, '{"stamp":"Events at the Village","stampClass":"gold","title":"Come explore our culture with us.","subtitle":"Throughout the year, Hawaii''s Plantation Village comes alive with music, food, dance, storytelling, cultural traditions and community celebrations."}'::jsonb, now()),
  ('events', 'intro', 'published', 2, '{"paragraphs":["Come experience traditions passed from one generation to the next and make some memories of your own."],"cta":{"label":"Plan Your Visit","page":"visit"}}'::jsonb, now()),
  ('support', 'header', 'published', 1, '{"stamp":"Help us keep our stories alive","stampClass":"green","title":"What we preserve today becomes tomorrow''s legacy.","subtitle":"Hawaii''s Plantation Village exists because generations of people knew these stories mattered. You can help us carry this important work forward."}'::jsonb, now()),
  ('support', 'donate', 'published', 2, '{"title":"Make a gift","description":"Every gift helps preserve a piece of Hawaiʻi''s shared history."}'::jsonb, now()),
  ('support', 'membershipIntro', 'published', 3, '{"title":"Belong to the Village.","description":"Membership is more than admission. It''s a way to stand behind a place that keeps Hawaiʻi''s stories alive."}'::jsonb, now()),
  ('support', 'impactSidebar', 'published', 4, '{"title":"Where your support goes","items":["Cares for historic homes and gardens","Preserves photographs and artifacts","Welcomes students and sustains cultural programs"]}'::jsonb, now()),
  ('volunteer', 'header', 'published', 1, '{"stamp":"Volunteer","stampClass":"gold","title":"History needs people – YOU.","subtitle":"The Village exists because people showed up."}'::jsonb, now()),
  ('volunteer', 'intro', 'published', 2, '{"paragraphs":["They preserved buildings, donated family photographs, planted gardens, recorded memories, led tours, made repairs and shared traditions.","This spirit continues today.","Whether you love history, gardening, education, archives, cultural programs or simply working with the community, there is a place for you at Hawaii''s Plantation Village."],"closing":"You do not need to be a historian. You just need to care that these stories survive."}'::jsonb, now()),
  ('volunteer', 'ways', 'published', 3, '{"title":"Where you can help","items":[{"title":"Docents & tours","note":"Walk visitors through the homes and share the stories behind them."},{"title":"Gardens & grounds","note":"Plant, tend and harvest the cultural gardens that surround the Village."},{"title":"Collections & archives","note":"Help process photographs, documents and artifacts entrusted to us by families."},{"title":"Festivals & programs","note":"Set up, welcome and celebrate alongside the community at our free festivals."},{"title":"Repairs & preservation","note":"Keep the historic structures standing with carpentry, painting and maintenance."},{"title":"Office & welcome desk","note":"Greet visitors, answer questions and keep the day running."}]}'::jsonb, now()),
  ('volunteer', 'cta', 'published', 4, '{"title":"Volunteer With Us","description":"Tell us a little about yourself and what you would like to help with. We will be in touch about upcoming volunteer days and orientations."}'::jsonb, now()),
  ('tickets', 'header', 'published', 1, '{"stamp":"Book your visit","stampClass":"green","title":"Tickets and reservations","subtitle":"Reserve a guided tour slot and skip the check-in queue at the visitor center."}'::jsonb, now())
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
    'hawaiian',
    'camp_story',
    'published',
    'The Hawaiian Hale & Taro Patch',
    'Native Hawaiian families lived on this land long before the plantation, tending loʻi kalo and sharing traditions with the immigrant camps that grew up around them.',
    'Long before contract laborers arrived, Native Hawaiian families cultivated the ahupuaʻa of Waipahu, tending loʻi kalo (taro patches) fed by the ʻauwai (irrigation channels) that later shaped the plantation''s own ditch system. As the sugar era grew, Hawaiian families remained woven into camp life, teaching neighbors to fish, pound poi, and read the land, even as their own community was reshaped by the plantation around them.',
    'Hawaiian',
    1,
    '{"culture": "Hawaiian", "arrival": "Before plantation era", "oralHistory": {"narrator": "Leimomi Kahale (Kupuna, Taro Patch Keeper)", "length": "3m 05s", "audioSimText": "Recording: Kahale ohana oral history, recorded 1996.", "transcript": "My tutu kept the loi going even after the ditch water was diverted for cane. She said the taro remembered this valley long before the mill whistle ever did. Workers from every camp came to trade for poi, and she taught their children the names of the wind and rain here. The plantation changed everything around us, but the kalo kept us rooted."}}'::jsonb,
    now()
  ),
  (
    'chinese',
    'camp_story',
    'published',
    'The Chinese Society Cookhouse',
    'One of the earliest immigrant groups who completed contract terms and founded successful merchants and agricultural hubs.',
    'Chinese contract laborers arrived in 1852. They introduced rice cultivation techniques to the swampy lowlands of Waipahu. The cookhouse was the heart of the Chinese camp section, serving as a social gathering spot and a place to honor ancestors during festivals.',
    'Chinese',
    2,
    '{"culture": "Chinese", "arrival": "1852", "oralHistory": {"narrator": "Siu Lung Chang (Grandson of Cookhouse Manager)", "length": "2m 45s", "audioSimText": "Recording: Chang family oral archive, interviewed 1994.", "transcript": "My grandfather came in 1888. He told me the kitchen fires in the Chinese camp section never went out. They baked buns, boiled tea, and exchanged news. The bango system was tight, but workers pooled their credit slips to buy bulk ingredients directly from Honolulu merchants. That cookhouse kept our community alive."}}'::jsonb,
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
    3,
    '{"culture": "Portuguese", "arrival": "1878", "oralHistory": {"narrator": "Maria Da Silva (Cottage Resident descendant)", "length": "2m 15s", "audioSimText": "Recording: Da Silva family history, recorded 1993.", "transcript": "Every Saturday, my grandmother heated the forno brick oven with eucalyptus wood. The smell of baking sweet bread traveled through all the camps. Japanese, Filipino, and Chinese kids would wait near our yard. She never let a single child walk away without a warm crust."}}'::jsonb,
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
    4,
    '{"culture": "Japanese", "arrival": "1885", "oralHistory": {"narrator": "Kiyoshi Tanaka (Retired Sugar Mill Stoker)", "length": "3m 12s", "audioSimText": "Recording: Tanaka oral history, interviewed 1989.", "transcript": "At the end of a 10-hour shift in the boiling sugar house, covered in black dust, the furo bath was heaven. We sat in the hot water and talked. Language did not matter much. We shared cigarettes and laughed. It was where we stopped being contract numbers and became friends."}}'::jsonb,
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
    5,
    '{"culture": "Okinawan", "arrival": "1900", "oralHistory": {"narrator": "Kama Uyehara (Third-Generation Sanshin Instructor)", "length": "3m 40s", "audioSimText": "Recording: Uyehara family tape archive, Waipahu, recorded 1992.", "transcript": "My father made his first sanshin using an empty cigar box and a piece of eucalyptus wood. In the evenings, when the field dust settled, he would play the old Ryukyuan folk songs. The music was different from the Japanese songs—it was warmer, and the neighbors from all the other camps would lean over the fences to listen."}}'::jsonb,
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
    'korean',
    'camp_story',
    'published',
    'The Korean Protestant Community Cottage',
    'Formed tightly-knit communities centered around church gatherings, language schools, and independence movements.',
    'Korean immigrants arrived in 1903, seeking relief from political turmoil. They established active language schools and churches. Korean camp cottages often had small gardens for making fermented vegetables, introducing kimchi to the local diet.',
    'Korean',
    7,
    '{"culture": "Korean", "arrival": "1903", "oralHistory": {"narrator": "Young-Hee Park (Language School Educator)", "length": "3m 50s", "audioSimText": "Recording: Park family archive, recorded 1995.", "transcript": "We gathered at the camp chapel on Sundays. It was not just for church services; it was where we taught our children the Korean alphabet and gathered funds to support the independence movement in Seoul. The cottage garden always had chili pepper stalks growing in the red dirt."}}'::jsonb,
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
    8,
    '{"culture": "Filipino", "arrival": "1906", "oralHistory": {"narrator": "Espiridion Pedro Ramos (Sakada Field Guide)", "length": "4m 05s", "audioSimText": "Recording: Sakada oral archive, interviewed 1991.", "transcript": "We lived six men to a room in the Waipahu barracks. We brought our guitars, and on Saturday nights, we sang kundiman love songs on the porch. The Luna was strict, but when the music started, the fields felt far away. We became brothers in those rooms."}}'::jsonb,
    now()
  )
on conflict (slug) do update
set sort_order = excluded.sort_order,
    metadata = excluded.metadata;

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
   'Yes, we are open rain or shine! Hawaii weather can be tropical; we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings. The only exception is when the City issues a closure of City buildings and services during a tropical storm.',
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
    ('10:00 AM', 1)
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
-- Archives: page sections and photographs (18) — study guide
-- Generated by scripts/generate-photograph-seed.mjs; do not hand-edit.
-- ---------------------------------------------------------------------------

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
  ('archives', 'header', 'published', 1, '{"stamp":"Collections & archives","stampClass":"green","title":"What families saved, Hawaiʻi remembers.","subtitle":"Photographs tucked into albums. Letters carried across oceans. Work tools worn smooth by use. Clothing saved for decades. Objects from kitchens, bedrooms and places of worship. Individually, they may seem ordinary. Together, they tell an extraordinary story."}'::jsonb, now()),
  ('archives', 'collections', 'published', 2, '{"eyebrow":"Three collections","title":"Photograph collections","description":"Hawaii''s Plantation Village cares for photographs, documents, artifacts and oral histories that preserve the experiences of plantation communities across generations. Knowing who kept an image, and why, changes how you read it.","items":[{"id":"oahu_sugar","name":"Oahu Sugar Company","blurb":"Mainly from the 1940s to 1950s: sugar cane cultivation and harvesting, finances, mill operations, water systems, housing, and medical services. R.H. “Harry” Lodge, division overseer, and Ernest Malterre, Jr., housing supervisor, are credited for most of the collection. Lodge’s photographs of Honouliuli Internment Camp remain a constant resource for researchers."},{"id":"murakoshi","name":"Murakoshi Collection","blurb":"Mae Okada’s collection of father-and-son photographers Nobunosuke and Henry Murakoshi. Nobunosuke’s photographs are primarily studio work; Henry’s give a peek into everyday Waipahu — school activities, picnics, celebrations, community events, camp homes, businesses, and locations."},{"id":"fwcgp","name":"Friends of Waipahu Cultural Garden Park","blurb":"The largest collection in the HPV Photograph Archives: individual donations of family, work culture, WWII induction, group photos, education and recreation from plantation life. There is some overlap with Lodge, Malterre, and Nobunosuke Murakoshi. Includes panoramic class pictures, graduations, recognition and awards, and funeral photos."}],"cta":{"label":"Explore the Collection","page":"archives"},"secondaryCta":{"label":"Donate an Object or Photograph","page":"about"}}'::jsonb, now()),
  ('archives', 'howToLook', 'published', 3, '{"eyebrow":"Looking at photographs","title":"Questions that open an image","description":"When viewing and interacting with photographs from the archives, these questions help develop a broader understanding of the image. All one needs is more context.","steps":[{"title":"What does one see?","note":"What are you able to identify in the image to indicate who or what is being captured in the photograph?"},{"title":"When or where?","note":"Is there anything in the photograph that indicates when or where the photograph was taken?"},{"title":"Match, reinforce, or conflict?","note":"Does the photograph match, reinforce, or conflict with your own knowledge of what has been captured in the image?"},{"title":"How do the elements interact?","note":"Finally, how do the elements identified in the image interact with each other?"}]}'::jsonb, now()),
  ('archives', 'samples', 'published', 4, '{"eyebrow":"Worked examples","title":"How related frames build context","description":"The study guide reads plantation-era prints with accession cards and backs. Use the same method on the digitized village slides below: observe first, then ask what a second frame confirms or complicates.","items":[{"label":"Sample 1","title":"Outside, then inside the same house","arkIds":["img_6115","img_6330"],"note":"In the study guide, Sample 1 uses metadata — filing category, subject, donor, accession year — and clues such as vehicles to date an undated street scene. Here, an exterior and an interior of camp housing work the same way: read what is visible in each frame, then ask what the pair can tell you that either image alone cannot."},{"label":"Sample 2","title":"A building, then the people and objects inside it","arkIds":["img_6820","img_6420"],"note":"Study Guide Sample 2 shows how a group event photograph can contradict assumptions — for example, that the Filipino community was primarily male by 1937. When people and named businesses appear in a frame, ask whether they are the subject or the evidence of when the shutter opened, and what the group composition challenges in your prior knowledge."}]}'::jsonb, now()),
  ('archives', 'analyze', 'published', 5, '{"eyebrow":"Analyze a photograph","title":"Work through one image","description":"Based on the National Archives and Records Administration “Analyze an Artifact” form. Your responses save in this browser only; you can print or export the finished worksheet.","prompts":[{"id":"meet","heading":"Meet the photo","questions":["What do you notice when you first looked at the photograph?","How would you describe the photograph (portrait, landscape, event, posed, candid, documentary, or other)?","Is there a caption?"]},{"id":"observe","heading":"Observe its parts","questions":["List and describe the people, objects, and activities you see.","Write one sentence summarizing this photo."]},{"id":"sense","heading":"Try to make sense of it","questions":["Look at any scans that accompany the image (back, accession card). Who? Where? When?","What was happening at the time in history this photo was taken?","Why was it taken? List evidence from the image or accompanying materials."]},{"id":"evidence","heading":"Use it as historical evidence","questions":["What did you find out from this photo that you might not learn anywhere else?","What other documents, photos, or historical evidence are you going to use to help you understand this event or topic?"]}]}'::jsonb, now()),
  ('archives', 'resources', 'published', 6, '{"eyebrow":"Keep researching","title":"Resources for the photograph collections","description":"A sample of online and library resources related to HPV’s photograph collections. This list is not exhaustive.","items":[{"label":"BYU Joseph F. Smith Library — Filipino Labor Collection","note":"Special collections on Filipino laborers in Hawaiʻi.","href":"https://lib.byu.edu/collections/filipino-laborers-collection/about/"},{"label":"Hawaiʻi State Archives Digital Collections","note":"Chinese, Japanese, and Portuguese passenger manifests; vital statistics 1826–1929; WWI service records.","href":"https://digitalcollections.hawaii.gov/greenstone3/library"},{"label":"UH Mānoa Special Collections — HSPA Collection","note":"Hawaii Sugar Planters Association records and related materials.","href":"https://www2.hawaii.edu/~speccoll/hawaiihspa.html"},{"label":"Kawakami & Kikumura Yano, Picture Bride Stories (2016)","note":"University of Hawaiʻi Press.","href":""},{"label":"Odo, Voices from the Canefields (2013)","note":"Folksongs from Japanese immigrant workers in Hawaiʻi. Oxford University Press.","href":""},{"label":"Poblete, Islanders in the Empire (2014)","note":"Filipino and Puerto Rican laborers in Hawaiʻi. University of Illinois Press.","href":""},{"label":"Kodama-Nishimoto et al., Talking Hawaiʻi’s Story (2009)","note":"Oral histories of an island people. University of Hawaiʻi Press.","href":""},{"label":"UH Center for Oral History — Koloa; Closing of Sugar Plantations","note":"Koloa: an Oral History of a Kauaʻi Community (1988); The Closing of Sugar Plantations: Hamakua and Kaʻu (1997).","href":""},{"label":"National Archives analyze worksheets","note":"Public-domain materials this form is adopted from.","href":"https://www.archives.gov/education/lessons/worksheets"}]}'::jsonb, now())
on conflict (page_key, section_key) do nothing;

insert into public.content_entries (slug, content_type, page_key, status, title, summary, body, category, event_date_label, image_url, sort_order, metadata, published_at)
values
  (
    'img-6805',
    'photograph',
    'archives',
    'published',
    'Village path between camp houses and palms',
    'A paved walkway curves through the village between white camp cottages, a croton bush, and tall palm trunks under an overcast sky.',
    'Site paths and plantings date this as museum-era documentation of the living village rather than a plantation-era street scene.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6805.webp',
    1,
    '{"arkId":"img_6805","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Paved path lined with restored cottages, palms, and tropical plantings","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6805.webp","imageUrl":"/digitized-photos/IMG_6805.webp","relatedArkIds":["img_6115","img_6820"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Site paths and plantings date this as museum-era documentation of the living village rather than a plantation-era street scene.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6115',
    'photograph',
    'archives',
    'published',
    'Dark camp cottage with white porch',
    'A dark board-and-batten cottage with a white porch and railing sits on a sunny lawn; a small metal plaque marks it as an interpreted exhibit.',
    'The plaque in the foreground is museum evidence: this structure is being read as heritage, not as occupied housing.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6115.webp',
    2,
    '{"arkId":"img_6115","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Single-wall camp cottage with dark siding, white porch railings, and an interpretive plaque","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6115.webp","imageUrl":"/digitized-photos/IMG_6115.webp","relatedArkIds":["img_6122","img_6330"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"The plaque in the foreground is museum evidence: this structure is being read as heritage, not as occupied housing.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6122',
    'photograph',
    'archives',
    'published',
    'Sunlit porch along a white camp house',
    'Looking down a white camp-house porch: lace curtains in a multi-pane window, a screen door ajar, and a horseshoe mounted above the frame.',
    'Porch depth, rail detail, and door hardware are the kind of construction clues the study guide asks viewers to inventory before guessing date or culture.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6122.webp',
    3,
    '{"arkId":"img_6122","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Long porch with lace curtains, screen door, and horseshoe above the doorway","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6122.webp","imageUrl":"/digitized-photos/IMG_6122.webp","relatedArkIds":["img_6115","img_6365"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Porch depth, rail detail, and door hardware are the kind of construction clues the study guide asks viewers to inventory before guessing date or culture.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6330',
    'photograph',
    'archives',
    'published',
    'Furnished camp interior opening to the lanai',
    'Inside a furnished camp house: open double doors look onto a lanai with red railings; woven hats hang on the wall beside a framed black-and-white group photograph.',
    'Pair this interior with the cottage exterior to practice reading what one frame confirms or complicates about the other.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6330.webp',
    4,
    '{"arkId":"img_6330","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Camp house interior with open double doors, woven hats, and a historical group photograph","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6330.webp","imageUrl":"/digitized-photos/IMG_6330.webp","relatedArkIds":["img_6115","img_6365"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Pair this interior with the cottage exterior to practice reading what one frame confirms or complicates about the other.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6365',
    'photograph',
    'archives',
    'published',
    'Camp room with trunks, stool, and books',
    'A bright camp-house corner: tied lace curtains, stacked trunks with quilts, a low green table holding open books, and a framed group photograph on the wall.',
    'Domestic objects — trunks, quilts, books — are clues to how ethnic historical groups chose to furnish these exhibits.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6365.webp',
    5,
    '{"arkId":"img_6365","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Corner of a furnished camp room with trunks, a three-legged stool, and open books","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6365.webp","imageUrl":"/digitized-photos/IMG_6365.webp","relatedArkIds":["img_6330","img_6122"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Domestic objects — trunks, quilts, books — are clues to how ethnic historical groups chose to furnish these exhibits.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6400',
    'photograph',
    'archives',
    'published',
    'Household altar between sewing room and kitchen',
    'A lace-covered altar with a Virgin Mary statue stands against pale green plank walls; doorways open to a sewing machine on one side and a wood stove kitchen on the other.',
    'Faith objects and room adjacencies help identify which ethnic home this exhibit represents and how family life was organized in a small footprint.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6400.webp',
    6,
    '{"arkId":"img_6400","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Religious altar with Virgin Mary statue flanked by doorways into adjoining rooms","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6400.webp","imageUrl":"/digitized-photos/IMG_6400.webp","relatedArkIds":["img_6330","img_6350"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Faith objects and room adjacencies help identify which ethnic home this exhibit represents and how family life was organized in a small footprint.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6350',
    'photograph',
    'archives',
    'published',
    'Worktable sink in a dark wooden kitchen',
    'Daylight falls across a timber worktable with a white ceramic sink and enamel bowls; woven baskets and a round mat hang against dark plank walls.',
    'Work surfaces and containers are evidence of daily labor inside the home — cooking, washing, food storage — not only ceremonial display.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6350.webp',
    7,
    '{"arkId":"img_6350","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Historic kitchen or workroom with ceramic sink, enamel bowls, and woven baskets","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6350.webp","imageUrl":"/digitized-photos/IMG_6350.webp","relatedArkIds":["img_6310","img_6400"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Work surfaces and containers are evidence of daily labor inside the home — cooking, washing, food storage — not only ceremonial display.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6310',
    'photograph',
    'archives',
    'published',
    'Blue shed with watering cans and jars',
    'A charcoal-blue shed corner holds shelves of jars, a workbench sink, a straw broom, and four long-spout metal watering cans under the bench.',
    'Garden and wash tools document the outdoor labor that supported camp households as much as furniture does indoors.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6310.webp',
    8,
    '{"arkId":"img_6310","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Utility shed interior with long-spout watering cans, glass jars, and a washboard","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6310.webp","imageUrl":"/digitized-photos/IMG_6310.webp","relatedArkIds":["img_6350","img_6380"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Garden and wash tools document the outdoor labor that supported camp households as much as furniture does indoors.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6380',
    'photograph',
    'archives',
    'published',
    'White outbuilding with packed-earth floor',
    'A bright white interior with exposed rafters, a packed reddish earth floor, and an open cubby shelf unit beside an open door.',
    'Floor material and roof structure are dating and use clues: packed earth and corrugated roofing point to utility space, not a furnished parlor.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6380.webp',
    9,
    '{"arkId":"img_6380","collection":"fwcgp","filingCategory":"Village site documentation","subject":"White-painted wooden outbuilding with dirt floor and open cubby shelving","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6380.webp","imageUrl":"/digitized-photos/IMG_6380.webp","relatedArkIds":["img_6310","img_6820"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Floor material and roof structure are dating and use clues: packed earth and corrugated roofing point to utility space, not a furnished parlor.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6820',
    'photograph',
    'archives',
    'published',
    'Green cottage with red corrugated roof',
    'A forest-green cottage with a bright red corrugated roof and white porch railings sits on a lawn, framed by a large shade tree.',
    'Paint color and roof material help distinguish structures when matching exteriors to interiors across related frames.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6820.webp',
    10,
    '{"arkId":"img_6820","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Small green wooden building with red metal roof and white porch steps under a shade tree","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6820.webp","imageUrl":"/digitized-photos/IMG_6820.webp","relatedArkIds":["img_6805","img_6420"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Paint color and roof material help distinguish structures when matching exteriors to interiors across related frames.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6420',
    'photograph',
    'archives',
    'published',
    'Shiroma Saimin stand exhibit',
    'Looking through glass into the Shiroma Saimin exhibit: a wall sign dated 1932–1954, framed family photographs, ceramic bowls, and a vintage noodle-making machine.',
    'Named businesses and date ranges on exhibit signage are explicit captions — rare in undated field photographs, common in museum interpretation.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6420.webp',
    11,
    '{"arkId":"img_6420","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Interior exhibit for Shiroma Saimin 1932–1954 with noodle machine and family photographs","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6420.webp","imageUrl":"/digitized-photos/IMG_6420.webp","relatedArkIds":["img_6820","img_6810"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Named businesses and date ranges on exhibit signage are explicit captions — rare in undated field photographs, common in museum interpretation.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6810',
    'photograph',
    'archives',
    'published',
    'Plantation clinic with dental chair',
    'A white board-and-batten clinic room holds a purple-upholstered dental chair, amber glass bottles on open shelves, and a window onto a large tree trunk.',
    'Medical equipment and pharmacy bottles document plantation company services — housing was only one part of camp infrastructure.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6810.webp',
    12,
    '{"arkId":"img_6810","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Restored medical or dental office with vintage chair, amber bottles, and white cabinets","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6810.webp","imageUrl":"/digitized-photos/IMG_6810.webp","relatedArkIds":["img_6420","img_6350"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Medical equipment and pharmacy bottles document plantation company services — housing was only one part of camp infrastructure.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6103',
    'photograph',
    'archives',
    'published',
    'Red temple porch under blue sky',
    'Looking up at a saturated red wooden porch and railing against a clear blue sky, with green foliage framing the structure.',
    'Architectural style and paint color are primary clues when identifying which ethnic community''s sacred or communal building this is.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6103.webp',
    13,
    '{"arkId":"img_6103","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Bright red wooden temple or shrine porch with geometric railing","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6103.webp","imageUrl":"/digitized-photos/IMG_6103.webp","relatedArkIds":["img_6066","img_6222"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Architectural style and paint color are primary clues when identifying which ethnic community''s sacred or communal building this is.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6066',
    'photograph',
    'archives',
    'published',
    'Stone memorial markers under a shade tree',
    'Dark standing stones on angled concrete bases sit in deep shade beneath a large tree; a wooden fence corner enters the foreground.',
    'Memorial landscapes ask different questions than furnished homes: whose names are present, who is absent, and when the markers were installed.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6066.webp',
    14,
    '{"arkId":"img_6066","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Upright memorial stones on concrete plinths beneath a leafy tree","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6066.webp","imageUrl":"/digitized-photos/IMG_6066.webp","relatedArkIds":["img_6103","img_6222"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Memorial landscapes ask different questions than furnished homes: whose names are present, who is absent, and when the markers were installed.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6222',
    'photograph',
    'archives',
    'published',
    'Camp yard with lamp post and fence',
    'Sunlit asphalt between white and pale-green camp buildings; a plantation-style lamp post stands by a brown fence under a large tree.',
    'Yard spaces between houses are where work, play, and neighbor life happened — look for fences, lamps, and shared open ground.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6222.webp',
    15,
    '{"arkId":"img_6222","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Outdoor yard between camp buildings with lamp post, fence, and grassy patch","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6222.webp","imageUrl":"/digitized-photos/IMG_6222.webp","relatedArkIds":["img_6805","img_6103"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Yard spaces between houses are where work, play, and neighbor life happened — look for fences, lamps, and shared open ground.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6271',
    'photograph',
    'archives',
    'published',
    'Timber frame under repair',
    'A weathered open timber frame with a slanted roof sits on bare earth among construction debris; a stepladder corner enters the foreground.',
    'Repair and reconstruction frames document the museum as a working site — preservation is ongoing, not finished.',
    'oahu_sugar',
    'ca. 2020s',
    '/digitized-photos/IMG_6271.webp',
    16,
    '{"arkId":"img_6271","collection":"oahu_sugar","filingCategory":"Village site documentation","subject":"Open timber frame of a small building with debris and a stepladder","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6271.webp","imageUrl":"/digitized-photos/IMG_6271.webp","relatedArkIds":["img_6298"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Repair and reconstruction frames document the museum as a working site — preservation is ongoing, not finished.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6298',
    'photograph',
    'archives',
    'published',
    'Elevated wooden frame under construction',
    'An elevated wooden frame with diagonal bracing and a partially sheeted roof stands on dirt among dry leaves.',
    'Compare framing stages across related construction photos to see how quickly plantation-style structures go up.',
    'oahu_sugar',
    'ca. 2020s',
    '/digitized-photos/IMG_6298.webp',
    17,
    '{"arkId":"img_6298","collection":"oahu_sugar","filingCategory":"Village site documentation","subject":"Elevated lumber frame with partial corrugated roofing","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6298.webp","imageUrl":"/digitized-photos/IMG_6298.webp","relatedArkIds":["img_6271"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Compare framing stages across related construction photos to see how quickly plantation-style structures go up.","provisional":true}'::jsonb,
    now()
  ),
  (
    'img-6435',
    'photograph',
    'archives',
    'published',
    'Village garden path detail',
    'A digitized village photograph from the current site documentation set — working title pending staff catalog review.',
    'Use this frame with the path and yard photographs to map how plantings and circulation connect the ethnic homes.',
    'fwcgp',
    'ca. 2020s',
    '/digitized-photos/IMG_6435.webp',
    18,
    '{"arkId":"img_6435","collection":"fwcgp","filingCategory":"Village site documentation","subject":"Garden and path documentation within the village grounds","donor":"Friends of Waipahu Cultural Garden Park","accessionNumber":"","circaDate":"ca. 2020s","photographer":"","thumbnailUrl":"/digitized-photos/thumbs/IMG_6435.webp","imageUrl":"/digitized-photos/IMG_6435.webp","relatedArkIds":["img_6805","img_6222"],"backImageUrl":null,"accessionCardUrl":null,"studyNotes":"Use this frame with the path and yard photographs to map how plantings and circulation connect the ethnic homes.","provisional":true}'::jsonb,
    now()
  )
on conflict (slug) do nothing;
