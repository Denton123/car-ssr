export default function ({
  env,
  req,
  isDev
}) {
  env.userToken='888888'
  // console.log(localStorage)
  if(process.client){

    env.userToken='hhhhhhhhhhhhh'
    console.log(22, localStorage)
    env.commonUrl = `http://www.jfcar.com.cn/image/`
    env.commonFileUrl = `http://www.jfcar.com.cn/`
  }
  if (!isDev && req && req.headers && !env.isGetHost) {
    const {
      host
    } = req.headers
    env.userToken='aaaaaaaaaaaaaaaaaaa'
    env.isGetHost = true
    env.commonUrl = `http://${host}/image/`
    env.commonFileUrl = `http://${host}`
    env.baseURL = `http://${host}/`
    env.userToken=''
  }
  //   console.log(1111, env)
}
