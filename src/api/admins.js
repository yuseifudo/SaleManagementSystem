import axios from 'axios'

const base = ''

export const getAdminList = params => { return axios.get(`${base}/manager/list`, { params: params }) }

export const getAdminListPage = params => { return axios.get(`${base}/manager/list`, { params: params }) }

export const removeAdmin = params => { return axios.get(`${base}/manager/delete`, { params: params }) }

export const batchRemoveAdmin = params => { return axios.get(`${base}/manager/deleteAll`, { params: params }) }

export const editAdmin = params => { return axios.get(`${base}/manager/update`, { params: params }) }

export const addAdmin = params => { return axios.get(`${base}/manager/add`, { params: params }) }
