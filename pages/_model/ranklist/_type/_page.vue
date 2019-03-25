<template>
  <div class="rankPageBox">
    <Header></Header>
    <div class="mainContent rankDetail">
      <div class="crumbs">
        <span class="crumbsItem"
          :class="index == (crumbsData.length-1)?'active':''"
          v-for="(item,index) in crumbsData"
              v-if="(['首页', '排行']).some(v => { return item.pathName.indexOf(v) != -1 })"
          :key="index">
          <nuxt-link :to="`${item.link}`">{{item.pathName}}</nuxt-link>
          <i class="crumbsIcon"
            :class="index == (crumbsData.length-2) ? 'crumbsRedIcon' :''"
            v-if="index != (crumbsData.length-1)">
          </i>
        </span>
      </div>
      <div class="leftSide">
        <div class="todayContainer"
          v-for="(item,index) in leftSideResult.essayEntities"
          :key="index">
          <el-row style="margin: 0px">
            <el-col :span="11.5"
              style="padding:0px">
              <div class="todayImg"
                @mouseenter="titleActive(item)"
                @mouseleave="removeTitleActiveFn()">
                <nuxt-link :to="`/${detailsObj['rank']}/detail/${item.essayId}/1`">
                  <img :src="$ImgUrlRelative(piectImgUrl(item))"
                    :alt="item.title"
                    @error="imgLossLoad(index)"
                    @load="imgSeccessLoad()"
                    class="todayImg_class">
                </nuxt-link>
                <div class="defaultBox"
                  v-if="imgLoadStatus == 'false' && index == imgLossIndex  ">
                  <nuxt-link :to="`/${detailsObj['rank']}/detail/${item.essayId}/1`">
                    <img src="~static/common/default.png"
                      alt="尖锋咖"
                      width="160px">
                  </nuxt-link>
                </div>
                <div class="rankNum"
                  :class="index == 0 || index == 1 || index == 2 ? 'rankNumTop':'rankNumNormal'"
                  v-if="currentPage == 1">NO.{{index+1}}</div>
              </div>
            </el-col>
            <el-col :span="12.5"
              style="padding:0px">
              <div class="imgDesc">
                <span class="imgDesc_Title"
                  :class="removeTitleActive == true&&titleActiveIndex == index ? 'redColor' :'title'"
                  @mouseenter="titleActive(item)"
                  @mouseleave="removeTitleActiveFn()">
                  <nuxt-link :to="`/${detailsObj['rank']}/detail/${item.essayId}/1`">
                    <strong :class="removeTitleActive == true&&titleActiveIndex == index ? 'redColor' :'title'">
                      {{item.title}}
                    </strong></nuxt-link>
                </span>

                <div class="divider">
                  <!-- 分割线 -->
                  <div></div>
                  <div></div>
                </div>
                <p class="detail">{{item.digest}}</p>
                <div class="footerBox">
                  <div class="messageBox">
                    <nuxt-link :to="`/bloger/${item.authorId}/1`">
                      <img :src="$ImgUrlRelative(piectProfileUrl(item))"
                        :alt="item.NAME || item.name"
                        class="userIcon"></nuxt-link>
                    <nuxt-link :to="`/bloger/${item.authorId}/1`">
                      <span class="userName">{{item.NAME || item.name}}</span></nuxt-link>
                    <div class="todayDivider"></div>
                    <span class="label">{{item.label}}</span>
                  </div>
                  <span class="createTime">{{item.create_time.split(' ')[0]}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="paginationShow "
          v-if="leftSideResult.essayEntities&&leftSideResult.essayEntities.length != 0">
          <pagination v-on:pageChange="newPage"
            :toTop="{x:0,y:0}"
            :totalCount="leftSideResult.essayCount"
            :pageSize="10"
            :totalPage="leftSideResult.totalPageCount "
            :routePage='`${currentPage}`'>
          </pagination>
        </div>
      </div>
      <div class="rightSide">
        <div class="rightSideContent">
          <div class="advertisesBox">
            <div class="advertisesItem">
              <div id="imgBox_rankOne">
              </div>
              <span class="flag">广告</span>
            </div>
            <div class="advertisesItem">
              <div id="imgBox_rankTwo">
              </div>
              <span class="flag">广告</span>
            </div>
            <div class="advertisesItem">
              <div id="imgBox_rankThree">
              </div>
              <span class="flag">广告</span>
            </div>
            <div class="advertisesItem">
              <div id="imgBox_rankFour">
              </div>
              <span class="flag">广告</span>
            </div>
          </div>
          <div class="todayRank">
            <todayRankTab :rankWeekLists="rankWeekLists" :rankMonthLists="rankMonthLists"></todayRankTab>
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
// import todayRankTab from '@/components/todayRankTab.vue'
import todayRankTab from '@/components/rankTab.vue'
import pagination from '@/components/pagination.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { $get } from '@/http/ajax.js'
import until from '@/utils/until'

// import Utils from 'utils/utils'

import {
  dsfFeatureGetRutureByChannel,
  webTagGetRandomTagsByChannel,
  // webEssayGetEssayByChannel,
  webEssayGetWeekendRank,
  webEssayGetMonthRank,
  webEssayGetDayRank
} from '@/http/api.js'
import { race } from 'q';
import { detailsObj } from '@/utils/defaultConfig.js'
export default {
  name: 'rankDetail',
  head(){
    return {
      title: `${this.typeParamsName}_${
        this.currentPage
      }页-尖锋咖`,
      // 设置 meta
      meta: [
        {
          hid: 'keyWords',
          name: 'keyWords',
          content: `${this.tagStr}`
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
          content: `format=html5;url=http://m.jfcar.com.cn${this.$route.fullPath}`
        }
      ],
    }
  },
  data: function() {
    return {
      // 文章tag，用于设置meta的keyWord
      tagStr:'',
      crumbsData: [],
      typeParams: {},
      currentPage: '1',
      flag: 0,
      bannerTopicData: [],
      // leftSideResult: [],
      showPercent: false,
      upPrecent: '70%',
      downPrecent: '30%',
      navActiveIndex: '',
      model: '',
      modelName: '',
      metaDesc: '',
      typeParamsName: '',
      removeTitleActive: '',
      titleActiveIndex: '',
      removeTitleActive: '',
      imgLossIndex: '',
      imgLoadStatus: 'true',
      tagName: '',
      tagId: '',
      detailsObj
    }
  },
  components: {
    todayRankTab,
    pagination,
    Header,
    Footer
  },
  // nuxt获取数据
  async asyncData ({params}) {
    var leftSideResult
    if (params.type && params.type == 'w') {
      leftSideResult = await $get(webEssayGetWeekendRank, {
        pageNo: params.page,
        size: 12
      }
      )
    } else if (params.type && params.type == 'm') {
      leftSideResult = await $get(webEssayGetMonthRank, {
        pageNo: params.page,
        size: 12
      })
    } else {
      leftSideResult = await $get(webEssayGetDayRank, {
        pageNo: params.page,
        size: 12
      })
    }
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
    return {
      leftSideResult: leftSideResult.data ? leftSideResult.data : [],
      rankWeekLists: rankWeekLists.data.essayEntities ? rankWeekLists.data.essayEntities : [],
      rankMonthLists: rankMonthLists.data.essayEntities ? rankMonthLists.data.essayEntities : [],
    }
  },
  methods: {
    titleActive(item) {
      this.titleActiveIndex = this.leftSideResult.essayEntities.indexOf(item)
      this.removeTitleActive = true
    },
    removeTitleActiveFn() {
      this.removeTitleActive = false
    },
    // 根据路由中的重要参数信息设置全局变量
    getRouterMessage(model, type) {
      switch (model) {
        case '/index':
          this.modelName = '首页'
          break
        case '/news':
          this.modelName = '今日车闻'
          break
        case '/ev':
          this.modelName = '新能源'
          break
        case '/video':
          this.modelName = '视频'
          break
        case '/hobbies':
          this.modelName = '兴趣部落'
          break
        case '/taglist':
          this.modelName = 'tag列表页'
          break
        default:
          break
      }
      switch (type) {
        case 'd':
          this.typeParamsName = '日排行'
          break
        case 'w':
          this.typeParamsName = '周排行'
          break
        case 'm':
          this.typeParamsName = '月排行'
          break
        default:
          break
      }
    },
    pageChangeGetData(newPage, oldPage) {
      this.$router.push({
        path: `${this.model}/ranklist/${this.typeParams.type}/${newPage}`
      })
      // this.$nextTick(async () => {
      //   if (this.$route.params.type && this.$route.params.type == 'w') {
      //     let rankWeekDetail = await $get(webEssayGetWeekendRank, {
      //       pageNo: newPage,
      //       size: 10
      //     })
      //     this.leftSideResult = rankWeekDetail.data
      //   } else if (this.$route.params.type && this.$route.params.type == 'm') {
      //     let rankMonthDetail = await $get(webEssayGetMonthRank, {
      //       pageNo: newPage,
      //       size: 10
      //     })
      //     this.leftSideResult = rankMonthDetail.data
      //   } else {
      //     let rankDayDetail = await $get(webEssayGetDayRank, {
      //       pageNo: newPage,
      //       size: 10
      //     })
      //     this.leftSideResult = rankDayDetail.data
      //   }
      // })
    },
    piectImgUrl(item) {
      if(item.cover.indexOf('http:') >= 0 || item.cover.indexOf('/image') >= 0){
        return item.cover
      }
      return systemManage.getApi(item.cover)
    },
    // 头像
    piectProfileUrl(item) {
      if(item.photo.indexOf('http:') >= 0 || item.photo.indexOf('/image') >= 0){
        return item.photo
      }
      return systemManage.getApi(item.photo)
    },
    newPage: function(value) {
      this.currentPage = value
    },
    navActive: function(item) {
      this.navActiveIndex = this.tabData.indexOf(item)
    },
    // 判断文章的图片是否加载成功，若失败则执行的方法
    imgLossLoad(index) {
      this.imgLossIndex = index
      this.imgLoadStatus = 'false'
    },
    // 判断文章的图片是否加载成功，若成功则执行的方法
    imgSeccessLoad() {
      this.imgLoadStatus = 'true'
    },
    // 获取侧边广告
    getRightSideAdver(
      oneAdverBox,
      oneAdverId,
      twoAdverBox,
      twoAdverId,
      threeAdverBox,
      threeAdverId,
      fourAdverBox,
      fourAdverId
    ) {
      //  第一个广告
      let oneBox = document.getElementById(oneAdverBox)
      if (oneBox) {
        ;(window.slotbydup = window.slotbydup || []).push({
          id: oneAdverId,
          container: oneBox,
          size: '380,280',
          display: 'inlay-fix',
          // 异步加载，不然广告不会显示
          async: true
        })
      }
      // 第二个广告
      let twoBox = document.getElementById(twoAdverBox)
      if (twoBox) {
        ;(window.slotbydup = window.slotbydup || []).push({
          id: twoAdverId,
          container: twoBox,
          size: '380,280',
          display: 'inlay-fix',
          // 异步加载，不然广告不会显示
          async: true
        })
      }
      // 第三个广告
      let threeBox = document.getElementById(threeAdverBox)
      if (threeBox) {
        ;(window.slotbydup = window.slotbydup || []).push({
          id: threeAdverId,
          container: threeBox,
          size: '380,280',
          display: 'inlay-fix',
          // 异步加载，不然广告不会显示
          async: true
        })
      }
      // 第四个广告
      let fourBox = document.getElementById(fourAdverBox)
      if (fourBox) {
        ;(window.slotbydup = window.slotbydup || []).push({
          id: fourAdverId,
          container: fourBox,
          size: '380,280',
          display: 'inlay-fix',
          // 异步加载，不然广告不会显示
          async: true
        })
      }
    },
    // 获取底部广告
    getAdvertise(bottomBoxId, bottomAdvertiseId) {
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
    }
  },
  beforeRouteEnter(to,from, next) {
    next(vm => {
      vm.crumbsData = [
        { pathName: '首页', link: '/' },
        {
          pathName:
            from.meta.title &&
            from.meta.title != undefined &&
            from.meta.title != 'tag列表页'
              ? from.meta.title
              : vm.modelName == 'tag列表页'
              ? vm.tagName
              : vm.modelName,
          link:
            from.path != undefined && from.path != '/'
              ? from.path
              : vm.modelName == 'tag列表页'
              ? `${vm.model[0]}/${vm.tagId}/1`
              : `${vm.model[0]}/1`
        },
        {
          pathName: vm.typeParamsName,
          link: ''
        }
      ]
      if (vm.model[0] == '/index') {
        vm.crumbsData.splice(1, 1)
      }
      if (vm.model[0] == '/search') {
        vm.crumbsData.splice(1, 1)
      }
      sessionStorage.setItem('rankCrumbs',JSON.stringify(vm.crumbsData))
      // 通过 `vm` 访问组件实例
    })
  },
  created(){
    this.currentPage = this.$route.params.page
    this.typeParams = this.$route.params
    // this.currentPage = this.$route.params.page
    // 获取路由数据中的参数
    this.model = this.$route.fullPath.match(/^\/[a-z]+/gi)
    // 获取路由中model的值，再提取出其中的模块来源
    this.getRouterMessage(this.model[0], this.typeParams.type)
    // 获取路由中的重要信息，并设置全局变量用于面包屑以及meta
    var tagStr = ''
    this.leftSideResult.essayEntities.forEach((element, index) => {
      if (index == 0) {
        //获取每页第一篇文章的摘要
        this.metaDesc = element.digest != '' ? element.digest : element.title
        if(this.metaDesc.length >= 120){
          this.metaDesc.slice(0,120);
        }
        // 获取每页第一篇文章的tag
        if(element.tagList&&element.tagList.length != 0){
          // 如果tagList有数据，则取其
          element.tagList.forEach((e,i) =>{
            if(i <= element.tagList.length - 2 ){
              tagStr +=`${e.title},`;
            }else{
              tagStr += `${e.title}`;
            }
          })
        }else if(element.tag&&element.tag != ''){
          // 如果tagList没有数据，则取tag里的
          tagStr = element.tag
        }else{
          // 如果tagList和tag都没有数据，则等于文本
          tagStr = this.metaDesc
        }
        this.tagStr = tagStr
      }
    })
  },
  mounted() {
    // 获取标签列表过来的信息
    if(sessionStorage.getItem('tagInfo') !=''&& sessionStorage.getItem('tagInfo') != null){
      var tagInfo = JSON.parse(sessionStorage.getItem('tagInfo'))
    }
    let tagInfo_title = tagInfo ? tagInfo.title : ''
    let tagInfo_id = tagInfo ? tagInfo.tagId : ''
    // 保存在实例中的，关于tagList页跳转过来的信息
    this.tagName = tagInfo_title
    this.tagId = tagInfo_id

    // 以下假如是在排行列表中的排行点击更多的话，就执行：
    let rankCrumbsFromStronge
    if( sessionStorage.getItem('rankCrumbs')&&  sessionStorage.getItem('rankCrumbs') !=''){
      if(JSON.parse(sessionStorage.getItem('rankCrumbs'))){
         rankCrumbsFromStronge = JSON.parse(sessionStorage.getItem('rankCrumbs'))
      }
    } else {
      rankCrumbsFromStronge = this.$route.params.type
    }
    let pathName
    // if(rankCrumbsFromStronge && rankCrumbsFromStronge.length == 2 ? rankCrumbsFromStronge[1].pathName == '周排行' : rankCrumbsFromStronge[2].pathName == '周排行'){
    //    pathName = 'w'
    // }
    // else if(rankCrumbsFromStronge && rankCrumbsFromStronge.length == 2 ? rankCrumbsFromStronge[1].pathName == '月排行' : rankCrumbsFromStronge[2].pathName == '月排行'){
    //    pathName = 'm'
    // }
    // else{
    //    pathName = 'd'
    // }
    pathName = rankCrumbsFromStronge
    if(this.typeParams.type != pathName){
        rankCrumbsFromStronge && rankCrumbsFromStronge.length == 2 ? rankCrumbsFromStronge[1].pathName = this.typeParamsName : rankCrumbsFromStronge[2].pathName = this.typeParamsName
    }
    // 要是下一页，就取事先保存在sessionStorage里面的crumbs显示
    this.crumbsData = rankCrumbsFromStronge

    this.$nextTick(async () => {
      this.getAdvertise('adverImgBox', '5993946')
      this.getRightSideAdver(
        'imgBox_rankOne',
        '5993947',
        'imgBox_rankTwo',
        '5993948',
        'imgBox_rankThree',
        '5993949',
        'imgBox_rankFour',
        '5993950'
      )
      // 触发广告位方法
      // if (this.$route.params.type && this.$route.params.type == 'w') {
      //   let rankWeekDetail = await $get(webEssayGetWeekendRank, {
      //     pageNo: this.$route.params.page,
      //     size: 10
      //   })
      //   this.leftSideResult = rankWeekDetail.data
      // } else if (this.$route.params.type && this.$route.params.type == 'm') {
      //   let rankMonthDetail = await $get(webEssayGetMonthRank, {
      //     pageNo: this.$route.params.page,
      //     size: 10
      //   })
      //   this.leftSideResult = rankMonthDetail.data
      // } else {
      //   let rankDayDetail = await $get(webEssayGetDayRank, {
      //     pageNo: this.$route.params.page,
      //     size: 10
      //   })
      //   this.leftSideResult = rankDayDetail.data
      // }
      // // 触发pagination子组件中的方法，改变子组件的页码
      // this.$refs.pagination.routLinkCurrentPage()
    })
  },
  watch: {
    currentPage: {
      handler(newPage, oldPage) {
        this.pageChangeGetData(newPage, oldPage)
      }
    }
  }
}
</script>
<style >
/* 面包屑字体图标 */
@font-face {
  font-family: 'crumbs';
  src: url('~assets/fontFace/crumbs.ttf') format('truetype');
  src: url('~assets/fontFace/crumbs.eot'),
    /* IE9 */ url('~assets/fontFace/crumbs.woff') format('woff');
}
.rankPageBox .rankDetail .crumbs {
  margin: 0px 0px 30px 0px;
  position: relative;
}
.rankDetail .crumbsItem a, .rankDetail .crumbsItem .a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  color: rgba(18, 18, 18, 1);
  line-height: 23px;
}
.rankDetail .crumbsItem.active a, .rankDetail .crumbsItem.active .a,
.rankDetail .crumbsItem a:hover, .rankDetail .crumbsItem .a:hover
{
  color: #bd081e;
}
.rankDetail .crumbsItem .crumbsIcon {
  position: relative;
  top: 2px;
}
.rankDetail .crumbsIcon::before {
  content: '\E60C';
  display: inline-block;
  font-family: 'crumbs';
  color: #151515;
  margin: 0px 22px 0px 22px;
  font-size: 18px;
  text-align: bottom;
  transform: rotateZ(0deg);
}
.rankDetail .crumbsIcon.crumbsRedIcon::before {
  color: #bd081e;
}
.rankPageBox {
  width: 100%;
  background: #f6f6f6;
}
.rankPageBox .el-icon-caret-right:before {
  color: #151515;
}
.rankDetail.mainContent {
  width: 1200px;
  margin: 27px auto;
  overflow: hidden;
}
.rankDetail .leftSide {
  width: 790px;
  overflow: hidden;
  float: left;
  margin-right: 29px;
  position: relative;
}
.rankDetail .todayContainer {
  width: 100%;
  height: 280px;
  background: white;
  margin-bottom: 30px;
  position: relative;
}

