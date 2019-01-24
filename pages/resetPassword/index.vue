<template>
  <div class="resetPassword_wrapper">
    <div class="header">
      <Header></Header>
    </div>
    <div class="content_wrapper">
      <div class="content">
        <el-form class="content_form phoneForm"
          :model="resetObj"
          :rules="rules"
          ref="phoneForm"
          name="phoneForm">
          <el-form-item>
            <p class="title">请输入手机号</p>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input class="input"
              placeholder="请输入手机号"
              maxlength="11"
              @blur="hideTip"
              v-model="resetObj.phone"
              @change="hideTip"
              key="1"></el-input>
            <p class="phoneTip">该手机号未被注册</p>
          </el-form-item>
          <el-form-item class="indentify"
            prop="identify">
            <el-input class="input"
              placeholder="请输入短信验证码"
              v-model="resetObj.identify"></el-input>
            <el-button @click="sendIdentify"
              :disabled="btnDisableContral"
              :class="['vf_btn', btnDisableContral ? 'vf_bg': '']">{{vfDes}}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="getVerify('phoneForm')"
              class="reset_confirm_btn">确定</el-button>
          </el-form-item>
        </el-form>
        <el-form class="content_form resetPass_region"
          :model="resetObj"
          :rules="rules"
          name="passwordPhone">
          <el-form-item>
            <p class="title">设置新密码</p>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input"
              type="password"
              placeholder="设置不低于六位数的密码"
              v-model="resetObj.password"></el-input>
            <div class="tangle"><span :class="['tangleColor', passwordStrong]"></span><span :class="['tangleColor', passwordStrong]"></span><span :class="['tangleColor', passwordStrong]"></span><span>不能使用\、,等特殊符号</span></div>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input class="input"
              type="password"
              placeholder="再次输入确认密码"
              v-model="resetObj.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetPassWord('form')"
              class="reset_btn"
              type="submit">设置新密码</el-button>
          </el-form-item>
        </el-form>
        <el-form class="content_form backToLogin">
          <p class="textTip">密码已修改成功，{{time}}秒后自动跳转到登录页！</p>
          <p class="login_btn"
            @click="loginPage">立即登录</p>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import systemManage from '@/http/url'
