<template>
  <div class="article_content_editEssay">
    <el-breadcrumb separator-class="el-icon-arrow-right"
      class="nav_title">
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的文章</el-breadcrumb-item>
      <el-breadcrumb-item class="nav_title_active">编辑文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="publish_article">
      <div class="article_title">
        编辑文章
      </div>
      <div class="article_table">
        <el-form :model="articleForm"
          :rules="rules"
          ref="articleForm"
          class="article_ruleForm">
          <el-form-item prop="title">
            <el-input v-model="articleForm.title"
              placeholder="请输入标题"></el-input>
            <span class="require_icon"><i>*</i>必填</span>
          </el-form-item>
          <div>
            <el-form-item class="articleVerify"
              prop="classOne">
              <el-select v-model="articleForm.classOne"
                placeholder="请选择文章分类">
                <el-option v-for="item in oneClassOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="articleVerify"
              prop="region">
              <el-select :disabled="connectClassOneState"
                v-model="articleForm.push"
                placeholder="请选择文章推送">
                <el-option v-for="item in connectClassOne"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <span class="require_icon"><i>*</i>必填</span>
          </div>
          <el-form-item prop="digest">
            <el-input v-model="articleForm.digest"
              placeholder="请输入文章摘要"></el-input>
            <span class="require_icon"><i>*</i>必填</span>
          </el-form-item>
          <el-form-item>
            <el-input v-model="articleForm.tag"
              placeholder="标签，如：汽车、美女"
              class="table_input"></el-input>
            <span class="require_icon"><i>*用英文逗号,分割</i></span>
          </el-form-item>
          <el-form-item prop="type">
            <p class="article_form_title">
              <i>*</i>文章类型
            </p>
            <el-radio-group v-model="articleForm.type">
              <el-radio-button :label="1">原创</el-radio-button>
              <el-radio-button :label="2">转载</el-radio-button>
              <el-radio-button :label="3">翻译</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <p class="article_form_title">
              <i>*</i>上传图片<span>图片不小于790*450px，大小建议为5M以内</span>
            </p>
            <el-radio-group v-model="articleForm.watermark">
              <el-radio-button :label="1">增加水印</el-radio-button>
              <el-radio-button :label="2">无水印</el-radio-button>
            </el-radio-group>
            <div class="article_file_picture">
              <el-upload :action="imgUrl"
                :data="imgType"
                :limit="limit"
                :file-list="articleForm.fileList"
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
              <!--裁剪图片-->
              <div class="app-main-content"
                @click="showCropper = true"
                v-show="isCropper">
              </div>
              <el-dialog :visible.sync="showCropper"
                title="封面裁图"
                width="68%"
                @close='closeDialog'>
                <vue-cropper @cropper-after="cropperSuccessAfter"
                  @cropper-before="cropperSuccessBefore"
                  :clearMessage="clearMessage"></vue-cropper>
              </el-dialog>
              <div class="picture_mark"
                v-show="isText">
                <span>封面原图</span> <span>封面截图</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="Video">
            <p class="article_form_title">
              上传视频<span>视频大小建议为2M以内，支持格式 MP4</span>
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
              <img src="/static/images/video_image.png" alt="">
            </el-upload>
            <video v-if="articleForm.video"
              :src="pieceVideoUrl"
              class="avatar"
              controls="controls">
            </video>
          </el-form-item>
          <el-form-item label="">
            <div class="form_editor">
              <!--<vue-html5-editor :content="form.description"-->
              <!--@change="updateData"-->
              <!--:height="320"></vue-html5-editor>-->
              <!--暂时去掉，以后加上-->
              <div id="summernote"
                :content="articleForm.description"></div>
              <span class="require_icon"><i>*</i>必填</span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button class="person_btn publish"
              type="primary"
              plain
              @click="checkClick('articleForm')">发布</el-button>
            <el-button type="primary"
              class="person_btn draft"
              @click="draftClick('articleForm')">存为草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// import 'bootstrap/dist/css/bootstrap.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VueCropper from '@/components/VueCropper'
import { $get, $post, $put } from '@/http/ajax'
import { instance } from '@/http/instance'
import {
  webEssayUpdate,
  filePicture,
  webEssayArticleType,
  webEssayInfo
} from '@/http/api'
import systemManage from '@/http/photoApi.js'
import utils from '@/utils/until'
// import $ from 'jquery'
import axios from 'axios'
const url = utils.commonFileUrl + utils.apiPath + 'sys/uploadFile'
// const serverUrl = utils.commonUrl
// const url = serverUrl + utils.apiPath + 'sys/uploadFile'
if (process.client) {
  require("summernote/dist/summernote-lite");
}

