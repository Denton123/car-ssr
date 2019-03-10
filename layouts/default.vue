<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
  import { pc_URL } from '@/utils/defaultConfig.js'
  import Vue from 'vue';
  import { replaceDetailUrl } from 'utils/defaultConfig'
  const  goPAGE = () => {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      /*window.location.href="你的手机版地址";*/
      return 'mobile'
    }
    else {
      /*window.location.href="你的电脑版地址";    */
      return 'pc'
    }
  }

  Vue.prototype.$replaceDetailUrl = function (url) {
    return replaceDetailUrl(url)
  }
  Vue.prototype.$FilterHtmlHttp= function (html) {
    return html ? html.replace(/http:\/\/www.jfcar.com.cn/ig, '') : html;
  }
  Vue.prototype.$ImgUrlRelative = function (url) {
    if (url) {
      var u = url.split("image")[1]
      if (u) {
        return '/image' + u
      }
      return url;
    }
    return url;
  }
  export default {
    mounted () {
      // var href = window.location.href
      // if (goPAGE() == 'pc') {
      //
      // } else {
      //   // 如果在m端， 但输入的不是m端的连接， 则跳转到m端
      //   if ( pc_URL == 'http://165.qiweioa.cn'){
      //     if (href.indexOf("165.qiweioa.cn/m") == -1) {
      //       href = href.replace('165.qiweioa.cn', function() {
      //         return '165.qiweioa.cn/m'
      //       })
      //       window.location.href = href
      //     }
      //   } else if ( pc_URL == 'http://www.jfcar.com.cn') {
      //     href = href.replace('www.jfcar.com.cn', function() {
      //       return 'm.jfcar.com.cn'
      //     })
      //     window.location.href = href
      //   }
      //   if (href.indexOf("127.0.0.1:3000") >= 0) {
      //     href = href.replace('127.0.0.1:3000', function() {
      //       return '192.168.12.12:3000/m'
      //     })
      //     window.location.href = href
      //   }
      // }
    }
  }
</script>
<style>
  .strong{
    font-weight: bold;
  }
  .v-inline{
    display: inline;
  }
  .v-inline-block{
    display: inline-block;
  }
  .v-block{
    display: block;
  }
  .v-fw-normal{
    font-weight: normal;
  }
  .v-fw-bold{
    font-weight: bold;
  }
  .v-fs-inherit{
    font-size: inherit;
  }
  .v-fs-24{
    font-size: 24px;
  }

</style>
