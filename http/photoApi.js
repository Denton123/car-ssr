/**
 * 系统管理接口
 * @type {{ login: ((params?)) }}
 */

// 引入拦截器
// import Ajax from '@/utils/fetch'
// 引入公共JS
import until from '@/utils/until'
const systemManage = {
  /**
   * 文章图片获取地址拼接
   */
  getApi(url) {
    /*   return baseArticle + url */
    return until.commonUrl + url
  },
  /**
   * 文章图片上传地址拼接
   */
  getFileApi(url) {
    /*   return baseArticle + url */
    return until.commonFileUrl + url
  }
}

export default systemManage
