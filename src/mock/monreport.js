import Mock from 'mockjs'

let List = []
const count = 60
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    time: Mock.Random.date('yyyy-MM'),
    'amount1|100-20000': 100,
    'amount2|100-20000': 100,
    'amount3|100-20000': 100,
    'amount4|100-20000': 100
  }))
}

export default {
  getUserList: config => {
    return {
      code: 0,
      data: {
        // total: mockList.length,
        lists: List
      }
    }
  },
}
