<template>
  <div class="chart-container">
    <div ref="chart" :class="className" :style="{height:height,width:width}">
    </div>
  </div>
</template>
<script>
  import {getmapdata} from "../../api/mapdatatable";
  import echarts from 'echarts'
  import '../../../node_modules/echarts/map/js/province/fujian'
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
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
            text: '福建省联通用户分布',

            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c}'
          },
          legend: {
            orient: 'vertical',
            x:'left',
            data:['用户']
          },
          dataRange: {
            min: 0,
            max: 2500,
            x: 'left',
            y: 'bottom',
            text:['高','低'],
            calculable : true
          },
          toolbox: {
            show: true,
            orient: 'horizontal',
            left: 'right',
            top: 'top',
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
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
              name: '福建省联通用户分布',
              type: 'map',
              mapType: '福建', // 自定义扩展图表类型
              zoom:1.07,
              roam: true,
              itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
              },
              data: list
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
    width: 100%;
    height: 100%;
    text-align: center;
  }
</style>

<!--
<template>
  <div id="id3" :class="className" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    import '../../../node_modules/echarts/map/js/china'
    import {getLbchartData} from '@/api/homeTable'
    export default {
      props: {
        className: {
          type: String,
          default: 'chart'
        },
        id: {
          type: String,
          default: 'chart'
        },
        width: {
          type: String,
          default: '200px'
        },
        height: {
          type: String,
          default: '200px'
        }
      },
      data() {
        return {
          chart:null,
          list:[]
        }
      },
      mounted(){
        this.getLbchartData()
      },
      methods:{
        getLbchartData() {
          getLbchartData().then(res => {

            this.list=res.lbChartData.data
            console.log(this.list)

            //初始化echarts图表实例
            this.chart=echarts.init(document.getElementById("id3"));

            const option={
              title : {
                text: '全国联通用户分布',
                subtext: '单位：百万',
                x:'center'
              },
              tooltip : {
                trigger: 'item'
              },
              legend: {
                orient: 'vertical',
                x:'left',
                data:['用户']
              },
              dataRange: {
                min: 0,
                max: 2500,
                x: 'left',
                y: 'bottom',
                text:['高','低'],
                calculable : true
              },
              toolbox: {
                show: true,
                orient : 'horizontal',
                x: 'right',
                y: 'top',
                feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              roamController: {
                show: true,
                x: 'right',
                mapTypeControl: {
                  'china': true
                }
              },
              series : [
                {
                  name: '用户',
                  type: 'map',
                  mapType: 'china',
                  roam: false,
                  itemStyle:{
                    normal:{label:{show:true}},
                    emphasis:{label:{show:true}}
                  },
                  data:this.list
                    // [
                    //   {name: '北京',value: Math.round(Math.random()*1000)},
                    //   {name: '天津',value: Math.round(Math.random()*1000)},
                    //   {name: '上海',value: Math.round(Math.random()*1000)},
                    //   {name: '重庆',value: Math.round(Math.random()*1000)},
                    //   {name: '河北',value: Math.round(Math.random()*1000)},
                    //   {name: '河南',value: Math.round(Math.random()*1000)},
                    //   {name: '云南',value: Math.round(Math.random()*1000)},
                    //   {name: '辽宁',value: Math.round(Math.random()*1000)},
                    //   {name: '黑龙江',value: Math.round(Math.random()*1000)},
                    //   {name: '湖南',value: Math.round(Math.random()*1000)},
                    //   {name: '安徽',value: Math.round(Math.random()*1000)},
                    //   {name: '山东',value: Math.round(Math.random()*1000)},
                    //   {name: '新疆',value: Math.round(Math.random()*1000)},
                    //   {name: '江苏',value: Math.round(Math.random()*1000)},
                    //   {name: '浙江',value: Math.round(Math.random()*1000)},
                    //   {name: '江西',value: Math.round(Math.random()*1000)},
                    //   {name: '湖北',value: Math.round(Math.random()*1000)},
                    //   {name: '广西',value: Math.round(Math.random()*1000)},
                    //   {name: '甘肃',value: Math.round(Math.random()*1000)},
                    //   {name: '山西',value: Math.round(Math.random()*1000)},
                    //   {name: '内蒙古',value: Math.round(Math.random()*1000)},
                    //   {name: '陕西',value: Math.round(Math.random()*1000)},
                    //   {name: '吉林',value: Math.round(Math.random()*1000)},
                    //   {name: '福建',value: Math.round(Math.random()*1000)},
                    //   {name: '贵州',value: Math.round(Math.random()*1000)},
                    //   {name: '广东',value: Math.round(Math.random()*1000)},
                    //   {name: '青海',value: Math.round(Math.random()*1000)},
                    //   {name: '西藏',value: Math.round(Math.random()*1000)},
                    //   {name: '四川',value: Math.round(Math.random()*1000)},
                    //   {name: '宁夏',value: Math.round(Math.random()*1000)},
                    //   {name: '海南',value: Math.round(Math.random()*1000)},
                    //   {name: '台湾',value: Math.round(Math.random()*1000)},
                    //   {name: '香港',value: Math.round(Math.random()*1000)},
                    //   {name: '澳门',value: Math.round(Math.random()*1000)}
                    // ]
                }
              ]
            }

            //完成图表绘制的配置
            this.chart.setOption(option)
          })
        }
      }

    }
</script>

<style>

</style>
-->
