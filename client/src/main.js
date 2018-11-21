import Vue from 'vue'
import App from './App.vue'
// import App from './Test.vue'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:9000',
}))

new Vue({
  render: h => h(App),
}).$mount('#app')
