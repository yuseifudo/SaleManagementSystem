import axios from 'axios'

const base = ''

export const getAdminList = params => { return axios.get(`${base}/admin/list`, { params: params }) }

export const getAdminListPage = params => { return axios.get(`${base}/admin/listpage`, { params: params }) }

export const removeAdmin = params => { return axios.get(`${base}/admin/remove`, { params: params }) }

export const batchRemoveAdmin = params => { return axios.get(`${base}/admin/batchremove`, { params: params }) }

export const editAdmin = params => { return axios.get(`${base}/admin/edit`, { params: params }) }

export const addAdmin = params => { return axios.get(`${base}/admin/add`, { params: params }) }
