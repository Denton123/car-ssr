<template>
  <div class="search_wrapper">
    <div class="search_header">
      <Header></Header>
    </div>
    <div class="search_content">
      <div class="search_input_nav">
        <el-input v-model="tempContent"></el-input><button class="search_btn"
                                                             @click="search">搜索</button>
      </div>
      <div class="search_main_content">
        <div class="search_main_nav">
          <p class="search_title"><i class="img"></i>搜索<span class="redColor">“{{searchContent}}”</span>的结果</p>
        </div>
        <div class="search_list">
          <div class="search_list_left">
            <ul>
              <li v-if="!pageObj.totalCount"
                  class="seacr_no">暂时没有该类文章</li>
              <li v-for="(eassy, index) in eassyListUrl"
                  :key="index"
                  class="search_list_left_li"
                  @click="toArticleOrHobbiesDetail(eassy)">
                <div class="
                img_wrapper">
                  <img :src="$ImgUrlRelative(eassy.essayPhoto)"
                       :alt="eassy.title">
                </div>
                <div class="search_item">
                  <p class="search_title"
                     v-if="eassy.title !== 'hobbies'"
                     v-html="eassy.title"></p>
                  <div class="search_line">
                    <span class="one"></span><span class="two"></span>
                  </div>
                  <div class="des"
                       v-html="eassy.digest">
                  </div>
                  <div class="userMsg">
                    <div class="avatar"
                         @click.stop="toBloger(eassy.userId)">
                      <div>
                        <img :src="$ImgUrlRelative(eassy.userPhoto)"
                            :alt="eassy.userName&&eassy.userName" >
                        <span class="name">{{eassy.userName&&eassy.userName}}</span>
                      </div>
                      <span class="search_line">|</span>
                    </div>
                    <div class="channel">{{eassy.className}}</div>
                    <div class="time"
                         v-text="formatData(eassy.createTime)"></div>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination v-if="pageObj.totalCount"
                           background
                           @current-change="handleCurrentChange"
                           :current-page="pageObj.currPage"
                           layout="prev, pager, next"
                           prev-text="上一页"
                           next-text="下一页"
                           :page-count="pageObj.totalPage"
                           :page-size="6"
                           :total="pageObj.totalCount">
            </el-pagination>
          </div>
          <div class="search_list_right">
            <ul class="search_list_ul">
              <li class="search_ad">
                <!-- img src="../../../assets/picture/x1.png"
                  alt="广告图片"> -->
                <div id="search_ad_1"></div>
                <div class="ad_des">广告</div>
              </li>
              <li class="search_ad">
                <div id="search_ad_2"></div>
                <div class="ad_des">广告</div>
              </li>
              <li class="search_ad">
                <div id="search_ad_3"></div>
                <div class="ad_des">广告</div>
              </li>
              <li class="search_ad">
                <div id="search_ad_4"></div>
                <div class="ad_des">广告</div>
              </li>
            </ul>
            <div class="rank"
                 :style="{paddingLeft: '30px'}">
              <el-tabs v-model="activeName"
                       @tab-click="changType">
                <el-tab-pane label="周排行榜"
                             name="weekRank"
                             class="weekRank">
                  <ul>
                    <li v-for="(item, index) in WeekendRank"
                        :key="index"
                        @click="toArticleDetail(item.essayId)">
                      <p class="search_p"><span :class="[isAddBg(index), 'normal']">{{index + 1}}</span><span class="des">{{item.title}}</span></p>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="月排行榜"
                             class="monthRank"
                             name="monthRank">
                  <ul>
                    <li v-for="(month, index) in MonthRank"
                        :key="index"
                        @click="toArticleDetail(item.essayId)">
                      <p class="search_p"><span :class="[isAddBg(index), 'normal']">{{index + 1}}</span> <span class="des">{{month.title}}</span></p>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
              <div class="moreRank"
                   @click="toRank"><span>更多></span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="advertise_wrapper">
        <div id="other_long_ad"></div>
        <div class="ad_des">广告</div>
      </div>
    </div>
    <div class="search-footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import { $post, $get } from '@/http/ajax'
  import systemManage from '@/http/url'
  import { detailsObj } from '@/utils/defaultConfig.js'
  import {
    webEssayList,
    webTagAboutList,
    webSearch,
    webEssayGetWeekendRank,
    webEssayGetMonthRank
  } from '@/http/api'
  export default {
    name: 'search',
    metaInfo: {
      // 设置 title
      title: 'search列表',
      // 设置 meta
      meta: [
        {
          name: 'keyWords',
          content: 'vue '
        }
      ],
      // 设置 link
      link: [
        {
          rel: 'asstes',
          href: 'https://assets-cdn.github.com/'
        }
      ]
    },
     asyncData(content) {
       /* 默认参数 */
    let defaultParams = {
        pageSize: '12',
        pageNo: '1'
      }
    defaultParams.pageNo = content.params.pageNo || '1'
    let searchContent = content.params.searchContent
    // console.log(searchContent)
    return{
      defaultParams,
      searchContent
    }
  },
    mounted() {
      this.createAdPicture()
      this.getEssaylist()
      this._getWeekendRank_()
      this._getMonthRank_()
    },
    data() {
      return {
        activeName: 'weekRank',
        searchObj: {},
        eassyList: [],
        pageObj:{},
        WeekendRank: [],
        MonthRank: [],
        preRouteObj: {},
        currentRouteObj: {},
        tempContent: '',
        type: 'w',
        detailsObj
      }
    },
    beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      // console.log(to, from)
      next(vm => {
        vm.searchContent = to.params.searchContent
        vm.preRouteObj = { path: from.fullPath, name: from.meta.title }
        vm.currentRouteObj = { path: to.fullPath, name: to.meta.title }
      })
    },
    computed: {
      // 拼接list里面的头像的地址
      eassyListUrl() {
        return this.eassyList.map(item => {
          item.essayPhoto = item.essayPhoto.indexOf('http:') >= 0 ? item.essayPhoto : systemManage.getApi(item.essayPhoto)
          item.userPhoto = item.userPhoto.indexOf('http:') >= 0 ? item.userPhoto : systemManage.getApi(item.userPhoto)
          return item
        })
      }
    },
    methods: {
      isAddBg(i) {
        if (i < 3) {
          return 'search_special'
        } else {
          return ''
        }
      },
      toBloger(id) {
        this.$router.push(`/bloger/${id}/1`)
      },
      handleCurrentChange(val) {
        /* this.defaultParams.page = val */
        this.pageObj.currenPage = val
        this.$router.push({
          path: `/search/${val}/${this.searchContent}`
        })
      },
      formatData(time) {
        time = time.toString()
        return time.substring(0, 10)
      },
      // 执行搜索方法
      search() {
        this.$router.push({
          path: `/search/1/${this.tempContent}`
        })
      },
      getEssaylist() {
        let sameAspre = false
        if(!this.searchContent) {
          this.$message({
            message: '请输入搜索内容'
          })
          return
        }
         this.tempContent = this.searchContent
        //先判断是不是同一次内容
        if(sessionStorage.getItem('search_condition')) {
        let firstcondition = JSON.parse(sessionStorage.getItem('search_condition'))
          if( firstcondition.pageSize == this.defaultParams.pageSize &&
            firstcondition.pageNo == this.defaultParams.pageNo &&
            firstcondition.searchContent == this.searchContent) {
              sameAspre = true
            } else {
              sameAspre = false
            }
        }
        // 每次搜索都临时保存搜索内容
        if(!sameAspre) {
          let search_condition = {
            searchContent:this.searchContent,
            ...this.defaultParams
            }
          sessionStorage.setItem('search_condition',JSON.stringify(search_condition))
        }
        $get(webSearch, {
          keyWords: this.searchContent,
          ...this.defaultParams
        }).then(res => {
          if (res.data.code === '0') {
            this.tempContent = this.searchContent
            this.pageObj = res.data
            this.pageObj.currPage = parseInt(this.defaultParams.pageNo)
            this.eassyList = res.data.data
          } else if (res.data.code === 'tag') {
            let tagId = res.data.tagId
            this.$router.push({
              path: `/taglist/${tagId}/1`
            })
          } else if (res.data.code === '9') {
            this.tempContent = this.searchContent
            this.eassyList = []
            this.pageObj = {}
          }
        })
      },
      // 跳转到兴趣部落文章详情 或 文章
      toArticleOrHobbiesDetail(eassy) {
        // console.log(eassy)
        if (eassy.title === 'hobbies') {
          this.$router.push({ path: this.$replaceDetailUrl(`/taglist/hobbiesdetail/${eassy.id}/1`) })
        } else {
          this.toArticleDetail(eassy.essayId)
        }
      },
      // 获取相关文章列表
      _getWebEassyList_(searchId) {
        $get(webTagAboutList, {
          ...this.defaultParams,
          tagId: searchId
        }).then(res => {
          // console.log(res.data)
          this.pageObj = res.data
          this.eassyList = res.data.list
        })
      },
      // 决定跳到周排行还是月排行
      changType() {
        if (this.activeName === 'monthRank') {
          this.type = 'm'
        } else {
          this.type = 'w'
        }
      },
      // 调到排行榜页
      toRank() {
        this.$router.push({ path: `/search/ranklist/${this.type}/1` })
      },
      // 跳转到文章详情页
      toArticleDetail(essayId) {
        this.$router.push({ path: `/${detailsObj['search']}/detail/${essayId}/1` })
      },
      // 获取文章周和月排行榜
      _getWeekendRank_() {
        $get(webEssayGetWeekendRank, { pageNo: '1', size: '12' }).then(res => {
          this.WeekendRank = res.data.essayEntities
        })
      },
      // 获取文章周和月排行榜
      _getMonthRank_() {
        $get(webEssayGetMonthRank, { pageNo: '1', size: '12' }).then(res => {
          this.MonthRank = res.data.essayEntities
        })
      },
      // 生成广告图片
      createAdPicture() {
        ;(window.slotbydup = window.slotbydup || []).push({
          id: '5993947',
          container: 'search_ad_1',
          size: '380,280',
          display: 'inlay-fix',
          async: true
        })
        ;(window.slotbydup = window.slotbydup || []).push({
          id: '5993948',
          container: 'search_ad_2',
          size: '380,280',
          display: 'inlay-fix',
          async: true
        })
        ;(window.slotbydup = window.slotbydup || []).push({
          id: '5993949',
          container: 'search_ad_3',
          size: '380,280',
          display: 'inlay-fix',
          async: true
        })
        ;(window.slotbydup = window.slotbydup || []).push({
          id: '5993950',
          container: 'search_ad_4',
          size: '380,280',
          display: 'inlay-fix',
          async: true
        })
        ;(window.slotbydup = window.slotbydup || []).push({
          id: '5993946',
          container: 'other_long_ad',
          size: '1200,200',
          display: 'inlay-fix',
          async: true
        })
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route: 'search'
    },
    components: {
      Header,
      Footer
    }
  }
