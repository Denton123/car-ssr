<template>
  <div class="order_container">
    <my-header></my-header>
    <div class="order">
      <div class="order_bg">
        <img src="~static/images/order.png"
          alt="背景图"
          width="100%"
          height="100%">
      </div>
      <div class="order_form">
        <div class="order_form_content">
          <div class="form_title">
            <span class="red_point">*</span>
            <span>为必填项。您的信息，我们将会完全保密，请您放心填写。</span>
          </div>
          <!-- 表单选项 -->
          <div class="form">
            <div class="form_inline">
              <el-select v-model="origin"
                class="first mR20"
                placeholder="请选择区域"
                @change="changeOrigin">
                <el-option v-for="(item, index) in originArr"
                  :key="index"
                  :value="item"></el-option>
              </el-select>
              <el-select v-model="province"
                class="first mR20"
                placeholder="请选择省份"
                @change="changeProvince">
                <el-option v-for="(item, index) in provinceArr"
                  :key="index"
                  :value="item"></el-option>
              </el-select>
              <el-select v-model="city"
                class="first mR20"
                placeholder="请选择市级"
                @change="changeCity">
                <el-option v-for="(item, index) in cityArr"
                  :key="index"
                  :value="item"></el-option>
              </el-select>
              <el-select v-model="franchiseId"
                class="second mR20"
                placeholder="请选择经销商">
                <el-option v-for="(item, index) in shopArr"
                  :key="index"
                  :value="item.id"
                  :label="item.name"></el-option>
              </el-select>
              <span>
                <span class="red_point">*</span>
                <span>必填</span>
              </span>
            </div>
            <div class="form_inline mT30 order_input">
              <el-input v-model="name"
                class="second"
                placeholder="请输入姓名"></el-input>
              <span class="mL20">
                <span class="red_point">*</span>
                <span>必填</span>
              </span>
            </div>
            <div class="form_inline mT30 order_input">
              <el-input v-model="phone"
                class="second"
                placeholder="请输入手机号码"></el-input>
              <span class="mL20">
                <span class="red_point">*</span>
                <span>必填</span>
              </span>
            </div>
            <div class="form_inline mT30 order_input">
              <div style="display: inline-block; position: relative">
                <el-input v-model="code"
                  class="third"
                  placeholder="请输入验证码"></el-input>
                <div class="codeBg"
                  :class="{'forbidden': changeCodeBg}"
                  @click="getCode"
                  v-text="tip"></div>
              </div>

              <span class="mL20">
                <span class="red_point">*</span>
                <span>必填</span>
              </span>
            </div>

            <!-- 预驾时间 -->
            <div class="form_time">
              <div class="form_title">
                <span class="red_point">*</span>
                <span class="time_title">预约试驾时间</span>
              </div>
              <div class="planTime mT30">
                <span class="planTime_title">计划执行时间</span>
                <div class="planTime_group">
                  <span class="normal"
                    v-for="(item, index) in planTime"
                    :class="{'active': activePlanItem == index }"
                    @click="changePlan(index)"
                    :key="index"
                    v-text="item"></span>
                </div>
              </div>
              <div class="planTime mT30">
                <span class="planTime_title">计划购车时间</span>
                <div class="planTime_group">
                  <span class="normal"
                    v-for="(item, index) in showCarTime"
                    :class="{'active': activeCarItem == index}"
                    @click="changeCarTime(index)"
                    :key="index"
                    v-text="item"></span>
                </div>
              </div>
            </div>
            <!-- 已同意 -->
            <div class="order_bottom">
              <div class="select_container">
                <input type="checkbox"
                  v-model="check"
                  class="select"
                  name="ok">
                <label 
                  style="margin-left: 10px;" @click="showAgree">我已阅读并同意《用户信息保密协议》</label>
              </div>
              <div class="btn_submit mT30"
                @click="submit">提交</div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="用户信息保密协议"
      :visible.sync="agreeDialogVisible"
      width="60%"
      center>
      <p style="text-indent:2em;">保护用户个人信息是先锋咖的一项基本原则。先锋咖将按照本声明及《隐私政策》（链接地址：http://www.jfcar.com.cn）的规定收集、使用、储存和分享您的个人信息。本协议对个人信息保护规定的内容与上述《隐私政策》有相冲突的，及本协议对个人信息保护相关内容未作明确规定的，以《隐私政策》的内容为准。</p>
      <p>一、个人信息的收集</p>
      <p class="text-pd">1、您自愿报名参与活动，您在活动现场与经销商达成的交易意向，先锋咖不提供任何保证，亦不承担任何法律责任。</p>
      <p class="text-pd">2、我们收集您的个人信息的最终目的是为了向您提供更好的产品、服务，优化并丰富您的用户体验，这些个人信息是能够单独或者与其他信息结合识别您的个人身份的信息，包括：</p>
      <p class="text-pd">①姓名</p>
      <p class="text-pd">②移动电话</p>
      <p class="text-pd">③您在网站的表格上输入的其他信息（电子邮箱、车牌号、住址等）</p>
      <p class="text-pd">④在您上载到网站的内容中包含的任何个人信息</p>
      <p class="text-pd">3、以上个人信息均是您自愿提供。您有权拒绝提供，但如果您拒绝提供某些个人信息，您将可能无法使用我们提供的产品、服务，或者可能对您使用产品或服务造成一定的影响。</p>
      <p class="text-pd">4、对于不满18岁的用户，须在其法定监护人已经阅读本声明并且许可的情况下，通过网站提交个人信息。</p>
      <p>二、个人信息的使用和分享</p>
      <p class="text-pd">您同意，先锋咖可以通过以下方式对个人信息进行使用和分享（包含对于个人信息的存储和处理）：</p>
      <p class="text-pd">1、我们和关联公司使用；</p>
      <p class="text-pd">2、我们向相关汽车经销商、厂商及集团分享并由其使用；</p>
      <p class="text-pd">我们及关联公司及相关汽车经销商、厂商为满足您的需求，可能通过您提供的信息与您联系；</p>
      <p class="text-pd">我们及关联公司及相关汽车经销商、厂商可能定期或不定期向您发送有关产品、服务或相关活动的信息，您同意接收上述信息。</p>
      <p class="text-pd">您同意免除上述个人信息的接收和/或使用方在按照本法律声明所述情形下进行信息披露和使用而导致的或可能导致的所有索赔、责任和损失。</p>
      <p>三、更正或投诉</p>
      <p class="text-pd">如果您需要查询、修改或更正您的个人信息，或对个人信息保护问题有任何疑问或投诉，您可以拨打电话180 1170 3706联系我们。</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="agreeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="agreeDialogVisible = false,check = true">确 定</el-button>
      </span>
    </el-dialog>
    <div class="adver">
      <img src="~static/images/guanggao.png"
        alt="广告图片"
        width="100%"
        height="100%">
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Utils from '@/utils/until.js'
import {
  webActivityGetCity,
  webActivityGetDict,
  webActivityGetProvince,
  webActivityGetStore,
  webActivityapplySave,
  webActivityapplyUpdate,
  webActivityInfo,
  smsSendMsgByRegister
} from '@/http/api'
import { $get, $post } from '@/http/ajax'

