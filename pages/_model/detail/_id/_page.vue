<template>

  <!-- 详情 -->
  <div class="detail_wrap">
    <index-header />
    <div class="detail_container">
      <!-- 标题 -->
      <div class="detail_title">
        <h2>
          <nuxt-link to="/">
            <span class="detail_title_class">首页</span>
          </nuxt-link>
          <i class="detail_title_arrow detail_title_arrow_black"></i>
          <nuxt-link :to="`/${titleModel}/1`">
            <span class="detail_title_class">{{essayData.classOneName}}</span>
          </nuxt-link>
          <i class="detail_title_arrow detail_title_arrow_red"></i>
          <span>{{essayData.title}}</span>
        </h2>
      </div>
      <!-- 左侧 -->
      <div class="detail_left">
        <!-- 文章内容 -->
        <div class="detail_content">
          <div class="detail_content_title">
            <h1 class="detail_content_name">
              <span class="detail_content_origin">{{essayType}}</span>
              {{essayData.title}}
            </h1>
          </div>
          <div class="detail_content_hot"
            v-if="essayData.hotTime != null"></div>
          <!-- 用户信息 -->
          <div class="detail_content_user">
            <nuxt-link :to="`/Bloger/${essayData.userId}/1`"
              class="detail_content_user_avatar">
              <img v-if="essayData.userPhoto !== ''"
                :alt="essayData.author"
                :src="formatPic(essayData.userPhoto)"
                class="detail_content_userAvatar" >
              <img v-else
                alt="头像"
                src="~static/detail/detail_user.png"
                class="detail_content_userAvatar">
            </nuxt-link>

            <nuxt-link :to="`/Bloger/${essayData.userId}/1`">
              <span class="detail_content_userName">{{essayData.author}}</span>
            </nuxt-link>
            <span class="detail_content_user_desperate">|</span>
            <span class="detail_content_user_desc">{{essayData.classOneName}}</span>
            <span class="detail_content_time">发布时间：{{essayData.createTime}}</span>
          </div>
          <div class="detail_content_desc">
              <!-- <img :src="formatPic(essayData.photo)"
                class="detail_content_desc_pic" v-if="essayData.classOneName !== '视频'"> -->
            <div class="detail_content_introduction"
              v-html="essayData.description"></div>
          </div>
          <!-- 标签 -->
          <div class="detail_content_tab"
            v-if="tabList.length !== 0">
            <span class="detail_content_tab_title">标签</span>
            <div class="detail_content_tab_list">
              <ul>
                <div v-for="tab in tabList"
                  :key="tab.title">
                  <nuxt-link :to="`/tagList/${tab.id}/1`">
                    <li>
                      <span v-if="tab.title !== ''">{{tab.title}}</span>
                      <!-- 品牌 -->
                    </li>
                  </nuxt-link>
                </div>

              </ul>
            </div>
          </div>
          <!-- 品牌 -->
          <div class="detail_content_brand"
            v-if="brandDetail.url !== undefined">
            <div class="detail_content_brand_photo"
              v-if="brandDetail.url !== ''">
              <img class="detail_content_brand_logo"
                :src="formatPic(brandDetail.url)">
            </div>
            <div class="detail_content_brand_photo_default"
              v-else>
              <img src="~static/common/default.png">
            </div>
            <div class="detail_content_brand_desc">
              <h3 v-html="brandDetail.title"></h3>
              <p v-html="brandDetail.des"></p>
            </div>
          </div>
          <!-- 分享等操作 -->
          <div class="detail_content_operate">
            <div class="detail_content_operate_share">
              <span class="detail_content_operate_share_title">分享到</span>
              <div class="detail_content_operate_share_type">
                <ul>
                  <li @click="shareQQ(essayData.title, essayData.photo)"
                    class="detail_content_operate_share_type_qq">
                    <!-- <img src="../../../assets/detail/detail_qq.png"> -->
                  </li>
                  <li @click="shareWechat()"
                    class="detail_content_operate_share_type_wechat">
                    <!-- <img src="../../../assets/detail/detail_wechat.png"> -->
                  </li>
                  <li @click="shareWeibo(essayData.title, essayData.photo)"
                    class="detail_content_operate_share_type_weibo">
                    <!-- <img src="../../../assets/detail/detail_weibo.png"> -->
                  </li>
                </ul>
              </div>
              <div class="detail_content_operate_wechat_share"
                v-if="isShowShareWeChat">
                <i class="el-icon-close"
                  @click="closeShareWechat"></i>
                <p class="detail_content_operate_wechat_share_tip">分享到微信朋友圈</p>
                <div id="qrcode"></div>
                <p>打开微信，点击底部的“发现”</p>
                <p>使用“扫一扫”即可将网页分享至朋友圈</p>
              </div>
              <div class="detail_content_operate_like">
                <transition name="upPlus">
                  <span class="upPlus"
                    v-if="isUpPlus">+1</span>
                </transition>
                <button :disabled="isCanUp"
                  @click="handleUp()">
                  <i :class="isUp ? 'upchange' : 'up'">
                    <span>{{goodPercent}}</span>
                  </i>
                </button>
                <button :disabled="isCanDown"
                  @click="handleDown()">
                  <i :class="isDown ? 'downchange' : 'down'">
                    <span>{{badPercent}}</span>
                  </i>
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- 相关文章 -->
        <div class="detail_content_article"
          v-if="essaysWidthTag && essaysWidthTag.length !== 0 ">
          <div class="detail_content_article_title">
            <img src="~static/detail/detail_article.png">
            <h2>相关文章</h2>
          </div>

          <div class="detail_content_article_lists">
            <ul>
              <li v-for="(item, index) in essaysWidthTag"
                :key="index"
                class="detail_content_article_block">
                <nuxt-link :to="`/${item.className.toLowerCase()}/${item.className.toLowerCase() !== 'hobbies' ? 'detail': 'hobbiesDetail'}/${item.id}/1`">
                  <span style="width: 190px;height: 140px;display:inline-block;">
                    <img v-if="item.photo !== ''"
                      :src="formatPic(item.cover)"
                      class="detail_content_article_block_pic"
                      :alt="item.title">
                    <video v-else-if="item.video !== ''"
                      :src="formatPic(item.video)"
                      class="detail_content_article_block_video"></video>
                    <span class="detail_content_article_block_default"
                      v-else>
                      <img src="~static/common/default.png" />
                    </span>
                  </span>
                  <h3 class="detail_content_article_block_title">{{item.title}}</h3>
                </nuxt-link>
                  <div class="detail_content_article_block_avatar_wrap">
                    <nuxt-link :to="`/Bloger/${item.authorId}/1`">
                      <img v-if="item.authorPhoto"
                        :alt="item.author"
                        :src="formatPic(item.authorPhoto)"
                        class="detail_content_article_block_avatar">
                      <img v-else
                        src="~static/detail/detail_user.png"
                        class="detail_content_article_block_avatar">
                    </nuxt-link>
                  </div>
                  <nuxt-link :to="`/Bloger/${item.authorId}/1`">
                    <span class="detail_content_article_block_user">{{item.author}}</span>
                  </nuxt-link>
                  
                  <span class="detail_content_article_block_desperate">|</span>
                  
                  <nuxt-link :to="`/${item.className.toLowerCase()}/${item.className.toLowerCase() !== 'hobbies' ? 'detail': 'hobbiesDetail'}/${item.id}/1`">
                  <span class="detail_content_article_block_desc">{{item.tag}}</span>
                  </nuxt-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- 发布评论 -->
        <div class="detail_comment">
          <div class="detail_comment_title">
            <img src="~static/detail/detail_article.png">
            <h2>发布评论</h2>
            <span>文明上网理性发言，请遵守评论服务协议</span>
          </div>

          <div class="detail_comment_container">
            <div class="detail_comment_form">
              <div class="detail_comment_form_avatar">
                <div class="detail_comment_form_avatar_wrap">
                  <img v-if="user.photo !== ''"
                    :alt="user.loginName"
                    :src="formatPic(user.photo)">
                  <img v-else
                    src="~static/detail/detail_user.png">
                </div>
                <span>{{user.loginName}}</span>
              </div>
              <!-- <textarea name="" rows="10" cols="20" /> -->
              <div class="detail_comment_form_input">
                <p contenteditable="true"
                  class="quill_editor"
                  id="quill_editor"
                  v-if="cookie !== '' || tokenObj.token!==undefined">
                </p>
                <p v-else
                  style="text-align:center;line-height: 146px;font-size: 14px;">
                  登录后可以发表评论
                </p>
                <div class="detail_comment_form_input_operate">
                  <div class="detail_comment_form_input_operate_emoji">
                    <!-- 表情 -->
                    <div class="emoji_container"
                      v-if="isshowEmotion">
                      <emotion @emotion="handleEmotion"
                        :height="200"></emotion>
                    </div>
                    <span @click="showEmotion()">
                      <img src="~static/detail/detail_emoji.png">
                      表情
                    </span>
                  </div>
                  <div class="detail_comment_form_input_operate_login">
                    <a href="javascript:void(0);"
                      @click="handleComment()">
                      {{commentBtn}}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- 全部评论 -->
            <div class="detail_comment_list"
              v-if="articleCommentData.length !== 0">
              <div class="detail_comment_list_title">
                <h2>全部评论</h2>
                <span>{{articleCommentSize}}条</span>
              </div>

              <div class="detail_comment_lists">
                <div v-for="(list, index) in solveCommentList"
                  :key="index"
                  class="detail_comment_lists_content">
                  <nuxt-link :to="`/Bloger/${list.userId}/1`">
                    <span class="detail_comment_lists_avatar">
                      <img :src="formatPic(list.userPhoto)"
                        :alt="list.author"
                        v-if="list.userPhoto !== ''">
                      <img src="~static/detail/detail_user.png"
                        v-else>
                    </span>
                  </nuxt-link>
                  <div class="detail_comment_lists_content_user">
                    <span class="detail_comment_lists_content_user_name">{{list.author}}</span>
                    <span class="detail_comment_lists_content_user_createdAt">{{list.createTime}}</span>
                    <div class="detail_comment_lists_content_user_content"
                      v-html="list.commentText"></div>
                  </div>
                  <!-- 回复列表 -->
                  <div class="detail_comment_lists_content_replys"
                    v-if="list.replyList">
                    <div class="detail_comment_lists_content_replyLists"
                      v-for="reply in list.replyList"
                      :key="reply.id">
                      <span></span>
                      <div class="detail_comment_lists_wrap">
                        <h2>{{reply.author}}</h2>
                        <p>{{reply.commentText}}</p>
                      </div>

                    </div>
                  </div>
                  <!-- 回复操作 -->
                  <div class="detail_comment_lists_content_reply"
                    v-if="list.id === listIndex">
                    <div class="detail_comment_lists_content_reply_input">
                      <span></span>
                      <input type="text"
                        name=""
                        :placeholder="`回复：${list.author}`"
                        v-model="replyText">
                    </div>
                    <a href="javascript:void(0);"
                      class="detail_comment_lists_content_reply_btn"
                      @click="handleReply(list.essayId, list.id, replyText)">回复</a>
                  </div>
                  <div class="detail_comment_lists_content_operate">
                    <a href="javascript:void(0);"
                      class="detail_comment_lists_content_operate_reply"
                      @click="showReply(list.id)"
                      v-if="couldReply && list.replyList.length === 0">回复</a>
                    <a href="javascript:void(0);"
                      :class="list.goodBadLog == 1 ? 'detail_comment_lists_content_operate_like_handle':'detail_comment_lists_content_operate_like'"
                      @click="handleLike(list.id, list.goodCount)">
                      <span v-if="isShowDefault || list.id !== likeIndex || userCode === 2">{{list.goodCount}}</span>
                      <!-- <span v-else-if="list.id === likeIndex">{{goodCountChange}}</span> -->
                    </a>
                  </div>
                </div>
              </div>
              <pagination class="pagination"
                @pageChange="pageChange"
                :totalCount="commentData.totalCount"
                :currentPage="commentData.currPage"
                :pageSize="commentData.pageSize"
                :toTop="{x:0, y: 400}"
                :totalPage="commentData.totalPage"
                :routePage='`${currentPage}`' />
            </div>
          </div>
        </div>

      </div>

      <!-- 右侧 -->

      <div class="detail_right">
        <!-- 用户 -->
        <div class="detail_user">
          <div class="detail_user_wrap">
            <span class="detail_user_bg_white"></span>
            <span class="detail_user_bg_red"></span>
            <div class="detail_user_msgWrap">
              <div class="detail_user_msg">
                <nuxt-link :to="user.id !== essayData.userId ? `/Bloger/${essayData.userId}/1` : '/person/myEssay/1'">
                  <div class="detail_user_msg_avatar_wrap">
                    <img :src="formatPic(essayData.userPhoto)"
                      :alt="essayData.author"
                      v-if="essayData.userPhoto">
                    <!-- <img src="/static/person/person_default.png"
                      v-else> -->
                  </div>
                </nuxt-link>
                <span>
                  <nuxt-link :to="user.id !== essayData.userId ? `/Bloger/${essayData.userId}/1` : '/person/myEssay/1'">

                    <span class="detail_user_msg_name">{{essayData.author}}</span>
                  </nuxt-link>
                </span>

                <a href="javascript:void(0);"
                  class="detail_user_msg_focus"
                  @click="focusBlogger(essayData.userId)"
                  >
                  <span v-if="detailData.couldFollow || isfocusBg" class="focusBg">已关注</span>
                  <span v-else class="nofocusBg">关注</span>
                </a>
              </div>
              <div class="detail_user_othermsg">
                <ul>
                  <li>
                    <a href="javascript:void(0);">
                      <span>粉丝</span>
                      <span>{{userInfo.fansCount == null ? 0 : userInfo.fansCount}}</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <span>关注</span>
                      <span>{{userInfo.fllowCount == null ? 0 : userInfo.fllowCount }}</span>
                    </a>
                  </li>
                  <li>
                    <nuxt-link :to="`/Bloger/${essayData.userId}/1`">
                      <span>文章</span>
                      <span>{{userInfo.essayCount == null ? 0 : userInfo.essayCount}}</span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 更多 -->
        <div class="detail_more"
          v-if="hotData && hotData.length !== 0">
          <div class="detail_more_title">
            <img src="~static/detail/detail_article.png">
            <h2>热门作品</h2>
            <nuxt-link :to="`/Bloger/${essayData.userId}/1`"  class="detail_more_title_more">
              更多
           </nuxt-link>
          </div>
          <div class="detail_more_content">
            <ul>
              <li v-for="(hot, index) in hotData"
                :key="index">
                <nuxt-link :to="`/${hot.className}/${hot.className !== 'hobbies' ? 'detail' : 'hobbiesDetail' }/${hot.id}/1`">
                  <div v-if="hot.cover !== ''">
                    <img :src="formatPic(hot.cover)" :alt="hot.title">
                  </div>
                  <div v-else
                    class="detail_more_content_default">
                    <img src="~static/common/default.png" />
                  </div>

                  <div class="detail_more_content_list">
                    <p>
                      {{hot.title}}
                    </p>
                    <span>
                      {{hot.createTime}}
                    </span>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- 随机推荐 -->
        <div class="detail_more"
          v-if="randomData && randomData.length !== 0">
          <div class="detail_more_title">
            <img src="~static/detail/detail_article.png">
            <h2>随机推荐</h2>
            <a href="javascript:void(0);"
              @click="changeRandom()"
              class="detail_more_title_more">
              换一换
            </a>
          </div>
          <div class="detail_more_content">
            <ul>
              <li v-for="(random, index) in randomData"
                :key="index">

                <nuxt-link :to="`/${random.className}/${random.className !== 'hobbies' ? 'detail' : 'hobbiesDetail'}/${random.id}/1`">
                  <div v-if="random.cover!==''">
                    <img :src="formatPic(random.cover)" :alt="random.title">
                  </div>
                  <div v-else
                    class="detail_more_content_default">
                    <img src="~static/common/default.png">
                  </div>
                  <div class="detail_more_content_list">
                    <p>
                      {{random.title}}
                    </p>
                    <span>
                      {{random.createTime}}
                    </span>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <div id="advertisement">
        <img src="~static/detail/ad.png"
          alt="">
      </div>
    </div>
    <index-footer />
  </div>
