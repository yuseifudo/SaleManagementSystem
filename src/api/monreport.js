//功能：月销售额报表模块对应的api文件
//作者：熊铭
//日期：2019/5/6
import axios from 'axios'

const base = ''

export const getUserList = params => { return axios.get(`${base}/MonthSale/list`, { params: params }) }
// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }) }
