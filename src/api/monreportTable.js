//功能：月销售额报表模块对应的api文件
//作者：熊铭
//日期：2019/5/6
import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: 'http://localhost:8080/user/list',
    method: 'get',
    params: params
  })
}

