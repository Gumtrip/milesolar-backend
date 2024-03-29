import request from '@/utils/request'

export function fetchArticles(query) {
  return request({
    url: 'articles',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id, params) {
  return request({
    url: 'articles/' + id,
    method: 'get',
    params: { params }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: 'articles',
    method: 'post',
    data: data
  })
}

export function updateArticle(id, data) {
  return request({
    url: 'articles/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteArticle(id) {
  return request({
    url: 'articles/' + id,
    method: 'delete'
  })
}

export function fetchArticleCategories(params) {
  return request({
    url: 'article_categories',
    method: 'get',
    params: params
  })
}

export function fetchArticleCategory(id, params) {
  return request({
    url: 'article_categories/' + id,
    method: 'get',
    params: params
  })
}

export function createArticleCategory(data) {
  return request({
    url: 'article_categories',
    method: 'post',
    data: data
  })
}

export function updateArticleCategory(id, data) {
  return request({
    url: 'article_categories/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteArticleCategory(id) {
  return request({
    url: 'article_categories/' + id,
    method: 'delete'
  })
}
