<template>
    <div style="width: 100%;height: 500px;border:1px solid rgb(180,180,180)" id="yearmap"></div>
</template>
<script type="text/javascript">
  import echarts from 'echarts'
  import {getUserList} from '@/api/monreportTable'
  export default {
 /*   mounted: function(){
      let myChart = echarts.init(document.getElementById('yearmap'))
      // 绘制图表，this.echarts1_option是数据
      myChart.setOption(this.option)
    },*/
    mounted(){
      this.demo()
      this.getUsers()
      console.log(this.users+"aa")
    },
    methods:{
      demo(){
        let myChart = echarts.init(document.getElementById('yearmap'))
        // 绘制图表，this.echarts1_option是数据
        myChart.setOption(this.option)
      },
    getUsers() {
    getUserList().then(res => {
      this.users = res.data.lists
    })
      return this.users
   },
    },
    data (){
      return{
        option : {
          title:{
            text:'套餐销量'
          },
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015','2016'],
              ['天王卡', 111, 30.4, 65.1, 53.3],
              ['帝王卡', 86.5, 92.1, 85.7, 83.1],
              ['小冰神卡', 24.1, 67.2, 79.5, 86.4],
              ['大冰神卡', 24.1, 67.2, 79.5, 86.4]
            ]
          },
          xAxis: [
            {type: 'category', gridIndex: 0},
            {type: 'category', gridIndex: 1}
          ],
          yAxis: [
            {gridIndex: 0},
            {gridIndex: 1}
          ],
          grid: [
            {bottom: '55%'},
            {top: '55%'}
          ],
          series: [
            // These series are in the first grid.
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            {type: 'bar', seriesLayoutBy: 'row'},
            // These series are in the second grid.
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
            {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
          ]
        }
      }
    }
  }
</script>