</template>
<script>
import { $get, $post } from '@/http/ajax'
import {
  webEssayDetailsInfo,
  webEssayEssayCommentList,
  webEssayReplyEssayComment,
  webEssayGoodLog,
  webEssaySaveEssayComment,
  webUserAthourInfo,
  webEssayClickEssay,
  webUserClickCare,
  webEssayDetailTag,
  webHobbiesDetailTopSix,
  webHobbiesDetailRandomData,
  webUserSelectByPrimaryKey
} from '@/http/api'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Emotion from 'components/detail/emotionIndex.vue'
import Pagination from '@/components/pagination.vue'

// 富文本编辑器
// import { quillEditor } from 'vue-quill-editor'
import { instance } from '@/http/instance'

import systemManage from '@/http/photoApi.js'
import Utils from '@/utils/until'

// 二维码
// import QRCode from 'qrcodejs2'

export default {
  name: 'Detail',
  components: {
    'index-header': Header,
    'index-footer': Footer,
    // quillEditor,
    Emotion,
    Pagination
  },
  head(){
    return{
      title:`${this.essayData.title}-${this.essayData.classOneName}-尖锋咖`
    }
  },
  data() {
    return {
      // 评论全部数据
      // commentData: {},
      // 获取全部detailID的数据
      // detailData: {},
      // 表情数据绑定
      content: '',
      // comment: '',
      // 是否显示表情
      isshowEmotion: false,
      // 文章数据
      // essayData: {},
      // 相关文章数据
      // essaysWidthTag: [],
      // 标签数据
      tabList: [], 
      // 回复文本
      replyText: '',
      // 品牌详情
      brandDetail: {},
      shareType: ['detail_wechat', 'detail_qq', 'detail_weibo'],
      listIndex: -1,
      // 热门作品数据
      // hotData: [],
      // 随机推荐数据
      // randomData: [],
      // 文章评论列表数据
      // articleCommentData: [],
      test: 'gfygy',
      // 全部评论条数
      // articleCommentSize: '',
      // 是否可回复
      couldReply: false,
      userInfo: {},
      isShowReply: false,
      // 文章类型
      essayType: '原创',
      // 点赞
      isShowDefault: true,
      goodCountChange: '',
      likeIndex: -1,
      // 文章id
      essayid: '',
      // 是否可以点赞或爆胎
      isCanUp: false,
      isCanDown: false,
      // 是否可以关注
      isFollow: '',
      // 加油百分比
      goodPercent: '',
      // 爆胎百分比
      badPercent: '',
      // 点赞和爆胎的背景切换
      isUp: false,
      isDown: false,
      // 加一
      isUpPlus: false,
      // 随机推荐跳转type
      randomType: '',
      tokenObj: {},
      // 评论按钮
      commentBtn: '',
      isShowShareWeChat: false,
      // 面包屑跳转路由
      titleModel: '',
      // 页面标题的页码
      currentPage: 1,
      // cookie
      cookie: '',
      // 登录用户信息
      user: {
        photo: ''
      },
      userCode: 2,
      isfocusBg: false
    }
  },
  async asyncData({params, context, req}) {
    let token = Utils.b_getToken(req)
    let essayData
    let isFollow
    // 文章评论
    let articleCommentData = await $get(webEssayEssayCommentList, {essayId: params.id,
        limit: '10',
        order: 'asc',
        page: 1})
    // 相关文章信息
    let essaysWidthTag = await $get(webEssayDetailTag, {
        essayId: params.id
      }, {
      'X-Auth0-Token': token
    })
    // 文章信息
    let detailData = await $get(webEssayDetailsInfo, {
      id: params.id
    }, {
      'X-Auth0-Token': token
    })
    // 热门作品
    let hotData = await $get(webHobbiesDetailTopSix, {
      bloggerId: detailData.data.result_data.essay.userId
    })
    // 随机推荐
    let randomData = await $get(webHobbiesDetailRandomData, {
      bloggerId: detailData.data.result_data.essay.userId
    })
    essaysWidthTag = essaysWidthTag.data.result_data == null ? [] : essaysWidthTag.data.result_data
      essaysWidthTag.forEach(v => {
      if (v.className.toLowerCase() == 'news') {
        v.tag = '今日车闻'
      } else if (v.className.toLowerCase() == 'video') {
        v.tag = '视频'
      } else if (v.className.toLowerCase() == 'hobbies') {
        v.tag = '兴趣部落'
      } else if (v.className.toLowerCase() == 'ev') {
        v.tag = '新能源'
      } else {
        v.tag = '兴趣部落'
      }
    }) 
      return {
        articleCommentData: articleCommentData.data ? articleCommentData.data.list : [],
        commentData: articleCommentData.data ? articleCommentData.data : [],
        articleCommentSize: articleCommentData.data.totalCount ? articleCommentData.data.totalCount : '',
        essaysWidthTag: essaysWidthTag ? essaysWidthTag : [],
        // isFollow: detailData.data.result_data.couldFollow && detailData.data.result_data.couldFollow !== null ? '已关注': '关注',
        essayData: detailData.data.result_data.essay ? detailData.data.result_data.essay : {},
        detailData: detailData.data.result_data ? detailData.data.result_data : {},
        hotData: hotData.data.result_data ? hotData.data.result_data : [],
        randomData: randomData.data.result_data ? randomData.data.result_data : []
      }
  },
    computed: {
    solveCommentList() {
    let result = this.articleCommentData.map(item => {
      item.commentText = item.commentText.replace(/(&amp;nbsp;)/g, ' ')
      item.replyList = item.replyList.map(innerItem => {
        innerItem.commentText = innerItem.commentText.replace(/(&amp;nbsp;)/g, ' ')
        return innerItem
      })
      return item
      })
      return result
    }
  },
  methods: {
    getArticle() {
      // ajax.$get('/dsf/feature/list').then(res => {
      //   console.log(res)
      // })
    },
    // 显示回复
    showReply(index) {
      this.listIndex = index
      // this.isShowReply = true
      // console.log(index)
      // console.log(this.listIndex)
    },
    emotion(res) {
      let word = res.replace(/#|;/gi, '')
      const list = [
        '微笑',
        '撇嘴',
        '色',
        '发呆',
        '得意',
        '流泪',
        '害羞',
        '闭嘴',
        '睡',
        '大哭',
        '尴尬',
        '发怒',
        '调皮',
        '呲牙',
        '惊讶',
        '难过',
        '酷',
        '冷汗',
        '抓狂',
        '吐',
        '偷笑',
        '可爱',
        '白眼',
        '傲慢',
        '饥饿',
        '困',
        '惊恐',
        '流汗',
        '憨笑',
        '大兵',
        '奋斗',
        '咒骂',
        '疑问',
        '嘘',
        '晕',
        '折磨',
        '衰',
        '骷髅',
        '敲打',
        '再见',
        '擦汗',
        '抠鼻',
        '鼓掌',
        '糗大了',
        '坏笑',
        '左哼哼',
        '右哼哼',
        '哈欠',
        '鄙视',
        '委屈',
        '快哭了',
        '阴险',
        '亲亲',
        '吓',
        '可怜',
        '菜刀',
        '西瓜',
        '啤酒',
        '篮球',
        '乒乓',
        '咖啡',
        '饭',
        '猪头',
        '玫瑰',
        '凋谢',
        '示爱',
        '爱心',
        '心碎',
        '蛋糕',
        '闪电',
        '炸弹',
        '刀',
        '足球',
        '瓢虫',
        '便便',
        '月亮',
        '太阳',
        '礼物',
        '拥抱',
        '强',
        '弱',
        '握手',
        '胜利',
        '抱拳',
        '勾引',
        '拳头',
        '差劲',
        '爱你',
        'NO',
        'OK',
        '爱情',
        '飞吻',
        '跳跳',
        '发抖',
        '怄火',
        '转圈',
        '磕头',
        '回头',
        '跳绳',
        '挥手',
        '激动',
        '街舞',
        '献吻',
        '左太极',
        '右太极'
      ]
      let index = list.indexOf(word)
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
    },
    // 转义表情
    handleEmotion(i, e) {
      if (e.target.nodeName === 'IMG') {
        let choice = e.target
        let cEle = choice.cloneNode(true)
        let editor = document.getElementById('quill_editor')
        editor.appendChild(cEle)
        this.isshowEmotion = false
      }
    },
    // 显示表情
    showEmotion() {
      if (this.tokenObj.token !== undefined || this.cookie !== '') {
        this.isshowEmotion = !this.isshowEmotion
      } else {
        this.$message('请先登录')
        // return
      }
    },
    // 新增回复评论
    async handleReply(essayId, replyId, content) {
      // &nbsp;转义为空格的方法：
        function nbsp2Space(str) {
            var arrEntities = {'nbsp' : ' '};
            return str.replace(/&(nbsp);/ig, function(all, t){
            return arrEntities[t]})
        }
        content =  nbsp2Space(content)
        if ( !content|| content == '' ||
          (content > 0 &&
            content.trim().length == 0) ||
          content == null ||
          content == undefined) {
          this.$message('内容不为空')
        } else {
            let urlParam = new URLSearchParams()
            urlParam.append('beRepliedId', replyId)
            urlParam.append('essayId', essayId)
            urlParam.append('replyCommentText', content)
            if (content !== '') {
              let res = await $post(webEssayReplyEssayComment, urlParam)
              // console.log(res)
              if (res.data.result_code === 1) {
                this.replyText = ''
                this.$message({
                  showClose: true,
                  message: '新增回复成功',
                  type: 'success'
                })
                // console.log(this.isShowReply)
                this.listIndex = -1
                this.getCommentData(this.currentPage)
              }
            } 
        }
    },
    // 点赞
    async handleLike(commentId, count) {
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      let urlParam = new URLSearchParams()
      urlParam.append('commentId', commentId)
      var res = await $post(webEssayGoodLog, urlParam, {
        'X-Auth0-Token': this.cookie !== '' ? this.cookie : this.tokenObj.token
      })
      if (res.data.result_data === null) {
        this.$message(res.data.result_msg)
      } else {
        this.getCommentData(this.currentPage)
      }
      this.likeIndex = commentId
      this.likeIndex = commentId
    },
    // 新增评论
    async handleComment() {
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      let editor = document.getElementById('quill_editor')
      if (this.cookie !== '' || this.tokenObj.token !== undefined) {
        let editor = document.getElementById('quill_editor')
      }
      // &nbsp;转义为空格的方法：
      function nbsp2Space(str) {
          var arrEntities = {'nbsp' : ' '};
          return str.replace(/&(nbsp);/ig, function(all, t){
          return arrEntities[t]})
      }
      if(this.tokenObj.token !== undefined || this.cookie !== ''){
          editor.innerHTML =  nbsp2Space(editor.innerHTML)
      }
      if (this.tokenObj.token !== undefined || this.cookie !== '') {
        if (editor.innerHTML == '' || (editor.innerHTML.length > 0 &&
            editor.innerHTML.trim().length == 0) ||
          editor.innerHTML == null ||
          editor.innerHTML == undefined) {
          this.$message('内容不为空')
        } else {
          // console.log('新增评论')
          let urlParam = new URLSearchParams()
          urlParam.append('commentText', editor.innerHTML)
          urlParam.append('essayId', this.essayData.id)
          let res = await $post(webEssaySaveEssayComment, urlParam, {
            'X-Auth0-Token':
              this.cookie !== '' ? this.cookie : this.tokenObj.token
          })
          editor.innerHTML = ''
          if (res.data.result_code === 1) {
            this.$message({
              showClose: true,
              message: '新增评论成功',
              type: 'success'
            })
            this.isshowEmotion = false
            this.getCommentData(this.currentPage)
          } else if (res.data.result_data === null) {
            this.$message(res.data.result_msg)
          }
        }
      } else {
        this.$message('请先登录')
        this.$router.push('/login')
      }
    },
    // 获取文章数据
    async getArticleData() {
      this.tokenObj = localStorage.getItem('userMsg') &&  localStorage.getItem('userMsg') != '' ?  JSON.parse(localStorage.getItem('userMsg')) : {}
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      // 获取文章信息
      let res = await $get(
        webEssayDetailsInfo,
        {
          id: this.essayid
        },
        {
          'X-Auth0-Token':
            this.cookie !== '' ? this.cookie : this.tokenObj.token
        }
      )
      this.detailData = res.data.result_data
      // 文章信息
      this.essayData = this.detailData.essay
      this.getDataTopSix()
      this.getRandomData()
      // 判断是否可以关注
      if (this.userCode !== 2) {
        if (
          this.detailData.couldFollow &&
          this.detailData.couldFollow !== null
        ) {
          this.isFollow = '已关注'
        } else {
          this.isFollow = '关注'
        }
      } else {
        this.isFollow = '关注'
      }
      switch (this.essayData.classOneName) {
        case '今日车闻':
          this.titleModel = 'news'
          break
        case '兴趣部落':
          this.titleModel = 'hobbies'
          break
        case '新能源':
          this.titleModel = 'ev'
          break
        case '视频':
          this.titleModel = 'video'
          break
      }
      this.tabList = this.detailData.essay.tagList
      this.tabList.forEach(list => {
          if (list.isShow === 1) {
            this.brandDetail = list
          }
        })
      // 判断是否点击过
      if (
        this.detailData.essayLogEntity &&
        this.detailData.essayLogEntity !== null &&
        this.detailData.essayLogEntity.length !== 0
      ) {
        if (this.essayData.good !== 0 || this.essayData.bad !== 0) {
          this.isUp = true
          this.isDown = true
          this.goodPercent =
            Math.round(
              (this.essayData.good /
                (this.essayData.good + this.essayData.bad)) *
                100
            ) + '%'

          this.badPercent =
            Math.round(
              (this.essayData.bad /
                (this.essayData.good + this.essayData.bad)) *
                100
            ) + '%'
        }
        this.isCanDown = true
        this.isCanUp = true
      } else {
        this.isCanDown = false
        this.isCanUp = false
      }
      // 是否显示回复按钮
      this.couldReply = this.detailData.couldReply
      // 判断文章类型
      switch (this.essayData.type) {
        case 1:
          this.essayType = '原创'
          break
        case 2:
          this.essayType = '转载'
          break
        case 3:
          this.essayType = '翻译'
          break
      }
    },
    // 获取相关文章信息
    async getDataWithTag() {
      let res = await $get(webEssayDetailTag, {
        essayId: this.essayid
      })
      if (res.data.result_msg === 'success') {
        this.essaysWidthTag = res.data.result_data
        this.essaysWidthTag.forEach(v => {
          if (v.className.toLowerCase() == 'news') {
            v.tag = '今日车闻'
          } else if (v.className.toLowerCase() == 'video') {
            v.tag = '视频'
          } else if (v.className.toLowerCase() == 'hobbies') {
            v.tag = '兴趣部落'
          } else if (v.className.toLowerCase() == 'ev') {
            v.tag = '新能源'
          } else {
            v.tag = '兴趣部落'
          }
        })
      }
      // console.log('++++++++++++++++++++')
      // console.log(res)
      // console.log('++++++++++++++++++++')
    },
    // 获取六篇热门作品数据
    getDataTopSix() {
      // console.log('博主')
      // console.log(this.essayData)
      $get(webHobbiesDetailTopSix, {
        bloggerId: `${this.essayData.userId}`
      }).then(res => {
        // console.log(typeof res.data.result_code)
        if (res.data.result_code === 1) {
          res.data.result_data.forEach(v => {
            if (v.className == '新能源') {
              v.className = 'ev'
            } else if (v.className == '今日车闻') {
              v.className = 'news'
            } else if (v.className == '兴趣部落') {
              v.className = 'hobbies'
            } else if (v.className == '视频') {
              v.className = 'video'
            } else {
              v.className = 'hobbies'
            }
          })
          // console.log(res.data.result_data)
          this.hotData = res.data.result_data
          // console.log(this.hotData)
        }
      })
    },
    // 获取随机数据
    getRandomData() {
      let res = $get(webHobbiesDetailRandomData, {
        bloggerId: `${this.essayData.userId}`
      }).then(res => {
        if (res.data.result_msg === 'success') {
          res.data.result_data.forEach(v => {
            if (v.className == '新能源') {
              v.className = 'ev'
            } else if (v.className == '今日车闻') {
              v.className = 'news'
            } else if (v.className == '兴趣部落') {
              v.className = 'hobbies'
            } else if (v.className == '视频') {
              v.className = 'video'
            } else {
              v.className = 'hobbies'
            }
          })
          this.randomData = res.data.result_data
        }
      })
    },
    // 获取评论数据
    async getCommentData(page = 1) {
      // console.log('sssssss')
      // 获取文章评论信息
      let articleComment = await $get(webEssayEssayCommentList, {
        essayId: this.essayid,
        limit: '10',
        order: 'asc',
        page: page
      })
      // console.log(articleComment.data.totalCount + '哈哈哈哈哈')
      this.articleCommentData = articleComment.data.list
      this.commentData = articleComment.data
      this.articleCommentSize = articleComment.data.totalCount
    },

    // 根据文章ID获取用户信息
    async getUserInfo() {
      let userInfo = await $get(webUserAthourInfo, {
        essayId: this.essayid
      })
      this.userInfo = userInfo.data
      // console.log(userInfo)
    },
    formatPic(item) {
      return systemManage.getApi(item)
    },
    pageChange(page) {
      let model
      switch (this.essayData.classOneName) {
        case '新能源':
          model = 'ev'
          break
        case '兴趣部落':
          model = 'hobbies'
          break
        case '视频':
          model = 'video'
          break
        case '今日车闻':
          model = 'news'
          break
      }
      let id= this.$route.params.id
      this.$router.push({
        path: `/${model}/detail/${id}/${page}`
      })
      this.currentPage = page
      setTimeout(()=>{
        this.getCommentData(page)
      })
    },
    // 加油
    async handleUp() {
      // console.log('加油')
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      // if (this.tokenObj.token !== undefined) {
      let res = await $get(
        webEssayClickEssay,
        {
          essayId: this.essayid,
          type: '2',
          userId: this.essayData.userId
        },
        {
          'X-Auth0-Token':
            this.cookie !== '' ? this.cookie : this.tokenObj.token
        }
      )
      if (res.data.result_code === 2) {
        this.$message('登录失效，请重新登录')
      } else {
        this.isCanUp = true
        this.isCanDown = true
        this.isUp = true
        this.isDown = true
        this.isUpPlus = true
        setTimeout(() => {
          this.isUpPlus = false
        }, 0)
        this.goodPercent = res.data.goodPercent + '%'
        this.badPercent = res.data.badPercent + '%'
        this.getArticleData()
      }
      // } else {
      //   this.$message('请先登录')
      //   this.isCanUp = true
      //   this.isCanDown = true
      // }
    },
    // 爆胎
    async handleDown() {
      // console.log('爆胎')
      // if (this.tokenObj.token !== undefined) {
      let res = await $get(webEssayClickEssay, {
        essayId: this.essayid,
        type: '1',
        userId: this.essayData.userId
      })
      // console.log(res);
      this.isCanUp = true
      this.isCanDown = true
      this.isUp = true
      this.isDown = true
      this.goodPercent = res.data.goodPercent + '%'
      this.badPercent = res.data.badPercent + '%'
      this.getArticleData()
      // } else {
      //   this.$message('请先登录')
      //   this.isCanUp = true
      //   this.isCanDown = true
      // }
    },
    // 分享到qq
    shareQQ(title, pic) {
      let params = {
        url: `${window.location.href}`, // 获取URL，可加上来自分享到QQ标识，方便统计
        // desc: '来自游客的分享', // 分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）
        title: title, // 分享标题(可选)
        // summary: '', // 分享描述(可选)
        pics: this.formatPic(pic), // 分享图片(可选)
        site: 'QQ分享' // 分享来源 (可选) ，如：QQ分享
      }
      let s = []
      for (var i in params) {
        s.push(i + '=' + encodeURIComponent(params[i] || ''))
      }
      var target_url =
        'http://connect.qq.com/widget/shareqq/iframe_index.html?' + s.join('&')
      window.open(target_url, 'qq', 'height=520, width=720')
    },
    // 分享到微信
    shareWechat() {
      window.open(
        `http://zixuephp.net/inc/qrcode_img.php?url=${window.location.href}`
      )
    },
    // 分享到微博
    shareWeibo(title, pic) {
      var params = {
        url: `${window.location.href}`,
        type: '3',
        count: '1', // 是否显示分享数，1显示(可选),
        appkey: 'QQ分享', // 您申请的应用appkey,显示分享来源(可选),
        title: title, // 分享的文字内容(可选，默认为所在页面的title),
        pic: this.formatPic(pic), //分享图片的路径(可选),
        ralateUid: '', //关联用户的UID，分享微博会@该用户(可选),
        rnd: new Date().valueOf()
      }
      var temp = []
      for (var p in params) {
        temp.push(p + '=' + encodeURIComponent(params[p] || ''))
      }
      var targetUrl =
        'http://service.weibo.com/share/share.php?' + temp.join('&')
      window.open(targetUrl, 'sinaweibo', 'height=430, width=400')
    },
    // 关注/取消关注博客
    async focusBlogger(id) {
      // 没有登录
      if (this.tokenObj.token !== undefined || this.cookie !== '') {
        if (this.essayData.userId == this.user.id) {
          this.$message('用户不能关注自己')
        } else {
          let urlParam = new URLSearchParams()
          urlParam.append('bloggerId', `${id}`)
          if (this.detailData && this.detailData.couldFollow) {
            urlParam.append('type', 'cancel')
            let res = await $post(webUserClickCare, urlParam, {
              'X-Auth0-Token':
                this.cookie !== '' ? this.cookie : this.tokenObj.token
            })
            this.isfocusBg = false
            this.getArticleData()
            this.getUserInfo()
            // console.log(res)
          } else {
            urlParam.append('type', 'follow')
            let res = await $post(webUserClickCare, urlParam, {
              'X-Auth0-Token':
                this.cookie !== '' ? this.cookie : this.tokenObj.token
            })
            if (res.data.str === '请先登录!') {
              this.$message('请先登录')
            } else {
              this.isfocusBg = true
              this.getArticleData()
              this.getUserInfo()
            }
          }
        }
      } else {
        this.$message('请先登录')
      }
    },
    changeRandom() {
      this.getRandomData()
    },
    closeShareWechat() {
      this.isShowShareWeChat = false
    },
    // 获取cookie
    getCookie(cname) {
      // console.log(cname, 'cookie')
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
      }
      return ''
    },
    getLoginUserInfo() {
      if (this.tokenObj == null) {
        this.tokenObj = {}
      }
      $get(
        webUserSelectByPrimaryKey,
        {},
        {
          'X-Auth0-Token':
            this.cookie !== '' ? this.cookie : this.tokenObj.token
        }
      ).then(res => {
        // console.log(res, 'res')
        if (res.data.code == 0) {
          this.user = res.data.des.user
          this.userCode = res.data.code
          if (this.userCode == 2) {
            this.isFollow = '关注'
          }
          // console.log(this.userCode)
        }
      })
    },
    handleData() {
      // this.essaysWidthTag.forEach(v => {
      //     if (v.className.toLowerCase() == 'news') {
      //       v.tag = '今日车闻'
      //     } else if (v.className.toLowerCase() == 'video') {
      //       v.tag = '视频'
      //     } else if (v.className.toLowerCase() == 'hobbies') {
      //       v.tag = '兴趣部落'
      //     } else if (v.className.toLowerCase() == 'ev') {
      //       v.tag = '新能源'
      //     } else {
      //       v.tag = '兴趣部落'
      //     }
      //   })
      // if (this.userCode !== 2) {
      //   console.log(this.userCode, 'this.userCode')
      //   console.log(this.detailData.couldFollow, 'couldFollow')
      //   if (
      //     this.detailData.couldFollow &&
      //     this.detailData.couldFollow !== null
      //   ) {
      //     this.isFollow = '已关注'
      //   } else {
      //     this.isFollow = '关注'
      //   }
      // } else {
      //   this.isFollow = '关注'
      // }
      switch (this.essayData.classOneName) {
        case '今日车闻':
          this.titleModel = 'news'
          break
        case '兴趣部落':
          this.titleModel = 'hobbies'
          break
        case '新能源':
          this.titleModel = 'ev'
          break
        case '视频':
          this.titleModel = 'video'
          break
      }
      this.tabList = this.detailData.essay.tagList
      this.tabList.forEach(list => {
          if (list.isShow === 1) {
            this.brandDetail = list
          }
        })
      // 判断是否点击过
      if (
        this.detailData.essayLogEntity &&
        this.detailData.essayLogEntity !== null &&
        this.detailData.essayLogEntity.length !== 0
      ) {
        if (this.essayData.good !== 0 || this.essayData.bad !== 0) {
          this.isUp = true
          this.isDown = true
          this.goodPercent =
            Math.round(
              (this.essayData.good /
                (this.essayData.good + this.essayData.bad)) *
                100
            ) + '%'

          this.badPercent =
            Math.round(
              (this.essayData.bad /
                (this.essayData.good + this.essayData.bad)) *
                100
            ) + '%'
        }
        this.isCanDown = true
        this.isCanUp = true
      } else {
        this.isCanDown = false
        this.isCanUp = false
      }
      // 是否显示回复按钮
      this.couldReply = this.detailData.couldReply
      // 判断文章类型
      switch (this.essayData.type) {
        case 1:
          this.essayType = '原创'
          break
        case 2:
          this.essayType = '转载'
          break
        case 3:
          this.essayType = '翻译'
          break
      }
      this.hotData.forEach(v => {
        if (v.className == '新能源') {
          v.className = 'ev'
        } else if (v.className == '今日车闻') {
          v.className = 'news'
        } else if (v.className == '兴趣部落') {
          v.className = 'hobbies'
        } else if (v.className == '视频') {
          v.className = 'video'
        } else {
          v.className = 'hobbies'
        }
      })
      this.randomData.forEach(v => {
        if (v.className == '新能源') {
          v.className = 'ev'
        } else if (v.className == '今日车闻') {
          v.className = 'news'
        } else if (v.className == '兴趣部落') {
          v.className = 'hobbies'
        } else if (v.className == '视频') {
          v.className = 'video'
        } else {
          v.className = 'hobbies'
        }
      })
    }
  },
  //  beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (vm.userCode !== 2) {
  //       if (vm.detailData.couldFollow && vm.detailData.couldFollow !== null) {
  //         vm.isFollow = '已关注'
  //       } else {
  //         vm.isFollow = '关注'
  //       }
  //     } else {
  //       vm.isFollow = '关注'
  //     }
  //   })
  // },
  created(){
    // this.handleData()
  },
  mounted() {
    this.cookie = this.getCookie('token')
    if (this.cookie == '') {
       this.tokenObj = localStorage.getItem('userMsg') &&  localStorage.getItem('userMsg') != '' ?  JSON.parse(localStorage.getItem('userMsg')) : {}
    }
    if (this.tokenObj == null) {
      this.tokenObj = {}
    }
    this.handleData()
    this.commentBtn =
      this.tokenObj.token !== undefined || this.cookie !== '' ? '评论' : '登录'
    this.currentPage = this.$route.params.page
    this.$nextTick(async () => {
      this.essayid = this.$route.params.id
      this.getLoginUserInfo()
      // 以下getArticleData（）为客户端再渲染一次，不能去掉，否则点赞爆胎刷新之后就没了
      this.getArticleData()
      this.getUserInfo()
      // this.getDataTopSix()
      // this.getRandomData()
      let ad = document.getElementById('advertisement')
      if (ad) {
        ;(window.slotbydup = window.slotbydup || []).push({
          id: '5993946',
          container: ad,
          size: '1200,200',
          display: 'inlay-fix',
          async: true
        })
      }
    })
  },
  watch: {
    $route(to, from) {
      this.$router.go(0)
    }
  }
  // beforeRouteEnter (to)
}
</script>

