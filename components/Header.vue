<template>
  <div class="car_header">
    <div class="car_header_wrap">
      <div class="car_header_logo">
        <router-link to="/">
          <img src="~static/header/pc_logo.png" alt="尖锋咖">
        </router-link>
      </div>
      <div class="car_header_banner">
        <ul>
          <li v-for="(item, index) in header_banner_data"
            @click="handleClick(item.name)"
            class="car_header_banner_li"
            :key="index"
            @mouseenter="headerTagHover(item.name)"
            @mouseout="headerTagOut(item.name)">
            <a :href="item.to"
              :class="{'fontWeight': item.name === activeName}">
              <strong>{{item.title}}</strong>
              <span class="headerSubScript"
                v-if="item.name === activeName || item.name === hoverName">
                <span></span>
              </span>
            </a>

          </li>
        </ul>
      </div>
      <div class="car_header_right">
        <div class="car_header_banner_icon">

          <ul>
            <li class="car_header_banner_icon_search"
              @click="showSearch()"
              @mouseenter="showSearch()"
              @mouseleave="hideSearch()">
              <a href="javascript:void(0);">
                <i :class="{'hasSearchHover': isShowSearch}"></i>
              </a>
              <!-- 搜索框 -->
              <div class="car_header_banner_search_input">
                <input type="text"
                  name=""
                  v-if="isShowSearch"
                  placeholder="搜索"
                  v-model="searchContent"
                  @keypress="search">
              </div>
              <i class="header_input_search"
                v-if="isShowSearch"
                @click="toSearch" />
            </li>
            <li class="car_header_banner_icon_upload"
              @click="toPublishEssay()"
              @mouseenter="hasToEssay"
              @mouseleave="hideToEssay">
                <a href="javascript:void(0);">
                  <i></i>
                </a>
                <div class="toEssayWrap" v-if="ShowToEssay" @click="toEssay">
                  <span class="toEssay">
                  上传内容
                </span>
                </div>
            </li>
            <li class="car_header_banner_icon_phone"
              @mouseenter="showActive(3)"
              @mouseleave="showActive(0)">
              <a href="javascript:void(0);">
                <i></i>
              </a>
              <div class="phone_code" v-if="active == 3">
                <div class="triangle">
                  <span></span>
                </div>
                <span class="codeDes">扫码浏览手机端</span>
                <img src="~static/detail/code.jpg">
              </div>
            </li>
            <li class="car_header_banner_icon_wechat"
              @mouseenter="showActive(4)"
              @mouseleave="showActive(0)">
              <a href="javascript:void(0);">
                <i></i>
              </a>
              <div class="wechat_code" v-if="active == 4">
                <div class="triangle">
                  <span></span>
                </div>
                <span class="codeDes">扫码关注公众号</span>
                <img src="~static/detail/code.jpg">
              </div>
            </li>
          </ul>
        </div>
        <div class="car_header_login_registry">

          <div v-if=" loginFlag !==2">
            <el-menu class="el-menu-demo"
              mode="horizontal">
              <el-submenu index="2">
                <template slot="title">
                  <div class="car_header_userInfo"
                    @click="toPerson">
                    <!-- <router-link to="/person/myEssay/1"> -->
                    <img v-if="user.photo && user.photo!==''"
                      :src="formatPic(user.photo)"
                      :alt="user.loginName">
                    <img v-else
                      src="~static/detail/detail_user.png"
                      :alt="user.loginName">
                    <!-- </router-link> -->
                  </div>
                  <router-link to="/person/myEssay/1">
                    <span class="car_header_user_name">{{user.loginName}}</span>
                  </router-link>

                </template>
                <el-menu-item index="2-1"
                  @click="logout">退出登录</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          <div v-else
            class="car_header_login_registry_operate"
            style="position: relative">
            <a href="javascript:;"
              @click="toAnotherRouter('login')">
              <span>登录</span>
            </a>
            <span class="desperate">|</span>
            <a href="javascript:;"
              @click="toAnotherRouter('register')">
              <span>注册</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { webUserSelectByPrimaryKey, webLogout } from '@/http/api'
