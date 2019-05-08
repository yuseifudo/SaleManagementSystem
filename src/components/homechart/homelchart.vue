<template>
  <div id="id1" :class="className" :style="{height:height,width:width}" />
</template>

<script>
    import echarts from 'echarts'
    import { getLchartData } from '@/api/homeTable'
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
        },
      },
      data() {
        return {
          chart:null,
          lChartData:[],
          yyName:[],
          dxName:[],
          llName:[],
          yyData:[],
          dxData:[],
          llData:[],
        }
      },
      mounted(){
        this.getLchartData();
      },
      methods:{
        getLchartData() {
          getLchartData().then(res => {
            var lChartData = res.data.lChartData
            var obj = eval(lChartData);//转换为JSON对象
            for (var i = 0; i < obj.length; i++) {
              this.yyName.push(obj[i].yyname);
              this.yyData.push(obj[i].yuyin);
              this.dxName.push(obj[i].dxname);
              this.dxData.push(obj[i].duanxin);
              this.llName.push(obj[i].llname);
              this.llData.push(obj[i].liuliang);
              // Arr.push({"name": obj[i].name});
              // ArrData.push({"data": obj[i].number});
            }
            this.chart=echarts.init(document.getElementById("id1"));
            const option = {
              title : {
                text: '语音短彩信流量消耗数据',
                // subtext: '单位：亿',
                x:'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  crossStyle: {
                    color: '#999'
                  }
                }
              },
              toolbox: {
                feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
                }
              },
              legend: {
                data:['移动话音','短信彩信','移动数据'],
                x:'center',
                y:'bottom'
              },
              xAxis: [
                {
                  type: 'category',
                  data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                  axisPointer: {
                    type: 'shadow'
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  name: ['话音/分钟','短信/条'],
                  min: 0,
                  max: 250,
                  interval: 50,
                  axisLabel: {
                    formatter: '{value} 亿'
                  }
                },
                {
                  type: 'value',
                  name: '流量：Mb',
                  min: 0,
                  max: 25,
                  interval: 5,
                  axisLabel: {
                    formatter: '{value} 万亿'
                  }
                }
              ],
              series: [
                {
                  name:'移动话音',
                  type:'bar',
                  data:this.yyData
                  // [126, 219, 190, 154, 207, 170.7, 175.6, 182.2, 148.7, 188, 166.0, 222.3]
                },
                {
                  name:'短信彩信',
                  type:'bar',
                  data:this.dxData
                    // [80, 94, 70, 232, 215, 176, 135.2, 162.2, 132.6, 100, 94, 133]
                },
                {
                  name:'移动数据',
                  type:'line',
                  yAxisIndex: 1,
                  data:this.llData
                    // [20.0, 20.2, 23.3, 18.5, 16.3, 20.2, 20.3, 23.4, 23.0, 16.5, 12.0, 16.2]
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
