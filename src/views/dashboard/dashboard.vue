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
      <nx-data-card :option="easyDataOption"></nx-data-card>
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
    return {
      easyDataOption: {
        span: 6,
        borderColor: '#fff',
        data: [
          {
            name: '马化腾',
            src: 'static/img/mock/card/card-1.jpg',
            text: '马化腾，1971年10月29日生于原广东省海南岛东方市八所港（今海南省东方市），祖籍广东省汕头市。腾讯公司主要创办人之一。现任腾讯公司董事会主席兼首席执行官；全国青联副主席；全国人大代表。2017年8月7日，腾讯股价盘中再创历史新高价320.6港元，马化腾身家361亿美元成为中国首富。'
          },
          {
            name: '李易峰',
            src: 'static/img/mock/card/card-2.jpg',
            text: '1987年5月4日出生于四川成都，中国内地男演员、流行乐歌手、影视制片人，毕业于四川师范大学电影电视学院。2007年，参加东方卫视选秀娱乐节目《加油！好男儿》的比赛，获得全国总决赛第八名，从而正式出道；同年，发行首张EP《四叶草》。2009年，发行首张个人专辑《小先生》。'
          },
          {
            name: '鹿晗（LU HAN）',
            src: 'static/img/mock/card/card-3.jpg',
            text: '1990年4月20日出生于北京海淀区，中国内地影视男演员、歌手。2008年赴韩国留学期间在明洞逛街时，被韩国SM娱乐有限公司星探发掘成为旗下练习生。2012年4月以韩国男子组合EXO/EXO-M成员正式出道，组合内担任主唱、领舞、门面担当。2014年8月，个人微博单条评论创吉尼斯世界纪录。'
          },
          {
            name: '王源',
            src: 'static/img/mock/card/card-4.jpg',
            text: '2000年11月8日出生于重庆，中国内地男歌手、演员、主持人，TFBOYS成员。2011年底成为TF家族练习生，2013年8月6日以组合形式出道。2015年14岁开始独立作词作曲，2016年单曲《因为遇见你》播放量破3亿、微博转发破4亿，获第9届城市至尊音乐榜年度听众最爱新人。'
          }
        ]
      },
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
