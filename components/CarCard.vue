<template>
  <div class="index_card_block"
    :style="{'height':height, 'width': width}">
    <div class="pic">
      <router-link :to="moduleType == 'hobbies' ? `/${moduleType}/hobbiesDetail/${card.id == null ? '' : card.id}/1`:  `/${moduleType}/detail/${card.id == null ? '' : card.id}/1`"
        class="img_a">
        <img :src="card.photo"
          :alt="card.title"
          width="100%"
          height="100%"
          v-if="card.photo">
      </router-link>

    </div>
    <div class="card-content">
      <router-link class="title"
        :to="moduleType == 'hobbies' ? `/${moduleType}/hobbiesDetail/${card.id == null ? '' : card.id}/1`:  `/${moduleType}/detail/${card.id == null ? '' : card.id}/1`">{{card.title == '' ? '无': card.title}}</router-link>
      <div class="info clearfix">
        <div class="info_left">
          <router-link :to="`/Bloger/${card.authorId}/1`">
            <span class="info_header">
              <img :src="card.photoUrl"
                :alt="card.title"
                height="100%"
                width="100%">
            </span>
          </router-link>
          <router-link :to="`/Bloger/${card.authorId}/1`">
            <span class="info_name">{{card.webName !== '' ? card.webName : card.author}}</span>
          </router-link>

        </div>
        <div class="info_center"></div>
        <div class="info_right">{{card.classOneName == ''?'无': card.classOneName}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '@/http/url'
export default {
  name: 'CarCard',
  props: {
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '380px'
    },
    cardData: {
      type: Object
    },
    cardType: {
      type: String
    }
  },
  computed: {
    card: function() {
      let data = this.cardData == null ? {} : this.cardData
      if (data.cover !== '' && data.cover != null) {
        data.photo = utils.getApi(data.cover)
      } else if (data.photo !== '' && data.photo != null) {
        data.photo = utils.getApi(data.photo)
      }
      if (data.photoUrl !== '' && data.photoUrl != null) {
        data.photoUrl = utils.getApi(data.photoUrl)
      }
      return data
    },
    moduleType: function() {
      return this.cardType
    }
  }
}
</script>
<style>
.index_card_block {
  display: inline-block;
  box-sizing: border-box;
  background-color: #ffffff;

  /* border: 1px solid #333; */
}

.index_card_block .pic {
  height: 280px;
  /* background-color: black; */
}

.img_a {
  display: block;
  height: 100%;
}

.index_card_block .card-content {
  padding-top: 20px;
}

.index_card_block .card-content .title {
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

.index_card_block .card-content .title:hover {
  border-color: #be001e;
  color: #be001e;
}

.index_card_block .card-content .info {
  margin-top: 20px;
  padding-left: 16px;
}

.index_card_block .card-content .info .info_left {
  height: 25px;
  font-size: 0px;
  float: left;
}

.info_header {
  width: 25px;
  height: 25px;
  background: url('~static/images/icon_head.png') no-repeat;
  float: left;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
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
</style>