.rankDetail .todayImg {
  float: left;
  overflow: hidden;
  width: 380px;
  background: #e7e7e7;
  background-image: url('~static/common/default.png');
  background-position: center;
  background-repeat: no-repeat;
  height: 280px;
}
.rankDetail .defaultBox {
  position: relative;
  z-index: 2;
  float: left;
  overflow: hidden;
  width: 380px;
  height: 280px;
  text-align: center;
  line-height: 280px;
  background: #e7e7e7;
}
.rankDetail .todayImg .todayImg_class {
  height: 280px;
  position: absolute;
  z-index: 1;
  width: 380px;
}
.rankDetail .imgDesc {
  display: flex;
  justify-content: center;
  float: left;
  overflow: hidden;
  width: 410px;
  height: 280px;
  position: relative;
}

.rankDetail .imgDesc .imgDesc_Title {
  overflow: hidden;
  height: 29px;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 332px;
  font-size: 26px;
  font-weight: 500;
  position: absolute;
  top: 30px;
  line-height: 24px;
  padding: 1px;
}
.rankDetail .imgDesc .imgDesc_Title .title {
  color: #151515;
}
.rankDetail .imgDesc .imgDesc_Title .redColor {
  color: #bd081e;
}
.rankDetail .imgDesc .title a, .rankDetail .imgDesc .title .a {
  color: rgba(18, 18, 18, 1);
}
.rankDetail .rankNum {
  position: absolute;
  width: 60px;
  z-index: 10;
  height: 66px;
  background-size: cover;
  text-align: center;
  top: 26px;
  right: 48.3%;
  color: white;
  line-height: 66px;
  font-weight: 600;
}
.rankDetail .rankNumTop {
  background-image: url('~static/images/18.png');
}
.rankDetail .rankNumNormal {
  background-image: url('~static/images/19.png');
}
.rankDetail .imgDesc .divider {
  width: 40px;
  height: 5px;
  position: absolute;
  left: 41px;
  top: 85px;
}
.rankDetail .imgDesc .divider div {
  position: absolute;
  width: 30px;
  height: 1px;
  background: rgba(204, 204, 204, 1);
}
.rankDetail .imgDesc .divider div:nth-last-of-type(1) {
  position: absolute;
  top: 2px;
  left: 10px;
}
.rankDetail .imgDesc .detail {
  font-size: 14px;
  font-weight: 400;
  color: rgba(18, 18, 18, 1);
  line-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  position: absolute;
  top: 116px;
  width: 331px;
  height: 45px;
}
.rankDetail .footerBox {
  width: 100%;
  display: flex;
  align-items: center;
  bottom: 37px;
  position: absolute;
}

