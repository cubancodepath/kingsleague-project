import * as cheerio from 'cheerio'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/',
}

async function scrape(url) {
  const options = {
    method: 'GET',
    timeout: 5000,
  }
  const request = new Request(
    `https://webcache.googleusercontent.com/search?q=cache:${url}`,
    options,
  )
  const res = await fetch(request)
  const html = await res.text()
  return cheerio.load(html)
}

async function getLeaderBoard() {
  const $ = await scrape(URLS.leaderboard)
  const $row = $('table tbody tr')

  const LEADERBOARD_SELECTORS = {
    team: {
      selector: '.fs-table-text_3',
      typeOf: 'string',
    },
    wins: {
      selector: '.fs-table-text_4',
      typeOf: 'number',
    },
    loses: {
      selector: '.fs-table-text_5',
      typeOf: 'number',
    },
    scoredGoals: {
      selector: '.fs-table-text_6',
      typeOf: 'number',
    },
    concededGoals: {
      selector: '.fs-table-text_7',
      typeOf: 'number',
    },
    yellowCards: {
      selector: '.fs-table-text_8',
      typeOf: 'number',
    },
    redCards: {
      selector: '.fs-table-text_9',
      typeOf: 'number',
    },
  }

  const cleanText = text =>
    text
      .replace(/\t|\n|\s:/g, '')
      .replace(/.*:/g, ' ')
      .trim()

  const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS)

  let leaderboard = []
  $row.each((_, el) => {
    const leaderBoardEntries = leaderBoardSelectorEntries.map(
      ([key, { selector, typeOf }]) => {
        const rowValue = $(el).find(selector).text()
        const cleanValue = cleanText(rowValue)

        const value = typeOf === 'number' ? Number(cleanValue) : cleanValue

        return [key, value]
      },
    )

    leaderboard.push(Object.fromEntries(leaderBoardEntries))
  })
  return leaderboard
}

const leaderboard = await getLeaderBoard()
const filePath = path.join(process.cwd(), './db/leaderboard.json')

await writeFile(filePath, JSON.stringify(leaderboard, null, 2), 'utf-8')