export default {
  name: 'person',
  data() {
    return {
      imgUrl: url,
      utils: utils,
      activeName: 'first',
      articleForm: {
        title: '',
        type: '',
        photo: '',
        cover: '',
        video: '',
        watermark: 2,
        classOne: '',
        description: '',
        level: '',
        tag: '',
        desc: '',
        digest: '',
        selectedOptions: [],
        fileList: []
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 250,
            message: '长度在 1 到 250 个字符',
            trigger: 'blur'
          }
        ],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ],
        classOne: [
          { required: true, message: '请选择文章所属类型', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写文章内容', trigger: 'blur' }
        ],
        digest: [
          { required: true, message: '请填写文章摘要', trigger: 'blur' }
        ],
        fileList: [
          { required: true, message: '请上传文章图片', trigger: 'blur' }
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
      id: 1,
      saveTrue: true,
      dialogVisible: false,
      avatarUrl2: null,
      showCropper: false,
      isCropper: true,
      isText: false,
      url: null,
      clearMessage: true
    }
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
    } else {
      this.id =
        sessionStorage.getItem('eassyId')
    }
  },
  /* 预览图和视频地址拼接 */
  computed: {
    piectImgUrl() {
      const res = /http/g
      if (res.test(this.articleForm.photo)) {
        return this.articleForm.photo
      } else {
        return systemManage.getApi(this.articleForm.photo)
      }
    },
    pieceVideoUrl() {
      return systemManage.getApi(this.articleForm.video)
    },
    connectClassOne() {
      let that = this
      let index = this.oneClassOptions.findIndex(function(item) {
        return item.id === that.articleForm.classOne
      })
      console.log(index)
      let temp = this.oneClassOptions.slice()
      temp.splice(index, 1)
      console.log(temp)
      return temp
    },
    connectClassOneState() {
      if (!this.articleForm.classOne) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    //  图片拼接
    /* piectImgUrl(item) {
      return systemManage.getApi(item.photo)
    }, */
    // 获取文章信息
    async getArticleInfo() {
      let res = await $get(webEssayInfo, { id: this.id })
      console.log(res)
      this.articleForm = res.data
      $('#summernote').summernote('code', this.articleForm.description)
      this.articleForm.selectedOptions = []
      // 选中对象默认模块
      this.articleForm.selectedOptions.push(this.articleForm.classOne)
      console.log(this.articleForm.classOne)
      // 文章图片地址拼接显示
      this.articleForm.fileList = [
        { name: 'img', url: systemManage.getApi(this.articleForm.photo) }
      ]
    },
    // 获取文章类别
    async getArticleType() {
      let res = await $get(webEssayArticleType, {})
      let articleTypeData = res.data
      this.oneClassOptions = articleTypeData
    },
    // 隐藏裁剪框
    cancelCropper() {
      this.showCropper = false
      this.$refs.cropper.cropDone()
    },
    // 父组件调用子组件裁剪方法
    toCropper() {
      this.$refs.cropper.submit()
    },
    // 子组件裁剪方法成功执行后与父组件通信
    cropperSuccessAfter(data) {
      this.articleForm.fileList.push({
        name: 'image2',
        url: systemManage.getApi(data)
      })
      this.articleForm.cover = data
      this.showCropper = false
      document.querySelector('.el-upload').style.display = 'none'
      this.isCropper = false
      this.isText = true
    },
    cropperSuccessBefore(data) {
      this.articleForm.fileList.push({
        name: 'image1',
        url: systemManage.getApi(data)
      })
      this.articleForm.photo = data
      console.log(data)
    },
    closeDialog() {
      this.clearMessage = !this.clearMessage
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
      } else if (file.size > 500 * 1024) {
        this.$message({
          showClose: true,
          message: '文件大小上限为500K',
          type: 'error'
        })
        return false
      }
    },
    handleRemove(file, fileList) {
      this.$confirm('是否移除原图和截图?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.articleForm.fileList = []
          this.isCropper = true
          this.isText = false
          document.querySelector('.el-upload').style.display = 'inline-block'
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      this.articleForm.fileList = []
    },
    handlePictureCardPreview(file) {
      // 新上传
      if (file.response && file.response.code === 0) {
        this.articleForm.photo = file.response.url
        this.dialogVisible = true
      } else {
        this.articleForm.photo = file.url
        this.dialogVisible = true
      }
    },
    uploadPicSuccess(res) {
      if (res.code === 0) {
        this.articleForm.photo = res.urls[0]
        console.log(this.articleForm.photo)
        this.url = systemManage.getApi(this.articleForm.photo)
        document.querySelector('.el-upload').style.display = 'none'
        this.showCropper = true
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      } else {
        this.articleForm.fileList = []
        this.$message({
          type: 'warning',
          message: '上传失败'
        })
      }
    },
    uploadPicFailure() {
      this.$message({
        type: 'warning',
        message: '图片上传失败'
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 重置表单 */
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    /* 视频相关 */
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
        this.articleForm.video = res.urls[0]
        document.querySelector('.videoControl').style.display = 'none'
      } else {
        this.$message.error('视频上传失败，请重新上传！')
      }
    },
    handleRemoveVideo() {
      this.videoFileList = []
      this.articleForm.video = ''
      document.querySelector('.videoControl').style.display = 'inline-block'
    },
    checkClick(formName) {
      this.articleForm.description = $('#summernote').summernote('code')
      this.$refs[formName].validate(valide => {
        if (valide) {
          this.$confirm('此操作将新建文章发布, 是否继续?', '提示', {
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
              $put(
                webEssayUpdate,
                {
                  ...this.articleForm,
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
                  this.$refs[formName].resetFields()
                  this.isText = false
                  // 调转到个人中心文章首页
                  let that = this
                  setTimeout(function() {
                    that.$router.push({
                      name: 'myEssay'
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
    },
    draftClick(formName) {
      this.articleForm.description = $('#summernote').summernote('code')
      this.$refs[formName].validate(valide => {
        if (valide) {
          this.$confirm('此操作将新建文章保存为草稿, 是否继续?', '提示', {
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
              $put(
                webEssayUpdate,
                {
                  ...this.articleForm,
                  state: '1'
                },
                { 'X-Auth0-Token': token }
              ).then(response => {
                if (response.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '保持草稿成功!'
                  })
                  this.$refs[formName].resetFields()
                  this.isText = false
                  // 调转到个人中心文章首页
                  let that = this
                  setTimeout(function() {
                    that.$router.push({
                      name: 'myEssay'
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
      this.getArticleType()
      this.getArticleInfo()
    })
    /* 富文本相关 */
    var myVideoBtn = function(context) {
      var ui = $.summernote.ui
      // create button
      var button = ui.button({
        contents:
          '<i class="note-icon-video"/><input title="视频" onchange="uploadVideo()" type="file" id="videoInput" accept="video/mp4" style="opacity: 0; filter:Alpha(opacity=0);width:20px;height: 20px;margin-left: -20px;position:absolute;">' // 这个是展示在富文本顶部的操作图标，这个rich-video-icon是自己写的
        // tooltip: '' //todo 这个视频提示报错，未知原因
        // click: function() {// 点击按钮触发事件，这边不需要用到
        // context.invoke('editor.insertText', 'xxx')
        // }
      })
      return button.render() // return button as jquery object
    }
    $('#summernote').summernote({
      lang: 'zh-CN',
      placeholder: '请输入内容',
      height: 600,
      width: 800,
      htmlMode: true,
      dialogsInBody: false,
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['fontsize', ['fontsize']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'picture', 'video']],
        ['mybutton', ['myVideo']]
      ],
      fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
      fontNames: [
        'Arial',
        'Arial Black',
        'Comic Sans MS',
        'Courier New',
        'Helvetica Neue',
        'Helvetica',
        'Impact',
        'Lucida Grande',
        'Tahoma',
        'Times New Roman',
        'Verdana'
      ],
      buttons: {
        myVideo: myVideoBtn
      },
      popover: {
        air: [['color', ['color']], ['font', ['bold', 'underline', 'clear']]]
      },
      callbacks: {
        onImageUpload: function(files) {
          console.log(files[0])
          let formData = new FormData()
          formData.append('file', files[0])
          formData.append('moduleName', 'essay')
          console.log(formData)
          axios
            .post(url, formData, {
              contentType: false,
              processData: false,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(response => {
              var res = response.data
              if (res.code === 0) {
                console.log(systemManage.getApi(res.urls[0]))
                $('#summernote').summernote(
                  'insertImage',
                  systemManage.getApi(res.urls[0])
                )
              }
            })
        }
      }
    })
    window.uploadVideo = function() {
      // vm.showLoading = true // 因ship上传比较耗时，所以加了个loading提示
      let formData = new FormData()
      console.log($('#videoInput')[0].files[0])
      formData.append('file', $('#videoInput')[0].files[0])
      formData.append('moduleName', 'essay')
      axios
        .post(url, formData, {
          contentType: false,
          processData: false,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => {
          var res = response.data
          if (res.code === 0) {
            console.log(systemManage.getApi(res.urls[0]))
            var node = document.createElement('div') // 创建节点，用于包裹视频，再加这一层是方便调视频样式
            node.innerHTML =
              '<video controls="controls" style="max-width:100%;" src="' +
              systemManage.getApi(res.urls[0]) +
              '" />'
            node.cssText = 'width:100%;text-aligen:center;'
            $('#summernote').summernote('insertNode', node) // 插入视频
          }
        })
    }
  },
  components: {
    Header,
    Footer,
    'vue-cropper': VueCropper
  }
}
</script>
<style lang="less">
  .el-breadcrumb__separator:last-child {
    &::before {
      content: '';
      display: inline-block;
      padding: 0 10px;
      width: 6px;
      height: 8px;
      background: url('~static/images/small_right_black.png') no-repeat
      center;
    }
  }
  .person_theme {
    width: 100%;
    height: 400px;
    background: url('~static/images/person_head.png') no-repeat;
    background-size: 100% 100%;
  }
  .person_container {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
  }
  .person_wrap {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .person_head {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    // background: #fff;
    margin: 30px auto 15px;
  }
  .person_head img {
    width: 130px;
    height: 130px;
  }
  .person_name {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 12px;
  }
  .person_approve {
     width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-left: 10px;
  /* -webkit-transform: skew(10deg);
  -moz-transform: skew(10deg);
  -o-transform: skew(10deg); */
  background: url('~static/person/validator.png');
  font-size: 14px;
  color: #fff;
  /* font-style: italic; */
  }
  .person_msg {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 50px;
  }
  .person_msg div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .person_msg div span {
    display: inline-block;
    color: #fff;
    margin: 5px 0;
  }
  .person_msg div span:first-child {
    font-size: 16px;
  }
  .person_msg div span:last-child {
    font-size: 18px;
  }
  .person_content {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f6f6f6;
  }
  .person_mask {
    position: absolute;
    width: 100%;
    height: 50px;
    background: #fff;
  }
  .person_bg {
    width: 100%;
    background: #f6f6f6;
  }
  .person_title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #121212;
    margin: 0 auto;
    background: #fff;
  }
  .article_content_editEssay .person_title .title_nav {
    width: 1200px;
    margin: 0 auto;
  }
  .article_content_editEssay .publish_article {
    background: #fff !important;
  }
  .article_table {
    width: 94%;
    margin: 0 auto;
  }
  .article_title {
    width: 100%;
    padding: 30px 0;
    text-align: center;
    font-size: 22px;
    color: #121212;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 0;
  }
  .nav_title {
    height: 60px;
    line-height: 60px;
    background: #f6f6f6;
  }
  .nav_title_active span {
    color: #be001e !important;
  }
  .article_form_title {
    font-size: 20px;
    color: #121212;
    font-weight: bold;
  }
  .article_form_title i {
    font-style: normal;
    color: #be001e;
  }
  .article_form_title span {
    color: #999999;
    font-size: 12px;
    margin-left: 10px;
    font-weight: normal;
  }
  .require_icon {
    margin-left: 20px;
    font-size: 14px;
    color: #aaa;
  }
  .require_icon i {
    font-style: normal;
    color: #be001e;
  }
  .article_file_picture {
    position: relative;
    margin-top: 20px;
  }
  .article_ruleForm .el-input {
    width: 65%;
  }
  .article_ruleForm .el-select {
    width: 100%;
  }
  .articleVerify {
    display: inline-block;
    width: 360px;
  }
  .article_ruleForm .articleVerify:nth-child(1) {
    margin-right: 10px;
  }
  .article_ruleForm .articleVerify .el-input {
    width: 100%;
  }
  .article_ruleForm .el-radio-button,
  .article_ruleForm .el-radio-button__inner {
    margin-right: 15px;
  }
  .article_ruleForm .el-radio-button__inner {
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
  // radio按钮的样式
  .article_ruleForm .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    width: 89px;
    height: 42px;
    background: url("~static/images/select_radio_active.png") no-repeat transparent;
    background-size: 100% 100%;
    border: none transparent;
    box-shadow: none;
    color: #121212;
  }
  // .el-tabs__item {
  //   padding: 0px 38px;
  //   height: 50px !important;
  //   line-height: 51px;
  //   color: #121212;
  //   font-weight: bold;
  // }
  // // 这里影响了全局
  // .article_content .el-tabs__item.is-active {
  //   width: 120px;
  //   height: 50px;
  //   background: url('/static/images/active_icon.png') no-repeat;
  //   background-size: 100% 100%;
  //   color: #fff;
  //   padding-left: 18px !important;
  // }
  .title_nav .el-tabs__header {
    margin: 0;
  }
  .article_ruleForm .form_editor{
    margin-top: 30px;
    display: flex;
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
  /* 裁剪图片相关 */
  .app-main-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 100%;
    cursor: pointer;
  }
  /* 限制上传视频名字宽度 */
  .person_container .el-upload-list {
    width: 58%;
  }
  /*广告*/
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

  /* 发布和草稿按钮 */
  .person_container .person_btn {
    width: 150px;
    height: 40px;
    border-radius: 0;
    border: none;
  }
  .person_container .person_btn:hover {
    border-color: red;
  }
  .person_container .person_btn.publish {
    color: #f6f6f6;
    background: url('~static/images/person_publish.png') no-repeat !important;
  }
  .person_container .person_btn.draft {
    color: #000;
    background: url('~static/images/person_draft.png') no-repeat !important;
  }
</style>
