<template>
  <div class="register_wrapper">
    <div class="header">
      <Header></Header>
    </div>
    <div class="content_wrapper">
      <div class="content">
        <el-form class="content_form"
          ref="registerForm"
          name="registerForm"
          :model="registerObj"
          :rules="rules">
          <el-form-item>
            <p class="title">注册</p>
          </el-form-item>
          <el-form-item prop="account">
            <el-input class="input"
              placeholder="请输入账号"
              v-model="registerObj.account"
              key="2"></el-input>
          </el-form-item>
          <el-form-item 
            prop="loginName"
            v-show="false">
            <el-input class="input"
              type="hidden"
              placeholder="请输入昵称"
              v-model="registerObj.account"
              ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input"
              minlength="6"
              placeholder="设置不低于六位数的密码"
              type="password"
              v-model="registerObj.password"
              ></el-input>
            <div class="tangle"><span :class="['tangleColor', passwordStrong]"></span><span :class="['tangleColor', passwordStrong]"></span><span :class="['tangleColor', passwordStrong]"></span><span>不能使用\、,等特殊符号</span></div>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input class="input"
              minlength="6"
              type="password"
              placeholder="再次输入确认密码"
              v-model="registerObj.confirmPassword"
              @blur="warningTip(registerObj.confirmPassword)"></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input class="input"
              placeholder="请输入手机号"
              maxlength="11"
              v-model="registerObj.phone"></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <el-input class="input verificationCode"
              placeholder="请输入短信验证码"
              v-model="registerObj.verificationCode"></el-input>
            <el-button :class="['vf_btn', btnDisableContral ? 'vf_bg': '']"
              @click="sendVerify"
              :disabled="btnDisableContral">{{vfDes}}</el-button>
          </el-form-item>
          <el-form-item class="des"
            prop="checked">
            <el-checkbox v-model="registerObj.checked"><a href="javascript:;">同意《用户服务协议》</a></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="register_btn"
              @click="registerAccount('registerForm')">注册</el-button>
            <div class="login_des"><a href="javascript:;"
                @click="goToLogin">已有账号，立即登陆</a></div>
          </el-form-item>
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
import { smsCheckCode, smsSendMsgByRegister, webRegister } from '@/http/api'
import { $get, $post } from '@/http/ajax'
import { setInterval, clearInterval } from 'timers'
export default {
  name: 'register',
  metaInfo: {
    // 设置 title
    title: '注册页',
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
    let checkPasswordValue = (rule, value, callback) => {
      if (!value) {
        this.flag = false
        return callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        this.flag = false
        return callback(new Error('密码长度不小于6位'))
      } else if (/[/.,\\!%()^,，_+=/`~?:;‘’“”"]/g.test(value)) {
        this.flag = false
        return callback(new Error('密码中存在、/,等特殊符号'))
      } else if (/\s/g.test(value)) {
        this.flag = false
        return callback(new Error('密码不能有空格'))
      } else {
        this.flag = true
        return callback()
      }
    }
    let checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      } else {
        const reg = /[^[A-Za-z]/
        if (reg.test(value)) {
          return callback(new Error('账号只能为英文'))
        } else if (/\s/g.test(value)) {
        return callback(new Error('密码不能有空格'))
      }  else {
          callback()
        }
      }
    }
    return {
      registerObj: {
        checked: []
      },
      /* verificationCode: '',
        confirmPassword: '', */
      rules: {
        account: [{ required: true, validator: checkAccount, trigger: 'blur' }],
        password: [
          { required: true, validator: checkPasswordValue, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
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
        checked: [
          {
            type: 'array',
            required: true,
            message: '请选择接受用户协议进行注册',
            trigger: 'change'
          }
        ]
      },
      state: state,
      passwordFlag: false,
      vfDes: '发送验证码',
      isVf: false,
      desTime: true,
      Time: null,
      func: null,
      flag: false // 判定，密码是否满足条件
    }
  },
  computed: {
    passwordStrong() {
      let password = this.registerObj.password || {}
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
    btnDisableContral() {
      if (this.state && this.desTime) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    registerAccount(formName) {
      if(this.registerObj.password.length < 6 || !this.flag) {
        return 
      }
      this.registerObj.loginName = this.registerObj.account
      this.$refs[formName].validate(valid => {
        if (valid && this.passwordFlag) {
          $post(webRegister, this.registerObj).then(res => {
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: '注册成功'
              })
              this.$router.push({
                name: 'login',
                params: {
                  account: this.registerObj.account,
                  password: this.registerObj.password,
                  register: '1'
                }
              })
            } else {
              this.$message({
                type: 'warning',
                message: res.data.des
              })
            }
          })
        } else {
          return false
        }
      })
    },
    warningTip(str) {
      if (this.registerObj.password !== this.registerObj.confirmPassword) {
        this.$message({
          type: 'warning',
          message: '两次密码不一致'
        })
        this.passwordFlag = false
      } else {
        this.passwordFlag = true
      }
    },
    // 发送手机验证码
    sendVerify() {
      let that = this
      console.log(this.registerObj.phone)
      if (this.state) {
        this.Time = new Date().getTime()
        this.isVf = true
        this.func = setInterval(function() {
          let time = parseInt(60 - (new Date().getTime() - that.Time) / 1000)
          that.vfDes = `${time}s`
          that.desTime = false
          if (time <= 0) {
            that.vfDes = `发送验证码`
            that.isVf = false
            that.desTime = true
            clearInterval(that.func)
          }
        }, 1000)
        $get(smsSendMsgByRegister, { phone: this.registerObj.phone }).then(
          res => {
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
            } else {
              this.$message({
                type: 'warning',
                message: '一小时内只能发送三次验证码'
              })
              clearInterval(that.func)
              that.vfDes = `发送验证码`
              that.isVf = false
              that.desTime = true
            }
          }
        )
      } else {
        this.$message({
          type: 'warning',
          message: '请输入手机号'
        })
      }
    },
    // 返回登录页
    goToLogin() {
      this.$router.push({ name: 'login' })
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style>
.register_wrapper .content_wrapper {
  width: 100%;
  padding: 30px 0;
  background: rgba(204, 204, 204, 0.2);
}
.register_wrapper .content_wrapper .content {
  margin: 0 auto;
  width: 1200px;
  height: 781px;
  box-sizing: border-box;
  background: #fff;
}
.register_wrapper .content_form {
  margin: 0 auto;
  padding-top: 27px;
  width: 380px;
}
.register_wrapper .content_form .title {
  height: 26px;
  font-size: 26px;
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
  line-height: 17px;
  text-align: center;
}
.register_wrapper .content_form .el-form-item__content {
  position: relative;
  line-height: normal;
  height: 50px;
}
.register_wrapper .content_form .el-form-item__content .el-form-item__error {
  position: absolute;
  width: 200px;
  left: 100%;
  top: 0;
  line-height: 44px;
}
.register_wrapper
  .content_form
  .el-form-item:nth-child(8)
  .el-form-item__content
  .el-form-item__error {
  position: absolute;
  left: 0;
  top: 50%;
}
.register_wrapper .content_form input.el-input__inner {
  height: 50px !important;
  line-height: 50px !important;
  outline: 0;
  border-radius: 0 !important;
  border: 1px solid#E7E7E7;
  box-sizing: border-box;
  color: #aaa;
}
.register_wrapper .content_form input.el-input__inner:focus {
  border: 1px solid rgba(231, 231, 231, 1);
}
.register_wrapper .content_form .input {
  width: 360px !important;
  height: 50px;
  box-sizing: border-box;
  font-size: 16px;
  overflow: hidden;
  border: none;
  color: #121212;
}
.register_wrapper .content_form input.el-input__inner:focus,
.register_wrapper .content_form input.el-input__inner:hover {
  border: 1px solid #be001e !important;
}
.register_wrapper .content_form .el-form-item:nth-child(4) {
  margin-bottom: 44px;
}
.register_wrapper .tangle {
  position: relative;
  margin-top: 10px;
  height: 6px;
  font-size: 12px;
  color: #be001e;
}
.register_wrapper .tangleColor {
  display: inline-block;
  height: 100%;
  width: 70px;
  background-color: #ccc;
}
.register_wrapper .tangleColor {
  margin-right: 7px;
}
.register_wrapper .tangleColor.higher:nth-child(3) {
  background: #66cc99;
}
.register_wrapper .tangleColor.higher:nth-child(2) {
  background: #6699cc;
}
.register_wrapper .tangleColor.higher:first-child {
  background: #66cccc;
}
.register_wrapper .tangleColor.middle {
  background: #6699cc;
}
.register_wrapper .tangleColor.middle:nth-child(3) {
  background: #ccc;
}
.register_wrapper .tangleColor.middle:first-child {
  background: #66cccc;
}
.register_wrapper .tangleColor.less {
  background: #ccc;
}
.register_wrapper .tangleColor.less:first-child {
  background: #66cccc;
}
.register_wrapper .content_form .input.verificationCode {
  position: relative;
  width: 245px !important;
}

.register_wrapper .content_form .vf_btn {
  position: absolute;
  right: 18px;
  top: 0;
  width: 140px;
  height: 100%;
  border-left: none;
  border-top-left-radius: 10%;
  background: url('~static/images/hobby.jpg') no-repeat;
  font-size: 18px;
  font-weight: 500;
  color: rgba(254, 254, 254, 1);
}

.register_wrapper .content_form .vf_bg {
  background: url('~static/images/register_btn.png') no-repeat;
}
.register_wrapper .content_form .register_btn {
  width: 360px;
  height: 50px;
  border: none;
  color: rgba(254, 254, 254, 1);
  background: url('~static/images/loginBtn.png') no-repeat;
}
.register_wrapper .el-checkbox__input.is-focus .el-checkbox__inner {
  border: 1px solid #be001e;
}
.register_wrapper .el-checkbox__input.is-checked .el-checkbox__inner {
  border: 1px solid #be001e;
  background: #be001e;
}
.register_wrapper .el-checkbox.is-checked .el-checkbox__label {
  color: #000;
}
.register_wrapper .content_form a {
  text-decoration: none;
  color: #000;
}
.register_wrapper .content_form .login_des {
  margin-top: 20px;
  text-align: center;
}
.register_wrapper .content_form .login_des a {
  width: 143px;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(190, 0, 30, 1);
  line-height: 18px;
}
</style>
