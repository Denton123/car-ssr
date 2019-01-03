
<template>
  <div class="todayTabChangeBox">
    <el-tabs v-model="activeName"
      class="todayTabChange">
      <el-tab-pane label="周排行榜"
        name="first"
        v-if="rankWeekLists!=''">
        <ul class="numSort">
          <li v-for="(item,index) in 10"
            :class="index == 0 || index == 1 || index == 2 ? 'numTop' : ''"
            :key="index"><span>{{item}}</span></li>
        </ul>
        <ul class="contentSort">
          <li v-for="(item, index) in rankWeekLists"
            :key="index">
            <router-link :to="`/rank/detail/${item.essayId}/1`">{{item.title}}</router-link>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="月排行榜"
        name="second"
        v-if="rankMonthLists !=''">
        <ul class="numSort">
          <li v-for="(item,index) in 10"
            :class="index == 0 || index == 1 || index == 2 ? 'numTop' : ''"
            :key="index"><span>{{item}}</span></li>
        </ul>
        <ul class="contentSort">
          <li v-for="(item, index) in rankMonthLists"
            :key="index">
            <router-link :to="`/rank/detail/${item.essayId}/1`">{{item.title}}</router-link>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
    <router-link :to="`${model}/rankList/${activeName == 'first' ? 'w':'m'}/1`"
      class="rankMore"
      v-if="fullPath != '/w' || fullPath !='/m'">更多></router-link>
    <router-link :to="`/index`"
      class="rankMore"
      @click.native="refresh"
      v-if="fullPath == '/w' || fullPath =='/m'">更多></router-link>
  </div>
</template>

<script>
import { $get } from '@/http/ajax.js'
import { webEssayGetWeekendRank } from '@/http/api.js'
import { webEssayGetMonthRank } from '@/http/api.js'

export default {
  name: 'todayRankTab',
  props: { model: '' },
  data: function() {
    return {
      rankWeekLists: [],
      rankMonthLists: [],
      activeName: 'first',
      fullPath: ''
    }
  },
  methods: {
    refresh: function() {
      this.$router.go(0)
    }
  },
  mounted() {
    let fullPath = this.$route.fullPath.match(/\/[a-z]{1}/gi)
    if (fullPath == null) {
      this.fullPath = []
    } else {
      this.fullPath = fullPath.pop()
    }
    this.$nextTick(async () => {
      let rankWeekData = await $get(webEssayGetWeekendRank, {
        pageNo: 1,
        size: 10
      })
      let rankMonthData = await $get(webEssayGetMonthRank, {
        pageNo: 1,
        size: 10
      })
      this.rankWeekLists = rankWeekData.data.essayEntities
      this.rankMonthLists = rankMonthData.data.essayEntities
    })
  }
}
</script>

<style>
.todayTabChange {
  text-align: left;
}
/* 滑块部分 */
.todayTabChange .el-tabs__active-bar.is-top {
  width: 90px !important;
  height: 7px;
  background: linear-gradient(
    -150deg,
    transparent 5px,
    rgba(190, 0, 30, 1) 0
  ) !important;
  bottom: -17px;
  position: absolute;
  left: -9px;
}

/* tab 头部部分 */
body .todayTabChange .el-tabs__header {
  margin-bottom: 29px;
}

/* tab 头部内标签 */
body .todayTabChange .el-tabs__nav-scroll {
  height: 55px;
}

/* tab 头部内-内导航块 */
body .todayTabChange .el-tabs__nav {
  transform: translateX(8px) !important;
}

/*tab 头部字体 */
body .todayTabChange .el-tabs__item {
  width: 72px;
  height: 18px;
  font-size: 18px;
  font-weight: bold;
}
.todayTabChange .el-tabs__item:hover,
.todayTabChangeBox .rankMore:hover,
.todayTabChange .contentSort li a:hover {
  color: rgba(190, 0, 30, 1);
}
/*长 下划线 */
.todayTabChange .el-tabs__nav-wrap::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 7px;
  width: 308px;
  height: 0.9px;
  background-color: black;
  z-index: 1;
}

/* 短 下划线 */
.todayTabChange .el-tabs__nav-wrap::before {
  content: '';
  position: absolute;
  right: 24px;
  bottom: 2px;
  width: 30px;
  height: 0.9px;
  background-color: black;
  z-index: 1;
}

/* 更多 */
.todayTabChangeBox .rankMore {
  width: 55px;
  font-size: 14px;
  position: absolute;
  color: rgba(153, 153, 153, 1);
  top: 30px;
  right: 7px;
  text-decoration: none;
  cursor: pointer;
}
body .todayTabChange .el-tabs__item.is-active {
  color: rgba(190, 0, 30, 1);
}

/* 排序的序号部分 & 公共li部分 */
.todayTabChange .el-tabs__content ul {
  margin: 3px 0px 0px 0px;
  padding-left: 3px;
}
.todayTabChange .el-tabs__content .numSort {
  width: 13px;
  height: 297px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  float: left;
}
.todayTabChange .el-tabs__content li {
  list-style: none;
  text-align: center;
  width: 100%;
  height: 13px;
  font-size: 12px;
  color: black;
  margin-bottom: 19px;
}

.todayTabChange .el-tabs__content li span {
  display: inline-block;
}

.todayTabChange .numTop {
  background: #bd081e;
  transform: rotateZ(-45deg);
  box-shadow: 3px 4px 0px black;
}

.todayTabChange .numTop span {
  transform: rotateZ(45deg) translateY(-2px);
  color: white;
}

/* 排序的文字部分 */
.todayTabChange .el-tabs__content .contentSort {
  width: 269px;
  height: 308px;
  float: left;
  margin-left: 24px;
}

.todayTabChange .el-tabs__content .contentSort li {
  text-align: left;
  overflow: hidden;
  height: 17px;
  text-overflow: ellipsis;
  line-height: 17px;
  white-space: nowrap;
  margin-bottom: 15px;
}

.todayTabChange .contentSort li a {
  text-decoration: none;
  font-size: 14px;
  color: rgba(0, 0, 0, 1);
}
</style>
