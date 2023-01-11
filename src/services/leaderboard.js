export const findLeaderboardByTeamId = async ({ teamId }) => {
  try {
    const response = await fetch(
      `https://api.kingsleague.bjvalmaseda.com/leaderboard/${teamId}`
    )
    const teamStats = await response.json()
    return teamStats
  } catch (e) {
    // send error to log services
    return null
  }
}
