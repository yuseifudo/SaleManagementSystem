import request from '@/utils/request'

export function getHomeTc(params) {
  return request({
    url: '/home/taocan',
    method: 'get',
    params: params
  })
}
