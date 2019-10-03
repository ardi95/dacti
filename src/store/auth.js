import axios from 'axios'
import VueCookies from 'vue-cookies'

import router from '../router'

const state = {
    errorResult: false,
    errorMessage: null,
    token: null,
    nameUser: null,
    urlImgProfile: null,
    roleAdmin: false
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
        state.roleAdmin = false
        state.nameUser = null
        state.urlImgProfile = null
        router.replace('/')
    },
    processDetailUser(state, user) {
        state.nameUser = user.name
        state.urlImgProfile = user.photo
    },
    processRole(state, roles) {
        let forRole = roles.map(role => {
            if (role == 1) {
                state.roleAdmin = true
            }
        });
    }
}

const actions = {
    login({commit, dispatch}, data) {
        axios.post('/login',
        {
            email: data.username,
            password: data.password
        })
        .then(res => {
            commit('processToken', {
                token: res.data.token
            })
            dispatch('updateDetailUser')
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
    checkToken3 () {
        const pathname = window.location.pathname
        axios.get('/check-token')
        .then(res => {
            if (pathname == '/') {
                router.replace('/home')
            }
        })
        .catch(error => {
            if (pathname != '/') {
                router.replace('/')
            }
            // console.log(error.response);
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
    },
    updateDetailUser({commit}) {
        axios.get('/detail-user')
        .then(res => {
            commit('processDetailUser', res.data.user)
            commit('processRole', res.data.role)
        })
        .catch(error => {
            console.log(error.response);
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
    isNameUser(state) {
        return state.nameUser
    },
    isUrlImgProfile(state) {
        return state.urlImgProfile
    },
    isRoleAdmin(state) {
        return state.roleAdmin
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
