/**
 * API配置文件
 */

const apiPath = '/api/' // 测试服
const apiDigital = '/api/v1/digital/' // 权限服务
const apiAuthorize = '/api/v1/authorize/' // 数据服务
const apiPortal = '/api/v1/portal/' // 门户服务
const apiSchedule = '/api/v1/schedule/' // 门户服务

/*
 * 11.27新增服务器ip
 */

console.log(process.env.commonUrl)
console.log('-------------')

// let commonUrl = process.env.commonUrl
// let commonFileUrl = process.env.commonFileUrl
let commonUrl = 'http://www.jfcar.com.cn/image/'
let commonFileUrl ='http://www.jfcar.com.cn/'


//  * 12.28新增线上服务器ip
//  */
// 服务器图片上传ip
/**
 * 二级域名
 */
const apiSlDomain = {
  default: '/'
}

/**
 *  获取token
 */
const getToken = function () {
  let result = ''
  // 读取cookie
  let cookie = document.cookie
  // 获取cookie中的token
  let cookieArr = cookie.split(';')
  for (let i = 0; i < cookieArr.length; i++) {
    let item = cookieArr[i]
    if (item.indexOf('token') !== -1) {
      result = item.split('=')[1]
      return result
    }
  }

  // 如果运行到这里，说明cookie中不存在token，则取localstorage中的值
  let localItemStr = localStorage.getItem('userMsg')
  if (localItemStr != null) {
    // 转换为json格式
    let localItem = JSON.parse(localItemStr)
    return localItem.token
  }

  // 运行到这里，说明用户没登录或者cookie已过期
  return ''
}

export default {
  apiPath,
  apiDigital,
  apiAuthorize,
  apiPortal,
  apiSchedule,
  commonUrl,
  commonFileUrl,
  getToken
}
