import TEAMS from '../db/teams.json' assert { type: 'json' }

export async function getURLTeams($) {
  return TEAMS.map((team) => {
    return {
      ...team,
      url: `https://kingsleague.pro/team/${team.id}/`
    }
  })
}
