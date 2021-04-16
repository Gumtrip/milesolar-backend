import request from '@/utils/request'
const baseURL = 'https://milesolar.com/api/v1/'
// 统计每日访问量最高的页面
export function fetchVisitorsAndPageViews(query) {
  return request({
    baseURL: baseURL,
    url: 'google/visitors-and-page-views',
    method: 'get',
    params: query
  })
}
// 网站访问量统计
export function fetchTotalVisitorsAndPageViews(query) {
  return request({
    baseURL: baseURL,
    url: 'google/total-visitors-and-page-views',
    method: 'get',
    params: query
  })
}
// 统计一定时间内页面最多访问量的页面
export function fetchMostVisitedPages(query) {
  return request({
    baseURL: baseURL,
    url: 'google/most-visited-pages',
    method: 'get',
    params: query
  })
}
// 来源
export function fetchTopReferrers(query) {
  return request({
    baseURL: baseURL,
    url: 'google/top-referrers',
    method: 'get',
    params: query
  })
}
// 统计用户类型
export function fetchUserTypes(query) {
  return request({
    baseURL: baseURL,
    url: 'google/user-types',
    method: 'get',
    params: query
  })
}
// 统计浏览器类型
export function fetchTopBrowsers(query) {
  return request({
    baseURL: baseURL,
    url: 'google/top-browsers',
    method: 'get',
    params: query
  })
}
