<template>
  <div class="person_info">
    <h2 class="person_info_title">编辑个人信息</h2>
    <!-- 表单 -->
    <div class="person_info_form">
      <el-form :model="editForm"
        :rules="rules"
        ref="editForm"
        class="person_form_wrap">
        <!-- 用户名 -->
        <el-form-item prop="account">
          <el-input v-model="editForm.account"
            :disabled="true"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item prop="phone"
          class="person_info_form_phone">
          <el-input v-model="editForm.phone"
            placeholder="请输入手机号"></el-input>
          <span class="changePhone"
            @click="changePhone">更换手机号码</span>
        </el-form-item>
        <!-- 手机号 -->
        <div class="phonePromptMark"
          v-if="isShowPhone">
          <div class="phonePromptWrap">
            <i class="el-icon-close closeBtn"
              @click="closeBtn"></i>
            <el-form-item prop="phone">
              <el-input v-model="editForm.phone"
                placeholder="请输入手机号"
                maxlength="11"
                class="resetPhone"></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
              <el-input class="input verificationCode"
                placeholder="请输入短信验证码"
                v-model="editForm.verificationCode"></el-input>
              <el-button :class="['vf_btn', isVf ? 'vf_bg': '']"
                v-loading="loading"
                @click="sendVerify"
                :disabled="vfDisabled">{{vfDes}}</el-button>
            </el-form-item>
            <el-button type="primary"
              @click="handlePhoneChange(editForm.verificationCode, editForm.phone)">保存</el-button>
            <el-button class="phoneCancel">取消</el-button>
          </div>

        </div>
        <!-- 昵称 -->
        <el-form-item prop="loginName"
          class="requiredItem">
          <el-input v-model="editForm.loginName"
            placeholder="昵称（默认显示账号名称）"></el-input>
          <span class="person_info_form_required"><i>*</i>必填</span>
        </el-form-item>
        <!-- 头像 -->
        <el-form-item prop="avatar"
          class="person_info_form_avatar">
          <el-upload class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :data="uploadData"
            :before-upload="beforeAvatarUpload">
            <div class="avatar-uploader_wrap">
              <img v-if="editForm.photo"
                :src="formatPic(editForm.photo)"
                alt="">
              <img v-else
                src="~static/person/person_default.png">
            </div>
            <span>上传头像</span>
          </el-upload>
        </el-form-item>
        <!-- 真实姓名 -->
        <el-form-item prop="name"
          class="requiredItem">
          <el-input v-model="editForm.name"
            placeholder="请输入您的真实姓名"></el-input>
          <span class="person_info_form_required"><i>*</i>必填</span>
        </el-form-item>
        <!-- 身份证号 -->
        <el-form-item prop="idCard"
          class="requiredItem">
          <el-input v-model="editForm.idCard"
            placeholder="请输入您的身份证号"></el-input>
          <span class="person_info_form_required"><i>*</i>必填</span>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item prop="sex">
          <el-select v-model="editForm.sex"
            placeholder="请选择性别">
            <el-option label="男"
              value="男"></el-option>
            <el-option label="女"
              value="女"></el-option>
          </el-select>
        </el-form-item>
        <!-- 出生年月 -->
        <el-form-item prop="birthday">
          <el-date-picker placeholder="请选择您的出生年月"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="editForm.birthday"></el-date-picker>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email"
          class="emailItem"
          :rules="{type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}">
          <el-input v-model="editForm.email"
            placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-row>
          <el-col :span="10">
        <el-form-item prop="province"
          class="person_info_form_address">
            <v-distpicker hide-area
              @select="onSelected"
              @province="onChangeProvince"
              @city="onChangeCity"
              :province="editForm.province"
              :city="editForm.city"
              :placeholders="addressPlaceholder"></v-distpicker>
        </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item prop="address" class="person_info_form_detailAddress">
              <el-input v-model="editForm.address"
                placeholder="请输入详细地址"></el-input>
            </el-form-item>
              <span class="person_info_form_address_required person_info_form_required"><i>*</i>必填</span>
          </el-col>
        </el-row>
        
        <!-- 职业 -->
        <el-form-item prop="profession">
          <el-select v-model="editForm.profession"
            placeholder="请选择职业"
            class="profession_select">
            <el-option label="无业游民"
              value="无业游民"></el-option>
            <el-option label="赛车手"
              value="赛车手"></el-option>
          </el-select>
        </el-form-item>
        <!-- submit -->
        <el-form-item>
          <el-button type="primary"
            @click="handleEdit('editForm')">保存</el-button>
          <el-button @click="handleCancel" class="cancelBtn">取消</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
