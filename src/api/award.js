/*
* 作者：王震
* 时间：2019.05.06
* 功能：奖励规则API文件
*
* */
import axios from 'axios'

const base = ''

export const getAwardList = params => { return axios.get(`${base}/award/list`, { params: params }) }

export const getAwardListPage = params => { return axios.get(`${base}/award/listpage`, { params: params }) }

export const removeAward = params => { return axios.get(`${base}/award/remove`, { params: params }) }

export const batchRemoveAward = params => { return axios.get(`${base}/award/batchremove`, { params: params }) }

export const editAward = params => { return axios.get(`${base}/award/edit`, { params: params }) }

export const addAward = params => { return axios.get(`${base}/award/add`, { params: params }) }
