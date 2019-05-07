import request from '@/utils/request'

export function getHomeData(params) {
  return request({
    url: '/home/data',
    method: 'get',
    params: params
  })
}
