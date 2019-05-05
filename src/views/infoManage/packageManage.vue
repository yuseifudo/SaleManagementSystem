<!--author:shilongcheng date:2017-05-05 function:"套餐管理页面"-->
<template>
    <div class="app-container">
      <div class="item">
        <h4>套餐管理</h4>
        <nxPackageLists></nxPackageLists>
      </div>
    </div>
</template>
<script>
  import nxPackageLists from '@/components/nx-info-manage/nx-package-list.vue'
    export default {
        data() {
            return {

            }
        },
        components:{
          nxPackageLists
        }

    }
</script>
<style>
  @import '../../styles/data-card.scss';
</style>
