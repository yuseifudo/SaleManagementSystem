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
  import echarts from 'echarts'

  import '../../../node_modules/echarts/map/js/province/fujian'
  export default {
    data() {
      return {chart:null}
    },
    mounted(){
      this.chart = echarts.init(this.$refs.chart)

      let option = {

        title: {
          text: '福建联通套餐地区销量 （2018）',
          subtext: '福建联通套餐地区销量 （2018）',
          sublink: 'www.163.com',

          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
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
            itemStyle:{
              normal:{label:{show:true}},
              emphasis:{label:{show:true}}
            },
            data:[
              {name: '福州市', value: 5005},
              {name: '厦门市', value: 9547},
              {name: '漳州市', value: 3186},
              {name: '泉州市', value: 6992},
              {name: '宁德市', value: 7454},
              {name: '三明市', value: 8068},
              {name: '龙岩市', value: 4659},
              {name: '南平市', value: 3807},
              {name: '莆田市', value: 1504},


            ],
          }
        ]
      }

      this.chart.setOption(option)
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
