<template>
  <div class="wrap hobbiesDetailSwiper"
    style="position: relative;">
    <swiper v-if="sliderData&& sliderData.length >= 1" :options="galleryTop" ref="topSwiper"  class="swiper-container gallery-top">
      <!-- <div class="swiper-wrapper">
      </div> -->
    </swiper>
    <div class="swiper-button-next"
      style="position:absolute;top:77.5%;left:47.3%;width: 51px;height: 77px;"></div>
    <div class="swiper-button-prev"
      style="background: url(~static/detail/left.png);position:absolute;top:77.5%;left:40%;width: 51px;height: 77px;"></div>
    <swiper  :options="galleryThumbs"
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
// import $ from 'jquery'


export default {
  name: 'test',
  // components: {
  //   swiper,
  //   swiperSlide
  // },
  data() {
    return {
      // num: '',
      galleryThumbs: {
              slidesPerView: 'auto',
              slideActiveClass:'normal-active',
              spaceBetween:10,
              loop: this.sliderData && this.sliderData.length ==9 ? true : false,
              slideToClickedSlide:true,
              centeredSlides:true,
              loopedSlides:this.sliderData && this.sliderData.length,
              // observer:true,
              // observeParents:true,
              init: false,  //延迟初始化
      },
      galleryTop: {        
              // notNextTick: true,
              spaceBetween: 10,
              loop: this.sliderData && this.sliderData.length == 9 ? true : false,
              // loop:true,
              loopedSlides:this.sliderData && this.sliderData.length,
              slidesPerView: 1,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              init: false,  //延迟初始化
              thumbs: {
                swiper: this.$refs.thumbSwiper,
              }
            },
    }
  },
  props: {
    sliderData: {
      type: Array,
      required: true
    }
  },
  computed: {},
  mounted() {
    console.log(this.sliderData,'sliderData----->')
    console.log(this.sliderData.length,'length----->')
      for (let i = 0; i < this.sliderData.length; i++) {
              let imgUrl = this.formatphoto(this.sliderData[i].photo)
              $('.swiper-wrapper').append(
                `<swiper-slide class="swiper-slide"><img src="${imgUrl}"></swiper-slide>`
              )
      }
      setTimeout(() => {
        this.$refs.topSwiper.swiper.init()
        this.$refs.thumbSwiper.swiper.init()
      }, 0)
      this.$refs.topSwiper.swiper.controller.control = this.$refs.thumbSwiper.swiper
      this.$refs.thumbSwiper.swiper.controller.control = this.$refs.topSwiper.swiper
    // this.$nextTick(() => {
      // console.log(this.$route)
      // $get(webHobbiesDetailInfo, { hobbiesId: this.$route.params.id}).then(res => {
      //   let photoList = res.data.result_data.hobbies.photoList
      //   if (photoList.length !== 0) {
      //     this.sliderData = photoList
      //     // this.$forceUpdate()
      //     for (let i = 0; i < photoList.length; i++) {
      //       let imgUrl = this.formatphoto(photoList[i].photo)
      //       $('.swiper-wrapper').append(
      //         `<swiper-slide class="swiper-slide"><img src="${imgUrl}"></swiper-slide>`
      //       )
      //     }
      //     console.log(this.sliderData,'8888888888888888888888888888888888888888888')
      //     setTimeout(() => {
      //       this.$refs.topSwiper.swiper.init()
      //     this.$refs.thumbSwiper.swiper.init()
      //     }, 0)
      //   }
      // })
    // })
    // setTimeout(() => {
    //   this.$refs.topSwiper.swiper.slideTo(3, 1000, false)
    // }, 2000)
  },
  methods: {
    formatphoto(item) {
      return systemManage.getApi(item)
    }
  },

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
  object-fit: contain;
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
