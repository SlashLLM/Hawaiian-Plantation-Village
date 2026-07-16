export function mapNewsArticle(row) {
  return {
    id: row.slug ?? row.id,
    slug: row.slug,
    title: row.title,
    date: row.event_date_label || (row.published_at ? new Date(row.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''),
    category: row.category ?? 'Community',
    summary: row.summary ?? '',
    content: row.body ?? row.summary ?? '',
    image: row.image_url ?? null,
  };
}

export function mapProgramEvent(row) {
  const meta = row.metadata ?? {};
  return {
    date: row.event_date_label ?? meta.date ?? '',
    title: row.title,
    time: meta.time ?? '',
    desc: row.summary ?? '',
    slug: row.slug,
  };
}

export function mapCampStory(row) {
  const meta = row.metadata ?? {};
  return {
    id: row.slug,
    culture: meta.culture ?? row.category ?? '',
    title: row.title,
    arrival: meta.arrival ?? '',
    shortDesc: row.summary ?? '',
    fullHistory: row.body ?? '',
    image_url: row.image_url ?? null,
    oralHistory: meta.oralHistory ?? null,
  };
}

export function mapCareer(row) {
  const meta = row.metadata ?? {};
  return {
    id: row.slug,
    title: row.title,
    type: meta.type ?? '',
    department: meta.department ?? '',
    compensation: meta.compensation ?? '',
    hours: meta.hours ?? '',
    summary: row.summary ?? '',
    responsibilities: meta.responsibilities ?? [],
    requirements: meta.requirements ?? [],
  };
}

export function mapFaq(row) {
  return { q: row.title, a: row.body ?? row.summary ?? '' };
}

export function mapTestimonial(row) {
  const meta = row.metadata ?? {};
  return {
    quote: row.body ?? row.summary ?? '',
    authorName: meta.authorName ?? row.title,
    authorMeta: meta.authorMeta ?? '',
  };
}

export function mapTimeline(row) {
  const meta = row.metadata ?? {};
  return { year: meta.year ?? row.event_date_label ?? '', event: row.body ?? row.summary ?? row.title };
}

export function mapLeadership(row) {
  const meta = row.metadata ?? {};
  return { name: row.title, role: meta.role ?? '', desc: row.summary ?? '' };
}

export function mapWorkshop(row) {
  const meta = row.metadata ?? {};
  return {
    slug: row.slug,
    type: meta.type ?? row.category ?? '',
    title: row.title,
    desc: row.summary ?? '',
    schedule: meta.schedule ?? '',
  };
}

export function mapGroupTicketType(row) {
  const priceCents = row.price_cents ?? row.priceCents ?? 0;
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    priceCents,
    priceDisplay: row.priceDisplay ?? `$${(priceCents / 100).toFixed(2)}`,
    sortOrder: row.sort_order ?? row.sortOrder ?? 0,
    isActive: row.is_active ?? row.isActive ?? true,
  };
}

/** Normalize CMS section payloads so public pages receive a consistent shape. */
export function normalizeSectionPayload(pageKey, sectionKey, payload = {}) {
  if (!payload || typeof payload !== 'object') return payload;

  if (pageKey === 'home' && sectionKey === 'featuredBango') {
    const quote = typeof payload.quote === 'string'
      ? { text: payload.quote, cite: payload.quoteCite ?? '' }
      : payload.quote;
    return { ...payload, quote };
  }

  if (pageKey === 'home' && sectionKey === 'getInvolved') {
    const membership = payload.membership ?? {};
    return {
      ...payload,
      intro: payload.intro ?? payload.description ?? '',
      membership: {
        ...membership,
        benefits: membership.benefits ?? membership.items ?? [],
      },
    };
  }

  return payload;
}

export function sectionsToMap(rows = [], { normalize = true } = {}) {
  const map = {};
  rows.forEach((row) => {
    if (!map[row.page_key]) map[row.page_key] = {};
    const payload = row.payload ?? {};
    map[row.page_key][row.section_key] = normalize
      ? normalizeSectionPayload(row.page_key, row.section_key, payload)
      : payload;
  });
  return map;
}

export function mapCurriculumModule(mod, checkpoints = []) {
  return {
    id: mod.slug,
    title: mod.title,
    grades: mod.grades,
    checkpoints: checkpoints.map((cp) => ({
      id: cp.slug,
      label: cp.label,
      video: cp.video_url,
      text: cp.body_text,
      challenge: cp.challenge ?? {},
    })),
  };
}

export function getSection(sectionsMap, pageKey, sectionKey, fallback = {}) {
  const remote = sectionsMap?.[pageKey]?.[sectionKey];
  if (remote == null) return fallback;
  return normalizeSectionPayload(pageKey, sectionKey, { ...fallback, ...remote });
}
