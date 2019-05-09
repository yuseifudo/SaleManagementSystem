//功能：套餐佣金规则
//作者：吴丽娟
// 日期：2019/5/7

import axios from 'axios'

const base = ''

export const getTaocanList = params => { return axios.get(`${base}/taocanList/list`, { params: params }) }

// export const getTaocanListPage = params => { return axios.get(`${base}/taocanList/listpage`, { params: params }) }

export const removeTaocan = params => { return axios.get(`${base}/taocanList/remove`, { params: params }) }

export const batchRemove = params => { return axios.get(`${base}/taocanList/batchremove`, { params: params }) }

export const editTaocan = params => { return axios.get(`${base}/taocanList/edit`, { params: params }) }

export const addTaocan = params => { return axios.get(`${base}/taocanList/add`, { params: params }) }

