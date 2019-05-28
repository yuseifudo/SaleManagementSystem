import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    // addr: Mock.mock('@county(true)'),
    'addr|30-300':200,
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    'grade': '@datetime',
    'status|1':['单停','双停','正常','在网','欠费'],
    'taocan|1':['腾讯王卡','蚂蚁宝卡','京东强卡','工行E卡','百度圣卡','滴滴橙卡','畅淘卡','微博微卡'],
    'time|5-50':10,
    // 'grade|1':['大区销售经理','区域销售经理','销售主管','销售专员']
  }))
}

export default {
  getUserList: config => {
    const { userName, productName,tel,fee,onlineTime,page = 1, limit = 5 } = param2Obj(config.url)

    const mockList = List.filter(user => {
      if (userName && user.userName.indexOf(userName) === -1) return false
      if (productName && user.productName.indexOf(productName) === -1) return false
      if (tel && user.tel.indexOf(tel) === -1) return false
      if (fee && user.fee != fee) return false
      if (onlineTime && user.onlineTime != onlineTime) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 0,
      data: {
        total: mockList.length,
        users: pageList
      }
    }
  }

}
