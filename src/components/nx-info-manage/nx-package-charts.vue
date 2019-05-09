<template>
    <div id="packageChart" style="width: 100%;height:400px;">

    </div>
</template>
<script>
  import echarts from 'echarts'
  import {
    fetchList,
  }from '@/api/packageManage.js'
    export default {
        data() {
          return {
            chart: null,
            packageData:{},
            option:{},
            dataTitle:[],
            dataItems:[]
          }
        },
        mounted() {
          this.getPackageList()



        },
        methods:{
          getPackageList(){
            fetchList().then((res)=>{
              if (res.code==0){
                this.packageData=res.data;
                this.chart = echarts.init(document.getElementById("packageChart"));

                console.log(this.packageData)
                for (let i=0;i<this.packageData.length;i++){
                  this.dataTitle.push(this.packageData[i].name)
                  this.dataItems.push({value:this.packageData[i].number,name:this.packageData[i].name})
                }
                console.log(this.dataTitle)
                console.log(this.dataItems)
                this.option = {
                  title: {
                    text: '全国热销套餐',
                    subtext: '单位：百万',
                    x: 'center'
                  },
                  tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                  },
                  toolbox: {
                    show : true,
                    feature : {
                      mark : {show: true},
                      dataView : {show: true, readOnly: false},
                      magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                      },
                      restore : {show: true},
                      saveAsImage : {show: true}
                    }
                  },
                  legend: {
                    orient: 'horizontal',
                    x: 'center',
                    y: 'bottom',
                    data:this.dataTitle
                  },
                  calculable : true,
                  series : [
                    {
                      name:'套餐销售占比一览',
                      type:'pie',
                      radius : [30, 110],
                      center : ['50%', '50%'],
                      roseType : 'area',
                      data:this.dataItems
                    }
                  ]
                }
                //完成图表绘制的配置
                console.log(this.chart)
                this.chart.setOption(this.option);
                console.log(this.chart)
                console.log(this.option)
              }
              else{
                this.$message({
                  message: res.message,
                  type: 'error'
                })
                return;
              }
            })
          },
        }
    }
</script>
<style>

</style>
