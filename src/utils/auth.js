import ls from '@/utils/localStorage'
export function getToken() {
  return ls.getItem('token')
}

export function setToken(token) {
  token.token_expired_at = new Date().getTime() + (token.expires_in * 1000)
  const token_expired_time = new Date(token.token_expired_at)
  token.token_expired_time = token_expired_time.toLocaleDateString().replace(/\//g, '-') + ' ' + token_expired_time.toTimeString().substr(0, 8)
  ls.setItem('token', token)
}

export function removeToken() {
  return ls.setItem('token', null)
}
