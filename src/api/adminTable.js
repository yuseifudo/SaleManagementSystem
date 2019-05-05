import request from '@/utils/request'

export function getAdminListPage(params) {
  return request({
    url: '/admin/listpage',
    method: 'get',
    params: params
  })
}
export function removeAdmin(params) {
  return request({
    url: '/admin/remove',
    method: 'get',
    params: params
  })
}
export function batchRemoveAdmin(params) {
  return request({
    url: '/admin/batchremove',
    method: 'get',
    params: params
  })
}
export function editAdmin(params) {
  return request({
    url: '/admin/edit',
    method: 'get',
    params: params
  })
}
export function addAdmin(params) {
  return request({
    url: '/admin/add',
    method: 'get',
    params: params
  })
}
