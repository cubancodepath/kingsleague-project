export const isDevelopment = import.meta.NODE !== 'production'

export const apiUrl = isDevelopment
  ? 'http://127.0.0.1:8787'
  : 'https://api.kingsleague.bjvalmaseda.com'
