<template>
  <div class="pagination">
    <div class="prevBtn"
      @click="toPrev"
      @mouseover="addPrevClass"
      @mouseleave="removePrevClass"
      :class="prevDisabled == true ?  'btnDisabled':''">
      <span>上一页</span>
    </div>
    <el-pagination background
      layout="pager"
      :total="totalCount"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage">
    </el-pagination>
    <div class="nextBtn"
      @click="toNext"
      @mouseover="addNextClass"
      @mouseleave="removeNextClass"
      :class=" nextDisabled == true ? 'btnDisabled' :''">
      <span>下一页</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data: function() {
    return {
      currentPage: 1,
      btnPrevClass: false,
      btnNextClass: false,
      prevDisabled: false,
      nextDisabled: false
    }
  },
  mounted() {
    this.currentPage = parseInt(this.routePage)
  },
  props: {
    routePage: {
      type: String,
      default: '1'
    },
    totalCount: {
      type: Number,
      default: 12
    },
    pageSize: {
      type: Number,
      default: 12
    },
    totalPage: {
      type: Number,
      default: 2
    },
    // 上下一页时指定回退页面的高度
    toTop: {
      default: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    toPrev: function() {
      if (this.currentPage <= 1) {
        return
      }
      window.scrollTo(this.toTop.x, this.toTop.y)
      this.currentPage = this.currentPage - 1
    },
    toNext: function() {
      if (this.currentPage >= this.totalPage) {
        return
      }
      window.scrollTo(this.toTop.x, this.toTop.y)
      this.currentPage = this.currentPage + 1
    },
    addPrevClass: function() {
      if (this.currentPage <= 1) {
        this.prevDisabled = true
      } else {
        this.prevDisabled = false
      }
      this.btnPrevClass = true
    },
    removePrevClass: function() {
      if (this.currentPage > 1) {
        this.prevDisabled = false
      } else {
        this.prevDisabled = true
      }
      this.btnPrevClass = false
    },
    addNextClass: function() {
      if (this.currentPage >= this.totalCount / this.pageSize) {
        this.nextDisabled = true
      } else {
        this.nextDisabled = false
      }
      this.btnNextClass = true
    },
    removeNextClass: function() {
      if (this.currentPage < this.totalCount / this.pageSize) {
        this.nextDisabled = false
      } else {
        this.nextDisabled = true
      }
      this.btnNextClass = false
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      window.scrollTo(this.toTop.x, this.toTop.y)
    },
    resertCurrentPage() {
      this.currentPage = 1
    },
    routLinkCurrentPage() {
      this.currentPage = parseInt(this.routePage)
    }
  },
  watch: {
    currentPage: {
      handler(newPage, oldPage) {
        this.$emit('pageChange', newPage)
      }
    },
    // 因为是服务端渲染，所以要使用监控routePage的方法
    routePage:{
      handler(newRoutePage, oldRoutePage) {
        this.currentPage = parseInt(newRoutePage)
      }
    }
  },
  components: {
  }
}
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
}

.pagination .el-pager li {
  text-align: center;
  width: 42px;
  height: 42px;
  padding: 0;
  line-height: 42px;
  background: white !important;
  margin-right: 11px !important;
  margin-left: 0 !important;
  box-shadow: 0px 3px 0px 0px rgba(228, 228, 228, 1);
}

.pagination .el-pager li:nth-last-of-type(1) {
  margin-right: 26px !important;
}

.pagination .el-pager li::before {
  line-height: 42px;
}

.pagination .btn-prev,
.pagination .btn-next {
  width: 82px;
  text-align: center;
  height: 43px;
  margin-right: 26px !important;
  margin-left: 0 !important;
  box-shadow: 0px 3px 0px 0px rgba(228, 228, 228, 1);
}

.pagination .prevBtn,
.pagination .btn-prev,
.pagination .nextBtn {
  box-sizing: border-box;
  border: 1px solid rgba(228, 228, 228, 0.3);
  box-shadow: 0px 3px 0px 0px rgba(228, 228, 228, 1);
}

/* 上下一页，鼠标移入移出的效果 */
.pagination .prevBtn:hover,
.pagination .number:hover,
.pagination .nextBtn:hover {
  background-color: #121212 !important;
  box-shadow: 0px 3px 0px 0px #bd081e;
  color: white !important;
}

/* 禁用状态的样式 */
.pagination .btnDisabled:hover {
  cursor: not-allowed;
}
.pagination .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #121212 !important;
  box-shadow: 0px 3px 0px 0px #bd081e !important;
}

.pagination .btn-prev span,
.pagination .btn-next span {
  width: 41px;
  height: 13px;
  font-size: 14px;
  font-weight: 400;
  color: black;
}

.pagination .el-pagination.is-background .btn-prev span {
  color: white;
}

.pagination .prevBtn,
.pagination .nextBtn {
  width: 82px;
  height: 43px;
  position: relative;
  cursor: pointer;
  margin: 0 5px;
  background: white;
  color: #606266;
  border-radius: 2px;
  text-align: center;
  line-height: 43px;
}

.pagination .prevBtn {
  margin-right: 26px;
}
.pagination .nextBtn span,
.pagination .prevBtn span {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
