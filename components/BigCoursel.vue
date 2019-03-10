<template>
  <div class="big_container">
    <!-- <swiper :options="swiperOption"
      :ref="id"
      class="big_coursel_swiper"
      v-if="list && list.length > 1"
      @slideChange="change">
      <swiper-slide v-for="(item, index) in list"
        :key="index"
        >
        <div class="item">
          <a :href="item.linkurl"
            class="big_coursel_swiper_a"
            target="_blank">
            <img :src="concatImage(item.url)">
            <div class="cover"
              ></div>
          </a>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev swiper-button-white"
        slot="button-prev"
        @click="prev"></div>
      <div class="swiper-button-next swiper-button-white"
        slot="button-next"
        @click="next"></div>
    </swiper> -->

    <!-- ssr写法： -->
    <div v-swiper:mySwiper100="swiperOption" v-if="list && list.length > 1"  class="big_coursel_swiper">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, key) in list" :key="key">
            <div class="item">
          <a :href="item.linkurl"
            class="big_coursel_swiper_a"
            target="_blank">
            <img :src="$ImgUrlRelative(concatImage(item.url))" :alt="item.title">
            <div class="cover"
              ></div>
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

    </div>
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

    <div class="titleBg">
    </div>
    <div class="bg-titleWrap">
      <strong class="title"
      v-text="title"></strong>
    </div>
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
import systemManage from "@/http/photoApi"
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
    var _this = this
    return {
      title: "", // 标题
      swiperOption: {
        slidesPerView: "auto",
        centeredSlides: true,
        autoplay: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          'slideChange': function() {
              _this.b_change()
          }
        }
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
  watch: {

    // 因为是服务端渲染，所以要使用监控routePage的方法
    list:{
      handler(newRoutePage, oldRoutePage) {
        // console.log('3214231--',this.realIndex)
        //
        // this.realIndex = this.$refs[this.id].swiper.realIndex;
        this.title = this.list[0].title;
      }

    }
  },
  mounted() {
    // console.log(this.list, 'list')
    // this.$nextTick(() => {
    //   this.mySwiper = this.$refs[this.id].swiper
    // })
    // setTimeout(() => {
    //   this.mySwiper = new Swiper('.big_coursel_swiper', {
    //     ...this.swiperOption
    //   })
    // }, 100)
    // console.log(this.mySwiper.slideChange)
        if(this.mySwiper100){
          this.mySwiper100.init()
        }
  },
  methods: {
      concatImage(item) {
      if(item.indexOf('http:') >= 0 || item.indexOf('/image') >= 0){
        return item
      }
      return systemManage.getApi(item)
    },
    // 轮播改变
    change() {
      this.realIndex = this.$refs[this.id].swiper.realIndex; // 获取当前轮播图下标
      this.title = this.list[this.realIndex].title;
    },
   // 轮播改变
    b_change() {
      if (this.mySwiper100) {
      this.realIndex = this.mySwiper100.realIndex; // 获取当前轮播图下标
      this.title = typeof this.list[this.realIndex] == 'object' ? this.list[this.realIndex].title : ''
      }

    },
    // 向左滑动
    prev() {
      // if (this.activeIndex !== 0) {
      //   this.mySwiper.slideTo(this.activeIndex - 1)
      // } else {
      //   this.mySwiper.slideTo(this.listData.length - 1)
      // }
      // this.$refs[this.id].swiper.autoplay = true
      this.mySwiper100.loop = false;
      this.mySwiper100.slidePrev();
      this.mySwiper100.autoplay.start();
       this.mySwiper100.loop = true;
    },

    // 向右滑动
    next() {
      // if (this.activeIndex < this.listData.length - 1) {
      //   this.mySwiper.slideTo(this.activeIndex + 1)
      // } else {
      //   this.mySwiper.slideTo(0)
      // }
      // this.$refs[this.id].swiper.autoplay = true

        this.mySwiper100.loop = false;
      this.mySwiper100.slideNext();
      this.mySwiper100.autoplay.start();
       this.mySwiper100.loop = true;
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
.big_container .titleBg
 {
  width: 1200px;
  height: 60px;
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
.big_container .bg-titleWrap{
  width: 1200px;
  height: 60px;
  color: #ffffff;
  position: absolute;
  z-index: 100;
  bottom: 40px;
  left: 50%;
  box-sizing: border-box;
  padding-top: 10px;
  transform: translateX(-50%);
}

.big_container .bg-titleWrap{
  width: 1200px;
  height: 60px;
  color: #ffffff;
  position: absolute;
  z-index: 100;
  bottom: 40px;
  left: 50%;
  box-sizing: border-box;
  padding-top: 10px;
  transform: translateX(-50%);
}

.big_container .title {
  display: block;
  width: 520px;
  height: 60px;
  color: #ffffff;
  position: absolute;
  bottom: 0px;
  left: 24%;
  box-sizing: border-box;
  padding-top: 10px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 30px;
  transform: translateX(-50%);
}
.big_container .swiper-slide-active .cover{
  display: none;
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
