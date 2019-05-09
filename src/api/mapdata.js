import axios from 'axios'

const base = ''

export const getmapdata = params => { return axios.get(`${base}/salesQuantity/list`, { params: params }) }

//功能：套餐销量热力图随机数据
//作者：吴丽娟
// 日期：2019/5/9
