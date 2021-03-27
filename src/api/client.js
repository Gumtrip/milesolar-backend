import request from '@/utils/request'

export function fetchClients(query) {
  return request({
    url: 'admin/clients',
    method: 'get',
    params: query
  })
}

export function fetchClient(id, params) {
  return request({
    url: 'admin/clients/' + id,
    method: 'get',
    params: { params }
  })
}

export function createClient(data) {
  return request({
    url: 'admin/clients',
    method: 'post',
    data: data
  })
}

export function updateClient(id, data) {
  return request({
    url: 'admin/clients/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteClient(id) {
  return request({
    url: 'admin/clients/' + id,
    method: 'delete'
  })
}

