import request from '@/utils/request'

export function getAdminListPage(params) {
  return request({
    url: 'http://localhost:8080/manager/list',
    method: 'get',
    params: params
  })
}
export function removeAdmin(params) {
  return request({
    url: 'http://localhost:8080/manager/delete',
    method: 'delete',
    params: params
  })
}
export function batchRemoveAdmin(params) {
  return request({
    url: 'http://localhost:8080/manager/deleteAll',
    method: 'delete',
    params: params
  })
}
export function editAdmin(params) {
  return request({
    url: 'http://localhost:8080/manager/update',
    method: 'put',
    data: params
  })
}
export function addAdmin(params) {
  return request({
    url: 'http://localhost:8080/manager/add',
    method: 'post',
    data: params
  })
}
