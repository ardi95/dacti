import axios from 'axios'
import router from '../router'

const state = {
    errorResultUser: false,
    successResultUser: false,
    errorMessageUser: [],
    role: [],
    breadcumbUsers: []
}

const mutations = {
    saveRole(state, data) {
        state.role = data
    },
    mutationOpenErrorUser(state, data) {
        state.errorMessageUser = data
        state.errorResultUser = true
        state.successResultUser = false
    },
    mutationOpenSuccessUser(state) {
        state.successResultUser = true
        state.errorResultUser = false
    },
    mutationCloseErrorUser(state) {
        state.errorResultUser = false
    },
    mutationCloseSuccessUser(state) {
        state.successResultUser = false
    },
    mutationCreateBreadcumbUsers(state) {
        if (router.currentRoute.name == 'userEdit') {
            let arrBreadcumbs = []
            arrBreadcumbs = router.currentRoute.meta.breadcrumbs

            let dataid = {
                text: router.currentRoute.params.id,
                disabled: true,
                href: '/users/edit/'
            }

            arrBreadcumbs.push(dataid)

            state.breadcumbUsers = arrBreadcumbs
        }
        else {
            state.breadcumbUsers = router.currentRoute.meta.breadcrumbs
        }
    }
}

const actions = {
    getRole ({commit}) {
        axios.get('/users/create')
        .then(res => {
            const data = res.data
            commit('saveRole', data)
        })
        .catch(error => {

        })
    },
    openErrorUser({commit}, data) {
        commit('mutationOpenErrorUser', data)
    },
    openSuccessUser({commit}) {
        commit('mutationOpenSuccessUser')

    },
    closeErrorUser({commit}) {
        commit('mutationCloseErrorUser')
    },
    closeSuccessUser({commit}) {
        commit('mutationCloseSuccessUser')
    },
    createBreadcumbUsers({commit}) {
        commit('mutationCreateBreadcumbUsers')
    }
}

const getters = {
    isRole (state) {
        return state.role
    },
    errorResultUser(state) {
        return state.errorResultUser
    },
    successResultUser(state) {
        return state.successResultUser
    },
    errorMessageUser(state) {
        return state.errorMessageUser
    },
    breadcumbUsers(state) {
        // console.log('tes');
        return state.breadcumbUsers
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
