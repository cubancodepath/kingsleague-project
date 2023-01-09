export const getAllTeams = async () => {
  try {
    const response = await fetch(
      'https://api.kingsleague.bjvalmaseda.com/teams'
    )
    const teams = await response.json()
    return teams
  } catch (e) {
    // send error to log services
    return []
  }
}
