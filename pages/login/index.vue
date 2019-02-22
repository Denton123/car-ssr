<template>
  <div class="login-wrapper">
    <div class="header">
      <Header></Header>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <p class="title">登录</p>
        <div class="input_content">
          <el-form :model="loginObj"
            ref="form"
            :rules="rules">
            <el-form-item prop="account">
              <el-input placeholder="请输入帐号"
                v-model="loginObj.account"
                class="input"
                type="text"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码"
                min="6"
                v-model="loginObj.password"
                class="input"
                type="password"></el-input>
            </el-form-item>
            <el-form-item prop="checked">
              <div class="loginMemory">
                <el-checkbox v-model="loginObj.checked">自动登录</el-checkbox>
              </div>
              <el-button v-loading="loading"
                @click="login('form')"
                class="login_btn"
                element-loading-background="rgba(255, 255, 255, 0.5)"
                type="submit">登录</el-button>
              <div class="newCount"><a class="NC"
                  href="javascript:;"
                  @click="newCount">注册新账号</a> <a class="FP"
                  href="javascript:;"
                  @click="forgetPassword">忘记密码?</a></div>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
// import {instance} from '@/http/instance'
import axios from 'axios'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { $post } from '@/http/ajax'
import { webAccountLogin } from '@/http/api'
const _webAccountLogin_ = webAccountLogin
export default {
  name: 'Login',
  data() {
    return {
      loginObj: {
        checked: false
      },
      loginType: [],
      rules: {
        /*  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }] */
      },
      loading: false,
      fnc: null
    }
  },
    beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    next(vm => {
      /* 如果在当前页刷新，临时使用跳转过来的路由 */
      if(from.name) {
        sessionStorage.setItem('login_from', JSON.stringify(from))
      }
    })
    },
  beforeMount() {
    let obj =localStorage.getItem('userMsg') && localStorage.getItem('userMsg') != '' ? localStorage.getItem('userMsg') : ''
    let user = null
    if (obj) {
      user = JSON.parse(obj)
    }
    if (this.$route.params.register && this.$route.params.register === '1') {
      this.loginObj.account = this.$route.params.account
      this.loginObj.password = this.$route.params.password
      this.login('form')
    }
    // 从重置密码页过来,清空localStorage
    if (this.$route.params.state === 0) {
      localStorage.removeItem('userMsg')
    } else {
      if (user) {
        this.loginObj.account = user.account
        this.loginObj.password = user.password
        // this.loginObj.checked = this.loginObj.checked
        this.loginObj.checked = user.checked
        // 如果是永久记住密码，那么就自动登陆
        this.login('form')
      }
    }
  },
  mounted() {
    this.loading = false
  },
  methods: {
    login(formName) {
      clearTimeout(this.fnc)
      let that = this
      this.fnc = setTimeout(function() {
        that.$refs[formName].validate(valid => {
          that._check_(valid, that)
        })
      })
    },
    newCount() {
      this.$router.push({ name: 'register' })
    },
    forgetPassword() {
      this.$router.push('/resetpassword')
    },
    setCookie(cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
      var expires = 'expires=' + d.toGMTString()
      document.cookie = cname + '=' + cvalue + '; ' + expires + '; path = / ;'
    },
        _check_(valid, that) {
      if (valid) {
        that.loading = true
        let urlParam = new URLSearchParams()
        urlParam.append('account', that.loginObj.account)
        urlParam.append('password', that.loginObj.password)
        $post(_webAccountLogin_, urlParam)
          .then(res => {
            if (res.data.des.token) {
              // 永久记住登陆状态，保存token，账号和密码
              if (that.loginObj.checked === true) {
                // 若永久登陆，则保存30天的cookie
                this.setCookie('token', res.data.des.token, 15*24 / 24)
                this.setCookie('userId', res.data.des.userId, 15*24 / 24)
                let msg = JSON.stringify({
                  account: that.loginObj.account,
                  password: that.loginObj.password,
                  checked: that.loginObj.checked,
                  ...res.data.des
                })
                localStorage.setItem('userMsg', msg)
                let temp =sessionStorage.getItem('login_from') && sessionStorage.getItem('login_from') != '' ? sessionStorage.getItem('login_from') : ''
                if(temp) {
                  temp = JSON.parse(temp)
                }else {
                  temp = ''
                }
                if(temp !== null && temp.name !== 'resetpassword' && temp.name !== 'register') {
                  that.$router.push(temp.fullPath)
                } else {
                  that.$router.push({ name: 'index' })
                }
              } else {
                // 不记住登陆状态， 只保存token 1个小时
                this.setCookie('token', res.data.des.token, 1 / 24)
                this.setCookie('userId', res.data.des.userId, 1 / 24)
                let temp =sessionStorage.getItem('login_from') && sessionStorage.getItem('login_from') != '' ? sessionStorage.getItem('login_from') : ''
                if(temp) {
                  temp = JSON.parse(temp)
                }else {
                  temp = ''
                }
                if(temp !== null && temp.name !== 'resetpassword' && temp.name !== 'register') {
                  that.$router.push(temp.fullPath)
                } else {
                  that.$router.push({ name: 'index' })
                }
              }
            } else {
              that.loading = false
              that.$message({
                type: 'warning',
                message: res.data.des
              })
            }
          })
          .catch(error => {
            that.loading = false
            that.$message({
              type: 'warning',
              message: '网络出错'
            })
          })
      } else {
        that.loading = false
        that.$message({
          type: 'error',
          messagen: '账号或密码不正确'
        })
        return false
      }
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>
<style>
.login-wrapper .header {
  height: 64px;
  background: #000;
}
.login-wrapper .content-wrapper {
  position: relative;
  width: 100%;
  height: 700px;
  background: url('~static/images/loginBackground.png') no-repeat;
  background-position: center;
}
.login-wrapper .content {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 460px;
  height: 473px;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 1);
}
.login-wrapper .content > .title {
  margin: 0;
  height: 110px;
  text-align: center;
  font-size: 26px;
  font-family: SourceHanSansCN-Bold;
  font-weight: bolder;
  color: rgba(18, 18, 18, 1);
  line-height: 110px;
}
.login-wrapper .input_content {
  margin-top: 15px;
  text-align: center;
}
.login-wrapper .input_content .el-form-item:nth-child(1) {
  margin-bottom: 15px !important;
}
.login-wrapper .input_content .el-form-item:nth-child(2) {
  margin-bottom: 0;
}
.login-wrapper .input_content .el-form-item__error {
  margin-left: 50px;
}
.login-wrapper .input {
  width: 360px !important;
  height: 50px;
  box-sizing: border-box;
  font-size: 16px;
  overflow: hidden;
  border: none;
}
.login-wrapper .el-form-item__content {
  line-height: 35px;
}
.login-wrapper input.el-input__inner {
  height: 50px !important;
  line-height: 50px !important;
  color: #121212;
  outline: 0;
  border-radius: 0;
  border: 1px solid #e7e7e7 !important;
}
.login-wrapper input.el-input__inner:focus,
.login-wrapper input.el-input__inner:hover {
  border: 1px solid #be001e !important;
}
.login-wrapper .input:nth-child(0) {
  margin-bottom: 30px;
}
.login-wrapper .el-checkbox__input.is-focus .el-checkbox__inner {
  border: 1px solid #be001e;
}
.login-wrapper .el-checkbox__input.is-checked .el-checkbox__inner {
  border: 1px solid #be001e;
  background: #be001e;
}
.login-wrapper .el-checkbox.is-checked .el-checkbox__label {
  color: #000;
}
.login-wrapper .login_btn {
  margin-top: 48px;
  margin-bottom: 20px;
  cursor: pointer;
  border: none;
  font-weight: bold;
  text-align: center;
}
.login-wrapper .login_btn.el-button {
  color: #fff;
  width: 360px !important;
  height: 51px !important;
  border: none;
  font-size: 18px;
  background: url('~static/images/loginBtn.png') no-repeat !important;
}
.login-wrapper .loginMemory {
  padding-left: 50px;
  text-align: left;
}
.login-wrapper .tip {
  color: #2a2a2a;
  line-height: 35px;
}
.login-wrapper .newCount {
  display: inline-block;
  width: 360px;
  overflow: hidden;
}
.login-wrapper .newCount > a {
  text-decoration: none;
  height: 18px;
  font-size: 16px;
  font-weight: 600;
  color: #be001e;
  line-height: 18px;
}
.login-wrapper .NC {
  float: left;
}
.login-wrapper .FP {
  float: right;
}
.login-wrapper .footer {
  float: left;
  width: 100%;
  height: 205px;
  background: rgba(0, 0, 0, 1);
}
</style>
