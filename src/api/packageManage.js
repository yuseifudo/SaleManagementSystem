import request from '@/utils/request'

/**
 * 套餐管理request api
 * @author shilongcheng
 * @date 2019-05-05
 *
 */

/**
 * 获取所有列表信息request api
 * @author shilongcheng
 * @date 2019-05-09
 * @param params {JSON} 请求的参数
 */
export function fetchList(params) {
  return request({
    url: '/packageManage/list',// url请求
    method: 'get', //请求方式
    params: params //参数列表
  })
}

/**
 * 查询某个套餐详细信息 request api
 * @author shilongcheng
 * @date 2019-05-09
 * @param params {JSON} 请求的参数
 */
export function fetchPackageDetail(params) {
  return request({
    url: '/packageManage/detail',// url请求
    method: 'get',//请求方式
    params: { params }//参数列表
  })
}

/**
 * 添加套餐列表信息 request api
 * @author shilongcheng
 * @date 2019-05-09
 * @param params {JSON} 请求的参数
 */
export function createPackageInfo(params) {
  return request({
    url: '/packageManage/create',// url请求
    method: 'post',//请求方式
    params:{params}//参数列表
  })
}

/**
 * 删除某个套餐信息request api
 * @author shilongcheng
 * @date 2019-05-09
 * @param params {JSON} 请求的参数
 */
export function deletePackageInfo(params) {
  return request({
    url: '/packageManage/delete',// url请求
    method: 'get',//请求方式
    params: {params}//参数列表
  })
}

/**
 * 更新某个套餐信息 request api
 * @author shilongcheng
 * @date 2019-05-09
 * @param params {JSON} 请求的参数
 */
export function updatePackageInfo(params) {
  return request({
    url: '/packageManage/update',// url请求
    method: 'post',//请求方式
    params: {params}//参数列表
  })
}

/**
 * 设置首推套餐 request api
 * @author shilongcheng
 * @date 2019-05-09
 * @param params {JSON} 请求的参数
 */
export function setFirstPush(params) {
  return request({
    url: '/packageManage/setFirstPush',// url请求
    method: 'post',//请求方式
    params:{params}//参数列表
  })
}
