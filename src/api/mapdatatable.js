import request from '@/utils/request'

export function getmapdata(query) {
  return request({
    url: '/salesQuantity/list',
    method: 'get',
    params: query
  })
}

//功能：套餐销量热力图随机数据
//作者：吴丽娟
// 日期：2019/5/9
