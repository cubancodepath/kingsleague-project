import { readDBFile, TEAMS } from '../db/index.js'
const LIMIT_TOP = 5

const getLimitFrom = (array) => array.slice(0, LIMIT_TOP)

const [leaderboardDB, mvpDB, topScorersDB, topAssistsDB] = await Promise.all([
  readDBFile('leaderboard'),
  readDBFile('mvp'),
  readDBFile('top_scorers'),
  readDBFile('top_assistant'),
  readDBFile('players_twelve')
])

export function getTopStatistics() {
  const leaderboard = leaderboardDB.slice(0, 5).map((data) => {
    const { team, ...rest } = data
    const { id, name, image, coach, shortName } = team
    return {
      ...rest,
      team: {
        id,
        name,
        image,
        coach,
        shortName
      }
    }
  })

  const mvp = getLimitFrom(mvpDB).map(extractMoreData)
  const topScorers = getLimitFrom(topScorersDB).map(extractMoreData)
  const topAssistant = getLimitFrom(topAssistsDB).map(extractMoreData)

  return { leaderboard, mvp, topScorers, topAssistant }
}

function extractMoreData(player) {
  const { team: teamName } = player
  const team = TEAMS.find((team) => team.name === teamName)

  const { players, id: teamId } = team
  const playerImage = findPlayerImage({
    playerName: player.playerName,
    players
  })

  return {
    ...player,
    playerImage,
    teamId
  }
}

function findPlayerImage({ playerName, players }) {
  const player = players.find((player) => player.dorsalName === playerName)
  const playerImage = player?.image ? `${player.image}` : 'placeholder.png'

  // buscar player 12

  return playerImage
}
