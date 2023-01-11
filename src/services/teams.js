import { apiUrl } from './config'

export const getAllTeams = async () => {
  try {
    const response = await fetch(`${apiUrl}/teams`)
    const teams = await response.json()
    return teams
  } catch (e) {
    // send error to log services
    return []
  }
}

export const getPlayerTwelveFor = async ({ teamId }) => {
  try {
    const response = await fetch(`${apiUrl}/teams/${teamId}/player-12`)
    const player = await response.json()
    return player
  } catch (e) {
    // send error to log services
    return []
  }
}
