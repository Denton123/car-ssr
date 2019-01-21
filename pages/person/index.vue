<template>
  <div>
    <div id="person"
      class="myperson_block">
      <Header></Header>
      <div class="person_container">
        <div class="person_theme">
          <div class="person_wrap">
            <div class="person_head">
              <img v-if="userData.user.photo !== ''"
                :src="formatPic(userData.user.photo)"
                alt="">
              <img v-else
                src="~static/person/person_default.png"
                alt="">
            </div>
            <div class="person_name"
              v-if="userData.user.loginName!==''">
              {{userData.user.loginName}}
            </div>
            <div class="person_approve" v-if="userData.user.idCard !== ''">
              已认证
            </div>
            <div class="person_msg">
              <div class="article">
                <span>文章</span>
                <span>{{!userData.essayCount ? 0 : userData.essayCount}}</span>
              </div>
              <div class="concern">
                <span>关注</span>
                <span>{{!userData.floowCount ? 0 : userData.floowCount }}</span>
              </div>
              <div class="fans">
                <span>粉丝</span>
                <span>{{!userData.fansCount ? 0 : userData.fansCount}}</span>
              </div>
              <div class="integral">
                <span>积分</span>
                <span>{{!userData.totalIntegral ? 0 : userData.totalIntegral}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="person_content">
          <div class="person_title_myperson">
            <div class="person_bg">
              <div class="my_person_mask"></div>
              <div class="title_nav">
                <no-ssr>
                <el-tabs v-model="activeName"
                  @tab-click="handleClick">
                  <el-tab-pane label="我的文章"
                    name="person-index-myEssay-page">
                     <nuxt-child v-if="ispersonmyEssay" :key="'ispersonmyEssay1'"/>
                     <publish-essay-component v-else :key="'ispersonmyEssay2'"></publish-essay-component>
                  </el-tab-pane>
                  <el-tab-pane label="个人信息"
                    name="person-index-editInfo">
                    <person-info></person-info>
                  </el-tab-pane>
                  <el-tab-pane label="修改密码"
                    name="person-index-resetPassword">
                    <reset-password></reset-password>
                  </el-tab-pane>
                </el-tabs>
                </no-ssr>
                <div class="advertise_wrapper">
                  <no-ssr>
                  <div id="index_footer_ad"></div>
                  </no-ssr>
                </div>
             
              </div>
              <Footer></Footer>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
// import './index.less'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import myEssay from '@/pages/person/index/myEssay/_page.vue'
import personInfo from '@/pages/person/index/editInfo/index.vue'
import resetPassword from '@/pages/person/index/resetPassword/index.vue'

import { webUserSelectByPrimaryKey, webMyEssay} from '@/http/api'
import { $get, $post } from '@/http/ajax'
import systemManage from '@/http/photoApi.js'
import publishEssayComponent from '@/components/publishEssay/index.vue'
// const serverUrl = utils.commonUrl
// const url = serverUrl + utils.apiPath + 'sys/uploadFile'
export default {
  name: 'person',
  data() {
    return {
      activeName: 'myEssay',
      userData: {
        user: {
          photo: '',
          loginName: ''
        },
        essayCount: '',
        floowCount: '',
        fansCount: '',
        totalIntegral: ''
      },
      editForm: {},
      ispersonmyEssay: true
    }
  },
  /* 预览图和视频地址拼接 */
  computed: {},
  // async asyncData() {
  //   let listData = await $get(webMyEssay, {
  //     limit: 12,
  //     page: 1
  //   }, {
  //     'X-Auth0-Token': '37029eac49d65817b0d7a627dcdf8d85'
  //   })
  //   return {
  //     listData: listData.data ? listData.data : {}
  //   }
  // },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
      let tabArray = tab.name.split('-')
      if (tabArray[2] === 'myEssay') {
        this.$router.push(`/person/${tabArray[2]}/1`)
      } else {
        this.$router.push(`/person/${tabArray[2]}`)
      }
    },
    getUserInfo() {
      let cookie = this.getCookie('token')
      let tokenObj = JSON.parse(localStorage.getItem('userMsg'))
      if (tokenObj == null) {
        tokenObj = {}
      }
      $get(
        webUserSelectByPrimaryKey,
        {},
        {
          'X-Auth0-Token': cookie !== '' ? cookie : tokenObj.token
        }
      ).then(res => {
        // console.log(res)
        this.userData = {...this.userData,...res.data.des}
        this.editForm = {...this.editForm, ...this.userData.user}
      })
    },
    formatPic(item) {
      return systemManage.getApi(item)
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
    // 接入广告函数
    createAd() {
      // 底部通栏广告
      let ad = document.getElementById('index_footer_ad')
      if (ad) {
        ;(window.slotbydup = window.slotbydup || []).push({
        id: '5993946',
        container: 'index_footer_ad',
        size: '1200,200',
        display: 'inlay-fix',
        async: true
      })
      }

    }
  },
  mounted() {
    if (this.$route.query && this.$route.query.public === 'public') {
        this.ispersonmyEssay = false
    }
    this.getUserInfo()
    this.$nextTick(() => {this.createAd()})
    this.activeName = this.$route.name
    // this.$router.push('/person/myEssay/1')
  },
  components: {
    Header,
    Footer,
    myEssay,
    personInfo,
    resetPassword,
    publishEssayComponent
  }
}
</script>

