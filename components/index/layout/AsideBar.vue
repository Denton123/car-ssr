<template>
  <transition name="el-fade-in">
    <div class="aside_bar"
      v-if="show">
      <div class="aside_bar_container">
        <div class="line"></div>
        <div class="bar_list">
          <dl v-for="(item, index) in barList"
            :key="index"
            @click="change(index)">
            <a :href="barListId[index]">
              <dt :class="{'dt_active': activeIndex == index}"></dt>
              <dd :class="{'dd_active': activeIndex == index}">
                {{item}}
              </dd>
            </a>
          </dl>
        </div>
      </div>
    </div>
  </transition>

</template>
<script>
export default {
  name: 'AsideBar',
  data() {
    return {
      activeIndex: 0,
      barList: ['热点资讯', '今日车闻', '新能源', '兴趣部落', '视频'],
      barListId: ['#news', '#cars', '#resources', '#hobbies', '#videos'],
      isShow: false // 是否展示
    }
  },
  computed: {
    active: function() {
      return this.activeIndex
    },
    show: function() {
      return this.isShow
    }
  },
  methods: {
    // 改变元素
    change(index) {
      console.log(index)
      this.activeIndex = index
    },
    // 监听滚动事件
    scrollChange() {
      let scrollTop = 0
      let room = 200
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      if (scrollTop > 300) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      // console.log(scrollTop)
      if (scrollTop + room < 1216) {
        this.activeIndex = 0
      } else if (scrollTop + room > 1216 && scrollTop + room < 2506) {
        this.activeIndex = 1
      } else if (scrollTop + room > 2506 && scrollTop + room < 3522) {
        this.activeIndex = 2
      } else if (scrollTop + room > 3522 && scrollTop + room < 5317) {
        this.activeIndex = 3
      } else if (scrollTop + room > 5317) {
        this.activeIndex = 4
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        window.addEventListener('scroll', this.scrollChange)
      })
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollChange)
  }
}
</script>
<style>
.aside_bar {
  position: fixed;
  bottom: 459px;
  background-color: #fff;
  right: 10px;
  z-index: 9999;
  width: 300px;
}

.aside_bar dl {
  font-size: 0px;
}

.aside_bar dl dt,
dd {
  display: inline-block;
  width: 84px;
  height: 24px;
  padding-bottom: 30px;
}

.aside_bar dl dd {
  text-align: center;
  color: #999999;
  vertical-align: top;
}

.aside_bar dl dd a {
  color: #999999;
}

.aside_bar dl .dd_active a {
  color: #fff;
}

.aside_bar dl .dt_active {
  background: url('../images/active.png') no-repeat 60px 0;
}

.aside_bar dl .dd_active {
  background: url('../images/aside_nav.png') no-repeat 0 0;
  background-size: 84px 24px;
  color: #fff;
  line-height: 24px;
}

.aside_bar dl dt {
  background: url('../images/aside_bar_unactive.png') no-repeat 60px 0;
  background-size: 18px 18px;
}

.aside_bar .aside_bar_container {
  position: relative;
}

.aside_bar .aside_bar_container .bar_list {
  width: 168px;
  position: absolute;
  right: 2px;
}

.line {
  width: 2px;
  margin-top: 10px;
  height: 220px;
  font-size: 14px;
  background-color: #cccccc;
  position: absolute;
  right: 100px;
}
</style>
