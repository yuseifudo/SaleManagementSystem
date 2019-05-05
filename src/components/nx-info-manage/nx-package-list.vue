<template>
  <div class="data-card">
    <div class="edit-area">
<!--      <el-button-group class="button-group">-->
        <el-button type="primary" icon="el-icon-plus" class="add–button">添加</el-button>
<!--      </el-button-group>-->
    </div>

    <el-row :span="24">
      <el-col :span="item.span" v-for="(item,index) in packageLists" :key="index">
        <div class="item" v-if="item.isFirstPush" style="border:2px solid red">
          <img :src="item.img" class="item-img" />
          <div class="item-text" :style="{color:item.color,backgroundColor:item.bgText}">
            <h3>{{item.name}}</h3>
            <p>{{item.description}}</p>
          </div>
        </div>
        <div class="item" v-else>
          <img :src="item.img" class="item-img" />
          <div class="item-text" :style="{color:item.color,backgroundColor:item.bgText}">
            <h3>{{item.name}}</h3>
            <p>{{item.description}}</p>
          </div>

        </div>
        <div>
          <el-link type="warning" :disabled="item.isFirstPush">设为首推</el-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import util from '@/utils/table.js'
  import {
    fetchList,
    fetchPackageDetail,
    createPackageInfo,
    deletePackageInfo,
    updatePackageInfo
  } from '@/api/packageManage.js'
export default {

  name: 'nx-package-list',
  data() {
    return {
      packageLists:{},

    }
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  created() {},
  mounted() {
    this.getPackageList()
  },
  watch: {},
  computed: {},
  methods: {
    getPackageList(){
      fetchList().then((res)=>{
        if (res.code==0){
          this.packageLists=res.data;
          this.packageLists[0].isFirstPush=true;
        }
      })
    }


  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/data-card.scss';
  .edit-area{
    height: 70px;
  }
  /*.button-group{*/
  /*  float: right;*/
  /*  padding-right: 50px;*/
  /*}*/
  .add–button{
      float: right;
      margin-right: 50px;
  }

</style>
