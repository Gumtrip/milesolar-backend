import request from '@/utils/request'
// 订单-列表
export function fetchOrders(query) {
  return request({
    url: 'admin/orders',
    method: 'get',
    params: query
  })
}
// 订单-详情

export function fetchOrder(id, params) {
  return request({
    url: 'admin/orders/' + id,
    method: 'get',
    params: params
  })
}
// 订单-创建

export function createOrder(data) {
  return request({
    url: 'admin/orders',
    method: 'post',
    data: data
  })
}
// 订单-更新

export function updateOrder(id, data) {
  return request({
    url: 'admin/orders/' + id,
    method: 'patch',
    data: data
  })
}
// 订单-删除

export function deleteOrder(id) {
  return request({
    url: 'admin/orders/' + id,
    method: 'delete'
  })
}

// 订单支出-列表
export function fetchOrderExpenses(query) {
  return request({
    url: 'admin/order-expenses',
    method: 'get',
    params: query
  })
}
// 订单支出-详情
export function fetchOrderExpense(id, params) {
  return request({
    url: 'admin/order-expenses/' + id,
    method: 'get',
    params: params
  })
}
// 订单支出-创建
export function createOrderExpense(data) {
  return request({
    url: 'admin/order-expenses',
    method: 'post',
    data: data
  })
}
// 订单支出-更新
export function updateOrderExpense(id, data) {
  return request({
    url: 'admin/order-expenses/' + id,
    method: 'patch',
    data: data
  })
}
// 订单支出-删除
export function deleteOrderExpense(id) {
  return request({
    url: 'admin/order-expenses/' + id,
    method: 'delete'
  })
}

// 订单收款-列表
export function fetchOrderProceeds(query) {
  return request({
    url: 'admin/order-proceeds',
    method: 'get',
    params: query
  })
}
// 订单收款-详情
export function fetchOrderProceed(id, params) {
  return request({
    url: 'admin/order-proceeds/' + id,
    method: 'get',
    params: params
  })
}
// 订单收款-创建
export function createOrderProceed(data) {
  return request({
    url: 'admin/order-proceeds',
    method: 'post',
    data: data
  })
}
// 订单收款-更新
export function updateOrderProceed(id, data) {
  return request({
    url: 'admin/order-proceeds/' + id,
    method: 'patch',
    data: data
  })
}
// 订单收款-删除
export function deleteOrderProceed(id) {
  return request({
    url: 'admin/order-proceeds/' + id,
    method: 'delete'
  })
}

// 订单报价-列表
export function fetchOrderOffers(query) {
  return request({
    url: 'admin/order-offers',
    method: 'get',
    params: query
  })
}
// 订单报价-详情

export function fetchOrderOffer(id, params) {
  return request({
    url: 'admin/order-offers/' + id,
    method: 'get',
    params: params
  })
}
// 订单报价-创建

export function createOrderOffer(data) {
  return request({
    url: 'admin/order-offers',
    method: 'post',
    data: data
  })
}
// 订单报价-删除
export function deleteOrderOffer(id) {
  return request({
    url: 'admin/order-offers/' + id,
    method: 'delete'
  })
}
// 订单-更新

export function updateOrderOffer(id, data) {
  return request({
    url: 'admin/order-offers/' + id,
    method: 'patch',
    data: data
  })
}
