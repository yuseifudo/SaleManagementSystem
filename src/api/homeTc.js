import axios from 'axios'

const base = ''

export const getHomeTc = params => { return axios.get(`${base}/home/taocan`, { params: params }) }


