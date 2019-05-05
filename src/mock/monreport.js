import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = []
const count = 60

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id|+1': 10010,
    name: Mock.Random.cname(),
    'amount1|+1': 100,
    'amount2|+1': 100,
    'amount3|+1': 100,
    'amount4|+1': 100
  }))
}

export default {
  getUserList: config => {
    const { name, page = 1, limit = 20 } = param2Obj(config.url)

    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1) return false
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
  },
  createUser: config => {
    const { id, name, amount1, amount2, amount3, amount4 } = param2Obj(config.url)
    console.log('66')
    List.push({
      id: id,
      name: name,
      amount1: amount1,
      amount2: amount2,
      amount3: amount3,
      amount4: amount4
    })
    return {
      code: 0,
      data: {
        message: '添加成功'
      }
    }
  },
  deleteUser: config => {
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
  updateUser: config => {
    const { id, name, amount1, amount2, amount3, amount4 } = param2Obj(config.url)
    // const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.amount1 = amount1
        u.amount2 = amount2
        u.amount3 = amount3
        u.amount4 = amount4
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
