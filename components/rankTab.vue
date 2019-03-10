
<template>
  <div class="todayTabChangeBox">
    <!--热点模块——title-本周热点以及本月-->
    <div class="title-host-point">
        <div class="title-hostPoint-bottom">
            <div class="button-week"
            @click="enterWeekHotList"
            :class=" { weekHotOn } ">周排行榜
            </div>
            <div class="button-month"
            @click="enterMonthHotList"
            :class="{ monthHotOn }">月排行榜</div>
            <div class="hot-img-wrap"
            v-show="weekDecoration"><img src="~static/picture/hotpoint.jpg"
                class="height=6px;width=90px"> </div>
            <div class="hot-img-wrap2"
            v-show="monthDecoration"><img src="~static/picture/hotpoint.jpg"
                class="height=6px;width=90px"></div>
        </div>
        <div v-if="fullPath != '/w' || fullPath !='/m' || fullPath != '/d'">
        <nuxt-link :to="`${modelName}/ranklist/${rankId}/1`"
            class="text-more">更多></nuxt-link>
        </div>
        <div v-else>
        <router-link :to="``"
            class="text-more"
            @click.native="refresh">更多></router-link>
        </div>
        <!-- <nuxt-link :to="`/hobbies/ranklist/${rankId}/1`">
            <span class="text-more">更多></span>
        </nuxt-link> -->
        <div class="decoration-line"></div>
    </div>

    <!--热点模块——contain-周排行-->
    <div id="wrapHostPoint" class="wrapHostPoint-week" v-show="rankId == 'w'">
      <div class="contain-wrap-host-point"
          v-for="(hostPointItem, index) in hostPointItems_week"
          :key="index">
          <div class="textRank"
          :class="{ whiteTextOn : index ===0 || index===1 || index===2}">{{index+1}}</div>
          <div class="titleRank">
          <nuxt-link :to="$replaceDetailUrl(`/${detailsObj['rank']}/detail/${hostPointItem.essayId}/1`)">{{hostPointItem.title}}</nuxt-link>
          </div>
          <!--<div class="content-left-hostPoint"></div>-->
          <!--<div class="content-right-hostPoint">-->
          <!--<div class="hostPoint-tex">{{hostPointItem.text}}</div>-->
          <!--<div class="hostPoint-time">{{hostPointItem.theTime}}</div>-->
          <!--</div>-->
      </div>
      <div class="black_img"><img src="~static/picture/black.png"></div>
      <div class="red_img"><img src="~static/picture/red.png"></div>
      <div class="red2_img"><img src="~static/picture/red.png"></div>
      <div class="red3_img"><img src="~static/picture/red.png"></div>
    </div>

    <!--热点模块——contain-月排行-->
    <div id="wrapHostPoint" class="wrapHostPoint-month" v-show="rankId == 'm'">
      <div class="contain-wrap-host-point"
          v-for="(hostPointItem, index) in hostPointItems_month"
          :key="index">
          <div class="textRank"
          :class="{ whiteTextOn : index ===0 || index===1 || index===2}">{{index+1}}</div>
          <div class="titleRank">
          <nuxt-link :to="$replaceDetailUrl(`/${detailsObj['rank']}/detail/${hostPointItem.essayId}/1`)">{{hostPointItem.title}}</nuxt-link>
          </div>
          <!--<div class="content-left-hostPoint"></div>-->
          <!--<div class="content-right-hostPoint">-->
          <!--<div class="hostPoint-tex">{{hostPointItem.text}}</div>-->
          <!--<div class="hostPoint-time">{{hostPointItem.theTime}}</div>-->
          <!--</div>-->
      </div>
      <div class="black_img"><img src="~static/picture/black.png"></div>
      <div class="red_img"><img src="~static/picture/red.png"></div>
      <div class="red2_img"><img src="~static/picture/red.png"></div>
      <div class="red3_img"><img src="~static/picture/red.png"></div>
    </div>
    <!-- <div v-if="fullPath != '/w' || fullPath !='/m' || fullPath != '/d'">
      <nuxt-link :to="`${modelName}/ranklist/${activeName == 'first' ? 'w':'m'}/1`"
        class="rankMore">更多></nuxt-link>
    </div>
    <div v-else>
      <router-link :to="``"
        class="rankMore"
        @click.native="refresh">更多></router-link>
    </div> -->
  </div>
</template>

