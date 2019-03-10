<template>
  <div class="sorts">
    <div class="sorts-container">
      <router-link :to="`/index/ranklist/${sortType}/1`">
        <div class="sorts-title"
          v-text="title"></div>
      </router-link>

      <div class="sorts-list">
        <ul>
          <li v-for="(item, index) in data"
            :key="index">
            <span class="li_normal"
              :class="{'li_hot': index < 3}">{{index+1}}</span>
            <router-link class="li_title"
              :to="`/${detailsObj['sorts']}/detail/${item.essayId}/1`"
              v-text="item.title"></router-link>
          </li>
        </ul>
      </div>
      <div class="sorts-bg">
      </div>
    </div>

  </div>
</template>
<script>
  import { detailsObj } from '@/utils/defaultConfig.js'
export default {
  name: 'Sorts',
  props: {
    title: {
      type: String,
      default: '日排行榜'
    },
    list: {
      type: Array
    },
    type: {
      type: String
    }
  },
  data () { return { detailsObj } },

  computed: {
    data: function() {
      return this.list == null ? [] : this.list
    },
    sortType: function() {
      return this.type
    }
  }
}
</script>
<style>
.sorts {
  display: inline-flex;
  height: 412px;
  width: 380px;
  box-sizing: border-box;
  position: relative;
  background: url('../images/red_bg.png') no-repeat right bottom;
  background-size: 95% 80%;
}

.sorts .sorts-container {
  width: 98%;
  height: 98%;
  background-color: #fff;
}

.sorts .sorts-container .sorts-title {
  height: 47px;
  color: #fff;
  font-size: 20px;
  line-height: 40px;
  padding-left: 10px;
  background: url('../images/sort.png') no-repeat;
  background-size: 100% 100%;
}

.sorts .sorts-container .sorts-list {
  padding: 20px;
}

.sorts .sorts-list ul {
  box-sizing: border-box;
}

.sorts .sorts-container .sorts-list ul li {
  padding-top: 7px;
  width: 100%;
  cursor: pointer;
  font-size: 0px;
  box-sizing: border-box;
}

.sorts .sorts-container .sorts-list ul li .li_hot {
  color: #fff;
  background: url('../images/hot.png') no-repeat left center;
  background-size: 27px 24px;
  padding-left: 6px;
}

.sorts .sorts-container .sorts-list ul li .li_normal {
  display: inline-block;
  font-size: 12px;
  width: 27px;
  height: 24px;
  padding-left: 7px;
  padding-top: 2px;
}
.sorts .sorts-container .sorts-list ul li:hover {
  color: #be001e;
}
.sorts .sorts-container:hover {
  width: 98%;
  height: 98%;
}

.li_title {
  display: inline-block;
  width: 269px;
  line-height: 100%;
  padding-left: 10px;
  font-size: 14px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.li_title:hover {
  color: #be001e;
}
</style>
