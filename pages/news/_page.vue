<template>
  <div>
    <Header></Header>
    <BigCoursel :list="topBanner"
      id="`2`"></BigCoursel>
    <div class="todayNew"
      style="padding:0px">
      <div class="todayTitle">
        <span>今 日 车 闻</span><br>
        <span><i class="el-icon-caret-right"></i> N E W S <i class="el-icon-caret-left"></i></span>
      </div>
      <div class="todayNav">
        <ul>
          <div v-for="(item, index) in tabData"
            :key="index"
            class="navWrap">
            <nuxt-link :to="`/taglist/${item.id}/1`">
              <li :class="navTabActiveStatus == true&&navTabActiveIndex == index ? ['navActiveClass', 'active']: '' "
                @mouseenter="navTabActive(item)"
                @mouseleave="removeNavTabActive()">
                <strong>
                  {{item.title}}
                </strong>
              </li>
            </nuxt-link>
          </div>
        </ul>
      </div>
      <div class="mainContent">
        <div class="leftSide">
          <!-- 切割出来的第一单位 -->
          <div>
            <el-container class="todayContainer"
              v-for="(item,index) in firstHalfData"
              :key="index">
              <div class="todayAdviseWrap">
                <el-main class="todayMain"
                  style="padding:0px">
                  <div class="todayImg"
                    @mouseenter="titleActive(item)"
                    @mouseleave="removeTitleActiveFn()">
                    <nuxt-link :to="`/${detailsObj['news']}/detail/${item.id}/1`">
                      <img :src="$ImgUrlRelative(piectImgUrl(item))"
                        :alt="item.title"
                        @error="imgLossLoad(item)"
                        @load="imgSeccessLoad(item)"
                        class="todayImg_class">
                    </nuxt-link>
                    <!-- <div class="defaultBox"
                      v-if="imgLoadStatus == false&& index == imgLossIndex">
                      <nuxt-link :to="`/news/detail/${item.id}/1`">
                        <img src="~static/common/default.png"
                          alt="尖锋咖"
                          width="160px">
                      </nuxt-link>
                    </div> -->
                  </div>
                  <div class="imgDesc">
                    <div @mouseenter="titleActive(item)"
                      @mouseleave="removeTitleActiveFn()"
                      :class="removeTitleActive == true&& titleActiveIndex == index ? 'redTitleLine' :'titleLine'"></div>
                    <nuxt-link :to="`/${detailsObj['news']}/detail/${item.id}/1`">
                      <p :class="removeTitleActive == true&&titleActiveIndex == index ? 'redColor' :'title'"
                        @mouseenter="titleActive(item)"
                        @mouseleave="removeTitleActiveFn()">
                        <strong>
                          {{item.title}}
                        </strong>
                      </p>
                    </nuxt-link>
                    <p class="detail">{{item.digest}}</p>
                  </div>
                </el-main>
                <el-footer class="todayFooter">
                  <div class="footerBox">
                    <nuxt-link :to="`/bloger/${item.authorId}/1`">
                      <img :src="$ImgUrlRelative(piectProfileUrl(item))"
                        :alt='item.author'
                        class="userIcon"></nuxt-link>
                    <nuxt-link :to="`/bloger/${item.authorId}/1`">
                      <span class="userName">{{item.author}}</span></nuxt-link>
                    <div class="todayDivider"></div>
                    <!-- <span class="classOneName">{{item.classOneName}}</span> -->
                    <!-- 改全部类别为今日车闻 -->
                    <span class="classOneName">今日车闻</span>
                    <div class="todayResult">
                      <div class="goodBox"
                        @click="showGoodPercent(item)">
                        <!-- 飘起 +1 特效 -->
                        <i class="goodAnimation">
                          <transition name="goodAdd">
                            <p v-if="item.goodAddClass == true">+1</p>
                          </transition>
                        </i>
                        <!-- 有token，可以点击 -->
                        <i :class="item.showPercent ? 'goodPrecentBackground':'up'">
                        </i>
                        <!-- 没token , 提示 -->
                        <!-- <i @click="haveNoToken()"
                        :class="item.showPercent ? 'goodPrecentBackground':'up'"
                        v-else></i>-->
                        <span v-text="Math.round(item.goodPercent)+'%'"
                          :class="item.showPercent ? 'showPrecent':''">
                        </span>
                      </div>
                      <div class="badBox"
                        @click="showBadPercent(item)">
                        <!-- 有token，可以点击 -->
                        <i :class="item.showPercent ? 'badPrecentBackground':'down'">
                        </i>
                        <!-- 没token , 提示 -->
                        <!-- <i @click="haveNoToken()"
                        :class="item.showPercent ? 'badPrecentBackground':'down'"
                        v-else>
                      </i> -->
                        <span v-text="Math.round(item.badPercent)+'%'"
                          :class="item.showPercent ? 'showPrecent':''">
                        </span>
                      </div>
                    </div>
                  </div>
                </el-footer>
              </div>
            </el-container>
          </div>
          <!-- 中间文章广告位 -->
          <div id="advertiseBox">
            <!-- <a href="http://www.acura.com.cn/rdx/special/?mz_ca=2106651&mz_sp=7K9Bh&mz_sb=1"
              target="_blank"> -->
            <div id="imgBox"
              @mouseenter="adverTitleActiveFn()"
              @mouseleave="removeAdverTitleActiveFn()">
              <!--如果有广告，自然会覆盖，如果没，则展示默认图片 -->
              <img src="~static/common/default.png"
                alt="尖锋咖">
            </div>
            <!-- </a> -->
            <div class="imgFlagBox">
              <span class="flag">广告</span></div>
            <div class="imgDesc">
              <div @mouseenter="adverTitleActiveFn()"
                @mouseleave="removeAdverTitleActiveFn()"
                :class="adverActive == true ? 'redTitleLine':'titleLine'"></div>
              <a href="http://www.acura.com.cn/rdx/special/?mz_ca=2106651&mz_sp=7K9Bh&mz_sb=1"
                target="_blank">
                <p :class="adverActive == true ? 'redColor':'title'"
                  @mouseenter="adverTitleActiveFn()"
                  @mouseleave="removeAdverTitleActiveFn()">
                  <strong>
                    全新RDX狂热登场
                  </strong>
                </p>
              </a>
              <!-- <span class="detail">{{adverMessage}}</span> -->
              <p class="detail">新RDX有着强烈的个性和独特的产品力，就像一位棱角分明的青年，符合讴歌坚持自我的“异行者”的品牌定位。新RDX能否肩负起复兴讴歌品牌的重任，让我们拭目以待</p>
            </div>
          </div>
          <!-- 切割出来的第二单位 -->
          <div>
            <el-container class="todayContainer"
              v-for="(item,index) in secondHalfData"
              :key="index">
              <div class="todayAdviseWrap">
                <el-main class="todayMain"
                  style="padding:0px">
                  <div class="todayImg"
                    @mouseenter="titleActive(item)"
                    @mouseleave="removeTitleActiveFn()">
                    <nuxt-link :to="`/${detailsObj['news']}/detail/${item.id}/1`">
                      <img :src="$ImgUrlRelative(piectImgUrl(item))"
                        :alt="item.title"
                        @error="imgLossLoad(item)"
                        @load="imgSeccessLoad(item)"
                        class="todayImg_class">
                    </nuxt-link>
                    <!-- <div class="defaultBox"
                      v-if="imgLoadStatus == false&& index == imgLossIndex">
                      <nuxt-link :to="`/news/detail/${item.id}/1`">
                        <img src="~static/common/default.png"
                          alt="尖锋咖"
                          width="160px">
                      </nuxt-link>
                    </div> -->
                  </div>
                  <div class="imgDesc">
                    <div @mouseenter="titleActive(item)"
                      @mouseleave="removeTitleActiveFn()"
                      :class="removeTitleActive == true&& titleActiveIndex == index ? 'redTitleLine' :'titleLine'"></div>
                    <nuxt-link :to="`/${detailsObj['news']}/detail/${item.id}/1`">
                      <p :class="removeTitleActive == true&&titleActiveIndex == index ? 'redColor' :'title'"
                        @mouseenter="titleActive(item)"
                        @mouseleave="removeTitleActiveFn()">
                        <strong>
                          {{item.title}}
                        </strong>
                      </p>
                    </nuxt-link>
                    <p class="detail">{{item.digest}}</p>
                  </div>
                </el-main>
                <el-footer class="todayFooter">
                  <div class="footerBox">
                    <nuxt-link :to="`/bloger/${item.authorId}/1`">
                      <img :src="$ImgUrlRelative(piectProfileUrl(item))"
                        :alt='item.author'
                        class="userIcon"></nuxt-link>
                    <nuxt-link :to="`/bloger/${item.authorId}/1`">
                      <span class="userName">{{item.author}}</span></nuxt-link>
                    <div class="todayDivider"></div>
                    <!-- <span class="classOneName">{{item.classOneName}}</span> -->
                    <!-- 改全部类别为今日车闻 -->
                    <span class="classOneName">今日车闻</span>
                    <div class="todayResult">
                      <div class="goodBox"
                        @click="showGoodPercent(item)">
                        <!-- 飘起 +1 特效 -->
                        <i class="goodAnimation">
                          <transition name="goodAdd">
                            <p v-if="item.goodAddClass == true">+1</p>
                          </transition>
                        </i>
                        <!-- 有token，可以点击 -->
                        <i :class="item.showPercent ? 'goodPrecentBackground':'up'">
                        </i>
                        <!-- 没token , 提示 -->
                        <!-- <i @click="haveNoToken()"
                        :class="item.showPercent ? 'goodPrecentBackground':'up'"
                        v-else></i>-->
                        <span v-text="Math.round(item.goodPercent)+'%'"
                          :class="item.showPercent ? 'showPrecent':''">
                        </span>
                      </div>
                      <div class="badBox"
                        @click="showBadPercent(item)">
                        <!-- 有token，可以点击 -->
                        <i :class="item.showPercent ? 'badPrecentBackground':'down'">
                        </i>
                        <!-- 没token , 提示 -->
                        <!-- <i @click="haveNoToken()"
                        :class="item.showPercent ? 'badPrecentBackground':'down'"
                        v-else>
                      </i> -->
                        <span v-text="Math.round(item.badPercent)+'%'"
                          :class="item.showPercent ? 'showPrecent':''">
                        </span>
                      </div>
                    </div>
                  </div>
                </el-footer>
              </div>
            </el-container>
          </div>
          <div class="paginationShow"
            v-if="leftSideResult.EssayEntity&&leftSideResult.EssayEntity.length != 0">
            <pagination v-on:pageChange="newPage"
              :totalCount="leftSideResult.essayCount"
              :pageSize="12"
              :totalPage="leftSideResult.totalPageCount"
              :toTop="{x:0,y:760}"
              :routePage="`${currentPage}`"></pagination>
          </div>
        </div>
        <div class="rightSide">
          <div class="rightSideContent">
            <div class="firstBanner">
              <el-container>
                <el-header class="rightSizeHead"
                  style="padding:0px">
                  <img src="~static/images/20.png">&nbsp;
                  <span v-html="bannerMessageData.title"></span>
                </el-header>
                <el-main v-if="bannerMessageData.photoLinks&&bannerMessageData.photoLinks.length >=2 ">
                  <firstFeature :bannerData="bannerMessageData.photoLinks"></firstFeature>
                </el-main>
                <div class="oneItemBlock"
                  v-else>
                  <a :href="bannerMessageData.photoLinks == null ? '' : bannerMessageData.photoLinks[0].url"
                    target="_blank">
                    <img :src="$ImgUrlRelative(piectFeatureUrl(bannerMessageData.photoLinks == null ? '' : bannerMessageData.photoLinks[0].photo))"
                      :alt="bannerMessageData.photoLinks == null ? '' :bannerMessageData.photoLinks[0].title"
                      @error="imgFeatureLossLoad()"
                      @load="imgFeatureSeccessLoad()"
                      class="itemBlockImg">
                  </a>
                  <div class="oneItemDefaultBox"
                    v-if="imgFeatureLoadStatus == false">
                    <!-- 没图片或加载不出来，展示默认图片 -->
                    <a :href="bannerMessageData.photoLinks == null ? '' : bannerMessageData.photoLinks[0].url"
                      target="_blank">
                      <img src="~static/common/default.png"
                        alt="尖锋咖"
                        width="160px">
                    </a>
                  </div>

                  <!-- 专栏遮罩层 -->
                  <div class="feature_titleWrap">
                  </div>
                  <img class="bannerBottomIcon"
                    src="~static/images/car_left.png">
                  <strong class="bannerFeatureTitle">{{bannerMessageData.photoLinks == null ? '' :bannerMessageData.photoLinks[0].title}}</strong>
                </div>
              </el-container>
            </div>
            <div class="secondBanner">
              <el-container>
                <el-header class="rightSizeHead"
                  style="padding:0px">
                  <img src="~static/images/20.png">&nbsp;
                  <span v-html="bannerTopicData.title"></span>
                </el-header>
                <el-main v-if="bannerTopicData.photoLinks&&bannerTopicData.photoLinks.length >=2 ">
                  <secondFeature :bannerData="bannerTopicData.photoLinks"></secondFeature>
                </el-main>
                <div class="oneItemBlock"
                  v-else>
                  <a :href="bannerTopicData.photoLinks == null ? '': bannerTopicData.photoLinks[0].url"
                    target="_blank">
                    <img :src="$ImgUrlRelative(piectFeatureUrl(bannerTopicData.photoLinks == null ? '': bannerTopicData.photoLinks[0].photo))"
                      :alt="bannerTopicData.photoLinks == null ? '' :bannerTopicData.photoLinks[0].title"
                      @error="imgFeatureLossLoad()"
                      @load="imgFeatureSeccessLoad()"
                      class="itemBlockImg">
                  </a>
                  <div class="oneItemDefaultBox"
                    v-if="imgFeatureLoadStatus == false">
                    <!-- 没图片或加载不出来，展示默认图片 -->
                    <a :href="bannerTopicData.photoLinks == null ? '': bannerTopicData.photoLinks[0].url"
                      target="_blank">
                      <img src="~static/common/default.png"
                        alt="尖锋咖"
                        width="160px">
                    </a>
                  </div>

                  <!-- 专栏遮罩层 -->
                  <div class="feature_titleWrap">
                  </div>
                  <img class="bannerBottomIcon"
                    src="~static/images/car_left.png">
                  <strong class="bannerFeatureTitle">{{bannerTopicData.photoLinks == null ? '' :bannerTopicData.photoLinks[0].title}}</strong>
                </div>
              </el-container>
            </div>
            <div class="todayRank">
              <todayRankTab :model="path[0]" :rankWeekLists="rankWeekLists" :rankMonthLists="rankMonthLists"></todayRankTab>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="adverBottom">
      <div id="adverImgBox">
        <!-- <img src="~static/img/guanggao.d7df3e1.png"
          alt="尖锋咖"> -->
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import systemManage from '@/http/url'
import firstFeature from '@/components/firstFeature.vue'
import secondFeature from '@/components/secondFeature.vue'
import Utils from '@/utils/until'
// 修改
// import todayRankTab from './components/todayRankTab.vue'
import todayRankTab from '@/components/rankTab.vue'
import pagination from '@/components/pagination.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import BigCoursel from '@/components/BigCoursel.vue'
import { $get } from '@/http/ajax.js'
import {
  webTagGetRandomTagsByChannel,
  dsfFeatureGetRutureByChannel,
  webEssayGetEssayByChannel,
  webEssayClickEssay,
  webBannerList,
  webEssayGetWeekendRank,
  webEssayGetMonthRank,
  // webGetIp
} from '@/http/api.js'
import { detailsObj } from '@/utils/defaultConfig.js'
import { setTimeout } from 'timers'

