<!--author:shilongcheng date:2017-05-05 function:"套餐管理页面"-->
<template>
<!--  套餐管理父组件-->
    <div class="app-container">
      <div class="item">
        <h4>套餐管理</h4>
<!--        套餐管理子组件引入-->
        <nxPackageLists></nxPackageLists>
        <h4>套餐销售数据一览</h4>
<!--        显示套餐销售数据图表引入-->
        <nxPackageCharts></nxPackageCharts>
      </div>
    </div>
</template>
<script>
  import nxPackageLists from '@/components/nx-info-manage/nx-package-manage/nx-package-list'
  import nxPackageCharts from '@/components/nx-info-manage/nx-package-manage/nx-package-charts'
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
