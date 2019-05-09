import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import util from '@/utils/table.js'
/*
  @author shilongcheng
  @date 2019-4-30
  @function 套餐管理mock数据生成
*/

/**
 * 套餐信息模拟数据生成
 * @author shilongcheng
 * @date 2019-05-09
 * @type {{valid, XHR, RE, _mocked, Random, toJSONSchema, Handler, setup, Util, heredoc}|*}
 */
let packageInfo=Mock.mock({
  'data|3-10': [
    {
      'id|+1': 1000,//套餐id
      name: '@ctitle',// 套餐名
      fee: '@integer(29, 400)',// 套餐资费
      description: '@cparagraph',// 套餐描述
      isFirstPush: false,// 是否首推
      startTime: '@date("yyyy-MM-dd")',// 套餐开始时间
      endTime: '@date("yyyy-MM-dd")',// 套餐结束时间
      number: '@integer(100,1000)',// 套餐售出人数
      updateUser: '@cname',// 套餐更新人
      updateTime: '@date("yyyy-MM-dd")',// 套餐更新时间
      span: 6,// 页面布局span
      borderColor: '#fff', //页面布局边框颜色
      img: Mock.Random.image('960x1394','#409EFF', '#FFF', 'png', 'Test'),// 图片地址
      isDelete: false,//是否删除
      color: '#fff',//文字颜色
      bgText: '#2e323f'//背景颜色
    }
  ]
})

export default {
  /**
   * 返回套餐信息列表
   * @author shilongcheng
   * @date 2019-05-09
   * @param config {Object} 请求的request参数
   * @returns {{code: {number} 状态码信息, data: {JSON} 返回套餐列表信息, message: {string} 返回结果报文}}
   */
  getList: config =>{
    const {} = param2Obj(config.url);
    const dataList=packageInfo.data.filter(item=>{
      return item.isDelete==false
    })// 筛选出未被删除的套餐列表
    let maxIndex=0;
    for(let i=0;i<dataList.length;i++){
      if (dataList[i].number>dataList[maxIndex].number){
        maxIndex=i;
      }
    }// 获取销量最高的套餐并把它设为首推套餐
    dataList[maxIndex].isFirstPush=true;
    return{
      code: 0,// 状态码
      data:dataList,// 返回数据
      message:"数据传输成功"// 返回结果报文
  }
  },
  /***
   * 获取某个套餐详细信息
   * @author shilongcheng
   * @date 2019-05-09
   * @param config {Object} 请求的request参数
   * @returns {{code: {number} 返回结果状态码, data: {item: {JSON} 返回某个套餐信息数据, message: {string} 返回结果报文}}}
   */
  getItemDetail: config =>{

    const{params}=param2Obj(config.url);// 将config中的url请求进行解码并且对解码后的请求中进行字符的替换转换成json对象并且获取其中的params参数（String）

    let paraObj=JSON.parse(params);// 将获取的params转化成JSON对象
    const{id} = paraObj;// 获取JSON中的id参数
    const dataItem=packageInfo.data.filter(item=>{
      return item.id===id;// 从列表中过滤出这个id的数据
    })
    return{
      code: 0, // 状态码
      data:{
        item:dataItem, // 返回数据
        message:'显示详情成功' // 返回结果报文
      }
    }
  },

  /**
   * 新增套餐信息
   * @author shilongcheng
   * @date 2019-05-09
   * @param config {Object} 请求的request参数
   * @returns {{code: {number} 状态码信息, data: {JSON} 返回套餐列表信息, message: {string} 返回结果报文}}
   */
  insertPackageInfo: config =>{
    const{params}=param2Obj(config.url);
    let paraObj=JSON.parse(params);
    const{name,fee,description,startTime,endTime,}=paraObj;
    let time=util.formatDate.format(new Date(), 'yyyy-MM-dd')//获取当前日期并且进行格式化
    packageInfo.data.push({
      id:1000+packageInfo.data.length,
      name: name,
      fee: fee,
      description: description,
      isFirstPush: false,
      startTime: startTime,
      endTime: endTime,
      number: 0,
      updateUser: 'admin',
      updateTime: time.toString(),
      span: 6,// 页面布局span
      borderColor: '#fff', //页面布局边框颜色
      img: Mock.Random.image('960x1394','#ffcc33', '#FFF', 'png', 'Test'),// 图片地址
      isDelete: false,
      color: '#fff',
      bgText: '#2e323f'
    })//插入新增的数据信息
    return{
      code:0,
      data:packageInfo.data,
      message:'新增套餐成功'
    }
  },
  /**
   * 删除相关套餐信息
   * @author shilongcheng
   * @date 2019-05-09
   * @param config {Object} 请求的request参数
   * @returns {{code: {number} 状态码信息, data: {JSON} 返回套餐列表信息, message: {string} 返回结果报文}}
   */
  deletePackageInfo:config=>{
    const{params}=param2Obj(config.url);
    let paraObj=JSON.parse(params);
    const{id}=paraObj;
    for (let i=0;i<packageInfo.data.length;i++){
      if (id==packageInfo.data[i].id){// 获取相等的id并且将它的isDelete设为true，实现伪删除
        packageInfo.data[i].isDelete=true;
      }
    }
    const dataList=packageInfo.data.filter(item=>{
      return item.isDelete==false// 筛选出未被删除的并且进行数据返回
    })
    return{
      code:0,
      data:{
        message:'删除成功',
        lists:dataList
      }
    }
  },

  /**
   * 更新相关的套餐信息
   * @author shilongcheng
   * @date 2019-05-09
   * @param config {Object} 请求的request参数
   * @returns {{code: {number} 状态码信息, data: {JSON} 返回套餐列表信息, message: {string} 返回结果报文}}
   */
  updatePackageInfo:config=>{
    const{params}=param2Obj(config.url);
    let paraObj=JSON.parse(params);
    const{id,name,fee,description,startTime,endTime}=paraObj;
    let time=util.formatDate.format(new Date(), 'yyyy-MM-dd')
    packageInfo.data.some(u=>{
      if (u.id===id){
        u.name=name;
        u.fee=fee;
        u.description=description;
        u.startTime=startTime;
        u.endTime=endTime;
        u.updateUser='admin';
        u.updateTime=time.toString();

      }
    })
    const dataList=packageInfo.data.filter(item=>{
      return item.isDelete==false
    })
    return{
      code:0,
      data:{
        message:'更新成功',
        lists:dataList
      }
    }
  },

  /**
   * 设置某个套餐为首推套餐
   * @author shilongcheng
   * @date 2019-05-09
   * @param config {Object} 请求的request参数
   * @returns {{code: {number} 状态码信息, data: {JSON} 返回套餐列表信息, message: {string} 返回结果报文}}
   */
  setFirstPush:config=> {
    const{params}=param2Obj(config.url);
    let paraObj=JSON.parse(params);
    const{id}=paraObj;
    for (let i=0;i<packageInfo.data.length;i++){
      if (packageInfo.data[i].id==id){
        packageInfo.data[i].isFirstPush=true;
      } else{
        packageInfo.data[i].isFirstPush=false;
      }
    }
    const dataList=packageInfo.data.filter(item=>{
      return item.isDelete==false
    })
    return{
      code:0,
      data:dataList,
      message:'设置首推套餐成功'
    }
  }
}
