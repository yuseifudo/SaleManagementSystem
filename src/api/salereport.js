import axios from 'axios'

const base = ''

export const getSaleList = params => { return axios.get(`${base}/sale/list`, { params: params }) }
