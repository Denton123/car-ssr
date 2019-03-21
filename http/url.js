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
    url = url.replace(/\/\//ig, '/');
    /*   return baseArticle + url */
    return url
  }
}

export default systemManage
