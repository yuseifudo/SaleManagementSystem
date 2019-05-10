<template>
  <div id="main" style="width:100%;height:400px;"></div>
</template>
<script>
  import echarts from 'echarts'
    export default {
      data() {
        return {
          chart: null
        }
      },
      mounted() {

        var data = [
          [[13,77,17096869,'一月',],[222,77.4,27662440,'二月',],[323,68,1154605773,'三月',],[42,74.7,852465773,'四月',],
            [54,75,34986705,'五月',],[36,77.1,56943299,'六月',],[75,75.4,78958237,'七月',],[83,78.1,92254830,'八月',],
            [195,57.7,870601776,'九月',],[40,79.1,122249285,'十月',],[141,67.9,20194354,'十一月',],[142,72,42972254,'十二月',],],



            [[156,77,17097869,'一月',],[267,77.4,27672440,'二月',],[38,68,754685773,'三月',],[4,74.7,10588282,'四月',],
              [55,75,54696705,'五月',],[61,77.1,56974399,'六月',],[66,75.4,78582387,'七月',],[86,78.1,25873065,'八月',],
              [122,57.7,876701776,'九月',],[120,79.1,122279285,'十月',],[181,67.9,209468354,'十一月',2005],[312,72,54297254,'十二月',],],


          [[13,77,1709869,'一月',],[22,77.4,32762440,'二月',],[33,68,10588282,'三月',],[221,74.7,654765773,'四月',],
            [335,75,4967705,'五月',],[56,77.1,15694399,'六月',],[27,75.4,78588237,'七月',],[82,78.1,12588530,'八月',],
            [99,57.7,87601776,'九月',],[210,79.1,112229285,'十月',],[11,67.9,32094354,'十一月',2005],[132,72,42978254,'十二月',],],


            [[133,77,13709869,'一月',],[42,77.4,27362440,'二月',],[53,68,27662440,'三月',],[24,74.7,31058282,'四月',],
            [25,75,24396705,'五月',],[76,77.1,53694399,'六月',],[57,75.4,17858237,'七月',],[228,78.1,77225830,'八月',],
            [79,57.7,187601776,'九月',],[190,79.1,112229285,'十月',],[311,67.9,21094354,'十一月',2005],[172,72,14297254,'十二月',],]
        ];

        const option = {
/*          backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
            offset: 0,
            color: '#f7f8fa'
          }, {
            offset: 1,
            color: '#cdd0d5'
          }]),*/
          title: {
            text: '套餐销量销售额利润气泡图'
          },
          legend: {
            right: 10,
            data: ['天王卡', '帝王卡','大冰神卡', '小冰神卡']
          },
          xAxis: {
          name:'销售额/万元',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          yAxis: {
            name:'销售量/份',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            scale: true
          },
          series: [{
            name: '天王卡',
            data: data[0],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                  offset: 0,
                  color: 'rgb(213, 58, 53)'
                }, {
                  offset: 1,
                  color: 'rgb(204, 46, 72)'
                }])
              }
            }
          }, {
            name: '帝王卡',
            data: data[1],
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                  offset: 0,
                  color: 'rgb(47, 69, 84)'
                }, {
                  offset: 1,
                  color: 'rgb(67, 70, 87)'
                }])
              }
            }
          },
            {
              name: '大冰神卡',
              data: data[2],
              type: 'scatter',
              symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
              },
              label: {
                emphasis: {
                  show: true,
                  formatter: function (param) {
                    return param.data[3];
                  },
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(25, 100, 150, 0.5)',
                  shadowOffsetY: 5,
                  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(97, 160, 168)'
                  }, {
                    offset: 1,
                    color: 'rgb(95, 183, 177)'
                  }])
                }
              }
            },
            {
              name: '小冰神卡',
              data: data[3],
              type: 'scatter',
              symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
              },
              label: {
                emphasis: {
                  show: true,
                  formatter: function (param) {
                    return param.data[3];
                  },
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(25, 100, 150, 0.5)',
                  shadowOffsetY: 5,
                  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(212, 130, 101)'
                  }, {
                    offset: 1,
                    color: 'rgb(210 ,110, 91)'
                  }])
                }
              }
            }
          ]
        };
        this.chart = echarts.init(document.getElementById("main"));
        this.chart.setOption(option)
      }
    }
</script>
<style>

</style>
