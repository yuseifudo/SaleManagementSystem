import Mock from 'mockjs'

let List = Mock.mock({
  span: 6,
  data: [
    {
      'title|1':['天王卡','地王卡','大冰神卡','小冰神卡'],
      'subtitle|1':['59元/月','39元/月','199元/月','99元/月'],
      'count|1000-9000': 1215,
      'text|1':['首次充值100送50元话费','首次充值100送5G全国流量','国内流量不限量','国内流量通话不限量'],
      'color|1':['rgb(49, 180, 141)','rgb(56, 161, 242)','rgb(117, 56, 199)','rgb(59, 103, 164)'],
      'key|1':['王','冰']
    }
  ]
})

export default {
  getHomeTc:()=>{
    return {
      code: 0,
      data: {
        homeTc: List
      }
    }
  }
}
