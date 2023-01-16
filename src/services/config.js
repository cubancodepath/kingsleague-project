export const isDevelopment = import.meta.env.MODE !== 'production'

export const apiUrl = isDevelopment
  ? 'http://127.0.0.1:8787'
  : 'https://api.kingsleague.bjvalmaseda.com'
