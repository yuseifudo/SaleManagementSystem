import request from '@/utils/request'

export function fetchList(params) { // 显示套餐销售额
  return request({
    url: '/piecharts/list',
    method: 'get',
    params: params
  })
}
