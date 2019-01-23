<template>
  <div class="person_my_essay_list">
    <my-title v-if="listData && listData.list"
      :num="listData&&listData.totalCount"></my-title>
    <div class="person_essay_list">
      <div class="person_essay_list_block"
        v-for="(item, index) in listData.list"
        :key="index">
        <nuxt-link :to="`/${item.title !== 'hobbies' ? item.classLabel.toLowerCase() : 'hobbies'}/${item.title !== 'hobbies' ? 'detail' : 'hobbiesDetail'}/${item.id}/1`">
          <div class="person_essay_list_block_pic"
            v-if="item.photo !== ''">
            <img :src="formatPic(item.photo)"
              :alt="item.title == 'hobbies' ? '兴趣部落' : item.title"
              class="person_essay_list_block_pic">
          </div>
          <div class="person_essay_list_block_pic_default"
            v-else>
            <img src="~static/common/default.png"
              alt="尖锋咖">
          </div>
          <div class="person_essay_list_block_tag">
            <!-- <span class="person_essay_list_block_tag_left"></span> -->
            <span class="person_essay_list_block_tag_title">{{item.className}}</span>
            <!-- <span class="person_essay_list_block_tag_right"></span> -->
          </div>
          <div class="person_essay_list_block_title">
            <h3 class="person_essay_list_block_titleDesc">
              <i class="person_essay_list_block_titleDesc_line"></i>
              <span>{{item.state}}</span>
              {{item.title == 'hobbies' ? '兴趣部落' : item.title}}</h3>
          </div>
          <div class="person_essay_list_block_desc">
            {{item.digest}}
          </div>
        </nuxt-link>
        <!-- 编辑按钮 -->
        <div class="person_essay_list_block_desc_edit"
          v-if="item.state === '草稿'||item.state === '审核不通过'">
          <nuxt-link :to="item.title == 'hobbies' ? `/person/editHobbies/${item.id}` : `/person/editEssay/${item.id}`">
            <i class="el-icon-edit" />
          </nuxt-link>
        </div>
      </div>

    </div>
    <pagination @pageChange="pageChange"
      :totalCount="listData&&listData.totalCount"
      v-if="listData.list &&listData.list.length !== 0"
      :pageSize="9"
      :totalPage="listData.totalPage"
      :routePage='`${currentPage}`'
      :toTop="{x: 0, y: 1200}" />
  </div>
