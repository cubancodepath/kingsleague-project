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

export const getPlayersTwelveFor = async ({ teamId }) => {
  try {
    const response = await fetch(`${apiUrl}/teams/${teamId}/players-12`)
    const players = await response.json()
    return players
  } catch (e) {
    // send error to log services
    return []
  }
}
