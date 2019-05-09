import Mock from 'mockjs'

let LchartList=[]
let RchartList=[]
const count1=12
const count2=8

for (let i = 0; i < count1; i++) {
  LchartList.push(Mock.mock({
    yyname:'移动话音',
    'yuyin|100-249.1': 100,
    dxname:'短信彩信',
    'duanxin|100-249.1': 100,
    llname:'移动数据',
    'liuliang|10-24.1': 10
  }))
}

for (let i = 0; i < count2; i++) {
  RchartList.push(Mock.mock({
    data:[
      {
        'value|300-1500':335,
        'name|1':['腾讯王卡','蚂蚁宝卡','京东强卡','工行E卡','百度圣卡','滴滴橙卡','畅淘卡','微博微卡']
      }
    ]
  }))
}

const LbchartList = Mock.mock({
  data: [
    {name: '北京','value|300-2000':1000},
    {name: '天津','value|300-2000':1000},
    {name: '上海','value|300-2000':1000},
    {name: '重庆','value|300-2000':1000},
    {name: '河北','value|300-2000':1000},
    {name: '河南','value|300-2000':1000},
    {name: '云南','value|300-2000':1000},
    {name: '辽宁','value|300-2000':1000},
    {name: '黑龙江','value|300-2000':1000},
    {name: '湖南','value|300-2000':1000},
    {name: '安徽','value|300-2000':1000},
    {name: '山东','value|300-2000':1000},
    {name: '新疆','value|300-2000':1000},
    {name: '江苏','value|300-2000':1000},
    {name: '浙江','value|300-2000':1000},
    {name: '江西','value|300-2000':1000},
    {name: '湖北','value|300-2000':1000},
    {name: '广西','value|300-2000':1000},
    {name: '甘肃','value|300-2000':1000},
    {name: '山西','value|300-2000':1000},
    {name: '内蒙古','value|300-2000':1000},
    {name: '陕西','value|300-2000':1000},
    {name: '吉林','value|300-2000':1000},
    {name: '福建','value|300-2000':1000},
    {name: '贵州','value|300-2000':1000},
    {name: '广东','value|300-2000':1000},
    {name: '青海','value|300-2000':1000},
    {name: '西藏','value|300-2000':1000},
    {name: '四川','value|300-2000':1000},
    {name: '宁夏','value|300-2000':1000},
    {name: '海南','value|300-2000':1000},
    {name: '台湾','value|300-2000':1000},
    {name: '香港','value|300-2000':1000},
    {name: '澳门','value|300-2000':1000}
  ]
})


export default {
  getLchartData:()=>{
    return {
      code: 0,
      data: {
        lChartData: LchartList
      }
    }
  },

  getRchartData:()=>{
    return {
      code: 0,
      data: {
        rChartData: RchartList
      }
    }
  },

  getLbchartData:config => {
    return {
      code: 0,
      lbChartData: LbchartList
    }
  }

}
