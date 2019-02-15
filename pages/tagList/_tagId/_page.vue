<template>
  <div class="tag_wrapper">
    <div class="tag_header">
      <Header></Header>
    </div>
    <div class="tag_content">
      <div class="tag_content_nav">
        <div class="tag_breadCrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: preRouteObj.path }">{{ preRouteObj.name}}</el-breadcrumb-item>
            <el-breadcrumb-item class="current"><strong>{{tagObj.title}}</strong></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="tag_des"
          v-if="tagObj.url && tagObj.des">
          <div class="tag_des_img">
            <img v-if="tagObj.url"
              :src="titleUrl"
              :alt="tagObj.title">
          </div>
          <!--  <div v-if="!tagObj.url"
            class="tag_des_content_empty_show">
            <p class="tag_title">{{tagObj.title}}</p>
            <p class="tag_description">{{tagObj.des}}</p>
          </div> -->
          <div class="tag_des_content">
            <h2 class="tag_title">{{tagObj.title}}</h2>
            <p class="tag_description"
              v-html="tagObj.des"></p>
          </div>
        </div>
      </div>
      <div class="tag_main_content">
        <div class="tag_main_nav">
          <p class="title"><i class="img"></i>与<span class="redColor">“{{tagObj.title}}”</span>相关文章共{{pageObj.totalCount}}条</p>
        </div>
        <div class="tag_list">
          <div class="tag_list_left">
            <ul>
              <li v-for="(eassy, index) in eassyListUrl"
                :key="index"      
                class="tag_list_left_li">
                <nuxt-link class="tag-nuxt-link" :to=" eassy.title === 'hobbies' ?  `/hobbies/hobbiesDetail/${eassy.id}/1` : `/tagList/detail/${eassy.id}/1`">
                  <div class="img_wrapper">
                    <img :src="eassy.photo"
                      :alt="eassy.title">
                  </div>
                </nuxt-link>
                  <div class="tag_item">
                    <p class="tag_title"
                      v-if="eassy.title !== 'hobbies'">
                      <nuxt-link class="tag-nuxt-link tag-nuxt-des nuxt-redColor" :to="`/tagList/detail/${eassy.id}/1`"><strong>{{eassy.title}}</strong>
                      </nuxt-link>
                    </p>
                    <div class="tag_line">
                      <span class="one"></span><span class="two"></span>
                    </div>
                    <nuxt-link class="tag-nuxt-link tag-nuxt-des" :to="`/tagList/detail/${eassy.id}/1`">
                    <div class="des nuxt-redColor">
                      {{eassy.digest}}
                    </div>
                    </nuxt-link>
                    <div class="userMsg">
                      <nuxt-link class="tag-nuxt-link" :to="`/Bloger/${eassy.userId}/1`">
                        <div class="avatar"
                        ><img :src="eassy.userPhoto"
                            :alt="eassy.userName"><span class="name">{{eassy.userName}}</span><span class="tag_line">|</span>
                        </div>
                      </nuxt-link>
                      <div class="channel">{{className(eassy.className)}}</div>
                      <div class="time"
                        v-text="formatData(eassy.create_time)"></div>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination v-if="pageObj.totalCount"
              background
              :current-page="pageObj.currPage"
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              :page-count="pageObj.totalPage"
              :page-size="pageObj.pageSize"
              :total="pageObj.totalCount">
            </el-pagination>
          </div>
          <div class="tag_list_right">
            <ul class="tag_list_ul">
              <li class="tag_ad">
                <div id="search_ad_1"></div>
                <div class="ad_des">广告</div>
                <div class="ad_des">广告</div>
              </li>
              <li class="tag_ad">
                <div id="tag_ad_2"></div>
                <div class="ad_des">广告</div>
              </li>
              <li class="tag_ad">
                <div id="tag_ad_3"></div>
                <div class="ad_des">广告</div>
              </li>
              <li class="tag_ad">
                <div id="tag_ad_4"></div>
                <div class="ad_des">广告</div>
              </li>
            </ul>
            <div class="rank"
              :style="{paddingLeft: '30px'}">
              <el-tabs v-model="activeName"
                @tab-click="changType">
                <el-tab-pane label="周排行榜"
                  name="weekRank"
                  class="weekRank">
                  <ul>
                    <li v-for="(item, index) in WeekendRank"
                      :key="index"
                      @click="toArticleDetail(item.essayId)">
                      <p class="tag_p"><span :class="[isAddBg(index), 'normal']">{{index + 1}}</span><span class="des">{{item.title}}</span></p>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="月排行榜"
                  class="monthRank"
                  name="monthRank">
                  <ul>
                    <li v-for="(month, index) in MonthRank"
                      :key="index"
                      @click="toArticleDetail(month.essayId)">
                      <p class="tag_p"><span :class="[isAddBg(index), 'normal']">{{index + 1}}</span> <span class="des">{{month.title}}</span></p>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
              <div class="moreRank"
                @click="toRank"><span>更多></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="advertise_wrapper">
        <div id="other_long_ad"></div>
        <div class="ad_des">广告</div>
      </div>
    </div>
    <div class="tag-footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { $get, $post } from "@/http/ajax";
