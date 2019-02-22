<template>
  <div id="follower">
    <div class="detail_content_article_title">
      <img src="~static/detail/detail_article.png">
      <h2>{{ defaultPageData.numberTitle[0] }}<span> {{totalData.totalCount}} </span>{{ defaultPageData.numberTitle[1] }}</h2>
      <div class="search_fans">
        <input type="text" v-model="name" class="v-left" :placeholder="defaultPageData.searchTitle">
        <div class="fans_search_btn" @click="onSearch">搜索</div>
      </div>
    </div>
    <div class="article_fans_list" v-if="Array.isArray(list) && list.length">
      <div class="article_content"
           v-for="(item, index) in list"
           :key="index">
        <div class="content_fans_left">
          <nuxt-link :to="`/bloger/${item.id}/1`">
          <div class="head_image"
               v-if="item.photo !== ''">
            <img :src="formatPic(item.photo)" :alt="item.loginName">
          </div>
          <div class="head_image"
               v-else>
            <img src="~static/person/person_default.png"
                 alt="用户头像">
          </div>
          </nuxt-link>
          <div class="fans_info">
            <nuxt-link :to="`/bloger/${item.id}/1`">
              <p class="info_title">{{item.loginName}}</p>
            </nuxt-link>
            <p class="info_detail">
              <span>粉丝 {{item.numberOfFans}}</span>
              <span>关注 {{item.numberOfFollowers}}</span>
              <span>文章 {{item.essayCount}}</span>
            </p>
          </div>
        </div>
         <div class="content_fans_right">
           <div class="watch_btn_before" v-show="!item.fllowornot" @click="watchBloger(item.id)">关注</div>
           <div class="watch_btn_after" v-show="item.fllowornot" @click="cancelBloger(item.id)">已关注</div>
        </div>
      </div>
    </div>
     <div class="list_tip" v-else>
       {{noNumberOfFollowers}}
    </div>
    <div class="pagination">
      <el-pagination v-if="listData&&listData.totalCount"
                     background
                     :current-page="listData&&listData.currPage"
                     @current-change="handleCurrentChange"
                     layout="prev, pager, next"
                     prev-text="上一页"
                     next-text="下一页"
                     :page-count="listData&&listData.totalPage"
                     :page-size="listData&&listData.pageSize"
                     :total="listData&&listData.totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {
    webUserGetFollow
  } from '@/http/api'
  import { $get, $post } from '@/http/ajax'
  import systemManage from '@/http/photoApi.js'
  import Pagination from '@/components/pagination.vue'

  export default {
    name: 'myFans',
    components: {
      Pagination
    },
    data() {
      return {
        totalData:{},
        fansNum: '',
        photo: '',
        numberOfFans: '',
        numberOfFollowers: '',
        essayCount: '',
        currentPage: 1,
        fansPage: '',
        list: [],
        name: '',
        noNumberOfFollowers: '目前暂无关注数~',
        defaultParams: {
          limit: 10,
          page: 1
        },
        listData: {
          type: Object,
          default() {
            return {}
          }
        },
        defaultPageData: {
          title: '我的关注',
          numberTitle: [
            '您已关注', '位用户'
          ],
          searchTitle: "搜索关注"
        }
      }
    },
    computed: {
    },
    methods: {
      /* 预览图和视频地址拼接 */
      formatPic(item) {
        const res = /http/g
        if (res.test(item)) {
          return item
        } else {
          return systemManage.getApi(item)
        }
      },
      // 获取粉丝的基本信息
      async fansList(name) {
        if (this.tokenObj == null) {
          this.tokenObj = {}
        }
        // let page = sessionStorage.getItem('personIndexPage')
        // if(page) {
        //   this.defaultParams.page = page
        // }
        let res = await $get(
          webUserGetFollow,
          {
            limit: '8',
            name: name || '',
            page:  this.defaultParams.page || '1'
          },
          {
            'X-Auth0-Token': this.cookie !== '' ? this.cookie : this.tokenObj.token
          })
        let data = res.data
        if (data.result) {
          this.totalData = data
          this.list = data.page.list
          this.listData = data.page
          if(name !== ''&&name !== undefined && this.list.length == 0){
            this.noNumberOfFollowers = '目前暂无该用户~'
          }
        }
        // console.log(data)
      },
      // 搜索
      onSearch(){
        // console.log(this.name)
        this.fansList(this.name)
      },
      handleCurrentChange(val) {
        // sessionStorage.setItem('personIndexPage', val)
        this.defaultParams.page = val
        this.fansList()
      },
       // 关注博主
    async watchBloger(id) {
      let obj = {
        'X-Auth0-Token': this.cookie !== '' ? this.cookie : this.tokenObj.token
      }
      let urlParam = new URLSearchParams()
      urlParam.append('type', 'follow')
      urlParam.append('bloggerId', id)
      let res = await $post('/web/user/clickCare?', urlParam, obj)
      if (res.data.code === 2) {
        this.$message({
          type: 'success',
          message: '关注成功!'
        })
        this.item.fllowornot = false
      } else if (res.data.code === 0) {
        this.$message({
          type: 'warning',
          message: res.data.str
        })
      } else {
        this.$message({
          type: 'warning',
          message: res.data.str
        })
      }
    },
    // 取消博主
    async cancelBloger(id){
      let obj = {
        'X-Auth0-Token': this.cookie !== '' ? this.cookie : this.tokenObj.token
      }
      let urlParam = new URLSearchParams()
      urlParam.append('type', 'cancel')
      urlParam.append('bloggerId', id)
      let res = await $post('/web/user/clickCare?', urlParam, obj)
      // console.log('取消关注', res)
      if (res.data.code === 3) {
        this.$message({
          type: 'success',
          message: '取消成功!'
        })
        this.fansList()
      } else if (res.data.code === 0) {
        this.$message({
          type: 'warning',
          message: res.data.str
        })
      } else {
        this.$message({
          type: 'warning',
          message: res.data.str
        })
      }
    },
      // 获取cookie
      getCookie(cname) {
        // console.log(cname, 'cookie')
        var name = cname + '='
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i].trim()
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
        }
        return ''
      }
    },
    mounted() {
      this.cookie = this.getCookie('token')
      if (this.cookie == '') {
        this.tokenObj =localStorage.getItem('userMsg') && localStorage.getItem('userMsg') != '' ? JSON.parse(localStorage.getItem('userMsg')):{}
      }
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      this.$nextTick(async () => {
        this.fansList()
      })
      // this.currentPage = this.$route.params.page
    }
  }
