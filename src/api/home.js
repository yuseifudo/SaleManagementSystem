import axios from 'axios'

const base = ''

export const getHomeData = params => { return axios.get(`${base}/dashboard/moneyList`, { params: params }) }

export const getHomeTc = params => { return axios.get(`${base}/dashboard/productList`, { params: params }) }

export const getHomeSaleData = params => { return axios.get(`${base}/dashboard/saleManList`, { params: params }) }

export const getLchartData = params => { return axios.get(`${base}/home/lchartdata`, { params: params }) }

export const getRchartData = params => { return axios.get(`${base}/home/rchartdata`, { params: params }) }

export const getLbchartData = params => { return axios.get(`${base}/home/lbchartdata`, { params: params }) }



