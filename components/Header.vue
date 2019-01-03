<template>
  <div class="header">
    <div class="header_wrap">
      <div class="header_logo">
        <router-link to="/index">
          <img src="../assets/header/logo.png">
        </router-link>
      </div>
      <div class="header_banner">
        <ul>
          <li v-for="(item, index) in header_banner_data"
            :class="{'hasSubScript': item.name === activeName}"
            @click="handleClick(item.name)"
            :key="index">
            <a href="javascript:void(0);"
              :href="item.to"
              :class="{'fontWeight': item.name === activeName}">{{item.title}}</a>
            <!-- <router-link :to="item.to"> -->
            <!-- {{item.title}} -->
            <!-- </router-link> -->
          </li>
        </ul>
      </div>
      <div class="header_banner_icon">
        <input type="text"
          name=""
          class="header_banner_search_input"
          v-if="isShowSearch"
          placeholder="搜索"
          v-model="searchContent">
        <ul :class="hasLoginIn?'mrsecond':'mrfirst'">
          <li class="header_banner_icon_search"
            @click="showSearch()">
            <a href="javascript:void(0);">
              <i :class="{'hasSearchHover': isShowSearch}"
                @click="toSearch"></i>
            </a>
          </li>
          <li class="header_banner_icon_upload">
            <a href="">
              <i></i>
            </a>
          </li>
          <li class="header_banner_icon_phone"
            @mouseenter="showActive(3)"
            @mouseleave="showActive(0)">
            <a href="">
              <i></i>
            </a>
          </li>
          <li class="header_banner_icon_wechat">
            <a href="">
              <i></i>
            </a>
          </li>
        </ul>
      </div>
      <div class="wechat_code"
        v-if="active === 3">
        <div class="triangle">
          <span></span>
        </div>
        <img src="../assets/header/code.png">
      </div>
      <div class="header_login_registry">
        <div class="logout"
          v-if="active===1"
          @click="logout">退出登录</div>
        <div v-if="hasLoginIn"
          @mouseenter="showActive(1)"
          class="header_userInfo">
          <router-link to="/person">
            <img v-if="user.photo!==''"
              :src="formatPic(user.photo)"
              alt="">
            <img v-else
              src="../assets/detail/detail_user.png"
              alt="">
          </router-link>
        </div>
        <div v-else
          class="header_login_registry_operate">
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

</template>

<script>
import { webUserSelectByPrimaryKey, webLogout } from '@/http/api'
import { $get, $post } from '@/http/ajax'
import systemManage from '@/http/photoApi.js'
// import { constants } from 'http2'
export default {
  name: 'Header',
  data() {
    return {
      active: 0,
      activeName: 'news',
      msg: 'Welcome to Your Vue.js App',
      header_banner_data: [
        {
          title: '今日车闻',
          id: 0,
          to: '/news/1',
          name: 'news'
        },
        {
          title: '新能源',
          id: 1,
          to: '/ev/1',
          name: 'sources'
        },
        {
          title: '兴趣部落',
          id: 2,
          to: '/hobbies/1',
          name: 'hobbies'
        },
        {
          title: '视频',
          id: 3,
          to: '/video/1',
          name: 'video'
        }
      ],
      isShowSearch: false,
      hasLoginIn: false,
      searchContent: '',
      user: {
        photo: '',
        loginName: ''
      }
    }
  },
  methods: {
    showActive(index) {
      console.log(index)
      this.active = index
      console.log(this.active, 'active')
    },
    handleClick(name) {
      this.activeName = name
    },
    showSearch() {
      this.isShowSearch = true
    },
    toAnotherRouter(name) {
      this.$router.push({ name })
    },
    getUserInfo() {
      let tokenObj = JSON.parse(localStorage.getItem('userMsg'))
      if (tokenObj == null) {
        tokenObj = {}
      }
      if (tokenObj.token !== undefined) {
        this.hasLoginIn = true
      }
      $get(webUserSelectByPrimaryKey, {
        'X-Auth0-Token': tokenObj.token
      }).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          this.user = res.data.des.user
        }
      })
    },
    formatPic(item) {
      return systemManage.getApi(item)
    },
    // 跳转到搜索页
    toSearch() {
      if (this.isShowSearch) {
        this.$router.push({
          path: `/search/1/${this.searchContent}`
        })
      }
    },
    // 退出登录
    logout() {
      let tokenObj = JSON.parse(localStorage.getItem('userMsg'))
      if (tokenObj == null) {
        tokenObj = {}
      }
      console.log('res')
      $post(
        webLogout,
        {},
        {
          'X-Auth0-Token': tokenObj.token
        }
      ).then(res => {
        console.log(res)
        if (res.data.code == 0) {
          localStorage.removeItem('userMsg')
          this.toAnotherRouter('login')
        } else {
          this.$message('该登录失效')
        }
      })
    }
  },
  mounted() {
    let route = this.$route
    console.log(this.$route)
    this.activeName = route.name
    if (route.params.model) {
      this.activeName = route.params.model
    }
    this.getUserInfo()
    let tokenObj = JSON.parse(localStorage.getItem('userMsg'))
    if (tokenObj == null) {
      tokenObj = {}
    }
    console.log(tokenObj.token, 'token')
    console.log('test', 'token')
    if (tokenObj.token !== undefined) {
      this.hasLoginIn = true
    }
  }
}
</script>

