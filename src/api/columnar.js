import request from '@/utils/request'

export function fetchSales(params) { // 显示套餐销售额
  return request({
    url: '/columnar/list',
    method: 'get',
    params: params
  })
}
