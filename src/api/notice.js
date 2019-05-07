/*
* 作者：杨昌海
* 时间：2019.05.06
* 功能：公告信息API文件
*
* */
import axios from 'axios'

const base = ''

export const getNoticeList = params => { return axios.get(`${base}/notice/list`, { params: params }) }

export const getNoticeListPage = params => { return axios.get(`${base}/notice/listpage`, { params: params }) }

export const removeNotice = params => { return axios.get(`${base}/notice/remove`, { params: params }) }

export const batchRemoveNotice = params => { return axios.get(`${base}/notice/batchremove`, { params: params }) }

export const editNotice = params => { return axios.get(`${base}/notice/edit`, { params: params }) }

export const addNotice = params => { return axios.get(`${base}/notice/add`, { params: params }) }
