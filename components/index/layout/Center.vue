<template>
  <div class="center">
    <div class="center-container"
      :style="bgUrl">
      <div class="center-bg">
        <div class="center-header">
          <router-link :to="href">
            <div class="heaader-container">
              <p v-text="Ctitle"></p>
              <div class="header">
                <span class="header-left"></span>
                <span v-text="CtitleEn"
                  class="titleEn"></span>
                <span class="header-right"></span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="center_left"></div>
      <div class="center_right"></div>
      <div class="content">
        <div class="content_left">
          <slot name="carsouel"></slot>
        </div>
        <div class="content_right">
          <slot name="other"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Center',
  props: {
    title: {
      type: String,
      default: '今日车闻'
    },
    titleEn: {
      type: String,
      default: 'news'
    },
    isBg: {
      type: String,
      default: '1'
    },
    url: {
      type: String
    },
    href: {
      type: String,
      default: 'http://165.qiweioa.cn/'
    }
  },
  computed: {
    Ctitle: function() {
      return this.title
    },
    CtitleEn: function() {
      let result = this.titleEn
        .toUpperCase()
        .split('')
        .join(' ')
      return result
    },
    Curl: function() {
      if (this.url === '' || this.url == null) {
        return null
      } else {
        return this.url
      }
    },
    bgUrl: function() {
      if (this.Curl == null || this.Curl === '') {
        return {}
      } else {
        return {
          backgroundSize: `100% 100%`,
          backgroundImage: `url(${this.Curl})`
        }
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
.center {
  position: relative;
  padding: 35px 0px;
}

.center-container {
  height: 540px;
}

.center-bg {
  height: 100%;
  background: #a6000b;
  opacity: 0.9;
}

.center-bg .center-header {
  padding-top: 40px;
  display: flex;
  justify-content: center;
  color: #fff;
}

.center-bg .center-header .heaader-container {
  width: 193px;
  color: #fff;
}
.center-bg .center-header .heaader-container p{
  margin: 0 !important
}
.center-bg .center-header .header {
  font-size: 0px;
  text-align: center;
  padding-right: 10px;
  font-weight: bold;
}

.center-bg .center-header p {
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 12px;
  text-align: center;
}

.titleEn {
  font-size: 14px;
  letter-spacing: 2px;
}

.center_left {
  position: absolute;
  width: 115px;
  height: 94px;
  background: url('../images/center_left.png') no-repeat;
  background-size: 115px 94px;
  left: 0px;
  top: 9px;
}

.center_right {
  width: 115px;
  height: 94px;
  position: absolute;
  background: url('../images/center_right.png') no-repeat;
  background-size: 115px 94px;
  right: 0px;
  top: 10px;
}

.header-left {
  display: inline-block;
  width: 6px;
  height: 9px;
  background: url('../images/white_right.png') no-repeat;
  background-size: 6px 9px;
  padding-right: 10px;
}

.header-right {
  display: inline-block;
  width: 6px;
  height: 9px;
  background: url('../images/white_left.png') no-repeat;
  background-size: 6px 9px;
  margin-left: 10px;
}

.center-container .content {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  top: 160px;
  left: 0px;
}

.content_left {
  display: inline-block;
  width: 790px;
  height: 450px;
  box-sizing: border-box;
}

.content_right {
  display: inline-block;
  width: 380px;
  height: 450px;
  margin-left: 20px;
  box-sizing: border-box;
}
</style>
