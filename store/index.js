import Vue from 'vue'
import Vuex from 'vuex'
// import * as func from './function.js'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        // userMsg: func.userLocal.getLocalStorage() ? func.userLocal.getLocalStorage() : func.cookieLocal.getCookie(),
        userMsg: null
    },
    mutations: {
        setUserMsg(state, msg){
            state.userMsg = msg
        }
    },
})

export default store