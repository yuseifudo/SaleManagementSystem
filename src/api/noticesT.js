/*
* 作者：杨昌海
* 时间：2019.05.06
* 功能：公告信息API文件
*
* */
import request from '@/utils/request'

export function getNoticeListPage(params) {
  return request({
    url: 'http://localhost:8080/notice/list',
    method: 'get',
    params: params
  })
}
export function removeNotice(params) {
  return request({
    url: 'http://localhost:8080/notice/remove',
    method: 'delete',
    params: params
  })
}
export function batchRemoveNotice(params) {
  return request({
    url: 'http://localhost:8080/notice/batchremove',
    method: 'delete',
    params: params
  })
}
export function editNotice(params) {
  return request({
    url: 'http://localhost:8080/notice/edit',
    method: 'put',
    params: params
  })
}
export function addNotice(params) {
  return request({
    url: 'http://localhost:8080/notice/add',
    method: 'post',
    data: params
  })
}
