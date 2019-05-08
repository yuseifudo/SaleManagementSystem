import Mock from 'mockjs'

let LchartList=[]
let RchartList=[]
const count1=12
const count2=6

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
        'name|1':['腾讯王卡','蚂蚁宝卡','京东强卡','工行E卡','百度圣卡','滴滴橙卡']
      }
    ]
  }))
}


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
}
