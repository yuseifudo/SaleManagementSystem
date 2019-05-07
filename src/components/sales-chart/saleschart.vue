<!--
功能：销售人员详情页
作者：李娜容
日期：2019/5/6
-->
<template>
    <div :id="id" :class="className" :style="{height:height,width:width}">
    </div>
</template>

<script>

  import echarts from 'echarts'
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
              chart:null
            }
        },
      mounted(){
      //初始化echarts图表实例
        this.chart=echarts.init(document.getElementById(this.id));
        //完成图表绘制配置
        this.chart.setOption({

          title: {
            text: '该销售人员各套餐销售的数量与占比',
            subtext: '虚构数据',
            left: 'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: [ '天王卡','地王卡','大冰神卡','小冰神卡']
          },
          series : [
            {
              type: 'pie',
              radius : '65%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              data:[
                {value:30, name: '小冰神卡'},
                {value: 55, name: '大冰神卡'},
                {value: 75, name: '地王卡'},
                {value: 65, name: '天王卡'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]

        })
      }
    }
</script>

<style>

</style>
