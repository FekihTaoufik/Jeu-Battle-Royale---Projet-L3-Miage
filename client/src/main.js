import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'
document.socket = io(document.URL.includes('localhost')?'http://localhost:9000':document.URL)
import _ from 'lodash';    
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
