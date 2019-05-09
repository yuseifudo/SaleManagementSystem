<template>
    <div >
      <div class="itema" style="width: 50%">
        <PackageChart></PackageChart>
      </div>
      <div class="itemb" style="width: 50%">
        <PackageCompareChart></PackageCompareChart>
      </div>
      <div  style="width:100%">
        <SaleResultChart></SaleResultChart>
      </div>
    </div>
</template>
<script>
  import PackageChart from '@/views/charts/package-chart.vue'
  import PackageCompareChart from '@/views/charts/package-compare-chart'
  import SaleResultChart from '@/views/charts/salesResult-chart.vue'
    export default {
        data() {
            return {msg: 'vue 模板页'}
        },
        components:{
          PackageChart,
          PackageCompareChart,
          SaleResultChart
        }
    }
</script>
<style>
.itema{
 float: left;
}
.itemb{
  float: right;
}
</style>
