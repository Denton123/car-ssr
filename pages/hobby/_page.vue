<template>
  <div>
    <Header></Header>
    <BigCoursel :list="list"
      id="zrt"></BigCoursel>
    <div class="contain-hobbies"
      ref="bigContain">
      <!--大标题-->
      <div class="title">
        <div class="title-chinese">兴趣部落</div>
        <div class="title-english">
          <div class="title_img"><img src="~static/picture/hobby_title.png"></div>
          <span></span>
          <span class="title-english-style">HOBBIES</span>
          <span></span>
        </div>
      </div>
      <!-- <div class="hobbies-tag">
        <div class="tag-nav"
          v-for="(item, index) in tagItems"
          :key="index"
          :class="{ 'tagBorderOn': index === tagType}"
          @mouseenter="tagOn(index)"
          @mouseleave="tagOnDeline(index)">
          <nuxt-link :to="`/tagList/${item.id}/1`">
            <strong>{{item.title}}</strong>
            <span class="tag-nav--change"
              v-show=" index === tagType">
              <img src="~static/picture/tag_2.png"
                class="tag_img">
            </span>
          </nuxt-link>
        </div>
      </div> -->
        <div class="hobbies-tag">
        <span class="tag-nav"
          v-for="(item, index) in tagItems"
          :key="index"
          :class="{ 'tagBorderOn': index === tagType}"
          @mouseenter="tagOn(index)"
          @mouseleave="tagOnDeline(index)">
          <router-link :to="`/tagList/${item.id}/1`">
            <span class="tag--box">
              <strong>{{item.title}}</strong>
            </span>
            <span class="tag-nav--change"
              v-show=" index === tagType">
              <img src="~static/picture/tag_2.png"
                class="tag_img">
            </span>
          </router-link>
        </span>
      </div>
      <!--插件-->
      <!--<div class="nav-hobby">-->
        <!--<div class="swiper-containers">-->
          <!--<div class="swiper-wrapper">-->
            <!--<div class="swiper-slide nav-slide-item-wrap"  v-for="(navItem, index) in secondNav" :key="index"-->
                 <!--@mouseenter="mouseEnterNav(index)"-->
                 <!--@mouseleave="mouseLeverNav()"-->
                 <!--@click="enterSecondNav(index, navItem.id)">-->
               <!--<div class="nav-hobby-img"-->
                    <!--:class="{ navBorderOn: type===index || enterType === index }">-->
                    <!--<img :src="utils.getApi(navItem.photoUrl.slice(1))"-->
                    <!--v-if="navItem.photoUrl != null && navItem.photoUrl != ''"-->
                    <!--alt="尖峰咖"-->
                     <!--/></div>-->
                <!--<div class="nav-hobby-text"-->
                        <!--:class="{ navTxtOn: type===index || enterType === index, navTxtRed : redType===index}">{{navItem.label}}</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--正文内容-->
      <div class="content-contain"
        style="height: 1500px;">
        <!--内容区左边兴趣图片模块-->
        <div class="content-contain-left">
          <div class="content-footer">
            <div class="button-hot"
              :class="{ hotDecorationOn }"
              @click="enterRecentlyArtical">最新</div>
            <div class="button-recently"
              :class="{ recentlyDecorationOn }"
              @click="enterHotArtical">最热</div>
            <div class="decoration-hot"
              v-show="hotLineDecoration">
              <img src="~static/picture/hot.jpg">
            </div>
            <div class="decoration-recently"
              v-show="recentlyLineDecoration">
              <img src="~static/picture/hot.jpg">
            </div>
            <div class="button-banner-hobby">
              <img class="img_wrap_hobby"
                src="~static/picture/hobby.jpg">
            </div>
            <!--<nuxt-link :to="`/publishHobbies`">-->
              <div class="add-wrap" >
                <img class="img_add"
                     src="~static/picture/add.jpg">
              </div>
              <div class="hobby-text-wrap" @click="publishHobbies()">发布兴趣部落</div>
            <!--</nuxt-link>-->
          </div>
          <!--瀑布流图片区-->
          <div class="content-wrap"
            ref="waterFallsList"
            style=" height:1300px;">
            <div class="contain-hobby-wrap"
              v-for="(mockHobbyItem, index) in mockHobbyItems"
                 @mouseenter="isRedOn(index)"
                 @mouseleave="isRedIn"
              :key="index">
              <nuxt-link :to="`/hobbies/hobbiesDetail/${mockHobbyItem.id}/1`">
                                <span class="box-picture"
                                      v-for="(hobbyPicture, index) in mockHobbyItem.photoList"
                                      :key="index">
                  <!--<img src="./picture/x1.png">-->
                  <img class="get-hobby-image"
                       :alt="`尖峰咖_${mockHobbyItem.description}`"
                       :src="piectImgUrl(hobbyPicture)"
                       :class="hobbiesImageChage(mockHobbyItem.photoList, index)">
                </span>
              </nuxt-link>
                <div class="detail-hobby-artical">
                      <div class="red-line"><img src="~static/picture/line_gray.png"> </div>
                      <div class="red-line"
                           v-show="isRed===index"><img src="~static/picture/line_red.png"> </div>
                      <div class="title-wrap">
                        <nuxt-link :to="`/hobbies/hobbiesDetail/${mockHobbyItem.id}/1`">
                                                 <span class="detail-hobby-title"
                                                       @mouseenter="isRedOn(index)"
                                                 >
                          {{mockHobbyItem.description}}</span>
                        </nuxt-link>
                      </div>
                      <div class="left-line-gray"></div>
                      <div class="left-line-red"></div>
                      <div class="detail-container">
                        <nuxt-link :to="`/Bloger/${mockHobbyItem.userId}/1`">
                            <span style="display: inline-block;float:left" v-if="mockHobbyItem.authorphoto !== ''&&mockHobbyItem.authorphoto !== null">
                                 <img class="detail-container-left-img"
                                      :src="piecImgUrl(mockHobbyItem)"
                                 >
                            </span>
                            <span style="display: inline-block;float:left" v-else>
                                  <img class="detail-container-left-img" src="~static/picture/icon_head.png">
                            </span>
                              <span class="detail-container-left-text">{{mockHobbyItem.userName}}</span>
                        </nuxt-link>
                        <!-- <div class="detail-container-middle">
                          <img src="~static/picture/line_middle.png">
                        </div>
                        <div class="detail-container-right">{{mockHobbyItem.className}}</div> -->
                      </div>
                    </div>
              <!--</nuxt-link>-->
            </div>
          </div>
          <div class="hobbies-pagination">
            <pagination v-show="totalPage >0"
              :classId="this.hobbiesClassId"
              @pageChange="pageChange"
              :routePage="`${currentPage}`"
              :totalPage="totalPage"
              :totalCount="totalCount"
              :toTop={y:1024}
              ref="pagination"></pagination>
          </div>
        </div>
        <!--内容s区右边热门模块-->
        <div class="content-contain-right">
          <!--热门博主模块——标题与内容-->

            <div style="position:relative">
              <div class="title-hot-bloggers">
                <img class="img_blogger"
                  src="~static/picture/3.jpg">
                <span class="text-blogger">热门博主</span>
              </div>
              <nuxt-link :to="`/blogers/1`">
              <span class="text-more">更多></span>
              </nuxt-link>
            </div>

          <div class="contain-wrap-blogger">
            <div class="content-blogger"
              v-for="(bloggerItem, index) in bloggerItems"
              :key="index"
              v-show="bloggerItem.name !== null && bloggerItem.name !== ''">
              <nuxt-link :to="`/Bloger/${bloggerItem.id}/1`">
                <img class="avatar-blogger"
                  :src="piectImg(bloggerItem)">
                <span class="name-blogger">{{bloggerItem.name}}</span>
              </nuxt-link>
            </div>
          </div>
          <!--热点模块——title-本周热点以及本月-->
          <div class="title-host-point">
            <div class="title-hostPoint-bottom">
              <div class="button-week"
                @click="enterWeekHotList"
                :class=" { weekHotOn } ">本周热点
              </div>
              <div class="button-month"
                @click="enterMonthHotList"
                :class="{ monthHotOn }">本月热点</div>
              <div class="hot-img-wrap"
                v-show="weekDecoration"><img src="~static/picture/hotpoint.jpg"
                  class="height=6px;width=90px"> </div>
              <div class="hot-img-wrap2"
                v-show="monthDecoration"><img src="~static/picture/hotpoint.jpg"
                  class="height=6px;width=90px"></div>
            </div>
            <nuxt-link :to="`/hobbies/rankList/${rankId}/1`">
              <span class="text-more">更多></span>
            </nuxt-link>
            <div class="decoration-line"></div>
          </div>
          <!--热点模块——contain-本周热点以及本月-->
          <div id="wrapHostPoint">
            <div class="contain-wrap-host-point"
              v-for="(hostPointItem, index) in hostPointItems.hobbiess"
              :key="index">
              <div class="textRank"
                :class="{ whiteTextOn : index ===0 || index===1 || index===2}">{{index+1}}</div>
              <div class="titleRank">

                <nuxt-link :to="`/hobbies/hobbiesDetail/${hostPointItem.hobbiesId}/1`">{{hostPointItem.description}}</nuxt-link>
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
        </div>
      </div>

      <div id="advertisement"
        >
        <!--<img src="~static/picture/adv.png"-->
        <!--style="width: 1200px;height: 200px;">-->
      </div>
    </div>
    <div class="hobbies-footer">
      <Footer></Footer>
    </div>

  </div>
