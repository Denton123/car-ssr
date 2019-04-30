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
            <el-checkbox v-model="registerObj.checked"><span class="a" @click="showAgree">同意《用户服务协议》</span></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="register_btn"
              @click="registerAccount('registerForm')">注册</el-button>
            <div class="login_des"><span class="a"
                @click="goToLogin">已有账号，立即登陆</span></div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog
      title="用户服务协议"
      :visible.sync="agreeDialogVisible"
      width="60%"
      center>
      <p class="font-bold">一、总则
      <p>1.1 先锋咖的所有权和运营权归广州市米格文化传播有限公司所有。 
      <p>1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与先锋咖之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。 
      <p>1.3 本协议则可由先锋咖随时更新，用户应当及时关注并同意本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。
      <p class="font-bold">二、服务内容
      <p>2.1 先锋咖的具体内容由本站根据实际情况提供。 
      <p>2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。
      <p class="font-bold">三、用户帐号
      <p>3.1 经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。先锋咖有权对会员的权限设计进行变更。 
      <p>3.2 用户只能按照注册要求使用真实姓名，及身份证号注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。
      <p class="font-bold">四、使用规则
      <p>4.1 遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。 
      <p>4.2 用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在本站任何页面发布、转载、传送含有下列内容之一的信息，否则本站有权自行处理并不通知用户：
      <p>(1)违反宪法确定的基本原则的； 
      <p>(2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的； 
      <p>(3)损害国家荣誉和利益的； 
      <p>(4)煽动民族仇恨、民族歧视，破坏民族团结的； 
      <p>(5)破坏国家宗教政策，宣扬邪教和封建迷信的； 
      <p>(6)散布谣言，扰乱社会秩序，破坏社会稳定的；
      <p>(7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的； 
      <p>(8)侮辱或者诽谤他人，侵害他人合法权益的； 
      <p>(9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的； 
      <p>(10)以非法民间组织名义活动的；
      <p>(11)含有法律、行政法规禁止的其他内容的。4.3 用户承诺对其发表或者上传于本站的所有信息(即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等)均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成本站被第三人索赔的，用户应全额补偿本站一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)； </p>
      <p>4.4 当第三方认为用户发表或者上传于本站的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本站发送权利通知书时，用户同意本站可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本站将不会自动恢复上述删除的信息；(1)不得为任何非法目的而使用网络服务系统； </p>
      <p>(2)遵守所有与网络服务有关的网络协议、规定和程序； (3)不得利用本站进行任何可能对互联网的正常运转造成不利影响的行为； </p>
      <p>(4)不得利用本站进行任何不利于本站的行为。4.5 如用户在使用网络服务时违反上述任何规定，本站有权要求用户改正或直接采取一切必要的措施(包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利)以减轻用户不当行为而造成的影响。</p>
      <p class="font-bold">五、隐私保护</p>
      <p>5.1 本站不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本站的非公开内容，但下列情况除外：(1)事先获得用户的明确授权；</p> 
      <p>(2)根据有关的法律法规要求；</p>
      <p>(3)按照相关政府主管部门的要求；</p>
      <p>(4)为维护社会公众的利益。5.2 本站可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本站同等的保护用户隐私的责任，则本站有权将用户的注册资料等提供给该第三方。</p>
      <p>5.3 在不透露单个用户隐私资料的前提下，本站有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
      <p class="font-bold">六、版权声明</p>
      <p>6.1 本站的文字、图片、音频、视频等版权均归永兴元科技有限公司享有或与作者共同享有，未经本站许可，不得任意转载。 </p>
      <p>6.2 本站特有的标识、版面设计、编排方式等版权均属永兴元科技有限公司享有，未经本站许可，不得任意复制或转载。 </p>
      <p>6.3 使用本站的任何内容均应注明“来源于先锋咖”及署上作者姓名，按法律规定需要支付稿酬的，应当通知本站及作者及支付稿酬，并独立承担一切法律责任。</p>
      <p>6.4 本站享有所有作品用于其它用途的优先权，包括但不限于网站、电子杂志、平面出版等，但在使用前会通知作者，并按同行业的标准支付稿酬。</p>
      <p>6.5 本站所有内容仅代表作者自己的立场和观点，与本站无关，由作者本人承担一切法律责任。 </p>
      <p>6.6 恶意转载本站内容的，本站保留将其诉诸法律的权利。</p>
      <p class="font-bold">七、责任声明</p>
      <p>7.1 用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，先锋咖对此不承担任何责任。 </p>
      <p>7.2 本站无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。 </p>
      <p>7.3 本站不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本站实际控制的任何网页上的内容，本站不承担任何责任。</p>
      <p>7.4 对于因不可抗力或本站不能控制的原因造成的网络服务中断或其它缺陷，本站不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
      <p>7.5 对于站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本站无需承担任何责任：(1)本站向用户免费提供的各项网络服务； </p>
      <p>(2)本站向用户赠送的任何产品或者服务。7.6 本站有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本站对用户和任何第三人均无需承担任何责任。</p>
      <p class="font-bold">八、附则</p>
      <p>8.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。 </p>
      <p>8.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
      <p>8.3 本协议解释权及修订权归广州市米格文化传播有限公司所有。</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="agreeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="agreeDialogVisible = false,check = true">确 定</el-button>
      </span>
    </el-dialog>
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
      flag: false, // 判定，密码是否满足条件
      agreeDialogVisible: false
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
      // console.log(this.registerObj.phone)
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
                // console.log(res.data)
                // if(res.data.code == 0) {
                  this.$message({
                    type: 'success',
                    message: '短信验证码下发成功'
                    })
                // } else {
                //     this.$message({
                //     type: 'warning',
                //     message: '验证码下发失败'
                //   })
                //   clearInterval(that.func)
                //   that.vfDes = `发送验证码`
                //   that.isVf = false
                //   that.desTime = true
                // }
            } else {
              this.$message({
                type: 'warning',
                message: '验证码下发失败'
              })
              clearInterval(that.func)
              that.vfDes = `发送验证码`
              that.isVf = false
              that.desTime = true
              // 18244994441
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
    },
    showAgree() {
      this.agreeDialogVisible = true
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
.font-bold{
  font-weight: bold;
  font-size: 16px;
}
</style>
