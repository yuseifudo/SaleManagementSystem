import request from '@/utils/request'

export function fetchData(params) { // 显示套餐销售额
  return request({
    url: '/SaleResultChart/data',
    method: 'get',
    params: params
  })
}
