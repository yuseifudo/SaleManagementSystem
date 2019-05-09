//功能：套餐销量热力图随机数据
//作者：吴丽娟
// 日期：2019/5/9

import Mock from 'mockjs'
import { param2Obj } from '@/utils'


const list = Mock.mock({
  code:20000,
  msg: '请求成功',
  data: [
    {name: '福州市', 'value|1000-10000':2000},
    {name: '厦门市', 'value|1000-10000':2000},
    {name: '漳州市', 'value|1000-10000':2000},
    {name: '泉州市', 'value|1000-10000':2000},
    {name: '宁德市', 'value|1000-10000':2000},
    {name: '三明市', 'value|1000-10000':2000},
    {name: '龙岩市', 'value|1000-10000':2000},
    {name: '南平市', 'value|1000-10000':2000},
    {name: '莆田市', 'value|1000-10000':2000}
  ]
})




export default {
  getmapdata: config => {
    return {
      code: 0,
      data: list
    }
  }
}
