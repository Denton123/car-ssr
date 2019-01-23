<template>
  <div class="person-my-intergral">
    <div class="intergral-head">
    <p class="intergral-count"><i class="head-right-icon"/>共<span class="intergral-red-number">{{userInterList&&userInterList.totalCount}}</span>积分</p>
      <button class="show-intergral-rules" @click="showIntergral">积分规则</button>
    </div>
    <div class="intergral-content-wrapper">
      <div  class="intergral-content">
        <ul class="intergral-content-ul">
            <li class="intergral-content-head">
              <span class="intergral-des intergral-des-left">积分来源</span>
              <span class="intergral-des intergral-des-center">积分获取时间</span>
              <span class="intergral-des intergral-des-right">获得积分</span>
            </li>
            <li v-for="(intergral, index) in userInterList&&userInterList.list" :key="index" class="intergral-content-li">
               <span class="intergral-des intergral-des-left">{{intergral.integralName}}</span>
              <span class="intergral-des intergral-des-center">{{intergral.createTime}}</span>
              <span class="intergral-des intergral-des-right">+{{intergral.integralValue}}</span>
            </li>
        </ul>
      </div>
      <div class="pagination">
        <el-pagination v-if="userInterList&&userInterList.totalCount"
          background
          :current-page="userInterList&&userInterList.currPage"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :page-count="userInterList&&userInterList.totalPage"
          :page-size="userInterList&&userInterList.pageSize"
          :total="userInterList&&userInterList.totalCount">
        </el-pagination>
        <!-- <div class="pagination">
          <div class="el-pagination is-background">
            <button type="button" class="btn-prev" disabled="disabled">
              <span>上一页</span>
            </button>
              <ul class="el-pager">
                <li class="number active">1</li>
                <li class="number">2</li>
                </ul>
                <button type="button" class="btn-next"><span>下一页</span></button>
                </div>
                </div> -->
      </div>
      <div>
      </div>
    </div>
    <div>
    </div>
    <div class="intergralList-mask" v-if="showHide">
      <div class="intergral-rules-list">
        <span class="hide-intergralList-icon" @click="hideIntergralMask"></span>
        <div class="intergralHead">积分规则</div>
        <div>
         <el-table
            :data="userRulesList"
            stripe
            >
            <el-table-column
              prop="des"
              label="积分名称"
              width="150"
              >
            </el-table-column>
            <el-table-column
              prop="limitTimes"
              label="周期范围"
              width="115">
            </el-table-column>
            <el-table-column
              prop="dayTimes"
              label="次数限制"
              width="115">
            </el-table-column>
              <el-table-column
              class="intergralName"
              prop="integralValue"
              label="咖值"
              width="115">
            </el-table-column>
            <el-table-column
              prop="monthTimes"
              label="每天封顶"
              width="115">
            </el-table-column>
            <el-table-column
              prop="times"
              label="每月最大值"
              min-width>
            </el-table-column>
        </el-table>
        </div>
        </div>
    </div>
  </div>
