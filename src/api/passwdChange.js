import request from '@/utils/request'
//
// export function getPassword(params) {
//   return request({
//     url: 'http://localhost:8080/password/list',
//     method: 'get',
//     params: params
//   })
// }
export function updatePassword(params) {
  return request({
    url: 'http://localhost:8080/manager/updatePassword',
    method: 'post',
    data: params
  })
}
