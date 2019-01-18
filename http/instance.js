import axios from 'axios'

console.log(process.env.NODE_ENV)
console.log('ssssssssssssssssssss')

// let baseDomain
// if (process.env.NODE_ENV === 'development') {
//   baseDomain = 'http://123.207.11.165/api'
// } else {
//   baseDomain = `http://${window.location.host}/api`
// }

export const instance = axios.create({
  // baseURL: `http://${window.location.host}/api`,
  // baseURL: process.env.baseURL,
  // baseURL: 'http://10.10.3.60:8080/',
  // baseURL: "http://10.10.2.201:8080/",
  // baseURL: 'http://172.31.162.93:8080/',
  // baseURL: 'http://10.10.3.147:8080/',
  // baseURL: 'http://10.10.0.184:8080/',
  // baseURL: 'http://172.20.13.180:8080/',
  // baseURL: 'http://10.10.0.184:8080/',
  // baseURL: 'http://www.jfcar.com.cn/api/',
  baseURL: 'http://165.qiweioa.cn/api',
  timeout: 60000
})

// 添加请求拦截器
instance.interceptors.request.use(
  // function(config) {
  //   let localUser
  //   if (process.client) {
  //     localUser = localStorage.getItem('userMsg') && JSON.parse(localStorage.getItem('userMsg')) !== '' ? JSON.parse(localStorage.getItem('userMsg')).token : ''
  //   }
  //   console.log(localUser, 'localUser')
  //     const token = process.client ? (getCookie('token') !== '' ? getCookie('token') : localUser) : ''
  //     config.headers["X-Auth0-Token"] = token
  //   // 在发送请求之前做些什么
  //   return config
  // },
  function(config) {
    let localUser
      let cookie = config.headers['X-Auth0-Token'] || ''
      const token = process.client ? (getCookie('token') !== '' ? getCookie('token') : getCookie('user')) : cookie
      config.headers["X-Auth0-Token"] = token
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response
  },

  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}