export default function ({
  env,
  req,
  isDev
}) {
  if (!isDev && req.headers) {
    const {
      host
    } = req.headers
    env.commonUrl = `http://${host}/image/`
    env.commonFileUrl = `http://${host}`
    env.baseURL = `http://${host}/`
  }
  //   console.log(1111, env)
}