export default {
  name: 'order',
  components: {
    'my-header': Header,
    'my-footer': Footer
  },
  computed: {
    activeCarItem: function() {
      return this.carItem
    },
    activePlanItem: function() {
      return this.planItem
    },
    changeCodeBg: function() {
      return (
        (!this.checkPhone(0) && this.tip === '获取验证码') ||
        this.tip !== '获取验证码'
      )
    }
  },
  mounted() {
    //   console.log(this.$route)
    this.$nextTick(async () => {
      try {
        // 获取地址栏中的活动id
        // let href = window.location.href
        // console.log(href)
        // 切割地址栏
        // let arr = href.split('/')
        this.activeId = this.$route.params.id
        let result = await this.getBrandInfo(this.$route.params.id)
        console.log(result)
        if (result.brandId) {
          this.brandId = result.brandId
          // 发送获取区域请求
          let originResult = await $get(webActivityGetDict, {
            brandId: this.brandId
          })
          this.originArr = originResult.data
          this.originArr = this.originArr == null ? [] : this.originArr
        } else {
          alert('缺失brandId')
        }
      } catch (err) {
        console.log(err)
      }
    })
  },
  data() {
    return {
      origin: '', // 区域
      province: '', // 省份
      city: '', // 市级
      franchiseId: '', // 经销商id
      name: '', // 姓名
      phone: '', // 手机号
      code: '', // 验证码
      tip: '获取验证码', // 验证码按钮
      planTime: ['周末', '周一至周五'], // 试驾选项时间
      showCarTime: ['1周-1个月', '1个月-3个月', '3个月-6个月', '6个月后'], // 计划购车时间
      planItem: 0, // 选中的选项时间
      carItem: 0, // 选中的购车时间
      originArr: [], // 区域数组
      provinceArr: [], // 省份数组
      cityArr: [], // 城市数组
      shopArr: [], // 经销商数组
      activeId: '', // 活动id
      brandId: '', // 通过活动id获取到的brandId
      check: false, // 是否勾选
      agreeDialogVisible: false
    }
  },
  methods: {
    // 选项时间项点击事件
    changePlan(index) {
      this.planItem = index
    },
    // 购车时间项点击事件
    changeCarTime(index) {
      this.carItem = index
    },
    // 根据活动id获取brand信息
    async getBrandInfo(id) {
      let result = {}
      try {
        result = await $get(webActivityInfo, { id })
        if (result.data) result = result.data
      } catch (err) {
        console.log(err)
      }
      return result
    },
    // 获取省份数据（区域选项改变时获取）
    async getProvince() {
      let result = {}
      try {
        result = await $get(webActivityGetProvince, {
          brandId: this.brandId,
          dict: this.origin
        })
        if (result.data) result = result.data
      } catch (err) {
        console.log(err)
      }
      return result
    },
    // 获取城市数据（省份改变时获取）
    async getCity() {
      let result = {}
      try {
        result = await $get(webActivityGetCity, {
          brandId: this.brandId,
          province: this.province
        })
        if (result.data) result = result.data
      } catch (err) {
        console.log(err)
      }
      return result
    },
    // 获取专营店(城市改变时获取)
    async getShop() {
      let result = {}
      try {
        result = await $get(webActivityGetStore, {
          brandId: this.brandId,
          city: this.city
        })
        if (result.data) result = result.data
      } catch (err) {
        console.log(err)
      }
      return result
    },
    // 区域更改事件
    async changeOrigin() {
      try {
        let result = await this.getProvince()
        this.provinceArr = result == null ? [] : result
        this.province = ''
        this.city = ''
        this.franchiseId = ''
      } catch (err) {
        console.log(err)
      }
    },
    // 省级更改事件
    async changeProvince() {
      try {
        let result = await this.getCity()
        this.cityArr = result == null ? [] : result
        this.city = ''
        this.franchiseId = ''
      } catch (err) {
        console.log(err)
      }
    },
    // 城市更改事件
    async changeCity() {
      try {
        let result = await this.getShop()
        this.shopArr = result == null ? [] : result
        this.franchiseId = ''
      } catch (err) {
        console.log(err)
      }
    },
    // 点击获取验证码
    async getCode() {
      try {
        if (this.checkPhone(0) && this.tip === '获取验证码') {
          if (this.checkPhone(1)) {
            // 根据手机号码去发送验证码
            try {
              let result = await $get(smsSendMsgByRegister, {
                phone: this.phone
              })
              if (result.data) {
                this.tip = '60s'
                this.setTime()
              } else {
                console.log('获取验证码失败')
              }
            } catch (err) {
              console.log(err)
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 倒计时60s
    setTime() {
      if (this.tip === '0s') {
        this.tip = '获取验证码'
      } else {
        // this.tip
        let second = this.tip.split('s')[0]
        this.tip = `${second - 1}s`
        setTimeout(() => {
          this.setTime()
        }, 1000)
      }
    },
    // 提交按钮事件
    async submit() {
      try {
        let flag = this.checkIsNull()
        if (flag) {
          // 判断是否存在token
          let token = Utils.getToken() 
          if (token == '') {
            this.$message.warning('请先登录')
          } else {
            // 拼装obj
            let obj = {
              activityId: this.activeId,
              dict: this.origin,
              province: this.province,
              city: this.city,
              franchiseId: this.franchiseId,
              name: this.name,
              phone: this.phone,
              verificationCode: this.code,
              buyTime: this.planItem + 1,
              driveTime: this.carItem + 1
            }
            try {
              let result = await $post(webActivityapplySave, obj, {
                'X-Auth0-Token': token
              })
              if (result.data) {
                let data = result.data
                if (data.code != 0) {
                  this.$message.warning(`${data.des}`)
                } else {
                  this.$message.success(`预约试驾成功`)
                }
              }
            } catch (err) {
              console.log(err)
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 判断手机号是否为空
    checkPhone(type) {
      let flag = false
      if (this.phone === '') {
        if (type === '1') {
          this.$message.warning('请填写手机号')
        }

        return flag
      } else {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/ // 正则校验
        if (!reg.test(this.phone)) {
          if (type === '1') {
            this.$message.warning('手机号码格式不正确')
          }

          return flag
        }
      }
      return !flag
    },
    // 校验所有字段是否为空
    checkIsNull() {
      let flag = false
      if (this.origin === '') {
        this.$message.warning('请选择区域选项')
        return flag
      }
      if (this.province === '') {
        this.$message.warning('请选择省份选项')
        return flag
      }
      if (this.city === '') {
        this.$message.warning('请选择城市')
        return flag
      }
      if (this.franchiseId === '') {
        this.$message.warning('请选择经销商')
        return flag
      }
      if (this.name === '') {
        this.$message.warning('请填写姓名')
        return flag
      }
      if (!this.checkPhone('1')) return flag

      if (this.code === '') {
        this.$message.warning('请填写验证码')
        return flag
      }

      if (!this.check) {
        this.$message.warning('请勾选同意条款')
        return flag
      }

      return !flag
    },
    showAgree() {
      this.agreeDialogVisible = true
    }
  }
}
</script>
<style>

.order {
  background-color: rgb(245, 245, 245);
  position: relative;
}

.order .order_bottom {
  position: absolute;
  bottom: 40px;
}

.order .order_bg{
  height: 490px;
}

.order .order_form {
  display: flex;
  justify-content: center;
}

.order .order_form .order_form_content {
  width: 1200px;
}

.order .order_form .order_form_content .form_title {
  color: #000;
  font-size: 14px;
}
.red_point {
  color: red;
}

.order .order_form .order_form_content .form {
  margin-top: 20px;
  height: 748px;
  box-sizing: border-box;
  padding: 40px;
  background-color: #fff;
}

.first .el-input__inner {
  width: 175px;
  height: 50px;
  border-radius: 0px;
}

.second .el-input__inner {
  width: 380px;
  height: 50px;
  border-radius: 0px;
}

.third .el-input__inner {
  width: 380px;
  height: 50px;
  border-radius: 0px;
  padding-right: 140px;
}

.codeBg {
  background: url('~static/images/canClick.png') no-repeat;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 140px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  cursor: pointer;
}

.order .mR20 {
  margin-right: 20px;
}

.order .mL20 {
  margin-left: 20px;
}

.order .mT30 {
  margin-top: 30px;
}

.order .order_input .el-input {
  width: 380px;
} 

.order .form_time {
  margin-top: 50px;
}

.order .form_time .time_title {
  font-size: 24px;
}


.planTime .planTime_group {
  display: inline;
}

.order .normal {
  display: inline-block;
  width: 110px;
  height: 42px;
  font-size: 14px;
  box-sizing: border-box;
  line-height: 38px;
  text-align: center;
  border:2px solid rgba(231, 231, 231, 1);
  margin-left: 30px;
  cursor: pointer;
}

.order .normal:hover {
  border: 2px solid #BE001E;
  background: url('~static/images/index.png') no-repeat;
  background-position: 95px 27px;
}

.order .active {
  border: 2px solid #BE001E;
  background: url('~static/images/index.png') no-repeat;
  background-position: 95px 27px;
}

.select_container input[type="checkbox"]{
  display: inline-block;
  width: 20px;
  height: 20px;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid #CCC;
  outline: none;
}

.select_container input[type="checkbox"]:checked {
  background: url('~static/images/checked.png') no-repeat;
  border: none;
}

.btn_submit {
  width: 150px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  color: #fff;
  text-align: center;
  background: url("~static/images/btn_bg.png") no-repeat;
}

.order_container .adver {
  width: 1200px;
  height: 200px;
  margin: 20px auto;
}

.forbidden {
  cursor: not-allowed;
  background: url("~static/images/codeBg.png") no-repeat;
}
.text-pd {
  padding-left: 50px;
} 
</style>
