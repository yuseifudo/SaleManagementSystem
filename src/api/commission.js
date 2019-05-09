import request from '@/utils/request'

export function getUserListPag(params) {
  return request({
    url: '/commission/listpage',
    method: 'get',
    params: params
  })
}
export function removeUse(params) {
  return request({
    url: '/commission/remove',
    method: 'get',
    params: params
  })
}
export function batchRemoveUse(params) {
  return request({
    url: '/commission/batchremove',
    method: 'get',
    params: params
  })
}
export function editUse(params) {
  return request({
    url: '/commission/edit',
    method: 'get',
    params: params
  })
}
export function addUse(params) {
  return request({
    url: '/commission/add',
    method: 'get',
    params: params
  })
}
