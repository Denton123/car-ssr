<template>
  <div>
    <Header></Header>
    <div class="header-img-wrap">
      <img src="~assets/picture/bloger_header.png" style="width:100%"
      >
    </div>
    <div class="blogers-contain">
      <div class="tag"
        >
        <nuxt-link to="/"
          ><span>首页</span></nuxt-link>
        <span><img src="~static/picture/small_right_black.png"></span>
        <nuxt-link to="/hobby/1"
          ><span>兴趣部落</span></nuxt-link>
        <span><img src="~static/picture/small_tag.png"></span>
        <span style="color:#BE001E;font-weight: 600" >热门博主</span>
      </div>
      <div class="blogger-content">
        <!--// 循环列表-->
        <div class="blogger-list"
          v-for="(item, index) in bloggerLists.userEntities"
          :key="index">
          <div class="blogger-list-left">
            <div class="bloggerList-top">
              <nuxt-link :to="`/Bloger/${item.authorId}/1`"
                style="color: black">
                  <span class="user_wrap" v-if="item.authorPhoto !== ''&& item.authorPhoto !== null"><img :src="concatImage(item.authorPhoto)"
                      :alt="`尖峰咖_${item.authorName}`"
                      ></span>
                  <span class="user_wrap" v-else>
                    <img src="~static/picture/person_default.png" :alt="`尖峰咖_${item.authorName}`">
                  </span>
                  <strong><span class="authorName">{{item.authorName}}</span></strong>
              </nuxt-link>
              <div class="bloggerList-watch"
                >
                <div v-if=" item.follow === false || item.follow ===undefined"
                  class="follow-wrap"
                  @click=" clickWatch(item, index)">
                  <span><strong>关注</strong></span>
                  <img src="~static/picture/watch_red.png"
                    >
                </div>
                <div v-else
                  @click="cancelWatch(item)"
                  class="unFollow-wrap">
                  <span ><strong>已关注</strong></span>
                  <img src="~static/picture/watch_wrap.png"
                    >
                </div>
              </div>
            </div>
            <div class="bloggerList-bottom"
              >
              <div class="blogers-fans" ><span style="color:rgba(153,153,153,1);font-size:14px;">粉丝</span><span >{{item.fansCount}}</span></div>
              <div ><span class="Zhu">关注</span><span style="font-size: 16px">{{item.followCount}}</span></div>
              <div ><span class="article">文章</span><span style="font-size: 16px">{{item.essayCount}}</span></div>
            </div>
          </div>
          <div class="blogger-middle-right">
            <div class="blogger-list-middle">
              <nuxt-link :to="`/${item.arr}/${item.arr!== 'hobbies'?'detail':'hobbiesDetail'}/${item.id}/1`">
                <span>
                  <img :src="concatImage(item.cover)"
                       :alt="`尖峰咖_${item.title}`"
                  >
                </span>
              </nuxt-link>
            </div>
            <div class="blogger-list-right">
              <nuxt-link :to="`/${item.arr}/${item.arr!== 'hobbies'?'detail':'hobbiesDetail'}/${item.id}/1`">
                <span class="bloggerArticle-title" >
                  <span ><strong>{{item.title}}</strong></span>
                </span>
              </nuxt-link>
              <div class="line-wrap-blogers">
                <img src="~static/picture/line.png">
              </div>
              <nuxt-link :to="`/${item.arr}/${item.arr!== 'hobbies'?'detail':'hobbiesDetail'}/${item.id}/1`">
                <span class="description-list">
                  <span class="digist">{{item.digest}}</span>
                </span>
              </nuxt-link>
              <div class="bloggerList-right-bottom">
                <nuxt-link :to="`/Bloger/${item.authorId}/1`"
                >
                  <span class="right-bottom-wrap" v-if="item.authorPhoto !== ''&& item.authorPhoto !== null">
                    <img :src="concatImage(item.authorPhoto)"
                         :alt="`尖峰咖_${item.authorName}`"
                    >
                    <span>{{item.authorName}}</span>
                  </span>
                  <span class="right-bottom-wrap" v-else>
                    <img class="detail-container-left-img" src="~static/picture/icon_head.png" :alt="`尖峰咖_${item.authorName}`">
                    <span>{{item.authorName}}</span>
                  </span>
                </nuxt-link>
                <div class="right-bottom-line">
                  <img src="~static/picture/line_middle.png">
                </div>
                <div class="right-bottom-label">
                  <span>{{item.label}}</span>
                </div>
                <div style="float:right;margin-right:20px;display:inline-block;
