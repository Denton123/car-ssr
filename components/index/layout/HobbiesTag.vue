<template>
  <div class="hobbies-tag">
    <div class="hobbies-tag-img">
      <img src="../images/black_left.png"
        alt="tab图片"
        width="100%"
        height="100%">
    </div>
    <div class="hobbies-tag-list">
      <ul>
        <li v-for="(item, index) in list"
          :key="index"
          :class="{'item_active': index == activedIndex}"
          @click="changeItem(index)">
          <div>{{item}}</div>
          <span class="tag_active_bg"
            v-if="index == activedIndex">
            <div class="hobbies_tag_container">
              <span class="tag_active">
              </span>
            </div>

          </span>
        </li>
      </ul>
    </div>
    <div class="hobbies_change">
      <span class="hobbies_left"></span>
      <span class="hobbies_center"></span>
      <span class="hobbies_right"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HobbiesTag',
  data() {
    return {
      activedIndex: 1,
      list: ['情怀车', '摄影', '萌宠', '改装', '旅游']
    }
  },
  methods: {
    changeItem(index) {
      this.activedIndex = index
    }
  }
}
</script>
<style>
.hobbies-tag {
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
}

.hobbies_tag_container {
  height: 100%;
  position: relative;
}
.hobbies-tag .hobbies-tag-img {
  box-sizing: border-box;
  padding: 20px;
  height: 280px;
}
.hobbies-tag .hobbies-tag-list ul {
  font-size: 0px;
}

.hobbies-tag .hobbies-tag-list ul li {
  display: inline-block;
  font-size: 14px;
  line-height: 32px;
  padding: 0px 25px 0px 20px;
  height: 32px;
  text-align: center;
}

.hobbies-tag .hobbies-tag-list .item_active {
  background-color: rgba(202, 10, 45, 1);
  color: #fff;
  padding: 0px 25px 0px 20px;
  position: relative;
}

.tag_active {
  position: absolute;
  display: inline-block;
  right: 0;
  top: 0;
  width: 20px;
  height: 32px;
  background: url('../images/hobbies_hover.png') no-repeat;
}

.tag_active_bg {
  position: absolute;
  display: inline-block;
  width: 20px;
  height: 32px;
  background-color: #fff;
  right: 0;
  top: 0;
}

.hobbies_change {
  position: absolute;
  bottom: 20px;
  left: 43%;
  text-align: center;
  font-size: 0px;
}

.hobbies_left {
  background: url('../images/hobbies_left.png') no-repeat;
  width: 15px;
  height: 22px;
  display: inline-block;
  background-size: 15px 22px;
  cursor: pointer;
}

.hobbies_right {
  background: url('../images/hobbies_right.png') no-repeat;
  width: 15px;
  height: 22px;
  display: inline-block;
  background-size: 15px 22px;
  cursor: pointer;
}

.hobbies_center {
  background: url('../images/hobbies_center.png') no-repeat;
  width: 23px;
  height: 22px;
  display: inline-block;
  background-size: 23px 22px;
  padding-left: 2px;
  cursor: pointer;
}
</style>
