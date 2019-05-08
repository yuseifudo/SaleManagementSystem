import request from '@/utils/request'

/**
 * author:shilongcheng
 * date:2019-05-05
 * function:套餐管理request api
 */

export function fetchList(params) {// 显示全部信息
  return request({
    url: '/packageManage/list',
    method: 'get',
    params: params
  })
}
export function fetchPackageDetail(params) {// 查询
  return request({
    url: '/packageManage/detail',
    method: 'get',
    params: { params }
  })
}
export function createPackageInfo(params) {// 增加
  return request({
    url: '/packageManage/create',
    method: 'post',
    params:{params}
  })
}
export function deletePackageInfo(params) {// 删除
  return request({
    url: '/packageManage/delete',
    method: 'get',
    params: {params}
  })
}

export function updatePackageInfo(params) {//修改
  return request({
    url: '/packageManage/update',
    method: 'post',
    params: {params}
  })
}

export function setFirstPush(params) {//设置首推
  return request({
    url: '/packageManage/setFirstPush',
    method: 'post',
    params:{params}
  })
}
