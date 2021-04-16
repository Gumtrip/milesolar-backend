import request from '@/utils/request'

export function fetchClients(query) {
  return request({
    url: 'clients',
    method: 'get',
    params: query
  })
}

export function fetchClient(id, params) {
  return request({
    url: 'clients/' + id,
    method: 'get',
    params: { params }
  })
}

export function createClient(data) {
  return request({
    url: 'clients',
    method: 'post',
    data: data
  })
}

export function updateClient(id, data) {
  return request({
    url: 'clients/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteClient(id) {
  return request({
    url: 'clients/' + id,
    method: 'delete'
  })
}

