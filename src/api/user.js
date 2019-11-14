import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'admin/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'admin/admin/info',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'admin/auth/logout',
    method: 'delete'
  })
}

export function refreshToken(data) {
  return request({
    url: 'admin/auth/refreshToken',
    method: 'PUT',
    data: data
  })
}
