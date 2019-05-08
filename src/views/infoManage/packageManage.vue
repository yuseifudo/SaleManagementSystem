<!--author:shilongcheng date:2017-05-05 function:"套餐管理页面"-->
<template>
    <div class="app-container">
      <div class="item">
        <h4>套餐管理</h4>
        <nxPackageLists></nxPackageLists>
        <h4>套餐销售数据一览</h4>
        <nxPackageCharts></nxPackageCharts>
      </div>
    </div>
</template>
<script>
  import nxPackageLists from '@/components/nx-info-manage/nx-package-list.vue'
  import nxPackageCharts from '@/components/nx-info-manage/nx-package-charts.vue/'
    export default {
        data() {
            return {

            }
        },
        components:{
          nxPackageLists,
          nxPackageCharts
        },

    }
</script>
<style>
  @import '../../styles/data-card.scss';
</style>
