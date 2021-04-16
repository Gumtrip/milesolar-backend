import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'auth/authorization',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'auth/authorization',
    method: 'delete'
  })
}

export function refreshToken(data) {
  return request({
    url: 'auth/authorization',
    method: 'PUT',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: 'admin/me',
    method: 'post',
    params: { token }
  })
}

