import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import qs from 'qs'
import { getToken } from '@/utils/auth'
import { dataTransform, errorMessage } from '@/utils/api-handle'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_ADMIN_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }

    if (config.method === 'get') { // 允许get 方法传递数组
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response.status.toString().indexOf('2') !== 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    // console.log('err' + error) // for debug
    const data = dataTransform(error)
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误!'
          break
        case 401:
          error.message = data.message
          break
        case 403:
          error.message = '拒绝访问!'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}!`
          break
        case 405:
          error.message = '所请求的 HTTP 方法不允许当前认证用户访问!'
          break
        case 408:
          error.message = '请求超时!'
          break
        case 410:
          error.message = '当前请求的资源不再可用!'
          break
        case 415:
          error.message = ' 请求中的内容类型是错误的!'
          break
        case 422:
          error.message = errorMessage(data)
          break
        case 429:
          error.message = '请求频次达到上限,拒绝访问!'
          break
        case 500:
          error.message = errorMessage(data)
          break
        case 501:
          error.message = '服务未实现!'
          break
        case 502:
          error.message = '网关错误!'
          break
        case 503:
          error.message = '服务不可用!'
          break
        case 504:
          error.message = '网关超时!'
          break
        case 505:
          error.message = 'HTTP版本不受支持!'
          break
        default:
      }
    }

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
