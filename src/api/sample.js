import request from '@/utils/request'

export function fetchSamples(query) {
  return request({
    url: 'samples',
    method: 'get',
    params: query
  })
}

export function fetchSample(id, params) {
  return request({
    url: 'samples/' + id,
    method: 'get',
    params: { params }
  })
}

export function createSample(data) {
  return request({
    url: 'samples',
    method: 'post',
    data: data
  })
}

export function updateSample(id, data) {
  return request({
    url: 'samples/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteSample(id) {
  return request({
    url: 'samples/' + id,
    method: 'delete'
  })
}

export function fetchSampleCategories(params) {
  return request({
    url: 'sample_categories',
    method: 'get',
    params: params
  })
}

export function fetchSampleCategory(id, params) {
  return request({
    url: 'sample_categories/' + id,
    method: 'get',
    params: params
  })
}

export function createSampleCategory(data) {
  return request({
    url: 'sample_categories',
    method: 'post',
    data: data
  })
}

export function updateSampleCategory(id, data) {
  return request({
    url: 'sample_categories/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteSampleCategory(id) {
  return request({
    url: 'sample_categories/' + id,
    method: 'delete'
  })
}
