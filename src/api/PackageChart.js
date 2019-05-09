import request from '@/utils/request'

export function fetchSales(params) { // 显示套餐销售额
  return request({
    url: '/PackageChart/list',
    method: 'get',
    params: params
  })
}
