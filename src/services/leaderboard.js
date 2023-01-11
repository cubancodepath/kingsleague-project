import { apiUrl } from './config.js'

export const findLeaderboardByTeamId = async ({ teamId }) => {
  try {
    const response = await fetch(`${apiUrl}/${teamId}`)
    const teamStats = await response.json()
    return teamStats
  } catch (e) {
    // send error to log services
    return null
  }
}
