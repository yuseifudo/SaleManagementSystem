import Mock from 'mockjs'
import { param2Obj } from '@/utils'

let List = [];
const count = 12;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'sale|20-150': 1,
    'sale2|20-150': 1,
    'sale3|20-150': 1,
    'sale4|20-150': 1,
/*    'count5|20-150': 1,
    'count6|20-150': 1,
    'count7|20-150': 1,
    'count8|20-150': 1,
    'count9|20-150': 1,
    'count10|20-150': 1,
    'count11|20-150': 1,
    'count12|20-150': 1,*/
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
