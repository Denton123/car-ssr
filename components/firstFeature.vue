<template>
  <div id="firstFeature">
    <div class="feature">
      <div class="tabsContent">
        <div class="swiper-container firstTabsSwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="(item,index) in bannerData"
              :key="index">
              <a :href="$replaceDetailUrl(item.url)"
                target="_blank">
                <img :src='$ImgUrlRelative(piectFeatureUrl(item))'
                  :alt="item.title">
                <!-- 多个轮播数据的专栏遮罩层 -->
                <div class="feature_Wrap">
                </div>
                <img class="bannerBottomIcon"
                  src="~static/images/car_left.png">
                <strong class="bannerFeatureTitle">{{item.title}}</strong>
              </a>
            </div>
          </div>
        </div>
        <!-- 轮播指示点 -->
        <div class="feature_indicator_wrap">
          <ul class="indicators">
            <li @mouseenter="setItem(index)"
              v-for="(item,index) in bannerData.length"
              :key="index">
              <div :class="indicatorIndex === index?'indicatorsActive':''"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import systemManage from '@/http/photoApi'

export default {
  name: 'firstFeature',
  props: ['bannerData'],
  data: function() {
    return {
      firstTabsSwiper: '',
      indicatorIndex: ''
    }
  },
  components: {},
  methods: {
    //专栏的图片拼接
    piectFeatureUrl(item) {
      if(item.photo.indexOf('http:') >= 0 || item.photo.indexOf('/image') >= 0){
        return item.photo
      }
      return systemManage.getApi(item.photo)
    },
    setItem(index) {
      this.firstTabsSwiper.slideTo(index, 500, true)
      this.indicatorIndex = index
    }
  },
  mounted() {
    let _this = this
    var firstTabsSwiper = new Swiper('.firstTabsSwiper', {
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      // loop: this.bannerData[0].photoLinks.length >=2 ?true :false,
      loop: true,
      slidesPerView: 'auto',
      loopedSlides: this.bannerData.length,
      // loopedSlides: 2,
      centeredSlides: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      on: {
        slideChange: function() {
          _this.indicatorIndex = this.realIndex
        }
      }
    })
    this.firstTabsSwiper = firstTabsSwiper

    // 设置专栏轮播起初的高亮点
    this.indicatorIndex = 0
  }
}
</script>
<style>
#firstFeature .feature {
  width: 320px;
  background-color: white;
  /* padding-top: 63px; */
  padding-bottom: 58px;
  overflow: hidden;
}
#firstFeature .feature .feature_indicator_wrap {
  width: 100%;
  height: 14px;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  bottom: 10px;
}
#firstFeature .feature .indicators {
  position: absolute;
  list-style: none;
  height: 9px;
  z-index: 3;
  display: flex;
  justify-content: center;
}
#firstFeature .feature .indicators li {
  height: 9px;
  display: inline-block;
  padding-right: 10px;
  transform: rotateZ(45deg);
  cursor: pointer;
}
#firstFeature .feature .indicators li div {
  width: 8px;
  height: 8px;
  outline: 0;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border: 1px solid rgba(255, 255, 255, 1);
  /* margin-right: 4px; */
}
#firstFeature .feature .indicatorsActive {
  background: rgba(190, 0, 30, 1);
  border: 1px solid #bd081e !important;
}

#firstFeature .feature .tabsContent {
  width: 100%;
  height: 180px;
  margin-top: 31px;
  position: relative;
}
#firstFeature .feature .tabsContent.showActive {
  display: block;
}
#firstFeature .firstTabsSwiper {
  width: 100%;
  height: 180px;
}
#firstFeature .feature .swiper-slide {
  position: relative;
  width: 320px !important;
  height: 100%;
  background: url('~static/common/default.png');
  background-color: #e7e7e7;
  background-repeat: no-repeat;
  background-position: center;
}
#firstFeature .feature .swiper-slide img {
  width: 320px;
  height: 180px;
  object-fit: cover;
}
#firstFeature .feature_Wrap {
  position: absolute;
  bottom: -1px;
  width: 320px;
  z-index: 2;
  height: 50px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
#firstFeature .bannerBottomIcon {
  width: 23px !important;
  height: 50px !important;
  position: absolute;
  bottom: -1px;
  left: 0;
  z-index: 3;
}
#firstFeature .bannerFeatureTitle {
  width: 200px;
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 14px;
  left: 28px;
  z-index: 3;
}
</style>

