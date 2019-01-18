<template>
  <div>
    <Header></Header>
    <BigCoursel :list="topBanner"
      id="`5`"></BigCoursel>
    <div class="car_video"
      style="padding:0px">
      <div class="todayTitle">
        <span>视 频</span><br>
        <span><i class="el-icon-caret-right"></i> V I D E O <i class="el-icon-caret-left"></i></span>
      </div>
      <div class="todayNav">
        <ul>
          <div v-for="(item, index) in tabData"
            :key="index"
            class="navWrap">
            <nuxt-link :to="`/tagList/${item.id}/1`">
              <li :class=" navTabActiveStatus == true&&navTabActiveIndex == index ? ['navActiveClass', 'active']: '' "
                @mouseenter="navTabActive(item)"
                @mouseleave="removeNavTabActive()">
                <strong>
                  {{item && item.title != null ? item.title:''}}
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
                    <img :src="piectImgUrl(item)"
                      :alt="item.title"
                      @error="imgLossLoad(item)"
                      @load="imgSeccessLoad()"
                      class="todayImg_class">
                    <!-- <div class="defaultBox"
                      v-if="imgLoadStatus == false&&index == imgLossIndex">
                      <nuxt-link :to="`/video/detail/${item.id}/1`">
                        <img src="~static/common/default.png"
                          alt="尖峰咖"
                          width="160px">
                      </nuxt-link>
                    </div> -->
                    <!-- <div class="mask">
                      <nuxt-link :to="`/pc/video/detail/${item.id}/1`"></nuxt-link>
                    </div> -->
                    <!-- 播放按钮 -->
                    <!-- <nuxt-link :to="`/pc/video/detail/${item.id}/1`">
                      <el-button class="videoBtn"
                        type="info"
                        icon="el-icon-caret-right"
                        circle></el-button>
                    </nuxt-link> -->
                  </div>
                  <div class="imgDesc">
                    <div @mouseenter="titleActive(item)"
                      @mouseleave="removeTitleActiveFn()"
                      :class="removeTitleActive == true&& titleActiveIndex == index ? 'redTitleLine' :'titleLine'"></div>
                    <nuxt-link :to="`/video/detail/${item.id}/1`">
                      <p :class="removeTitleActive == true&&titleActiveIndex == index ? 'redColor' :'title'"
                        @mouseenter="titleActive(item)"
                        @mouseleave="removeTitleActiveFn()">
                        <strong>
                          {{item && item.title != null ? item.title: ''}}
                        </strong>
                      </p>
                    </nuxt-link>

                    <span class="detail">{{item.digest}}</span>
                  </div>
                </el-main>
                <el-footer class="todayFooter">
                  <div class="footerBox">
                    <nuxt-link :to="`/Bloger/${item.authorId}/1`">
                      <img :src="piectProfileUrl(item)"
                        class="userIcon"></nuxt-link>
                    <nuxt-link :to="`/Bloger/${item.authorId}/1`">
                      <span class="userName">{{item.author}}</span></nuxt-link>
                    <div class="todayDivider"></div>
                    <!-- <span class="classOneName">{{item.classOneName}}</span> -->
                    <span class="classOneName">视频</span>
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
                        v-else></i> -->
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
            <div id="imgBox"
              @mouseenter="adverTitleActiveFn()"
              @mouseleave="removeAdverTitleActiveFn()">
              <!--如果有广告，自然会覆盖，如果没，则展示默认图片 -->
              <img src="~static/common/default.png"
                alt="尖峰咖">
            </div>
            <!-- 播放按钮 -->
            <!-- <el-button class="videoBtn"
              type="info"
              icon="el-icon-caret-right"
              circle></el-button> -->
            <!-- 暂时取消，等到拿到广告里的链接先 -->
            <!-- <div class="mask"
              @mouseenter="adverTitleActiveFn()"
              @mouseleave="removeAdverTitleActiveFn()"></div> -->
            <div class="imgFlagBox">
              <span class="flag">广告</span></div>
            <div class="imgDesc">
              <div @mouseenter="adverTitleActiveFn()"
                @mouseleave="removeAdverTitleActiveFn()"
                :class="adverActive == true ? 'redTitleLine':'titleLine'"></div>
              <a href="http://www.stayahead.com.cn/"
                target="_blank">
                <p :class="adverActive == true ? 'redColor':'title'"
                  @mouseenter="adverTitleActiveFn()"
                  @mouseleave="removeAdverTitleActiveFn()">
                  <strong>
                    东风Honda Stay ahead志在先端
                  </strong>
                </p>
              </a>
              <span class="detail"></span>
              <!-- <span class="detail">“Stay ahead”中文释义为“志在先端”，不仅意味着将在技术和产品上强化领先优势，更蕴含与消费者共同打造先端生活方式的寓意。通过开展Stay ahead品牌行动，东风本田不仅希望给新生代消费者带来科技、人性化的功能感受，更希望为他们带来个性、开创的情感魅力。</span> -->
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
                    <img :src="piectImgUrl(item)"
                      :alt="item.title"
                      @error="imgLossLoad(item)"
                      @load="imgSeccessLoad()"
                      class="todayImg_class">
                    <!-- <div class="defaultBox"
                      v-if="imgLoadStatus == false&&index == imgLossIndex">
                      <nuxt-link :to="`/video/detail/${item.id}/1`">
                        <img src="~static/common/default.png"
                          alt="尖峰咖"
                          width="160px">
                      </nuxt-link>
                    </div> -->
                    <!-- <div class="mask">
                      <nuxt-link :to="`/pc/video/detail/${item.id}/1`"></nuxt-link>
                    </div> -->
                    <!-- 播放按钮 -->
                    <!-- <nuxt-link :to="`/pc/video/detail/${item.id}/1`">
                      <el-button class="videoBtn"
                        type="info"
                        icon="el-icon-caret-right"
                        circle></el-button>
                    </nuxt-link> -->
                  </div>
                  <div class="imgDesc">
                    <div @mouseenter="titleActive(item)"
                      @mouseleave="removeTitleActiveFn()"
                      :class="removeTitleActive == true&& titleActiveIndex == index ? 'redTitleLine' :'titleLine'"></div>
                    <nuxt-link :to="`/video/detail/${item.id}/1`">
                      <p :class="removeTitleActive == true&&titleActiveIndex == index ? 'redColor' :'title'"
                        @mouseenter="titleActive(item)"
                        @mouseleave="removeTitleActiveFn()">
                        <strong>
                          {{item && item.title != null ? item.title: ''}}
                        </strong>
                      </p>
                    </nuxt-link>

                    <span class="detail">{{item.digest}}</span>
                  </div>
                </el-main>
                <el-footer class="todayFooter">
                  <div class="footerBox">
                    <nuxt-link :to="`/Bloger/${item.authorId}/1`">
                      <img :src="piectProfileUrl(item)"
                        class="userIcon"></nuxt-link>
                    <nuxt-link :to="`/Bloger/${item.authorId}/1`">
                      <span class="userName">{{item.author}}</span></nuxt-link>
                    <div class="todayDivider"></div>
                    <!-- <span class="classOneName">{{item.classOneName}}</span> -->
                    <span class="classOneName">视频</span>
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
                        v-else></i> -->
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
              :pageSize="6"
              :totalPage="leftSideResult.totalPageCount"
              :toTop="{x:0,y:760}"
              :routePage='`${currentPage}`'></pagination>
          </div>
        </div>
        <div class="rightSide">
          <div class="rightSideContent">
            <div class="firstBanner">
              <el-container>
                <el-header class="rightSizeHead"
                  style="padding:0px">
                  <img src="~static/images/20.png">&nbsp;
                  <span v-html="bannerMessageData && bannerMessageData.title != null ? bannerMessageData.title:''"></span>
                </el-header>
                <el-main v-if="bannerMessageData.photoLinks&&bannerMessageData.photoLinks.length >=2 ">
                  <firstFeature :bannerData="bannerMessageData.photoLinks"></firstFeature>
                </el-main>
                <div class="oneItemBlock"
                  v-else>
                  <a :href="bannerMessageData.photoLinks == null ? '' : bannerMessageData.photoLinks[0].url"
                    target="_blank">
                    <img :src="piectFeatureUrl(bannerMessageData.photoLinks == null ? '' : bannerMessageData.photoLinks[0].photo)"
                      :alt="bannerMessageData.photoLinks == null ? '' : bannerMessageData.photoLinks[0].title"
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
                        alt="尖峰咖"
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
                  <span v-html="bannerTopicData && bannerTopicData.title != null ? bannerTopicData.title:''"></span>
                </el-header>
                <el-main v-if="bannerTopicData.photoLinks&&bannerTopicData.photoLinks.length >=2 ">
                  <secondFeature :bannerData="bannerTopicData.photoLinks"></secondFeature>
                </el-main>
                <div class="oneItemBlock"
                  v-else>
                  <a :href="bannerTopicData.photoLinks == null ? '': bannerTopicData.photoLinks[0].url"
                    target="_blank">
                    <img :src="piectFeatureUrl(bannerTopicData.photoLinks == null ? '': bannerTopicData.photoLinks[0].photo)"
                      :alt="bannerTopicData.photoLinks == null ? '' : bannerTopicData.photoLinks[0].title"
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
                        alt="尖峰咖"
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
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import systemManage from '@/http/url'
import firstFeature from '@/components/firstFeature.vue'
import secondFeature from '@/components/secondFeature.vue'
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
  webEssayGetMonthRank
} from '@/http/api.js'

