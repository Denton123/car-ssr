<template>
  <div class="center_no_bg">
    <div class="center_no_bg_container">
      <router-link :to="href">
        <div class="no_bg_title"
          v-text="title"></div>
        <div class="no_bg_header">
          <span class="no_bg_En_left"></span>
          <span class="title"
            v-text="Entitle"></span>
          <span class="no_bg_En_right"></span>
        </div>
      </router-link>

      <div class="clearfix mt20">
        <div class="no_bg_left_content"
          :style="{'width': lWidth+'px', 'height': Height+'px'}">
          <slot name="leftContent"></slot>
        </div>
        <div class="no_bg_right_content"
          :style="{'width': rWidth+'px', 'height': Height+'px'}">
          <slot name="rightContent"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CenterNoBg',
  props: {
    title: {
      type: String,
      default: '新能源'
    },
    titleEn: {
      type: String,
      default: 'EV'
    },
    lwidth: {
      type: String,
      default: '790'
    },
    rwidth: {
      type: String,
      default: '390'
    },
    height: {
      type: String,
      default: '450'
    },
    href: {
      type: String,
      default: 'http://165.qiweioa.cn'
    }
  },
  computed: {
    lWidth: function() {
      return this.lwidth
    },
    rWidth: function() {
      return this.rwidth
    },
    Height: function() {
      return this.height
    },
    Entitle: function() {
      return this.titleEn
        .toUpperCase()
        .split('')
        .join(' ')
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
.center_no_bg {
  display: flex;
  justify-content: center;
}

.center_no_bg .center_no_bg_container {
  width: 1200px;
}

.center_no_bg .center_no_bg_container .no_bg_title {
  text-align: center;
  font-size: 36px;
  letter-spacing: 12px;
  font-weight: bold;
  color: black;
}

.center_no_bg .center_no_bg_container .no_bg_header {
  font-size: 0px;
  text-align: center;
  padding-right: 15px;
  color: black;
}

.center_no_bg .center_no_bg_container .no_bg_header .title {
  font-size: 14px;
  letter-spacing: 2px;
  padding: 0 20px;
  font-weight: bold;
}
.center_no_bg .center_no_bg_container .no_bg_header .no_bg_En_left {
  display: inline-block;
  width: 6px;
  height: 9px;
  background: url('../images/black_left.png') no-repeat;
  background-size: 6px 9px;
}
.center_no_bg .center_no_bg_container .no_bg_header .no_bg_En_right {
  display: inline-block;
  width: 6px;
  height: 9px;
  background: url('../images/black_right.png') no-repeat;
  background-size: 6px 9px;
}

.no_bg_left_content {
  float: left;
  width: 790px;
  height: 450px;
  box-sizing: border-box;
}

.no_bg_right_content {
  float: right;
  width: 390px;
  height: 450px;
  box-sizing: border-box;
}
</style>
