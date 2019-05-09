// 销售人员信息查询

import request from '@/utils/request'

export function getUsers(params) {
  return request({
    url: '/user/searchtable',
    method: 'get',
    params: params
  })
}
