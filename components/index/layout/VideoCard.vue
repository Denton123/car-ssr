<template>
  <div class="video_card_list">
    <dl class="video_card"
      v-for="(item, index) in data"
      :key="index">
      <dd class="video_display">
        <router-link :to="`/video/detail/${item.id}/1`">
          <img :src="item.photo"
            :alt="item.title" />
        </router-link>

      </dd>

      <dt class="video_card_item">
        <router-link class="video_title"
          :to="`/video/detail/${item.id}/1`">
          <i class="video_title_line"></i>
          {{item.title}}
        </router-link>
      </dt>
      <router-link :to="`/video/detail/${item.id}/1`">
        <!-- <div class="video_display_mark">
          <div class="video_display_mark_sign">
            <div class="video_display_mark_sign_arrow"></div>
          </div>
        </div> -->
      </router-link>

    </dl>
  </div>
</template>
<script>
import utils from '@/http/url'
export default {
  name: 'VideoCard',
  props: {
    title: {
      type: String,
      default: '广汽本田建新能源工厂广汽本田源工厂广汽本田'
    },
    list: {
      type: Array
    },
    type: {
      type: String
    }
  },
  computed: {
    data: function() {
      let list = this.list == null ? [] : this.list
      let result = list.map(item => {
        if (item.cover != null && item.cover !== '') {
          item.photo = utils.getApi(item.cover)
        }
        return item
      })
      return result
    },
    moduleType: function() {
      return this.type
    }
  }
}
</script>
<style>
.video_card_list {
  height: 100%;
}
.video_card_list .video_card {
  height: 172px;
  box-sizing: border-box;
  margin-top: 10px;
  position: relative;
}
.video_card_list .video_card:hover {
  cursor: pointer;
}
.video_card_list .video_card .video_card_item {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  line-height: 50px;
}

.video_card_list .video_card:first-child {
  margin-top: 0px;
}

.video_card_list .video_card .video_title {
  display: block;
  color: black;
  /* margin-top: 5px; */
  /* margin-bottom: 5px; */
  height: 50px;
  box-sizing: border-box;
  /* border-left: 2px solid #e4e4e4; */
  /* padding-left: 18px; */
  cursor: pointer;
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 18px;
}
.video_card_list .video_card .video_title:hover .video_title_line {
  background: url('~static/images/line_red.png') no-repeat;
}
.video_card_list .video_card .video_title:hover {
  color: #be001e;
}
.video_card_list .video_title_line {
  background: url('~static/images/line_gray.png') no-repeat;
  width: 3px;
  height: 21px;
  display: inline-block;
  margin-right: 16px;
  vertical-align: middle;
}
.video_card_list .video_display,
.video_card_list .video_display_mark {
  width: 216px;
  height: 122px;
}
/* .video_card_list .video_display_mark {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 99999;
} */
.video_card_list .video_display img {
  width: 100%;
  height: 100%;
}
/* .video_card_list .video_display_mark_sign {
  width: 44px;
  height: 44px;
  border: 1px solid #ffffff;
  border-radius: 50%;
  margin: 35px auto;
}
.video_card_list .video_display_mark_sign_arrow {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 14px solid #fff;
  margin: 12px auto;
} */
</style>
