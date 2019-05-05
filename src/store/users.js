import axios from 'axios'

const state = {
    role: []
}

const mutations = {
    saveRole(state, data) {
        let arrayRole = []
        data.forEach((dataRole) => {
			arrayRole.push(dataRole.name)
		})
        state.role = arrayRole
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
    }
}

const getters = {
    isRole (state) {
        return state.role
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
