import Vue from 'vue'

export default () => {
  if (process.browser) {
    const vueCropper = require('vue-cropper')
    Vue.use(vueCropper.default)
  }
}
