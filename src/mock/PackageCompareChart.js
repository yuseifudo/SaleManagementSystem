import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

const List = []
const count = 4

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    '套餐|1':['腾讯王卡','蚂蚁宝卡','京东强卡','工行E卡','百度圣卡','滴滴橙卡','畅淘卡','百度女神卡','阿里鱼卡','网易白金卡','哔哩哔哩卡'],
    sales: Mock.Random.integer(1000, 5000)
  }))
}

export default {
  getSales: config => {
    return {
      code: 0,
      data: List
    }
  }
}