</script>
<style lang="less">
  .search_wrapper {
    background: #f6f6f6;
    .search_content {
      margin: 0 auto;
      width: 1200px;
      background: #f6f6f6;
      .search_input_nav {
        position: relative;
        display: inline-block;
        margin-top: 46px;
        width: 800px;
        height: 50px;
        .el-input {
          width: 680px;
          height: 100%;
          input {
            width: 100%;
            height: 100%;
            color: #000;
            box-sizing: border-box;
            &:focus {
              border-color: #be001e;
            }
            &:hover {
              border-color: #be001e;
            }
          }
        }
        .search_btn {
          position: relative;
          margin-left: -10px;
          width: 120px;
          height: 100%;
          border: none;
          cursor: pointer;
          box-sizing: border-box;
          outline: none;
          line-height: 50px;
          vertical-align: middle;
          color: #fff;
          background: url('~static/images/search_btn.png') no-repeat !important;
        }
      }
      .search_des {
        position: relative;
        width: 100%;
        height: 200px;
        padding: 28px 0 0 0;
        background: #fff;
        &:after {
          content: '';
          display: block;
          clear: both;
        }
        .search_des_img {
          float: left;
          margin: 0 11px 27px 9px;
          width: 180px;
          height: 135px;
          background: #777;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .search_des_content {
          position: absolute;
          right: -10px;
          bottom: -10px;
          margin: 10px 0 0 10px;
          width: 990px;
          height: 160px;
          box-sizing: border-box;
          border-right: 10px solid #be001e;
          border-bottom: 10px solid #be001e;
          .search_title {
            height: 24px;
            font-size: 24px;
            font-weight: bold;
            color: rgba(18, 18, 18, 1);
            line-height: 24px;
          }
          .search_description {
            padding-right: 45px;
            width: 990px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(91, 91, 91, 1);
            line-height: 24px;
          }
        }
      }
      .search_main_content {
        background: #f6f6f6;
        .search_main_nav {
          padding-top: 40px;
          background: #f6f6f6;
          .search_title {
            margin-bottom: 31px;
            height: 42px;
            font-size: 26px;
            vertical-align: top;
            font-weight: bold;
            color: rgba(0, 0, 0, 1);
            line-height: 42px;
            .img {
              display: inline-block;
              margin-right: 15px;
              vertical-align: top;
              width: 8px;
              height: 42px;
              background: url('~static/images/tagList_nav.png') no-repeat center;
            }
            .redColor {
              color: #c63f4e;
            }
          }
        }
        .search_list {
          position: relative;
          &:after {
            content: '';
            display: block;
            clear: both;
          }
          width: 1200px;
          .search_list_left {
            float: left;
            width: 820px;
            padding-right: 30px;
            box-sizing: border-box;
            .seacr_no {
              font-size: 18px;
            }
            .search_list_left_li {
              margin-bottom: 30px;
              width: 100%;
              height: 280px;
              overflow: hidden;
              cursor: pointer;
              &:last-child {
                margin-bottom: 0;
              }
              .img_wrapper {
                float: left;
                width: 380px;
                height: 100%;
                background: #e7e7e7;
                background-image: url('~static/common/default.png');
                background-position: center;
                background-repeat: no-repeat;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover
                }
              }
              .img_wrapper:hover + .search_item {
                .search_title {
                  color: #be001e;
                }
              }
              .search_item {
                position: relative;
                display: inline-block;
                padding: 29px 42px 30px 40px;
                box-sizing: border-box;
                background: #fff;
                width: 410px;
                height: 100%;
                .search_title {
                  margin: 0 auto;
                  width: 328px;
                  // height: 30px;
                  font-size: 26px;
                  font-weight: 600;
                  color: rgba(18, 18, 18, 1);
                  // line-height: 26px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  &:hover {
                    color: #be001e;
                  }
                }
                .search_line {
                  position: relative;
                  width: 100%;
                  height: 65px;
                  .one {
                    position: absolute;
                    width: 65px;
                    height: 1px;
                    border-top: 1px solid #ccc;
                  }
                  .one {
                    position: absolute;
                    left: 10px;
                    top: 30px;
                    width: 45px;
                    height: 1px;
                    border-top: 1px solid #ccc;
                  }
                  .two {
                    position: absolute;
                    width: 45px;
                    height: 1px;
                    left: 20px;
                    top: 32px;
                    border-top: 1px solid #ccc;
                  }
                }
                .des {
                  width: 331px;
                  height: 38px;
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(18, 18, 18, 1);
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 2;
                  /* autoprefixer: ignore next */
                  -webkit-box-orient: vertical;
                }
              }
              .userMsg {
                margin-top: 67px;
                height: 25px;
                width: 100%;
                font-size: 14px;
                div {
                  display: inline-block;
                }
                .avatar {
                  max-width: 120px;
                  padding-right: 25px;
                  height: 25px;
                  cursor: pointer;
                  vertical-align: top;
                  &::after {
                    content: '';
                    display: block;
                    clear: both;
                  }
                  div {
                    display: inline-block;
                  }
                  img {
                    margin-right: 6px;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    vertical-align: top;
                  }
                  .name {
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;
                    font-weight: 300;
                    max-width: 54px;
                    cursor: pointer;
                    color: rgba(177, 177, 177, 1);
                    line-height: 25px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                  .search_line {
                    float: right;
                    margin-left: 25px;
                    width: 1px;
                    height: 11px;
                    line-height: 25px;
                    color: rgba(177, 177, 177, 1);
                  }
                }
                .channel,
                .time {
                  color: rgba(177, 177, 177, 1);
                  line-height: 25px;
                }
                .channel {
                  max-width: 90px;
                }
                .time {
                  float: right;
                }
              }
            }
          }
          .search_list_right {
            position: relative;
            display: inline-block;
            width: 380px;
            .search_list_ul {
              .search_ad {
                position: relative;
                margin-bottom: 30px;
                height: 280px;
                background-color: #e7e7e7;
                background-image: url('~static/images/defaultLogo.png');
                background-repeat: no-repeat;
                background-position: center;
                img {
                  width: 100%;
                  height: 100%;
                }
                .ad_des {
                  position: absolute;
                  right: 10px;
                  bottom: 10px;
                  width: 40px;
                  border: 1px solid rgba(255, 255, 255, 0.5);
                  background: transparent;
                  text-align: center;
                  font-size: 14px;
                  cursor: pointer;
                  color: rgba(255, 255, 255, 0.5);
                  line-height: 20px;
                }
              }
            }
            .rank {
              position: relative;
              width: 380px;
              height: 452px;
              padding: 0 30px !important;
              box-sizing: border-box;
              background: #fff;
              overflow: hidden;
              .weekRank,
              .monthRank {
                .search_p {
                  height: 34px;
                  cursor: pointer;
                  margin-bottom: 0;
                  vertical-align: middle;
                  .des {
                    display: inline-block;
                    width: 269px;
                    padding-left: 20px;
                    line-height: 34px;
                    box-sizing: border-box;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                  span:first-child {
                    box-sizing: content-box !important;
                    padding-left: 17px;
                  }
                  &:hover {
                    color: #f00;
                  }
                }
                .normal {
                  float: left;
                  width: 26px;
                  height: 34px;
                  line-height: 34px;
                  vertical-align: middle;
                }
                .search_special {
                  display: inline-block;
                  width: 26px;
                  height: 34px;
                  color: #fff;
                  line-height: 34px;
                  vertical-align: middle;
                  background: url('~static/images/rank_bg.png') no-repeat center,
                  url('~static/images/rank_bg_black.png') no-repeat 77% -15%;
                }
              }
              .moreRank {
                position: absolute;
                width: 42px;
                height: 46px;
                right: 19px;
                top: 20px;
                font-size: 14px;
                color: #999999;
                border-bottom: 1px solid #000;
                cursor: pointer;
                &:hover {
                  color: #be001e;
                }
              }
            }
          }
          #tab-weekRank,
          #tab-monthRank {
            font-size: 18px;
            font-weight: 500;
            color: #000;
            font-weight: bold;
            &.is-active {
              color: #be001e;
            }
            &:hover {
              color: #be001e;
            }
          }
        }
      }
      .advertise_wrapper {
        position: relative;
        margin: 20px 0;
        width: 100%;
        height: 200px;
        background-color: #e7e7e7;
        background-image: url('~static/images/defaultLogo.png');
        background-repeat: no-repeat;
        background-position: center;
        .ad_des {
          position: absolute;
          right: 10px;
          bottom: 10px;
          width: 40px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: transparent;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.5);
          line-height: 20px;
        }
      }
      .advertise_wrapper > a {
        display: block;
        width: 100%;
        height: 100%;
      }
      .advertise_wrapper > a > img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .el-tabs__nav-scroll {
      width: 360px !important;
      box-sizing: border-box;
      padding: 10px 7px !important;
    }
    .el-tabs__nav-wrap::after {
      width: 100%;
      height: 0;
      border: 1px solid #000;
    }
    .el-tabs__active-bar {
      width: 90px !important;
      height: 6px;
      top: 110%;
      margin-left: -8px;
      background: url('~static/images/tag_scroll.png') no-repeat !important;
    }
    .btn-prev,
    .btn-next {
      width: 80px;
      height: 40px;
      color: #000 !important;
      background: rgba(255, 255, 255, 1) !important;
      box-shadow: 0px 3px 0px 0px rgba(228, 228, 228, 1) !important;
    }
    .btn-prev:hover,
    .btn-next:hover {
      color: #fff !important;
      background: #000 !important;
      box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
    }
    .el-pagination {
      margin: 30px auto;
      color: #000;
      text-align: center;
    }
    .el-pager {
      .number,
      li.btn-quicknext,
      li.more {
        width: 40px;
        height: 40px;
        color: #000;
        line-height: 40px;
        background: rgba(255, 255, 255, 1) !important;
        box-shadow: 0px 3px 0px 0px rgb(228, 228, 228, 1) !important;
        &.active {
          background: #000 !important;
          box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
        }
        &:hover {
          color: #fff!important;
          background: #000 !important;
          box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
        }
      }
    }
    #ad_1 {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
