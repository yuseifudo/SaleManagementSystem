import request from '@/utils/request'

export function getHomeData(params) {
  return request({
    url: '/home/data',
    method: 'get',
    params: params
  })
}

export function getLchartData(params) {
  return request({
    url: '/home/lchartdata',
    method: 'get',
    params: params
  })
}

export function getRchartData(params) {
  return request({
    url: '/home/rchartdata',
    method: 'get',
    params: params
  })
}
