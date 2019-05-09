//功能：销售人员列表对应的api文件
//作者：李娜容
// 日期：2019/5/6

import request from '@/utils/request'


export function removeSalesman(params) {
  return request({
    url: '/salesman/remove',
    method: 'get',
    params: params
  })
}
export function getSalesmanListPage(params) {
  return request({
    url: '/salesman/listpage',
    method: 'get',
    params: params
  })
}
export function batchRemoveSalesman(params) {
  return request({
    url: '/salesman/batchremove',
    method: 'get',
    params: params
  })
}
export function editSalesman(params) {
  return request({
    url: '/salesman/edit',
    method: 'get',
    params: params
  })
}
export function addSalesman(params) {
  return request({
    url: '/salesman/add',
    method: 'get',
    params: params
  })
}
export function getPieInfo(params) {
  return request({
    url: '/salesman/pie',
    method: 'get',
    params: params
  })
}
