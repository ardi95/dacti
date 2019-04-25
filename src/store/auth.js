import axios from 'axios'
import VueCookies from 'vue-cookies'

import router from '../router'

const state = {
    errorResult: false,
    errorMessage: null,
    token: null
}

const mutations = {
    processToken(state, data) {
        state.token = 'Bearer ' + data.token
        $cookies.set("token",'Bearer ' + data.token,"50MIN")
        router.push('/home')
    },
    processError(state, data) {
        state.errorResult = true
        state.errorMessage = data.errors
    },
    clearAuthData(state) {
        $cookies.remove("token")
        state.token = null
        router.replace('/')
    }
}

const actions = {
    login({commit}, data) {
        axios.post('/login',
        {
            email: data.username,
            password: data.password
        })
        .then(res => {
            commit('processToken', {
                token: res.data.token
            })
            // console.log(res);
        })
        .catch(error => {
            const dataError = error.response.data
            commit('processError', dataError)
        })
    },
    closeError({commit}) {
        state.errorResult = false
    },
    reloadPage({commit}) {
        const token = $cookies.get("token")
        if (!token) {
            return
        }
        axios.get('/check-token')
        .then(res => state.token = token)
        .catch(error => {
            commit('clearAuthData')
            // console.log(error.response);
        })
    },
    checkToken() {
        return axios.get('/check-token')
        .then(res => {
            return 'success'
        })
        .catch(error => {
            return 'failed'
            // console.log(error.response);
        })
    },
    checkToken2(context, data) {
        return axios.get('/check-token')
        .then(res => {
            return 'success 2'
        })
        .catch(error => {
            return 'failed 2'
        })
    },
    logout({commit}) {
        axios.post('/logout')
        .then(res => {
            commit('clearAuthData')
        })
        .catch(error => {
            commit('clearAuthData')
        })
    }
}

const getters =  {
    isAuthenticated(state) {
        return state.token
    },
    errorResult(state) {
        return state.errorResult
    },
    errorMessage(state) {
        return state.errorMessage
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
