import axios from 'axios'

const base = ''

export const getHomeData = params => { return axios.get(`${base}/home/data`, { params: params }) }

export const getHomeSaleData = params => { return axios.get(`${base}/home/sale`, { params: params }) }

export const getLchartData = params => { return axios.get(`${base}/home/lchartdata`, { params: params }) }

export const getRchartData = params => { return axios.get(`${base}/home/rchartdata`, { params: params }) }



