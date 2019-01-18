import Vue from 'vue'

export default () => {
  if (process.client) {
    const vueCropper = require('vue-cropper')
    Vue.use(vueCropper.default)
  }
}