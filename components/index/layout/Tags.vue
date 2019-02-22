<template>
  <div class="tags-container">
    <ul class="tags-ul">
      <div v-for="(item, index) in listData"
        :key="index"
        class="tags-ul_li_wrap">
        <router-link :to="`/taglist/${item.id}/1`">
          <li @click="changeIndex(index)">
            <a href="javascript:;"
              class="normal"><strong>{{item.title}}</strong></a>
          </li>
        </router-link>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Tags',
  props: {
    listData: {
      type: Array
    }
  },
  computed: {
    ListDatas: function() {
      return this.listData == null ? [] : this.listData
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    changeIndex(index) {
      this.activeIndex = index
      this.$emit('clickTag', this.listData[index].id)
    }
  }
}
</script>
<style>
.tags-container {
  display: flex;
  justify-content: center;
}

.tags-container ul {
  width: 1200px;
  font-size: 0px;
  text-align: center;
}

.tags-container ul li {
  display: inline-block;
  padding-left: 10px;
}

.tags-container ul li:first-child {
  display: inline-block;
  padding: 10px;
}

.tags-container ul li {
  padding: 10px;
  border: 2px solid #e7e7e7;
  color: #000;
  font-size: 14px;
  margin-left: 10px;
}

.tags-container ul li a {
  color: #000;
}

.tags-container ul li:hover {
  border-color: #be001e;
  background: url('../images/index.png') no-repeat 98% 96%;
  background-size: 9px 9px;
}
.tags-ul_li_wrap {
  display: inline-block;
  margin-bottom: 10px;
}
</style>
