<template>
  <div id="bannerOfFeature">
    <div class="block">
      <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
      <el-carousel height="236px"
        width="320px"
        class="todayBanner"
        ref="carousel"
        @change="itemChange">
        <el-carousel-item :interval="4000"
          v-for="(item, index) in bannerData"
          class="todayCarousel"
          :key="index">
          <div class="car_carsouel">
            <a :href="item.url">
              <img :src="bannerData&&bannerData.length != null?piectFeatureUrl(item.photo):''"
                :alt='`${bannerData[index].title}`'
                width="100%"
                height="100%"
                @error="imgFeatureLossLoad(item)"
                @load="imgFeatureSeccessLoad()">
              <!-- 没图片或加载不出来，展示默认图片 -->
              <div class="defaultBox"
                v-if="imgFeatureLoadStatus == false&& index == imgFeatureLossIndex">
                <img src="/static/common/default.png"
                  alt="尖峰咖">
              </div>
            </a>
            <!-- 多个轮播数据的专栏遮罩层 -->
            <div class="feature_titleWrap">
            </div>
            <img class="bannerBottomIcon"
              src="/static/images/car_left.png">
            <strong class="bannerFeatureTitle">{{bannerData[index].title}}</strong>
          </div>
          <!-- <img :src="`${item[0].photoLinks[0].url}`"> -->
        </el-carousel-item>
        <ul class="carousel_indicators">
          <li v-for="(item, index) in bannerData.length"
            @mouseenter="setItem(index)"
            :key="index">
            <div :class="indicatorIndex === index?'indicatorsActive':''"></div>
          </li>
        </ul>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import systemManage from '@/http/url'
// import { $get } from "@/http/ajax.js"
export default {
  name: 'bannerOfFeature',
  props: { bannerData: '' },
  data: function() {
    return {
      indicatorIndex: 0,
      autoplay: true,
      imgFeatureLoadStatus: true,
      imgFeatureLossIndex: ''
    }
  },

  methods: {
    piectFeatureUrl(photoUrl) {
      return systemManage.getApi(photoUrl)
    },
    setItem(index) {
      this.$refs.carousel.setActiveItem(index)
      this.indicatorIndex = index
    },
    itemChange: function(NewIndex, OldIndex) {
      this.indicatorIndex = NewIndex
    },
    // 判断专栏的图片是否加载成功，若失败则执行的方法
    imgFeatureLossLoad(item) {
      this.imgFeatureLossIndex =
        this.bannerData != null && this.bannerData.indexOf(item)
      this.imgFeatureLoadStatus = false
    },
    // 判断专栏的图片是否加载成功，若成功则执行的方法
    imgFeatureSeccessLoad() {
      this.imgFeatureLoadStatus = true
    }
  },
  mounted() {}
}
</script>
<style>
.todayBanner .el-carousel__indicators {
  display: none;
}
.carousel_indicators {
  position: absolute;
  list-style: none;
  bottom: 0;
  right: 5%;
  margin: 0;
  padding: 0;
  z-index: 3;
}
.carousel_indicators li {
  display: inline-block;
  background-color: transparent;
  padding: 12px 4px;
  cursor: pointer;
}
.carousel_indicators li div {
  display: block;
  /* opacity: 0.48; */
  width: 8px;
  height: 8px;
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  transform: rotateZ(45deg);
  border: 1px solid white;
  margin-right: 5px;
}
.block {
  width: 320px;
  margin-top: 25px;
  margin-left: -20px;
}
.todayCarousel h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.todayCarousel .car_carsouel {
  height: 100%;
  position: relative;
}
.todayCarousel .car_carsouel a > img {
  position: absolute;
  z-index: 1;
}
.todayCarousel .defaultBox {
  width: 320px;
  height: 236px;
  position: absolute;
  z-index: 2;
  line-height: 236px;
}
.todayCarousel:nth-child(2n) {
  background-color: #99a9bf;
}

.todayCarousel:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.todayCarousel img {
  background-size: cover;
}
.indicatorsActive {
  background-color: #bd081e;
  border: 1px solid #bd081e !important;
}
.todayCarousel .car_carsouel .feature_titleWrap {
  position: absolute;
  bottom: -1px;
  width: 320px;
  z-index: 2;
  height: 50px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.5;
}
.todayCarousel .car_carsouel .bannerBottomIcon {
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
}
.todayCarousel .car_carsouel .bannerFeatureTitle {
  height: 18px;
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 21px;
  left: 28px;
  z-index: 3;
}
</style>