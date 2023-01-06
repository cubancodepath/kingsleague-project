import * as cheerio from 'cheerio'
import { getLeaderboard } from './leaderboard.js'
import { writeDBFile } from '../db/index.js'
import { logError, logInfo, logSuccess } from './log.js'
import { getMvpList } from './mvp.js'

export const SCRAPINGS = {
  leaderboard: {
    url: 'https://kingsleague.pro/estadisticas/clasificacion/',
    scraper: getLeaderboard
  },
  mvp: {
    url: 'https://kingsleague.pro/estadisticas/mvp/',
    scraper: getMvpList
  }
}

export function cleanText(text) {
  return text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, ' ')
    .trim()
}

export async function scrape(url) {
  const request = new Request(url, { timeout: 5000 })
  const res = await fetch(request)
  const html = await res.text()
  return cheerio.load(html)
}

export async function scraperAndSave(name) {
  const start = performance.now()
  const { scraper, url } = SCRAPINGS[name]
  try {
    logInfo(`Scraping [${name}]...`)
    const $ = await scrape(url)
    const content = await scraper($)
    logSuccess(`[${name}] scraped successfully`)

    logInfo(`Writing [${name}] to database...`)
    await writeDBFile(name, content)
    logSuccess(`[${name}] written successfully`)
  } catch (e) {
    logError(`Error scrapping [${name}]`)
    logError(e)
  } finally {
    const end = performance.now()
    const time = end - start / 1000
    logInfo(`Scraping [${name}] took ${time} seconds`)
  }
}