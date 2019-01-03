<template>
  <div class="footer">
    <div class="footer_wrap">
      <div class="footer_left">
        <div class="footer_tab">
          <ul>
            <li v-for="(footerTab, index) in footerTabDatas"
              :key="index">
              <router-link :to="`${footerTab.toLink}`">
                <span>{{footerTab.title}}</span>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer_friend_link">
          <div class="footer_logo">
            <router-link to="/index">
              <img src="@/assets/footer/logo.png">
            </router-link>
          </div>
          <div class="footer_link">
            <span>友情链接：</span>
            <a class="footer_link_ad">广汽丰田网</a>
            <a class="footer_link_ad">广汽传祺网站</a>
            <a class="footer_copyright">Copyright © www.AxureUX.com, All Rights Reserved.</a>
          </div>
        </div>
      </div>
      <div class="footer_right">
        <div class="footer_code">
          <ul>
            <li>
              <img src="@/assets/footer/code.png">
              <a class="footer_code_desc">
                <img src="@/assets/footer/wechat.png"
                  class="footer_wechat">
                <a>尖峰咖</a>
              </a>
            </li>
            <li>
              <img src="@/assets/footer/code.png">
              <a class="footer_code_desc">
                <img src="@/assets/footer/wechat.png"
                  class="footer_wechat">
                <a>手机端</a>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      footerTabDatas: [
        {
          title: '首页',
          id: 0,
          toLink: '/index'
        },
        {
          title: '今日车闻',
          id: 1,
          toLink: '/news'
        },
        {
          title: '新能源',
          id: 3,
          toLink: '/ev'
        },
        {
          title: '视频',
          id: 3,
          toLink: '/video'
        },
        {
          title: '兴趣部落',
          id: 3,
          toLink: '/hobbies/1'
        }
      ]
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 205px;
  background: #000;
}

.footer_wrap {
  width: 1200px;
  margin: 0 auto;
  height: 205px;
}

.footer_left {
  float: left;
}

.footer_tab ul li {
  display: inline-block;
  margin-right: 30px;
  font-size: 14px;
  padding-top: 32px;
  padding-bottom: 51px;
}

.footer_tab ul li a {
  color: rgba(153, 153, 153, 1);
  text-decoration: none;
}

.footer_tab ul li a:hover {
  color: #be001e;
}

.footer_friend_link {
  float: left;
  display: flex;
}
.footer_tab ul,
.footer_code ul {
  list-style: none;
  margin: 0;
  padding: 0;
  /*padding-left: 41px;*/
}
.footer_logo {
  display: inline-block;
  /*border: 1px dashed #fff;*/
}

.footer_link {
  display: inline-block;
  font-size: 12px;
  color: rgba(153, 153, 153, 1);
  text-align: left;
  margin-left: 40px;
  height: 72px;
  margin-top: 10px;
}

.footer_link_ad {
  padding-right: 15px;
}
.footer_link a {
  color: rgba(153, 153, 153, 1) !important;
}
.footer_link a:hover {
  color: #be001e !important;
  cursor: pointer;
}

.footer_copyright {
  display: block;
  margin-top: 10px;
}

.footer_right {
  float: right;
}

.footer_code {
  margin-top: 75px;
}

.footer_code ul li {
  display: inline-block;
  color: rgba(153, 153, 153, 1);
}

.footer_code ul li:last-child {
  margin-left: 28px;
}

.footer_code_desc {
  display: block;
  margin-top: 8px;
  text-align: center;
}

.footer_code_desc a {
  font-size: 12px;
  color: rgba(153, 153, 153, 1) !important;
}

.footer_code_desc a:hover {
  color: #be001e !important;
  cursor: pointer;
}

.footer_wechat {
  /*border: 1px dashed rgba(153,153,153,1);*/
  vertical-align: middle;
  padding-right: 5px;
}
</style>
