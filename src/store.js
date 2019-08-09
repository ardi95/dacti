import Vue from 'vue'
import Vuex from 'vuex'
import auth from './store/auth'
import users from './store/users'
import component from './store/component'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        users,
        component
    }
})