export default {
  name: 'News',
  head(){
    return {
      title: `今日车闻_${this.currentPage}页-尖锋咖`,
            // 设置 meta
      meta: [
        {
          hid: 'keyWords',
          name: 'keyWords',
          content: '今日车闻,新闻,资讯,汽车资讯,尖锋咖,新车动态,八卦车闻,交通资讯,国际车闻,车坛动态,各地车展,厂商动态'
        },
        {
          hid: 'description',
          name: 'description',
          content: '尖锋咖提供最新即时汽车资讯，内容包括社区资讯、新车动态、八卦车闻、交通资讯、国际车闻、车坛动态、各地车展、厂商动态等'
        },
        {
          hid: 'applicable-device',
          name: 'applicable-device',
          content: 'pc'
        },
        {
          hid: 'mobile-agent',
          name: 'mobile-agent',
          content: `format=html5;url=http://m.jfcar.com.cn${this.$route.fullPath}`
        }
      ],
    }
  },
  data: function() {
    return {
      // webIp:"",
      currentPage: 1,
      flag: 0,
      adverTop: '',
      firstHalfData:[],
      secondHalfData:[],
      tabData: [],
      topBanner: [],
      bannerMessageData: {},
      bannerTopicData: {},
      leftSideResult: [],
      navTabActiveStatus: false,
      navTabActiveIndex: '',
      titleActiveIndex: '',
      removeTitleActive: false,
      adverActive: false,
      tokenObj: null, //token对象
      path: '',
      model: '',
      cookie: '',
      metaDesc: '',
      metaKeyWords: '',
      adverMessage: '',
      imgLossIndex: '',
      imgLoadStatus: true,
      imgFeatureLoadStatus: true,
      detailsObj
    }
  },
  components: {
    firstFeature,
    secondFeature,
    todayRankTab,
    pagination,
    Header,
    Footer,
    BigCoursel
  },
  // nuxt异步获取数据
  async asyncData ({params,req}) {
    let token = Utils.b_getToken(req)
    let bannerTopicData
    let bannerMessageData
    // let ip =  await $get(webGetIp)
    // 标签tag
    let tabData = await $get(webTagGetRandomTagsByChannel, { id: '2' })
    let leftSideResult = await $get(
        webEssayGetEssayByChannel,
        {
          channel: '2',
          pageNo: params.page,
          size: 12
        },
        {
          'X-Auth0-Token': token
        }
      )
    // 周排行
    let rankWeekLists = await $get(webEssayGetWeekendRank, {
      pageNo: 1,
      size: 10
    })
    // 月排行
    let rankMonthLists = await $get(webEssayGetMonthRank, {
      pageNo: 1,
      size: 10
    })
    // 专栏数据
    let bannerResult = await $get(dsfFeatureGetRutureByChannel, {
      channel: 2
    })
    let banner = bannerResult.data == null ? [] : bannerResult.data
    if(banner != []){
        banner.forEach((element, index) => {
        if (index == 0) {
          bannerMessageData = element
        } else if (index == 1) {
          bannerTopicData = element
        }
      })
    }
    if (tabData.data && tabData.data.length >= 11) {
      tabData.data.splice(11)
    }
    return {
      tabData: tabData.data ?  tabData.data : [],
      leftSideResult: leftSideResult.data ? leftSideResult.data : [],
      rankWeekLists: rankWeekLists.data.essayEntities ? rankWeekLists.data.essayEntities : [],
      rankMonthLists: rankMonthLists.data.essayEntities ? rankMonthLists.data.essayEntities : [],
      bannerTopicData: bannerTopicData == null ? [] : bannerTopicData,
      bannerMessageData: bannerMessageData == null ? [] : bannerMessageData,
      // webIp : ip
    }
  },
  methods: {
    // 获取广告
    getAdvertise(boxId, advertiseId, bottomBoxId, bottomAdvertiseId) {
      let middleBox = document.getElementById(boxId)
      if (middleBox) {
        ;(window.slotbydup = window.slotbydup || []).push({
          id: advertiseId,
          container: middleBox,
          size: '790,450',
          display: 'inlay-fix',
          // 异步加载，不然广告不会显示
          async: true
        })
      }
      let bottomBox = document.getElementById(bottomBoxId)
      if (bottomBox) {
        ;(window.slotbydup = window.slotbydup || []).push({
          id: bottomAdvertiseId,
          container: bottomBox,
          size: '1200,200',
          display: 'inlay-fix',
          // 异步加载，不然广告不会显示
          async: true
        })
      }
      // document.domain = 'localhost'
      // let iframe = document.getElementsByTagName('iframe')[0]
      // console.log(iframe.contentWindow, '00000000')
      // this.adverMessage = iframe.contentWindow.document
      //   .getElementsByTagName('img')[0]
      //   .getAttribute('title')
    },
    // 文章的图片拼接
    piectImgUrl(item) {
      if(item.photo.indexOf('http:') >= 0 || item.photo.indexOf('/image') >= 0){
        return item.photo
      }
      return systemManage.getApi(item.photo)
    },
    // 头像的图片拼接
    piectProfileUrl(item) {
      if(item.photoUrl.indexOf('http:') >= 0 || item.photoUrl.indexOf('/image') >= 0){
        return item.photoUrl
      }
      return systemManage.getApi(item.photoUrl)
    },
    // 专栏的图片拼接
    piectFeatureUrl(item) {
      if(item.indexOf('http:') >= 0 || item.indexOf('/image') >= 0){
        return item
      }
      return systemManage.getApi(item)
    },
    newPage: function(value) {
      this.currentPage = value
    },
    navTabActive: function(item) {
      this.navTabActiveIndex = this.tabData.indexOf(item)
      this.navTabActiveStatus = true
    },
    titleActive(item) {
      if( this.titleActiveIndex = this.firstHalfData.indexOf(item) >= 0 ){
          this.titleActiveIndex = this.firstHalfData.indexOf(item)
      }else{
          this.titleActiveIndex = this.secondHalfData.indexOf(item)
      }
      this.removeTitleActive = true
    },
    adverTitleActiveFn() {
      this.adverActive = true
    },
    removeTitleActiveFn() {
      this.removeTitleActive = false
    },
    removeAdverTitleActiveFn() {
      this.adverActive = false
    },
    removeNavTabActive() {
      this.navTabActiveStatus = false
    },
    showGoodPercent: function(item) {
      if (item.click == 'click') {
        return
      }
      item.showPercent = true
      item.click = 'click'
      item.goodAddClass = true
      setTimeout(function() {
        item.goodAddClass = false
      }, 0)
      this.getPercent(item.id, 2, item)
    },
    showBadPercent: function(item) {
      if (item.click == 'click') {
        return
      }
      item.showPercent = true
      item.click = 'click'
      this.getPercent(item.id, 1, item)
    },
    // 获取点赞/爆胎的比例
    getPercent(articleId, Dtype, item) {
      this.$nextTick(async () => {
        let todayResultData = await $get(
          webEssayClickEssay,
          {
            essayId: articleId,
            type: Dtype
          },
          { 'X-Auth0-Token': this.cookie != '' ? this.cookie : this.tokenObj.token }
        )
        item.goodPercent = `${todayResultData.data.goodPercent}`
        item.badPercent = `${todayResultData.data.badPercent}`
      })
    },
    // 有无token的决策方法
    // haveNoToken() {
    //   this.$message({
    //     message: '您还没有登录，请先登录！',
    //     type: 'warning'
    //   })
    //   this.$router.push('/login')
    // },
    // 获取cookie方法
    getCookie(cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
      }
      return ''
    },
    // 判断文章的图片是否加载成功，若失败则执行的方法
    imgLossLoad(item) {
      this.imgLossIndex =
        this.leftSideResult.EssayEntity != null &&
        this.leftSideResult.EssayEntity.indexOf(item)
      this.imgLoadStatus = false
    },
    // 判断文章的图片是否加载成功，若成功则执行的方法
    imgSeccessLoad(item) {
      this.imgLossIndex =
        this.leftSideResult.EssayEntity != null &&
        this.leftSideResult.EssayEntity.indexOf(item)
      this.imgLoadStatus = true
    },
    // 判断专栏的图片是否加载成功，若失败则执行的方法
    imgFeatureLossLoad() {
      this.imgFeatureLoadStatus = false
    },
    // 判断专栏的图片是否加载成功，若成功则执行的方法
    imgFeatureSeccessLoad() {
      this.imgFeatureLoadStatus = true
    },
    async getTotalData() {
      this.getAdvertise('imgBox', '6124820', 'adverImgBox', '5994002')
      // 触发广告位方法
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      let obj = {
        'X-Auth0-Token': this.cookie != '' ? this.cookie : this.tokenObj.token
      }
      // let tabResult = await $get(webTagGetRandomTagsByChannel, { id: '2' })
      let topBigBanner = await $get(webBannerList, {
        bChannel: 2,
        linktype: 'first'
      })
      // let leftSideResult = await $get(
      //   webEssayGetEssayByChannel,
      //   {
      //     channel: '2',
      //     pageNo: this.$route.params.page,
      //     size: 6
      //   },
      //   obj
      // )

      // 判断是否为空
      // let leftResult = leftSideResult.data == null ? [] : leftSideResult.data
      // let tab = tabResult.data == null ? [] : tabResult.data
      let topBigBannerData = topBigBanner == null ? [] : topBigBanner
      // 使用nuxt异步获取数据
      // this.tabData = tab
      // this.leftSideResult = leftResult
      this.topBanner = topBigBannerData.data
    }
  },
  created(){
        this.currentPage = this.$route.params.page
        this.leftSideResult.EssayEntity.forEach((element, index) => {
        // 自添加的4个属性
        this.$set(element, 'upSrc', '')
        this.$set(element, 'downSrc', '')
        this.$set(element, 'showPercent', '')
        this.$set(element, 'goodAddClass', 'false')
        if (index == 0) {
          this.metaDesc = element.digest
        }
        if (element.click == 'click') {
          element.upSrc = '~static/images/201.png'
          element.downSrc = '~static/images/21.png'
          element.showPercent = true
        } else {
          element.upSrc = '~static/images/202.png'
          element.downSrc = '~static/images/211.png'
          element.showPercent = false
        }
      })
      // // 将文章数据切割成两块来展示，为了中间插入广告位
      if (this.leftSideResult.EssayEntity.length >= 2) {
        this.firstHalfData = this.leftSideResult.EssayEntity.slice(0, 2)
        this.secondHalfData = this.leftSideResult.EssayEntity.slice(2)
      } else {
        this.firstHalfData = this.leftSideResult.EssayEntity
        this.secondHalfData = []
      }
  },
  mounted() {
    // console.log(this.webIp,'===================?webip')
    // this.bannerResult.forEach((element, index) => {
    //   if (index == 0) {
    //     this.bannerMessageData = element
    //   } else if (index == 1) {
    //     this.bannerTopicData = element
    //   }
    // })
    this.path = this.$route.path.match(/^\/[a-z]+/gi)
    this.model = this.$route.fullPath.match(/^\/[a-z]+/gi)
    // this.currentPage = this.$route.params.page
    this.$nextTick(async () => {
      // 取cookie
      this.cookie = this.getCookie('token')
      if (this.cookie == '') {
        this.tokenObj = localStorage.getItem('userMsg') && localStorage.getItem('userMsg') != '' ?JSON.parse(localStorage.getItem('userMsg')) :'null'
      }
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      let obj = {
        'X-Auth0-Token': this.cookie != '' ? this.cookie : this.tokenObj.token
      }
      this.getTotalData()
      // let bannerResult = await $get(dsfFeatureGetRutureByChannel, {
      //   channel: 2
      // })
      // let banner = bannerResult.data == null ? [] : bannerResult.data
      // this.bannerResult = banner
    })
  },
  watch: {
    currentPage: {
      async handler(newPage, oldPage) {
            this.$router.push({
          path: `${this.model}/${newPage}`
        })
      }
    }
  }
}
</script>