import { setTimeout } from 'timers'

export default {
  name: 'car_video',
  data: function() {
    return {
      currentPage: 1,
      flag: 0,
      adverTop: '',
      // tabData: [],
      topBanner: [],
      firstHalfData:[],
      secondHalfData:[],
      bannerMessageData: {},
      bannerTopicData: {},
      leftSideResult: [],
      navTabActiveStatus: false,
      navTabActiveIndex: '',
      titleActiveIndex: '',
      removeTitleActive: false,
      adverActive: false,
      path: '',
      model: '',
      cookie: '',
      metaDesc: '',
      imgLoadStatus: true,
      imgLossIndex: '',
      imgFeatureLoadStatus: true,
      tokenObj: null //token对象
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
  async asyncData({params}) {
    let bannerTopicData
    let bannerMessageData
    // 标签tag
    let tabData = await $get(webTagGetRandomTagsByChannel, { id: '2' })
    let leftSideResult = await $get(
        webEssayGetEssayByChannel,
        {
          channel: '5',
          pageNo: params.page,
          size: 6
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
      channel: 5
    })
    let banner = bannerResult.data == null ? [] : bannerResult.data
    banner.forEach((element, index) => {
      if (index == 0) {
        bannerMessageData = element
      } else if (index == 1) {
        bannerTopicData = element
      }
    })
    if (tabData.data && tabData.data.length >= 11) {
      tabData.data.splice(11)
    }
    return {
      tabData: tabData.data ? tabData.data : [],
      leftSideResult: leftSideResult.data ? leftSideResult.data : [],
      rankWeekLists: rankWeekLists.data.essayEntities ? rankWeekLists.data.essayEntities : [],
      rankMonthLists: rankMonthLists.data.essayEntities ? rankMonthLists.data.essayEntities : [],
      bannerTopicData: bannerTopicData == null ? [] : bannerTopicData,
      bannerMessageData: bannerMessageData == null ? [] : bannerMessageData
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
    },
    // 文章的图片拼接
    piectImgUrl(item) {
      return systemManage.getApi(item.photo)
    },
    // 头像的图片拼接
    piectProfileUrl(item) {
      return systemManage.getApi(item.photoUrl)
    },
    // 专栏的图片拼接
    piectFeatureUrl(item) {
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
          { 'X-Auth0-Token': this.tokenObj.token }
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
    imgSeccessLoad() {
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
      // 触发广告位方法
      this.getAdvertise('imgBox', '5993954', 'adverImgBox', '5994002')
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      let obj = {
        'X-Auth0-Token': this.cookie != '' ? this.cookie : this.tokenObj.token
      }
      // let tabResult = await $get(webTagGetRandomTagsByChannel, { id: '2' })
      let topBigBanner = await $get(webBannerList, {
        bChannel: 5,
        linktype: 'first'
      })
      // let leftSideResult = await $get(
      //   webEssayGetEssayByChannel,
      //   {
      //     channel: '5',
      //     pageNo: this.$route.params.page,
      //     size: 6
      //   },
      //   obj
      // )
      // 判断是否为空
      // let leftResult = leftSideResult.data == null ? [] : leftSideResult.data
      // let tab = tabResult.data == null ? [] : tabResult.data
      let topBigBannerData = topBigBanner == null ? [] : topBigBanner
      // this.tabData = tab
      // this.leftSideResult = leftResult
      this.topBanner = topBigBannerData.data
      if (this.leftSideResult.EssayEntity.length <= 2) {
        this.adverTop = (this.leftSideResult.EssayEntity.length + 1) * 696 - 88
      } else {
        //null代表的意思是容器不需要增加高度
        this.adverTop = null
      }
      this.leftSideResult.EssayEntity.forEach((element, index) => {
        // 自添加的4个属性
        this.$set(element, 'upSrc', '')
        this.$set(element, 'downSrc', '')
        this.$set(element, 'showPercent', '')
        this.$set(element, 'goodAddClass', 'false')
        // 以下方法不起效
        // element = Object.assign({}, element, {
        //   upSrc: '',
        //   downSrc: '',
        //   showPercent: '',
        //   goodAddClass: ''
        // })
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
      // 将文章数据切割成两块来展示，为了中间插入广告位
      if (this.leftSideResult.EssayEntity.length >= 2) {
        this.firstHalfData = this.leftSideResult.EssayEntity.slice(0, 2)
        this.secondHalfData = this.leftSideResult.EssayEntity.slice(2)
      } else {
        this.firstHalfData = this.leftSideResult.EssayEntity
        this.secondHalfData = []
      }
    }
  },

  mounted() {
    this.path = this.$route.path.match(/^\/[a-z]+/gi)
    this.model = this.$route.fullPath.match(/^\/[a-z]+/gi)
    this.currentPage = this.$route.params.page
    
    this.$nextTick(async () => {
      // 取cookie
      this.cookie = this.getCookie('token')
      if (this.cookie == '') {
        this.tokenObj =  JSON.parse(localStorage.getItem('userMsg')) &&  JSON.parse(localStorage.getItem('userMsg')) != '' ? JSON.parse(localStorage.getItem('userMsg')):'null'
      }
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      this.getTotalData()
    })
  },
  watch: {
    currentPage: {
      async handler(newPage, oldPage) {
        // 取cookie
        this.cookie = this.getCookie('token')
        if (this.cookie == '') {
          this.tokenObj =JSON.parse(localStorage.getItem('userMsg')) &&  JSON.parse(localStorage.getItem('userMsg')) != '' ? JSON.parse(localStorage.getItem('userMsg')):'null'
        }
        if (this.tokenObj == null) {
          this.tokenObj = {}
        }
        let obj = {
          'X-Auth0-Token': this.cookie != '' ? this.cookie : this.tokenObj.token
        }
        this.$router.push({
          path: `${this.model}/${newPage}`
        })
        let leftSideResult = await $get(
          webEssayGetEssayByChannel,
          {
            channel: '5',
            pageNo: newPage,
            size: 6
          },
          obj
        )
        // 判断是否为空
        let leftResult = leftSideResult.data == null ? [] : leftSideResult.data
        this.leftSideResult = leftResult

        this.leftSideResult.EssayEntity.forEach(element => {
          // 自添加的4个属性
          this.$set(element, 'upSrc', '')
          this.$set(element, 'downSrc', '')
          this.$set(element, 'showPercent', '')
          this.$set(element, 'goodAddClass', 'false')
          // 以下方法不起效
          // element = Object.assign({}, element, {
          //   upSrc: '',
          //   downSrc: '',
          //   showPercent: '',
          //   goodAddClass: ''
          // })
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
        // 将文章数据切割成两块来展示，为了中间插入广告位
        if (this.leftSideResult.EssayEntity.length >= 2) {
          this.firstHalfData = this.leftSideResult.EssayEntity.slice(0, 2)
          this.secondHalfData = this.leftSideResult.EssayEntity.slice(2)
        } else {
          this.firstHalfData = this.leftSideResult.EssayEntity
          this.secondHalfData = []
        }
      }
    }
  }
}
</script>
<style>
.car_video,
html,
body {
  width: 100%;
  background: #f6f6f6;
}
.car_video .todayTitle {
  margin-left: auto;
  margin-right: auto;
  margin-top: 52px;
  margin-bottom: 0px;
  width: 106px;
  height: 80px;
  position: relative;
}
.car_video .todayTitle span {
  height: 35px;
  font-size: 36px;
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
  margin-left: 12px;
}
.car_video .todayTitle span:nth-of-type(2) {
  position: absolute;
  left: -5px;
  font-size: 14px;
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
  line-height: 25px;
}
.car_video .todayNav {
  margin: 0px auto;
  margin-top: 40px;
  width: 1200px;
  margin-bottom: 41px;
  text-align: center;
}
.car_video .todayNav ul {
  width: 100%;
}
.car_video .navWrap {
  margin-bottom: 10px;
  display: inline-block;
}
.car_video .todayNav ul li {
  position: relative;
  list-style-type: none;
  float: left;
  box-sizing: border-box;
  line-height: 42px;
  padding: 0px 16px 0px 16px;
  height: 42px;
  margin-right: 10px;
  background: #f6f6f6;
  border: 2px solid rgba(231, 231, 231, 1);
  font-size: 14px;
  cursor: pointer;
}
.car_video .todayAdviseWrap {
  width: 100%;
  padding-bottom: 23px;
}
.car_video .todayNav ul li::after {
  content: '';
  width: 15px;
  height: 15px;
  position: absolute;
  bottom: 1px;
  background: linear-gradient(134deg, transparent 13px, #bd081e 0);
  right: 2px;
  display: none;
}
.car_video .todayNav a {
  color: black;
}

.car_video .todayNav ul li.active::after {
  display: block;
}

.car_video .mainContent {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.car_video .leftSide {
  width: 790px;
  height: auto;
  float: left;
  margin-right: 29px;
  position: relative;
}

.car_video .todayContainer,
.car_video .leftSide #advertiseBox {
  width: 100%;
  background: white;
  margin-bottom: 30px;
  position: relative;
}
.car_video .leftSide #advertiseBox {
  height: 586px;
}
.car_video #advertiseBox #imgBox {
  width: 100%;
  height: 444.4px;
  overflow: hidden;
  text-align: center;
  line-height: 444px;
  background: #e7e7e7;
  position: relative;
}
.car_video .firstBanner .el-main,
.car_video .secondBanner .el-main {
  padding: 0;
  padding-top: 20px;
}
.car_video #advertiseBox .imgFlagBox {
  width: 100%;
  height: 20px;
  position: absolute;
}
.car_video .imgFlagBox .flag {
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: white;
  width: 40px;
  height: 20px;
  border: 1px solid white;
  opacity: 0.5;
  z-index: 3;
  position: absolute;
  bottom: 34px;
  right: 40px;
}
.car_video .backward {
  margin-top: 649px;
}
.car_video .todayImg {
  overflow: hidden;
  width: 100%;
  max-height: 444.4px;
  background: url('~static/common/default.png');
  background-position: center;
  background-repeat: no-repeat;
  background-color: #e7e7e7;
  position: relative;
}
.car_video .todayImg a {
  display: block;
  width: 100%;
  max-height: 444.4px;
}
/* .car_video .defaultBox {
  overflow: hidden;
  width: 100%;
  height: 444.4px;
  text-align: center;
  line-height: 444.4px;
  background: #e7e7e7;
  position: relative;
} */
.car_video .mask {
  cursor: pointer;
  position: absolute;
  top: 0;
  z-index: 2;
  left: 0;
  width: 100%;
  height: 444.4px;
  background: rgba(0, 0, 0, 0.4);
}
.car_video .mask a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.car_video .videoBtn {
  position: absolute;
  top: 225px;
  left: 395px;
  background: transparent;
  z-index: 3;
  font-size: 32px;
  padding: 5px;
}
/* .car_video .todayImg .el-button--info,
.video #imgBox .el-button--info {
  background: transparent;
} */
.car_video .todayImg .todayImg_class {
  width: 100%;
  height: 444.4px;
}
.car_video .imgDesc {
  overflow: hidden;
  width: 100%;
  height: 60px;
  margin: 42px auto;
  position: relative;
}

.car_video .imgDesc p {
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
.car_video .imgDesc .title {
  color: #151515;
}

.car_video .imgDesc .redColor {
  color: #bd081e;
}

.car_video .imgDesc > div {
  width: 3px;
  height: 21px;
  margin-left: 0px;
  position: absolute;
  top: 2px;
}
.car_video .imgDesc .titleLine {
  background: rgba(177, 177, 177, 1);
}
.car_video .imgDesc .redTitleLine {
  background: rgba(190, 0, 30, 1);
}
.car_video .imgDesc .detail {
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
.car_video .todayFooter {
  padding: 20px;
}
.car_video .footerBox {
  width: 100%;
  height: 60px;
  margin-top: -15px;
}
.car_video .todayFooter .userIcon,
.car_video .todayFooter .userName,
.car_video .todayFooter .classOneName,
.car_video .todayFooter .todayDivider {
  float: left;
}
.car_video .todayFooter .userIcon {
  margin: -5px 6px 0px 30px;
  border-radius: 50%;
  opacity: 0.7;
  width: 25px;
}
.car_video .todayFooter .todayDivider {
  margin-left: 20px;
}

.car_video .todayFooter .todayDivider {
  width: 1px;
  background: rgba(224, 224, 224, 1);
  height: 11px;
  margin-top: 4px;
}
.car_video .todayFooter span {
  height: 14px;
  font-size: 14px;
  font-weight: 300;
  color: rgba(177, 177, 177, 1);
}
.car_video .todayFooter .classOneName {
  margin-left: 20px;
}
.car_video .todayResult {
  float: right;
  margin-right: 31px;
  margin-top: -5px;
}
.car_video .todayResult .goodBox,
.car_video .todayResult .badBox {
  float: left;
  position: relative;
}
.car_video .todayResult .goodBox {
  margin-right: 4px;
}
.car_video .todayResult .goodAnimation {
  display: inline-block;
  position: absolute;
  top: -20px;
  left: 30%;
}
.car_video .todayResult .goodAnimation p {
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
.car_video .todayResult .up,
.car_video .todayResult .down,
.car_video .todayResult .goodPrecentBackground,
.car_video .todayResult .badPrecentBackground {
  /* background-size: cover; */
  display: inline-block;
  width: 110px;
  height: 40px;
  cursor: pointer;
}
.car_video .todayResult .up {
  background-image: url('~static/images/202.png');
}
.car_video .todayResult .down {
  margin-left: -13px;
  background-image: url('~static/images/211.png');
}
.car_video .goodPrecentBackground {
  background-image: url('~static/images/201.png');
}
.car_video .badPrecentBackground {
  margin-left: -13px;
  background-image: url('~static/images/21.png');
}
.car_video .todayResult img {
  margin-top: -10px;
  margin-left: -10px;
  width: 110px;
}
.car_video .rightSide {
  float: right;
  width: 381px;
  overflow: hidden;
  background: white;
  position: relative;
  padding-bottom: 40px;
}
.car_video .rightSideContent .firstBanner,
.car_video .rightSideContent .secondBanner {
  width: 337px;
  height: 224px;
  position: relative;
}
.car_video .rightSideContent .firstBanner {
  left: 31px;
  top: 30px;
  margin-bottom: 76px;
}
.car_video .rightSideContent .secondBanner {
  left: 31px;
  margin-bottom: 24px;
}
.car_video .firstBanner .feature_titleWrap,
.car_video .secondBanner .feature_titleWrap {
  position: absolute;
  bottom: -1px;
  width: 320px;
  z-index: 1;
  height: 50px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.car_video .oneItemBlock .bannerBottomIcon {
  height: 50px !important;
  width: auto !important;
  position: absolute;
  bottom: -1px;
  left: 0;
  z-index: 3;
}
.car_video .bannerFeatureTitle {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 21px;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 16px;
  left: 28px;
  z-index: 3;
}
.car_video .rightSizeHead {
  width: 100%;
  position: absolute;
  left: 0;
  height: 45px !important;
  top: 0;
}
.car_video .rightSideContent .oneItemBlock {
  height: 180px;
  width: 320px;
  background: #e7e7e7;
  margin-top: 45px;
}
.car_video .rightSideContent .oneItemBlock .oneItemDefaultBox {
  overflow: hidden;
  width: 100%;
  height: 180px;
  text-align: center;
  line-height: 180px;
  background: #e7e7e7;
  position: relative;
}
.car_video .rightSideContent .oneItemBlock .itemBlockImg {
  width: 320px;
  height: 180px;
  position: absolute;
}
.car_video .rightSide > img {
  width: 7px;
}
.car_video .rightSizeHead > span {
  width: 100%;
  position: absolute;
  top: 5px;
  left: 20px;
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 18px;
}
.car_video .todayRank {
  position: relative;
  width: 100%;
  padding: 18px 0px 0px 31px;
}

/* 导航条选中之后的效果 */
.car_video .navActiveClass {
  background: white !important;
  border: 2px solid #bd081e !important;
}
.car_video .todayResult img {
  cursor: pointer;
}
.car_video .todayResult span {
  position: absolute;
  display: none;
  width: 37px;
  height: 14px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(254, 254, 254, 1);
}
.car_video .goodBox span {
  top: 10px;
  left: 45px;
}
.car_video .badBox span {
  top: 10px;
  left: 45px;
}
.car_video .todayResult .showPrecent {
  display: block;
  cursor: pointer;
}
.car_video .paginationShow {
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

