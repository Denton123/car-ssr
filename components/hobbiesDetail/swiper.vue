<template>
  <div class="wrap hobbiesDetailSwiper"
    style="position: relative;">
    <!-- 如果是一张图片，充满整个容器 -->
     <!-- <swiper v-if="sliderData&& sliderData.length >= 1" :options="galleryTop" ref="topSwiper"  class="swiper-container gallery-top">
    </swiper> -->
    <div class="swiper-button-next" v-if="sliderData&& sliderData.length > 1 "
      style="position:absolute;top:41%;width: 50px;height: 77px;transform: translateY(-50%);" @click="next()"></div>
    <div class="swiper-button-prev" v-if="sliderData&& sliderData.length > 1 "
      style="background: url(~static/detail/left.png);position:absolute;top:41%;width: 50px;height: 77px;transform: translateY(-50%);" @click="prev()"></div>
     <!-- <swiper v-if="sliderData&& sliderData.length > 1 " :options="galleryThumbs"  style="margin-top: 50px;" ref="thumbSwiper"  class="swiper-container gallery-thumbs"> -->
    <!-- </swiper>  -->
    <div v-swiper:mySwiper="galleryTop" v-if="sliderData&& sliderData.length >= 1" ref="topSwiper"   class="swiper-container gallery-top">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, key) in sliderData" :key="key">
            <img :src="$ImgUrlRelative(formatphoto(item.photo))" alt="尖锋咖">
          </div>
      </div>
          <!-- <div class="swiper-button-next"
            style="position:absolute;top:77.5%;left:47.3%;width: 51px;height: 77px;"></div>
          <div class="swiper-button-prev"
          style="background: url(~static/detail/left.png);position:absolute;top:77.5%;left:40%;width: 51px;height: 77px;"></div> -->
    </div>

    <div v-if="sliderData&& sliderData.length > 1 "  v-swiper:mySwiper2="galleryThumbs" style="margin-top: 50px;" ref="thumbSwiper"  class="swiper-container gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, key) in sliderData" :key="key" @click="thumbClick()">
          <img :src="$ImgUrlRelative(formatphoto(item.photo))" alt="尖锋咖">
        </div>
      </div>
    </div>
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
              notNextTick: true,
              slidesPerView: 'auto',
              slideActiveClass:'normal-active',
              spaceBetween:10,
              loop: this.sliderData && this.sliderData.length ==9 ? true : false,
              slideToClickedSlide:true,
              centeredSlides:true,
              loopedSlides:this.sliderData && this.sliderData.length,
              observer:true,
              observeParents:true,
              init: false,  //延迟初始化
      },
      galleryTop: {
              notNextTick: true,
              spaceBetween: 10,
              loop: this.sliderData && this.sliderData.length == 9 ? true : false,
              // loop:true,
              loopedSlides:this.sliderData && this.sliderData.length,
              slidesPerView: 1,
              observer:true,
              observeParents:true,
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              observer:true,
              observeParents:true,
              init: false,  //延迟初始化
              // thumbs: {
              //   swiper: this.$refs.thumbSwiper,
              // }
            },
    }
  },
  props: {
    sliderData: {
      type: Array,
      required: true
    }
  },
  computed: {
  },
  mounted() {
    let defaultHeight = $('.swiper-slide:eq(0)').css('height')
     $('.gallery-top').css('height', defaultHeight)
      // for (let i = 0; i < this.sliderData.length; i++) {
          // let imgUrl = this.formatphoto(this.sliderData[i].photo)
        // 不知为何，这里会重复执行两次，所以下面的append会执行两次，就会出现double数量的图片，因此加上了判断
      //     if($('.swiper-wrapper')[1] && $('.swiper-wrapper')[1].childElementCount < this.sliderData.length){  //多张图片的情况
      //         $('.swiper-wrapper').append(
      //           `<swiper-slide class="swiper-slide"><img src="${imgUrl}"></swiper-slide>`
      //         )
      //     }else if(!$('.swiper-wrapper')[1] && $('.swiper-wrapper')[0].childElementCount < this.sliderData.length){ //一张图片的情况
      //         $('.swiper-wrapper').append(
      //           `<swiper-slide class="swiper-slide"><img src="${imgUrl}"></swiper-slide>`
      //         )
      //     }
      // }
                    // $('.swiper-wrapper').append(
                // `<swiper-slide class="swiper-slide"><img src="${imgUrl}"></swiper-slide>`
              // )
      // }
      //  this.$refs.topSwiper && this.$refs.topSwiper.swiper.init()
      //  this.$refs.thumbSwiper && this.$refs.thumbSwiper.swiper.init()

      // if( this.$refs.topSwiper && this.$refs.thumbSwiper){
      //   this.$refs.topSwiper.swiper.controller.control = this.$refs.thumbSwiper.swiper
      //   this.$refs.thumbSwiper.swiper.controller.control = this.$refs.topSwiper.swiper
      // }
      this.mySwiper && this.mySwiper.init()
       this.mySwiper2 && this.mySwiper2.init()

      if( this.mySwiper && this.mySwiper2){
        this.mySwiper.controller.control = this.mySwiper2
        this.mySwiper2.controller.control = this.mySwiper
        // console.log(this.mySwiper)
        document.onkeydown = function(e) {
          if (e.keyCode == 37) {
            $('.swiper-button-prev').click()
          }
          if (e.keyCode == 39) {
            $('.swiper-button-next').click()
          }
        }
      }


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
      if(item.indexOf('http:') >= 0 || item.indexOf('/image') >= 0){
        return item
      }
      return systemManage.getApi(item)
    },
    // 点击右箭头自适应高度
    next() {
      $('.gallery-top').css('height', 'auto')
      let imgHeight = $('.swiper-slide-active').next().css('height')
      $('.gallery-top').css('height', imgHeight)
    },
    // 点击左箭头自适应高度
    prev() {
      $('.gallery-top').css('height', 'auto')
      let imgHeight = $('.swiper-slide-active').prev().css('height')
      $('.gallery-top').css('height', imgHeight)
    },
    // 点击当前图片自适应高度
    thumbClick(){
      $('.gallery-top').css('height', 'auto')
      let currentHeight = $('.swiper-slide-active').css('height')
      $('.gallery-top').css('height', currentHeight)
    }
  },

}
</script>

<style>
.wrap {
  width: 700px;
  /* height: 600px; */
  position: relative;
}
.hobbiesDetailSwiper .swiper-container {
  width: 100%;
  /* height: 300px; */
  margin-left: auto;
  margin-right: auto;
}
.hobbiesDetailSwiper .swiper-slide {
  background-size: cover;
  background-position: center;
}
.hobbiesDetailSwiper .gallery-top {
  /* height: 80%; */
  width: 100%;
}
.hobbiesDetailSwiper .gallery-thumbs {
  height: auto;
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
.hobbiesDetailSwiper .gallery-top img {
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