import systemManage from "@/http/url";
import {
  webTagGetTagDetail,
  webEssayList,
  webTagAboutList,
  webEssayGetWeekendRank,
  webEssayGetMonthRank
} from "@/http/api";
export default {
  name: "tagList",
  head(){
    return {
      title: `${this.tagObj.title}_${this.pageObj.currPage}页-尖锋咖`,
            // 设置 meta
      meta: [
        {
          hid: 'keyWords',
          name: 'keyWords',
          content: ''
        },
        {
          hid: 'description',
          name: 'description',
          content: `${this.metaDesc}`
        },
        {
          hid: 'applicable-device',
          name: 'applicable-device',
          content: 'pc'
        },
        {
          hid: 'mobile-agent',
          name: 'mobile-agent',
          content: `format=html5;url=http://m.jfcar.com.cn`
        }
      ],
    }
  },
  // nuxt异步获取数据
  async asyncData({ params }) {
    let WeekendRank = null;
    let MonthRank = null;
    let getWebEassyList = await $get(webTagAboutList, {
      tagId: params.tagId,
      page: params.page,
      limit: "6"
    });
    // 获取文章周排行榜
    await $get(webEssayGetWeekendRank, { pageNo: "1", size: "10" }).then(
      res => {
        WeekendRank = res.data.essayEntities;
      }
    );
    // 获取文章月排行榜
    await $get(webEssayGetMonthRank, { pageNo: "1", size: "10" }).then(res => {
      MonthRank = res.data.essayEntities;
    });
    return {
      pageObj: getWebEassyList.data,
      eassyList: getWebEassyList.data.list,
      WeekendRank: WeekendRank,
      MonthRank: MonthRank,
      searchContent: params.searchContent // 暴露当前搜索的tagId
    };
  },
  created(){
    this.eassyList.forEach((element, index) => {
      if (index == 0) {
        this.metaDesc = element.digest
      }
    })
  },
  beforeMount() {
    this.createAdPicture();
    this._getWebTagDetail_();
    let preRouteSearContent = sessionStorage.getItem("tagRoute")
      ? sessionStorage.getItem("tagRoute").searchContent
      : "";
    if (this.searchContent === preRouteSearContent) {
      let name = "";
      let myFrom = JSON.parse(sessionStorage.getItem("tagRoute"));
      let mypath = myFrom.mypath;
      if (!mypath || mypath.indexOf("search") || mypath.indexOf("hots") === 0) {
        name = "首页";
      } else if (mypath.indexOf("news") === 0) {
        name = "今日车闻";
      } else if (mypath.indexOf("ev") === 0) {
        name = "新能源";
      } else if (mypath.indexOf("hobby") === 0) {
        name = "兴趣部落";
      } else if (mypath.indexOf("video") === 0) {
        name = "视频";
      } else if (mypath.indexOf("sorts") === 0) {
        name = "排行榜";
      }
      this.preRouteObj = { path: myFrom.fullPath, name };
        // console.log('preRouteOjb', this.preRouteObj)
    }
  },
  data() {
    return {
      metaDesc:'',
      activeName: "weekRank",
      tagObj: {},
      pageObj: {},
      eassyList: [],
      WeekendRank: [],
      MonthRank: [],
      preRouteObj: {},
      currentRouteObj: {},
      defaultParams: {
        limit: "6",
        page: "1"
      },
      type: "w",
     /*  headMeta: {
        keyWord:[
        '首页,尖锋,尖锋咖,尖锋汽车网,尖锋汽车咨询,尖锋今日车闻,尖锋新能源,尖锋视频,尖锋兴趣部落,jfcar',
        '今日车闻,新闻,资讯,汽车资讯,尖锋咖,新车动态,八卦车闻,交通资讯,国际车闻,车坛动态,各地车展,厂商动态',
        '新能源,新能源车,新能源电动车,新能源车价格,新能源车补贴,尖锋咖',
        '兴趣部落,尖锋汽车部落,尖锋汽车俱乐部,尖锋社区,尖锋互动中心',
        '视频,尖锋汽车视频,尖锋汽车评测,新车评测,汽车试驾',
        ],
        description: [
          '尖锋咖为您提供最新汽车咨询，汽车图片，最精彩的汽车新闻、行情、评测、导购内容，是提供信息最独特的中国尖锋汽车网站。',
          '尖锋咖提供最新即时汽车资讯，内容包括社区资讯、新车动态、八卦车闻、交通资讯、国际车闻、车坛动态、各地车展、厂商动态等',
          '尖锋咖新能源为您提供新能源汽车价格，新能源车类型，新能源汽车补贴政策，新能源车有哪些，新能源电动车，增程式电动车，插电式油电混合动力车，双燃料车等信息，更多新能源汽车信息尽在尖锋咖',
          '尖锋咖兴趣部落中国最大的汽车社区之一，包括各尖锋汽车俱乐部，车友互动，经验交流，汽车维修保养等海量信息，尖锋咖兴趣部落让你的生活更精彩',
          '尖锋视频为车友们提供各种汽车视频集锦，包括尖锋车友的原创视频，新车上市、试驾评测、赛车美女视频以及汽车广告视频等，为大家分享最精彩的汽车视频大全。'
        ]
        } */
    };
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // console.log("tagGrom", from);
    let mypath = from.fullPath.slice(1);
    let name = "";
    next(vm => {
      /* 如果在当前页刷新，临时使用跳转过来的路由 */
      if (!from.name) {
        let myFrom = JSON.parse(sessionStorage.getItem("tagRoute"));
        mypath = myFrom.fullPath.slice(1);
        if (!mypath || mypath.indexOf("search") === 0) {
          name = "首页";
        } else if (mypath.indexOf("news") === 0) {
          name = "今日车闻";
        } else if (mypath.indexOf("ev") === 0) {
          name = "新能源";
        } else if (mypath.indexOf("hobby") === 0) {
          name = "兴趣部落";
        } else if (mypath.indexOf("video") === 0) {
          name = "视频";
        } else if (mypath.indexOf("sorts") === 0) {
          name = "排行榜";
        }
        vm.preRouteObj = { path: myFrom.fullPath, name };
        vm.currentRouteObj = { path: to.fullPath, name: to.meta.title };
      } else {
        if (
          !mypath ||
          mypath.indexOf("search") === 0 ||
          mypath.indexOf("hots") === 0 ||
          !sessionStorage.getItem(
            "tagRoute" && from.name === "tagList-tagId-page"
          )
        ) {
          name = "首页";
        } else if (mypath.indexOf("news") === 0) {
          name = "今日车闻";
        } else if (mypath.indexOf("ev") === 0) {
          name = "新能源";
        } else if (mypath.indexOf("hobby") === 0) {
          name = "兴趣部落";
        } else if (mypath.indexOf("video") === 0) {
          name = "视频";
        } else if (mypath.indexOf("sorts") === 0) {
          name = "排行榜";
        }
        sessionStorage.setItem(
          "tagRoute",
          JSON.stringify({
            ...from,
            searchContent: from.params.searchContent,
            mypath
          })
        );
        vm.preRouteObj = { path: from.fullPath, name };
      }
      vm.currentRouteObj = { path: to.fullPath, name: to.meta.title };
    });
  },
  computed: {
    // 拼接list里面的头像的地址
    titleUrl() {
      if(this.tagObj.url.indexOf('http:') >= 0 || this.tagObj.url.indexOf('/image') >= 0){
        return this.tagObj.url
      }
      return systemManage.getApi(this.tagObj.url);
    },
    eassyListUrl() {
      return this.eassyList.map(item => {
        item.photo = item.photo.indexOf('http:') >= 0 ?  item.photo : systemManage.getApi(item.photo);
        item.userPhoto = item.userPhoto.indexOf('http:') >= 0 ? item.userPhoto : systemManage.getApi(item.userPhoto);
        return item;
      });
    }
    //metaKeyWord
  /*   metaKeyWord() {
      switch(this.preRouteObj.name) {
        case '首页': {
          return this.headMeta.keyWord[0]
        }
         case '今日车闻': {
          return this.headMeta.keyWord[1]
        }
         case '新能源': {
          return this.headMeta.keyWord[2]
        }
         case '兴趣部落': {
          return this.headMeta.keyWord[3]
        }
          case '兴趣部落': {
          return this.headMeta.keyWord[3]
        }
      }
    } */
  },
  methods: {
    // 排名前三特殊背景
    isAddBg(i) {
      if (i < 3) {
        return "tag_special";
      } else {
        return "";
      }
    },
    // 处理所属模块
    className(name) {
      if (name !== "新能源" && name !== "视频" && name !== "今日车闻" && name) {
        return "兴趣部落";
      } else {
        return name;
      }
    },
    // 调到博主主页
    toBloger(id) {
      this.$router.push(`/Bloger/${id}/1`);
    },
    handleCurrentChange(val) {
      let id = this.$route.params.tagId;
      this.defaultParams.page = val;
      /* this._getWebEassyList_(id) */
      this.$router.push({ path: `/tagList/${id}/${val}` });
    },
    formatData(time) {
      if (time) {
        time = time.toString();
        return time.substring(0, 10);
      } else {
        return "";
      }
    },
    // // 获取相关文章列表
    // _getWebEassyList_() {
    //   let tagId = this.$route.params.tagId
    //   /* console.log(this.$route.params.page) */
    //   this.defaultParams.page = this.$route.params.page || '1'
    //   $get(webTagAboutList, {
    //     ...this.defaultParams,
    //     tagId
    //   }).then(res => {
    //     /*  console.log(res.data) */
    //     this.pageObj = res.data
    //     this.eassyList = res.data.list
    //     this.$forceUpdate()
    //   })
    // },
    changType() {
      if (this.activeName === "monthRank") {
        this.type = "m";
      } else {
        this.type = "w";
      }
    },
    // 调到排行榜页
    toRank() {
      let tagInfo = JSON.stringify({
        tagId: this.$route.params.tagId,
        title: this.tagObj.title
      });
      sessionStorage.setItem("tagInfo", tagInfo);
      this.$router.push({ path: `/tagList/rankList/${this.type}/1` });
    },
    // 跳转到文章详情页
    toArticleDetail(essayId, type) {
      this.$router.push({ path: `/tagList/detail/${essayId}/1` });
    },
    // 跳转到兴趣部落文章详情 或 文章
    toArticleOrHobbiesDetail(eassy) {
      if (eassy.title === "hobbies") {
        this.$router.push({ path: `/hobbies/hobbiesDetail/${eassy.id}/1` });
      } else {
        this.toArticleDetail(eassy.id);
      }
    },
    // 获取tag详情
    _getWebTagDetail_() {
      let id = this.$route.params.tagId;
      $get(webTagGetTagDetail, {
        id
      }).then(res => {
        this.tagObj = res.data;
      });
    },
    // 获取文章周和月排行榜
    // _getWeekendRank_() {
    //   $get(webEssayGetWeekendRank, { pageNo: '1', size: '10' }).then(res => {
    //     this.WeekendRank = res.data.essayEntities
    //   })
    // },
    // 获取文章周和月排行榜
    // _getMonthRank_() {
    //   $get(webEssayGetMonthRank, { pageNo: '1', size: '10' }).then(res => {
    //     this.MonthRank = res.data.essayEntities
    //   })
    // },
    // 生成广告图片
    createAdPicture() {
      (window.slotbydup = window.slotbydup || []).push({
        id: "5993947",
        container: "search_ad_1",
        size: "380,280",
        display: "inlay-fix",
        async: true
      });
      (window.slotbydup = window.slotbydup || []).push({
        id: "5993948",
        container: "tag_ad_2",
        size: "380,280",
        display: "inlay-fix",
        async: true
      });
      (window.slotbydup = window.slotbydup || []).push({
        id: "5993949",
        container: "tag_ad_3",
        size: "380,280",
        display: "inlay-fix",
        async: true
      });
      (window.slotbydup = window.slotbydup || []).push({
        id: "5993950",
        container: "tag_ad_4",
        size: "380,280",
        display: "inlay-fix",
        async: true
      });
      (window.slotbydup = window.slotbydup || []).push({
        id: "5993946",
        container: "other_long_ad",
        size: "1200,200",
        display: "inlay-fix",
        async: true
      });
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // $route: '_getWebEassyList_'
    $route(to, from) {
      this.$router.go(0);
    }
  },
  components: {
    Header,
    Footer
  }
};
</script >
<style lang="less">
.tag_wrapper {
  background: #f6f6f6;
  .tag_content {
    margin: 0 auto;
    width: 1200px;
    background: #f6f6f6;
    .tag_breadCrumb {
      padding-top: 30px;
      padding-bottom: 29px;
      background: #f6f6f6;
      .current {
        span {
          color: #be001e;
        }
      }
      .el-breadcrumb__inner:hover {
        color: #be001e;
      }
      .el-breadcrumb__separator{
        &::before {
          content: "";
          display: inline-block;
          padding: 0 10px;
          width: 6px;
          height: 8px;
          background: url("~static/images/small_right_black.png") no-repeat
            center;
        }
        &:last-child {
          &::before {
            background-image: url('~static/images/small_right_red.png')
          }
        }
      }
    }
    .tag_des {
      position: relative;
      margin-bottom: 51px;
      width: 100%;
      height: 200px;
      padding: 28px 0 0 0;
      box-sizing: border-box;
      background: #fff;
      &:after {
        content: "";
        display: block;
        clear: both;
      }
      .tag_des_img {
        float: left;
        margin: 0 11px 27px 29px;
        width: 180px;
        height: 135px;
        background-color: #e7e7e7;
        img {
          width: 100%;
          height: 100%;
        }
        background-image: url("~static/images/defaultLogo.png");
        background-repeat: no-repeat;
        background-position: center;
      }
      .tag_des_content,
      .tag_des_content_empty_show {
        position: absolute;
        right: -10px;
        bottom: -10px;
        margin: 10px 0 0 10px;
        padding-top: 10px;
        width: 980px;
        height: 160px;
        box-sizing: border-box;
        border-right: 10px solid #be001e;
        border-bottom: 10px solid #be001e;
        .tag_title {
          height: 24px;
          font-size: 24px;
          font-weight: bold;
          color: rgba(18, 18, 18, 1);
          line-height: 24px;
        }
        .tag_description {
          margin-top: 30px;
          padding-left: 4px;
          padding-right: 25px;
          box-sizing: border-box;
          width: 990px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(91, 91, 91, 1);
          line-height: 24px;
        }
      }
      .tag_des_content_empty_show {
        width: 1200px;
      }
    }
    .tag_main_content {
      background: #f6f6f6;
      .tag_main_nav {
        background: #f6f6f6;
        .title {
          margin-bottom: 31px;
          height: 42px;
          font-size: 26px;
          vertical-align: top;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 42px;
          .img {
            display: inline-block;
            margin-right: 15px;
            vertical-align: top;
            width: 8px;
            height: 42px;
            background: url("~static/images/tagList_nav.png") no-repeat center;
          }
          .redColor {
            color: #c63f4e;
          }
        }
      }
      .tag_list {
        position: relative;
        &:after {
          content: "";
          display: block;
          clear: both;
        }
        width: 1200px;
        .tag_list_left {
          float: left;
          width: 800px;
          min-height: 1px;
          margin-right: 20px;
          box-sizing: border-box;
          .tag_list_left_li {
            margin-bottom: 30px;
            margin-right: 30px;
            width: 100%;
            height: 280px;
            overflow: hidden;
            cursor: pointer;
            &:last-child {
              margin-bottom: 0;
            }
            .img_wrapper {
              float: left;
              width: 380px;
              height: 280px;
              background: url('~static/common/default.png');
              background-position: center;
              background-repeat: no-repeat;
              background-color: #e7e7e7;
              img {
                width: 100%;
                height: 280px;
                object-fit: cover;
              }
            }

            .tag_item {
              position: relative;
              display: inline-block;
              padding: 29px 42px 30px 40px;
              box-sizing: border-box;
              background: #fff;
              width: 410px;
              height: 100%;
              .tag_title {
                margin: 0 auto;
                width: 328px;
                // height: 34px;
                font-size: 26px;
                font-weight: 600;
                color: rgba(18, 18, 18, 1);
                // line-height: 34px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &:hover {
                  color: #be001e;
                }
              }
              .tag_line {
                position: relative;
                width: 100%;
                height: 65px;
                .one {
                  position: absolute;
                  width: 65px;
                  height: 1px;
                  border-top: 1px solid #ccc;
                }
                .one {
                  position: absolute;
                  left: 10px;
                  top: 30px;
                  width: 45px;
                  height: 1px;
                  border-top: 1px solid #ccc;
                }
                .two {
                  position: absolute;
                  width: 45px;
                  height: 1px;
                  left: 20px;
                  top: 32px;
                  border-top: 1px solid #ccc;
                }
              }
              .des {
                width: 331px;
                height: 38px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(18, 18, 18, 1);
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2; 
                /* autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                &:hover {
                  color: #be001e;
                }
              }
            }
            .userMsg {
              margin-top: 67px;
              height: 25px;
              width: 100%;
              font-size: 14px;
              div {
                display: inline-block;
              }
              .avatar {
                margin-right: 9px;
                min-width: 120px;
                height: 25px;
                vertical-align: top;
                cursor: pointer;
                &::after {
                  content: "";
                  display: "block";
                  clear: both;
                }
                img {
                  margin-right: 6px;
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  vertical-align: top;
                }
                .name {
                  margin-right: 20px;
                  height: 14px;
                  max-width: 54px;
                  vertical-align: top;
                  font-size: 14px;
                  cursor: pointer;
                  font-weight: 300;
                  color: rgba(177, 177, 177, 1);
                  line-height: 25px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .tag_line {
                  margin: 0 19px 0 3px;
                  width: 1px;
                  height: 11px;
                  line-height: 25px;
                  color: rgba(177, 177, 177, 1);
                }
              }
              .channel,
              .time {
                color: rgba(177, 177, 177, 1);
                line-height: 25px;
              }
              .time {
                float: right;
              }
            }
          }
        }
        .tag_list_right {
          position: relative;
          display: inline-block;
          width: 380px;
          .tag_list_ul {
            .tag_ad {
              position: relative;
              margin-bottom: 30px;
              height: 280px;
              background-color: #e7e7e7;
              background-image: url("~static/images/defaultLogo.png");
              background-repeat: no-repeat;
              background-position: center;
              img {
                width: 100%;
                height: 100%;
              }
              .ad_des {
                position: absolute;
                right: 10px;
                bottom: 10px;
                width: 40px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                background: transparent;
                text-align: center;
                font-size: 14px;
                cursor: pointer;
                color: rgba(255, 255, 255, 0.5);
                line-height: 20px;
              }
            }
          }
          .rank {
            position: relative;
            width: 380px;
            height: 452px;
            padding: 0 30px !important;
            box-sizing: border-box;
            background: #fff;
            overflow: hidden;
            .weekRank,
            .monthRank {
              .tag_p {
                height: 34px;
                cursor: pointer;
                margin-bottom: 0;
                vertical-align: middle;
                .des {
                  display: inline-block;
                  width: 269px;
                  padding-left: 20px;
                  line-height: 34px;
                  box-sizing: border-box;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                span:first-child {
                  box-sizing: content-box;
                  padding-left: 18px;
                }
                &:hover {
                  color: #f00;
                }
              }
              .normal {
                float: left;
                width: 26px;
                height: 34px;
                line-height: 34px;
                vertical-align: middle;
              }
              .tag_special {
                display: inline-block;
                width: 26px;
                height: 34px;
                color: #fff;
                line-height: 34px;
                vertical-align: middle;
                background: url("~static/images/rank_bg.png") no-repeat center,
                  url("~static/images/rank_bg_black.png") no-repeat 77% -15%;
              }
            }
            .moreRank {
              position: absolute;
              width: 42px;
              height: 46px;
              right: 19px;
              top: 20px;
              font-size: 14px;
              color: #999999;
              border-bottom: 1px solid #000;
              cursor: pointer;
              &:hover {
                color: #be001e;
              }
            }
          }
        }
        #tab-weekRank,
        #tab-monthRank {
          font-size: 18px;
          font-weight: 500;
          color: #000;
          font-weight: bold;
          &.is-active {
            color: #be001e;
          }
          &:hover {
            color: #be001e;
          }
        }
      }
    }
    .advertise_wrapper {
      position: relative;
      margin: 20px 0;
      width: 100%;
      height: 200px;
      background-color: #e7e7e7;
      background-image: url("~static/images/defaultLogo.png");
      background-repeat: no-repeat;
      background-position: center;
      .ad_des {
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 40px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        background: transparent;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.5);
        line-height: 20px;
      }
    }
    .advertise_wrapper > a {
      display: block;
      width: 100%;
      height: 100%;
    }
    .advertise_wrapper > a > img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .el-tabs__nav-scroll {
    width: 360px !important;
    box-sizing: border-box;
    padding: 10px 7px !important;
  }
  .el-tabs__nav-wrap::after {
    width: 100%;
    height: 0;
    border: 1px solid #000;
  }
  .el-tabs__active-bar {
    width: 90px !important;
    height: 6px;
    top: 110%;
    margin-left: -8px;
    background: url("~static/images/tag_scroll.png") no-repeat !important;
  }
  .btn-prev,
  .btn-next {
    width: 80px;
    height: 40px;
    background: rgba(255, 255, 255, 1) !important;
    box-shadow: 0px 3px 0px 0px rgba(228, 228, 228, 1) !important;
    color: #000 !important;
  }
  .btn-prev:hover,
  .btn-next:hover {
    color: #fff !important;
    background: #000 !important;
    box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
  }
  .el-pagination {
    margin: 30px auto;
    text-align: center;
  }
  .el-pager {
    .number,
    li.btn-quicknext,
    li.more {
      color: #000;
      width: 40px;
      height: 40px;
      line-height: 40px;
      background: rgba(255, 255, 255, 1) !important;
      box-shadow: 0px 3px 0px 0px rgb(228, 228, 228, 1) !important;
      &.active {
        background: #000 !important;
        box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
      }
      &:hover {
        color: #fff !important;
        background: #000 !important;
        box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
      }
    }
  }
  .tag-nuxt-link {
    float: left;
    &.tag-nuxt-des {
      width: 328px;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .nuxt-redColor:hover {
    color: rgb(180, 32, 32)
  }
}
</style>