<style>
.todayNew,
html,
body {
  width: 100%;
  background: #f6f6f6;
}
.todayNew .todayTitle {
  margin-left: auto;
  margin-right: auto;
  margin-top: 52px;
  margin-bottom: 0px;
  width: 180px;
  height: 80px;
  position: relative;
}
.todayNew .todayTitle span {
  width: 194px;
  height: 35px;
  font-size: 36px;
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
}
.todayNew .todayAdviseWrap {
  width: 100%;
  padding-bottom: 23px;
}
.todayNew .todayTitle span:nth-of-type(2) {
  position: absolute;
  left: 44px;
  font-size: 14px;
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
  line-height: 25px;
}
.todayNew .todayNav {
  margin: 0px auto;
  margin-top: 40px;
  width: 1200px;
  margin-bottom: 41px;
  text-align: center;
}
.todayNew .todayNav ul {
  width: 100%;
}
.todayNew .navWrap {
  margin-bottom: 10px;
  display: inline-block;
}
.todayNew .todayNav ul li {
  position: relative;
  list-style-type: none;
  float: left;
  line-height: 42px;
  padding: 0px 16px 0px 16px;
  height: 42px;
  margin-right: 10px;
  background: #f6f6f6;
  border: 2px solid rgba(231, 231, 231, 1);
  font-size: 14px;
  cursor: pointer;
}
.todayNew .todayNav a {
  color: black;
}
.todayNew .todayNav ul li::after {
  content: '';
  width: 15px;
  height: 15px;
  position: absolute;
  bottom: 1px;
  background: linear-gradient(134deg, transparent 13px, #bd081e 0);
  right: 2px;
  display: none;
}

.todayNew .todayNav ul li.active::after {
  display: block;
}

.todayNew .mainContent {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.todayNew .leftSide {
  width: 790px;
  height: auto;
  float: left;
  margin-right: 29px;
  position: relative;
}

.todayNew .todayContainer,
.todayNew .leftSide #advertiseBox {
  width: 100%;
  background: white;
  margin-bottom: 30px;
  position: relative;
}
.todayNew .leftSide #advertiseBox {
  height: 586px;
}
.todayNew #advertiseBox #imgBox {
  width: 100%;
  height: 444.4px;
  line-height: 444px;
  overflow: hidden;
  text-align: center;
  background: #e7e7e7;
  position: relative;
}
.todayNew #advertiseBox .imgFlagBox {
  width: 100%;
  height: 20px;
  position: absolute;
}
.todayNew .imgFlagBox .flag {
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: white;
  width: 40px;
  height: 20px;
  border: 1px solid white;
  opacity: 0.5;
  position: absolute;
  bottom: 34px;
  right: 40px;
}
.todayNew .todayImg {
  overflow: hidden;
  width: 100%;
  max-height: 444px;
  background: url('~static/common/default.png');
  background-position: center;
  background-repeat: no-repeat;
  background-color: #e7e7e7;
  position: relative;
}
.todayNew .todayImg a {
  display: block;
  width: 100%;
  max-height: 444px;
}
/* .todayNew .defaultBox {
  overflow: hidden;
  width: 100%;
  height: 450px;
  text-align: center;
  line-height: 450px;
  background: #e7e7e7;
  position: relative;
} */
.todayNew .oneItemBlock .oneItemDefaultBox {
  overflow: hidden;
  width: 100%;
  height: 180px;
  text-align: center;
  line-height: 180px;
  background: #e7e7e7;
  position: relative;
}
.todayNew .todayImg .todayImg_class {
  width: 100%;
  height: 444px;
}
.todayNew .imgDesc {
  overflow: hidden;
  width: 100%;
  height: 60px;
  margin: 42px auto;
  position: relative;
}
.todayNew .imgDesc p {
  /* width:54px;
height:14px;
font-size:14px;
font-family:SourceHanSansCN-Light;
font-weight:300;
color:rgba(177,177,177,1);
line-height:125px; */

  font-size: 26px;
  font-weight: 500;
  line-height: 24px;
  position: absolute;
  left: 50px;
  height: 30px;
  max-width: 690px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.todayNew .imgDesc .title {
  color: #151515;
}

.todayNew .imgDesc .redColor {
  color: #bd081e;
}

.todayNew .imgDesc > div {
  width: 3px;
  height: 21px;
  margin-left: 0px;
  position: absolute;
  top: 2px;
}
.todayNew .imgDesc .titleLine {
  background: rgba(177, 177, 177, 1);
}
.todayNew .imgDesc .redTitleLine {
  background: rgba(190, 0, 30, 1);
}
.todayNew .imgDesc .detail {
  font-size: 14px;
  max-width: 690px;
  font-weight: 400;
  color: rgba(91, 91, 91, 1);
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  left: 50px;
  top: 40px;
}
.todayNew .todayFooter {
  padding: 20px;
}
.todayNew .footerBox {
  width: 100%;
  height: 60px;
  margin-top: -15px;
}
.todayNew .todayFooter .userIcon,
.todayNew .todayFooter .userName,
.todayFooter .classOneName,
.todayFooter .todayDivider {
  float: left;
}
.todayNew .todayFooter .userIcon {
  margin: -5px 6px 0px 30px;
  opacity: 0.7;
  border-radius: 50%;
  width: 25px;
  height: 25px;
}
.todayNew .todayFooter .todayDivider {
  margin-left: 20px;
}

.todayNew .todayFooter .todayDivider {
  width: 1px;
  height: 11px;
  background: rgba(224, 224, 224, 1);
  margin-top: 4px;
}
.todayNew .todayFooter span {
  height: 14px;
  font-size: 14px;
  font-weight: 300;
  color: rgba(177, 177, 177, 1);
}
.todayNew .todayFooter .classOneName {
  margin-left: 20px;
}

.todayNew .todayResult {
  float: right;
  margin-right: 31px;
  margin-top: -5px;
}
.todayNew .todayResult .goodBox,
.todayNew .todayResult .badBox {
  float: left;
  position: relative;
}
.todayNew .todayResult .goodBox {
  margin-right: 4px;
}
.todayNew .todayResult .goodAnimation {
  display: inline-block;
  position: absolute;
  top: -20px;
  left: 30%;
}
.todayNew .todayResult .goodAnimation p {
  font-size: 24px;
  color: #bd081e;
}
.goodAdd-enter-to,
.goodAdd-leave {
  opacity: 1;
}
.goodAdd-enter-active {
  transition: all 1s;
}
.goodAdd-leave-active {
  animation: bounce-leave 1s ease;
}
@keyframes bounce-leave {
  0% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
}
.todayNew .todayResult .up,
.todayNew .todayResult .down,
.todayNew .todayResult .goodPrecentBackground,
.todayNew .todayResult .badPrecentBackground {
  /* background-size: cover; */
  display: inline-block;
  width: 110px;
  height: 40px;
  cursor: pointer;
}
.todayNew .todayResult .up {
  background-image: url('~static/images/202.png');
}
.todayNew .todayResult .down {
  margin-left: -13px;
  background-image: url('~static/images/211.png');
}
.todayNew .goodPrecentBackground {
  background-image: url('~static/images/201.png');
}
.todayNew .badPrecentBackground {
  margin-left: -13px;
  background-image: url('~static/images/21.png');
}
.todayNew .todayResult img {
  margin-top: -10px;
  margin-left: -10px;
  width: 110px;
}
.todayNew .rightSide {
  float: right;
  width: 381px;
  overflow: hidden;
  background: white;
  position: relative;
  padding-bottom: 30px;
}
.todayNew .rightSideContent .firstBanner .el-main,
.todayNew .rightSideContent .secondBanner .el-main {
  padding: 0;
  padding-top: 20px;
}
.todayNew .rightSideContent .firstBanner,
.todayNew .rightSideContent .secondBanner {
  width: 320px;
  height: 224px;
  position: relative;
}
.todayNew .rightSideContent .firstBanner {
  left: 31px;
  margin-bottom: 76px;
  top: 30px;
}
.todayNew .rightSideContent .secondBanner {
  left: 31px;
  margin-bottom: 24px;
}
.todayNew .rightSideContent .oneItemBlock .itemBlockImg {
  width: 100%;
  height: 180px;
  position: absolute;
  object-fit: cover;
}
.todayNew .firstBanner .feature_titleWrap,
.todayNew .secondBanner .feature_titleWrap {
  position: absolute;
  bottom: -1px;
  width: 320px;
  z-index: 2;
  height: 50px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.todayNew .oneItemBlock .bannerBottomIcon {
  height: 50px !important;
  width: auto !important;
  position: absolute;
  bottom: -1px;
  left: 0;
  z-index: 3;
}
.todayNew .bannerFeatureTitle {
  width: 200px;
  height: 22px;
  font-size: 18px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 15px;
  left: 28px;
  z-index: 3;
}
.todayNew .rightSizeHead {
  width: 100%;
  position: absolute;
  height: 45px !important;
  left: 0;
  top: 0;
}
.todayNew .rightSideContent .oneItemBlock {
  height: 180px;
  width: 320px;
  background: #e7e7e7;
  margin-top: 45px;
}
.todayNew .rightSide > img {
  width: 7px;
}
.todayNew .rightSizeHead > span {
  width: 100%;
  position: absolute;
  top: 5px;
  left: 20px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 18px;
}
.todayNew .todayRank {
  position: relative;
  /* width: 100%; */
  padding: 18px 0px 0px 31px;
}

/* 导航条选中之后的效果 */
.todayNew .navActiveClass {
  background: white !important;
  border: 2px solid #bd081e !important;
}
.todayNew .todayResult img {
  cursor: pointer;
}
.todayNew .todayResult span {
  position: absolute;
  display: none;
  width: 37px;
  height: 14px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(254, 254, 254, 1);
}
.todayNew .goodBox span {
  top: 10px;
  left: 45px;
}
.todayNew .badBox span {
  top: 10px;
  left: 45px;
}
.todayNew .todayResult .showPrecent {
  display: block;
  cursor: pointer;
}
.todayNew .paginationShow {
  display: block;
  margin-bottom: 50px;
}
.adverBottom {
  width: 1200px;
  height: 200px;
  margin: 0px auto;
  margin-top: 10px;
  margin-bottom: 30px;
  background: #bd081e;
}
.adverBottom .adverImgBox {
  width: 100%;
  height: 100%;
}
</style>