</template>
<script>
import {$get} from '@/http/ajax'
const getUserInterListRules = '/web/integral/list' // 获取积分规则
const getUserInterList = '/web/user/integralLog' //　获取积分记录
export default {
  data() {
    return {
      defaultParams: {
        limit: 10,
        page: 1
      },
      userInterList: {
        type: Object,
        default() {
          return {}
        }
      },
      userInterRulesList: {
        type: Object,
        default() {
          return {}
        }
      },
      showHide: false
    }
  },
  async mounted() {
    let page = sessionStorage.getItem('personIndexPage')
    if(page) {
      this.defaultParams.page = page
    }
    // 获取积分列表方法
    this.getInterList()
     let result = await $get(getUserInterListRules, {limit: '100', page: '1'})
      console.log('result.data', result.data.page.list) 
      this.userInterRulesList = result.data.page
  },
  computed: {
    userRulesList() {
      if( this.userInterRulesList &&  this.userInterRulesList.list != ''){
          let result =  this.userInterRulesList.list.map(item => {
            // 周期范围
            if(item.dayTimes === 0) {
              item.limitTimes = '一次性'
            } else {
              if(item.dayTimes >= 99999999) {
                item.limitTimes = '不限'
              } else {
                item.limitTimes = '每天'
              }
            }
            let times = item.dayTimes * item.monthTimes * item.integralValue
            // 次数限制
            if(times >= 99999999) {
              times = '不限'
            }else if(times === '0'){
              times = '一次性'
            }
            item.times = times
            // 咖值
            item.integralValue = '+' + item.integralValue
            if(item.monthTimes >= 99999999) {
              item.monthTimes = '不限'
            }
            if(item.dayTimes >= 99999999) {
              item.dayTimes = '不限'
            } else if(item.dayTimes === 0) {
              item.dayTimes = 1
              item.times = item.monthTimes = item.integralValue.slice(1)
            }
          return item
          })
          return result
      }
    }
  },
  methods:{
    handleCurrentChange(val) {
      sessionStorage.setItem('personIndexPage', val)
      this.defaultParams.page = val
      this.getInterList()
    },
    // 获取积分列规则
    async getInterList () {
      let userIntergralList = await $get(getUserInterList, this.defaultParams)
      this.userInterList = userIntergralList.data.page
      console.log('userInterList', this.userInterList)
    },
    async showIntergral() {     
      this.showHide = true
    },
    hideIntergralMask() {
      this.showHide =false
    }
  }
}
</script>
<style lang="less">
.person-my-intergral {
  .intergral-head {
    padding-top: 36px;
    min-height: 44px;
    .intergral-count {
      float: left;
      font-size:26px;
      font-weight:bold;
      color:rgba(18,18,18,1);
      vertical-align: top;
      .head-right-icon {
        display: inline-block;
        margin-right: 11px;
        width:8px;
        height:27px; 
        vertical-align: -5px;
        background: url('~assets/images/tagList_nav.png') center no-repeat;
      }
      .intergral-red-number {
        color: #be001e;
      }
    }
     .show-intergral-rules {
        float: right;
        width: 131px;
        height: 40px;
        color: #fff;
        border: none;
        cursor: pointer;
        background: url('~assets/images/intergral-rules-icon.png') center no-repeat;
      }
      &:after {
        content: '';
        display: inline-block;
        clear: both;
    }
  }
  .intergral-content-wrapper {
    margin-top: 25px;
    padding: 30px 41px 0 39px;
    background-color: #fff;
    min-height: 150px;
    .intergral-content {
      .intergral-content-ul{
        text-align: center;
        .intergral-content-head {
          margin-bottom: 20px;
          height: 40px;
          line-height: 40px;
          font-size:16px;
          color:rgba(91,91,91,1);
          background:rgba(246,246,246,1);
           .intergral-des-right{
           float: right;
           width: 320px;
           text-align: right;
          }
          .intergral-des-center{
            font-size: 16px;
        }
        }
        .intergral-content-li {
          height: 80px;
          border-top: 1px solid #ccc;
          line-height: 80px;
          overflow: hidden;
          font-size:18px;
          font-weight:500;
          color:rgba(18,18,18,1);
          .intergral-des-right{
           float: right;
           width: 320px;
           text-align: right;
           font-size:24px;
           font-weight:500;
           color:rgba(190,0,30,1);
        }
        }
        .intergral-des {
          padding:  0 10px;
          width: 400px;
        }
        .intergral-des-left{
          float: left;
          width: 400px;
          text-align: left;
        }
        .intergral-des-center{
          display: inline-block;
          text-align: left;
          width: 330px;
          font-size:18px;
          font-weight:400;
          color:rgba(91,91,91,1);
        }
      }
    }
  }
  .pagination {
    .btn-prev,
    .btn-next {
      width: 80px;
      height: 40px;
      background: rgba(255, 255, 255, 1) !important;
      box-shadow: 0px 3px 0px 0px rgba(228, 228, 228, 1) !important;
      color: #000 !important;
      span {
        color: #000 !important;
      }
    }
  .btn-prev:hover,
  .btn-next:hover {
    background: #000 !important;
    box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
    span {
      color: #fff !important;
    }
  }
  .el-pagination {
    margin: 30px auto;
    text-align: center;
  }
  .el-pager {
    .number,
    li.btn-quicknext,
    li.more {
      color: #000;
      width: 40px;
      height: 40px;
      line-height: 40px;
      background: rgba(255, 255, 255, 1) !important;
      box-shadow: 0px 3px 0px 0px rgb(228, 228, 228, 1) !important;
      &.active {
        background: #000 !important;
        box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
      }
      &:hover {
        color: #fff!important;
        background: #000 !important;
        box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
      }
    }
  }
  }
  .intergralList-mask {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    .intergral-rules-list {
      position: absolute;
      padding: 38px 32px 45px 32px;
      width: 772px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      .intergralHead {
        margin-bottom: 57px;
        text-align: center;
        font-size:25px;
        font-weight:500;
        color:rgba(25,25,25,1);
      }
       .hide-intergralList-icon {
        position: absolute;
        right: 43px;
        top: 52px;
        height: 15px;
        width: 15px;
        background: url('~static/images/hide-intergral-icon.png') center no-repeat;
        background-size: 100%;
        cursor: pointer;
      }
      .el-table{
        .el-table__body {
          .cell {
          font-size: 14px;
          color:rgba(18,18,18,1);
          }
          .el-table_1_column_4 {
            .cell {
              font-size:14px;
              font-weight:400;
              color:rgba(190,0,30,1);
            }
          }
        }
      }
    }
  }
}
</style>
