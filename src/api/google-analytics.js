import request from '@/utils/request'

export function fetchVisitorsAndPageViews(query) {
  return request({
    url: 'admin/google/visitors-and-page-views',
    method: 'get',
    params: query
  })
}
