<template>
  <div id="id2" :class="className" :style="{height:height,width:width}" />
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
          chart:null,
        }
      },
      mounted() {
        //初始化echarts图表实例
        this.chart = echarts.init(document.getElementById("id2"));
        const option = {
          title : {
            text: '全国热销套餐',
            subtext: '单位：百万',
            x:'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              // magicType: {show: true, type: ['pie','funnel']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            data:['腾讯王卡','蚂蚁宝卡','京东强卡','工行E卡','百度圣卡','滴滴橙卡']
          },
          series: [
            {
              name:'售出占比',
              type:'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'腾讯王卡', selected:true},
                {value:679, name:'蚂蚁宝卡'},
                {value:1548, name:'京东强卡'}
              ]
            },
            {
              name:'售出占比',
              type:'pie',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  shadowBlur:3,
                  shadowOffsetX: 2,
                  shadowOffsetY: 2,
                  shadowColor: '#999',
                  padding: [0, 7],
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data:[
                {value:335, name:'工行E卡'},
                {value:310, name:'百度圣卡'},
                {value:234, name:'滴滴橙卡'},
                // {value:135, name:'阿里钉钉卡'},
                // {value:1048, name:'百度'},
                // {value:251, name:'谷歌'},
                // {value:147, name:'必应'},
                // {value:102, name:'其他'}
              ]
            }
          ]
        };
        //完成图表绘制的配置
        this.chart.setOption(option);
      }
    }
</script>

<style>

</style>