">
                  <span>{{changeTime(item)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination-wrap">
        <pagination @pageChange="pageChange"
          :routePage="`${routePage}`"
          :totalPage="totalPage"
          :totalCount="totalCount"
          :toTop={y:0}
          :pageSize=18
          ref="pagination"></pagination>
      </div>
      <div id="blo-adv"
        >
      </div>
    </div>
    <div class="footer-wrap">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import { $get, $post } from '@/http/ajax'
import { instance } from '@/http/instance'
import systemManage from '@/http/photoApi.js'
import pagination from '@/components/pagination.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import { webHobbiesInfo, webHobbiesGetClassList, webUserSelectByPrimaryKey } from '@/http/api'
import Utils from '@/utils/until'

export default {
  name: 'Blogers',
  data() {
    return {
      currentPage: 1,
      metaDescription: null,
      routePage: 1,
      test: null,
      watched: [0, 1, 2, 3, 4, 5],
      watch: [],
      // bloggerLists: [],
      tokenObj: null,
      // 页码的参数
      // totalPage: 0,
      // totalCount: 0,
      // 博主id
      bloggerId: null,
      cookie: null,
      // 登录信息
      userName:null,
      userId:null
    }
  },
  components: {
    Header,
    Footer,
    pagination
  },
  created() {
    console.log('sss', this.totalPage)
    console.log('sss', this.totalCount)
      this.bloggerLists.userEntities.forEach(function(item) {
        if (item.label === '视频') {
          item.arr = 'video'
        } else if (item.label === '今日车闻') {
          item.arr = 'news'
        } else if (item.label === '新能源') {
          item.arr = 'ev'
        } else {
          item.arr = 'hobbies'
        }
      })
      this.metaDescription = this.bloggerLists.userEntities[0].digest && this.bloggerLists.userEntities[0].digest !=''? this.bloggerLists.userEntities[0].digest:''
      // this.bloggerId = this.bloggerLists.userEntities.authorId
      // this.totalPage = this.bloggerLists.totalPageCount
      // this.totalCount = this.bloggerLists.totalBloggerCount
  },
  async asyncData ({req}) {
    let token = Utils.b_getToken(req)
    let totalPage
    let totalCount
    let bloggerLists = await $get('/web/user/getBollgerRank?', 
      {
        pageNo: 1,
        size: 18
      },
      {
        'X-Auth0-Token': token
      }
    )
    bloggerLists.data.userEntities.forEach(function(item) {
      if (item.label === '视频') {
        item.arr = 'video'
      } else if (item.label === '今日车闻') {
        item.arr = 'news'
      } else if (item.label === '新能源') {
        item.arr = 'ev'
      } else {
        item.arr = 'hobbies'
      }
    })
    return {
      totalPage: bloggerLists.data ? bloggerLists.data.totalPageCount : 0,
      totalCount: bloggerLists.data ? bloggerLists.data.totalBloggerCount : 0,
      bloggerLists: bloggerLists.data ? bloggerLists.data : [],
    }
  },
  mounted() {
    // 取token
    this.routePage = this.$route.params.page
    this.currentPage = this.$route.params.page
    if (
      localStorage.getItem('userMsg') !== '' &&
      localStorage.getItem('userMsg') !== null
    ) {
      this.tokenObj = localStorage.getItem('userMsg') &&
      JSON.parse(localStorage.getItem('userMsg')).token !== '' ? JSON.parse(localStorage.getItem('userMsg')).token :''
    } else if (this.cookie !== '') {
      this.cookie = this.getCookie('token')
      this.tokenObj = this.cookie
    }
    // if (localStorage.getItem('userMsg')) {
    //   this.tokenObj = JSON.parse(localStorage.getItem('userMsg'))
    // }
    // 获取token
    // console.log('token', this.tokenObj)
    if (this.tokenObj === null) {
      this.tokenObj = {}
    }
    // 路由分页
    // this.getBlogersList(this.routePage)
    this.$refs.pagination.routLinkCurrentPage()
    // adv植入
    let adv = document.getElementById('blo-adv')
    // let adv = '_' + Math.random().toString(36).slice(2)
    if (adv) {
      ;(window.slotbydup = window.slotbydup || []).push({
        id: '5993945',
        container: adv,
        size: '1200,200',
        display: 'inlay-fix',
        async: true
      })
    }
    this.getUse()
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
    changeTime(str) {
      return str.create_time.slice(0, 10)
    },
    async getBlogersList(page = 1) {
      let obj = { 'X-Auth0-Token': this.tokenObj }
      // 获取二级导航的数据——hobbies的分类，id
      let itemL = await $get(
        '/web/user/getBollgerRank?',
        {
          pageNo: page,
          size: 18
        },
        obj
      )
      this.bloggerLists = itemL.data


    },

    concatImage(item) {
      return systemManage.getApi(item)
    },
    getUse() {
      $get(
        webUserSelectByPrimaryKey,
        {},
        {
          'X-Auth0-Token':
          this.tokenObj
        }
      ).then(res => {
        // this.userName = res.data.des.user.account && res.data.des.user.account != '' ? res.data.des.user.account : ''
        this.userId = res.data.des.user&& res.data.des.user!= '' ? res.data.des.user.id : ''
      })
    },
    async watchBloger() {
      let obj = { 'X-Auth0-Token': this.tokenObj }
      let urlParam = new URLSearchParams()
      urlParam.append('type', 'follow')
      urlParam.append('bloggerId', this.bloggerId)
      await $post('/web/user/clickCare?', urlParam, obj)
      this.getBlogersList(this.currentPage)
      this.$message({
        type: 'success',
        message: '关注成功!'
      })
    },
    clickWatch(item, index) {
      console.log(this.bloggerLists.login, 'login')
      if (this.userId !== item.authorId) {
        let button = document.getElementsByClassName('watch')[0]
        this.bloggerId = item.authorId
        if (this.bloggerLists.login === false) {
          this.$message('您还未登录，请登录！')
          // console.log('hhh', this.bloggerId)
          // let x = window.confirm('您还未登录，请登录！')
          // if (x === true) {
          //   this.$router.push({ path: `/login` })
            // window.location.href = 'http://165.qiweioa.cn/login/'
          // }
        } else {
          item.follow = true
          this.watchBloger()
        }
      } else {
        // this.$message({
        //   type: 'warning',
        //   message: '用户不能关注自己'
        // })
        this.$message('用户不能关注自己')
      }
    },
    async cancelWatch(item) {
      item.follow = false
      this.bloggerId = item.authorId
      let obj = { 'X-Auth0-Token': this.tokenObj }
      let urlParam = new URLSearchParams()
      urlParam.append('type', 'cancel')
      urlParam.append('bloggerId', this.bloggerId)
      let itemL = await $post('/web/user/clickCare?', urlParam, obj)
      this.getBlogersList(this.currentPage)
      this.$message({
        type: 'success',
        message: '取消成功!'
      })
    },
    pageChange(page) {
      this.$router.push({
        path: `/blogers/${page}`
      })
      this.currentPage = page
      this.getBlogersList(page)
    }
  }
}
</script>
<style>
.html {
  background: #f6f6f6;
}
.blogers-contain {
  box-sizing: border-box;
  height: auto !important;
  width: 1200px;
  min-height: 200px !important;
  background-color: #f6f6f6;
  clear: both;
  align-items: center;
  margin: 0 auto;
}
.tag {
  margin-top: 24px;
  margin-bottom: 30px;
  text-align: left;
  color: black;
}
.tag span {
  margin-right: 20px;
  font-size: 14px;
  color: black;
}
/*.tag span :last-child {*/
  /*color: red;*/
/*}*/
.blogger-list {
  font-size:0;
  width: 1205px;
  height: 280px;
  background-color: white;
  margin-bottom: 30px;
}
.blogger-list-left {
  width: 410px;
  height: 280px;
  display: inline-block;
  vertical-align: top;
  margin-top: -3px;
}
.bloggerList-top {
  text-align: center;
}
.watch {
  box-sizing: border-box;
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  width: 64px;
  height: 30px;
  position: absolute;
  top: 5px;
  left: 170px;
}
.bloggerList-bottom {
  margin-left: 72px;
  margin-top: 25px;text-align: center;overflow: hidden
}
.blogers-fans {
  margin-left:28px
}
.blogers-fans span {
  font-size: 16px;
}
.Zhu {
  color:rgba(153,153,153,1);
  font-size: 14px;
}
.article {
  color:rgba(153,153,153,1);
  font-size: 14px;
}
.bloggerList-bottom div span {
  display: block;
  line-height: 20px;
  font-weight: 600
}
.bloggerList-bottom div {
  float: left;
  margin-right: 60px;
  font-size: 12px;
}
.user_wrap {
  display: block;
  margin-top: 30px;
  margin-left: 155px;
  width: 100px;
  height: 100px;
}
.authorName {
  display:inline-block;
  margin-top: 11px;
  font-weight: 600;
  font-size:16px;
}
.user_wrap img {
  border-radius: 50%;
  width: 100px;
  height:100px;
}
.bloggerList-watch {
  margin-top: 14px;
  position:relative
}
.blogger-middle-right {
  font-size:0;
  display: inline-block;
  width: 790px;
  height: 280px;
}
.blogger-middle-right:hover .bloggerArticle-title {
  color:#BE001E;
}
.blogger-list-middle {
  font-size:0;
  width: 380px;
  height: 280px;
  display: inline-block;
  vertical-align: top;
}

.blogger-list-middle img {

  display: inline-block;
  width:380px;height: 280px;color:black
}
.follow-wrap {
  position: relative; cursor: pointer;
}
.follow-wrap span {
  color: white;position: absolute;left: 187px;top:5px;font-size: 14px;font-weight: 600
}
.follow-wrap img {
  width: 64px;height: 30px
}
.unFollow-wrap {
  position: relative;cursor: pointer;
}
.unFollow-wrap span {
  color:#AAAAAA;position: absolute;left: 185px;top:6px;font-size: 12px;font-weight: 600
}
.unFollow-wrap img {
  width: 70px;height: 30px
}
.blogger-list-right {
  box-sizing: border-box;
  padding: 30px 38px 30px 40px;
  width: 410px;
  height: 280px;
  display: inline-block;
  vertical-align: top;
  color: black;
}
.blogger-list-right a {
    color:black
}
.blogger-list-middle:hover .blogger-list-right .bloggerArticle-title {
  color:#BE001E;
}

.blogger-list-right:hover .bloggerArticle-title {
  display:inline-block;
  color:#BE001E;
}
.bloggerArticle-title {
  display: inline-block;
  overflow: hidden;height: 35px;
 }
.bloggerArticle-title span{
  font-size: 26px;letter-spacing: 2px;font-weight: 500
  }
.line-wrap-blogers {
margin-top: 20px;
}
/*.description-list span {*/
/*display: inline-block;*/
/*font-size: 14px;*/
/*!*width: 331px;*!*/
/*!*height: 60px;*!*/
/*!*overflow:hidden;*!*/
/*!*text-overflow:ellipsis;*!*/
/*!*display:-webkit-box;*!*/
/*!*-webkit-box-orient:vertical;*!*/
/*!*-webkit-line-clamp:2;*!*/
/*}*/
.description-list {
  display:inline-block;
  margin-top: 20px;
  font-weight: 400;
  height: 44px;
  width: 300px;
}
.digist {
  display:inline-block;
  color: black;
  height: 44px;
  width: 310px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 24px;
}
.bloggerList-right-bottom {
  height: 25px;
  width: 331px;
  margin-top: 70px;
  font-size: 12px;
  color: #b1b1b1;
}
.bloggerList-right-bottom a {
  color: red;
}
.bloggerList-right-bottom div {
  float: left;
}
  .right-bottom-wrap {
    display:inline-block;
    float: left;
    color: #b1b1b1;
  }
  .right-bottom-wrap img {
    width:25px;height: 25px;margin-right: 5px;margin-top:-4px;border-radius: 50%
  }
  .right-bottom-line {
    display:inline-block;
    margin-right: 19px;
    margin-left:19px;
  }
  .right-bottom-label {
    width:70px;overflow: hidden
  }
  .pagination-wrap {
    margin-bottom: 50px;margin-top: 36px
  }
  #blo-adv {
    margin:0 auto;width:1200px;height: 200px;
  }
  .footer-wrap {
    margin-top: 20px
  }
</style>