import { $post, $get } from '@/http/ajax'
import {
  webUserCheckPhone,
  webUserForgetAndReset,
  smsUserSendMsgUpdateByPwd,
  smsCheckCode
} from '@/http/api'
import { setTimeout, clearTimeout } from 'timers'
export default {
  name: 'resetPassword',
  metaInfo: {
    // 设置 title
    title: '重置密码页',
    // 设置 meta
    meta: [
      {
        name: 'keyWords',
        content: 'vue '
      }
    ],
    // 设置 link
    link: [
      {
        rel: 'asstes',
        href: 'https://assets-cdn.github.com/'
      }
    ]
  },
    data() {
    let state = false
    let checkPhoneValue = (rule, value, callback) => {
      if (value.length !== 11) {
        this.state = false
        return callback(new Error('请输入正确的手机号'))
      } else {
        const reg = /[^0-9]/
        if (reg.test(value)) {
          this.state = false
          return callback(new Error('请输入正确的手机号'))
        }else {
          this.state = true
          callback()
        }
      }
    }
      let checkPasswordValue = (rule, value, callback) => {
      if (!value) {
        this.myPasswordFlag = false
        return callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        this.myPasswordFlag = false
        return callback(new Error('密码长度不小于6位'))
      } else if (/[/.,\\!%()^,，_+=\/`~~?:;‘’“”"]/g.test(value)) {
        this.myPasswordFlag = false
        return callback(new Error('不能使用、/,等特殊符号'))
      } else if (/\s/g.test(value)) {
        this.myPasswordFlag = false
        return callback(new Error('密码不能有空格'))
      } else {
        this.myPasswordFlag = true
        return callback()
      }
    }
    return {
      resetObj: {
        phone: '',
        identify: '',
        password: '',
        confirmPassword: '',
        myPasswordFlag: false
      },
      /* verificationCode: '',
        confirmPassword: '', */
      rules: {
        phone: [
          { required: true, validator: checkPhoneValue, trigger: 'blur' }
        ],
        identify: [
          { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: checkPasswordValue, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      },
      title: '请输入手机号',
      flag: 0,
      loading: false,
      state: state,
      clock: null,
      time: 3,
      vfDes: '发送验证码',
      desTime: true,
      isVf: false,
      Time: null,
      func: null
    }
  },
  mounted() {
    if (this.flag === 0) {
      document.querySelector('.resetPass_region').style.display = 'none'
    }
  },
  computed: {
    passwordStrong() {
      let password = this.resetObj.password || {}
      if (password.length >= 10) {
        if (password.match(/[a-z]/g) && password.match(/[0-9]/g)) {
          return 'higher'
        } else if (password.match(/[a-z]/g)) {
          return 'middle'
        } else if (password.match(/[0-9]/g)) {
          return 'middle'
        }
      } else if (password.length >= 8) {
        if (password.match(/[a-z]/g) && password.match(/[0-9]/g)) {
          return 'middle'
        } else if (password.match(/[a-z]/g)) {
          return 'less'
        } else if (password.match(/[0-9]/g)) {
          return 'less'
        }
      } else if (password.length >= 6) {
        return 'less'
      } else {
        return ''
      }
    },
    // 按钮样式
    btnDisableContral() {
      if (this.state && this.desTime) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    sendIdentify() {
      let that = this
      if (this.state) {
        // 验证手机号是否存在
        $get(webUserCheckPhone, { phone: this.resetObj.phone }).then(res => {
          if (res.data.code === 1) {
            this.loading = false
            // 发送验证码
            this.Time = new Date().getTime()
            this.isVf = true
            this.func = setInterval(function() {
              let time = parseInt(
                60 - (new Date().getTime() - that.Time) / 1000
              )
              that.vfDes = `${time}s`
              that.desTime = false
              if (time <= 0) {
                clearInterval(that.func)
                that.vfDes = `发送验证码`
                that.isVf = false
                that.desTime = true
              }
            }, 1000)
            $get(smsUserSendMsgUpdateByPwd, { phone: this.resetObj.phone })
              .then(res => {
                if(res.data) {
                  if(res.data.result) {
                    this.$message({
                      type: 'success',
                      message: res.data.des
                    })
                  } else {
                     this.$message({
                      type: 'warning',
                      message: res.data.des
                    })
                  }
                }
              })
              .catch(res => {
                this.$message({
                  type: 'warning',
                  message: '发生异常'
                })
              })
            document.querySelector('.phoneTip').style.display = 'none'
          } else if (res.data.code === 0) {
            document.querySelector('.phoneTip').style.display = 'block'
          } else {
            document.querySelector('.phoneTip').style.display = 'none'
            this.$message({
              type: 'warning',
              message: '发生未知错误'
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
    hideTip() {
      document.querySelector('.phoneTip').style.display = 'none'
    },
    // 获取到短信验证码验证
    getVerify(formName) {
      this.$refs[formName].validate(valid => {
        clearInterval(this.func)
        if (valid) {
          $get(smsCheckCode, {
            phone: this.resetObj.phone,
            code: this.resetObj.identify
          }).then(res => {
            if (res.data) {
              document.querySelector('.phoneForm').style.display = 'none'
              document.querySelector('.resetPass_region').style.display =
                'block'
            } else {
              this.$message({
                type: 'warning',
                message: '验证码错误'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    resetPassWord() {
      if (!this.myPasswordFlag) {
        return
      }
      if (
        this.resetObj.password.length >= 6 &&
        this.resetObj.password === this.resetObj.confirmPassword
      ) {
        $get(webUserForgetAndReset, {
          phone: this.resetObj.phone,
          newPassword: this.resetObj.password
        }).then(res => {
          if (res.data) {
            document.querySelector('.resetPass_region').style.display = 'none'
            document.querySelector('.backToLogin').style.display = 'block'
            this.calculateTime()
          }
        })
      } else {
        if (this.resetObj.password.length < 6) {
          return false
        } else {
          this.$message({
            type: 'warning',
            message: '两次密码不一致'
          })
        }
      }
    },
    calculateTime() {
      let that = this
      let data = new Date().getTime()
      this.clock = setInterval(function() {
        that.time = 3 - parseInt((new Date().getTime() - data) / 1000)
        console.log(this.time)
        if (that.time <= 0) {
          clearInterval(that.clock)
          that.$router.push({ name: 'login' })
        }
      })
    },
    loginPage() {
      this.$router.push({ name: 'login', params: { state: 0 } })
    },
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style>
.resetPassword_wrapper .content_wrapper {
  width: 100%;
  padding: 30px 0;
  background: rgba(204, 204, 204, 0.2);
}
.resetPassword_wrapper .content_wrapper .content {
  margin: 0 auto;
  width: 1200px;
  height: 751px;
  box-sizing: border-box;
  background: #fff;
}
.resetPassword_wrapper .content_form {
  margin: 0 auto;
  padding-top: 27px;
  width: 380px;
}
.resetPassword_wrapper .content_form .title {
  height: 26px;
  font-size: 26px;
  letter-spacing: 5px;
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
  line-height: 17px;
  text-align: center;
}
.resetPassword_wrapper .content_form .el-form-item__content {
  line-height: normal;
  height: 50px;
}
.resetPassword_wrapper .content_form input.el-input__inner {
  height: 50px !important;
  line-height: 50px !important;
  width: 360px;
  outline: 0;
  border-radius: 0 !important;
  border: 1px solid#E7E7E7;
  box-sizing: border-box;
  color: #aaa;
}
.resetPassword_wrapper
  .content_form
  .el-form-item__content:nth-child(2)
  input.el-input__inner {
  width: 245px;
}
.resetPassword_wrapper .content_form input.el-input__inner:focus {
  border: 1px solid rgba(231, 231, 231, 1);
}
.resetPassword_wrapper .content_form .input {
  width: 360px !important;
  height: 50px;
  box-sizing: border-box;
  font-size: 16px;
  overflow: hidden;
  border: none;
}
.resetPassword_wrapper .content_form input.el-input__inner:focus {
  border: 1px solid red !important;
}
.resetPassword_wrapper .content_form .el-form-item:nth-child(1) {
  margin-bottom: 142px;
}
.resetPassword_wrapper .content_form .el-form-item:nth-child(3) {
  margin-top: 63px;
  margin-bottom: 34px;
}
.resetPassword_wrapper .content_form .reset_confirm_btn {
  color: #fff;
  font-size: 18px;
  width: 360px !important;
  height: 50px !important;
  border: none;
  background: url('~static/images/loginBtn.png') no-repeat !important;
}
.resetPassword_wrapper .tangle {
  position: relative;
  margin-top: 10px;
  height: 6px;
  font-size: 12px;
  color: #be001e;
}
.resetPassword_wrapper .tangleColor {
  display: inline-block;
  height: 100%;
  width: 70px;
  background-color: #ccc;
}
.resetPassword_wrapper .tangleColor {
  margin-right: 7px;
}
.resetPassword_wrapper .tangleColor.higher:nth-child(3) {
  background: #66cc99;
}
.resetPassword_wrapper .tangleColor.higher:nth-child(2) {
  background: #6699cc;
}
.resetPassword_wrapper .tangleColor.higher:first-child {
  background: #66cccc;
}
.resetPassword_wrapper .tangleColor.middle {
  background: #6699cc;
}
.resetPassword_wrapper .tangleColor.middle:nth-child(3) {
  background: #ccc;
}
.resetPassword_wrapper .tangleColor.middle:first-child {
  background: #66cccc;
}
.resetPassword_wrapper .tangleColor.less {
  background: #ccc;
}
.resetPassword_wrapper .tangleColor.less:first-child {
  background: #66cccc;
}
.resetPassword_wrapper .reset_btn {
  cursor: pointer;
  border: none;
  font-weight: bold;
  text-align: center;
}
.resetPassword_wrapper .reset_btn.el-button {
  color: #fff;
  width: 360px !important;
  height: 50px !important;
  background: url('~static/images/loginBtn.png') no-repeat !important;
}
.resetPassword_wrapper .content_form .el-form-item.identify,
.resetPassword_wrapper .el-form-item__content {
  position: relative;
}
.resetPassword_wrapper .el-form-item__content .el-form-item__error {
  position: absolute;
  width: 200px;
  left: 100%;
  top: 0;
  line-height: 50px;
  font-size: 14px;
  color: #be001e;
}
.resetPassword_wrapper .content_form .vf_btn {
  position: absolute;
  width: 132px;
  right: 21px;
  top: 0px;
  height: 52px;
  border: 1px solid rgba(0, 0, 0, 0);
  background: url('~static/images/hobby.jpg') no-repeat;
  color: rgba(254, 254, 254, 1);
}
.resetPassword_wrapper .content_form .vf_bg {
  top: -1px;
  right: 20px;
  background: url('~static/images/register_btn.png') no-repeat;
}
.resetPassword_wrapper .phoneTip {
  display: none;
  position: absolute;
  width: 200px;
  left: 100%;
  top: 0;
  line-height: 50px;
  font-size: 14px;
  color: #be001e;
}
.resetPassword_wrapper .backToLogin {
  padding-top: 343px;
  display: none;
}
.resetPassword_wrapper .backToLogin p {
  text-align: center;
}
.resetPassword_wrapper .backToLogin p.login_btn {
  margin-top: 26px;
  color: #be001e;
  font-size: 24px;
  font-weight: 400;
  cursor: pointer;
}
</style>
