import { unstable_dev as unstableDev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

const setup = async () => {
  const worker = await unstableDev(
    'api/index.js',
    {},
    { disableExperimentalWarning: true }
  )
  return worker
}

const teardown = async (worker) => {
  await worker.stop()
}

describe('Testing /', () => {
  let worker
  beforeAll(async () => {
    worker = await setup()
  })
  afterAll(async () => {
    await teardown(worker)
  })
  it('should have endpoint and description', async () => {
    const res = await worker.fetch()
    expect(res).toBeDefined()

    const apiRoutes = await res.json()
    apiRoutes.forEach((endpoint) => {
      expect(endpoint).toHaveProperty('endpoint')
      expect(endpoint).toHaveProperty('description')
    })
  })
})
