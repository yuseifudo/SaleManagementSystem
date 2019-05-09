//功能：套餐佣金规则
//作者：吴丽娟
// 日期：2019/5/7

import request from '@/utils/request'

export function getTaocanList(params) {
  return request({
    url: '/taocanList/list',
    method: 'get',
    params: params
  })
}
export function removeTaocan(params) {
  return request({
    url: '/taocanList/remove',
    method: 'get',
    params: params
  })
}
export function batchRemove(params) {
  return request({
    url: '/taocanList/batchremove',
    method: 'get',
    params: params
  })
}
export function editTaocan(params) {
  return request({
    url: '/taocanList/edit',
    method: 'get',
    params: params
  })
}
export function addTaocan(params) {
  return request({
    url: '/taocanList/add',
    method: 'get',
    params: params
  })
}


