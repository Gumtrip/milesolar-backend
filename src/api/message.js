import request from '@/utils/request'

export function fetchMessages(query) {
  return request({
    url: 'messages',
    method: 'get',
    params: query
  })
}

export function fetchMessage(id, params) {
  return request({
    url: 'messages/' + id,
    method: 'get',
    params: params
  })
}

