import Mock from 'mockjs'

let List = []
const count = 600
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
    // const {name, page = 1, limit = 20} = param2Obj(config.url)
    //
    // const mockList = List.filter(user => {
    //   if (name && user.name.indexOf(name) === -1) return false
    //   return true
    // })
    //
    // const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      code: 0,
      data: {
        // total: mockList.length,
        lists: List
      }
    }
  },
}
