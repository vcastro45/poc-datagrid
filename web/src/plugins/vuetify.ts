import Vue from 'vue'
import Vuetify from 'vuetify'
// import 'vuetify/src/styles/main.sass'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdi'
  }
}

export default new Vuetify(opts)
