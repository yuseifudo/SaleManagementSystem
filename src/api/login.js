import request from '@/utils/request'

export function login(params) {
  return request({
    url: 'http://localhost:8080/manager/login',
    method: 'post',
    data: params
  })
}

/*export function logina(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}*/

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
