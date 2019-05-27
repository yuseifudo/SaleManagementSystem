<template>
  <div class="data-tabs">
    <el-row :span="24">
      <el-col :span="6" v-for="(item,index) in data" :key="index">
        <div class="item" :style="{background:'rgb(56, 161, 242)'}">
          <div class="item-header">
            <p>{{item.productName}}</p>
            <span>{{item.productFee}}元/月</span>
          </div>
          <div class="item-body">
            <h2><nx-count-up :start="14" :end="item.salesCount"/></h2>
          </div>
          <div class="item-footer">
            <!--<span>{{item.allcount}}</span>-->
            <p>{{item.recommend}}</p>
          </div>
          <p class="item-tip">畅</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import nxCountUp from '@/components/nx-count-up/index.vue'
import { getHomeTc } from '@/api/homeTable'
export default {
  components: {
    nxCountUp
  },
  name: 'nx-data-tabs',
  data() {
    return {
      homeTc:{},
     // span: '6',
      data: ''
    }
  },
  mounted() {
    this.getHomeTc();
  },
  methods: {
    // 获取首页套餐数据
    getHomeTc() {
      getHomeTc().then(res => {
        this.homeTc = res.data
        //this.span=this.homeTc.span || 6
        this.data=this.homeTc.items
        // console.log(this.homeTc.data)
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