<style >
#person {
  height: 100%;
}
.title_nav .el-tabs__item.is-active {
  width: 120px;
  height: 50px;
  background: url('~static/person/active_icon.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  /* // padding-left: 18px !important; */
}
.person_theme {
  width: 100%;
  height: 400px;
  background: url('~static/person/bg.png') no-repeat;
  /* background-size: 100% 100%; */
}
@media screen and (max-width: 1366px) {
  .person_theme {
    width: 100%;
    height: 400px;
    background: url('~static/person/bg.png') no-repeat;
    background-size: 100% 100%;
  }
}
.person_container {
  width: 100%;
  height: 100%;
  /* background: #f6f6f6; */
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
  /* background: #fff; */
  margin: 30px auto 15px;
  overflow: hidden;
  /* border: 4px solid rgba(246, 246, 246, 1); */
}
.person_head img {
  width: 130px;
  height: 130px;
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
  /* -webkit-transform: skew(10deg);
  -moz-transform: skew(10deg);
  -o-transform: skew(10deg); */
  background: url('~static/person/validator.png');
  font-size: 14px;
  color: #fff;
  /* font-style: italic; */
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
.person_content {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
}
.myperson_block .my_person_mask {
  position: absolute;
  width: 100%;
  height: 51px;
  background: #fff;
  border-bottom: 1px solid #000;
}
.myperson_block .person_bg {
  width: 100%;
  background: #f6f6f6;
}
.myperson_block .person_title_myperson {
  width: 100%;
  /* height: 50px; */
  /* line-height: 50px; */
  border-bottom: 1px solid #000;
  margin: 0 auto;
  background: #fff;
}
.myperson_block .person_title_myperson .title_nav {
  width: 1200px;
  margin: 0 auto;
}
.article_table {
  width: 94%;
  margin: 0 auto;
}
.article_title {
  width: 100%;
  margin: 30px auto;
  text-align: center;
  font-size: 22px;
  color: #121212;
  font-weight: bold;
  letter-spacing: 2px;
}
.nav_title {
  height: 60px;
  line-height: 60px;
  background: #f6f6f6;
}
.nav_title_active span {
  color: #be001e !important;
}
.article_form_title {
  font-size: 20px;
  color: #121212;
  font-weight: bold;
}
.article_form_title i {
  font-style: normal;
  color: #be001e;
}
.article_form_title span {
  color: #999999;
  font-size: 12px;
  margin-left: 10px;
  font-weight: normal;
}
.require_icon {
  margin-left: 20px;
  font-size: 14px;
  color: #aaa;
}
.require_icon i {
  font-style: normal;
  color: #be001e;
}
.article_file_picture {
  position: relative;
  margin-top: 20px;
}
.article_ruleForm .el-input {
  width: 65%;
}
.article_ruleForm .el-select {
  width: 100%;
}
.articleVerify {
  display: inline-block;
  width: 360px;
}
.article_ruleForm .articleVerify:nth-child(1) {
  margin-right: 10px;
}
.article_ruleForm .articleVerify .el-input {
  width: 100%;
}
.article_ruleForm .el-radio-button,
.article_ruleForm .el-radio-button__inner {
  margin-right: 15px;
}
.article_ruleForm .el-radio-button__inner {
  /*border-left: 0;*/
  border: 1px solid #dcdfe6;
  border-radius: 4px !important;
  color: #121212;
  font-weight: bold;
}
.title_nav .el-tabs__active-bar {
  background: transparent !important;
}
.title_nav .el-tabs__item {
  width: 120px;
  height: 51px !important;
  line-height: 51px;
  color: #121212;
  font-weight: 500;
  padding-left: 18px;
  text-align: center;
  font-size: 18px;
}

.title_nav .el-tabs__header {
  margin: 0;
  /* border-bottom: 1px solid; */
}
.picture_mark {
  margin-top: -20px;
  span {
    color: #409eff;
    &:first-child {
      margin: 0 96px 0 50px;
    }
  }
}
/* 裁剪图片相关 */
.app-main-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  cursor: pointer;
}
/* 限制上传视频名字宽度 */
.person_container .el-upload-list {
  width: 58%;
}
/*广告*/
.advertise_wrapper {
  margin: 20px 0;
  width: 100%;
  height: 200px;
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

/* 发布和草稿按钮 */
.person_container .person_btn {
  width: 150px;
  height: 40px;
  border-radius: 0;
  border: none;
  margin-bottom: 40px;
}
.person_container .person_btn:hover {
  border-color: red;
}
.person_container .person_btn.publish {
  color: #f6f6f6;
  background: url('~static/images/person_publish.png') no-repeat !important;
}
.person_container .person_btn.draft {
  color: #000;
  background: url('~static/images/person_draft.png') no-repeat !important;
}
.title_nav .el-tabs__nav-wrap::after {
  background: #fff;
}
.title_nav .el-tabs__nav-wrap {
  margin-bottom: 0px;
}
.title_nav .el-tabs__item:hover {
  color: #000;
}
.title_nav .el-tabs__item.is-active:hover {
  color: #fff;
}
.title_nav .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 18px;
}
#person .el-tabs--top .el-tabs__item.is-top:last-child {
  padding-right: 23px;
}
</style>
