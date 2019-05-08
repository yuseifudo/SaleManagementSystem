import request from '@/utils/request'

export function getSaleList(params) {
  return request({
    url: '/sale/list',
    method: 'get',
    params: params
  })
}
