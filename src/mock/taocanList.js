//功能：套餐佣金规则
//作者：吴丽娟
// 日期：2019/5/7


import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id:Mock.Random.guid(),
    name: Mock.Random.ctitle(),
    'taocantype|1':[{id:1,typeName:'全国套餐'},{id:2,typeName:'本地套餐'},{id:3,typeName:'校园套餐'},{id:4,typeName:'智慧沃家'}],
    'commision|5-100':20,
    'price|50-200':50,
    'time|100-2000':500,
    'flow|2-200':50,
  }))
}

export default {
  getTaocanList: config => {
    const { name, currentPage = 1, pageSize = 10 } = param2Obj(config.url)

    const mockList = List.filter(taocan => {
      if (name && taocan.name.indexOf(name) === -1) return false
      return true
    })
    //
    // console.log("mockList"+mockList)
    // console.log("currentPage = "+currentPage)

    const pageList = mockList.filter((item, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1))

    return {
      code: 0,
      data: {
        total: mockList.length,
        taocanlist: pageList
      }
    }
  },
  createTaocan: config => {
    const { id, name, taocantype, commision,price, time, flow } = param2Obj(config.url)

    const taocans = [{id:1,typeName:'全国套餐'},{id:2,typeName:'本地套餐'},{id:3,typeName:'校园套餐'},{id:4,typeName:'智慧沃家'}]

    //const taocan = taocans[taocantype-1]
    //
    // console.log(taocantype+"taocantype")
    // console.log('66')
    List.unshift({
      id: id,
      name: name,
      taocantype:taocans[taocantype-1],
      commision:commision,
      price:price,
      time:time,
      flow:flow
    })


    return {
      code: 0,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteTaocan: config => {
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
  updateTaocan: config => {
    const { id, name, taocantype,commision, price, time, flow } = param2Obj(config.url)

    const taocans = [{id:1,typeName:'全国套餐'},{id:2,typeName:'本地套餐'},{id:3,typeName:'校园套餐'},{id:4,typeName:'智慧沃家'}]

    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.taocantype = taocans[taocantype-1]
        u.commision=commision
        u.price = price
        u.time = time
        u.flow = flow
        return true
      }
    })
    return {
      code: 0,
      data: {
        message: '编辑成功'
      }
    }
  }
}