<style>
.detail_wrap {
  width: 100%;
  background: #f5f5f5;
}
.detail_container {
  width: 1200px;
  margin: 0 auto;
  /*border: 1px solid;*/
  overflow: hidden;
}
/*头部*/
.detail_title {
  height: 74px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(18, 18, 18, 1);
  line-height: 74px;
  /*border: 1px solid;*/
}
.detail_title h2 {
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(18, 18, 18, 1);
  line-height: 74px;
}

.detail_title h2 span {
  color: rgba(190, 0, 30, 1);
  font-weight: 400;
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
}
.detail_title_class {
  color: #000 !important;
}
.detail_title_class:hover{
  color: #be001e !important
}
.detail_title_arrow {
  width: 6px;
  height: 8px;
  display: inline-block;
  margin: 0 16px;
}
.detail_title_arrow_black {
  background: url('~static/detail/detail_title_arrow.png');
}
.detail_title_arrow_red {
  background: url('~static/detail/detail_title_arrow_red.png');
}
/*左侧*/
.detail_left {
  width: 790px;
  /*display: inline-block;*/
  float: left;
  /*border: 1px solid;*/
}
.detail_content {
  background: #fff;
  padding: 40px;
  position: relative;
}

.detail_content_title {
  /*height: 31px;*/
}
.detail_content_origin {
  width: 72px;
  height: 32px;
  display: inline-block;
  text-align: center;
  line-height: 32px;
  background: url('~static/detail/detail_origin.png') no-repeat;
  color: rgba(254, 254, 254, 1);
  font-size: 16px;
  font-weight: 500;
  vertical-align: middle;
}
.detail_content_name {
  display: inline-block;
  height: 32px;
  line-height: 50px;
  font-size: 32px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
  text-align: left !important;
}
.detail_content_hot {
  width: 59px;
  height: 63px;
  display: inline-block;
  background: url('~static/detail/detail_hot.png') no-repeat;
  position: absolute;
  top: 0;
  right: 0;
}
.detail_content_user {
  position: relative;
  font-size: 14px;
  /* font-family: SourceHanSansCN-Light; */
  font-weight: 300;
  color: rgba(177, 177, 177, 1);
  margin-bottom: 36px;
  margin-top: 20px;
}
.detail_content_user_avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
}
.detail_content_userAvatar {
  width: 100%;
  height: 100%;
  margin-right: 6px;
  vertical-align: middle;
}
.detail_content_userName {
  color: rgba(177, 177, 177, 1);
}
.detail_content_user_desperate {
  width: 1px;
  height: 11px;
  color: rgba(177, 177, 177, 1);
  margin: 0 20px;
}
.detail_content_time {
  position: absolute;
  right: 0;
}
.detail_content_desc_pic {
  width: 710px;
  height: 416px;
  margin-bottom: 31px;
}
.detail_content_tab {
  margin-top: 80px;
  /* height: 50px; */
  margin-bottom: 20px;
  position: relative;
}
.detail_content_tab_title {
  font-size: 14px;
  /* font-family: SourceHanSansCN-Regular; */
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin-right: 35px;
  line-height: 50px;
  vertical-align: top;
}
.detail_content_tab_list {
  display: inline-block;
  /* position: absolute; */
  width: 640px;
  /* border: 1px solid; */
}
.detail_content_operate_share {
  position: relative;
}
.detail_content_tab_list ul,
.detail_content_operate_share_type ul,
.detail_content_article_lists ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.detail_content_operate_share_type_qq {
  background: url('~static/detail/detail_qq.png') no-repeat 100% 100%;
}
.detail_content_operate_share_type_qq:hover {
  background: url('~static/detail/hover_qq.png') no-repeat 100% 100%;
}
.detail_content_operate_share_type_wechat {
  background: url('~static/detail/detail_wechat.png') no-repeat 100% 100%;
}
.detail_content_operate_share_type_wechat:hover {
  background: url('~static/detail/hover_wechat.png') no-repeat 100% 100%;
}
.detail_content_operate_share_type_weibo {
  background: url('~static/detail/detail_weibo.png') no-repeat 100% 100%;
}
.detail_content_operate_share_type_weibo:hover {
  background: url('~static/detail/hover_weibo.png') no-repeat 100% 100%;
}
/* .detail_content_tab_list ul li, */
.detail_content_tab_list ul div {
  /*height: 42px;*/
  display: inline-block;
  /* padding: 13px 16px; */
  background: rgba(246, 246, 246, 1);
  border: 2px solid #e7e7e7;
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
.detail_content_tab_list ul div:hover {
  border: 2px solid #be001e;
  background: url('~static/detail/tag_hover.png') no-repeat 98% 96%;
  background-size: 9px 9px;
}
.detail_content_tab_list ul div a {
  text-decoration: none;
  color: rgba(42, 42, 42, 1);
  padding: 13px 16px;
  display: inline-block;
}
.detail_content_tab_list ul li:last-child {
  margin-right: 0;
}
.detail_content_brand {
  height: 150px;
  border: 1px solid rgba(228, 228, 228, 1);
  margin-bottom: 20px;
  display: flex;
}
.detail_content_brand_logo {
  width: 140px;
  height: 105px;
  /* margin: 23px 25px 22px 0; */
  display: inline-block;
  vertical-align: middle;
}
.detail_content_brand_desc {
  display: inline-block;
  /*padding: 38px 43px 32px 0;*/
}
.detail_content_brand_desc h3 {
  margin-bottom: 18px;
  font-size: 24px;
  /* font-family: SourceHanSansCN-Bold; */
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
  margin-top: 18px;
  /* margin-left: 25px; */
}
.detail_content_brand_desc p {
  height: 38px;
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  line-height: 22px;
  color: rgba(91, 91, 91, 1);
}
.detail_content_operate_share_title {
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin-right: 21px;
}
.detail_content_operate_share_type {
  display: inline-block;
}
.detail_content_operate_share_type ul li {
  display: inline-block;
  width: 37px;
  height: 37px;
  vertical-align: middle;
  margin-right: 19px;
  cursor: pointer;
}
.detail_content_operate_like {
  position: absolute;
  display: inline-block;
  right: 0;
}
.detail_content_operate_like button {
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
}
.detail_content_article {
  /*margin-top: 30px;*/
}
.detail_content_article_title,
.detail_comment_title {
  padding: 30px 0;
}
.detail_content_article_title img,
.detail_comment_title img {
  vertical-align: sub;
}
.detail_content_article_title h2,
.detail_comment_title h2 {
  display: inline-block;
  margin-left: 15px;
  font-size: 26px;
  /* font-family: SourceHanSansCN-Bold; */
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
}

.detail_content_article_block {
  width: 190px;
  height: 218px;
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px;
  cursor: pointer;
}
.detail_content_article_lists ul li {
  background: #fff;
}
.detail_content_article_lists ul li:nth-child(4n) {
  margin-right: 0;
}
.detail_content_article_block_pic,
.detail_content_article_block_video {
  width: 190px;
  height: 140px;
  display: inline-block;
  /*border: 1px solid;*/
}
.detail_content_article_block_title {
  height: 17px;
  padding: 0;
  border-left: 3px solid rgba(224, 224, 224, 1);
  padding-left: 19px;
  font-size: 14px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
  margin-top: 10px;
  margin-bottom: 11px;
  /* text-overflow: ellipsis; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 21px;
  cursor: pointer;
}
.detail_content_article_block_title:hover {
  border-left: 3px solid #be001e;
  color: #be001e;
}
.detail_content_article_block_avatar {
  width: 100%;
  height: 100%;
  position: absolute;
}
.detail_content_article_block_user {
  font-size: 12px;
  font-weight: 300;
  /* font-family: SourceHanSansCN-Light; */
  color: rgba(177, 177, 177, 1);
}
.detail_content_article_block_desperate {
  font-size: 12px;
  color: rgba(177, 177, 177, 1);
  padding: 0 11px 0 11px;
}
.detail_content_article_block_desc {
  font-size: 12px;
  /* font-family: Axiforma-Light; */
  font-weight: 300;
  color: rgba(177, 177, 177, 1);
}
.detail_comment_title span {
  padding-left: 20px;
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(91, 91, 91, 1);
}
.detail_comment_container {
  background: #fff;
  /*border: 1px solid;*/
  padding: 40px;
  margin-bottom: 30px;
}
.detail_comment_form {
  margin-bottom: 96px;
}
.detail_comment_form_avatar {
  width: 56px;
  text-align: center;
  margin-right: 20px;
  display: inline-block;
  float: left;
}
.detail_comment_form_avatar_wrap {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.detail_comment_form_avatar img {
  width: 50px;
  height: 50px;
  /*display: inline-block;*/
  /* padding-bottom: 9px; */
}
.detail_comment_form_avatar span {
  font-style: 14px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(153, 153, 153, 1);
}
.detail_comment_form_input {
  display: inline-block;
}
.detail_comment_form_input p {
  width: 614px;
  height: 146px;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
  outline: none;
  background: rgba(246, 246, 246, 1);
  border: none;
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(170, 170, 170, 1);
  /*text-align: center;*/
  /*line-height: 166px;*/
  padding-left: 20px;
  padding-top: 20px;
}
.detail_comment_form_input_operate {
  position: relative;
}
. .detail_comment_form_input_operate_emoji img {
  vertical-align: middle;
  padding-right: 10px;
}
.detail_comment_form_input_operate_emoji span {
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(91, 91, 91, 1);
  cursor: pointer;
}
.detail_comment_form_input_operate_emoji:hover span {
  color: #be001e;
}
.detail_comment_form_input_operate_login {
  position: absolute;
  right: 0;
  top: 0;
}
.detail_comment_form_input_operate_login a {
  width: 100px;
  height: 40px;
  display: inline-block;
  color: #fff;
  font-size: 18px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  background: url('~static/detail/detail_login.png');
  text-align: center;
  text-decoration: none;
  line-height: 40px;
}
.detail_comment_list_title {
  /*padding-bottom: 40px;*/
}
.detail_comment_list_title h2 {
  font-size: 24px;
  display: inline-block;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
}
.detail_comment_list_title span {
  font-size: 16px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  padding-left: 20px;
}
.detail_comment_lists_content {
  position: relative;
  padding: 30px 0;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 48px;
}
.detail_comment_lists_content img {
  /* padding-right: 20px; */
  vertical-align: top;
}
.detail_comment_lists_avatar {
  width: 50px;
  height: 50px;
  display: inline-block;
  border-radius: 50%;
  /* border: 1px solid; */
  margin-right: 20px;
  vertical-align: top;
  overflow: hidden;
}
.detail_comment_lists_avatar img {
  width: 100%;
  height: 100%;
}
.detail_comment_lists_content_user {
  width: 618px;
  display: inline-block;
  /*margin-bottom: 20px;*/
}
.detail_comment_lists_content_user_name {
  font-size: 18px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
  padding-right: 20px;
}
.detail_comment_lists_content_user_createdAt {
  font-size: 14px;
  /* font-family: Axiforma-Light; */
  font-weight: 300;
  color: rgba(153, 153, 153, 1);
}
.detail_comment_lists_content_user_content {
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(91, 91, 91, 1);
  line-height: 24px;
  padding-top: 16px;
  padding-bottom: 22px;
  margin: 0;
}
.detail_comment_lists_content_operate {
  position: absolute;
  right: 0;
}
.detail_comment_lists_content_operate a {
  font-size: 12px;
  font-weight: 400;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(170, 170, 170, 1);
  text-decoration: none;
}
.detail_comment_lists_content_operate_reply {
  padding-left: 26px;
  background: url('~static/detail/detail_reply.png') no-repeat;
}
.detail_comment_lists_content_operate_like {
  padding: 0 0 2px 28px;
  margin-left: 39px;
  background: url('~static/detail/detail_comment_like.png') no-repeat;
}
.detail_comment_lists_content_operate_like_handle {
  padding: 0 0 2px 28px;
  margin-left: 39px;
  background: url('~static/detail/like_handle.png') no-repeat;
}
.detail_comment_lists_content_reply {
  /*position: relative;*/
  padding-left: 70px;
  padding-top: 20px;
  padding-bottom: 70px;
}
.detail_comment_lists_content_replys {
  padding-left: 70px;
  padding-bottom: 30px;
}
.detail_comment_lists_content_reply_input {
  position: relative;
  width: 638px;
  /*margin: 20px 0;*/
  /*height: 64px;*/
}
.detail_comment_lists_content_replyLists h2 {
  font-size: 18px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
  padding-bottom: 19px;
  margin: 0;
}
.detail_comment_lists_content_reply_input span,
.detail_comment_lists_content_replyLists span {
  width: 0;
  height: 0;
  border-width: 0 15px 15px;
  border-style: solid;
  border-color: transparent transparent #f5f5f5;
  position: absolute;
  top: -15px;
  left: 20px;
}
.detail_comment_lists_content_reply_input input {
  width: 618px;
  /*height: 50px;*/
  background: #f5f5f5;
  outline: none;
  border: none;
  padding: 15px 0 15px 20px;
  margin-bottom: 20px;
}
.detail_comment_lists_content_reply_btn {
  width: 100px;
  height: 40px;
  display: inline-block;
  background: url('~static/detail/detail_login.png') no-repeat;
  text-align: center;
  font-size: 18px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  line-height: 40px;
  /*position: absolute;*/
  float: right;
}
.detail_comment_lists_content_replyLists {
  position: relative;
  width: 618px;
  /*padding: 20px 0 20px 20px;*/
  /*border: 1px solid;*/
  margin-bottom: 20px;
}

.detail_comment_lists_wrap {
  background: #f5f5f5;
  padding: 20px 0 20px 20px;
  width: 618px;
}
.detail_comment_lists_content_replyLists p {
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(91, 91, 91, 1);
  margin: 0;
  padding: 0;
}
/*右侧*/
.detail_right {
  width: 380px;
  float: right;
  /*border: 1px solid red;*/
}
.detail_user_wrap {
  width: 380px;
  height: 331px;
  position: relative;
}
.detail_user_bg_white {
  width: 370px;
  height: 321px;
  background: #fff;
  display: inline-block;
  z-index: 99;
  position: absolute;
}
.detail_user_bg_red {
  width: 350px;
  height: 301px;
  background: #be001e;
  display: inline-block;
  position: absolute;
  right: 0;
  bottom: 0;
}
.detail_user_msgWrap {
  position: absolute;
  z-index: 99999;
}
.detail_user_msg {
  /* width: 100px; */
  margin: 30px 139px 23px 141px;
  /*border: 1px solid;*/
  text-align: center;
}
.detail_user_msg img {
  width: 100px;
  height: 100px;
}

.detail_user_msg_name {
  display: block;
  font-size: 18px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
  padding: 19px 0 16px 0;
}
.detail_user_msg_focus {
  width: 70px;
  height: 32px;
  display: block;

  text-align: center;
  line-height: 32px;
  color: rgb(170, 170, 170);
  text-decoration: none;
  margin: 0 auto;
}
/* .detail_user_msg_focus:hover {
  color: #fff;
} */
.detail_user_msg_focus span {
  display: inline-block;
}
.detail_user_msg_focus_bg {
  background: #be001e;
  padding: 0 15px 0 10px;
  height: 32px;
  vertical-align: middle;
}
.detail_user_msg_focus_side {
  background: url('~static/detail/user_bg_side.png') no-repeat;
  width: 16px;
  height: 32px;
  vertical-align: middle;
  margin-left: -10px;
}
.detail_user_msg_focus_side img {
  width: 16px;
  height: 32px;
}
.detail_user_othermsg {
  padding: 0 63px 27px 56px;
}
.detail_user_othermsg ul,
.detail_more_content ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.detail_user_othermsg ul li {
  display: inline-block;
  text-align: center;
  width: 30%;
}
.detail_user_othermsg ul li a {
  text-decoration: none;
}
.detail_user_othermsg ul li span {
  display: block;
}
.detail_user_othermsg ul li span:first-child {
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.detail_user_othermsg ul li span:last-child {
  /* font-family: Axiforma-Medium; */
  font-size: 16px;
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
}
.detail_more_title {
  padding: 29px 0 21px 0;
}
.detail_more_title img {
  vertical-align: bottom;
}
.detail_more_title h2 {
  display: inline-block;
  padding: 0;
  margin: 0;
  padding-left: 10px;
  font-size: 18px;
  /* font-family: SourceHanSansCN-Bold; */
  font-weight: bold;
  color: #000;
}
.detail_more_title_more {
  padding-left: 18px;
  background: url('~static/detail/detail_more.png') no-repeat;
  background-position: 0;
  font-size: 14px;
  /* font-family: SourceHanSansCN-Normal; */
  font-weight: 400;
  color: rgba(170, 170, 170, 1);
  float: right;
  text-decoration: none;
}
.detail_more_content {
  /* width: 380px; */
  padding: 0 30px;
  /*border: 1px solid;*/
  background: #fff;
}
.detail_more_content ul li {
  padding: 20px 0;
  border-bottom: 1px solid #f8f8f8;
}
.detail_more_content ul li a {
  display: flex;
}
.detail_more_content ul li:last-child {
  border-bottom: none;
}
.detail_more_content ul li a img {
  width: 100px !important;
  height: 74px;
  vertical-align: bottom;
  /*display: block;*/
}
.detail_more_content_list {
  display: inline-block;
  padding-left: 21px;
  width: 200px;
}
.detail_more_content_list p {
  margin: 0;
  padding: 0;
  font-size: 16px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(18, 18, 18, 1);
  padding-bottom: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail_more_content_list span {
  font-size: 12px;
  /* font-family: Axiforma-Regular; */
  font-weight: 400;
  color: rgba(170, 170, 170, 1);
}
.quill_editor {
  width: 634px;
  padding-bottom: 91px;
  height: 166px;
}
.emoji_container {
  width: 400px;
  position: absolute;
  bottom: 31px;
  background: #fff;
}
.pagination {
  margin-top: 29px;
}
.detail_content_introduction {
  overflow: hidden;
}
.detail_content_introduction img {
  max-width: 100% !important;
}
.detail_content_operate_like i {
  width: 110px;
  height: 40px;
  display: inline-block;
  font-size: 17px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  margin-left: -13px;
}
.detail_content_operate_like i span {
  padding-left: 36px;
}
.detail_content_operate_like button:first-child i span {
  padding-left: 23px;
}
.up {
  background: url('~static/detail/detail_like.png');
}
.upchange {
  background: url('~static/detail/up_bg.png');
}
.down {
  background: url('~static/detail/detail_dontlike.png');
}
.downchange {
  background: url('~static/detail/down_bg.png');
}
.upPlus-enter-to,
.upPlus-leave {
  opacity: 1;
}
.upPlus-enter-active {
  transition: all 1s;
}
.upPlus-leave-active {
  animation: bounce-leave 1s ease;
}
@keyframes bounce-leave {
  0% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
}
.upPlus {
  position: absolute;
  left: 50px;
  color: red;
  bottom: 30px;
}
.detail_content_introduction p img {
  width: 100% !important;
}
.detail_user_msg_avatar_wrap {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.detail_user_msg_avatar_wrap img {
  width: 100%;
  height: 100%;
}
.detail_content_article_block_avatar_wrap {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
  margin: 0 10px 0 19px;
  overflow: hidden;
  vertical-align: middle;
  position: relative;
}
.detail_content_operate_wechat_share {
  position: absolute;
  width: 262px;
  height: 255px;
  background: #fff;
  border: solid 1px #d8d8d8;
  padding: 10px;
}
.detail_content_operate_wechat_share #qrcode img {
  margin: 0 auto !important;
  /* padding: 10px 0; */
}

.detail_content_operate_wechat_share p {
  padding: 10px 0 0 0;
}
.detail_content_operate_wechat_share .el-icon-close {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.detail_content_operate_wechat_share_tip {
  padding-bottom: 10px !important;
}
.MsoNormal span {
  font-family: microsoft yahei !important;
  font-size: 14px !important;
  line-height: 1.8 !important;
  color: #333 !important;
  /* display: inline-block; */
  /* margin: 15px 0; */
  text-align: left !important;
}
.MsoNormal {
  /* text-indent: 16px; */
}
.detail_content_operate {
  margin-top: 30px;
}
.detail_content_article_block_default {
  background: #e7e7e7;
  display: inline-block;
  width: 190px;
  height: 140px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.detail_more_content_default {
  width: 100px;
  height: 74px;
  background: #e7e7e7;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.detail_content_brand_photo {
  width: 140px;
  height: 105px;
  display: inline-block;
margin: 23px 25px 22px 0;
}
.detail_user_msg_name:hover {
  color: #be001e;
}
.detail_more_title_more:hover {
  color: #be001e;
}
.detail_comment_form_input_operate_emoji span:hover {
  color: #be001e;
}
.detail_user_othermsg ul li a span:hover {
  color: #be001e;
}
.detail_content_brand_photo_default {
  background: #e7e7e7;
  width: 140px;
  height: 105px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin: 23px 25px 22px 0;
}
.detail_content_brand_photo_default img {
  width: 100%;
  height: 100%;
}
#advertisement {
  margin-bottom: 30px;
}
.note-video-clip{
  width: 100% !important;
}
.focusBg {
  width: 70px;
  height: 32px;
  background: url('~static/images/watch_wrap.png') no-repeat;
}
.nofocusBg {
  width: 70px;
  height: 32px;
  background: url('~static/images/watch_red.png') no-repeat;
  color: #fff;
}
</style>
