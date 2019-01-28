<template>
  <div class="hot-tags">
    <div class="hot-tags-container">
      <nuxt-link class="title"
          :to="`/ev/detail/${EvRightListData.id == null ? '' : EvRightListData.id}/1`">
      <img :src="formatPic(EvRightListData.photo)" :alt="EvRightListData.title" class="hot-tags-container-img">
      </nuxt-link>
      <div class="card-content">
        <nuxt-link class="title"
          :to="`/ev/detail/${EvRightListData.id == null ? '' : EvRightListData.id}/1`">
          {{EvRightListData.title == '' ? '无': EvRightListData.title}}
        </nuxt-link>
        <p class="card-content-desc" v-html="EvRightListData.digest == '' ? '': EvRightListData.digest"></p>
        <div class="info clearfix">
          <div class="info_left">
            <nuxt-link :to="`/Bloger/${EvRightListData.authorId}/1`">
              <span class="info_header">
                <img :src="formatPic(EvRightListData.photoUrl)"
                  :alt="EvRightListData.title"
                  height="100%"
                  width="100%">
              </span>
            </nuxt-link>
            <nuxt-link :to="`/Bloger/${EvRightListData.authorId}/1`">
              <span class="info_name">{{EvRightListData.webName !== '' ? EvRightListData.webName : EvRightListData.author}}</span>
            </nuxt-link>
          </div>
          <div class="info_center"></div>
          <div class="info_right">{{EvRightListData.classOneName == ''?'无': EvRightListData.classOneName}}</div>
        </div>
      </div>

      <!-- <div class="hot-tags-header">
        <span class="hot-tag-header-left"></span>
        <div class="hot-tag-title">
          <span class="title"><strong>热点</strong></span>
          <span class="down_divider"></span>
        </div>
        <span class="hot-tag-header-right"></span>
      </div> -->
      <!-- <div class="hot-tags-content">
        <ul>
          <li v-for="(item, index) in listData"
            :key="index">
            <router-link :to="`/tagList/${item.id}/1`"><strong>{{item.title}}</strong></router-link>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script>
import systemManage from '@/http/photoApi.js'
import { $get } from "@/http/ajax";
import {
  webGetEvRightEssay
} from "@/http/api";
export default {
  name: 'HotTags',
  data(){ 
    return{
    }
  },
  props: {
    // list:{
    //   type : Array
    // },
    EvRightListData:{
        type : Object
    }
  },
  // async asyncData(){
  //   let EvRightListData = await $get(webGetEvRightEssay);
  //   return{
  //     EvRightListData : EvRightListData == '' ? [] : EvRightListData
  //   }
  // },
  computed: {
    // listData: function() {
    //   return this.list == null ? [] : this.list
    // }
    // EvRightListData : function(){
    //     return this.EvRightList == null ? [] :this.EvRightList
    // }
  },
  methods:{
    formatPic(item) {
      return systemManage.getApi(item)
    },
  },
  mounted(){
    console.log(this.EvRightListData,'子组件里的')
  }
}
</script>
<style>
.hot-tags {
  height: 100%;
  overflow: hidden;
  background-color: #fff;
}

.hot-tags .hot-tags-container {
  background-color: #fff;
  width: 98%;
  height: 98%;
  box-sizing: border-box;
  /* padding: 20px 10px 20px 10px; */
}
.hot-tags .hot-tags-container-img{
  width: 100%;
  height: 280px;
  object-fit: cover;
}
.hot-tags .hot-tags-container-desc{
    display: inline-block;
    box-sizing: border-box;
    border-left: 2px solid #e4e4e4;
    padding-left: 15px;
    color: #000;
    font-size: 17px;
    /* padding-top: 20px; */
    font-weight: 600;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
.hot-tags .hot-tags-container .hot-tags-header {
  font-size: 0px;
  text-align: center;
}
.hot-tags .card-content {
  padding-top: 20px;
}
.hot-tags .card-content .title
 {
  display: inline-block;
  box-sizing: border-box;
  border-left: 2px solid #e4e4e4;
  padding-left: 15px;
  color: #000;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.hot-tags .card-content .card-content-desc{
  width: 95%;
 /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding-left: 17px;
  color: #000;
  margin-top: 14px;
  font-size: 14px;
  font-weight: 400;
}
.hot-tags .card-content .title:hover {
  border-color: #be001e;
  color: #be001e;
}

.hot-tags .card-content .info {
  margin-top: 20px;
  padding-left: 16px;
}

.hot-tags .card-content .info .info_left {
  height: 25px;
  font-size: 0px;
  float: left;
}

.hot-tags .info_header {
  width: 25px;
  height: 25px;
  background: url('~static/images/icon_head.png') no-repeat;
  float: left;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
}

.hot-tags .info_name {
  font-size: 14px;
  display: inline-block;
  height: 25px;
  color: #b1b1b1;
  line-height: 25px;
  margin-left: 10px;
  cursor: pointer;
}

.hot-tags .info_center {
  height: 15px;
  width: 1px;
  background-color: #b1b1b1;
  margin: 5px 20px;
  float: left;
}

.hot-tags .info_right {
  float: left;
  height: 25px;
  line-height: 25px;
  color: #b1b1b1;
}
.hot-tags {
  background: url('../images/red_bg.png') no-repeat right bottom;
  background-size: 95% 90%;
}

.hot-tag-header-left {
  display: inline-block;
  width: 5px;
  height: 6px;
  background: url('../images/small_right.png') no-repeat;
  background-size: 5px 6px;
}

.hot-tag-title {
  display: inline-block;
  height: 40px;
  width: 60px;
  text-align: center;
  box-sizing: border-box;
}

.hot-tag-title .title {
  display: block;
  font-size: 20px;
}

.hot-tag-title .down_divider {
  display: block;
  background: url('../images/down_divider.png') no-repeat center;
  height: 10px;
}

.hot-tag-header-right {
  display: inline-block;
  width: 5px;
  height: 6px;
  background: url('../images/small_left.png') no-repeat;
  background-size: 5px 6px;
}

.hot-tags-content {
  margin-top: 30px;
}
.hot-tags-content ul {
  margin: 0;
}
.hot-tags-content ul li {
  display: inline-block;
  padding-left: 30px;
  padding-bottom: 20px;
}

.hot-tags-content ul li a {
  color: #000;
}

.hot-tags-content ul li a:hover,
a:active {
  color: #be001e;
}
</style>

