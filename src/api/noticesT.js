import request from '@/utils/request'

export function getNoticeListPage(params) {
  return request({
    url: '/notice/listpage',
    method: 'get',
    params: params
  })
}
export function removeNotice(params) {
  return request({
    url: '/notice/remove',
    method: 'get',
    params: params
  })
}
export function batchRemoveNotice(params) {
  return request({
    url: '/notice/batchremove',
    method: 'get',
    params: params
  })
}
export function editNotice(params) {
  return request({
    url: '/notice/edit',
    method: 'get',
    params: params
  })
}
export function addNotice(params) {
  return request({
    url: '/notice/add',
    method: 'get',
    params: params
  })
}