// import VDistpicker from 'v-distpicker'
import {
  smsSendMsgByRegister,
  webUserUpdate,
  webUserUpdatePhone,
  webUserSelectByPrimaryKey
} from '@/http/api'
import { $get, $post } from '@/http/ajax'
import systemManage from '@/http/photoApi.js'
import { setTimeout } from 'timers'
import { callbackify } from 'util'
import $ from 'jquery'

export default {
  name: 'personInfo',
  // components: {
  //   VDistpicker
  // },
  data() {
    let state = false
    let checkPhoneValue = (rule, value, callback) => {
      if (!value || value.length !== 11) {
        this.state = false
        return callback(new Error('请输入正确的手机号'))
      } else {
        const reg = /[^0-9]/
        if (reg.test(value)) {
          this.state = false
          return callback(new Error('请输入正确的手机号'))
        } else {
          this.state = true
          callback()
        }
      }
    }
    let checkIdCardValue = (rule, value, callback) => {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!reg.test(value)) {
        this.state = false
        return callback(new Error('请输入正确的身份证号码'))
      } else {
        this.state = true
        callback()
      }
    }
    let checkEmailValue = (rule, value, callback) => {
      if (value !== '') {
        const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        if (!reg.test(value)) {
          this.state = false
          return callback(new Error('请输入正确的邮箱'))
        } else {
          this.state = true
          callback()
        }
      }
    }
    let checkCityValue = (rule, value, callback) => {
      if (value === '市') {
        return callback(new Error('请输入城市'))
      }
    }
    let checkProvinceValue = (rule, value, callback) => {
      if (value === '请选择省份') {
        return callback(new Error('请输入省份'))
      }
    }
    return {
      editForm: {
        photo: null,
        phone: null,
        city: null,
        email: null,
        account: null
      },
      rules: {
        loginName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        idCard: [
          {
            required: true,
            validator: checkIdCardValue,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            validator: checkPhoneValue,
            trigger: 'blur'
          }
        ],
        verificationCode: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ],
        // email: [{ validator: checkEmailValue, trigger: 'blur' }]
        // city: [
        //   {
        //     required: true,
        //     validator: checkCityValue,
        //     trigger: 'blur'
        //   }
        // ],
        province: [
          {
            required: true,
            validator: checkProvinceValue,
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }
        ]
      },
      imageUrl: '',
      state: state,
      loading: false,
      isShowPhone: false,
      uploadData: {
        moduleName: 'user'
      },
      tokenObj: {},
      cookie: '',
      vfDisabled: false,
      vfDes: '发送验证码',
      isVf: false,
      Time: null,
      func: null,
      uploadUrl: '',
      addressPlaceholder: {
        province: '请选择省份',
        city: '请选择城市'
      }
    }
  },
  props: {
    // editForm: {
    //   type: Object,
    //   default() {
    //     return {
    //       name: ''
    //     }
    //   }
    // }
  },
  
  mounted() {
    this.uploadUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://123.207.11.165/api/sys/uploadFile'
        : `http://${window.location.host}/api/sys/uploadFile`
    this.cookie = this.getCookie('token')
    if (this.cookie == '') {
      this.tokenObj = JSON.parse(localStorage.getItem('userMsg'))
    }
    if (this.tokenObj == null) {
      this.tokenObj = {}
    }
    this.getUserInfo()
    // console.log(this.editForm)
    if (this.editForm.photo) {
      this.imageUrl = this.editForm.photo
    }
    let selectEle = $('.distpicker-address-wrapper select:first option:first')
    if (selectEle.val() == '请选择省份') {
      $('.distpicker-address-wrapper select').css('color', '#babdc6')
    } else {
      $('.distpicker-address-wrapper select').css('color', 'black')
    }
  },
  methods: {
    onSelected(data) {
      // console.log(data)
    },
    onChangeCity(data) {
      this.editForm.city = data.value
    },
    onChangeProvince(data) {
      this.editForm.province = data.value
      console.log(data.value, '省份')
      if (data.value == '请选择省份') {
        $('.distpicker-address-wrapper select').css('color', '#babdc6')
      } else {
        $('.distpicker-address-wrapper select').css('color', 'black')
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.des === '上传成功') {
        // this.editForm.photo = this.imageUrl
        console.log(res, 'this.imageUrl')
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: `${res.des}`,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: `${res.des}`
          })
        }
        this.imageUrl = res.urls[0]
      }
      this.editForm.photo = this.imageUrl
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 更换手机号码
    changePhone() {
      // this.editForm.phone = ''
      this.editForm.verificationCode = ''
      this.isShowPhone = true
    },
    // 发送手机验证码
    sendVerify() {
      let that = this
      if (this.state) {
        this.Time = new Date().getTime()
        this.isVf = true
        that.vfDisabled = true
        this.func = setInterval(function() {
          let time = parseInt(60 - (new Date().getTime() - that.Time) / 1000)
          that.vfDes = `${time}s`
          if (time <= 0) {
            clearInterval(that.func)
            that.vfDes = `发送验证码`
            that.vfDisabled = false
            that.isVf = false
          }
        }, 1000)
        $get(smsSendMsgByRegister, this.editForm.phone).then(res => {
          console.log(res.data)
          if (res.data) {
            this.$message({
              type: 'success',
              message: '验证发送成功'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '一小时内只能发送三次验证码'
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请输入手机号'
        })
      }
    },
    handleEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let urlParam = new URLSearchParams()
          // urlParam.append('commentText', editor.innerHTML)
          // urlParam.append('hobbiesId', this.essayData.id)
          $post(webUserUpdate, this.editForm, {
            'X-Auth0-Token':
              this.cookie !== '' ? this.cookie : this.tokenObj.token
          }).then(res => {
            // console.log(res)
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.$emit('getUserEmit')
              setTimeout(() => {
                this.$router.go(0)
              }, 1000)
            } else if (res.data.code == 1) {
              this.$message({
                message: `${res.data.des}`,
                type: 'warning'
              })
            } else if (res.data.code == 2) {
              this.$message({
                message: '登录失效，请重新登录',
                type: 'warning'
              })
            }
          })
        }
      })
    },
    handlePhoneChange(code, phone) {
      $get(
        webUserUpdatePhone,
        {
          code: code,
          phone: phone
        },
        {
          'X-Auth0-Token':
            this.cookie !== '' ? this.cookie : this.tokenObj.token
        }
      ).then(res => {
        // console.log(res)
        if (res.data.code == 0) {
            this.$message({
              type: 'success',
              message: '更改手机号码成功'
            })
            this.isShowPhone = false
          } else if (res.data.code == 1) {
            this.$message({
              type: 'warning',
              message: `${res.data.des}`
            })
          } else if (res.data.code == 2) {
            this.$message({
              type: 'warning',
              message: '登录失效，请重新登录'
            })
          }
      })
    },
    closeBtn() {
      this.isShowPhone = false
    },
    formatPic(item) {
      return systemManage.getApi(item)
    },
    getUserInfo() {
      $get(webUserSelectByPrimaryKey, {
        'X-Auth0-Token': this.cookie !== '' ? this.cookie : this.tokenObj.token
      }).then(res => {
        this.userData = res.data.des
        this.editForm = {
          ...this.editForm,
          ...this.userData.user
        }
      })
    },
    handleCancel() {
      this.$message('取消成功')
      this.editForm = {}
      this.getUserInfo()
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
    }
  }
}
</script>
<style>
.person_info {
  background: #ffffff;
  margin-top: 30px;
  padding-top: 40px;
}
.person_info_title {
  font-size: 26px;
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
  text-align: center;
  margin-bottom: 60px;
}
.person_info_form {
  padding-left: 177px;
  position: relative;
  padding-bottom: 40px;
}
.person_info_form .el-form-item {
  width: 380px;
}
.person_info_form_address {
  width: 900px !important;
}
.person_info_form_address_required {
  right: -54px !important;
}
.distpicker-address-wrapper select {
  width: 175px !important;
  height: 50px !important;
  border-radius: 0px;
}
.distpicker-address-wrapper select:first-child {
  margin-right: 30px;
}
.person_info_form_address .el-input {
  width: 380px;
}
.person_info_form .el-button--primary {
  background: url('~static/person/save.png');
  width: 150px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 0px;
}
.person_info_form .el-button--default {
  background: url('~static/person/cancel.png');
  width: 150px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 0px;
}
.person_info_form .el-button--primary span {
  font-size: 18px;
}
.person_info_form .el-button--default span {
  /* color: rgba(18, 18, 18, 1); */
  color: #fff;
  font-size: 18px;
}
.person_info_form .el-button--default:hover {
  color: rgba(18, 18, 18, 1);
}
.person_info_form .el-upload img {
  width: 150px;
  height: 150px;
}
.person_info_form_avatar {
  position: absolute;
  right: 0px;
  top: 0px;
}
.person_info_form .avatar-uploader {
  width: 150px;
  height: 150px;
}
.person_info_form .avatar-uploader span {
  font-size: 16px;
  font-weight: 400;
}
.avatar-uploader_wrap {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
}
.person_info_form .el-input__inner {
  border-radius: 0px !important;
  height: 50px;
  font-size: 16px;
}
.person_info_form_required {
  color: #aaaaaa;
  font-size: 14px;
}
.person_info_form_required i {
  color: #be001e;
}
.requiredItem {
  width: 611px !important;
  position: relative;
}
.requiredItem input {
  width: 380px;
}
.person_info_form_required {
  position: absolute;
  right: 172px;
  bottom: 5px;
}
.person_info_form_phone .el-form-item__content {
  width: 380px;
  position: static;
}
.person_info_form_phone {
  width: 755px !important;
  position: relative;
}
.person_info_form_phone .el-form-item__content .el-form-item__error {
  left: 506px;
  top: 23%;
}
.changePhone {
  position: absolute;
  right: 265px;
  top: 3px;
  font-weight: 400;
  cursor: pointer;
}

