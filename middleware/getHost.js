export default function ({
  env,
  req,
  isDev
}) {
  if (!isDev) {
    const {
      host
    } = req.headers
    env.commonUrl = `http://${host}/image/`
    env.commonFileUrl = `http://${host}`
  }
  //   console.log(1111, env)
}
