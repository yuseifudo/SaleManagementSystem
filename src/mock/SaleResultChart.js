import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

let kkk = []
kkk = Mock.mock({
  'List|12': [{
    '月份|+1': 1,
    '天王卡': '@integer(1000,5100)',
    '地王卡': '@integer(1000,5100)',
    '大冰神卡': '@integer(1000,5100)',
    '小冰神卡': '@integer(1000,5100)'
  }]
})

console.log(kkk)
export default {
  getSales: config => {
    return {
      code: 0,
      data: kkk.List
    }
  }
}
