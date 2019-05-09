<template>
<div id="num" style="width: 50% ;height: 400px; display: inline-block"  ></div>
</template>
<script>
  import echarts from 'echarts'
  import {getSaleList} from '@/api/salereportTable'
  export default {
    data() {
      return {
        chart:null,
        sale1total:0,
        sale2total:0,
        sale3total:0,
        sale4total:0,
        data : [{
          "name": "套餐1",
          "value": ''
          },
          {
            "name": "套餐2",
            "value": ''
          },
          {
            "name": "套餐3",
            "value": ''
          }, {
            "name": "套餐4",
            "value": ''
          },
        ],
        total:'',
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
          for (var j = 0; j < obj.length; j++) {
            this.sale1total=parseInt(obj[j].sale1)+this.sale1total;
            this.sale2total=parseInt(obj[j].sale2)+this.sale2total;
            this.sale3total=parseInt(obj[j].sale3)+this.sale3total;
            this.sale4total=parseInt(obj[j].sale4)+this.sale4total;
          }
          this.total=this.sale1total+this.sale2total+this.sale3total+this.sale4total
          /*this.data[0].value=(this.sale1total/this.total*100).toFixed(2);*/
          this.data[0].value=this.sale1total
          this.data[1].value=this.sale2total
          this.data[2].value=this.sale3total
          this.data[3].value=this.sale4total
          this.chart=echarts.init(document.getElementById("num"));
          const option = {
            tooltip:{
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: ['#d53a35', '#2f4554', '#61a0a8', '#d48265', "rgba(250,250,250,0.3)"],
            /*        backgroundColor: '#cdd0d5',*/
            title: {
              text: '总销售额',
              subtext: this.total,
              textStyle: {
                color: 'black',
                fontSize: 20,
                // align: 'center'
              },
              subtextStyle: {
                fontSize: 24,
                color: ['#ff9d19']
              },
              x: 'center',
              y: 'center',
            },
            grid: {
              bottom: 150,
              left: 100,
              right: '10%'
            },
            legend: {
              orient: 'vertical',
              top: "middle",
              right: "5%",
              textStyle: {
                color: 'black',
                fontSize: 15,

              },
              icon: 'roundRect',
              data: this.data,
            },
            series: [
              // 主要展示层的
              {
                radius: ['30%', '61%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                  normal: {
                    show: true,
                    formatter: "{c}",
                    textStyle: {
                      fontSize: 24,

                    },
                    position: 'outside'
                  },
                  emphasis: {
                    show: true
                  }
                },
                labelLine: {
                  normal: {
                    show: true,
                    length: 30,
                    length2: 55
                  },
                  emphasis: {
                    show: true
                  }
                },
                name: "年销售额占比",
                data: this.data,

              },
              // 边框的设置
              {
                radius: ['30%', '34%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                animation: false,
                tooltip: {
                  show: false
                },
                data: [{
                  value: 1,
                  itemStyle: {
                    color: "rgba(250,250,250,0.3)",
                  },
                }],
              }, {
                name: '外边框',
                type: 'pie',
                clockWise: false, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                center: ['50%', '50%'],
                radius: ['65%', '65%'],
                label: {
                  normal: {
                    show: false
                  }
                },
                data: [{
                  value: 9,
                  name: '',
                  itemStyle: {
                    normal: {
                      borderWidth: 2,
                      borderColor: '#0b5263'
                    }
                  }
                }]
              },
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
