<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
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
  import { pc_URL } from '@/utils/defaultConfig.js'
  export default {
    mounted () {
      if (goPAGE() == 'pc') {
        var href = window.location.href
        if ( pc_URL == 'http://165.qiweioa.cn'){
          if (href.indexOf("http://165.qiweioa.cn/m") != -1) {
            href = href.replace('http://165.qiweioa.cn/m', function() {
              return 'http://165.qiweioa.cn'
            })
            window.location.href = href
          }
        } else if ( pc_URL == 'http://m.jfcar.com.cn') {
          href = href.replace('http://m.jfcar.com.cn', function() {
            return 'http://www.jfcar.com.cn'
          })
          window.location.href = href
        }

      }
    }
  }
</script>
