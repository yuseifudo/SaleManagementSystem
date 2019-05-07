<template>
  <div>
  <div style="width: 100%;height: 500px;border:1px solid rgb(180,180,180)" id="echartss"></div>
  <div style="width: 100%;height: 500px;border:1px solid rgb(180,180,180)" id="echartzz"></div>
    <div style="width: 100%;height: 500px;border:1px solid rgb(180,180,180)" id="sandian"></div>

  </div>
</template>
<script> //先要导入依赖的实例
import echarts from 'echarts'
//挂载前初始化echarts实例
export default {
  mounted: function () {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echartss'))
    // 绘制图表，this.echarts1_option是数据
    myChart.setOption(this.echarts1_option)

    let myChart1 = echarts.init(document.getElementById('echartzz'))
    // 绘制图表，this.echarts1_option是数据
    myChart1.setOption(this.option)

    let myChart2 = echarts.init(document.getElementById('sandian'))
    // 绘制图表，this.echarts1_option是数据
    myChart2.setOption(this.option1)

  },
//在echarts_option中写东西就行了，官方文档直接下这里就可以自己玩了
  data() {
    var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
    var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
    var yMax = 500;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }
    var data = [
      [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
      [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
    ];
    return {

      echarts1_option: {
        //需要的话下面内容copy到主体代码块即可
        backgroundColor: '#45515a',
        //标题
        title: {
          text: '总利润',
          subtext: '饼图示例',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc',
            fontStyle: 'italic',
            //标题字体
          }
        },
        //弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: 'item',
          //以具体项目触发弹窗
          /* 内容格式器，一共有abcd四个代号，例如在饼图中，
          {a}指系列，即流量来源，{b}指数据项目，如搜索引擎，
          {c}指数值，如  value，{d}百分比。{x}本身代表了相应字符，
          可以和其他字符拼凑，在弹窗中显示    */
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例，选择要显示的项目
        legend: {
          orient: 'vertical', left: 'left', textStyle: {color: '#c8c8d0'},
          data: ['天王卡', '帝王卡', '小冰神卡', '大冰神卡', '腾讯王卡']  //注意要和数据的name相对应
        },
        //工具箱
        toolbox: {
          show: true,
          //显示工具箱
          feature: {
            dataView: {show: true}, //以文字形式显示数据
            restore: {show: true},   //还原
            // dataZoom:{show:true}, //区域缩放
            saveAsImage: {show: true},  //保存图片
            // magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
          }
        },
        //视觉映射组件，将数据映射到视觉元素上
        visualMap: {
          show: false,
          min: 10,
          max: 650,
          dimension: 0, //选取数据的维度，如人数据：[身高，体重]，则1代表将体重进行映射，默认值为数组的最后一位    //seriesIndex: 4,//选取数据集合中的哪个数组，如{一班}，{二班}，默认选取data中的所有数据集
          inRange: {
            //选定了要映射的对象，用inRange详细写要渲染的具体细节，[x，y]中x指最小值对应的量（亮度，饱和度等），y指最大值对应的量，其余的按各自value线性渲染
            color: ['red'],
            colorLightness: [0, 1],
            colorSaturation: [0, 1]
          }
        },
        //数据
        series: [
          {
            name: '销售量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 335, name: '天王卡'},
              {value: 310, name: '帝王卡'},
              {value: 274, name: '小冰神卡'},
              {value: 235, name: '大冰神卡'},
              {value: 400, name: '腾讯王卡'}
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            //角度和半径展现百分比，'area'只用半径展现
            label: {
              //饼图图形的文本标签
              normal: {
                //下同，normal指在普通情况下样式，而非高亮时样式
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              //引导线样式
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.5,
                //0-1，越大越平滑弯曲
                length: 10,
                //从块到文字的第一段长
                length2: 20
                //拐弯到文字的段长
              }
            },
            itemStyle: {
              //图例样式
              normal: {
                color: '#97413c',
                shadowBlur: 50,
                //阴影模糊程度
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                //阴影颜色，一般黑
              }
            },
            animationType: 'scale', //初始动画效果，scale是缩放，expansion是展开
            animationEasing: 'elasticOut', //初始动画缓动效果
            animationDelay: function (idx) {//数据更新动画时长，idx限定了每个数据块从无到有的速度
              return Math.random() * 200;
            }
          }
        ]
      },
        option :{
          title: {
            text: '触点营销月总销售额',
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              inside: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: data
            }
          ]
        },
      option1 :{
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
          offset: 0,
          color: '#f7f8fa'
        }, {
          offset: 1,
          color: '#cdd0d5'
        }]),
        title: {
          text: '1990 与 2015 年各国家人均寿命与 GDP'
        },
        legend: {
          right: 10,
          data: ['1990', '2015']
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          scale: true
        },
        series: [{
          name: '1990',
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
                color: 'rgb(251, 118, 123)'
              }, {
                offset: 1,
                color: 'rgb(204, 46, 72)'
              }])
            }
          }
        }, {
          name: '2015',
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
                color: 'rgb(129, 227, 238)'
              }, {
                offset: 1,
                color: 'rgb(25, 183, 207)'
              }])
            }
          }
        }]
      }
    }
  },
}
</script>

<style>

</style>
