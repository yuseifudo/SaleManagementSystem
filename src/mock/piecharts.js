import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

const List = []
const count = 4

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    套餐: Mock.Random.string(3, 4),
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
