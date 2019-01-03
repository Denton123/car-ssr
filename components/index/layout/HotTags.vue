<template>
  <div class="hot-tags">
    <div class="hot-tags-container">
      <div class="hot-tags-header">
        <span class="hot-tag-header-left"></span>
        <div class="hot-tag-title">
          <span class="title"><strong>热点</strong></span>
          <span class="down_divider"></span>
        </div>
        <span class="hot-tag-header-right"></span>
      </div>
      <div class="hot-tags-content">
        <ul>
          <li v-for="(item, index) in listData"
            :key="index">
            <router-link :to="`/tagList/${item.id}`"><strong>{{item.title}}</strong></router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HotTags',
  props: {
    list: {
      type: Array
    }
  },
  computed: {
    listData: function() {
      return this.list == null ? [] : this.list
    }
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
  padding: 20px 10px 20px 10px;
}

.hot-tags .hot-tags-container .hot-tags-header {
  font-size: 0px;
  text-align: center;
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

