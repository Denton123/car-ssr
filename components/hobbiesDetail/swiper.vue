<template>
  <div class="wrap hobbiesDetailSwiper"
    style="position: relative;">
    <swiper :options="galleryTop" ref="topSwiper">
      <div class="swiper-wrapper">
      </div>
    </swiper>
    <div class="swiper-button-next"
      style="position:absolute;top:77.5%;left:47.3%;width: 51px;height: 77px;"></div>
    <div class="swiper-button-prev"
      style="background: url(~static/detail/left.png);position:absolute;top:77.5%;left:40%;width: 51px;height: 77px;"></div>
    <swiper :options="galleryThumbs"
      style="margin-top: 50px;" ref="thumbSwiper">
      <div class="swiper-wrapper">
      </div>
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

export default {
  name: 'test',
  data() {
    return {
      // num: '',
      sliderData: [],
      galleryTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 9, //looped slides should be the same
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      galleryThumbs: {
        spaceBetween: 10,
        slidesPerView: 9,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 9, //looped slides should be the same
        slideToClickedSlide: true,
        slideActiveClass: 'normal-active',  
        centeredSlides: true // 居中
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
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$route)
      $get(webHobbiesDetailInfo, { hobbiesId: this.$route.params.id}).then(res => {
        let photoList = res.data.result_data.hobbies.photoList
        if (photoList.length !== 0) {
          this.sliderData = photoList
          for (let i = 0; i < photoList.length; i++) {
            let imgUrl = this.formatphoto(photoList[i].photo)
            $('.swiper-wrapper').append(
              `<swiper-slide><img src="${imgUrl}"></swiper-slide>`
            )
            console.log('1122222222222')
          }
          var length = this.sliderData.length
          if (length == 9) {
            let galleryTop = new Swiper('.gallery-top', {
              spaceBetween: 10,
              loop: true,
              loopedSlides: 9, //looped slides should be the same
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }
            })
            let galleryThumbs = new Swiper('.gallery-thumbs', {
              spaceBetween: 10,
              slidesPerView: 9,
              touchRatio: 0.2,
              loop: true,
              loopedSlides: 9, //looped slides should be the same
              slideToClickedSlide: true,
              slideActiveClass: 'normal-active',  
              centeredSlides: true // 居中
            })
            galleryTop.controller.control = galleryThumbs
            galleryThumbs.controller.control = galleryTop
            galleryTop.init()
            galleryThumbs.init()
          } else {
            var thumbsSwiper = new Swiper('.gallery-thumbs', {
              spaceBetween: 10,
              slideThumbActiveClass: 'thumb-active',
              touchRatio: 0,
              watchSlidesVisibility: true //防止不可点击
            })
            var thumbsTopSwiper = new Swiper('.gallery-top', {
              spaceBetween: 10,
              loop: length == 1 ? false : true,
              touchRatio: 0.5,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              thumbs: {
                swiper: thumbsSwiper
              }
            })
            thumbsSwiper.init()
            thumbsTopSwiper.init()
          }
        }
      })
    })
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
