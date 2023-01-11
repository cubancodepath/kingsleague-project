export const findPresidentById = async (id) => {
  try {
    const response = await fetch(
      `https://api.kingsleague.bjvalmaseda.com/presidents/${id}`
    )
    const president = await response.json()
    return president
  } catch (e) {
    // send error to log services
    return null
  }
}
