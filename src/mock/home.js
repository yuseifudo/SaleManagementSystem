import Mock from 'mockjs'

let List = Mock.mock({
  span: 8,
  color: '#15A0FF',
  data: [
    {
      'count|1000-2000': 1215,
      title: '日销售额'
    },
    {
      'count|30000-60000': 356000,
      title: '月销售额'
    },
    {
      'count|500000-990000': 898566,
      title: '年销售额'
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
      text: '@cparagraph(3)'
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

  getHomeSaleData:()=>{
    return {
      code: 0,
      data: {
        homeSaleData: SaleList
      }
    }
  }
}
