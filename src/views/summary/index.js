import { createApp } from 'vue'
import App from './index.vue'
import store from '@/store/index.js'
import '@/assets/styles/base.scss'
import '@/assets/styles/animate.scss'
var instance = createApp(App)
  .use(store)
  .mount('#container')
window.getProgress = function(...args) {
  return App.methods.getProgress.apply(instance, args)
}
window.completeProgress = function() {
  App.methods.completeProgress.apply(instance)
}

window.showScreens = function() {
  App.methods.showScreens.apply(instance)
}