import { $get, $post } from '@/http/ajax'
import systemManage from '@/http/photoApi.js'
import { setTimeout } from 'timers'
// import { constants } from 'http2'
export default {
  name: 'Header',
  data() {
    return {
      active: 0,
      activeName: 'news',
      hoverName: '',
      msg: 'Welcome to Your Vue.js App',
      header_banner_data: [
        {
          title: '今日车闻',
          id: 0,
          to: '/news/1',
          name: 'news-page'
        },
        {
          title: '新能源',
          id: 1,
          to: '/ev/1',
          name: 'ev-page'
        },
        {
          title: '兴趣部落',
          id: 2,
          to: '/hobby/1',
          name: 'hobby-page'
        },
        {
          title: '视频',
          id: 3,
          to: '/video/1',
          name: 'video-page'
        }
      ],
      isShowSearch: false,
      hasLoginIn: false,
      searchContent: '',
      user: {
        photo: '',
        loginName: ''
      },
      cookie: '',
      tokenObj: {},
      loginFlag: 2,
      ShowToEssay: false
    }
  },
  methods: {
    showActive(index) {
      // console.log(index)
      this.active = index
      // console.log(this.active, 'active')
    },
    handleClick(name) {
      this.activeName = name
      this.navStatus = name
      // console.log(this.active, 'active')
    },
    showSearch() {
      this.isShowSearch = true
    },
    hideSearch() {
      this.isShowSearch = false
    },
    toAnotherRouter(name) {
      this.operateActiveName = name
      this.$router.push({ name })
    },
    toPerson() {
      this.$router.push({
        path: '/person/myEssay/1'
      })
      // this.toAnotherRouter('resetPassword')
    },
    getUserInfo() {
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      $get(webUserSelectByPrimaryKey,
        {},
        {
          'X-Auth0-Token':
            this.cookie !== '' ? this.cookie : this.tokenObj.token
        }
      ).then(res => {
        if (res.data.code == 0) {
          this.user = res.data.des.user
          this.loginFlag = res.data.code
        }
      })
    },
    formatPic(item) {
      if(item.indexOf('http:') >= 0 || item.indexOf('/image') >= 0){
        return item
      }
      return systemManage.getApi(item)
    },
    // 跳转到搜索页
    search(event) {
      if (event.keyCode === 13) {
        if (this.searchContent !== '') {
          this.$router.push({
            path: `/search/1/${this.searchContent}`
          })
        }
      }
    },
    toSearch() {
      if (this.searchContent !== '' && this.isShowSearch) {
        this.$router.push({
          path: `/search/1/${this.searchContent}`
        })
      } else {
        this.$message('请输入内容')
      }
    },
    // 退出登录
    logout() {
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      // console.log('res')
      $post(
        webLogout,
        {},
        {
          'X-Auth0-Token':
            this.cookie !== '' ? this.cookie : this.tokenObj.token
        }
      ).then(res => {
        // console.log(res)
        if (res.data.code == 0) {
          localStorage.removeItem('userMsg')
          this.deleteCookie('token')
          this.toAnotherRouter('login')
        } else {
          this.$message('该登录失效')

          this.toAnotherRouter('login')
        }
      })
    },
    // 获取cookie
    getCookie(cname) {
      // console.log(cname, 'cookie')
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
      }
      return ''
    },
    deleteCookie(name) {
      var date = new Date()
      date.setTime(date.getTime() - 10000)
      document.cookie = name + '=v; expires=' + date.toGMTString() + ';path=/'
    },
    toPublishEssay() {
      if (this.user.idCard !== '') {
        // console.log('token==============')
        this.$router.push({
          path: '/person/myEssay/1'
        })
        // this.toAnotherRouter('myEssay')
        // this.toAnotherRouter('publishEssay')
      } else {
        this.$message('请先实名验证身份证')
        setTimeout(() => {
          this.toAnotherRouter('person-index-editInfo')
        }, 1500)
      }
    },
    headerTagHover(name) {
      this.hoverName = name
    },
    headerTagOut() {
      this.hoverName = this.activeName
    },
    hasToEssay() {
      this.ShowToEssay = true
    },
    hideToEssay() {
      this.ShowToEssay = false
    },
    toEssay() {
      this.$router.push({
        path: '/person/myEssay/1'
      })
    }
  },
  mounted() {
    this.cookie = this.getCookie('token')
    let route = this.$route
    if (route.params.model) {
      this.activeName = route.params.model
    } else {
      this.activeName = route.name
    }

    this.tokenObj = localStorage.getItem('userMsg') &&  localStorage.getItem('userMsg') != ''?  JSON.parse(localStorage.getItem('userMsg')) : {}
    if (this.tokenObj == null) {
      this.tokenObj = {}
    }
    this.getUserInfo()
    if (this.tokenObj.token !== undefined || this.cookie !== '') {
      this.hasLoginIn = true
    }
    // console.log(this.activeName)
    $('#el-tooltip-8687').click(function(){
      console.log('ppppppppppppppppppppppp')
    })
  }
}
</script>

<style>
.nav img {
  display: block;
  margin: 0 auto;
  width: 320px;
  height: 130px;
}
.nav li {
  list-style: none;
}

