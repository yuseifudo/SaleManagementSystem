// 功能：销售人员列表对应的mock文件
// 作者：李娜容
// 日期：2019/5/6

import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = [];
const count = 60;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    num:'@increment',
    name: Mock.Random.cname(),
    sex: Mock.Random.integer(0, 1),
    "telephone":/^1[3875][1-9]\d{8}/,
    'totals|4000-20000':1,
    'count|50-300': 1,
    'commission|2000-8000': 1,
    'count1|20-150': 1,
    'count2|20-150': 1,
    'count3|20-150': 1,
    'count4|20-150': 1,
  }))
}

let Piedata=Mock.mock({
  'data|4': [
    {
      number:'@integer(29, 400)',
      'name|1':['腾讯王卡','蚂蚁宝卡','京东强卡','工行E卡','百度圣卡','滴滴橙卡','畅淘卡','百度女神卡']
    }
  ]
})

export default {
  getSalesmanList: config => {
    const { name, num, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = List.filter(salesman => {
      if (name && salesman.name.indexOf(name) === -1) return false
      if (num && salesman.num != num) return false

      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 0,
      data: {
        total: mockList.length,
        salesmanList: pageList
      }
    }
  },
  createSalesman: config => {
    const { id, num,name,sex,telephone,count,totals,commission } = param2Obj(config.url)
    console.log('66')
    List.push({
      id: id,
      num:num,
      name: name,
      sex: sex,
      telephone:telephone,
      count:count,
      totals:totals,
      commission:commission
    })
    return {
      code: 0,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteSalesman: config => {
    const { id } = param2Obj(config.url)
    List = List.filter(u => u.id !== id)
    return {
      code: 0,
      data: {
        message: '删除成功'
      }
    }
  },
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 0,
      data: {
        message: '批量删除成功'
      }
    }
  },
  updateSalesman: config => {
    const { id,num, name,sex,telephone,count,totals,commission } = param2Obj(config.url)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.num=num
        u.name = name
        u.sex = sex_num
        u.telephone=telephone
        u.count=count
        u.totals=totals
        u.commission=commission
        return true
      }
    })
    return {
      code: 0,
      data: {
        message: '编辑成功'
      }
    }
  },
  getPieInfo:() => {
    return {
      code: 0,
      data: Piedata.data
      // data:Piedata
    }
  }

}
