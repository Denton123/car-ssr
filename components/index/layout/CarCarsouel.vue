<template>
  <div class="indexCarousel">
    <el-carousel :interval="4000"
      :height="fHeight"
      @change="changeCarousel">
      <el-carousel-item v-for="(item, index) in data"
        :key="index">
        <div class="car_carsouel">
          <div class="footer_left">
            <strong v-text="item.title"></strong>
          </div>
          <a :href="item.linkurl"
            class="car_carsouel_a">
            <img :src="item.url"
              :alt="item.title"
              width="100%"
              height="100%">
            <div class="car_footer clearfix"></div>

            <img src="../images/car_left.png"
              alt="样式"
              width="37px"
              height="76px"
              class="car_left">
            <!-- <ul class="car_ul">
              <li v-for="child in data.length"
                :key="child"
                :class="{'active': child == activeIndex+1}">
              </li>
            </ul> -->
          </a>

        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import utils from '@/http/url'
export default {
  name: 'CarCarsouel',
  props: {
    height: {
      type: String,
      default: '450px'
    },
    list: {
      type: Array
    }
  },
  computed: {
    fHeight: function() {
      return this.height
    },
    data: function() {
      let list = this.list == null ? [] : this.list
      let result = list.map(item => {
        if (item.url !== '' && item.url != null) {
          item.url = utils.getApi(item.url)
        }
        return item
      })
      return result
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    changeCarousel(index) {
      let url = null
      if (this.data[index] != null) {
        url = this.data[index].url
        this.activeIndex = index
      }
      this.$emit('change', url)
    }
  },
  mounted() {
    if (this.data[0] == null) {
      this.$emit('change', null)
    } else {
      this.$emit('change', this.data[0].url)
    }
  }
}
</script>
<style>
.car_carsouel {
  height: 100%;
  position: relative;
}

.car_carsouel_a {
  display: block;
  height: 100%;
}

.car_carsouel .car_footer {
  position: absolute;
  width: 100%;
  height: 76px;
  bottom: 0px;
  left: 0px;
  background-color: black;
  opacity: 0.5;
}

.car_carsouel .footer_left {
  color: #fff;
  line-height: 76px;
  font-size: 0px;
  height: 76px;
  bottom: 0;
  left: 0;
  z-index: 99;
  position: absolute;
}

.car_carsouel .footer_left img {
  vertical-align: top;
  opacity: 1;
  position: absolute;
  top: 0;
  left: 0;
}

.car_carsouel .footer_left strong {
  font-size: 24px;
  padding-left: 70px;
  /* letter-spacing: 5px; */
}

.car_carsouel .car_left {
  position: absolute;
  bottom: 0;
  left: 0;
}

.car_carsouel .car_ul {
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.car_carsouel .car_ul li {
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url('../images/carous_white.png') no-repeat;
  background-size: 14px 14px;
  padding-right: 10px;
}

.car_carsouel .car_ul .active {
  background: url('../images/carous_red.png') no-repeat;
}
.indexCarousel .el-carousel__indicators {
  left: auto;
  bottom: 19px;
  right: -8px;
}
.indexCarousel .el-carousel__indicators .el-carousel__button {
  width: 14px;
  height: 14px;
  background: url('../images/carous_white.png') no-repeat;
  background-size: 14px 14px;
}
.indexCarousel .el-carousel__indicator.is-active button {
  background: url('../images/carous_red.png') no-repeat;
}
.indexCarousel .el-carousel__button {
  opacity: 1;
}
</style>
