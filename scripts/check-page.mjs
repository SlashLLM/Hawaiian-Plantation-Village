import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

const logs = []
const errors = []

page.on('console', (msg) => logs.push(`[${msg.type()}] ${msg.text()}`))
page.on('pageerror', (err) => errors.push(`PAGEERROR: ${err.message}`))
page.on('requestfailed', (req) => errors.push(`REQUESTFAILED: ${req.url()} ${req.failure()?.errorText}`))

try {
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(3000)

  const rootHtml = await page.locator('#root').innerHTML()
  const rootText = await page.locator('#root').innerText().catch(() => '')
  const title = await page.title()

  console.log('TITLE:', title)
  console.log('ROOT_CHILDREN_LENGTH:', rootHtml.length)
  console.log('ROOT_TEXT_PREVIEW:', rootText.slice(0, 200).replace(/\s+/g, ' '))
  console.log('--- CONSOLE ---')
  logs.slice(0, 30).forEach((line) => console.log(line))
  console.log('--- ERRORS ---')
  errors.forEach((line) => console.log(line))
} catch (error) {
  console.error('NAVIGATION_FAILED:', error.message)
  errors.forEach((line) => console.log(line))
} finally {
  await browser.close()
}
