import { apiUrl } from './config.js'

export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${apiUrl}/leaderboard`)
    const teamStats = await response.json()
    return teamStats
  } catch (e) {
    // send error to log services
    return null
  }
}

export const findLeaderboardByTeamId = async ({ teamId }) => {
  try {
    const response = await fetch(`${apiUrl}/leaderboard/${teamId}`)
    const teamStats = await response.json()
    return teamStats
  } catch (e) {
    // send error to log services
    return null
  }
}
