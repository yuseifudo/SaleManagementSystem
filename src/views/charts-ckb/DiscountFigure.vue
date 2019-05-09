<template>
  <div>
    <p class="warn-content">
      销售业绩图
    </p>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
  import { fetchData } from '@/api/DiscountFigure'

  export default {
    data() {
      return {
        chartData: {
          columns: ['月份', '天王卡', '地王卡', '大冰神卡', '小冰神卡'],
          rows: []
        }
      }
    },
    created() {
      fetchData().then((config) => {
        const { data } = config
        console.log(data)
        const { columns } = this.chartData
        this.chartData = { columns, rows: data }
      })
    }
}
</script>
