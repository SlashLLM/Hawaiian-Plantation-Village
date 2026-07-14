import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { getPayload } from 'payload'

import { fallbackEvents } from '../src/data/fallback/events.js'
import { fallbackNews } from '../src/data/fallback/news.js'
import { fallbackStories } from '../src/data/fallback/stories.js'
import { CURRICULUM_MODULES } from '../src/data/curriculumModules.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../cms/.env') })
dotenv.config({ path: path.resolve(__dirname, '../.env') })

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseDisplayDate(displayDate) {
  const currentYear = new Date().getFullYear()
  const parsed = new Date(`${displayDate} ${currentYear}`)
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString()
  return parsed.toISOString()
}

function parseNewsDate(dateStr) {
  const parsed = new Date(dateStr)
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString()
  return parsed.toISOString()
}

function mapCurriculumModule(module) {
  return {
    gradeLevel: module.id,
    title: module.title,
    grades: module.grades,
    checkpoints: module.checkpoints.map((checkpoint) => ({
      checkpointId: checkpoint.id,
      label: checkpoint.label,
      videoUrl: checkpoint.video,
      text: checkpoint.text,
      challengeType: checkpoint.challenge.type,
      quizQuestion: checkpoint.challenge.question ?? null,
      quizChoices: checkpoint.challenge.choices?.map((choice) => ({ choice })) ?? [],
      correctIndex: checkpoint.challenge.correctIndex ?? null,
      feedbackCorrect: checkpoint.challenge.feedback?.correct ?? null,
      feedbackIncorrect: checkpoint.challenge.feedback?.incorrect ?? null,
      gameId: checkpoint.challenge.gameId ?? null,
    })),
  }
}

async function upsertByField(payload, collection, field, value, data) {
  const existing = await payload.find({
    collection,
    where: { [field]: { equals: value } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection,
      id: existing.docs[0].id,
      data,
    })
    return existing.docs[0].id
  }

  const created = await payload.create({ collection, data })
  return created.id
}

async function seed() {
  const { default: config } = await import('../cms/src/payload.config.ts')
  const payload = await getPayload({ config })

  console.log('Seeding events...')
  for (const event of fallbackEvents) {
    await upsertByField(payload, 'events', 'title', event.title, {
      title: event.title,
      eventDate: parseDisplayDate(event.date),
      displayDate: event.date,
      time: event.time,
      description: event.desc,
      _status: 'published',
    })
  }

  console.log('Seeding news...')
  for (const article of fallbackNews) {
    await upsertByField(payload, 'news', 'slug', slugify(article.title), {
      title: article.title,
      slug: slugify(article.title),
      publishedDate: parseNewsDate(article.date),
      category: article.category,
      summary: article.summary,
      content: article.content,
      externalImageUrl: article.image,
      _status: 'published',
    })
  }

  console.log('Seeding immigration stories...')
  let sortOrder = 0
  for (const story of fallbackStories) {
    await upsertByField(payload, 'immigration-stories', 'slug', story.id, {
      slug: story.id,
      culture: story.culture,
      title: story.title,
      arrivalYear: story.arrival,
      shortDesc: story.shortDesc,
      fullHistory: story.fullHistory,
      oralHistory: story.oralHistory,
      sortOrder: sortOrder++,
    })
  }

  console.log('Seeding curriculum modules...')
  for (const module of Object.values(CURRICULUM_MODULES)) {
    await upsertByField(payload, 'curriculum-modules', 'gradeLevel', module.id, mapCurriculumModule(module))
  }

  console.log('Seeding site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      hours: {
        weekday: 'Tuesday – Saturday: 9:00 AM – 2:00 PM',
        tours: 'Guided tours at 10:00 AM & 12:00 PM',
      },
      location: {
        address: '94-695 Waipahu Street',
        city: "Waipahu, Oʻahu (Free parking onsite)",
      },
      contact: {
        phone: '(808) 677-0110',
        email: 'info@hawaiianplantationvillage.org',
      },
    },
  })

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
