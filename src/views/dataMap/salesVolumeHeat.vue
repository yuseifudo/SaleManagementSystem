<!--
功能：完成套餐详情展示以及套餐列表正删改
日期：2019、05、02
作者：吴丽娟
-->

<template>
  <div class="chart-container">
    <div ref="chart"  style="height: 100%;width: 100%">
    </div>
  </div>
</template>
<script>
  import {getmapdata} from "../../api/mapdatatable";
  import echarts from 'echarts'
  import '../../../node_modules/echarts/map/js/province/fujian'
  export default {
    data() {
      return {
        chart:null,
        list:[]
      }
    },
    methods:{

    },
    mounted(){
      this.chart = echarts.init(this.$refs.chart)
      getmapdata().then(res=>{
        let list=res.data.data


        let option = {

          title: {
            text: '福建联通套餐地区销量 （2018）',

            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (件)'
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          visualMap: {
            min: 1000,
            max: 10000,
            text:['High','Low'],
            realtime: false,
            top: 'center',
            calculable: true,
            inRange: {
              color: ['lightskyblue','yellow', 'orangered']
            }
          },
          series: [
            {
              name: '福建联通套餐地区销量',
              type: 'map',
              mapType: '福建', // 自定义扩展图表类型
              zoom:1.1,
              roam: true,
              itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
              },
              data: list
              //   [
              //   {name: '福州市', value: 5005},
              //   {name: '厦门市', value: 9547},
              //   {name: '漳州市', value: 3186},
              //   {name: '泉州市', value: 6992},
              //   {name: '宁德市', value: 7454},
              //   {name: '三明市', value: 8068},
              //   {name: '龙岩市', value: 4659},
              //   {name: '南平市', value: 3807},
              //   {name: '莆田市', value: 1504},
              // ]
            }
          ]
        }

        this.chart.setOption(option)

        // let listStr=JSON.stringify(list)
        // listStr=listStr.replace(/"data"/g,"data").replace(/"name"/g,"name").replace(/"value"/g,"value");
        // console.log(listStr)
        // let listObj=eval(listStr)
        // this.list=listObj[0].data
        // console.log(JSON.stringify(this.list))
        //
        //  console.log(JSON.stringify(lists))
        // this.list=lists
        // // console.log((this.list))
      })




    }
  }
</script>
<style>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
    text-align: center;
  }
</style>
