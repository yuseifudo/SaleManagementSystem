//功能：月销售额柱状图表模块对应的api文件
//作者：熊铭
// 日期：2019/5/7
import request from '@/utils/request'

export function getSaleList(params) {
  return request({
    url: '/sale/list',
    method: 'get',
    params: params
  })
}
