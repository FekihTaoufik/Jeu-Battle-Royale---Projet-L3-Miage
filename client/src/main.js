import Vue from 'vue'
import App from './App.vue'

import io from 'socket.io-client';

document.socket = io('http://localhost:9000');

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
