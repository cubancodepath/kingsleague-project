import { SCRAPINGS, scraperAndSave } from './utils.js'

for (const infoToScraper of Object.keys(SCRAPINGS)) {
  await scraperAndSave(infoToScraper)
}