.person_info_form .person_form_wrap .vf_btn {
  position: absolute;
  right: 1px;
  top: 0;
  height: 100%;
  /* border: 1px dashed #000; */
  background: url('~static/images/hobby.jpg') no-repeat;
  font-size: 18px;
  /* font-family: SourceHanSansCN-Medium; */
  font-weight: 500;
  color: rgba(254, 254, 254, 1);
}
.person_info_form .person_form_wrap .vf_bg {
  background: url('~static/person/register_btn.png') no-repeat;
  background-size: 100% 100%;
  right: 0;
}
.person_info_form .person_form_wrap .verificationCode .el-input__inner {
  height: 49px;
}
.phonePromptMark {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
}
.phonePromptWrap {
  width: 369px;
  height: 191px;
  position: absolute;
  background: #ffff;
  z-index: 9999999;
  /* margin: 0 auto; */
  left: 50%;
  top: 50%;
  margin-top: -210px;
  margin-left: -210px;
  padding: 60px;
  border-radius: 10px;
}
.closeBtn {
  position: absolute;
  top: 7px;
  right: 8px;
  cursor: pointer;
}
.person_info .el-upload--picture-card:hover,
.el-upload:focus {
  color: #000;
  border: none;
}
.el-input.is-disabled .el-input__inner {
  color: #000;
}
.el-select-dropdown__item {
  font-size: 16px !important;
}
.el-select-dropdown__item.selected {
  color: #be001e;
}
.el-select-dropdown__item.hover span {
  color: #be001e;
}
.person_info .el-form-item__error {
  left: 456px;
  top: 30%;
  color: #be001e !important;
  font-size: 14px !important;
}
.person_info .emailItem {
  width: 564px;
  position: relative;
}
.person_info .emailItem .el-input__inner {
  width: 380px;
}
.person_info .emailItem .el-form-item__error {
  left: 405px;
}
.person_info .el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #be001e;
}
.person_info .el-select .el-input.is-focus .el-input__inner {
  border-color: #be001e;
}
.distpicker-address-wrapper select {
  outline: none;
}
.person_info .el-select .el-input__inner:focus {
  border-color: #be001e;
}
.person_info .el-date-table td.current:not(.disabled) span {
  background-color: #be001e;
}
.distpicker-address-wrapper select:focus {
  border-color: #be001e;
}
.person_info .el-select,
.el-date-editor.el-input {
  width: 380px;
}
.person_info .phonePromptWrap .el-form-item__error {
  left: 0px;
  top: 95%;
}

.person_info .el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  background-image: url('~static/person/register_btn.png') no-repeat;
  background-color: transparent;
}
.person_info .person_info_form_address {
  position: relative;
}
.person_info .person_info_form_address .el-form-item__error {
  position: absolute;
  top: 47px;
  right: 22px;
  left: 0;
}
.person_info .cancelBtn span{
  color: #000;
}
.person_info .person_info_form_address_required {
  right: 157px !important;
  top: 15px;
}
.person_info .person_info_form_detailAddress  {
  width: 530px;
}
.person_info .person_info_form_detailAddress .el-input {
  width: 380px;
}
.person_info .phoneCancel span{
  color: #000;
}
</style>