<script>
import { $get } from '@/http/ajax.js'
import { webEssayGetWeekendRank, webEssayGetMonthRank } from '@/http/api.js'
// import {  } from '@/http/api.js'
import { detailsObj } from "@/utils/defaultConfig.js"
export default {
  name: 'todayRankTab',
  data: function() {
    return {
      // rankWeekLists: [],
      // rankMonthLists: [],
      hostPointItems_week:'',
      hostPointItems_month:'',
      rankId: 'w',
      weekHotOn: true,
      monthHotOn: false,
      weekDecoration: true,
      monthDecoration: false,
      activeName: 'first',
      fullPath: '',
      modelName:'',
      detailsObj
    }
  },
  props: {
    model: '',
    rankWeekLists: {
      type: Array,
      default() {
        return [];
      }
    },
    rankMonthLists: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  methods: {
    refresh: function() {
        this.$router.push({
        path: `${this.modelName}/ranklist/${
          this.activeName == 'first' ? 'w' : 'm'
        }/1`
      })
    },
     // 本月热点——改变按钮样式&&
    async enterWeekHotList() {
      this.rankId = 'w'
      this.monthHotOn = false
      this.monthDecoration = false
      this.weekDecoration = true
      this.weekHotOn = true
    },
    // 本月热点——改变按钮样式&&
    async enterMonthHotList() {
      this.rankId = 'm'
      this.monthHotOn = true
      this.monthDecoration = true
      this.weekHotOn = false
      this.weekDecoration = false
    },
  },
  created()
  {
    // console.log(this.model,'model 666666666');
    this.hostPointItems_week = this.rankWeekLists
    this.hostPointItems_month = this.rankMonthLists
  },
  mounted() {
    let fullPath = this.$route.fullPath.match(/\/[a-z]{1}/gi)
    this.modelName = this.$route.fullPath.match(/^\/[a-z]+/gi)[0]
    if (fullPath == null) {
      this.fullPath = []
    } else {
      this.fullPath = fullPath.pop()
    }
    this.$nextTick(async () => {
      // let rankWeekData = await $get(webEssayGetWeekendRank, {
      //   pageNo: 1,
      //   size: 10
      // })
      // let rankMonthData = await $get(webEssayGetMonthRank, {
      //   pageNo: 1,
      //   size: 10
      // })
      // this.rankWeekLists = rankWeekData.data.essayEntities
      // this.rankMonthLists = rankMonthData.data.essayEntities
    })
  }
}
</script>

<style>
.todayTabChangeBox .title-host-point {
  /*margin-bottom: 27px;*/
  position: relative;
}
.todayTabChangeBox .title-host-point a:hover {
  color: #BE001E;
  text-decoration: none;
}
.todayTabChangeBox .title-hostPoint-bottom {
  position: relative;
  width: 285px;
  height: 40px;
  margin-top: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
}
.todayTabChangeBox .hot-img-wrap {
  position: absolute;
  bottom: -6px;
  left: 0;
}
.todayTabChangeBox .hot-img-wrap2 {
  position: absolute;
  bottom: -6px;
  left: 98px;
}
.todayTabChangeBox .button-week {
  font-size: 18px;
  font-weight: 600;
  /*color:rgba(190,0,30,1);*/
  width: 78px;
  float: left;
  margin-right: 22px;
  padding-bottom: 6px;
  text-align: left;
  cursor: pointer;
}
.todayTabChangeBox .button-week:hover {
  color: #BE001E;
  text-decoration: none;
}
.todayTabChangeBox .button-week.weekHotOn {
  color: rgba(190, 0, 30, 1);
}
.todayTabChangeBox .button-month {
  font-size: 18px;
  font-weight: 600;
  color: rgba(25, 25, 25, 1);
  float: left;
  text-align: left;
  cursor: pointer;
}
.todayTabChangeBox .button-month:hover {
  color: #BE001E;
  text-decoration: none;
}
.todayTabChangeBox .button-month.monthHotOn {
  color: rgba(190, 0, 30, 1);
}
.todayTabChangeBox .text-more {
  font-size: 14px;
  font-weight: normal;
  color: rgba(153, 153, 153, 1);
  position: absolute;
  right: 40px;
  top: 4px;
}
.todayTabChangeBox .decoration-line {
  width: 43px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
  position: absolute;
  right: 32px;
  top: 46px;
}
.todayTabChangeBox #wrapHostPoint {
  box-sizing: border-box;
  padding: 10px 0 0 0;
  margin: 20px 0 0 0;
  width: 320px;
  position: relative;
}
.todayTabChangeBox .black_img {
  position: absolute;
  top: 11px;
  left: 4px;
}
.todayTabChangeBox .red_img {
  position: absolute;
  top: 10px;
  left: 0px;
}
.todayTabChangeBox .red2_img {
  position: absolute;
  top: 42px;
  left: 0px;
}
.todayTabChangeBox .red3_img {
  position: absolute;
  top: 74px;
  left: 0px;
}

.todayTabChangeBox .contain-wrap-host-point {
  /*position: relative;*/
  /*border-bottom: 1px solid rgba(240, 240, 240, 1);*/
  min-height: 15px;
  width: 320px;
  margin-left: 5px;
  margin-bottom: 18px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.todayTabChangeBox .textRank {
  position: absolute;
  font-size: 12px;
  font-weight: 400;
  color: black;
  margin-left: 3px;
  margin-top: 1px;
  display: inline-block;
  vertical-align: top;
  z-index: 10;
  /*line-height:32px;*/
}
.todayTabChangeBox .textRank.whiteTextOn {
  color: white;
}
.todayTabChangeBox .titleRank {
  position: absolute;
  font-size: 14px;
  display: inline-block;
  vertical-align: top;
  width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 10;
  left: 50px;
}
.todayTabChangeBox .titleRank  a{
    color: black;
}
.todayTabChangeBox .titleRank a:hover {
  color: #BE001E;
  text-decoration: none;
}
</style>
