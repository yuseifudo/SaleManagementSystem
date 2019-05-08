import Mock from 'mockjs'
import { param2Obj } from '@/utils'
import util from '@/utils/table.js'
/*
  author:shilongcheng
  date:2019-4-30
  function:套餐管理mock数据生成
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
  getList: config =>{
    const {} = param2Obj(config.url);
    const dataList=packageInfo.data.filter(item=>{
      return item.isDelete==false
    })
    let maxIndex=0;
    for(let i=0;i<dataList.length;i++){
      if (dataList[i].number>dataList[maxIndex].number){
        maxIndex=i;
      }
    }
    dataList[maxIndex].isFirstPush=true;
    return{
      code: 0,
      data:dataList,
      message:"数据传输成功"
  }
  },
  getItemDetail: config =>{
    const{params}=param2Obj(config.url);

    let paraObj=JSON.parse(params);
    console.log(paraObj)
    const{id} = paraObj;
    const dataItem=packageInfo.data.filter(item=>{
      return item.id===id;
    })
    return{
      code: 0,
      data:{
        item:dataItem,
        message:'显示详情成功'
      }
    }
  },

  insertPackageInfo: config =>{
    const{params}=param2Obj(config.url);
    let paraObj=JSON.parse(params);
    const{name,fee,description,startTime,endTime,}=paraObj;
    let time=util.formatDate.format(new Date(), 'yyyy-MM-dd')
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
    })
    return{
      code:0,
      data:packageInfo.data
    }
  },

  deletePackageInfo:config=>{
    const{params}=param2Obj(config.url);
    let paraObj=JSON.parse(params);
    const{id}=paraObj;
    for (let i=0;i<packageInfo.data.length;i++){
      if (id==packageInfo.data[i].id){
        packageInfo.data[i].isDelete=true;
      }
    }
    const dataList=packageInfo.data.filter(item=>{
      return item.isDelete==false
    })
    return{
      code:0,
      data:{
        message:'删除成功',
        lists:dataList
      }
    }
  },

  updatePackageInfo:config=>{
    const{params}=param2Obj(config.url);
    let paraObj=JSON.parse(params);
    console.log(paraObj)
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

  setFirstPush:config=> {
  // .replace(/"/g,'')
  //   console.log(config.url);
  //   console.log(param2Obj(config.url));
    const{params}=param2Obj(config.url);
    let paraObj=JSON.parse(params);
    const{id}=paraObj;
    console.log(id);
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
      data:dataList
    }
  }
}
