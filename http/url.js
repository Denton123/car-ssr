/**
 * 系统管理接口
 * @type {{ login: ((params?)) }}
 */

// 引入拦截器
// import Ajax from '@/http/instance'
// 引入公共JS
import until from '@/utils/until'

// ------------------单体
const systemManage = {
  /**
   * 文章图片地址拼接
   */
  getApi(url) {
    /* return baseArticle + url */
    return until.commonUrl + url
  }
}

export default systemManage