<style scoped>
.nav img {
  display: block;
  margin: 0 auto;
  width: 320px;
  height: 130px;
}
.nav li {
  list-style: none;
}

.header {
  width: 100%;
  height: 64px;
  background: rgba(0, 0, 0, 1);
}
.header_wrap {
  margin: 0 auto;
  width: 1200px;
  height: inherit;
  /*overflow: hidden;*/
  position: relative;
}
.header_logo {
  width: 146px;
  height: inherit;
  display: inline-block;
  float: left;
}
.header_banner {
  height: 64px;
  display: inline-block;
  float: left;
}
.header_banner ul,
.header_banner_icon ul {
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
.header_banner_icon ul {
  /* margin-right: 101px; */
}
.header_banner ul li {
  width: 70px;
  padding-bottom: 22px;
  /*text-align: left;*/
}
.header_banner ul li,
.header_banner_icon ul li {
  display: inline;
  margin: 0 20px;
  cursor: pointer;
}
.header_banner ul li a {
  width: 70px;
  display: inline-block;
  color: rgba(224, 224, 224, 1);
  font-size: 16px;
  font-weight: 300;
  font-family: SourceHanSansCN-Light;
  line-height: 32px;
  text-decoration: none;
  height: 64px;
}
.header_banner_icon {
  display: inline-block;
  float: right;
}
.header_banner_icon ul li {
  width: 40px;
  height: 40px;
  position: relative;
  margin: 0 35px;
}
.header_banner_icon ul li a {
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
.header_banner_icon ul li a i {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.header_banner_icon_search a i {
  background: url('../assets/header/nav_search.png');
}
.header_banner_icon_search a i:hover {
  background-image: url('../assets/header/nav_search_hover.png');
}
.hasSearchHover {
  background-image: url('../assets/header/nav_search_hover.png') !important;
}
.header_banner_icon_upload a i {
  background: url('../assets/header/nav_upload.png');
}
.header_banner_icon_upload a i:hover {
  background-image: url('../assets/header/nav_upload_hover.png');
}
.header_banner_icon_phone a i {
  background: url('../assets/header/nav_phone.png');
}
.header_banner_icon_phone a i:hover {
  background-image: url('../assets/header/nav_phone_hover.png');
}
.header_banner_icon_wechat a i {
  background: url('../assets/header/nav_wechat.png');
}
.header_banner_icon_wechat a i:hover {
  background-image: url('../assets/header/nav_wechat_hover.png');
}
.header_banner_search_input {
  width: 300px;
  height: 42px;
  border-radius: 40px;
  position: absolute;
  right: 321px;
  top: 10px;
  outline: none;
  padding-left: 17px;
  font-size: 16px;
  border: 0px;
}
.header_login_registry {
  position: absolute;
  right: 0px;
  /* width: 98px; */
  height: 19px;
}
.header_login_registry .header_login_registry_operate a {
  color: rgba(255, 255, 255, 1);
  text-decoration: none;
  font-size: 16px;
  display: inline-block;
  line-height: 64px;
}
.header_login_registry header_login_registry_operate a:hover {
  color: #be001e;
}
.desperate {
  color: rgba(255, 255, 255, 1);
  padding: 0 10px;
}
.hasSubScript {
  background: url('..//assets/header/subscript.png') no-repeat;
  background-position: bottom;
}
.wechat_code {
  width: 130px;
  height: 130px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999999999;
  position: absolute;
  top: 72px;
  text-align: center;
  right: 137px;
}
.wechat_code img {
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  padding: 15px;
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
.header_userInfo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 10px;
}
.header_userInfo img {
  width: 100%;
  height: 100%;
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
</style>
