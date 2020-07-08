import request from '@/utils/request'

export function fetchSettings(query) {
  return request({
    url: 'admin/settings',
    method: 'get',
    params: query
  })
}

export function fetchSetting(id, params) {
  return request({
    url: 'admin/settings/' + id,
    method: 'get',
    params: { params }
  })
}

export function createSetting(data) {
  return request({
    url: 'admin/settings',
    method: 'post',
    data: data
  })
}

export function updateSetting(id, data) {
  return request({
    url: 'admin/settings/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteSetting(id) {
  return request({
    url: 'admin/settings/' + id,
    method: 'delete'
  })
}

export function fetchSettingCategories(params) {
  return request({
    url: 'admin/setting-categories',
    method: 'get',
    params: params
  })
}

export function fetchSettingCategory(id, params) {
  return request({
    url: 'admin/setting-categories/' + id,
    method: 'get',
    params: params
  })
}

export function createSettingCategory(data) {
  return request({
    url: 'admin/setting-categories',
    method: 'post',
    data: data
  })
}

export function updateSettingCategory(id, data) {
  return request({
    url: 'admin/setting-categories/' + id,
    method: 'patch',
    data: data
  })
}
export function deleteSettingCategory(id) {
  return request({
    url: 'admin/setting-categories/' + id,
    method: 'delete'
  })
}
