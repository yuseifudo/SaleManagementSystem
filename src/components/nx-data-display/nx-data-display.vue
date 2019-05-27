<template>
  <div class="nx-data-display">
    <el-row :span="24">
      <el-col>
        <div class="item" :style="color">
          <h5 class="count"><nx-count-up :start="14" :end="data[0]"/></h5>
          <span class="splitLine" />
          <p class="title">日销售额</p>
        </div>
        <div class="item" :style="color">
          <h5 class="count"><nx-count-up :start="14" :end="data[1]"/></h5>
          <span class="splitLine" />
          <p class="title">月销售额</p>
        </div>
        <div class="item" :style="color">
          <h5 class="count"><nx-count-up :start="14" :end="data[2]"/></h5>
          <span class="splitLine" />
          <p class="title">年销售额</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import nxCountUp from '@/components/nx-count-up/index.vue'
  import { getHomeData } from '@/api/homeTable'
  export default {
    name: 'nx-data-display',
    components: {
      nxCountUp
    },
    data() {
      return {
        homeData:{},
        span: '',
        color: '',
        data: ''
      }
    },
    mounted() {
      this.getHomeData();
    },
    created() {},
    methods: {
      // 获取首页数据
      getHomeData() {
        getHomeData().then(res => {
          this.homeData = res.data.items
          this.span= '8',
            this.color= 'rgb(63, 161, 255)',
            this.data=this.homeData

        })
      },
    }
  }
</script>
<style scoped>
  .item {
    margin-bottom: 16px;
    float: left;
    width: 33%;
  }

</style>
<style lang ="scss">
  @import '../../styles/data-card.scss';
  @import '../../styles/data-display.scss';
  @import '../../styles/data-icons.scss';
  @import '../../styles/data-tabs.scss';
</style>
