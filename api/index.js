import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import presidents from '../db/presidents.json'
import teams from '../db/teams.json'
import topScorer from '../db/top_scorer.json'
import topAssistant from '../db/top_assistant.json'
import mvp from '../db/mvp.json'
import playersTwelve from '../db/players_twelve.json'
import schedule from '../db/schedule.json'

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
      endpoint: '/leaderboard/:teamId',
      description: 'Returns Kings League leaderboard info from teamId '
    },
    {
      endpoint: '/presidents',
      description: 'Returns Kings League presidents '
    },
    {
      endpoint: '/schedule',
      description: 'Returns Kings League schedule information'
    },
    {
      endpoint: '/presidents/:id',
      description: 'Returns Kings League a president ',
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    },
    {
      endpoint: '/top-scorer',
      description: 'Returns Kings League Top Scorer'
    },
    {
      endpoint: '/top-assistant',
      description: 'Returns Kings League Top Assistant'
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

app.get('/leaderboard/:teamId', (ctx) => {
  const teamId = ctx.req.param('teamId')

  const foundTeam = leaderboard.find((stat) => stat.team.id === teamId)
  return foundTeam ? ctx.json(foundTeam) : ctx.json({ error: 'Not Found' }, 404)
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

app.get('/teams/:id/player-12', (ctx) => {
  const id = ctx.req.param('id')

  const foundPlayerTwelve = playersTwelve.find(
    (player) => player.team.id === id
  )

  return foundPlayerTwelve
    ? ctx.json(foundPlayerTwelve)
    : ctx.json({ error: 'Not Found' }, 404)
})

app.get('/player-12', (ctx) => {
  return ctx.json(playersTwelve)
})

app.get('/top-scorer', (ctx) => {
  return ctx.json(topScorer)
})

app.get('/top-assistant', (ctx) => {
  return ctx.json(topAssistant)
})

app.get('/mvp', (ctx) => {
  return ctx.json(mvp)
})

app.get('/schedule', (ctx) => {
  return ctx.json(schedule)
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
