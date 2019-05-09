/*
* 作者：王震
* 时间：2019.05.06
* 功能：奖励规则API文件
*
* */
import request from '@/utils/request'

export function getAwardListPage(params) {
  return request({
    url: '/award/listpage',
    method: 'get',
    params: params
  })
}
export function removeAward(params) {
  return request({
    url: '/award/remove',
    method: 'get',
    params: params
  })
}
export function batchRemoveAward(params) {
  return request({
    url: '/award/batchremove',
    method: 'get',
    params: params
  })
}
export function editAward(params) {
  return request({
    url: '/award/edit',
    method: 'get',
    params: params
  })
}
export function addAward(params) {
  return request({
    url: '/award/add',
    method: 'get',
    params: params
  })
}
