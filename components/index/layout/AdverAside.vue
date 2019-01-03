<template>
  <div class="adver-aside">
    <div class="change"
      @click="change">换一批</div>
    <ul>
      <li v-for="(item, index) in data"
        :key="index">
        <router-link :to="`news/detail/${item.id}`"
          class="adverr-item"
          v-text="item.title"
          v-if="index != 0"></router-link>
        <a :href="item.url"
          v-if="index == 0"
          v-text="item.title"
          target="_blank"
          class="adverr-item"></a>
        <span class="adver"
          v-if="index == 0">广告</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'AdverAside',
  props: {
    list: {
      type: Array
    }
  },
  computed: {
    data: function() {
      let list = this.list == null ? [] : this.list
      list.unshift({
        title: '全新RDX狂热登场',
        url:
          'http://www.acura.com.cn/rdx/special/?mz_ca=2106651&mz_sp=7K9Bh&mz_sb=1'
      })
      return list
    }
  },
  methods: {
    change() {
      this.$emit('change')
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
  padding-top: 20px;
  box-sizing: border-box;
  position: relative;
}

.adver-aside ul li a {
  color: #fff;
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
  background: url('../images/dl.png') no-repeat 0 center;
  background-size: 8px 8px;
  margin-left: 20px;
  padding-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.9;
}

.adver-aside .adverr-item:hover {
  /* background: url('../images/dl_hover.png') no-repeat 0 center; */
}
</style>