.car_header {
  width: 100%;
  height: 64px;
  background: rgba(0, 0, 0, 1);
}
.car_header_wrap {
  margin: 0 auto;
  width: 1200px;
  height: inherit;
  /*overflow: hidden;*/
  position: relative;
}
.car_header_logo {
  width: 146px;
  height: inherit;
  display: inline-block;
  float: left;
  line-height: 64px;
  text-align: center;
}
/* .car_header_logo img {
  width: 140px;
  height: 50px;
} */
.car_header_banner {
  height: 64px;
  display: inline-block;
  float: left;
  margin-left: 10px;
  overflow: hidden;
}
.car_header_banner ul,
.car_header_banner_icon ul {
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 64px;
}
.footer_tab ul,
.footer_code ul {
  list-style: none;
  margin: 0;
  padding: 0;
  /*padding-left: 41px;*/
}
.car_header_banner_icon ul {
  /* margin-right: 101px; */
}
.car_header_banner ul {
  margin-left: 5px;
  /*text-align: left;*/
}
.car_header_banner_li {
  /* display: inline-block; */
  float: left;
}
.car_header_banner ul li {
  /* width: 70px; */
  height: 64px;
  position: relative;
  /* padding-bottom: 22px; */
  /*text-align: left;*/
}
/* .car_header_banner ul li a span {
  display: inline-block;
  height: 6px;
  background: #be001e;
  width: calc(100% - 16px);
  position: absolute;
  bottom: 0;
} */
.car_header_banner ul li:hover a {
  font-weight: bold;
}
.car_header_banner ul li:hover {
  /* background: url('/static/header/subscript.png') no-repeat; */
  /* border-bottom: 2px solid red; */
  background-position: bottom left;
}
.car_header_banner ul li,
.car_header_banner_icon ul li {
  /* display: inline; */
  /* margin: 0 15px; */
  cursor: pointer;
  /* padding-right: 30px; */
  margin-left: 30px;
}
.car_header_banner ul li a {
  /* position: relative; */
  /* width: 70px; */
  display: inline-block;
  color: rgba(224, 224, 224, 1);
  font-size: 16px;
  font-weight: 300;
  /* font-family: SourceHanSansCN-Light; */
  /* line-height: 32px; */
  text-decoration: none;
  /* height: 49px; */
  /* border-bottom: 6px solid red; */
  /* background: url('/static/header/header_side.png') no-repeat right bottom; */
}
.car_header_banner ul li a:last-child {
  /* width: 70px; */
}
.car_header_banner_icon {
  display: inline-block;
  float: left;
  margin-right: 23px;
}
.car_header_banner_icon ul li {
  width: 40px;
  height: 40px;
  position: relative;
  margin: 0 30px;
}
.car_header_banner_icon ul {
  margin-left: 5px;
}
.car_header_banner_icon ul li a {
  width: 40px;
  height: 40px;
  /*border: 1px dashed #fff;*/
  display: inline-block;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  left: 50%;
  margin-left: -20px;
}
.car_header_banner_icon ul li a i {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.car_header_banner_icon_search {
  position: relative;
}
.car_header_banner_icon_search a i {
  background: url('~static/header/nav_search.png');
}
.car_header_banner_icon_search a i:hover {
  background-image: url('~static/header/nav_search_hover.png');
}
.header_input_search {
  background-image: url('~static/header/nav_search_hover.png') !important;
  width: 40px;
  height: 40px;
  display: inline-block;
  position: absolute;
}
.hasSearchHover {
  background-image: url('~static/header/nav_search_hover.png') !important;
}
.car_header_banner_icon_upload a i {
  background: url('~static/header/nav_upload.png');
}
.car_header_banner_icon_upload a i:hover {
  background-image: url('~static/header/nav_upload_hover.png');
}
.car_header_banner_icon_phone a i {
  background: url('~static/header/nav_phone.png');
}
.car_header_banner_icon_phone a i:hover {
  background-image: url('~static/header/nav_phone_hover.png');
}
.car_header_banner_icon_wechat a i {
  background: url('~static/header/nav_wechat.png');
}
.car_header_banner_icon_wechat a i:hover {
  background-image: url('~static/header/nav_wechat_hover.png');
}
.car_header_banner_search_input {
  width: 300px;
  height: 42px;
  position: absolute;
  right: -4px;
  top: -24px;
}
.car_header_banner_search_input input {
  width: 300px;
  height: 42px;
  padding-left: 17px;
  border-radius: 40px;
  outline: none;
  border: 0px;
  font-size: 16px;
}
.header_input_search {
  position: absolute;
  right: -16px;
  top: -11px;
}
.car_header_mr_first {
  right: 321px;
}
.car_header_mr_second {
  right: 328px;
}
.car_header_login_registry {
  /* position: absolute; */
  /* right: 0px; */
  /* width: 98px; */
  height: 19px;
  display: inline-block;
  float: right;
}
.car_header_login_registry .car_header_login_registry_operate a {
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
  font-size: 16px;
  display: inline-block;
  line-height: 64px;
}
.car_header_login_registry .car_header_login_registry_operate a:hover {
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
  background: url('~static/header/subscript.png') no-repeat;
  background-position: bottom right;
}
.desperate {
  color: rgba(255, 255, 255, 1);
  padding: 0 5px;
}
.hasSubScript {
  background: url('~static/header/subscript.png') no-repeat;
  background-position: bottom left;
}
.car_header .operateHasClick {
  background: url('~static/header/subscript.png') no-repeat;
  background-position: bottom right;
}
.car_header .phone_code {
  width: 130px;
  height: 130px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999999999;
  position: absolute;
  top: 52px;
  text-align: center;
  right: -72px;
}
.car_header .phone_code img {
  display: inline-block;
  width: 100px !important;
  /* height: 100px !important; */
  /* margin: 15px auto; */
  position: relative;
  top: -47px;
}
.car_header .codeDes{
  padding: 0;
  position: relative;
  top: -23px;
  font-size: 12px;
  color: #fff;
}
.wechat_code {
  width: 130px;
  height: 130px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999999999;
  position: absolute;
  top: 52px;
  text-align: center;
  right: -72px;
}
.car_header .wechat_code img {
  display: inline-block;
  width: 100px !important;
  /* height: 100px !important; */
  /* margin: 15px auto; */
  /* padding: 15px; */
  position: relative;
  top: -47px;
}
.triangle {
  width: 0;
  height: 0;
  border-width: 0 8px 8px;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.3); /*透明 透明  灰*/
  /*margin:40px auto;*/
  position: absolute;
  top: -8px;
  left: 53px;
}
.car_header_userInfo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  display: inline-block;
  /* margin-top: 10px; */
}
.car_header_userInfo img {
  width: 100%;
  height: 100%;
  /* position: absolute; */
  /* left: 0; */
  margin-top: -23px;
}
.mrfirst {
  margin-right: 101px !important;
}
.mrsecond {
  margin-right: 57px !important;
}
.fontWeight {
  font-weight: bold !important;
}
.logout {
  position: absolute;
  width: 100px;
  height: 40px;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  top: 50px;
  border-radius: 1px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  z-index: 99999;
}
.car_header .el-menu--horizontal > .el-submenu .el-submenu__title {
  /* width: 40px; */
  /* height: 40px; */
}
.car_header .el-menu--horizontal > .el-submenu .el-submenu__title a {
  /* width: 40px;
  height: 40px;
  display: inline-block;
  position: absolute;
  left: -24px; */
}
.car_header
  .el-menu--horizontal
  > .el-submenu
  .el-submenu__title
  .router-link-active {
  width: 40px;
  height: 40px;
  /* display: inline-block; */
  /* position: absolute; */
  /* left: 0; */
}
.car_header .el-menu i {
  display: none !important;
  /* margin-left: 17px !important; */
}
.car_header .el-menu {
  background: none;
}
.car_header .el-menu.el-menu--horizontal {
  border-bottom: none;
}
.car_header_user_name {
  display: inline-block;
  color: #fff;
}
.car_header_login_registry_operate .loginOn {
  /*background-image: url("../assets/header/subscript.png");*/
}
.car_header .el-menu--horizontal > .el-submenu .el-submenu__title:hover,
.el-submenu__title:focus,
.el-submenu__title:focus,
.el-submenu__title:hover {
  background-color: transparent !important;
}
.car_header_right {
  float: right;
}
.car_header .el-submenu__title {
  padding: 0;
}
.car_header .el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 100px;
  text-align: center;
}
.car_header .el-menu-item {
  padding: 0 30px;
}
.car_header .el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  color: #000 !important;
}
.car_header_banner_icon ul li {
  display: inline;
}
.headerSubScript {
  display: inline-block;
  width: 100%;
  height: 6px;
  /* border: 1px solid red; */
  background: url('~static/header/header_side.png') no-repeat right bottom;
  position: absolute;
  bottom: 0;
  left: 0;
}
.headerSubScript span {
  width: calc(100% - 16px);
  display: inline-block;
  background: #be001e;
  height: 100%;
  position: absolute;
}
.toEssayWrap{
  /* padding-top: 20px; */
  position: absolute;
  left: -39px;
  top: 26px;
  z-index: 999999;
}
.toEssay {
  width: 84px;
  height: 35px;
  color: #000;
  background: #fff;
  text-align: center;
  line-height: 35px;
  border-radius: 5px;
  display: inline-block;
}
</style>
