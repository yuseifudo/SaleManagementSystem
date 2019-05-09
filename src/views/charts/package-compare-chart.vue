<template>
  <div>
  <p class="warn-content">
    套餐对比图
  </p>
  <ve-pie :data="chartData"></ve-pie></div>
</template>

<script>
  import { fetchList } from '@/api/packageCompareChart.js'
  export default {
    data() {
      return {
        chartData: {
          columns: ['套餐', 'sales'],
          rows: []
        }
      }
    },
    created() {
      fetchList().then((config) => {
        const { data } = config
        console.log(data)
        const { columns } = this.chartData
        this.chartData = { columns, rows: data }
      })
    }
  }
</script>
