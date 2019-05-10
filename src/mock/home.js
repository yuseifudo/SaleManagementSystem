import Mock from 'mockjs'

let List = Mock.mock({
  span: 8,
  color: '#15A0FF',
  data: [
    {
      'count|10000-20000': 12150,
      title: '日销售额'
    },
    {
      'count|300000-600000': 3560000,
      title: '月销售额'
    },
    {
      'count|5000000-9900000': 8985660,
      title: '年销售额'
    }
  ]
})

let TcList = Mock.mock({
  span: 6,
  'data|4': [
    {
      'title|1':['天王卡','地王卡','大冰神卡','小冰神卡','腾讯王卡','百度圣卡','京东强卡'],
      'subtitle|1':['59元/月','39元/月','199元/月','99元/月','158元/月','258元/月'],
      'count|1000-9000': 1215,
      'text|1':['首次充值100送50元话费','首次充值100送5G全国流量','国内流量不限量','国内流量通话不限量','购卡即送腾讯视频VIP'],
      'color|1':['rgb(49, 180, 141)','rgb(56, 161, 242)','rgb(117, 56, 199)','rgb(59, 103, 164)','rgb(50, 123, 184)','rgb(50, 99, 154)'],
      'key|1':['王','冰','圣','强']
    }
  ]
})

let SaleList = Mock.mock({
  span: 6,
  borderColor: '#fff',
  'data|4': [
    {
      name: '@cname',
      src: Mock.Random.image('960x1394','#409EFF', '#FFF', 'png', 'SaleHero'),
      text: '@cparagraph(5)'
    }
  ]
})

export default {
  getHomeData:()=>{
    return {
      code: 0,
      data: {
        homeData: List
      }
    }
  },

  getHomeTc:()=>{
    return {
      code: 0,
      data: {
        homeTc: TcList
      }
    }
  },

  getHomeSaleData:()=>{
    return {
      code: 0,
      data: {
        homeSaleData: SaleList
      }
    }
  }
}
