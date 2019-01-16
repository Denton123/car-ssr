<template>
  <div id="hobby">
    <Header></Header>
    <div class="hobby_container">
      <div class="hobby_theme">
        <div class="hobby_content">
          <div class="hobby_content">
            <div class="publish_hobby_wrapper">
              <el-breadcrumb separator-class="el-icon-arrow-right"
                class="nav_title hobby_tip">
                <el-breadcrumb-item>
                  <nuxt-link to="/pc/hobbies/1">
                    兴趣部落
                  </nuxt-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item class="nav_title_active"><span>发布</span></el-breadcrumb-item>
              </el-breadcrumb>
              <div class="publish_hobby">
                <div class="hobby_table">
                  <div class="hobby_title">
                    发布兴趣部落
                  </div>
                  <el-form :model="hobbyForm"
                    :rules="rules"
                    ref="hobbyForm"
                    class="hobby_ruleForm">
                    <div>
                      <el-form-item class="hobbyVerify"
                        prop="classfiy">
                        <el-select v-model="hobbyForm.classfiy"
                          placeholder="请选择频道分类">
                          <el-option v-for="item in verifyOptions"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                          </el-option>
                        </el-select>
                        <span class="require_icon"><i>*</i>必选</span>
                      </el-form-item>
                      <el-form-item prop="description">
                        <el-input class="text_content"
                          type="textarea"
                          v-model="hobbyForm.description"
                          placeholder="请输入内容"></el-input>
                        <span class="require_icon special"><i>*</i>必填</span>
                      </el-form-item>
                      <el-form-item>
                        <el-input v-model="hobbyForm.tag"
                          placeholder="标签，如：汽车、美女"
                          class="table_input"></el-input>
                        <span class="require_icon"><i>*用英文逗号,分割</i></span>
                      </el-form-item>
                    </div>
                    <el-form-item prop="fileList">
                      <p class="hobby_form_title">
                        <i>*</i>上传图片<span>图片不小于790*450px，大小建议为2M以内</span>
                      </p>
                      <el-radio-group v-model="hobbyForm.watermark">
                        <el-radio-button :label="1">增加水印</el-radio-button>
                        <el-radio-button :label="2">无水印</el-radio-button>
                      </el-radio-group>
                      <div class="hobby_file_picture">
                        <el-upload :action="imgUrl"
                          :data="imgType"
                          :limit="limit"
                          :file-list="hobbyForm.fileList"
                          :on-success="uploadPicSuccess"
                          :on-error="uploadPicFailure"
                          list-type="picture-card"
                          name="upPhoto"
                          :on-preview="handlePictureCardPreview"
                          :before-upload="beforeUpload"
                          :on-remove="handleRemove">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible"
                          append-to-body>
                          <img class="imgSize"
                            :src="piectImgUrl"
                            alt="">
                        </el-dialog>
                      </div>
                    </el-form-item>
                    <el-form-item prop="Video">
                      <p class="hobby_form_title">
                        上传视频<span>视频大小建议为2M，支持格式MP4</span>
                      </p>
                      <el-upload :action="imgUrl"
                        name="upPhoto"
                        :data="imgType"
                        :limit="1"
                        :fileList="videoFileList"
                        :on-success="handleVideoSuccess"
                        :on-error="uploadVideoFailure"
                        :before-upload="beforeUploadVideo"
                        :on-progress="uploadVideoProcess"
                        :on-remove="handleRemoveVideo">
                        <img src="~static/images/video_image.png" alt="" class="videoControl">
                      </el-upload>
                      <video v-if="hobbyForm.video"
                        :src="pieceVideoUrl"
                        class="avatar"
                        controls="controls">
                      </video>
                    </el-form-item>
                    <el-form-item>
                      <el-button class="hobby_btn publish"
                        type="primary"
                        plain
                        @click="checkClick('hobbyForm')">发布</el-button>
                      <el-button type="primary"
                        class="hobby_btn draft"
                        @click="draftClick('hobbyForm')">存为草稿</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="advertise_wrapper">
        <a href="javascript: void (0);">
          <img src="~assets/images/ad_image.png"
            alt="">
        </a>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { $get, $post } from '@/http/ajax'
