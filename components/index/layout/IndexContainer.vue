<template>
  <div>
    <div>
      <m-header></m-header>
    </div>
    <!-- 顶部轮播图模块 -->
    <big-coursel :list="bigCourselData"
      id="index"></big-coursel>
    <hot-news id="news"></hot-news>
    <aside-bar></aside-bar>
    <!-- 中间tag -->
    <tags class="mt40"
      v-if="tagOne.length >= 1"
      :listData="tagOne"></tags>
    <!-- 今日车闻模块 -->
    <center id="cars"
      href="/news/1"
      :url="newsActiveUrl">
      <car-carsouel slot="carsouel"
        @change="changeBg"
        :list="newsCourselData"></car-carsouel>
      <adver-aside slot="other"
        :list="newsRightList"
        @change="changeList"></adver-aside>
    </center>
    <car-card-list class="mt20 index_card_list"
      type="news"
      :list="newsList"></car-card-list>
    <!-- 广告 -->
    <adver-block>
      <div id="newsAdver"
        class="guanggao">
        <!--  <img src="../images/guanggao.png"
          alt="广告"
          width="100%"
          height="100%"> -->
        <div id="index_news_ad"></div>
        <div class="index_ad_des">广告</div>
      </div>
    </adver-block>
    <!-- 新能源模块 -->
    <center-no-bg class="mt40"
      id="resources"
      href="/ev/1">
      <car-carsouel slot="leftContent"
        :list="EvCourselData"></car-carsouel>
      <hot-tags slot="rightContent"
        :list="tagHot"></hot-tags>
    </center-no-bg>
    <car-card-list class="mt20"
      type="ev"
      :list="EvList"></car-card-list>
    <!-- 兴趣部落 -->
    <center title="兴趣部落"
      titleEn="hobbies"
      id="hobbies"
      href="/hobbies/1"
      class="mt20"
      :url="hobbiesActiveUrl">
      <car-carsouel slot="carsouel"
        :list="hobbiesCourselData"
        @change="changeHobbiesBg"></car-carsouel>
      <hobbies-div slot="other"
        :cardData="hobbiesItem"
        height="450px"
        isContent="1"></hobbies-div>
    </center>
    <hobbies-list class="mt20"
      type="hobbies"
      :list="hobbiesList"></hobbies-list>
    <!-- 广告 -->
    <adver-block>
      <div id="hobbiesAdver"
        class="guanggao">
        <!--   <img src="../images/guanggao.png"
          alt="广告"
          width="100%"
          height="100%"> -->
        <div id="index_video_ad"></div>
        <div class="index_ad_des">广告</div>
      </div>
    </adver-block>
    <!-- 随机tag -->
    <tags class="mt40"
      v-if="tagTwo.length >= 1"
      :listData="tagTwo"></tags>
    <!-- 视频模块 -->
    <center-no-bg class="mt40"
      lwidth="953"
      rwidth="217"
      height="536"
      href="/video/1"
      title="视频"
      titleEn="video"
      id="videos">
      <car-carsouel slot="leftContent"
        height="536px"
        :carsouelFlag="carsouelFlag"
        :list="videoCourselData"></car-carsouel>
      <video-card slot="rightContent"
        type="video"
        :list="videoRightList"></video-card>
    </center-no-bg>
    <!-- 广告模块 -->
    <adver-block>
      <div id="videoAdver"
        class="guanggao">
        <!--         <img src=""
          alt="广告"
          width="100%"
          height="100%"> -->
        <div id="index_footer_ad"></div>
        <div class="index_ad_des">广告</div>
      </div>
    </adver-block>
    <!-- 随机tag -->
    <tags class="mt40"
      v-if="tagThree.length >= 1"
      :listData="tagThree"></tags>
    <!-- 排行版 -->
    <div class="sort-list mt35">
      <div class="index_sorts_list">
        <sort :list="dayList"
          type="d"></sort>
        <sort class="ml30"
          title="周排行榜"
          type="w"
          :list="weekList"></sort>
        <sort class="ml30"
          title="月排行榜"
          type="m"
          :list="monthList"></sort>
      </div>
    </div>
    <!-- 尾部 -->
    <div class="mt20">
      <m-footer></m-footer>
    </div>
  </div>
