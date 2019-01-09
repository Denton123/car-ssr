export default function ({
  env,
  req,
  isDev
}) {
  // console.log(localStorage)
  if(process.client){
    console.log(22, localStorage)
  }
  if (!isDev && req.headers && !env.isGetHost) {
    const {
      host
    } = req.headers
    env.isGetHost = true
    env.commonUrl = `http://${host}/image/`
    env.commonFileUrl = `http://${host}`
    env.baseURL = `http://${host}/`
  }
  //   console.log(1111, env)
}
