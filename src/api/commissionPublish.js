import request from '@/utils/request'

export function getUserListPag(params) {
  return request({
    url: '/commissionPublish/listpage',
    method: 'get',
    params: params
  })
}
export function removeUse(params) {
  return request({
    url: '/commissionPublish/remove',
    method: 'get',
    params: params
  })
}
export function batchRemoveUse(params) {
  return request({
    url: '/commissionPublish/batchremove',
    method: 'get',
    params: params
  })
}
export function editUse(params) {
  return request({
    url: '/commissionPublish/edit',
    method: 'get',
    params: params
  })
}
export function addUse(params) {
  return request({
    url: '/commissionPublish/add',
    method: 'get',
    params: params
  })
}