import { instance } from '@/http/instance'
import { filePicture, webHobbiesGetClassList, webHobbiesSave } from '@/http/api'
import systemManage from '@/http/photoApi.js'
import utils from '@/utils/until'
const url = utils.commonFileUrl + utils.apiPath + 'sys/uploadFile'
export default {
  name: 'hobby',
  data() {
    return {
      imgUrl: url,
      utils: utils,
      activeName: 'first',
      hobbyForm: {
        photo: '',
        video: '',
        watermark: 2,
        classfiy: '',
        description: '',
        level: '',
        tag: '',
        fileList: [],
        photoList: []
      },
      rules: {
        classfiy: [
          { required: true, message: '请选择兴趣部落类型', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入兴趣部落内容', trigger: 'change' }
        ],
        fileList: [
          { required: true, message: '请上传兴趣图片', trigger: 'blur' }
        ]
      },
      videoFileList: [],
      oneClassOptions: [],
      content: '',
      limit: 9,
      croppa: {},
      videoForm: {},
      imgType: {
        moduleName: 'web'
      },
      saveTrue: true,
      dialogVisible: false,
      url: null,
      clearMessage: true,
      verifyOptions: [],
      tempList: []
    }
  },
  created() {
    this.gethobbyType()
  },
  /* 预览图 */
  computed: {
    piectImgUrl() {
      const res = /http/g
      if (res.test(this.hobbyForm.photo)) {
        return this.hobbyForm.photo
      } else {
        return systemManage.getApi(this.hobbyForm.photo)
      }
    },
    pieceVideoUrl() {
      return systemManage.getApi(this.hobbyForm.video)
    }
  },
  methods: {
    // 获取兴趣类别
    async gethobbyType() {
      let res = await $get(webHobbiesGetClassList, {})
      let hobbyTypeData = res.data
      this.verifyOptions = hobbyTypeData
      console.log(this.verifyOptions)
    },
    // 上传图片
    beforeUpload(file) {
      // 上传支持格式（.doc/.docx/.pdf/.rar/.zip/.xls/.xlsx/.ppt）
      let reg = /\.(jpg|jpeg|png)$/i
      if (!reg.test(file.name)) {
        this.$message({
          showClose: true,
          message: '上传支持格式（.jpg/.jpeg/.png）',
          type: 'error'
        })
        return false
      } else if (file.size > 2 * 1024 * 1024) {
        this.$message({
          showClose: true,
          message: '文件大小上限为2M',
          type: 'error'
        })
        return false
      }
    },
    handlePictureCardPreview(file) {
      // 新上传
      if (file.response && file.response.code === 0) {
        this.hobbyForm.photo = file.response.url
        this.dialogVisible = true
      } else {
        this.hobbyForm.photo = file.url
        this.dialogVisible = true
      }
    },
    uploadPicSuccess(res) {
      if (res.code === 0) {
        this.hobbyForm.photo = res.urls[0]
        console.log(this.hobbyForm.photo)
        // 拼接后的图片地址
        this.url = systemManage.getApi(this.hobbyForm.photo)
        this.hobbyForm.fileList.push({ url: this.url })
        this.hobbyForm.photoList.push({ photo: res.urls[0] })
        if (this.hobbyForm.fileList && this.hobbyForm.fileList.length === 9) {
          document.querySelectorAll('.el-upload')[0].style.display = 'none'
        }
        this.showCropper = true
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        // this.hobbyForm.fileList = []
        this.$message({
          type: 'warning',
          message: '上传失败'
        })
      }
    },
    uploadPicFailure() {
      this.$message({
        type: 'warning',
        message: '图片上传失败, 网络出错,或者图片太大'
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      let index = this.hobbyForm.fileList.find(item => {
        return item.url === file.url
      })
      this.hobbyForm.fileList.splice(index, 1)
      this.hobbyForm.photoList.splice(index, 1)
      document.querySelectorAll('.el-upload')[0].style.display = 'block'
    },
    /* 视频相关Start */
    uploadVideoFailure() {
      this.$message({
        type: 'warning',
        message: '视频上传失败'
      })
    },
    // 上传视频
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024 < 5
      if (
        [
          'video/mp4',
          'video/ogg',
          'video/flv',
          'video/avi',
          'video/wmv',
          'video/rmvb'
        ].indexOf(file.type) === -1
      ) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过10MB哦!')
        return false
      }
    },
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(0)
    },
    handleVideoSuccess(res, file) {
      console.log(res)
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (res.code === 0) {
        /*    this.videoForm.videoUploadId = res.data.uploadId
        this.videoForm.Video = res.data.uploadUrl */
        this.hobbyForm.video = res.urls[0]
        document.querySelector('.videoControl').style.display = 'none'
      } else {
        this.$message.error('视频上传失败，请重新上传！')
      }
    },
    handleRemoveVideo() {
      this.videoFileList = []
      this.hobbyForm.video = ''
      document.querySelector('.videoControl').style.display = 'inline-block'
    },
    /* 视频End */
    handleClick(tab, event) {
      console.log(tab, event)
    },
    /* 重置表单 */
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    checkClick(formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          this.$confirm('此操作将新建兴趣部落文章发布, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              let token = ''
              if (localStorage.getItem('userMsg')) {
                token = JSON.parse(localStorage.getItem('userMsg')).token
              } else {
                token = this.getCookie('token')
              }
              $post(
                webHobbiesSave,
                {
                  ...this.hobbyForm,
                  state: '3'
                },
                { 'X-Auth0-Token': token }
              ).then(response => {
                console.log(response)
                if (response.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '文章发布成功!'
                  })
                  this.hobbyForm.fileList = []
                  this.hobbyForm.photoList = []
                  this.$refs[formName].resetFields()
                  // 调转到个人中心文章首页
                  let that = this
                  setTimeout(function() {
                    that.$router.push({
                      name: 'publishHobbies'
                    })
                  }, 500)
                  this.$forceUpdate()
                } else if (response.data.code === 2) {
                  this.$message({
                    type: 'warning',
                    message: response.data.des
                  })
                  // 无token 调转到登录页
                  let that = this
                  setTimeout(function() {
                    that.$router.push({
                      name: 'login'
                    })
                  }, 1000)
                } else {
                  this.$message({
                    type: 'warning',
                    message: response.data.des
                  })
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消保存'
              })
            })
        } else {
          return false
        }
      })
      // this.$refs[formName].validate(valide => {
      //   if (valide) {
      //     console.log(this.hobbyForm, token)
      //     $post(webHobbiesSave, {
      //       ...this.hobbyForm,
      //       state: '3'
      //     }, {'X-Auth0-Token': token}).then(res => {
      //       console.log(this.hobbyForm)
      //       this.hobbyForm.fileList = []
      //       this.hobbyForm.photoList = []
      //       this.$refs[formName].resetFields()
      //     })
      //   } else {
      //     return false
      //   }
      // })
    },
    draftClick(formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          this.$confirm(
            '此操作将新建兴趣部落文章保存为草稿, 是否继续?',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              let token = ''
              if (localStorage.getItem('userMsg')) {
                token = JSON.parse(localStorage.getItem('userMsg')).token
              } else {
                token = this.getCookie('token')
              }
              $post(
                webHobbiesSave,
                {
                  ...this.hobbyForm,
                  state: '1'
                },
                { 'X-Auth0-Token': token }
              ).then(response => {
                if (response.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '保持草稿成功!'
                  })
                  this.hobbyForm.fileList = []
                  this.hobbyForm.photoList = []
                  this.resetForm(formName)
                  // 调转到个人中心文章首页
                  let that = this
                  setTimeout(function() {
                    that.$router.push({
                      name: 'index'
                    })
                  }, 500)
                  this.$forceUpdate()
                } else if (response.data.code === 2) {
                  this.$message({
                    type: 'warning',
                    message: response.data.des
                  })
                  // 无token 调转到登录页
                  let that = this
                  setTimeout(function() {
                    localStorage.setItem('userMsg', '')
                    that.$router.push({
                      name: 'login'
                    })
                  }, 1000)
                } else {
                  this.$message({
                    type: 'warning',
                    message: response.data.des
                  })
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消保存'
              })
            })
        } else {
          return false
        }
      })
      // this.$refs[formName].validate(valide => {
      //   if (valide) {
      //     $post(webHobbiesSave, {
      //       ...this.hobbyForm,
      //       state: '1'
      //     }, {
      //       'X-Auth0-Token': token
      //     }).then(res => {
      //       this.hobbyForm.fileList = []
      //       this.hobbyForm.photoList = []
      //       this.resetForm(formName)
      //     })
      //   } else {
      //     return false
      //   }
      // })
    },
    // 获取cookie
    getCookie(cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      console.log(ca)
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        console.log(c)
        while (c.charAt(0) == ' ') c = c.substring(1)
        if (c.indexOf(name) != -1) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.gethobbyType()
    })
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="less">
#hobby {
  height: 100%;
  background: #f6f6f6;
}
.hobby_container {
  margin: 0 auto;
  width: 1200px;
  heightbackground: #f6f6f6;
}
.hobby_wrap {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hobby_head {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #fff;
  margin: 30px auto 15px;
}
.hobby_head img {
  width: 130px;
  height: 130px;
}
.hobby_name {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 12px;
}
.hobby_approve {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-left: 10px;
  -webkit-transform: skew(10deg);
  -moz-transform: skew(10deg);
  -o-transform: skew(10deg);
  background: #be001e;
  font-size: 14px;
  color: #fff;
  font-style: italic;
}
.hobby_msg {
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
}
.hobby_msg div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hobby_msg div span {
  display: inline-block;
  color: #fff;
  margin: 5px 0;
}
.hobby_msg div span:first-child {
  font-size: 16px;
}
.hobby_msg div span:last-child {
  font-size: 18px;
}
.hobby_content {
  position: relative;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
}

.hobby_bg {
  width: 100%;
  background: #f6f6f6;
}
.hobby_title {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
}
.hobby_title .title_nav {
  width: 1200px;
  margin: 0 auto;
  background: #f6f6f6;
}
.hobby_table {
  width: 94%;
  margin: 0 auto;
}
.hobby_title {
  width: 100%;
  text-align: center;
  font-size: 22px;
  color: #121212;
  font-weight: bold;
  letter-spacing: 2px;
}
.publish_hobby_wrapper {
  height: 100%;
  background: #f6f6f6;
}
.el-breadcrumb__separator:last-child {
  &::before {
    content: '';
    display: inline-block;
    padding: 0 10px;
    width: 6px;
    height: 8px;
    background: url('~static/images/small_right_black.png')
    no-repeat center;
  }
}
.publish_hobby {
  height: 100%;
  background: #fff;
}
.nav_title {
  height: 60px;
  line-height: 60px;
  background: #f6f6f6;
}
.nav_title_active span {
  color: #be001e !important;
}
.hobby_form_title {
  font-size: 20px;
  color: #121212;
  font-weight: bold;
}
.hobby_form_title i {
  font-style: normal;
  color: #be001e;
}
.hobby_form_title span {
  color: #999999;
  font-size: 12px;
  margin-left: 10px;
  font-weight: normal;
}
.require_icon {
  margin-left: 18px;
  font-size: 14px;
  color: #aaa;
}
.require_icon.special {
  display: inline-block;
  line-height: 200px;
}
.require_icon i {
  font-style: normal;
  color: #be001e;
}
.hobby_file_picture {
  margin-top: 20px;
}
.hobby_ruleForm .el-input {
  width: 65%;
}
.hobby_ruleForm .el-select {
  width: 100%;
}
.hobbyVerify {
  display: inline-block;
  min-width: 360px;
}
.hobbyVerify .el-select {
  width: 360px;
}
.hobby_ruleForm .hobbyVerify:nth-child(1) {
  margin-right: 10px;
}
.hobby_ruleForm .hobbyVerify .el-input {
  width: 100%;
}
.hobby_ruleForm .el-radio-button,
.hobby_ruleForm .el-radio-button__inner {
  margin-right: 15px;
}
.hobby_ruleForm .el-radio-button__inner {
  /*border-left: 0;*/
  width: 89px;
  height: 42px;
  border: 1px solid #dcdfe6;
  border-radius: 4px !important;
  color: #121212;
  font-weight: bold;
}
.el-tabs__active-bar {
  background: transparent !important;
}
.hobby_container .el-tabs__item {
  padding: 0px 38px;
  height: 50px !important;
  line-height: 51px;
  color: #121212;
  font-weight: bold;
}
.hobby_container .el-tabs__item.is-active {
  width: 120px;
  height: 50px;
  background: url('~static/picture/active_icon.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  padding-left: 18px !important;
}
.title_nav .el-tabs__header {
  margin: 0;
}
.picture_mark {
  margin-top: -20px;
  span {
    color: #409eff;
    &:first-child {
      margin: 0 96px 0 50px;
    }
  }
}
.hobby_tip {
  background: #f6f6f6;
}
/* 限制上传视频名字宽度 */
.hobby_container .el-upload-list {
  width: 58%;
}
/* 发布和草稿按钮 */
.hobby_container .hobby_btn {
  width: 150px;
  height: 40px;
  border-radius: 0;
  border: none;
}
.hobby_container .text_content {
  width: 1070px;
  height: 200px;
}
.hobby_container .text_content .el-textarea__inner {
  width: 1070px;
  height: 200px !important;
}
.advertise_wrapper {
  margin: 20px 0;
  width: 100%;
  height: 200px;
}
.advertise_wrapper > a {
  display: block;
  width: 100%;
  height: 100%;
}
.advertise_wrapper > a > img {
  display: block;
  width: 100%;
  height: 100%;
}
.hobby_container .hobby_btn:hover {
  border-color: red;
}
// radio按钮的样式
.hobby_ruleForm .el-radio-button__orig-radio:checked+.el-radio-button__inner{
  width: 89px;
  height: 42px;
  background: url("~static/images/select_radio_active.png") no-repeat transparent;
  background-size: 100% 100%;
  border: none transparent;
  box-shadow: none;
  color: #121212;
}
.hobby_container .hobby_btn.publish {
  color: #f6f6f6;
  background: url('~static/images/person_publish.png') no-repeat !important;
}
.hobby_container .hobby_btn.draft {
  color: #000;
  background: url('~static/images/person_draft.png') no-repeat !important;
}
</style>
