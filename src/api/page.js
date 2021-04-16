import request from '@/utils/request'

export function fetchPages(query) {
  return request({
    url: 'pages',
    method: 'get',
    params: query
  })
}

export function fetchPage(id, params) {
  return request({
    url: 'pages/' + id,
    method: 'get',
    params: params
  })
}

export function createPage(data) {
  return request({
    url: 'pages',
    method: 'post',
    data: data
  })
}

export function updatePage(id, data) {
  return request({
    url: 'pages/' + id,
    method: 'patch',
    data: data
  })
}
export function deletePage(id) {
  return request({
    url: 'pages/' + id,
    method: 'delete'
  })
}
