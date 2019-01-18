<template>
  <div class="wrap hobbiesDetailSwiper"
    style="position: relative;">
    <swiper v-if="sliderData.length > 1" :options="galleryTop" ref="topSwiper"  class="swiper-container gallery-top">
      <!-- <div class="swiper-wrapper">
      </div> -->
    </swiper>
    <div class="swiper-button-next"
      style="position:absolute;top:77.5%;left:47.3%;width: 51px;height: 77px;"></div>
    <div class="swiper-button-prev"
      style="background: url(~static/detail/left.png);position:absolute;top:77.5%;left:40%;width: 51px;height: 77px;"></div>
    <swiper :options="galleryThumbs"
      style="margin-top: 50px;" ref="thumbSwiper"  class="swiper-container gallery-thumbs">
      <!-- <div class="swiper-wrapper">
      </div> -->
    </swiper>
  </div>
</template>

<script>
// import Swiper from 'swiper'
// import 'swiper/dist/css/swiper.min.css'
import systemManage from '@/http/photoApi.js'
import { $get, $post } from '@/http/ajax'
import { webHobbiesDetailInfo } from '@/http/api'
// import $ from 'jquery'

// import 'swiper/dist/css/swiper.css'
// import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'test',
  // components: {
  //   swiper,
  //   swiperSlide
  // },
  data() {
    return {
      // num: '',
      sliderData: [],
      galleryTop: {        
              // notNextTick: true,
              spaceBetween: 10,
              loop: true,
              slidesPerView: 1,
              // loop: this.sliderData && this.sliderData.length > 1 ? true : false,
              loopedSlides: this.sliderData && this.sliderData.length, //looped slides should be the same
              observer:true,//修改swiper自己或子元素时，自动初始化swiper 
              observeParents:true,//修改swiper的父元素时，自动初始化swiper
              notNextTick: true,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              thumbs: {
                swiper: this.$refs.thumbSwiper
              },},
      galleryThumbs: {
              spaceBetween: 10,
              slidesPerView:this.sliderData && this.sliderData.length!='' ? (this.sliderData.length == 9 ? 9 : 'auto'):'',
              // touchRatio: 0.2,
              loop: this.slider && this.sliderData.length > 1 ? true: false,
              loopedSlides:this.sliderData && this.sliderData.length, //looped slides should be the same
              slideToClickedSlide: true,
              slideActiveClass: 'normal-active',  
              centeredSlides: true ,// 居中
              watchSlidesVisibility: true, //防止不可点击
              observer:true,//修改swiper自己或子元素时，自动初始化swiper 
              observeParents:true,//修改swiper的父元素时，自动初始化swiper
      }
    }
  },
  props: {
    imgArray: {
      type: Array,
      required: true
    },
    hobbiesId: ''
  },
  computed: {},
  async asyncData({params}){
     await $get(webHobbiesDetailInfo, { hobbiesId: params.id}).then(res => {
        let photoList = res.data.result_data.hobbies.photoList
        if (photoList.length !== 0) {
         var sliderData = photoList
          // this.$forceUpdate()
        }
      })
  },
  mounted() {
      console.log(this.sliderData,'8888888888888888888888888888888888888888888')
      for (let i = 0; i < photoList.length; i++) {
              let imgUrl = this.formatphoto(photoList[i].photo)
              $('.swiper-wrapper').append(
                `<swiper-slide class="swiper-slide"><img src="${imgUrl}"></swiper-slide>`
              )
      }
      setTimeout(() => {
        this.$refs.topSwiper.swiper.init()
      this.$refs.thumbSwiper.swiper.init()
      }, 0)
    // this.$nextTick(() => {
      // console.log(this.$route)
      $get(webHobbiesDetailInfo, { hobbiesId: this.$route.params.id}).then(res => {
        let photoList = res.data.result_data.hobbies.photoList
        if (photoList.length !== 0) {
          this.sliderData = photoList
          // this.$forceUpdate()
          for (let i = 0; i < photoList.length; i++) {
            let imgUrl = this.formatphoto(photoList[i].photo)
            $('.swiper-wrapper').append(
              `<swiper-slide class="swiper-slide"><img src="${imgUrl}"></swiper-slide>`
            )
          }
          console.log(this.sliderData,'8888888888888888888888888888888888888888888')
          setTimeout(() => {
            this.$refs.topSwiper.swiper.init()
          this.$refs.thumbSwiper.swiper.init()
          }, 0)
        }
      })
    // })
    // setTimeout(() => {
    //   this.$refs.topSwiper.swiper.slideTo(3, 1000, false)
    // }, 2000)
  },
  methods: {
    formatphoto(item) {
      return systemManage.getApi(item)
    }
  }
}
</script>

<style>
.wrap {
  width: 700px;
  height: 600px;
  position: relative;
}
.hobbiesDetailSwiper .swiper-container {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}
.hobbiesDetailSwiper .swiper-slide {
  background-size: cover;
  background-position: center;
}
.hobbiesDetailSwiper .gallery-top {
  height: 80%;
  width: 100%;
}
.hobbiesDetailSwiper .gallery-thumbs {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
  margin-top: 50px;
}
.hobbiesDetailSwiper .gallery-thumbs .swiper-slide {
  height: 51px;
  opacity: 0.4;
}
.hobbiesDetailSwiper .gallery-thumbs .normal-active,
.hobbiesDetailSwiper .gallery-thumbs .swiper-slide-thumb-active {
  opacity: 1;
}
.wrap img {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.hobbiesDetailSwiper .gallery-thumbs .swiper-slide {
  width: 68.88889px !important;
}
.hobbiesDetailSwiper .swiper-button-next {
  background-size: 100% 100%;
  width: 51px;
  height: 77px;
  outline: none;
}
.hobbiesDetailSwiper .swiper-button-prev {
  background-size: 100% 100%;
  width: 51px;
  height: 77px;
  outline: none;
}
.hobbiesDetailSwiper .swiper-button-next {
  background: url('~static/detail/right.png') !important;
}
.hobbiesDetailSwiper .swiper-button-prev {
   background: url('~static/detail/left.png') !important;
}
</style>
