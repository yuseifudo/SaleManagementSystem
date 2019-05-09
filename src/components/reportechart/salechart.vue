<template>
  <div id="sale" style="width: 50% ; height: 400px ; display:inline-block;"></div>
</template>
<script>
  import echarts from 'echarts'
  import {getSaleList} from '@/api/salereportTable'
  export default {
    data() {
      return {
        chart:null,
        sale1Data:[],
        sale2Data:[],
        sale3Data:[],
        sale4Data:[],
      }
    },
    mounted(){
      this.getSaleList();
    },
    methods:{
      //获取月销售额列表
      getSaleList() {
        getSaleList().then(res => {
          var datas = res.data.lists
          var obj = eval(datas);//转换为JSON对象
          for (var i = 0; i < obj.length; i++) {
            this.sale1Data.push(obj[i].sale1);
            this.sale2Data.push(obj[i].sale2);
            this.sale3Data.push(obj[i].sale3);
            this.sale4Data.push(obj[i].sale4);
          }
          this.chart=echarts.init(document.getElementById("sale"));
          const option = {
            title : {
              text: '套餐月销售量',
              subtext: ''
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
                name:'销售量/份',
                type : 'value',
                min: 0,
                max: 150,
                interval: 30,
              }
            ],
            series : [
              {
                name:'套餐1',
                type:'bar',
                data:this.sale1Data,
                markPoint : {
                  data : [

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
                data:this.sale2Data,
                markPoint : {
                  data : [
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
                data:this.sale3Data,
                markPoint : {
                  data : [
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
                data:this.sale4Data,
                markPoint : {
                  data : [
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
          //完成图表绘制的配置
          this.chart.setOption(option)
        })
      },
    }
  }
</script>
<style>

</style>
