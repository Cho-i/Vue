import Vue from 'vue'
import VueDraggable from 'vue-draggable'
import App from './App.vue'

Vue.use(VueDraggable)

new Vue({
  el: '#app',
  render: h => h(App)
}).$mount("#app");
