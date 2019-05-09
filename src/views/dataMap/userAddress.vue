<!--
  功能：各地市用户数量分布统计图
  作者：王震
  时间：2019.5.8
-->

<template>
  <div class="chart-container">
  <div ref="chart" style="width: 100%;height:100%;"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  //import resize from '../../components/charts/mixins/resize'
  import '../../../node_modules/echarts/map/js/province/fujian'

    export default {
       //mixins: [resize],
       //props:{mixins:resize},
      data() {
        return {
          chart: null,
        }
      },
      mounted(){
        this.chart = echarts.init(this.$refs.chart)
        let data = [
          {name: '福州市', value: 375005},
          {name: '厦门市', value: 769547},
          {name: '漳州市', value: 443186},
          {name: '泉州市', value: 1036992},
          {name: '宁德市', value: 414540},
          {name: '三明市', value: 518068},
          {name: '龙岩市', value: 314659},
          {name: '南平市', value: 623807},
          {name: '莆田市', value: 181504},
        ];

        let geoCoordMap = {
          "福州市": [119.306239, 26.075302],
          "厦门市": [118.11022, 24.490474],
          "龙岩市": [117.02978, 25.091603],
          "泉州市": [118.589421, 24.908853],
          "漳州市": [117.661801, 24.510897],
          "南平市": [118.178459, 26.635627],
          "宁德市": [119.527082, 26.65924],
          "莆田市": [119.007558, 25.431011],
          "三明市": [117.635001, 26.265444]

        };

        let convertData = function(data) {
          let res = [];
          for (let i = 0; i < data.length; i++) {
            let geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              });
            }
          }
          return res;

        };
        let convertedData = [
          convertData(data),
          convertData(data.sort(function(a, b) {
            return b.value - a.value;
          }).slice(0, 6))
        ];
        data.sort(function(a, b) {
          return a.value - b.value;
        })

        //let selectedItems = [];
        let categoryData = [];
        let barData = [];
//   let maxBar = 30;
        let sum = 0;
        let count = data.length;
        for (let i = 0; i < data.length; i++) {
          categoryData.push(data[i].name);
          barData.push(data[i].value);
          sum += data[i].value;
        }
        console.log(categoryData);
        console.log(sum + "   " + count)

        function renderBrushed(params) {
          let mainSeries = params.batch[0].selected[0];

          let selectedItems = [];
          let categoryData = [];
          let barData = [];
          let maxBar = 30;
          let sum = 0;
          let count = 0;

          for (let i = 0; i < mainSeries.dataIndex.length; i++) {
            let rawIndex = mainSeries.dataIndex[i];
            let dataItem = convertedData[0][rawIndex];
            let pmValue = dataItem.value[2];

            sum += pmValue;
            count++;

            selectedItems.push(dataItem);
          }

          selectedItems.sort(function(a, b) {
            //   return b.value[2] - a.value[2];
            return a.value - b.value;
          });

          for (let i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
            categoryData.push(selectedItems[i].name);
            barData.push(selectedItems[i].value[2]);
          }

          this.setOption({
            yAxis: {
              data: categoryData
            },
            xAxis: {
              axisLabel: {
                show: !!count
              }
            },
            title: {
              id: 'statistic',
              text: count ? '平均: ' + (sum / count).toFixed(4) : ''
            },
            series: {
              id: 'bar',
              //        sort:'descending',
              data: barData
            }
          });
        }
        let option = {
          backgroundColor: '#37474f',
          animation: true,
          animationDuration: 1000,
          animationEasing: 'cubicInOut',
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'cubicInOut',
          title: [{
            text: '福建联通各地市用户人群分布情况',
            link: 'http://pages.anjuke.com/expert/newexpert.html',
            subtext: 'data from fujian',
            sublink: 'http://pages.anjuke.com/expert/newexpert.html',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          }, {
            id: 'statistic',
            text: count ? '用户人数: ' + parseInt((sum / count).toFixed(4)) : '',
            right: 120,
            top: 40,
            width: 100,
            textStyle: {
              color: '#fff',
              fontSize: 16
            }
          }],
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'left',
            top: 'center',
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            },
            iconStyle: {
              normal: {
                borderColor: '#fff'
              },
              emphasis: {
                borderColor: '#b1e4ff'
              }
            },
            feature: {
              dataZoom: {},
              brush: {
                type: ['rect', 'polygon', 'clear']
              },
              saveAsImage: {
                show: true
              }
            }
          },
          brush: {
            outOfBrush: {
              color: '#abc'
            },
            brushStyle: {
              borderWidth: 1,
              color: 'rgba(0,0,0,0.2)',
              borderColor: 'rgba(0,0,0,0.5)',
            },
            seriesIndex: [0, 1],
            throttleType: 'debounce',
            throttleDelay: 300,
            geoIndex: 0
          },
          geo: {
            map: '福建',
            left: '10',
            right: '35%',
             center: [117.635001, 26.265444],
            zoom: 0.7,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true,

            itemStyle: {
              normal: {
                borderColor: 'rgba(147, 235, 248, 1)',
                borderWidth: 1,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(128, 217, 248, 1)',
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10
              },
              emphasis: {
                areaColor: '#389BB7',
                borderWidth: 0
              }
            },
          },
          tooltip: {
            trigger: 'item',
            formatter:"{b}：{c}"
          },
          grid: {
            right: 40,
            top: 100,
            bottom: 40,
            width: '30%'
          },
          xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#aaa'
              }
            },
          },
          yAxis: {
            type: 'category',
            //  name: 'TOP 20',
            nameGap: 16,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#ddd'
              }
            },
            data: categoryData
          },
          series: [{

            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertedData[0],
            symbolSize: function(val) {
              return Math.max(val[2] / 6000, 8);
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#dd5627',
                position: 'right',
                show: true
              }
            }
          }, {
            //  name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertedData[0],
            symbolSize: function(val) {
              return Math.max(val[2] / 13000, 8);
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
              }
            },
            zlevel: 1
          }, {
            id: 'bar',
            zlevel: 2,
            type: 'bar',
            symbol: 'none',
            barWidth : 20,
            itemStyle: {
              normal: {
                color: '#dd5627'
              }
            },

            data: data
          }]
        };
        this.chart.setOption(option)
      }

  }

</script>
<style>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
    text-align: center;
  }
</style>
