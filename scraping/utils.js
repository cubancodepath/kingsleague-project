import * as cheerio from 'cheerio'
import { getLeaderboard } from './leaderboard.js'
import { writeDBFile } from '../db/index.js'
import { logError, logInfo, logSuccess } from './log.js'
import { getMvpList } from './mvp.js'
import { getTopScorer } from './top_scorer.js'
import { getAssists } from './top_assists.js'
import { getPlayersTwelve } from './players_twelve.js'
import { getSchedule } from './schedule.js'

export const SCRAPINGS = {
  leaderboard: {
    url: 'https://kingsleague.pro/estadisticas/clasificacion/',
    scraper: getLeaderboard
  },
  mvp: {
    url: 'https://kingsleague.pro/estadisticas/mvp/',
    scraper: getMvpList
  },
  top_scorer: {
    url: 'https://kingsleague.pro/estadisticas/goles/',
    scraper: getTopScorer
  },
  players_twelve: {
    url: 'https://kingsleague.pro/jugador-12/',
    scraper: getPlayersTwelve
  },
  top_assistant: {
    url: 'https://kingsleague.pro/estadisticas/asistencias/',
    scraper: getAssists
  },
  schedule: {
    url: 'https://kingsleague.pro/calendario/',
    scraper: getSchedule
  }
  // coaches: {
  // 	url: 'https://es.besoccer.com/competicion/info/kings-league/2023',
  // 	scraper: getCoaches
  // }
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
