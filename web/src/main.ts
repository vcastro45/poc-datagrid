import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
// import 'vuetify/src/styles/main.sass'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.config.productionTip = false

const opts = {
  icons: {
    iconfont: 'mdi'
  }
}

Vue.use(Vuetify)
new Vue({
  vuetify: new Vuetify(opts),
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