</template>
<script>
import { webMyEssay } from '@/http/api'
import { $get, $post } from '@/http/ajax'
import myTitle from 'components/person/person_title.vue'
import systemManage from '@/http/photoApi.js'
import Pagination from '@/components/pagination.vue'
export default {
  name: 'myEssay',
  data() {
    return {
      num: '1',
      listData: {},
      state: '',
      toLinkDetail: '',
      currentPage: 1
    }
  },
  // props: {
  //   listData: {
  //     type: Object,
  //     default() {
  //       return {}
  //     }
  //   },
  // },
  components: {
    myTitle,
    Pagination
  },
  methods: {
    getArticle(page = 1) {
      let tokenObj = JSON.parse(localStorage.getItem('userMsg')) && JSON.parse(localStorage.getItem('userMsg')) != ''? JSON.parse(localStorage.getItem('userMsg')):''
      if (tokenObj == null) {
        tokenObj = {}
      }
      let cookie = this.getCookie('token')
      $get(
        webMyEssay,
        {
          limit: 9,
          page: page
        },
        {
          'X-Auth0-Token': cookie !== '' ? cookie : tokenObj.token
        }
      ).then(res => {
        this.listData = res.data.des
        if (this.listData && this.listData.list.length != 0) {
          this.listData.list.forEach(v => {
          switch (v.state) {
            case 1:
              v.state = '草稿'
              break
            case 2:
              v.state = '发布'
              break
            case 3:
              v.state = '审核'
              break
            case 4:
              v.state = '草稿'
              break
          }
          if (
            v.className !== '今日车闻' &&
            v.className !== '视频' &&
            v.className !== '新能源'
          ) {
            v.className = '兴趣部落'
          }
          this.toLinkDetail = v.title !== 'hobbies' ? 'detail' : 'hobbiesDetail'
        })
        }

      })
    },
    formatPic(item) {
      return systemManage.getApi(item)
    },
    // newPageAAA(){
    //   console.log('监听到了！！！！！！')
    //   this.currentPage = this.$route.params.page
    // },
    pageChange : function(page) {
      this.$router.push({
        path: `/person/myEssay/${page}`
      })
      setTimeout(()=>{
        this.currentPage = this.$route.params.page
        this.getArticle(page)
      })
      // this.$router.push({
      //     path: `/person/myEssay/${page}`
      // })
      // this.$router.push({
      //   path: `/person/myEssay/${page}`
      // })
    },
    // 获取cookie
    getCookie(cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
      }
      return ''
    }
  },
  mounted() {
    // console.log(this.listData.list)
    this.currentPage = this.$route.params.page
    this.getArticle(this.currentPage)
  },
  watch : {
    currentPage: {
     async handler(newPage, oldPage) {
      //  this.$emit
      }
    }
  }
}
</script>
<style>
.person_my_essay_list .person_essay_list {
  background: transparent;
}
.person_my_essay_list .person_essay_list_block {
  width: 380px;
  height: 380px;
  /* border: 1px solid; */
  margin-right: 30px;
  margin-bottom: 30px;
  background: #fff;
  position: relative;
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
}
.person_my_essay_list .person_essay_list_block a {
  color: rgba(18, 18, 18, 1);
}
.person_my_essay_list .person_essay_list_block:nth-child(3n) {
  margin-right: 0px;
}
.person_my_essay_list .person_essay_list_block_pic {
  width: 380px;
  height: 280px;
}
.person_essay_list_block_pic_default {
  width: 380px;
  height: 280px;
  background: #e7e7e7;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.person_my_essay_list .person_essay_list_block_pic img {
  width: 100%;
  height: 100%;
}
.person_my_essay_list .person_essay_list_block_tag span {
  display: inline-block;
}
.person_my_essay_list .person_essay_list_block_tag {
  position: absolute;
  top: 10px;
  left: 10px;
  /* width: 77px; */
  height: 26px;
  display: flex;
}
.person_my_essay_list .person_essay_list_block_tag_title {
  /* background: #e8e8e8; */
  font-size: 12px;
  width: 72px;
  height: 26px;
  line-height: 26px;
  padding: 0 5px;
  background: url('~static/person/tag_bg.png') no-repeat;
  text-align: center;
  background-size: 100% 100%;
  padding-left: 1px;
}
.person_my_essay_list .person_essay_list_block_title {
}
.person_my_essay_list .person_essay_list_block_titleDesc {
  height: 30px;
  margin: 0;
  padding: 0;
  /* border-left: 3px solid rgba(224, 224, 224, 1); */
  /* padding-left: 19px; */
  font-size: 18px;
  /* : SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
  margin-top: 17px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 30px;
  padding-right: 26px;
}
.person_my_essay_list .person_essay_list_block_titleDesc　img {
  width: 70px;
  height: 30px;
}
.person_my_essay_list .person_essay_list_block_titleDesc span {
  width: 62px;
  height: 30px;
  display: inline-block;
  background: url('~static/person/state_red.png') no-repeat;
  vertical-align: middle;
  text-align: center;
  font-size: 14px;
  color: #fff;
  padding-right: 20px;
}
.person_my_essay_list .person_essay_list_block_titleDesc:hover {
  /* border-left: 3px solid #be001e; */
  color: #be001e;
  cursor: pointer;
}
.person_my_essay_list .person_essay_list_block_desc {
  padding-left: 19px;
  color: rgba(91, 91, 91, 1);
  font-weight: 300;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 26px;
  margin-top: 9px;
}
.person_my_essay_list .person_essay_list_block_titleDesc_line {
  background: url('~static/images/line_gray.png') no-repeat;
  display: inline-block;
  width: 3px;
  height: 21px;
  margin-right: 16px;
  vertical-align: middle;
}
.person_my_essay_list
  .person_essay_list_block_titleDesc:hover
  .person_essay_list_block_titleDesc_line {
  background: url('~static/images/line_red.png') no-repeat;
}
.person_my_essay_list .person_essay_list_block_desc_edit {
  /* float: right; */
  font-size: 18px;
  /* padding-right: 26px; */
  cursor: pointer;
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>


