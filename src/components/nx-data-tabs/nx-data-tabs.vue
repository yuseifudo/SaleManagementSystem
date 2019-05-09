<template>
  <div class="data-tabs">
    <el-row :span="24">
      <el-col :span="span" v-for="(item,index) in data" :key="index">
        <div class="item" :style="{background:item.color}">
          <div class="item-header">
            <p>{{item.title}}</p>
            <span>{{item.subtitle}}</span>
          </div>
          <div class="item-body">
            <h2><nx-count-up :start="14" :end="item.count"/></h2>
          </div>
          <div class="item-footer">
            <!--<span>{{item.allcount}}</span>-->
            <p>{{item.text}}</p>
          </div>
          <p class="item-tip">{{item.key}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import nxCountUp from '@/components/nx-count-up/index.vue'
import { getHomeTc } from '@/api/homeTcTable'
export default {
  components: {
    nxCountUp
  },
  name: 'nx-data-tabs',
  data() {
    return {
      homeTc:{},
      span: '',
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
        this.homeTc = res.data.homeTc
        this.span=this.homeTc.span || 6
        this.data=this.homeTc.data || []
        console.log(this.homeTc.data)
      })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
