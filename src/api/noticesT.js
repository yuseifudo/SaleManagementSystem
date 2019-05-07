/*
* 作者：杨昌海
* 时间：2019.05.06
* 功能：公告信息API文件
*
* */
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