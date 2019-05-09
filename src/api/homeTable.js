import request from '@/utils/request'

export function getHomeData(params) {
  return request({
    url: '/home/data',
    method: 'get',
    params: params
  })
}

export function getHomeTc(params) {
  return request({
    url: '/home/taocan',
    method: 'get',
    params: params
  })
}

export function getHomeSaleData(params) {
  return request({
    url: '/home/sale',
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


export function getLbchartData(params) {
  return request({
    url: '/home/lbchartdata',
    method: 'get',
    params: params
  })
}
