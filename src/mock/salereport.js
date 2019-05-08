import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = [];
const count = 12;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'sale1|20-150': 1,
    'sale2|20-150': 1,
    'sale3|20-150': 1,
    'sale4|20-150': 1,
  }))
}

export default {
  getSaleList: config => {
    return {
      code: 0,
      data: {
        // total: mockList.length,
        lists: List
      }
    }
  },
}