</template>
<script>
// 导入模块
import IndexCarsouel from "components/index/layout/IndexCarsouel";
import BigCoursel from "@/components/BigCoursel";
import HotNews from "components/index/layout/HotNews";
import Tags from "components/index/layout/Tags";
import Center from "components/index/layout/Center";
import CenterNoBg from "components/index/layout/CenterNoBg";
import CarCarsouel from "components/index/layout/CarCarsouel";
import AdverAside from "components/index/layout/AdverAside";
import CarCardList from "components/index/layout/CarCardList";
import AdverBlock from "components/index/layout/AdverBlock";
import HotTags from "components/index/layout/HotTags";
import HobbiesTab from "components/index/layout/HobbiesTag";
import VideoCard from "components/index/layout/VideoCard";
import Sort from "components/index/layout/Sort";
import AsideBar from "components/index/layout/AsideBar";
import HobbiesList from "components/index/layout/HobbiesList";
import HobbiesDiv from "components/index/layout/HobbiesDiv";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 导入请求方式以及请求的方法
import { $get } from "@/http/ajax";
import {
  webBannerList,
  webTagGetRandomTagsByChannel,
  webTagGetNewEnergyTags,
  webEssayGetessayBycarnews,
  webEssayGetEssayByChannelShou,
  webEssayGetWeekendRank,
  webEssayGetMonthRank,
  webEssayGetDayRank,
  webHobbiesList,
  webHobbiesGetOneHobbies
} from "@/http/api";
import utils from "@/http/url";
import { setTimeout } from "timers";
// import { connect } from "tls";

