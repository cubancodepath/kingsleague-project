import { apiUrl } from './config.js'

export const getTopScorers = async () => {
  try {
    const response = await fetch(`${apiUrl}/top-scorers`)
    const topScores = await response.json()
    return topScores
  } catch (e) {
    // send error to log services
    return null
  }
}
export const getTopAssistant = async () => {
  try {
    const response = await fetch(`${apiUrl}/top-assistant`)
    const topAssistant = await response.json()
    return topAssistant
  } catch (e) {
    // send error to log services
    return null
  }
}
export const getMVPs = async () => {
  try {
    const response = await fetch(`${apiUrl}/mpvs`)
    const mvps = await response.json()
    return mvps
  } catch (e) {
    // send error to log services
    return null
  }
}

export const getTopStatistics = async () => {
  try {
    const response = await fetch(`${apiUrl}/top-statistics`)
    const topStatistics = await response.json()
    return topStatistics
  } catch (e) {
    // send error to log services
    return null
  }
}
