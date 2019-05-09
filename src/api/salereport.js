//功能：月销售额柱状图表模块对应的api文件
//作者：熊铭
//日期：2019/5/7

import axios from 'axios'

const base = ''

export const getSaleList = params => { return axios.get(`${base}/sale/list`, { params: params }) }
