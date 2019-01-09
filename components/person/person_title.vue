<template>
  <div class="detail_content_article_title">
    <img src="~static/detail/detail_article.png">
    <h2>共上传<span>{{num}}</span>篇文章/兴趣部落</h2>
    <div class="detail_content_article_title_operate">
      <a href="javascript:;"
        class="publishEssay"
        @click="publicRouter">
        <span class="detail_content_article_title_operate_plus">+</span>
        <span>发文章</span>
      </a>
      <a href="javascript:;"
        class="publishHobbies"
        @click="hobbiesRouter">
        <span class="detail_content_article_title_operate_plus">+</span>
        <span>发兴趣</span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'title',
  data() {
    return {}
  },
  props: {
    num: ''
  },
  methods: {
    publicRouter() {
      this.$router.push({
        path: '/person/publishEssay'
      })
    },
    hobbiesRouter() {
      this.$router.push({
        name: 'publicHobbies'
      })
    }
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
.detail_content_article_title_operate a {
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
