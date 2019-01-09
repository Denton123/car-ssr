<template>
  <div id="bloger">
    <Header></Header>
    <div class="person_container">
      <div class="person_theme">
        <div class="person_wrap">
          <div class="person_head">
            <img v-if="userData.blogger.photo"
                 :src="formatPic(userData.blogger.photo)"
                 alt="" :onerror="defaultImg">
          </div>
          <div class="person_name">
            {{userData.blogger.loginName}}
          </div>
          <div class="bloggerList-watch"
               style="margin-top: -4px;
                             position:relative">
            <div v-if=" userData.blogger.fllowornot === false || userData.blogger.fllowornot ===undefined"
                 style="position: relative; cursor: pointer"
                 @click=" clickWatch()">
              <span style="color: white;position: absolute;left: 12px;top:5px;font-size: 14px;font-weight: 600"><strong>关注</strong></span>
              <img src="/static/images/watch_red.png"
                   style="width: 64px;height: 30px
                                ">
            </div>
            <div v-else
                 style="position: relative;cursor: pointer"
                 @click="cancelWatch()">
              <span style="color:#AAAAAA;position: absolute;left: 12px;top:6px;font-size: 12px;font-weight: 600"><strong>已关注</strong></span>
              <img src="/static/images/watch_wrap.png"
                   style="width: 70px;height: 30px
                               ">
            </div>
          </div>
          <div class="person_msg">
            <div class="article">
              <span>文章</span>
              <span>{{userData.essayCount}}</span>
            </div>
            <div class="concern">
              <span>关注</span>
              <span>{{userData.followCount}}</span>
            </div>
            <div class="fans">
              <span>粉丝</span>
              <span>{{userData.fansCount}}</span>
            </div>
            <div class="integral">
              <span>积分</span>
              <span>{{userData.totalIntegral}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bloger_content">
      <div class="bloger_title">
        <img src="/static/images/tagList_nav.png"
             alt="">共上传<span>{{blogerListDataSize}}篇</span>文章/兴趣部落
      </div>
      <div class="bloger_list">
        <ul class="clearfix">
          <li v-for="(item, index) in blogerListData"
              :key="index">
            <router-link :to="`/${item.title !== 'hobbies'? item.classLabel.toLowerCase() : 'hobbies'}/${item.title !== 'hobbies' ? 'detail' : 'hobbiesDetail'}/${item.id}/1`">
              <div class="bloger_list">
                <div class="bloger_list_top">
                  <img :src="formatPic(item.photo)"
                       alt="">
                  <div class="bloger_mark" v-if="item.title == 'hobbies'">兴趣部落</div>
                  <div class="bloger_mark" v-else>{{item.className}}</div>
                </div>
                <div class="bloger_list_bottom">
                  <p class="title_big" v-if="item.title == 'hobbies'">兴趣部落</p>
                  <p class="title_big" v-else>{{item.title}}</p>
                  <p class="title_samall">{{ item.digest }}</p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <pagination class="pagination"
                    v-if="blogerListData && blogerListData.length > 0"
                    @pageChange="pageChange"
                    :totalCount="blogerData.totalCount"
                    :pageSise="2"
                    :toTop="{x:0, y: 400}"
                    :totalPage="blogerData.totalPage" />
      </div>
      <div class="advertise_wrapper">
        <div id="other_footer_id"></div>
        <div class="ad_des">广告</div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import Pagination from '@/components/pagination.vue'
  import { $get, $post } from '@/http/ajax'
  import {
    webBologerlist,
    webUserSelectByPrimaryKey,
    webUserBloggerItem
  } from '@/http/api'

  import systemManage from '@/http/photoApi.js'
  export default {
    name: 'Bloger',
    data() {
      return {
        bloggerId: '1',
        blogerListDataSize: '0',
        blogerData: [],
        blogerListData: [],
        userData: {
          blogger: {
            photo: '',
            loginName: ''
          },
          essayCount: '',
          followCount: '',
          fansCount: '',
          totalIntegral: ''
        },
        defaultImg: "this.src='/static/common/default.png'"
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
      // 跳转到兴趣部落文章详情页
      toHobbiesDetail(id) {
        this.$router.push({ path: `/hobbies/hobbiesDetail/${id}/1` })
      },
      // 图片
      formatPic(item) {
        return systemManage.getApi(item)
      },
      // 页码
      pageChange(page) {
        console.log(page + 'page')
        this.blogerList(page)
      },
      // 获取信息列表
      async blogerList(page = 1) {
        let id = `${this.$route.params.id}`
        let res = await $get(webBologerlist, {
          bloggerId: id,
          limit: '9',
          page: page
        })
        this.blogerListData = res.data.list
        console.log(this.blogerListData)
        this.blogerData = res.data
        this.blogerListDataSize = res.data.totalCount
      },
      // 获取个人中心
      getUserInfo() {
        let tokenObj = {
          'X-Auth0-Token': this.cookie !== '' ? this.cookie : this.tokenObj.token
        }
        let id = `${this.$route.params.id}`
        $get(webUserBloggerItem, { bloggerId: id }, tokenObj).then(res => {
          this.userData = res.data
          console.log(this.userData)
          this.editForm = this.userData.user
        })
      },
      async watchBloger() {
        let obj = {
          'X-Auth0-Token': this.cookie !== '' ? this.cookie : this.tokenObj.token
        }
        let urlParam = new URLSearchParams()
        urlParam.append('type', 'follow')
        urlParam.append('bloggerId', this.bloggerId)
        let res = await $post('/web/user/clickCare?', urlParam, obj)
        if (res.data.code === 2) {
          this.$message({
            type: 'success',
            message: '关注成功!'
          })
          this.getUserInfo()
        } else if (res.data.code === 0) {
          this.$message({
            type: 'warning',
            message: res.data.str
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.data.str
          })
        }
      },
      clickWatch() {
        let button = document.getElementsByClassName('watch')[0]
        let id = `${this.$route.params.id}`
        this.bloggerId = id
        this.watchBloger()
      },
      async cancelWatch() {
        let id = `${this.$route.params.id}`
        this.bloggerId = id
        let obj = {
          'X-Auth0-Token': this.cookie !== '' ? this.cookie : this.tokenObj.token
        }
        let urlParam = new URLSearchParams()
        urlParam.append('type', 'cancel')
        urlParam.append('bloggerId', this.bloggerId)
        let res = await $post('/web/user/clickCare?', urlParam, obj)
        if (res.data.code === 3) {
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
          this.getUserInfo()
        } else if (res.data.code === 0) {
          this.$message({
            type: 'warning',
            message: res.data.str
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.data.str
          })
        }
        this.getUserInfo()
      },
      createAd() {
        ;(window.slotbydup = window.slotbydup || []).push({
          id: '5993946',
          container: 'other_footer_id',
          size: '380,280',
          display: 'inlay-fix',
          async: true
        })
      }
    },
    mounted() {
      this.createAd()
      // 取token
      this.cookie = this.getCookie('token')
      this.routePage = this.$route.params.page
      this.currentPage = this.$route.params.page
      if (this.cookie === '') {
        this.tokenObj = JSON.parse(localStorage.getItem('userMsg'))
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
      this.blogerList(this.routePage)
      this.$nextTick(async () => {
        this.getUserInfo()
        this.blogerList()
      })
    },
    components: {
      Header,
      Footer,
      Pagination
    }
  }
</script>
<style lang="less">
  /*广告*/
  .advertise_wrapper {
    position: relative;
    margin: 20px 0;
    width: 100%;
    height: 200px;
    background-color: #e7e7e7;
    background-image: url('~static/images/defaultLogo.png');
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
  .person_theme {
    width: 100%;
    height: 400px;
    background: url('~static/images/person_head.png') no-repeat;
    background-size: 100% 100%;
  }
  .person_container {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
  }
  .person_wrap {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .person_head {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: #fff;
    margin: 30px auto 15px;
  }
  .person_head img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }
  .person_name {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 12px;
  }
  .person_approve {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
    -webkit-transform: skew(10deg);
    -moz-transform: skew(10deg);
    -o-transform: skew(10deg);
    background: #be001e;
    font-size: 14px;
    color: #fff;
    font-style: italic;
  }
  .person_msg {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
  }
  .person_msg div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .person_msg div span {
    display: inline-block;
    color: #fff;
    margin: 5px 0;
  }
  .person_msg div span:first-child {
    font-size: 16px;
  }
  .person_msg div span:last-child {
    font-size: 18px;
  }
  .bloger_content {
    width: 1200px;
    margin: 0 auto;
  }
  #bloger {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
  }
  .bloger_title {
    color: #121212;
    font-size: 24px;
    margin: 40px 0 30px;
    font-weight: bold;
    span {
      color: #be001e;
    }
    img {
      width: 8px;
      height: 27px;
      margin-right: 12px;
      vertical-align: sub;
    }
  }
  .bloger_list {
    ul {
      width: 100%;
      margin-bottom: 20px;
      li {
        float: left;
        width: 31.3333%;
        margin: 0 1% 1% 1%;
        cursor: pointer;
        .bloger_list_top {
          width: 100%;
          height: 280px;
          background-color: #e7e7e7;
          background-image: url('~static/images/defaultLogo.png');
          background-repeat: no-repeat;
          background-position: center;
          position: relative;
          img {
            width: 100%;
            height: 280px;
          }
          .bloger_mark {
            position: absolute;
            top: 10px;
            left: 10px;
            background: url('~static/images/bloger_title_bg.png') no-repeat;
            background-size: 100% 100%;
            width: auto;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #121212;
            padding: 0 18px 0 11px;
            font-weight: bold;
          }
        }
        .bloger_list_bottom {
          background: #fff;
          padding-top: 20px;
          .title_big {
            display: inline-block;
            box-sizing: border-box;
            border-left: 2px solid #e4e4e4;
            padding-left: 15px;
            color: #000;
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 98%;
            margin-bottom: 0;
            &:hover {
              border-color: #be001e;
              color: #be001e;
            }
          }
          .title_samall {
            font-size: 14px;
            line-height: 28px;
            color: #5b5b5b;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 92%;
            text-align: left;
            margin: 0px auto;
            padding: 8px 0 15px 0;
          }
        }
      }
    }
  }
</style>
