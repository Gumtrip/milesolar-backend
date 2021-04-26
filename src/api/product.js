import request from '@/utils/request'

export function fetchProducts(params) {
  return request({
    url: 'products',
    method: 'get',
    params: params
  })
}

export function fetchProduct(id, params) {
  return request({
    url: 'products/' + id,
    method: 'get',
    params: params
  })
}

export function createProduct(data) {
  return request({
    url: 'products',
    method: 'post',
    data: data
  })
}

export function updateProduct(id, data) {
  return request({
    url: 'products/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteProduct(id) {
  return request({
    url: 'products/' + id,
    method: 'delete'
  })
}

export function fetchProductCategories(params) {
  return request({
    url: 'product_categories',
    method: 'get',
    params: params
  })
}
export function fetchProductCategoryTrees(params) {
  return request({
    url: 'product_category_trees',
    method: 'get',
    params: params
  })
}

export function fetchProductCategory(id, params) {
  return request({
    url: 'product_categories/' + id,
    method: 'get',
    params: params
  })
}

export function createProductCategory(data) {
  return request({
    url: 'product_categories',
    method: 'post',
    data: data
  })
}

export function updateProductCategory(id, data) {
  return request({
    url: 'product_categories/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteProductCategory(id) {
  return request({
    url: 'product_categories/' + id,
    method: 'delete'
  })
}

//  产品属性
export function fetchProperties(params) {
  return request({
    url: 'properties',
    method: 'get',
    params: params
  })
}

export function fetchProperty(id, params) {
  return request({
    url: 'properties/' + id,
    method: 'get',
    params
  })
}

export function createProperty(data) {
  return request({
    url: 'properties',
    method: 'post',
    data
  })
}

export function updateProperty(id, data) {
  return request({
    url: 'properties/' + id,
    method: 'patch',
    data
  })
}
export function deleteProperty(id) {
  return request({
    url: 'properties/' + id,
    method: 'delete'
  })
}
//  产品属性分类
export function fetchPropertyCates(params) {
  return request({
    url: 'property-categories',
    method: 'get',
    params
  })
}

export function fetchPropertyCate(id, params) {
  return request({
    url: 'property-categories/' + id,
    method: 'get',
    params
  })
}

export function createPropertyCate(data) {
  return request({
    url: 'property-categories',
    method: 'post',
    data
  })
}

export function updatePropertyCate(id, data) {
  return request({
    url: 'property-categories/' + id,
    method: 'patch',
    data
  })
}
export function deletePropertyCate(id) {
  return request({
    url: 'property-categories/' + id,
    method: 'delete'
  })
}
// 为产品添加属性
export function createProductProperty(data) {
  return request({
    url: 'product-properties',
    method: 'post',
    data
  })
}
// 产品删除属性
export function deleteProductProperty(id) {
  return request({
    url: 'product-properties/' + id,
    method: 'delete'
  })
}