</script>
<style lang="less">
  .search_fans{
    float: right;
    margin-right: 110px;
    width: 440px;
    height:50px;
    background:rgba(255,255,255,1);
    line-height: 50px;
    border:1px solid rgba(170,170,170,.5);
    input{
      float: left;
      height: 100%;
      width: 100%;
      border-right: 0px;
      padding: 0 20px;
      text-align: left;
      font-size:16px;
      &::-webkit-input-placeholder {
        text-align: left;
        font-size:18px;
        color:rgba(170,170,170,1);
      }
    }
    .fans_search_btn{
      position: absolute;
      right: 0;
      margin-right: 10px;
      background-image: url("~static/images/search_btn.png");
      width: 110px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 50px;
      color: #fff;
      font-size:18px;
      font-weight:500;
      color:rgba(254,254,254,1);
      cursor: pointer;
    }
  }
  .detail_content_article_title {
    padding: 40px 0;
  }
  .detail_content_article_title img {
    vertical-align: sub;
  }
  .detail_content_article_title h2 {
    display: inline-block;
    margin-left: 15px;
    font-weight: bold;
    font-size: 26px;
    color: rgba(18, 18, 18, 1);
  }
  .detail_content_article_title h2 span {
    color: #be001e;
  }
  .article_fans_list{
    width: 1200px;
    margin: 0 auto 10px;
    background: #fff;
    padding: 20px 0;
    .article_content{
      width: 92%;
      height: 160px;
      border-bottom: 1px solid #E4E4E4;
      margin: 0 4%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .content_fans_left{
        display: flex;
        flex-direction: row;
        .head_image{
          margin-top: 30px;
          width: 100px;
          height: 100px;
          border-radius: 100%;
          img{
            width: 100%;
            height: 100px;
            border-radius: 50%
          }
        }
        .fans_info{
          display: inline-block;
          margin: 45px 0 0 30px;
          .info_title{
            font-size: 24px;
            color: #121212;
            font-weight: bold;
          }
          .info_detail{
            margin-top: 22px;
            span{
              font-size: 14px;
              color: #5B5B5B;
              margin-right: 42px;
            }
          }
        }
      }
      .content_fans_right{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 20px;
        .watch_btn_before{
          width: 90px;
          height: 40px;
          line-height: 40px;
          background: url("~static/images/watch_red.png");
          background-size: 100% 100%;
          font-size: 14px;
          color: #fff;
          text-indent: 28px;
          cursor: pointer;
        }
        .watch_btn_after{
          width: 90px;
          height: 40px;
          line-height: 40px;
          background: url("~static/images/watch_wrap.png");
          background-size: 100% 100%;
          font-size: 14px;
          color: #AAAAAA;
          text-align: center;
          cursor: pointer;
          .active{
            background: url("~static/images/watch_red.png");
            color: #fff;
          }
        }
      }
    }
  }
  #follower{
    .pagination {
    .btn-prev,
    .btn-next {
      width: 80px;
      height: 40px;
      background: rgba(255, 255, 255, 1) !important;
      box-shadow: 0px 3px 0px 0px rgba(228, 228, 228, 1) !important;
      color: #000 !important;
      span {
        color: #000 !important;
      }
    }
  .btn-prev:hover,
  .btn-next:hover {
    background: #000 !important;
    box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
    span {
      color: #fff !important;
    }
  }
  .el-pagination {
    margin: 30px auto;
    text-align: center;
  }
  .el-pager {
    .number,
    li.btn-quicknext,
    li.more {
      color: #000;
      width: 40px;
      height: 40px;
      line-height: 40px;
      background: rgba(255, 255, 255, 1) !important;
      box-shadow: 0px 3px 0px 0px rgb(228, 228, 228, 1) !important;
      &.active {
        background: #000 !important;
        color: #fff !important;
        box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
      }
      &:hover {
        color: #fff!important;
        background: #000 !important;
        box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
      }
    }
  }
  }
}
</style>
