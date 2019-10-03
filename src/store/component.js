import axios from 'axios'
import router from '../router'

const state = {
    title: null,
    breadcrumbs: []
}

const mutations = {
    mutationCreateTitle(state) {
        state.title = router.currentRoute.matched[0].meta.title
    },
    mutationCreateBreadcrumb(state) {
        state.breadcrumbs = router.history.current.meta.breadcrumbs
        if (router.currentRoute.meta.breadcumbDynamic  == true) {
            let idDynamic = null
            idDynamic = {
                text: router.currentRoute.params.id,
                disabled: true,
                href: '/users/edit/'
            }
            state.breadcrumbs.splice(2, 1, idDynamic);
        }
    }
}

const actions = {
    createTitle({commit}) {
        if (router.currentRoute.matched[0].meta.showTitle) {
            commit('mutationCreateTitle')
        }
    },
    createBreadcrumb({commit}) {
        if (router.currentRoute.meta.showBreadcrumbs) {
            commit('mutationCreateBreadcrumb')
        }
    }
}

const getters = {
    title(state) {
        return state.title
    },
    breadcrumbs(state) {
        return state.breadcrumbs
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
