<template>
  <div style="display:flex;">
    <div class="info-item">
      <div class="cropper-table">
        <div class="cropper-file">
          <label class="btn btn-orange el-button el-button--primary"
            for="uploads">
            选择图片
          </label>
          <input type="file"
            id="uploads"
            :value="imgFile"
            style="position:absolute; clip:rect(0 0 0 0);"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="uploadImg($event, 1)">
        </div>
        <div class="cropper-content">
          <div class="cropper">
              <vueCropper ref="cropper"
                          :img="option.img"
                          :outputSize="option.size"
                          :outputType="option.outputType"
                          :info="true"
                          :full="option.full"
                          :canMove="option.canMove"
                          :canMoveBox="option.canMoveBox"
                          :original="option.original"
                          :autoCrop="option.autoCrop"
                          :autoCropWidth="option.autoCropWidth"
                          :autoCropHeight="option.autoCropHeight"
                          :fixedBox="option.fixedBox"
                          @realTime="realTime"
                          @imgLoad="imgLoad">
              </vueCropper>
          </div>
          <div style="margin-left:20px;">
            <div class="show-preview"
              :style="{'width': '380px', 'height':'280px',  'overflow': 'hidden', 'margin': '5px'}">
              <div :style="previews.div"
                class="preview">
                <img :src="previews.url"
                  :style="previews.img">
              </div>
            </div>
          </div>
        </div>
        <div class="cropper-opera">
          <el-row class="avatar-btns">
            <el-col :span="18">
              <el-button type="primary"
                         class="el-button el-button--primary"
                         title="放大"
                         @click="changeScale(1)">放大</el-button>
              <el-button type="primary"
                         class="el-button el-button--primary"
                         title="缩小"
                         @click="changeScale(-1)">缩小</el-button>
              <el-button type="primary"
                         class="el-button el-button--primary"
                         title="左旋转"
                         @click="rotateLeft">↺</el-button>
              <el-button type="primary"
                         class="el-button el-button--primary"
                         title="右旋转"
                         @click="rotateRight">↻</el-button>
            </el-col>
            <el-col :span="6">
              <input type="button"
                     class="btn btn-blue el-button el-button--primary"
                     value="确定"
                     @click="finish('blob')">
              <!--<button type="primary" class="el-button el-button&#45;&#45;primary" title="确定" @click="finish('blob')">确定</button>-->
            </el-col>
          </el-row>
          <!--<input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="+" title="放大" @click="changeScale(1)">-->
          <!--<input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="-" title="缩小" @click="changeScale(-1)">-->
          <!--<input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="↺" title="左旋转" @click="rotateLeft">-->
          <!--<input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="↻" title="右旋转" @click="rotateRight">-->
          <!--<input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="↓" title="下载" @click="down('blob')">-->
          <!--<input type="button" class="btn btn-blue" value="上传头像" @click="finish('blob')">-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Vue from 'vue'