export default {
  name: "IndexContainer",
  components: {
    "index-carsouel": IndexCarsouel,
    "hot-news": HotNews,
    tags: Tags,
    center: Center,
    "center-no-bg": CenterNoBg,
    "car-carsouel": CarCarsouel,
    "adver-aside": AdverAside,
    "car-card-list": CarCardList,
    "adver-block": AdverBlock,
    "hot-tags": HotTags,
    "hobbies-tag": HobbiesTab,
    "video-card": VideoCard,
    sort: Sort,
    "aside-bar": AsideBar,
    "big-coursel": BigCoursel,
    "hobbies-list": HobbiesList,
    "hobbies-div": HobbiesDiv,
    "m-header": Header,
    "m-footer": Footer
  },
  props: {
    weeklist: {
      type: Array,
      default() {
        return [];
      }
    },
    bigCourselData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // bigCourselData: this.bigCourselData, // 顶部banner轮播图数据
      newsCourselData: [], // 今日车闻轮播图数据
      newsActiveUrl: "", // 今日车闻当前轮播图
      newsRightList: [], // 今日车闻右侧内容
      newsList: [], // 今日车闻下方文章
      EvCourselData: [], // 新能源轮播图数据
      EvList: [], // 新能源下方文章
      hobbiesCourselData: [], // 兴趣部落轮播图数据
      hobbiesActiveUrl: "", // 兴趣部落当前轮播图
      hobbiesRightList: [], // 兴趣部落右侧内容
      hobbiesList: [], // 兴趣部落下方文章列表
      hobbiesItem: {}, // 兴趣部落右方文字
      videoCourselData: [], // 视频轮播图数据
      videoRightList: [], // 视频右方数据
      tagOne: [], // 顶部tag数组
      tagTwo: [], // 中间tag数组
      tagThree: [], // 底部tag数组
      tagHot: [], // 热点
      dayList: [], // 日排行版数据
      weekList: this.weeklist, // 周排行榜数据
      monthList: [], // 月排行版数据,
      carsouelFlag: "video"
    };
  },
  mounted() {
    // 添加百度管家广告
    this.addAd();
    this.$nextTick(async () => {
      // 添加广告
      // this.getAdverBlock('newsAdver', '5993923')
      // this.getAdverBlock('hobbiesAdver', '5993927')
      // this.getAdverBlock('videoAdver', '5993929')
      // 获取顶部轮播图数据
      // let bigCoursel = this.getBannerData("18");
      let newsCoursel = this.getBannerData("14");
      let EvCoursel = this.getBannerData("15");
      let hobbiesCoursel = this.getBannerData("17");
      let videoCoursel = this.getBannerData("16");
      // 获取tag
      let tagOne = this.getTag(2);
      let tagTwo = this.getTag(6);
      let tagThree = this.getTag(5);
      // 获取新能源热点tag
      let tagHot = this.getHotTag();
      // 获取今日车闻右侧内容
      let newsRight = this.getNewsRightContent(2);
      // 获取今日车闻下方文章内容
      let newsList = this.chennelContent(2, 1, 3);
      let evList = this.chennelContent(4, 1, 3);
      // let hobbiesList = this.chennelContent(6, 1, 6)
      let videoList = this.chennelContent(5, 1, 3);
      // 获取日，月，周排行版
      let dayList = this.getSortList("day");
      let monthList = this.getSortList("month");
      // let weekList = this.getSortList("week");
      // 获取hobbies列表数据
      let hobbiesList = this.getHobbiesList();
      let hobbiesItem = this.getHobbiesItem();

      // this.bigCourselData = await bigCoursel;
      this.newsCourselData = await newsCoursel;
      this.EvCourselData = await EvCoursel;
      this.hobbiesCourselData = await hobbiesCoursel;
      this.videoCourselData = await videoCoursel;
      this.tagOne = await tagOne;
      this.tagTwo = await tagTwo;
      this.tagThree = await tagThree;
      this.tagHot = await tagHot;
      this.newsRightList = await newsRight;
      this.newsList = await newsList;
      this.EvList = await evList;
      this.hobbiesList = await hobbiesList;
      this.videoRightList = await videoList;
      this.dayList = await dayList;
      this.monthList = await monthList;
      // this.weekList = await weekList;
      this.hobbiesItem = await hobbiesItem;
    });
  },
  methods: {
    // 添加块级广告
    // getAdverBlock(domId, adverId) {
    //   let dom = document.getElementById(domId)
    //   if (dom) {
    //     window.slotbydup = window.slotbydup || []
    //     window.slotbydup.push({
    //       id: adverId,
    //       container: dom,
    //       size: '1200,200',
    //       display: 'inlay-fix'
    //     })
    //   }
    // },
    // 打印各个模块到顶部位置
    showModuleToTop() {
      let news = document.getElementById("news");
      let cars = document.getElementById("cars");
      let resources = document.getElementById("resources");
      let hobbies = document.getElementById("hobbies");
      let videos = document.getElementById("videos");
    },

    // 获取轮播图数据
    async getBannerData(cChannel, linktype = "second", bChannel) {
      let data = [];
      try {
        let obj = {};
        if (cChannel === "") {
          obj.bChannel = bChannel;
          obj.linktype = linktype;
        } else {
          obj.cChannel = cChannel;
          obj.linktype = linktype;
        }
        let result = await $get(webBannerList, obj);
        let arr = [];
        if (Array.isArray(result.data)) {
          data = result.data;
        } else {
          data = [];
        }
      } catch (err) {
        console.log(err);
        data = [];
      }
      return data;
    },

    // 获取随机tag
    async getTag(channel) {
      let result = [];
      try {
        let data = await $get(webTagGetRandomTagsByChannel, { channel });
        if (Array.isArray(data.data)) {
          result = data.data;
        }
        // console.log(result)
      } catch (err) {
        // console.log(err)
        return result;
      }
      return result;
    },

    // 获取新能源热点
    async getHotTag() {
      let result = [];
      try {
        let data = await $get(webTagGetNewEnergyTags);
        if (Array.isArray(data.data)) {
          result = data.data;
        }
      } catch (err) {
        return result;
      }
      return result;
    },

    // 板块轮播切换背景图
    changeBg(value) {
      this.newsActiveUrl = value;
    },

    // 获取今日车闻右侧内容
    async getNewsRightContent(channel) {
      let result = [];
      try {
        let data = await $get(webEssayGetessayBycarnews, { channel });
        if (Array.isArray(data.data)) {
          let list = data.data;
          if (list.length <= 10) {
            result = list;
          } else {
            result = list.slice(0, 11);
          }
        }
      } catch (err) {
        console.log(err);
        result = [];
      }
      return result;
    },

    // 今日车闻右侧内容换一批
    async changeList() {
      let data = await this.getNewsRightContent(2);
      this.newsRightList = data;
    },

    // 获取板块文章内容
    async chennelContent(channel, pageNo = 1, pageSize) {
      let result = [];
      try {
        let data = await $get(webEssayGetEssayByChannelShou, {
          channel,
          pageNo,
          pageSize
        });
        if (Array.isArray(data.data)) {
          result = data.data;
          // console.log(result)
          result.forEach(v => {
            v.classOneName = v.classOneName.toLowerCase();
            if (v.classOneName.toLowerCase() == "news") {
              v.classOneName = "今日车闻";
            } else if (v.classOneName.toLowerCase() == "video") {
              v.classOneName = "视频";
            } else if (v.classOneName.toLowerCase() == "ev") {
              v.classOneName = "新能源";
            } else {
              v.classOneName = "兴趣部落";
            }
          });
        } else {
          result = [];
        }
      } catch (err) {
        console.log(err);
        result = [];
      }
      return result;
    },

    // 监听兴趣部落轮播切换，并切换背景
    changeHobbiesBg(url) {
      this.hobbiesActiveUrl = url;
    },

    // 获取排行版数据
    async getSortList(type, pageNo = 1, size = 10) {
      let result = null;
      try {
        switch (type) {
          case "day":
            result = await $get(webEssayGetDayRank, { pageNo, size });
            break;
          case "month":
            result = await $get(webEssayGetMonthRank, { pageNo, size });
            break;
          case "week":
            result = await $get(webEssayGetWeekendRank, { pageNo, size });
            break;
        }
      } catch (err) {
        console.log(err);
        result = {};
      }

      return result.data == null ? [] : result.data.essayEntities;
    },

    // 获取hobbies列表
    async getHobbiesList(limit = 6, page = 1) {
      let result = null;
      try {
        let temp = await $get(webHobbiesList, { limit, page });
        let data = temp.data.list;
        // console.log(data)
        result = data;
      } catch (err) {
        result = [];
      }
      return result;
    },

    // 获取hobbies右方数据
    async getHobbiesItem() {
      let result = null;
      try {
        let temp = await $get(webHobbiesGetOneHobbies);
        let data = temp.data;
        // console.log(data)
        result = data;
      } catch (err) {
        console.log(err);
        result = {};
      }
      return result;
    },
    // 添加广告方法
    addAd() {
      // 首页今日车闻部分通栏广告
      (window.slotbydup = window.slotbydup || []).push({
        id: "5993935",
        container: "index_news_ad",
        size: "1200,200",
        display: "inlay-fix",
        async: true
      });
      // 首页视频部分通栏广告
      (window.slotbydup = window.slotbydup || []).push({
        id: "5993929",
        container: "index_video_ad",
        size: "1200,200",
        display: "inlay-fix",
        async: true
      });
      // 首页底部广告
      (window.slotbydup = window.slotbydup || []).push({
        id: "5993932",
        container: "index_footer_ad",
        size: "1200,200",
        display: "inlay-fix",
        async: true
      });
    }
  }
};
</script>
<style>
.mt40 {
  padding-top: 40px;
}

.mt35 {
  padding-top: 35px;
}

.sort-list {
  display: flex;
  justify-content: center;
}

.ml30 {
  margin-left: 30px;
}

.guanggao {
  position: relative;
  width: 1200px;
  height: 200px;
}
.guanggao .index_ad_des {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 40px;
  height: 20px;
  box-sizing: border-box;
  font-size: 12px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.index_card_list {
  height: 420px;
}

.index_sorts_list {
  width: 1200px;
  font-size: 0px;
}
</style>
