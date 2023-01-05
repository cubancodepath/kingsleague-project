import path from 'node:path'
import { writeFile } from 'node:fs/promises'

const DB_PATH = path.join(process.cwd(), './db')

export function writeDBFile(dbName, data) {
  return writeFile(
    `${DB_PATH}/${dbName}.json`,
    JSON.stringify(data, null, 2),
    'utf-8',
  )
}
