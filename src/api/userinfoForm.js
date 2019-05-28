import request from '@/utils/request'
// import axios from '@/utils/request'

export function getUser(params) {
  return request({
    url: 'http://localhost:8080/personal/getInfo',
    method: 'get',
    params: params
  })
}

export function submitForm(params) {
  return request({
    url: 'http://localhost:8080/personal/putInfo',
    method: 'post',
    data: params
  })
}
