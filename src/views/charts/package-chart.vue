<template>
  <div>
    <p class="warn-content">
      套餐销售量
    </p>
    <ve-histogram :data="chartData"></ve-histogram>
  </div>
</template>

<script>
  import { fetchSales } from '@/api/PackageChart.js'
export default {
    data() {
      return {
        chartData: {
          columns: ['套餐', '销售量', '销售额'],
          rows: []
        }
      }
    },
    created() {
      fetchSales().then((config) => {
        const { data } = config
        console.log(data)
        const { columns } = this.chartData
        this.chartData = { columns, rows: data }
      })
    }
}
</script>
