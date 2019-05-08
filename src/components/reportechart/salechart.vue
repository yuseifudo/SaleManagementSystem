<template>
  <div id="sale" style="width: 48% ; height: 400px ; display:inline-block"></div>
</template>
<script>
  import echarts from 'echarts'
    export default {
    props:['saledata'],
    mounted(){
      console.log(this.saledata[0].sale2)
     let list=[]
      for (let i = 0;i<this.saledata.length; i++) {
      list.push(this.saledata[i].sale2)
      }
      console.log(list)
      this.chart=echarts.init(document.getElementById("sale"));
      const option = {
        title : {
          text: '套餐月销售量',
          subtext: '数据纯属虚构'
        },
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['套餐1','套餐2','套餐3','套餐4']
        },
        toolbox: {
          show : true,
          feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'套餐1',
            type:'bar',
            data:list,
            markPoint : {
              data : [
/*                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}*/
              ]
            },
            markLine : {
              data : [
                {type : 'average', name: '平均值'}
              ]
            }
          },
          {
            name:'套餐2',
            type:'bar',
/*            data:list,*/
            markPoint : {
              data : [
 /*               {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}*/
              ]
            },
            markLine : {
              data : [
                {type : 'average', name : '平均值'}
              ]
            }
          },
          {
            name:'套餐3',
            type:'bar',
   /*         data:list,*/
            markPoint : {
              data : [
/*                {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}*/
              ]
            },
            markLine : {
              data : [
                {type : 'average', name : '平均值'}
              ]
            }
          },
          {
            name:'套餐4',
            type:'bar',
/*            data:list,*/
            markPoint : {
              data : [
/*                {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}*/
              ]
            },
            markLine : {
              data : [
                {type : 'average', name : '平均值'}
              ]
            }
          }
        ]
      };
      this.chart.setOption(option)
    },
        data() {
            return {
              chart:null
            }
        }
    }
</script>
<style>

</style>
