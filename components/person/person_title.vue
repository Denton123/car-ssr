<template>
  <div class="detail_content_article_title">
    <img src="~static/detail/detail_article.png">
    <h2>共上传<span>{{num}}</span>篇文章/兴趣部落</h2>
    <div class="detail_content_article_title_operate">
      <span
        class="publishEssay a"
        v-if="userData.grade == 2"
        @click="publicRouter">
        <span class="detail_content_article_title_operate_plus">+</span>
        <span>发文章</span>
      </span>
      <span
        class="publishHobbies a"
        @click="hobbiesRouter">
        <span class="detail_content_article_title_operate_plus">+</span>
        <span>发兴趣</span>
      </span>
    </div>
  </div>
</template>
<script>
import { webUserSelectByPrimaryKey } from '@/http/api'
import { $get } from '@/http/ajax'
export default {
  name: 'myTitle',
  data() {
    return {
      userData: {}
    }
  },
  props: {
    num: ''
  },
  methods: {
    publicRouter() {
      // if (this.userData.grade !== 2) {
      //   this.$message('您当前还没有发表文章的权限')
      // } else {
        this.$router.push({ path: '/person/publishEssay'})
      // }
    },
    hobbiesRouter() {
      this.$router.push({
        path: '/hobby/publishhobbies'
      })
    },
    getUserInfo() {
      let cookie = this.getCookie('token')
      let tokenObj = localStorage.getItem('userMsg') &&  localStorage.getItem('userMsg') != '' ?  JSON.parse(localStorage.getItem('userMsg')) : {}
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
        this.userData = res.data.des.user
      })
    },
    getCookie(cname) {
      // console.log(cname, 'cookie')
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
      }
      return ''
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.detail_content_article_title {
  padding: 40px 0;
}
.detail_content_article_title img {
  vertical-align: sub;
}
.detail_content_article_title h2 {
  display: inline-block;
  margin-left: 15px;
  font-weight: bold;
  font-size: 26px;
  color: rgba(18, 18, 18, 1);
}
.detail_content_article_title h2 span {
  color: #be001e;
}
.detail_content_article_title_operate {
  display: inline-block;
  float: right;
}
.detail_content_article_title_operate_plus {
  font-size: 24px;
  line-height: 26px;
  margin-left: -5px;
}
.detail_content_article_title_operate a, .detail_content_article_title_operate .a {
  width: 151px;
  height: 40px;
  display: inline-block;
  vertical-align: sub;
  text-align: center;
  color: #fff;
  line-height: 40px;
  font-weight: 800;
  font-size: 16px;
}
.detail_content_article_title_operate .publishEssay {
  background: url('~static/images/publishEssay.png');
}
.detail_content_article_title_operate .publishHobbies {
  background: url('~static/images/publishHobbies.png');
}
</style>
