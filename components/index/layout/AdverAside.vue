<template>
  <div class="adver-aside">
    <div class="change"
      @click="change">换一批</div>
    <ul>
      <li class="special_adverr-item">
        <span class="special_icon"></span>
        <div id="new_ad_des"></div>
        <span class="special_adver">广告</span>
      </li>
      <li v-for="(item, index) in data"
        :key="index">
        <router-link :to="`/${detailsObj['news']}/detail/${item.id}/1`"
          class="adverr-item"
          v-text="item.title"></router-link>

        <!--<a :href="item.url"-->
        <!--v-if="index == 0"-->
        <!--v-text="item.title"-->
        <!--target="_blank"-->
        <!--class="adverr-item"></a>-->
        <!--  <span class="adver"
          v-if="index == 0">广告</span> -->
      </li>
    </ul>
  </div>
</template>
<script>
  import { detailsObj } from "@/utils/defaultConfig.js"
export default {
  name: 'AdverAside',
  props: {
    list: {
      type: Array
    }
  },
  data () { return { detailsObj } },
  computed: {
    data: function() {
      let list = this.list == null ? [] : this.list
      // list.unshift({
      //   title: '全新RDX狂热登场',
      //   url:
      //     'http://www.acura.com.cn/rdx/special/?mz_ca=2106651&mz_sp=7K9Bh&mz_sb=1'
      // })
      return list
    }
  },
  mounted() {
    this.addAd()
  },
  methods: {
    change() {
      this.$emit('change')
    },
    addAd() {
      // 首页今日车闻文字链广告
      ;(window.slotbydup = window.slotbydup || []).push({
        id: '6016369',
        container: 'new_ad_des',
        size: '240, 20',
        display: 'inlay-fix',
        async: true
      })
    }
  }
}
</script>
<style>
.adver-aside {
  width: 380px;
  height: 415px;
  border: 1px;
  border-bottom: 0px;
  padding: 10px;
  border-style: solid;
  border-color: #fff;
  box-sizing: border-box;
}

.change {
  text-align: right;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  opacity: 0.3;
  margin-bottom: 23px;
}

.adver-aside ul li {
  font-size: 14px;
  padding-top: 23px;
  box-sizing: border-box;
  position: relative;
}

.adver-aside ul li a {
  color: #fff !important;
  display: inline-block;
  width: 268px;
  box-sizing: border-box;
}

.adver-aside ul li .adver {
  width: 40px;
  height: 20px;
  box-sizing: border-box;
  border: 1px solid #fff;
  line-height: 18px;
  position: absolute;
  text-align: center;
  color: #fff;
  right: 20px;
  opacity: 0.3;
}
.adver-aside .adverr-item {
  display: inline-block;
  background: url('../images/dl.png') no-repeat 0 center;
  background-size: 8px 8px;
  height: 20px;
  margin-left: 20px;
  padding-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.9;
}
.adver-aside .special_adverr-item {
  position: relative;
  padding-top: 0;
  padding-left: 50px;
  padding-right: 73px;
}
.adver-aside .special_icon {
  position: absolute;
  left: 20px;
  top: 3px;
  width: 20px;
  height: 20px;
  background: url('../images/dl.png') no-repeat 0 center;
}
.adver-aside .special_adver {
  position: absolute;
  right: 0;
  top: 0;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  width: 40px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.adver-aside .adverr-item:hover {
  /* background: url('../images/dl_hover.png') no-repeat 0 center; */
}
</style>
