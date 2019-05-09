import axios from 'axios'

const base = ''

export const getUserList = params => { return axios.get(`${base}/commission/list`, { params: params }) }

export const getUserListPage = params => { return axios.get(`${base}/commission/listpage`, { params: params }) }

export const getUserListPag = params => { return axios.get(`${base}/commission/listpage`, { params: params }) }

export const removeUser = params => { return axios.get(`${base}/commission/remove`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`${base}/commission/batchremove`, { params: params }) }

export const editUser = params => { return axios.get(`${base}/commission/edit`, { params: params }) }

export const addUser = params => { return axios.get(`${base}/commission/add`, { params: params }) }
