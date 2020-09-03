import request from '@/utils/request'

export function fetchOrders(query) {
  return request({
    url: 'admin/orders',
    method: 'get',
    params: query
  })
}

export function fetchOrder(id, params) {
  return request({
    url: 'admin/orders/' + id,
    method: 'get',
    params: { params }
  })
}

export function createOrder(data) {
  return request({
    url: 'admin/orders',
    method: 'post',
    data: data
  })
}

export function updateOrder(id, data) {
  return request({
    url: 'admin/orders/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteOrder(id) {
  return request({
    url: 'admin/orders/' + id,
    method: 'delete'
  })
}

