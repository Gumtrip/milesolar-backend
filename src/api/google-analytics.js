import request from '@/utils/request'
const baseURL = 'https://milesolar.com/api/v1/'
export function fetchVisitorsAndPageViews(query) {
  return request({
    baseURL: baseURL,
    url: 'admin/google/visitors-and-page-views',
    method: 'get',
    params: query
  })
}
