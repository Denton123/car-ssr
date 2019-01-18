<template>
  <div class="hobbiesDiv"
    :style="{'height':sHeight, 'width': width}">
    <div class="pic"
      v-if="isContent == '0'">
      <router-link :to="`/hobbies/hobbiesDetail/${card.id}/1`">
        <img :src="card.photo"
          :alt="card.title"
          width="100%"
          height="100%"
          v-if="card.photo">
      </router-link>
    </div>
    <div v-if="isContent == '1'">
      <router-link :to="`/hobbies/hobbiesDetail/${card.id}/1`">
        <img :src="card.photo"
          :alt="card.title">
      </router-link>
    </div>
    <div class="card-content">
      <div class="info clearfix"
        v-if="sContent == '0'">
        <div class="info_left"
          @click="$router.push(`/Bloger/${cardData.userId}/1`)">
          <span class="info_header">
            <img :src="formatPic(card.authorphoto) "
              alt="头像"
              height="100%"
              width="100%"
              v-if="card.authorphoto != null">
          </span>
          <router-link :to="`/Bloger/${card.userId}/1`">
            <span class="info_name">{{card.userName == '' ? '无': card.userName}}</span>
          </router-link>
        </div>
        <!-- <div class="info_center"></div> -->
        <!-- <div class="info_right">{{card.className == ''?'无': '兴趣部落'}}</div> -->
      </div>
      <div v-if="sContent== '1'"
        class="hobbies_content">
        <p v-html="card.description"></p>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '@/http/url'
import systemManage from '@/http/photoApi.js'

export default {
  name: 'HobbiesDiv',
  props: {
    height: {
      type: String,
      default: '350px'
    },
    width: {
      type: String,
      default: '380px'
    },
    cardData: {
      type: Object
    },
    isContent: {
      type: String,
      default: '0'
    }
  },
  computed: {
    card: function() {
      let data = this.cardData == null ? {} : this.cardData
      console.log(data)
      if (data.authorphoto !== '' && data.authorphoto != null) {
        data.authorphoto = data.authorphoto
      } else {
        data.authorphoto = null
      }
      if (data.photoList == null) return {}
      let url = data.photoList.length === 0 ? null : data.photoList[0].photo
      if (url == null) {
        data.photo = null
      } else {
        data.photo = utils.getApi(url)
      }
      return data
    },
    sHeight: function() {
      return this.height
    },
    sContent: function() {
      return this.isContent
    }
  },
  methods: {
    formatPic(item) {
      return systemManage.getApi(item)
    },
  }
}
</script>
<style>
.hobbiesDiv {
  display: inline-block;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: hidden;
  /* border: 1px solid #333; */
}

.hobbiesDiv .pic {
  height: 280px;
  /* background-color: black; */
}

.hobbiesDiv .card-content {
  padding-top: 20px;
}

.hobbiesDiv .card-content .title {
  display: inline-block;
  box-sizing: border-box;
  border-left: 2px solid #e4e4e4;
  padding-left: 15px;
  color: #000;
  font-size: 17px;
  font-weight: 500;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.hobbiesDiv .card-content .title:hover {
  border-color: #be001e;
  color: #be001e;
}

.hobbiesDiv .card-content .info {
  /* margin-top: 20px; */
  padding-left: 16px;
}

.hobbiesDiv .card-content .info .info_left {
  cursor: pointer;
  height: 25px;
  font-size: 0px;
  float: left;
}

.info_header {
  width: 25px;
  height: 25px;
  background: url('~static/index/icon_head.png') no-repeat;
  float: left;
}

.info_name {
  font-size: 14px;
  display: inline-block;
  height: 25px;
  color: #b1b1b1;
  line-height: 25px;
  margin-left: 10px;
  cursor: pointer;
}

.info_center {
  height: 15px;
  width: 1px;
  background-color: #b1b1b1;
  margin: 5px 20px;
  float: left;
}

.info_right {
  float: left;
  height: 25px;
  line-height: 25px;
  color: #b1b1b1;
}
.hobbies_content {
  padding: 0px 20px;
  height: 100%;
  overflow: hidden;
}
.hobbies_content p {
  letter-spacing: 1px;
  line-height: 23px;
}
</style>
