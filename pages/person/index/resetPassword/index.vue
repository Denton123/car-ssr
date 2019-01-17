<template>
  <div class="resetPassword">
    <h2 class="resetPassword_title">修改密码</h2>
    <div class="resetPassword_form">
      <el-form ref="resetForm"
        :model="resetForm">
        <el-form-item>
          <el-input v-model="resetForm.oldPassword"
            minlength="6"
            type="password"
            placeholder="请输入原密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="resetForm.newPassword"
            minlength="6"
            type="password"
            @blur="warnSameTip"
            placeholder="请输入新密码">
          </el-input>
          <div class="tangle">
            <span :class="['tangleColor', passwordStrong]"></span>
            <span :class="['tangleColor', passwordStrong]"></span>
            <span :class="['tangleColor', passwordStrong]"></span>
            <span>不能使用\、,等特殊符号</span>
          </div>
          <span class="repeatPasswordError"
            v-if="isShowNewError">{{newError}}</span>
        </el-form-item>
        <el-form-item class="repeatPasswordItem">
          <el-input v-model="resetForm.repeatPassword"
            minlength="6"
            type="password"
            @blur="warningTip"
            placeholder="再次输入确认密码">
          </el-input>
          <span class="repeatPasswordError"
            v-if="isShowErrorTip">{{passwordTip}}</span>
        </el-form-item>
        <!-- submit -->
        <el-form-item>
          <el-button type="primary"
            @click="onSubmit('resetForm')">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { webUserChangePassword } from '@/http/api'
import { $get, $post } from '@/http/ajax'
export default {
  name: 'resetPassword',
  data() {
    return {
      resetForm: {},
      passwordFlag: false,
      cookie: '',
      tokenObj: {},
      // 是否显示提示错误
      isShowErrorTip: false,
      passwordTip: '',
      isShowNewError: false,
      newError: ''
    }
  },
  computed: {
    passwordStrong() {
      let password = this.resetForm.newPassword || {}
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
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.passwordFlag && this.resetForm.oldPassword !== '' && this.resetForm.repeatPassword !== '' && this.resetForm.repeatPassword !== '') {
          $get(webUserChangePassword, this.resetForm, {
            'X-Auth0-Token':
              this.cookie !== '' ? this.cookie : this.tokenObj.token
          }).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.isShowErrorTip = false
              this.$router.push({
                path: '/login'
              })
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
        } else {
          this.$message('密码不为空')
        }
      })
    },
    warningTip() {
      if (this.resetForm.newPassword !== this.resetForm.repeatPassword) {
        this.$message({
          type: 'warning',
          message: '两次密码不一致'
        })
        this.isShowErrorTip = true
        this.passwordTip = '两次密码输入不一致'
        this.passwordFlag = false
      } else {
        this.passwordFlag = true
      }
    },
    warnSameTip() {
      if (this.resetForm.oldPassword == this.resetForm.newPassword) {
        this.$message({
          type: 'warning',
          message: '新密码不能和原密码一致，请重新输入新密码！'
        })
        this.isShowNewError = true
        this.newError = '新密码不能和原密码一致，请重新输入新密码！'
        this.passwordFlag = false
      } else if (this.resetForm.newPassword.length < 6) {
        this.$message({
          type: 'warning',
          message: '密码不小于6个字符'
        })
        this.isShowNewError = true
        this.newError = '密码不小于6个字符'
        this.passwordFlag = false
      } else if (
        /[`~!@#$%^&*_+<>{}\/'[\]]/im.test(this.resetForm.newPassword) ||
        /[`~!@#$%^&*_+<>{}\/'[\]]/im.test(this.resetForm.repeatPassword)
      ) {
        this.$message({
          type: 'warning',
          message: '密码存在特殊字符'
        })
        this.isShowNewError = true
        this.newError = '密码存在特殊字符'
        this.passwordFlag = false
      } else {
        this.passwordFlag = true
      }
    },
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
  },
  mounted() {
    this.cookie = this.getCookie('token')
    if (this.cookie == '') {
      this.tokenObj = JSON.parse(localStorage.getItem('userMsg'))
    }
    if (this.tokenObj == null) {
      this.tokenObj = {}
    }
  }
}
</script>
<style>
.resetPassword {
  background: #fff;
  margin-top: 30px;
  padding-top: 40px;
}
.resetPassword_title {
  font-size: 26px;
  font-weight: bold;
  color: rgba(18, 18, 18, 1);
  text-align: center;
  margin-bottom: 60px;
}
.resetPassword_form {
  width: 380px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.resetPassword_form .el-input__inner {
  width: 380px;
  height: 50px;
  border-radius: 0px;
  font-size: 16px;
}
.resetPassword_form .el-button--primary {
  background: url('~static/person/save.png');
  width: 150px;
  height: 40px;
  outline: none;
  border: none;
  border-radius: 0px;
}
.resetPassword_form .el-button--default {
  background: url('~static/person/cancel.png');
  width: 150px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 0px;
}
.resetPassword_form .el-button--primary span {
  font-size: 18px;
}
.resetPassword_form .el-button--default span {
  color: rgba(18, 18, 18, 1);
  font-size: 18px;
}
.resetPassword_form .el-button--default:hover {
  color: rgba(18, 18, 18, 1);
}
.resetPassword_form .el-upload img {
  width: 150px;
  height: 150px;
}
.resetPassword_form .tangle {
  position: relative;
  margin-top: 10px;
  height: 6px;
  font-size: 14px;
  color: #be001e;
  line-height: 6px;
}
.resetPassword .tangleColor {
  display: inline-block;
  height: 100%;
  width: 70px;
  background-color: #ccc;
}
.resetPassword .tangleColor {
  margin-right: 2px;
}
.resetPassword .tangleColor.higher:last-child {
  background: #66cc99;
}
.resetPassword .tangleColor.higher:nth-child(1) {
  background: #6699cc;
}
.resetPassword .tangleColor.higher:first-child {
  background: #66cccc;
}
.resetPassword .tangleColor.middle {
  background: #6699cc;
}
.resetPassword .tangleColor.middle:last-child {
  background: #ccc;
}
.resetPassword .tangleColor.middle:first-child {
  background: #66cccc;
}
.resetPassword .tangleColor.less {
  background: #66cccc;
}
.tangleColor.less:last-child,
.tangleColor.less:nth-child(1) {
  background: #ccc;
}
.repeatPasswordItem {
  display: inline-block;
  position: relative;
}
.repeatPasswordError {
  display: inline-block;
  color: #be001e;
  font-size: 14px;
  position: absolute;
  right: -146px;
  top: 6px;
}
</style>


