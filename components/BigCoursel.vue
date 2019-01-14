<template>
  <div class="big_container">
    <swiper :options="swiperOption"
      :ref="id"
      class="big_coursel_swiper"
      v-if="listData && listData.length > 1"
      @slideChange="change">
      <swiper-slide v-for="(item, index) in listData"
        :key="index">
        <div class="item">
          <a :href="item.linkurl"
            class="big_coursel_swiper_a"
            target="_blank">
            <img :src="item.url">
            <div class="cover"
              v-if="activeIndex !== index"></div>
          </a>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev swiper-button-white"
        slot="button-prev"
        @click="prev"></div>
      <div class="swiper-button-next swiper-button-white"
        slot="button-next"
        @click="next"></div>
    </swiper>
    <!-- <div v-swiper:mySwiper="swiperOption"
      :ref="id"
      class="big_coursel_swiper"
      v-if="listData.length"
      @slideChange="change">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="(item, index) in list"
          :key="index">
          <div class="item">
            <a :href="item.linkurl"
              class="big_coursel_swiper_a"
              target="_blank">
              <img :src="item.url"
                :alt="item.title">
              <div class="cover"
                v-if="activeIndex !== index"></div>
            </a>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev swiper-button-white"
        slot="button-prev"
        @click="prev"></div>
      <div class="swiper-button-next swiper-button-white"
        slot="button-next"
        @click="next"></div>
    </div> -->
    <div class="titleBg"></div>
    <strong class="title"
      v-text="title"></strong>
    <div class="controll">
      <div class="left"
        @click="prev"></div>
      <div class="right"
        @click="next"></div>
    </div>
  </div>
</template>
<script>
import utils from "@/http/url";
// import 'swiper/dist/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Swiper from 'swiper'
export default {
  name: "BigCoursel",
  props: {
    list: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  // components: {
  //   swiper,
  //   swiperSlide
  // },
  data() {
    return {
      title: "", // 标题
      swiperOption: {
        slidesPerView: "auto",
        centeredSlides: true,
        autoplay: true,
        loop: true
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // }
      }, // 轮播配置对象
      realIndex: 0, // 当前轮播下标
      mySwiper: null
    };
  },
  computed: {
    listData: function() {
      let list = this.list == null ? [] : this.list;
      let result = list.map(item => {
        if (item.url !== "" && item.url != null) {
          item.url = utils.getApi(item.url);
        }
        return item;
      });
      return result;
    },

    activeIndex: function() {
      // this.title = this.list[this.realIndex].title;
      return this.realIndex;
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.mySwiper = this.$refs[this.id].swiper
    // })
    // setTimeout(() => {
    //   this.mySwiper = new Swiper('.big_coursel_swiper', {
    //     ...this.swiperOption
    //   })
    // }, 100)
  },
  methods: {
    // 轮播改变
    change() {
      this.realIndex = this.$refs[this.id].swiper.realIndex; // 获取当前轮播图下标
      // console.log(this.realIndex)
      this.title = this.list[this.realIndex].title;
    },

    // 向左滑动
    prev() {
      if (this.mySwiper == null) {
        this.mySwiper = this.$refs[this.id].swiper;
      }
      // if (this.activeIndex !== 0) {
      //   this.mySwiper.slideTo(this.activeIndex - 1)
      // } else {
      //   this.mySwiper.slideTo(this.listData.length - 1)
      // }
      // this.$refs[this.id].swiper.autoplay = true
      this.mySwiper.slidePrev();
      this.mySwiper.autoplay.start();
    },

    // 向右滑动
    next() {
      if (this.mySwiper == null) {
        this.mySwiper = this.$refs[this.id].swiper;
      }
      // if (this.activeIndex < this.listData.length - 1) {
      //   this.mySwiper.slideTo(this.activeIndex + 1)
      // } else {
      //   this.mySwiper.slideTo(0)
      // }
      // this.$refs[this.id].swiper.autoplay = true
      this.mySwiper.slideNext();
      this.mySwiper.autoplay.start();
    }
  }
};
</script>
<style>
.big_container {
  height: 580px;
  padding-bottom: 40px;
  position: relative;
}

.big_container .big_coursel_swiper {
  height: 100%;
  background-color: #666;
}

.big_container .big_coursel_swiper_a {
  display: block;
  height: 100%;
}

.big_container .item {
  width: 100%;
  height: 580px;
  position: relative;
}

.big_container .item img {
  width: 100%;
  height: 100%;
}

.big_container .item .cover {
  width: 100%;
  height: 100%;
  background-color: #000;
  position: absolute;
  opacity: 0.5;
  left: 0;
  top: 0;
}

.big_container .active {
  background-color: red;
}
.big_container .swiper-slide {
  width: 1200px;
}

.big_container .titleBg {
  width: 1200px;
  height: 100px;
  background-color: #000;
  opacity: 0.5;
  color: #ffffff;
  position: absolute;
  z-index: 99;
  bottom: 40px;
  left: 50%;
  box-sizing: border-box;
  padding-top: 10px;
  transform: translateX(-50%);
}

.big_container .title {
  display: block;
  width: 1200px;
  height: 100px;
  color: #ffffff;
  position: absolute;
  z-index: 100;
  bottom: 40px;
  left: 50%;
  box-sizing: border-box;
  padding-top: 10px;
  text-align: center;
  /* letter-spacing: 5px; */
  font-size: 30px;
  transform: translateX(-50%);
}

.big_container .controll {
  position: absolute;
  bottom: 2px;
  left: center;
  height: 77px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;
}

.big_container .controll .left {
  width: 51px;
  background: url("~components/index/images/big_left.png") no-repeat;
  background-size: 51px 77px;
  cursor: pointer;
}

.big_container .controll .right {
  width: 51px;
  background: url("~components/index/images/big_right.png") no-repeat;
  background-size: 51px 77px;
  cursor: pointer;
}
.big_container .swiper-button-prev.swiper-button-white {
  /* margin-left: 40px; */
  width: calc((100% - 1200px) / 2);
  height: 598px;
}
.big_container .swiper-button-next.swiper-button-white {
  width: calc((100% - 1200px) / 2);
  height: 598px;
}
.big_container .swiper-button-next {
  right: 0;
  top: 0;
}
.big_container .swiper-button-prev {
  right: 0;
  top: 0;
}
</style>
