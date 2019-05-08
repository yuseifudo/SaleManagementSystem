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

export default {
  getHomeData:()=>{
    return {
      code: 0,
      data: {
        homeData: List
      }
    }
  }
}
