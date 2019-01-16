<template>
  <div class="hot_news">
    <div class="hot_news_container clearfix">
      <div class="container_left">
        <div class="left_header">
          <span class="header_bg"></span>
          <div class="news">热点资讯</div>
        </div>
        <div class="left_content"
          v-if="newsObj.hotTime">
          <car-card :cardData="newsObj.hotTime[0]"
            v-if="newsObj.hotTime[0]"
            cardType="hots"></car-card>
          <car-card class="right_car"
            v-if="newsObj.hotTime[1]"
            :cardData="newsObj.hotTime[1]"
            cardType="hots"></car-card>
        </div>
      </div>
      <div class="container_right">
        <div class="content">
          <div class="right-title">最热文章</div>
          <a href="http://www.acura.com.cn/rdx/special/?mz_ca=2106651&mz_sp=7K9Bh&mz_sb=1"
            target="_blank">
            <div class="right_Adver">
              <img src="../images/hotNews.jpg"
                alt="广告图片"
                width="100%"
                height="100%">
            </div>
          </a>
          <a href="http://www.acura.com.cn/rdx/special/?mz_ca=2106651&mz_sp=7K9Bh&mz_sb=1"
            target="_blank">
            <div class="right_Adver_name">全新RDX狂热登场</div>
          </a>

          <div class="right_border"></div>
          <div class="right_list">
            <ul>
              <li v-for="(item, index) in newsObj.click"
                :key="index">
                <a :href="`/pc/hots/detail/${item.id}/1`"
                  class="item_title">{{item.title}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CarCard from '@/components/CarCard'
import { $get } from '@/http/ajax'
import { webEssayGethoteassy } from '@/http/api'
export default {
  name: 'HotNews',
  components: {
    'car-card': CarCard
  },
  // data() {
  //   return {
  //     newsObj: {} // 最新资讯
  //   }
  // },
  props: {
    newsObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.$nextTick(async () => {
      // let hotNews = this.getHotNews()
      // this.newsObj = await hotNews
      // if (Array.isArray(this.newsObj.click)) {
      //     // 数据大于4条只取前4
      //     if (this.newsObj.click.length > 4) {
      //       this.newsObj.click = this.newsObj.click.slice(0, 4)
      //     } else {
      //       this.newsObj.click = this.newsObj.click
      //     }
      //   } else {
      //     this.newsObj.click = []
      //   }
        if (Array.isArray(this.newsObj.hotTime)) {
          this.newsObj.hotTime.forEach(v => {
            v.classOneName = v.classOneName.toLowerCase()
            if (v.classOneName.toLowerCase() == 'news') {
              v.classOneName = '今日车闻'
            } else if (v.classOneName.toLowerCase() == 'video') {
              v.classOneName = '视频'
            } else if (v.classOneName.toLowerCase() == 'ev') {
              v.classOneName = '新能源'
            } else {
              v.classOneName = '兴趣部落'
            }
          })
        } else {
          this.newsObj.hotTime = []
        }
    })
  },
  methods: {
    // 获取最热的5篇文章和点击量最多的10篇文章
    // async getHotNews() {
    //   let result = {}
    //   try {
    //     let data = await $get(webEssayGethoteassy)
    //     let dataObj = data.data
    //     if (Array.isArray(dataObj.click)) {
    //       // 数据大于4条只取前4
    //       if (dataObj.click.length > 4) {
    //         result.click = dataObj.click.slice(0, 4)
    //       } else {
    //         result.click = dataObj.click
    //       }
    //     } else {
    //       result.click = []
    //     }
    //     if (Array.isArray(dataObj.hotTime)) {
    //       result.hotTime = dataObj.hotTime
    //       result.hotTime.forEach(v => {
    //         v.classOneName = v.classOneName.toLowerCase()
    //         if (v.classOneName.toLowerCase() == 'news') {
    //           v.classOneName = '今日车闻'
    //         } else if (v.classOneName.toLowerCase() == 'video') {
    //           v.classOneName = '视频'
    //         } else if (v.classOneName.toLowerCase() == 'ev') {
    //           v.classOneName = '新能源'
    //         } else {
    //           v.classOneName = '兴趣部落'
    //         }
    //       })
    //       console.log(result.hotTime)
    //     } else {
    //       result.hotTime = []
    //     }
    //   } catch (err) {
    //     console.log(err)
    //     result.click = []
    //     result.hotTime = []
    //   }
    //   return result
    // }
  }
}
</script>
<style>
.hot_news {
  display: flex;
  justify-content: center;
  margin-left: 10px;
  margin-top: 20px;
}

.hot_news .hot_news_container {
  width: 1200px;
  box-sizing: border-box;
  position: relative;
  padding-right: 390px;
}

.hot_news .hot_news_container .container_left {
  /* margin-right: 10px; */
}

.hot_news .left_header {
  height: 27px;
  font-size: 0px;
}

.hot_news .left_header .header_bg {
  display: inline-block;
  width: 8px;
  height: 27px;
  float: left;
  background: url('../images/hot_news.png') no-repeat;
}

.hot_news .left_header .news {
  height: 100%;
  display: inline-block;
  font-size: 22px;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 27px;
  margin-left: 15px;
}

.hot_news .left_content {
  margin-top: 20px;
  font-size: 0px;
}

.hot_news .left_content .right_car {
  margin-left: 30px;
}

.hot_news .hot_news_container .container_right {
  position: absolute;
  width: 370px;
  height: 447px;
  right: 0;
  top: 0;
  box-sizing: border-box;
  background: url('../images/red_bg.png') no-repeat right bottom;
  background-size: 95% 90%;
}

/* .hot_news .hot_news_container .container_right:hover {
  background: url('../images/red_bg.png') no-repeat right bottom;
} */

.hot_news .hot_news_container .container_right .content {
  width: 360px;
  height: 437px;
  padding: 0px 25px 0px 25px;
  box-sizing: border-box;
  background-color: #fff;
}
.hot_news .right-title {
  padding: 20px 0px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 18px;
}

.hot_news .right_Adver {
  height: 174px;
  background-color: #000;
}

.hot_news .right_Adver img {
  display: block;
}

.hot_news .right_Adver_name {
  text-align: center;
  margin: 20px 0px 16px 0px;
  height: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  line-height: 11px;
}

.hot_news .right_border {
  height: 4px;
  background: url('../images/divider.png') no-repeat 0px 0px;
}

.hot_news .right_list ul {
  font-size: 0px;
  color: #888888;
}

.hot_news .right_list ul li {
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  padding-left: 20px;
  width: 100%;
  background: url('../images/dl.png') no-repeat 0 center;
}

.hot_news .right_list ul li:hover {
  background: url('../images/dl_hover.png') no-repeat 0 center;
}

.hot_news .item_title {
  color: #888888;
  font-size: 16px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot_news .item_title:hover {
  color: #be001e;
}
</style>
