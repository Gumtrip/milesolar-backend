import request from '@/utils/request'

export function fetchProducts(query) {
  return request({
    url: 'admin/products',
    method: 'get',
    params: query
  })
}

export function fetchProduct(id, params) {
  return request({
    url: 'admin/products/' + id,
    method: 'get',
    params: { params }
  })
}

export function createProduct(data) {
  return request({
    url: 'admin/products',
    method: 'post',
    data: data
  })
}

export function updateProduct(id, data) {
  return request({
    url: 'admin/products/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteProduct(id) {
  return request({
    url: 'admin/products/' + id,
    method: 'delete'
  })
}

export function fetchProductCategories(params) {
  return request({
    url: 'admin/product_categories',
    method: 'get',
    params: params
  })
}

export function fetchProductCategory(id, params) {
  return request({
    url: 'admin/product_categories/' + id,
    method: 'get',
    params: params
  })
}

export function createProductCategory(data) {
  return request({
    url: 'admin/product_categories',
    method: 'post',
    data: data
  })
}

export function updateProductCategory(id, data) {
  return request({
    url: 'admin/product_categories/' + id,
    method: 'patch',
    data: data
  })
}
