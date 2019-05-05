<template>
  <div class="app-container">
   <!--<nx-github-corner></nx-github-corner>-->
     <!-- <a target="_blank" href="https://github.com/mgbq/vue-permission"><img
        style="position: absolute; top: 48px; right: 0; border: 0;"
        src="../../../static/img/report/forkme.png"
        alt="Fork me on GitHub"></a> -->
    <div class="item">
      <h4>销售数据</h4>
      <nx-data-display :option="option"></nx-data-display>
    </div>
    <div class="item">
      <h4>热销套餐</h4>
      <nx-data-tabs :option="easyDataOption"></nx-data-tabs>
    </div>
    <div class="item">
      <h4>销售精英</h4>
      <nx-data-card :option="easyDataOption0"></nx-data-card>
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
export default {
  name: 'report',
  components: {
    nxDataDisplay,
    nxDataCard,
    nxDataTabs,
    // nxDataIcons,
    nxGithubCorner

  },
  data() {
    return {
      option: {
        span: 8,
        color: '#15A0FF',
        data: [
          {
            count: 1215,
            title: '日销售额'
          },
          {
            count: 13560,
            title: '月销售额'
          },
          {
            count: 898566,
            title: '年销售额'
          }
        ]
      },
      easyDataOption: {
        span: 6,
        data: [
          {
            title: '天王卡',
            subtitle: '59元/月',
            count: 1993,
            allcount: 10222,
            text: '首次充值100送50元话费',
            color: 'rgb(49, 180, 141)',
            key: '王'
          },
          {
            title: '地王卡',
            subtitle: '39元/月',
            count: 3112,
            allcount: 10222,
            text: '首次充值100送5G全国流量',
            color: 'rgb(56, 161, 242)',
            key: '王'
          },
          {
            title: '大冰神卡',
            subtitle: '199元/月',
            count: 908,
            allcount: 10222,
            text: '国内流量不限量',
            color: 'rgb(117, 56, 199)',
            key: '冰'
          },
          {
            title: '小冰神卡',
            subtitle: '99元/月',
            count: 1659,
            allcount: 10222,
            text: '国内流量通话不限量',
            color: 'rgb(59, 103, 164)',
            key: '冰'
          }
        ]
      },
      easyDataOption0: {
        span: 6,
        borderColor: '#fff',
        data: [
          {
            name: '姓名1',
            src: 'static/img/mock/card/card-1.jpg',
            text: '介绍1'
          },
          {
            name: '姓名2',
            src: 'static/img/mock/card/card-2.jpg',
            text: '介绍2'
          },
          {
            name: '姓名3',
            src: 'static/img/mock/card/card-3.jpg',
            text: '介绍3'
          },
          {
            name: '姓名4',
            src: 'static/img/mock/card/card-4.jpg',
            text: '介绍4'
          }
        ]
      },
      /*easyDataOption1: {
        color: 'rgb(63, 161, 255)',
        span: 4,
        data: [
          {
            title: '今日注册',
            count: 12678,
            icon: 'icon-cuowu'
          },
          {
            title: '今日登录',
            count: 22139,
            icon: 'icon-shujuzhanshi2'
          },
          {
            title: '今日订阅',
            count: 35623,
            icon: 'icon-jiaoseguanli'
          },
          {
            title: '今日评论',
            count: 16826,
            icon: 'icon-caidanguanli'
          },
          {
            title: '今日评论',
            count: 16826,
            icon: 'icon-caidanguanli'
          },
          {
            title: '今日评论',
            count: 16826,
            icon: 'icon-caidanguanli'
          }
        ]
      },
      easyDataOption2: {
        color: 'rgb(63, 161, 255)',
        span: 4,
        discount: true,
        data: [
          {
            title: '错误日志',
            count: 12678,
            icon: 'icon-cuowu'
          },
          {
            title: '数据展示',
            count: 12678,
            icon: 'icon-shujuzhanshi2'
          },
          {
            title: '权限管理',
            count: 12678,
            icon: 'icon-jiaoseguanli'
          },
          {
            title: '菜单管理',
            count: 12678,
            icon: 'icon-caidanguanli'
          },
          {
            title: '权限测试',
            count: 12678,
            icon: 'icon-caidanguanli'
          },
          {
            title: '错误页面',
            count: 12678,
            icon: 'icon-caidanguanli'
          }
        ]
      }*/
    }
  },
  created() {},
  watch: {},
  mounted() {},
  computed: {}
}
</script>

<style scoped>
.item {
  margin-bottom: 16px;
}
</style>
<style lang ="scss">
    @import '../../styles/data-card.scss';
    @import '../../styles/data-display.scss';
    @import '../../styles/data-icons.scss';
    @import '../../styles/data-tabs.scss';
</style>