</template>
<script>
import { $get } from '@/http/ajax'
import { instance } from '@/http/instance'
import { webHobbiesInfo, webHobbiesGetClassList, webUserSelectByPrimaryKey } from '@/http/api'
import systemManage from '@/http/photoApi.js'
import pagination from '@/components/pagination.vue'
import utils from '@/http/url'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import BigCoursel from '@/components/BigCoursel'
// import Swiper from 'swiper'
// import 'swiper/dist/css/swiper.css'

export default {
  name: 'hobby',
  data() {
    return {
      loginFlag: null,
      routePage: 2,
      metaWords: 'str',
      // metaKeyWords: [],
      metaDescription: 1,
      path: '',
      // 大轮播
      bannerItem: [],
      list: [],
      weekId: null,
      monthId: null,
      // 控制图片显示
      fourId: 49,
      fiveId: 59,
      sixId: 69,
      sevenId: 79,
      eightId: 89,
      nineId: 99,
      elevenId: 99,
      tenId: 99,
      // 与页码有关的变量
      currentPage: 1,
      // totalPage: 0,
      // totalCount: 8,
      utils: utils,
      indexId: 0,
      isPaginationOn: 2,
      isPagination: 1,
      // 二级导航
      redType:null,
      enterType:null,
      flags: false,
      startX: 0,
      moveX: 0,
      dix: 0,
      x: 0,
      y: 0,
      // fiveImage: true,
      // 传参用的变量
      rankId: 'w',
      orderDesc: 'desc',
      sidx: 'h.create_time',
      sidxRecently: 'h.create_time',
      sidexHot: 'visits',
      hobbiesClassId: null,
      // 控制修饰颜色的变量
      isRed: -1,
      tagType: null,
      imgType: -1,
      navTxtOn: true,
      type: -1,
      hotDecorationOn: true,
      recentlyDecorationOn: false,
      hotLineDecoration: true,
      recentlyLineDecoration: false,
      // 本周本月热点
      weekHotOn: true,
      monthHotOn: false,
      weekDecoration: true,
      monthDecoration: false,
      // 数组变量
      // tagItems: [],
      hobbiesFour: [],
      hobbiesEight: [],
      hobbiesTwelve: [],
      secondNav: [],
      // bloggerItems: [],
      // hostPointItems: [],
      mockHobbyItems: [],
      timer: 0, // 监听滚动
      picCount: 0, // 图片加载完数量
      picTotal: 0, // 图片总数量
      curPage: 1,
      cookie: null,
      tokenObj:null
    }
  },
  components: {
    pagination,
    Footer,
    Header,
    BigCoursel
  },
  // nuxt异步获取数据
  async asyncData({params, env, req}) {
    var userCookie = null
    if (req && req.headers && req.headers.cookie) {
      console.log(req.header)
      console.log(req.headers.cookie.split(';'), 'headers')
      let reqHeaders = req.headers.cookie.split(';')
      let tokenArr
      reqHeaders.forEach(v => {
        if (v.indexOf('token') !== -1) {
          tokenArr = v.split('=')
          console.log(tokenArr)
          userCookie = tokenArr[1]
        }
      })
    }
    console.log(userCookie, 'userCookie')
    let mockHobbyItems
    let totalPage
    let totalCount
    // 标签
    let tokenObj = '8f558bfd4dd5aa42898a394d8b1accc3'
    let tagItems = await $get('/web/hobbies/gotohobbies', {})
    // // 周排行
    let _hostPointItems = await $get('/web/hobbies/hobbiesWeekRank?', {
        pageNo: 1,
        size: 10
      })

    // 博主数据
    let bloggerItems =  await $get('/web/hobbies/getHotBloggers?', {
      pageNo: 1,
        pageSize: 10
    })
    let _mockHobbyItems = await $get('/web/hobbies/list?', {
      limit: 12,
      page: params.page,
      order: 'desc',
      sidx: 'h.create_time'
    })
    return {
      tagItems: tagItems.data ? tagItems.data.tagsShowList : [],
      hostPointItems: _hostPointItems.data ? _hostPointItems.data : [],
      bloggerItems: bloggerItems.data ? bloggerItems.data : [],
      mockHobbyItems: _mockHobbyItems.data.list ? _mockHobbyItems.data.list : [],
      totalPage: _mockHobbyItems.data.totalPage ? _mockHobbyItems.data.totalPage : 0,
      totalCount: _mockHobbyItems.data.totalCount ? _mockHobbyItems.data.totalCount : 0,
      _mockHobbyItems: _mockHobbyItems.data ? _mockHobbyItems.data : {},
    }
  },
  mounted() {
    console.log(this.totalPage, 'totalPage')
      if (
      localStorage.getItem('userMsg') !== '' &&
      localStorage.getItem('userMsg') !== null
    ) {
      this.tokenObj = JSON.parse(localStorage.getItem('userMsg')).token
      console.log('localstroge', this.tokenObj)
    } else if (this.cookie !== '') {
      this.cookie = this.getCookie('token')
      this.tokenObj = this.cookie
    }
    if (this.tokenObj === null) {
      this.tokenObj = {}
    }
    let obj = { 'X-Auth0-Token': this.tokenObj }
    this.curPage = this.$route.params.page
    this.routePage = this.$route.params.page
    this.currentPage = this.$route.params.page
    this.$nextTick(async() => {
      // 获取二级导航的数据——hobbies的分类，id
      let item = await $get('/web/banner/list?', {
        linktype: 'first',
        bChannel: 6
      }, obj)
      this.list = item.data

      // 获取二级导航的数据——hobbies的分类，id
      let navSecondData = await $get('/web/hobbies/gotohobbies', obj)
      this.hobbiesClassId = undefined // hobbies的各种分类需要传值的id, 初始时需要用到
      this.secondNav = navSecondData.data.hobbies

      // 获取tag的数据——
      // let _tagItems = await $get('/web/hobbies/gotohobbies', obj)
      // this.tagItems = _tagItems.data.tagsShowList
      // for (let i = 0, len = this.tagItems.length; i < len; i++) {
      //   this.metaKeyWords.push(this.tagItems[i].title)
      // }
      // this.metaKeyWords = this.selectOne(this.metaKeyWords)
      // this.metaKeyWords = this.metaKeyWords.slice(0, 8)
      // this.metaWords = this.metaKeyWords.join()
      // 获取热门博主的数据——
      // let _tagBloggerItems = await $get('/web/hobbies/getHotBloggers?', {
      //   pageNo: 1,
      //   pageSize: 10
      // }, obj)
      // this.bloggerItems = _tagBloggerItems.data
      // 获取周排行榜数据
      // let _hostPointItems = await $get('/web/hobbies/hobbiesWeekRank?', {
      //   pageNo: 1,
      //   size: 10
      // }, obj)
      // this.hostPointItems = _hostPointItems.data

      // 获取初始hobbies列表的数据
      // let _mockHobbyItems = await $get('/web/hobbies/list?', {
      //   limit: 12,
      //   page: this.curPage,
      //   // classfiy: this.hobbiesClassId,
      //   order: 'desc',
      //   sidx: this.sidxRecently
      // }, obj) // 初始化 传值 id,desc,h.create_time，页数 (还未实现)
      // this.totalPage = this._mockHobbyItems.totalPage
      // this.totalCount = this._mockHobbyItems.totalCount
      // this.mockHobbyItems = this._mockHobbyItems.list
      this.metaDescription = this.mockHobbyItems[0].description
      this.picCount = 0
      this.picTotal = 0
      this.mockHobbyItems.forEach(item => {
        this.picTotal += item.photoList.length
      })
      this.hobbiesTwelve = this.mockHobbyItems.slice(0, 12)
      this.mockHobbyItems = this.hobbiesTwelve
      // console.log(this.$refs.pagination, 'page')
      // this.$refs.pagination.routLinkCurrentPage()

      // let mySwipers = new Swiper('.swiper-containers', {
      //   slidesPerView: 6
      // })
    })
    // this.$refs.pagination.routLinkCurrentPage(2)
    this.path = this.$route.path
    this.$nextTick(() => {
      setTimeout(() => {
        this.waterFlow('content-wrap', 'contain-hobby-wrap')
        // this.routLinkCurrentPage(this.curPage)
      }, 1000)
    })
    // 广告
    let adv = document.getElementById('advertisement')
    if (adv) {
      ;(window.slotbydup = window.slotbydup || []).push({
        id: '5993945',
        container: adv,
        size: '1200,200',
        display: 'inlay-fix',
        async: true
      })
    }
  },
  methods: {
    // 获取cookies
    getCookie(cname) {
      let name = cname + '='
      let ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim()
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
      }
      return ''
    },
    // 去重
    // selectOne(arr) {
    //   let oneArr = []
    //   for (let i = 0, len = arr.length; i < len; i++) {
    //     if (oneArr.indexOf(arr[i]) < 0) {
    //       oneArr.push(arr[i])
    //     }
    //   }
    //   return oneArr
    // },
    // 数据请求函数
    hobbiesImageChage(arr, index) {
      if (arr.length === 1) {
        return 'oneImage'
      }
      if (arr.length === 2 || arr.length === 4) {
        return 'twoImage'
      }
      // 五张
      if (arr.length === 5 || arr.length === 0) {
        return 'twoImage'
      }
      if (arr.length === 5 || arr.length === 1) {
        return 'twoImage'
      }
      if (arr.length === 5 && index === 2) {
        return 'threeImage'
      }
      if (arr.length === 5 && index === 3) {
        return 'threeImage'
      }
      if (arr.length === 5 && index === 4) {
        return 'threeImage'
      }
      // 七张图片
      if (arr.length === 7 && index === 0) {
        return 'twoImage'
      }
      if (arr.length === 7 && index === 1) {
        return 'twoImage'
      }
      if (arr.length === 7 && index === 2) {
        return 'twoImage'
      }
      if (arr.length === 7 && index === 3) {
        return 'twoImage'
      }
      if (arr.length === 7 && index === 4) {
        return 'threeImage'
      }
      if (arr.length === 7 && index === 5) {
        return 'threeImage'
      }
      if (arr.length === 7 && index === 6) {
        return 'threeImage'
      }
      //  八张图片
      if (arr.length === 8 && index === 0) {
        return 'twoImage'
      }
      if (arr.length === 8 && index === 1) {
        return 'twoImage'
      }
      if (arr.length === 8 && index === 2) {
        return 'threeImage'
      }
      if (arr.length === 8 && index === 3) {
        return 'threeImage'
      }
      if (arr.length === 8 && index === 4) {
        return 'threeImage'
      }
      if (arr.length === 8 && index === 5) {
        return 'threeImage'
      }
      if (arr.length === 8 && index === 6) {
        return 'threeImage'
      }
      if (arr.length === 8 && index === 7) {
        return 'threeImage'
      }
      // 九张
      if (arr.length === 9 || arr.length === 6 || arr.length === 3) {
        return 'threeImage'
      }
    },
    // handleScrollEvent() {
    //   const $waterList = this.$refs.waterFallsList
    //   if ($waterList) {
    //     if (
    //       document.documentElement.scrollTop +
    //       document.documentElement.clientHeight >=
    //       parseInt($waterList.style.height) + $waterList.offsetTop
    //     ) {
    //       this.timer++
    //       if (this.timer > 4) {
    //         window.removeEventListener('scroll', this.handleScrollEvent)
    //         return
    //       }
    //       // console.log('我监听出来了222122222', this.timer)
    //       if (this.timer === 1) {
    //         this.fourId = 4
    //         this.fiveId = 5
    //         this.sixId = 6
    //         this.sevenId = 7
    //       }
    //
    //       if (this.timer === 3) {
    //         // this.mockHobbyItems = this.hobbiesTwelve
    //         this.eightId = 8
    //         this.nineId = 9
    //         this.tenId = 10
    //         this.elevenId = 11
    //         this.isPaginationOn = 2
    //       }
    //       this.waterFlow('content-wrap', 'contain-hobby-wrap')
    //     }
    //   }
    // },
    async getRecentlyHobbiesList(id, page = 1) {
      let wparent = document.getElementsByClassName('content-wrap')
      let contentContain = document.getElementsByClassName('content-contain')
      wparent[0].style.height = 1300 + 'px'
      contentContain[0].style.height = 1600 + 'px'
      this.mockHobbyItems = null
      this.hobbiesClassId = id
      // 获取初始hobbies列表的数据
      this.mockHobbyItems = null
      let _mockHobbyItems = await $get('/web/hobbies/list?', {
        limit: 12,
        page: page,
        classfiy: id,
        order: 'desc',
        sidx: this.sidx
      }) // 初始化 传值 id,desc,h.create_time，页数 (还未实现)
      this.mockHobbyItems = _mockHobbyItems.data.list
      this.totalPage = _mockHobbyItems.data.totalPage
      this.totalCount = _mockHobbyItems.data.totalCount
      this.indexId = 0
      this.hobbiesFour = this.mockHobbyItems.slice(0, 4)
      this.hobbiesEight = this.mockHobbyItems.slice(0, 8)
      this.hobbiesTwelve = this.mockHobbyItems.slice(0, 12)
      this.mockHobbyItems = this.hobbiesTwelve

      // this.scrollEvent()
      setTimeout(() => {
        this.waterFlow('content-wrap', 'contain-hobby-wrap')
      }, 1000)
    },
    //  图片拼接
    piectImgUrl(item) {
      return systemManage.getApi(item.photo)
    },
    piectImg(item) {
      return systemManage.getApi(item.photo)
    },
    piecImgUrl(item) {
      return systemManage.getApi(item.authorphoto)
    },
    tagOn(index) {
      this.tagType = index
    },
    tagOnDeline(index) {
      this.tagType = null
    },
    // 瀑布流
    waterFlow(parent, chirp) {
      // let wparent = document.getElementsByClassName(parent);
      let allArr = document.getElementsByClassName(chirp)
      // console.log('test-------wparent', wparent[0].style.height);
      // let wchirldWidth = wparent.getElementsByClassName('*')
      let num = 2
      // 动态改变父容器宽度
      // wparent.style.cssText = 'width:' + allArr[0].offsetWidth * num + 'px '
      this.getMinHeightOfCols(allArr, num)
      // console.log("test-------瀑布流函数", allArr[0].offsetWidth);
    },
    getMinHeightOfCols(chirdArr, num) {
      let wparent = document.getElementsByClassName('content-wrap')
      let contentContain = document.getElementsByClassName('content-contain')
      // console.log('test-------wparents', wparent[0].style.height)
      let onlyOneColsArr = []
      for (let i = 0; i < chirdArr.length; i++) {
        if (i < num) {
          onlyOneColsArr[i] = chirdArr[i].offsetHeight
        } else {
          // 获取每个盒子中最小高度的一个
          let minHeightOfCols = Math.min.apply(null, onlyOneColsArr)
          //  获取最小高度图片下标
          let minHeightOfIndex = this.getMinIndex(
            onlyOneColsArr,
            minHeightOfCols
          )
          if (wparent) {
            chirdArr[i].style.position = 'absolute'
            chirdArr[i].style.top = minHeightOfCols + 'px'
            chirdArr[i].style.left =
              chirdArr[minHeightOfIndex].offsetLeft + 'px'
            onlyOneColsArr[minHeightOfIndex] += chirdArr[i].offsetHeight
            // 动态改变
            let maxHeightOfCols = Math.max.apply(null, onlyOneColsArr)
            // console.log('test---max', maxHeightOfCols)
            // if (maxHeightOfCols > 1200) {
            wparent[0].style.height = maxHeightOfCols + 'px'
            // let rightContain = document.getElementsByClassName('content-contain-right')[0]
            contentContain[0].style.height = maxHeightOfCols + 205 + 'px'
            if (maxHeightOfCols + 205 < 1400) {
              contentContain[0].style.height = 1400 + 'px'
            }
            // console.log('test--------contentCotain', contentContain[0].style.height)
            // console.log('test---max', wparent[0].style.height)
            // const conHeight = maxHeightOfCols
          }
          //  定义布局
        }
      }
    },
    // ——获取最小高度下标
    getMinIndex(onlyOneColsArr, min) {
      for (let i in onlyOneColsArr) {
        if (onlyOneColsArr[i] === min) {
          return i
        }
      }
    },
    publishHobbies() {
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      if (
        localStorage.getItem('userMsg') !== '' &&
        localStorage.getItem('userMsg') !== null
      ) {
        this.tokenObj = JSON.parse(localStorage.getItem('userMsg')).token
      } else if (this.cookie !== '') {
        this.cookie = this.getCookie('token')
        this.tokenObj = this.cookie
      }
      $get(
        webUserSelectByPrimaryKey,
        {},
        {
          'X-Auth0-Token':
            this.tokenObj
        }
      ).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.loginFlag = res.data.code
          this.$router.push({
            path: `/hobby/publishHobbies`
          })
        } else {
          let x = window.confirm('您还未登录，请登录！')
          if (x === true) {
            this.$router.push({ path: `/login` })
            // window.location.href = 'http://165.qiweioa.cn/login/'
          }
        }
      })
      // console.log('ssefef')
      // if (
      //   localStorage.getItem('userMsg') !== '' &&
      //   localStorage.getItem('userMsg') !== null
      // ) {
      //   this.$router.push({
      //     path: `/publishHobbies`
      //   })
      // } else if (this.getCookie('token') !== '' && this.getCookie('token') !== null) {
      //   this.$router.push({
      //     path: `/publishHobbies`
      //   })
      // } else {
      //   let x = window.confirm('您还未登录，请登录！')
      //   if (x === true) {
      //     this.$router.push({ path: `/login` })
      //     // window.location.href = 'http://165.qiweioa.cn/login/'
      //   }
      // }
    },
    isRedOn(index) {
      this.isRed = index
    },
    isRedIn() {
      this.isRed = -1
    },
    // 二级导航——改变导航样式
    mouseEnterNav(index) {
      this.redType = index
    },
    mouseLeverNav() {
      this.redType = null
    },
    enterSecondNav(index, id) {
      this.sidx = this.sidxRecently
      this.$refs.pagination.resertCurrentPage()
      this.fourId = 44
      this.fiveId = 54
      this.sixId = 64
      this.sevenId = 74
      this.eightId = 84
      this.nineId = 94
      this.tenId = 104
      this.elevenId = 114
      this.type = index
      // console.log('teeee', id)
      // 清空hobbies列表，传值id
      this.getRecentlyHobbiesList(id)
      this.hotDecorationOn = true
      this.hotLineDecoration = true
      this.recentlyDecorationOn = false
      this.recentlyLineDecoration = false
    },
    // classMap () {
    //   this.imgType = 1
    // },
    enterRecentlyArtical() {
      this.hotDecorationOn = true
      this.recentlyDecorationOn = false
      this.hotLineDecoration = true
      this.recentlyLineDecoration = false
      this.mockHobbyItems = null
      this.sidx = this.sidxRecently
      this.fourId = 44
      this.fiveId = 54
      this.sixId = 64
      this.sevenId = 74
      this.eightId = 84
      this.nineId = 94
      this.tenId = 104
      this.elevenId = 114
      this.getRecentlyHobbiesList(this.hobbiesClassId)
      this.$refs.pagination.resertCurrentPage()
      // this.scrollEvent()
      // setTimeout(() => {
      //   this.waterFlow('content-wrap', 'contain-hobby-wrap')
      // }, 0)
    },
    async enterHotArtical() {
      let wparent = document.getElementsByClassName('content-wrap')
      let contentContain = document.getElementsByClassName('content-contain')
      this.$refs.pagination.resertCurrentPage()
      this.fourId = 44
      this.fiveId = 54
      this.sixId = 64
      this.sevenId = 74
      this.eightId = 84
      this.nineId = 94
      this.tenId = 104
      this.elevenId = 114
      this.recentlyDecorationOn = true
      this.hotDecorationOn = false
      this.hotLineDecoration = false
      this.recentlyLineDecoration = true
      this.sidx = this.sidexHot
      this.mockHobbyItems = null
      // 获取初始hobbies列表的数据
      let _mockHobbyItems = await $get('/web/hobbies/list?', {
        limit: 12,
        page: 1,
        classfiy: this.hobbiesClassId,
        order: 'desc',
        sidx: this.sidexHot
      }) // 初始化 传值 id,desc,h.create_time，页数 (还未实现)
      this.mockHobbyItems = _mockHobbyItems.data.list
      this.indexId = 0
      this.hobbiesTwelve = this.mockHobbyItems.slice(0, 12)
      this.mockHobbyItems = this.hobbiesTwelve
      setTimeout(() => {
        this.waterFlow('content-wrap', 'contain-hobby-wrap')
      }, 600)
      // this.scrollEvent()
    },
    // 本月热点——改变按钮样式&&
    async enterWeekHotList() {
      this.rankId = 'w'
      this.monthHotOn = false
      this.monthDecoration = false
      this.weekDecoration = true
      this.weekHotOn = true
      let _hostPointItems = await $get('/web/hobbies/hobbiesWeekRank?', {
        pageNo: 1,
        size: 10
      })
      this.hostPointItems = _hostPointItems.data
    },
    // 本月热点——改变按钮样式&&
    async enterMonthHotList() {
      this.rankId = 'm'
      this.monthHotOn = true
      this.monthDecoration = true
      this.weekHotOn = false
      this.weekDecoration = false
      let _hostPointItems = await $get('/web/hobbies/hobbiesMonthRank?', {
        pageNo: 1,
        size: 10
      })
      this.hostPointItems = _hostPointItems.data
    },
    pageChange(page) {
      this.$router.push({
        path: `/hobby/${page}`
      })
      console.log(page, 'testpage')
        this.waterFlow('content-wrap', 'contain-hobby-wrap')
      this.getRecentlyHobbiesList(this.hobbiesClassId, page)
      this.currentPage = page
    }
  }
}
</script>

