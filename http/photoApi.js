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
    let commonUrl = until.commonUrl
    /*   return baseArticle + url */
    if (url && url.indexOf("http") == 0) {
      return url;
    }

    if (url && (url.indexOf('image') == 0 || url.indexOf('/image') == 0)) {
      return url;
    }
    if (url && url.indexOf('/') != 0) {
      url = '/' + url
    }

    url = commonUrl + url
    url = url && url.replace(/http:\/\/m.jfcar.com.cn\/image\/image/ig, 'http://m.jfcar.com.cn/image')
    url = url && url.replace(/http:\/\/www.jfcar.com.cn\/image\/image/ig, 'http://www.jfcar.com.cn/image')
    url = url && url.replace(/http:\/\/165.qiweioa.cn\/m\/image\/image/ig, 'http://165.qiweioa.cn/m/image')

    /*   return baseArticle + url */
    return url
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
