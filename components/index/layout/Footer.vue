<template>
  <div class="footer">
    <div class="footer_wrap">
      <div class="footer_left">
        <div class="footer_tab">
          <ul>
            <li v-for="footerTab in footerTabDatas">
              <a href="">
                <span>{{footerTab.title}}</span>
              </a>
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
            <a class="footer_copyright">粤ICP备18159865号</a>
          </div>
        </div>
      </div>
      <div class="footer_right">
        <div class="footer_code">
          <ul>
            <li>
              <img src="../../../../assets/footer/code.png">
              <a class="footer_code_desc">
                <img src="../../../../assets/footer/wechat.png"
                  class="footer_wechat">
                <a>尖峰咖</a>
              </a>
            </li>
            <li>
              <img src="../../../../assets/footer/code.png">
              <a class="footer_code_desc">
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
          id: 0
        },
        {
          title: '今日车闻',
          id: 1
        },
        {
          title: '新能源',
          id: 3
        },
        {
          title: '视频',
          id: 3
        },
        {
          title: '兴趣部落',
          id: 3
        }
        // {
        //   title: '情怀车',
        //   id: 3
        // },
        // {
        //   title: '摄影',
        //   id: 3
        // },
        // {
        //   title: '萌宠',
        //   id: 3
        // },
        // {
        //   title: '改装',
        //   id: 3
        // },
        // {
        //   title: '旅游',
        //   id: 3
        // },
        // {
        //   title: '模型',
        //   id: 3
        // }
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

.footer_code_desc a {
  color: #999999;
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

.footer_link a {
  color: rgba(153, 153, 153, 1);
}

.footer_link_ad {
  padding-right: 15px;
}

.footer_link a:hover {
  color: #be001e;
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
}

.footer_code_desc a:hover {
  color: #be001e;
  cursor: pointer;
}

.footer_wechat {
  /*border: 1px dashed rgba(153,153,153,1);*/
  vertical-align: middle;
  padding-right: 5px;
}
</style>
