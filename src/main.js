import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

//给$bus一个Vue实例，可以用到Vue里所有继承的方法
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,

}).$mount('#app')
