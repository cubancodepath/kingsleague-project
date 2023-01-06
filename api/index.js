import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import presidents from '../db/presidents.json'
import teams from '../db/teams.json'
import topScorer from '../db/top_scorer.json'
import mvp from '../db/mvp.json'

const app = new Hono()

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns Kings League leaderboard '
    },
    {
      endpoint: '/teams',
      description: 'Returns Kings League teams '
    },
    {
      endpoint: '/presidents',
      description: 'Returns Kings League presidents '
    },
    {
      endpoint: '/top-scorer',
      description: 'Returns Kings League Top Scorer'
    },
    {
      endpoint: '/mvp',
      description: 'Returns Kings League MVPs '
    }
  ])
)

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard)
})

app.get('/presidents', (ctx) => {
  return ctx.json(presidents)
})

app.get('/presidents/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundPresident = presidents.find((president) => president.id === id)

  return foundPresident
    ? ctx.json(foundPresident)
    : ctx.json({ error: 'Not Found' }, 404)
})

app.get('/teams', (ctx) => {
  return ctx.json(teams)
})

app.get('/top-scorer', (ctx) => {
  return ctx.json(topScorer)
})

app.get('/mvp', (ctx) => {
  return ctx.json(mvp)
})

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((ctx) => {
  const { pathname } = new URL(ctx.req.url)

  if (ctx.req.url.at(-1) === '/') {
    return ctx.redirect(pathname.slice(0, -1))
  }

  return ctx.json({ message: 'Not Found' }, 404)
})

export default app
