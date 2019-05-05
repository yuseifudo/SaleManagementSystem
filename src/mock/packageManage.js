import Mock from 'mockjs'
import { param2Obj } from '@/utils'
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
      number: 'integer(1,100)',// 套餐售出人数
      updateUser: '@cname',// 套餐更新人
      updateTime: '@date("yyyy-MM-dd")',// 套餐更新时间
      span: 6,// 页面布局span
      borderColor: '#fff', //页面布局边框颜色
      img: Mock.Random.image('960x1394','#ffcc33', '#FFF', 'png', 'Test'),// 图片地址
      isDelete: false,//是否删除
      color: '#fff',//文字颜色
      bgText: '#2e323f'//背景颜色
    }
  ]
})

export default {
  getList: config =>{
    const {} = param2Obj(config.url);
    console.log(packageInfo)
    const dataList=packageInfo.data.filter(item=>{
      return item.isDelete==false
    })
    return{
      code: 0,
      data:dataList
  }
  },
  getItemDetail: config =>{
    const{id} = param2Obj(config.url);
    const dataItem=packageInfo.data.filter(item=>{
      return item.id===id;
    })
    return{
      code: 0,
      data:dataItem
    }
  },

  insertPackageInfo: config =>{
    const{id,name,fee,description,startTime,endTime,}=param2Obj(config.url);
    let time= new Date().pattern("yyyy-MM-dd hh:mm:ss");
    packageInfo.data.push({
      id:1000+packageInfo["data|3-10"].length,
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
      img: {
      name: '@integer(1,960)',
        uid: '-@name',
        url: 'https://unsplash.it/400/800/@name',
        status: 'done',
      },// 图片地址
      isDelete: false,
      color: '#fff',
      bgText: '#2e323f'
    })
    return{
      code:0,
      data:{
        message:'添加成功'
      }
    }
  },

  deletePackageInfo:config=>{
    const{id}=param2Obj(config.url);
    for (let i=0;i<packageInfo.data.length;i++){
      if (id==packageInfo.data[i].id){
        packageInfo.data[i].isDelete=true;
      }
    }
    return{
      code:0,
      data:{
        message:'删除成功'
      }
    }
  },

  updatePackageInfo:config=>{
    const{id,name,fee,description,startTime,endTime,number}=param2Obj(config.url);
    let time= new Date().pattern("yyyy-MM-dd hh:mm:ss");
    packageInfo.data.some(u=>{
      if (u.id===id){
        u.name=name;
        u.fee=fee;
        u.description=description;
        u.isFirstPush=false,
        u.startTime=startTime;
        u.endTime=endTime;
        u.number=number;
        u.updateUser='admin';
        u.updateTime=time.toString();
        return{
          code:0,
          data:{
            message:'更新成功'
          }
        }
      }
    })
  }
}
