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
    // nxDataIcons,
    nxGithubCorner,
    homelchart,
    homerchart,
    homelbchart,
    homerbchart
  },
  data() {
    return {
      /*homeData:{
        span: 8,
        color: '#15A0FF',
        data: [
          {
            count: 1215,
            title: '日销售额'
          },
          {
            count:  356000,
            title: '月销售额'
          },
          {
            count:  898566,
            title: '年销售额'
          }
        ]
      },
      homeTc: {
        span: 6,
        data: [
          {
            title: '天王卡',
            subtitle: '59元/月',
            count: 1993,
            text: '首次充值100送50元话费',
            color: 'rgb(49, 180, 141)',
            key: '王'
          },
          {
            title: '地王卡',
            subtitle: '39元/月',
            count: 3112,
            text: '首次充值100送5G全国流量',
            color: 'rgb(56, 161, 242)',
            key: '王'
          },
          {
            title: '大冰神卡',
            subtitle: '199元/月',
            count: 908,
            text: '国内流量不限量',
            color: 'rgb(117, 56, 199)',
            key: '冰'
          },
          {
            title: '小冰神卡',
            subtitle: '99元/月',
            count: 1659,
            text: '国内流量通话不限量',
            color: 'rgb(59, 103, 164)',
            key: '冰'
          }
        ]
      },*/
      // homeData:{},
      // homeTc:{},
      // easyDataOption0: {
      //   span: 6,
      //   borderColor: '#fff',
      //   data: [
      //     {
      //       name: '马化腾',
      //       src: 'static/img/mock/card/card-1.jpg',
      //       text: '1971年10月29日生于原广东省海南岛东方市八所港（今海南省东方市），祖籍广东省汕头市。腾讯公司主要创办人之一。现任腾讯公司董事会主席兼首席执行官；全国青联副主席；全国人大代表。2017年8月7日，腾讯股价盘中再创历史新高价320.6港元，马化腾身家361亿美元成为中国首富。'
      //     },
      //     {
      //       name: '李易峰',
      //       src: 'static/img/mock/card/card-2.jpg',
      //       text: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人，毕业于四川师范大学电影电视学院。2007年，参加东方卫视选秀娱乐节目《加油！好男儿》的比赛，获得全国总决赛第八名，从而正式出道；同年，发行首张EP《四叶草》。2009年，发行首张个人专辑《小先生》。'
      //     },
      //     {
      //       name: '鹿晗（LU HAN）',
      //       src: 'static/img/mock/card/card-3.jpg',
      //       text: '1990年4月20日出生于北京海淀区，中国内地影视男演员、歌手。2008年赴韩国留学期间在明洞逛街时，被韩国SM娱乐有限公司星探发掘成为旗下练习生。2012年4月以韩国男子组合EXO/EXO-M成员正式出道，组合内担任主唱、领舞、门面担当。'
      //     },
      //     {
      //       name: '王源',
      //       src: 'static/img/mock/card/card-4.jpg',
      //       text: '2000年11月8日出生于重庆，中国内地男歌手、演员、主持人，TFBOYS成员。2011年底成为TF家族练习生，2013年8月6日以组合形式出道。2015年14岁开始独立作词作曲，2016年单曲《因为遇见你》播放量破3亿、微博转发破4亿，获第9届城市至尊音乐榜年度听众最爱新人、2016亚洲新歌榜年度十大金曲；登《时尚·COSMOPOLITAN》封面单人销量创行业纪录。'
      //     }
      //   ]
      // },
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
