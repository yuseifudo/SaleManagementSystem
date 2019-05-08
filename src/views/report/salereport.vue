<template>
  <div>
      <div>
          <salechart :saledata="saledata"></salechart>
          <valuechart></valuechart>
      </div>
      <solidchart></solidchart>
  </div>

</template>
<script>
  import salechart from '@/components/reportechart/salechart'
  import valuechart from '@/components/reportechart/valuechart'
  import solidchart from '@/components/reportechart/solidchart'
  import {getSaleList} from '@/api/salereportTable'
  export default {
    data() {
      return {
        saledata:[],
      }
    },
    components: {
      salechart,
      solidchart,
      valuechart,
    },
    mounted() {
      this.getSales()
    },
    methods: {
      // 获取用户列表
      getSales() {
        getSaleList().then(res => {
          this.saledata = res.data.lists
        })
      }
    }
  }
</script>
<style>

</style>
