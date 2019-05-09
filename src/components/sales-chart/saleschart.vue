<!--
功能：销售人员详情页图表
作者：李娜容
日期：2019/5/8
-->
<template>
  <div id="pie"  :class="className" :style="{height:height,width:width}">
  </div>
</template>

<script>

  import echarts from 'echarts'
  import {getPieInfo} from '@/api/salesmanT.js'
  export default {
    data() {
      return {
        chart: null,
        pieData:[],
        option:{},
        dataTitle:[],
        dataItems:[]
      }
    },

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
        default: '400px'
      }
    },

    mounted(){
      this.getPieData();
      //初始化echarts图表实例
      //   this.chart=echarts.init(document.getElementById(this.id));

      //完成图表绘制配置
      // this.chart.setOption({
      //
      //   title: {
      //     text: '该销售人员各套餐销售的数量与占比',
      //     left: 'center'
      //   },
      //   tooltip : {
      //     trigger: 'item',
      //     formatter: "{b} : {c} ({d}%)"
      //   },
      //   legend: {
      //     // orient: 'vertical',
      //     // top: 'middle',
      //     bottom: 10,
      //     left: 'center',
      //     data: [ '天王卡','地王卡','大冰神卡','小冰神卡']
      //   },
      //   series : [
      //     {
      //       type: 'pie',
      //       radius : '65%',
      //       center: ['50%', '50%'],
      //       selectedMode: 'single',
      //       data:[
      //         {value:30, name: '小冰神卡'},
      //         {value: 55, name: '大冰神卡'},
      //         {value: 75, name: '地王卡'},
      //         {value: 65, name: '天王卡'},
      //
      //       ],
      //       itemStyle: {
      //         emphasis: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: 'rgba(0, 0, 0, 0.5)'
      //         }
      //       }
      //     }
      //   ]
      //
      // })
    },
    methods:{
      getPieData(){
        getPieInfo().then((res)=>{
          if (res.code==0){

            this.pieData=res.data;
            // console.log(JSON.stringify(this.pieData))
            this.chart = echarts.init(document.getElementById('pie'));
            // console.log(this.pieData.length)
            for (let i=0;i<this.pieData.length;i++){
              this.dataTitle.push(this.pieData[i].name)
              this.dataItems.push({value:this.pieData[i].number,name:this.pieData[i].name})
            }
            console.log(this.dataTitle)
            console.log(this.dataItems)
            //完成图表绘制配置
            this.option=({
              title: {
                text: '该销售人员各套餐销售的数量与占比',
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
                data: this.dataTitle
              },
              series : [
                {
                  type: 'pie',
                  radius : '65%',
                  center: ['50%', '50%'],
                  selectedMode: 'single',
                  data:this.dataItems,
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


            this.chart.setOption(this.option);
          }
          else{
            this.$message({
              message: res.message,
              type: 'error'
            })
            return;
          }
        })

      },
    }
  }
</script>

<style>

</style>
