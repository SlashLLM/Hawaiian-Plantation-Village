-- Migration: 20260912103000_accessibility_and_rain_copy.sql
-- Visit page copy edits:
--   1. Accessibility intro: "We thought about you..." -> "We care about you. You are welcomed here."
--   2. Terrain and navigation: note that dogs and wildlife are on property; service animals must be leashed.
--   3. Rain FAQ: note the City-closure exception during a tropical storm.

-- 1 + 2. visit.safety section
update public.page_sections
set payload = replace(
      replace(
        payload::text,
        'We thought about you. You are welcome here.',
        'We care about you. You are welcomed here.'
      ),
      'Restrooms are fully ADA-compliant and located in the main visitor courtyard. Service animals are welcome throughout the Village.',
      'Restrooms are fully ADA-compliant and located in the main visitor courtyard. We do encounter dogs and wildlife like ducks and native birds on the property. Service animals on leash are welcomed.'
    )::jsonb,
    updated_at = now()
where payload::text like '%We thought about you%'
   or payload::text like '%Service animals are welcome throughout the Village.%';

-- 3a. Rain FAQ stored in the visit.faq section payload
update public.page_sections
set payload = replace(
      payload::text,
      'we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings.',
      'we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings. The only exception is when the City issues a closure of City buildings and services during a tropical storm.'
    )::jsonb,
    updated_at = now()
where payload::text like '%as tours walk outdoors between buildings.%'
  and payload::text not like '%tropical storm%';

-- 3b. Rain FAQ stored as a content entry
update public.content_entries
set body = replace(
      body,
      'we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings.',
      'we suggest bringing an umbrella or light rain jacket as tours walk outdoors between buildings. The only exception is when the City issues a closure of City buildings and services during a tropical storm.'
    ),
    updated_at = now()
where content_type = 'faq'
  and body like '%as tours walk outdoors between buildings.%'
  and body not like '%tropical storm%';
