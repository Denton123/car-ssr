import Vue from 'vue'

export default () => {
  if (process.browser) {
    const VueAwesomeSwiper = require('vue-awesome-swiper')
    Vue.use(VueAwesomeSwiper)
  }
}
