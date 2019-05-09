<template>
  <div class="nx-data-display">
    <el-row :span="24">
      <el-col v-for="(item,index) in data" :key="index" :span="span">
        <div class="item" :style="{color:color}">
          <h5 class="count"><nx-count-up :start="14" :end="item.count"/></h5>
          <span class="splitLine" />
          <p class="title">{{item.title}}</p>
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
  /*props: {
    homeData: {
      type: Object,
      default: () => {}
    }
  },*/
  mounted() {
    this.getHomeData();
  },
  created() {},
  methods: {
    // 获取首页数据
    getHomeData() {
      getHomeData().then(res => {
        this.homeData = res.data.homeData
        this.span=this.homeData.span || 8,
        this.color=this.homeData.color || 'rgb(63, 161, 255)',
        this.data=this.homeData.data
        // console.log(this.homeData.data)
      })
    },
  }
}
</script>
