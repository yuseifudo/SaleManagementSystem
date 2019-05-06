import axios from 'axios'

const base = ''

export const getNoticeList = params => { return axios.get(`${base}/notice/list`, { params: params }) }

export const getNoticeListPage = params => { return axios.get(`${base}/notice/listpage`, { params: params }) }

export const removeNotice = params => { return axios.get(`${base}/notice/remove`, { params: params }) }

export const batchRemoveNotice = params => { return axios.get(`${base}/notice/batchremove`, { params: params }) }

export const editNotice = params => { return axios.get(`${base}/notice/edit`, { params: params }) }

export const addNotice = params => { return axios.get(`${base}/notice/add`, { params: params }) }
