import request from '@/utils/request'

export function uploadImages(data) {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: 'image',
    method: 'post',
    data: data
  })
}