import until from '@/utils/until'
import axios from 'axios'
const url = until.commonFileUrl + until.apiPath + 'sys/uploadFile'
// if(process.client) {
//   vueCropper = require('vue-cropper')
//   Vue.use(vueCropper.default)
// }
export default {
  // components: {
  //   vueCropper
  // },
  watch: {
    clearMessage() {
      console.log(this.option.img)
      this.option.img = ''
      this.previews.url = ''
    }
  },
  props: {
    clearMessage: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      headImg: '',
      // 剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: '',
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: 'png || jpeg || jpg',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 380,
        autoCropHeight: 280,
        fixedBox: true
      },
      fileName: '', // 本机文件地址
      downImg: '#',
      imgFile: '',
      uploadImgRelaPath: '' // 上传后的图片的地址（不带服务器域名）
    }
  },
  methods: {
    // 放大/缩小
    changeScale(num) {
      // console.log('changeScale')
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 坐旋转
    rotateLeft() {
      // console.log('rotateLeft')
      this.$refs.cropper.rotateLeft()
    },
    // 右旋转
    rotateRight() {
      // console.log('rotateRight')
      this.$refs.cropper.rotateRight()
    },
    // 上传图片（点击上传按钮）
    finish(type) {
      // console.log('finish')
      let _this = this
      let formData = new FormData()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          let img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
          formData.append('file', data, this.fileName)
          formData.append('moduleName', 'essay')
          axios
            .post(url, formData, {
              contentType: false,
              processData: false,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(response => {
              var res = response.data
              console.log(res)
              if (res.code === 0) {
                _this.imgFile = ''
                _this.$message({
                  // element-ui的消息Message消息提示组件
                  type: 'success',
                  message: '上传成功'
                })
                // 将返回的数据传给父组件（截图）
                _this.$emit('cropper-after', res.urls[0])
                console.log(res.urls[0])
              }
            })
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true
          this.modelSrc = data
        })
      }
      console.log(this.option.img)
    },
    // 实时预览函数
    realTime(data) {
      console.log('realTime')
      this.previews = data
    },
    // 下载图片
    down(type) {
      console.log('down')
      var aLink = document.createElement('a')
      aLink.download = 'author-img'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },
    // 选择本地图片
    uploadImg(e, num) {
      console.log(e)
      var _this = this
      let formData = new FormData()
      // 上传图片
      var file = e.target.files[0]
      _this.fileName = file.name
      if (!/\.(jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是jpeg,jpg,png,bmp中的一种')
        return false
      } else if (file.size / 1024 / 1024 > 5){
        this.$message({
          showClose: true,
          message: '图片上传不能大于5M',
          type: 'error'
        })
        return false
      }
      formData.append('file', file, _this.fileName)
      formData.append('moduleName', 'essay')
      axios
        .post(url, formData, {
          contentType: false,
          processData: false,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(response => {
          var res = response.data
          console.log(res)
          if (res.code === 0) {
            _this.$message({
              // element-ui的消息Message消息提示组件
              type: 'success',
              message: '上传成功'
            })
            // 将返回的数据传给父组件(原图）
            _this.$emit('cropper-before', res.urls[0])
            console.log(res.urls[0])
          }
        })
      var reader = new FileReader()
      reader.onload = e => {
        console.log(e)
        let data
        if (typeof e.target.result === 'object') {
          console.log(e.target.result)
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
          console.log(data)
        } else {
          data = e.target.result
          console.log(data)
        }
        if (num === 1) {
          _this.option.img = data
        } else if (num === 2) {
          _this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    imgLoad(msg) {
      console.log('imgLoad')
      console.log(msg)
    }
  }
}
</script>

<style lang="less">
.info {
  width: 720px;
  margin: 0 auto;
  .oper-dv {
    height: 20px;
    text-align: right;
    margin-right: 100px;
    a {
      font-weight: 500;
      &:last-child {
        margin-left: 30px;
      }
    }
  }
  .info-item {
    margin-top: 15px;
    label {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    .sel-img-dv {
      position: relative;
      .sel-file {
        position: absolute;
        width: 90px;
        height: 30px;
        opacity: 0;
        cursor: pointer;
        z-index: 2;
      }
      .sel-btn {
        position: absolute;
        cursor: pointer;
        z-index: 1;
      }
    }
  }
}
.cropper-table {
  display: flex;
  flex-direction: column;
  .cropper-file {
    margin-top: -20px;
    margin-bottom: 20px;
  }
}
.avatar-btns {
  margin-top: 30px;
  margin-bottom: 15px;
}
.cropper-content {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  -webkit-justify-content: flex-end;
  .cropper {
    width: 735px;
    height: 420px;
  }
  .show-preview {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    .preview {
      overflow: hidden;
      /*border-radius: 50%;*/
      border: 1px solid #cccccc;
      background: #cccccc;
      margin-left: 40px;
    }
  }
}
.cropper-content .show-preview .preview {
  margin-left: 0;
}
.btn-orange,
.btn-blue
{
  color: #fff!important;
  background-color: #409EFF!important;
}
</style>
