import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.use(Vuelidate)

Vue.config.productionTip = false
// axios.defaults.baseURL = 'https://apiportfolio2.aranproduk.com/api'
axios.defaults.baseURL = 'http://localhost:8000/api'

axios.interceptors.request.use(config => {
    config.headers.common['Authorization'] = $cookies.get("token");
    return config;
});

// axios.interceptors.response.use(res => {
//     console.log('Response Interceptor', res)
//     return res
// }, error => {
//     console.log(error.response);
//     return error
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
