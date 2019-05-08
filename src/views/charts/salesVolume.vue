<template>
  <div class="chart-container">
    <div ref="chart" style="height: 100%;width:100%">
      </div>

    </div>
</template>
<!--<script src="https://www.echartsjs.com/asset/theme/dark.js"></script>-->
<script>
  import echarts from 'echarts'
    export default {
        data() {
            return {
              chart:null,
              option:null

            }
        },
      mounted(){
        //实例化echarts
        let mychart = echarts.init(this.$refs.chart,);
        //定义echarts的option
        let option = {
          legend: {
            x:'center',
            y:'center'

          },
          title : {
            text: '2018年套餐销售金额对比图',
            subtext: '单位：百万',

            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: [
              ['月份', '1', '2', '3', '4', '5', '6','7','8','9','10','11','12'],
              ['天王卡', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7,83.1, 73.4, 55.1,55.2, 67.1, 69.2],
              ['地王卡', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1,24.1, 67.2, 79.5,72.4, 53.9, 38],
              ['大冰神卡', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5,65.1, 53.3, 83.8,83.1, 73.4, 55.1],
              ['小冰神卡', 55.2, 67.1, 69.2, 72.4, 53.9, 38,92.1, 85.7, 83.1,53.3, 83.8,83.1]
            ]
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: [
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {type: 'line', smooth: true, seriesLayoutBy: 'row'},
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '30%'],
              label: {
                formatter: '{b}: {@2019} ({d}%)'
              },
              encode: {
                itemName: '月份',
                value: '2019',
                tooltip: '2019'
              }
            }
          ]
        };


        mychart.on('updateAxisPointer', function (event) {
          var xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            mychart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });

        this.option=option;
        mychart.setOption(option);
  }
}
</script>
<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);

  }
</style>
