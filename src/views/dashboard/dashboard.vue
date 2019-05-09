<template>
  <div class="app-container">
    <div class="item">
      <h4>销售数据</h4>
      <nx-data-display></nx-data-display>
    </div>
    <div class="item">
      <h4>热销套餐</h4>
      <nx-data-tabs></nx-data-tabs>
    </div>
    <div class="item">
      <h4>图表展示</h4>
      <div class="itemq" style="height: 325px;border: 1px solid lightgray">
        <homelchart height="100%" width="100%"></homelchart>
      </div>
      <div class="itemq" style="height: 325px;border: 1px solid lightgray">
        <homerchart height="100%" width="100%"></homerchart>
      </div>
    </div>
    <div class="item">
      <div class="itemq" style="height: 325px;border: 1px solid lightgray">
        <homelbchart height="100%" width="100%"></homelbchart>
      </div>
      <div class="itemq" style="height: 325px;border: 1px solid lightgray;margin-bottom: 25px">
        <homerbchart height="100%" width="100%"></homerbchart>
      </div>
    </div>
    <div class="item">
      <h4>销售精英</h4>
      <nx-data-card></nx-data-card>
    </div>
    <!--<div class="item">
      <h4>带数字的展示</h4>
      <nx-data-icons :option="easyDataOption1"></nx-data-icons>
    </div>
    <div class="item">
      <h4>简易展示</h4>
      <nx-data-icons :option="easyDataOption2"></nx-data-icons>
    </div>-->
  </div>
</template>

<script>

import nxDataDisplay from '@/components/nx-data-display/nx-data-display'
import nxDataCard from '@/components/nx-data-card/nx-data-card'
import nxDataTabs from '@/components/nx-data-tabs/nx-data-tabs'
import nxDataIcons from '@/components/nx-data-icons/nx-data-icons'
import nxGithubCorner from '@/components/nx-github-corner'
import homelchart from '@/components/homechart/homelchart'
import homerchart from '@/components/homechart/homerchart'
import homelbchart from '@/components/homechart/homelbchart'
import homerbchart from '@/components/homechart/homerbchart'

export default {
  name: 'report',
  components: {
    nxDataDisplay,
    nxDataCard,
    nxDataTabs,
    nxDataIcons,
    nxGithubCorner,
    homelchart,
    homerchart,
    homelbchart,
    homerbchart
  },
  data() {
    return {}
  },
  created() {},
  watch: {},
  mounted() {},
  methods:{},
  computed: {}
}
</script>

<style scoped>
.item {
  margin-bottom: 16px;
}
.itemq {
  width: 50%;
  float: left;
}
</style>
<style lang ="scss">
    @import '../../styles/data-card.scss';
    @import '../../styles/data-display.scss';
    @import '../../styles/data-icons.scss';
    @import '../../styles/data-tabs.scss';
</style>