<style>
html {
  height: 100%;
  width: 100%;
  background-color: #f6f6f6;
}
.contain-hobbies {
  box-sizing: border-box;
  height: auto !important;
  width: 1200px;
  min-height: 200px !important;
  /*padding: 0 345px 15px 345px;*/
  background-color: #f6f6f6;
  clear: both;
  align-items: center;
  margin: 0 auto;
  /*overflow: auto;*/
}
.contain-hobbies a {
  text-decoration: none;
  color: black;
}
.contain-hobbies a :hover {
  text-decoration: none;
}
.contain-hobbies .title {
  box-sizing: border-box;
  width: 1200px;
  height: 164px;
  text-align: center;
  padding: 52px 0 50px 0;
}
.title-chinese {
  letter-spacing: 13px;
  font-size: 36px;
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
}
.title-english {
  position: relative;
  height: 30px;
}
.contain-hobbies .title_img {
  position: absolute;
  top: 3px;
  left: 511px;
}
.title-english-style {
  /*width:129px;*/
  /*height:12px;*/
  letter-spacing: 10px;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  top: 4px;
  left: 533px;
  color: rgba(18, 18, 18, 1);
}
.contain-hobbies .hobbies-tag {
  min-height: 42px;
  text-align: center;
  clear: both;
  width: 1200px;
}
.contain-hobbies .tag-nav {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  text-align: center;
  font-size: 14px;
  display: inline-block;
  margin-left: 10px;
  margin-bottom: 10px;
  height: 42px;
  background: rgba(246, 246, 246, 1);
  border: 2px solid rgba(231, 231, 231, 1);
  color: rgba(42, 42, 42, 1);
  /* padding-top: 10px; */
  padding-left: 6px;
  padding-right: 6px;
  vertical-align: top;
}
.tag--box {
  display: inline-block;
  height: 42px;
  padding: 10px;
}
.tag-nav--change {
  display: block;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tag-nav a :hover {
  text-decoration: none;
  color: black;
}
.tag_img {
  position: absolute;
  bottom: 3px;
  right: 3px;
}
.tag-nav.tagBorderOn {
  border: 2px solid rgba(190, 0, 30, 1);
}
.nav-hobby {
  height: 185px;
  width: 1220px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}
.nav-slide-item-wrap {
  box-sizing: border-box;
  height: 175px;
  width: 180px;
  cursor: pointer;
}
/*.nav-slide-item-wrap:hover .nav-hobby-text {*/
  /*color: #BE001E*/
/*}*/
.nav-hobby-wrap {
  height: 185px;
  position: absolute;
  width: auto;
  left: 0;
}
.nav-second-wrap {
  position: absolute;
  height: 185px;
}
.nav-hobby-item {
  height: 185px;
  width: 180px;
  float: left;
  margin-right: 23px;
}
.nav-hobby-item2 {
  height: 185px;
  width: 180px;
  float: left;
  margin-right: 23px;
}
/*div.nav-hobby-item :last-child {*/
/*margin-right:0*/
/*}*/
.nav-hobby-img {
  box-sizing: border-box;
  width: 180px;
  height: 132px;
  border:2px solid rgba(0,0,0,0);
}
.nav-hobby-img img {
  width: 176px;
  height: 128px;
  vertical-align: top;

}
.nav-hobby-img.navBorderOn {
  border: 2px solid rgba(190, 0, 30, 1);
}
.nav-hobby-text {
  box-sizing: border-box;
  width: 180px;
  height: 53px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  padding: 20px 0 19px 0;
}
.nav-hobby-text.navTxtRed {
  color: #BE001E
}
.nav-hobby-text.navTxtOn {
  background: rgba(190, 0, 30, 1);
  color: rgba(255, 255, 255, 1);
}
.content-contain {
  width: 1200px;
  height: 3000px;
  margin-top: 40px;
}
.content-contain-left {
  /*padding-bottom: 100px;*/
  width: 790px;
  height: auto;
  float: left;
  clear: both;
  /*overflow: hidden;*/
}
.contain-hobbies .content-footer {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 80px;
  background-color: white;
  border-bottom: 1px solid #121212;
}
.button-hot {
  height: 80px;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
  color: rgba(25, 25, 25, 1);
  padding-top: 30px;
  float: left;
  margin: 0 40px;
}
.button-hot.hotDecorationOn {
  color: rgba(190, 0, 30, 1);
}
.button-recently.recentlyDecorationOn {
  color: rgba(190, 0, 30, 1);
}
.button-recently {
  height: 80px;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
  color: rgba(25, 25, 25, 1);
  padding-top: 30px;
  float: left;
}
.decoration-hot {
  position: absolute;
  bottom: -6px;
  left: 40px;
}
.decoration-recently {
  position: absolute;
  bottom: -6px;
  left: 117px;
}
.button-banner-hobby {
  position: absolute;
  top: 20px;
  right: 40px;
}
.add-wrap {
  position: absolute;
  top: 30px;
  right: 160px;
  cursor: pointer;
}
.hobby-text-wrap {
  position: absolute;
  top: 30px;
  right: 55px;
  font-size: 16px;
  font-weight: bold;
  color: rgba(254, 254, 254, 1);
  cursor: pointer;
}
.img_add {
  width: 15px;
  height: 15px;
}
.img_wrap_hobby {
  width: 170px;
  height: 40px;
}
/*.img_add {*/
/*position: absolute;*/
/*}*/
/* 瀑布流板块样式 */
.content-wrap {
  /* width:790px */
  width: 104%;
  height: auto;
  margin-top: 30px;
  position: relative;
  /*overflow: auto;*/
}
.contain-hobby-wrap {
  box-sizing: border-box;
  width: 410px;
  height: auto;
  padding: 0 20px 30px 0;
  float: left;
  clear: right;
  cursor: pointer;
}
.contain-hobby-wrap:hover .detail-hobby-title{
  color: #BE001E !important;
}
.box-picture {
  height: auto;
  display: inline-block;
}
.get-hobby-image {
  border-bottom: #BE001E;
  display: inline-block;
  margin: 0 10px 10px 0;
}
.get-hobby-image.oneImage {
  width: 380px;
  height: 280px;
  /*float: left;*/
  clear: both;
  /*display: inline-block;*/
  /*vertical-align: top;*/
}
.get-hobby-image.twoImage {
  width: 185px;
  height: 137px;
  /*float: left;*/
  clear: both;
  /*display: inline-block;*/
  /*vertical-align: top;*/
}
.get-hobby-image.threeImage {
  width: 120px;
  height: 90px;
  /*float: left;*/
  clear: both;
  /*display: inline-block;*/
  /*vertical-align: top;*/
}
.get-hobby-image.fourImage {
  width: 185px;
  height: 137px;
  /*float: left;*/
  clear: both;
  /*display: inline-block;*/
  /*vertical-align: top;*/
}
.get-hobby-image.fiveImage {
  width: 185px;
  height: 137px;
  /*float: left;*/
  clear: both;
  /*display: inline-block;*/
  /*vertical-align: top;*/
}
.get-hobby-image.sixImage {
  width: 120px;
  height: 90px;
  /*float: left;*/
  clear: both;
  /*display: inline-block;*/
  /*vertical-align: top;*/
}
.get-hobby-image.nineImage {
  width: 120px;
  height: 90px;
  /*float: left;*/
  clear: both;
  /*display: inline-block;*/
  /*vertical-align: top;*/
}

.box-picture img {
  font-size: 0;
  height: auto;
  width: 380px;
  /*border: 0;*/
  /*vertical-align: bottom;*/
}
.detail-hobby-artical {
  box-sizing: border-box;
  position: relative;
  width: 380px;
  background-color: white;
  padding-top: 22px;
  margin-top: -15px;
  padding-bottom: 20px;
}
.detail-hobby-artical a {
  display: block;
}
.red-line {
  position: absolute;
  top: 25px;
  left: 0;
}
.contain-hobbies .title-wrap {
  max-height: 50px;
  line-height: 26px;
  /*overflow: hidden;*/
}
.detail-hobby-title {
  display: inline-block;
  font-weight: 400;
  margin-left: 19px;
  color: black;
  width: 336px;
  max-height: 50px;
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/*.hobbiesDescription :hover {*/
  /*color: rgba(190, 0, 30, 1);*/
  /*text-decoration: none;*/
/*}*/
.detail-hobby-title ::after {
  content: '...';
  font-weight: bold;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 20px 1px 45px;
}
/*a:hover {*/
/*color: */
/*}*/
.detail-container {
  width: 336px;
  height: 25px;
  margin: 12px 25px 0 20px;
  text-align: left;
}

.detail-container-left-img {
  float: left;
  height: 25px;width:25px;border-radius: 50%
}
/*.detail-container-left-img.oneImage {*/
/*width: 280px;*/
/*height: 380px;*/
/*float: left;*/
/*}*/
/*.detail-container-left-img.twoImage {*/
/*width: 185px;*/
/*height: 137px;*/
/*float: left;*/
/*margin-right: 10px;*/
/*}*/
/*.detail-container-left-img.threeImage {*/
/*width: 120px;*/
/*height: 90px;*/
/*float: left;*/
/*}*/
/*.detail-container-left-img.fourImage {*/
/*width: 185px;*/
/*height: 137px;*/
/*float: left;*/
/*}*/
/*.detail-container-left-img.fiveImage {*/
/*width: 280px;*/
/*height: 380px;*/
/*float: left;*/
/*}*/
/*.detail-container-left-img.oneImage {*/
/*width: 280px;*/
/*height: 380px;*/
/*float: left;*/
/*}*/
/*.detail-container-left-img.oneImage {*/
/*width: 280px;*/
/*height: 380px;*/
/*float: left;*/
/*}*/
/*.detail-container-left-img.oneImage {*/
/*width: 280px;*/
/*height: 380px;*/
/*float: left;*/
/*}*/
/*.detail-container-left-img.oneImage {*/
/*width: 280px;*/
/*height: 380px;*/
/*float: left;*/
/*}*/
.detail-container-left-text {
  float: left;
  margin-top: 2px;
  margin-left: 8px;
  font-size: 14px;
  font-weight: 300;
  color: rgba(177, 177, 177, 1);
}
.detail-container-middle {
  /*display:inline-block;*/
  vertical-align: top;
  float: left;
  margin: 0 20px;
  margin-top: 3px;
}
.detail-container-right {
  /*vertical-align: top;*/
  float: left;
  font-size: 14px;
  font-weight: 300;
  color: rgba(177, 177, 177, 1);
  margin-top: 2px;
}
.hobbies-pagination {
  margin-top:40px;
}
.content-contain-right {
  box-sizing: border-box;
  padding: 30px 30px 20px 30px;
  width: 381px;
  margin-bottom: 30px;
  min-height: 900px;
  float: right;
  background-color: white;
}
.content-contain-right a :hover {
  color: #BE001E;
  text-decoration: none;
}
/*.title-hot-bloggers {*/
/*width:auto;*/
/*height: auto;*/
/*}*/
.contain-hobbies .img_blogger {
  float: left;
}
.contain-hobbies .text-blogger {
  font-size: 18px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  float: left;
  margin-left: 10px;
}
.contain-wrap-blogger {
  margin-top: 60px;
  min-height: 300px;
  /*border-bottom: 1px solid rgba(240, 240, 240, 1);*/
}
.content-blogger {
  clear: both;
  height: 80px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}
.content-blogger:hover .name-blogger{
  color:#BE001E
}
.content-blogger:last-child {
  margin-bottom: 40px;
}
.avatar-blogger {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 20px;
}
.name-blogger {
  display:inline-block;
  font-size: 16px;
  font-weight: bold;
  width: 250px;
  height:50px;
  color: rgba(0, 0, 0, 1);
  margin-top: 17px;
  float: left;
}
.title-host-point {
  /*margin-bottom: 27px;*/
  position: relative;
}
.title-host-point a:hover {
  color: #BE001E;
  text-decoration: none;
}
.title-hostPoint-bottom {
  position: relative;
  width: 285px;
  height: 40px;
  margin-top: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
}
.hot-img-wrap {
  position: absolute;
  bottom: -6px;
  left: 0;
}
.hot-img-wrap2 {
  position: absolute;
  bottom: -6px;
  left: 98px;
}
.button-week {
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
.button-week:hover {
  color: #BE001E;
  text-decoration: none;
}
.button-week.weekHotOn {
  color: rgba(190, 0, 30, 1);
}
.button-month {
  font-size: 18px;
  font-weight: 600;
  color: rgba(25, 25, 25, 1);
  float: left;
  text-align: left;
  cursor: pointer;
}
.button-month:hover {
  color: #BE001E;
  text-decoration: none;
}
.button-month.monthHotOn {
  color: rgba(190, 0, 30, 1);
}
.text-more {
  font-size: 14px;
  font-weight: normal;
  color: rgba(153, 153, 153, 1);
  position: absolute;
  right: 0;
  top: 2px;
}
.decoration-line {
  width: 43px;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
  position: absolute;
  right: 0;
  top: 46px;
}
#wrapHostPoint {
  box-sizing: border-box;
  padding: 10px 0 0 0;
  margin: 20px 0 0 0;
  width: 320px;
  position: relative;
}
.black_img {
  position: absolute;
  top: 11px;
  left: 4px;
}
.red_img {
  position: absolute;
  top: 10px;
  left: 0px;
}
.red2_img {
  position: absolute;
  top: 42px;
  left: 0px;
}
.red3_img {
  position: absolute;
  top: 74px;
  left: 0px;
}
.contain-wrap-host-point {
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
.contain-hobbies .textRank {
  position: absolute;
  font-size: 12px;
  font-weight: 400;
  color: black;
  margin-left: 3px;
  display: inline-block;
  vertical-align: top;
  z-index: 10;
  /*line-height:32px;*/
}
.textRank.whiteTextOn {
  color: white;
}
.contain-hobbies .titleRank {
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
.titleRank a:hover {
  color: #BE001E;
  text-decoration: none;
}
#wrapHostPoint div:last-child {
  border-bottom: 0;
  margin-bottom: 0;
}
.content-left-hostPoint {
  width: 100px;
  height: 74px;
  border: 1px solid rgba(231, 231, 231, 1);
  vertical-align: top;
  float: left;
}
.content-right-hostPoint {
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  height: 74px;
  width: 200px;
  padding: 16px 0 14px 21px;
  text-align: left;
}
.hostPoint-tex {
  font-size: 16px;
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
}
.hostPoint-time {
  font-size: 10px;
  font-weight: bold;
  color: rgba(170, 170, 170, 1);
  margin-top: 10px;
}
  #advertisement {
    margin-top: 40px;color:red;width: 1200px;height: 200px;
  }
  .hobbies-footer {
    margin-top:20px;
  }
</style>
