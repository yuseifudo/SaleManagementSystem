import axios from 'axios'

const base = ''

export const getHomeData = params => { return axios.get(`${base}/home/data`, { params: params }) }


