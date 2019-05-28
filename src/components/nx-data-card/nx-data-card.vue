<template>
  <div class="data-card">
    <el-row :span="24">
      <el-col :span="6" v-for="(item,index) in data" :key="index">
        <div class="item">
          <img :src="srcimg" class="item-img" />
          <div class="item-text" :style="{color:colorText,backgroundColor:bgText}">
            <h3>{{item.saleName}}</h3>
            <h4 v-if="item.saleSex==0">性别：男</h4>
            <h4 v-else>性别：女</h4>
            <h4>联系方式：{{item.saleTelNum}}</h4>
            <h4>当月销量：{{item.salesCount}}</h4>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getHomeSaleData } from '@/api/homeTable'
export default {
  name: 'nx-data-card',
  data() {
    return {
      /*span: this.option.span || 6,
      data: this.option.data || [],
      colorText: this.option.colorText || '#fff',
      bgText: this.option.bgText || '#2e323f',
      borderColor: this.option.borderColor || '#2e323f'*/
      //option:{},
      //span: '6',
      data: '',
      colorText: '#fff',
      bgText: '#2e323f',
      borderColor: '#2e323f',
      srcimg:'../../../static/img/mock/card/award.jpg'
    }
  },
  mounted() {
    this.getHomeSaleData();
  },
  /*props:{
    option: {
      type: Object,
      default: () => {}
    }
  },*/
  created() {},
  methods: {
    // 获取首页销售精英数据
    getHomeSaleData() {
      getHomeSaleData().then(res => {
        this.data=res.data.items

        // console.log(this.getHomeSaleData.data)
      })
    },
  },
  created() {},
  watch: {},
  computed: {},
}
</script>

<style lang="scss" scoped>

</style>
