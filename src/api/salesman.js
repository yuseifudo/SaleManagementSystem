//功能：销售人员列表模块对应的api文件
//作者：李娜容
// 日期：2019/5/6

import axios from 'axios'

const base = ''

export const getSalesmanList = params => { return axios.get(`${base}/salesman/list`, { params: params }) }

export const getSalesmanListPage = params => { return axios.get(`${base}/salesman/listpage`, { params: params }) }

export const removeSalesman = params => { return axios.get(`${base}/salesman/remove`, { params: params }) }

export const batchRemoveSalesman = params => { return axios.get(`${base}/salesman/batchremove`, { params: params }) }

export const editSalesman = params => { return axios.get(`${base}/salesman/edit`, { params: params }) }

export const addSalesman = params => { return axios.get(`${base}/salesman/add`, { params: params }) }

export const getPieInfo = params => { return axios.get(`${base}/salesman/pie`, { params: params }) }