.rankDetail .footerBox .userName,
.rankDetail .footerBox .label,
.rankDetail .footerBox .todayDivider {
  display: inline-block;
}
.rankDetail .footerBox .messageBox {
  width: 100%;
  margin-left: 10%;
}
.rankDetail .footerBox .userIcon {
  display: inline-block;
  margin-right: 3px;
  margin-bottom: 1px;
  border-radius: 50%;
  opacity: 1;
  width: 25px;
  height: 25px;
}
.rankDetail .footerBox .label {
  margin-left: 20px;
}
.rankDetail .footerBox .todayDivider {
  width: 1px;
  height: 11px;
  background: rgba(177, 177, 177, 1);
  margin-top: 5px;
  margin-left: 20px;
}
.rankDetail .footerBox .createTime {
  position: absolute;
  right: 41px;
  top: 0px;
}
.rankDetail .footerBox span {
  height: 17px;
  line-height: 26px;
  font-size: 14px;
  font-weight: 300;
  color: rgba(177, 177, 177, 1);
}

.rankDetail .rightSide {
  float: right;
  width: 381px;
  overflow: hidden;
  height: 1690px;
  background: #f6f6f6;
  position: relative;
}
.rankDetail .rightSideContent {
  width: 100%;
  height: 1690px;
}
.rankDetail .rightSideContent .advertisesBox {
  width: 100%;
  height: 1240px;
}
.rankDetail .advertisesBox .advertisesItem {
  width: 100%;
  height: 280px;
  margin-bottom: 30px;
  position: relative;
}
.rankDetail .advertisesBox .advertisesItem div[id^='imgBox_'] {
  width: 100%;
  height: 100%;
  background: #e7e7e7;
  background-image: url('~static/common/default.png');
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 30px;
  position: relative;
}
.rankDetail .advertisesBox .advertisesItem .flag {
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: white;
  width: 40px;
  height: 20px;
  border: 1px solid white;
  opacity: 0.5;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.rankDetail .todayRank {
  position: absolute;
  width: 92%;
  background: white;
  padding: 18px 0px 32px 31px;
}

/* 导航条选中之后的效果 */
.rankDetail .navActiveClass {
  background: white !important;
  border: 2px solid #bd081e !important;
}
.rankDetail .todayResult img {
  cursor: pointer;
}
.rankDetail .todayResult span {
  position: absolute;
  display: none;
  width: 37px;
  height: 14px;
  font-size: 18px;
  font-weight: 500;
  color: rgba(254, 254, 254, 1);
}
.rankDetail .todayResult .showPrecent {
  display: block;
}
.rankDetail .paginationShow {
  display: block;
}
.rankDetail .todayResult span:nth-of-type(1) {
  top: -1px;
  left: 48px;
}
.rankDetail .todayResult span:nth-of-type(2) {
  top: -1px;
  left: 170px;
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
