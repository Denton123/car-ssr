import * as func from '@/store/function.js'
export default function ({
    store
  }) {
    // console.log(localStorage)
    if(process.client){
      let msg = func.userLocal.getLocalStorage() ? func.userLocal.getLocalStorage() : func.cookieLocal.getCookie()
      store.commit('setUserMsg', msg)
    }
    //   console.log(1111, env)
  }
  