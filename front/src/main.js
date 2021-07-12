import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/router';
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line

Vue.use(VueClipboard);

Vue.config.productionTip = false
Vue.use(vuetify);

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
