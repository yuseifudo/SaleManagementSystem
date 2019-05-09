<template>
  <div class="chart-container">
    <div ref="chart" style="height: 100%;width:100%">
      </div>

    </div>
</template>
<!--<script src="https://www.echartsjs.com/asset/theme/dark.js"></script>-->
<script>
  import echarts from 'echarts'
  import Mock from 'mockjs'
    export default {
        data() {
            return {
              chart:null,
              option:null,
              salesVolumeList:[],
              salesVolume1:[],
              salesVolume2:[],
              salesVolume3:[],
              salesVolume4:[],
              dataMap:[]


            }
        },
      mounted(){
          let salesVolumeInfo=Mock.mock({
            'data|12':[
              {
                salesVolumeNumber1:'@integer(50,100)',
                salesVolumeNumber2:'@integer(50,100)',
                salesVolumeNumber3:'@integer(50,100)',
                salesVolumeNumber4:'@integer(50,100)',


              }
            ]
          })
        this.salesVolumeList=salesVolumeInfo.data
        // console.log(this.salesVolumeList)
        this.salesVolume1.push('天王卡')
        this.salesVolume2.push('地王卡')
        this.salesVolume3.push('大冰神卡')
        this.salesVolume4.push('小冰神卡')
        for( var i=0;i<this.salesVolumeList.length;i++){
          this.salesVolume1.push(this.salesVolumeList[i].salesVolumeNumber1)
          this.salesVolume2.push(this.salesVolumeList[i].salesVolumeNumber2)
          this.salesVolume3.push(this.salesVolumeList[i].salesVolumeNumber3)
          this.salesVolume4.push(this.salesVolumeList[i].salesVolumeNumber4)
        }
        this.dataMap.push(['月份', '1', '2', '3', '4', '5', '6','7','8','9','10','11','12']);
        this.dataMap.push(this.salesVolume1)
        this.dataMap.push(this.salesVolume2)
        this.dataMap.push(this.salesVolume3)
        this.dataMap.push(this.salesVolume4)

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
          dataset:
            {
              source:this.dataMap
          },
          xAxis: {
            type: 'category',
            // data:['1','2','3','4','5','6','7','8','9','10','11','12']
          },
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: [
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              // data:this.salesVolume1
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              // data:this.salesVolume2

            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              // data:this.salesVolume3
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              // data:this.salesVolume4
            },
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
