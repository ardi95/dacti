import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueCookies from 'vue-cookies'

import store from './store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            components: {
                default: () => import('./views/Login.vue'),
                'header': () => import('./components/HeaderLogin.vue'),
                'footer': () => import('./components/Footer.vue')
            },
            beforeEnter(to, from, next) {
                const token = $cookies.get("token")
                if (!token) {
                    next()
                } else {
                    next('/home')
                }
                // store.dispatch('checkToken').then(response => {
                //     if (response == 'success') {
                //         console.log('masuk sini');
                //         next('/home')
                //     }
                //     else {
                //         next()
                //     }
                // }, error => {
                //     next()
                // })
            }
        },
        {
            path: '/home',
            name: 'home',
            components: {
                default: () => import('./views/Home.vue'),
                'header': () => import('./components/Header.vue'),
                'footer': () => import('./components/Footer.vue')
            },
            beforeEnter(to, from, next) {
                // console.log('ini router');
                const token = $cookies.get("token")
                if (!token) {
                    next('/')
                } else {
                    next()
                }
                // store.dispatch('checkToken').then(response => {
                //     console.log(response);
                //     if (response == 'success') {
                //         next()
                //     }
                //     else {
                //         next('/')
                //     }
                // }, error => {
                //     next('/')
                // })
                // next()
            }
        },
        {
            path: '/users',
            meta: {
                showTitle: true,
                title: 'Users'
            },
            components: {
                default: () => import('./components/Main.vue'),
                'header': () => import('./components/Header.vue'),
                'footer': () => import('./components/Footer.vue')
            },
            children: [
                {
                    path: '',
                    meta: {
                        showBreadcrumbs: true,
                        breadcrumbs: [
                            {
                                text: 'Users',
                                disabled: true,
                                href: 'users'
                            }
                        ]
                    },
                    component: () => import('./views/users/Index.vue'),
                    beforeEnter(to, from, next) {
                        const token = $cookies.get("token")
                        if (!token) {
                            next('/')
                        } else {
                            next()
                        }
                        // store.dispatch('checkToken').then(response => {
                        //     if (response == 'success') {
                        //         next()
                        //     }
                        //     else {
                        //         next('/')
                        //     }
                        // }, error => {
                        //     next('/')
                        // })
                        // next()
                    }
                },
                {
                    path: 'create',
                    meta: {
                        showBreadcrumbs: true,
                        breadcrumbs: [
                            {
                                text: 'Users',
                                disabled: false,
                                href: '/users'
                            },
                            {
                                text: 'Create',
                                disabled: true,
                                href: '/users/create'
                            }
                        ]
                    },
                    component: () => import('./views/users/Create.vue'),
                    beforeEnter(to, from, next) {
                        const token = $cookies.get("token")
                        if (!token) {
                            next('/')
                        } else {
                            next()
                        }
                        // store.dispatch('checkToken').then(response => {
                        //     if (response == 'success') {
                        //         next()
                        //     }
                        //     else {
                        //         next('/')
                        //     }
                        // }, error => {
                        //     next('/')
                        // })
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'userEdit',
                    meta: {
                        breadcumbDynamic: true,
                        showBreadcrumbs: true,
                        breadcrumbs: [
                            {
                                text: 'Users',
                                disabled: false,
                                href: '/users'
                            },
                            {
                                text: 'Edit',
                                disabled: true,
                                href: '/users/edit/'
                            }
                        ]
                    },
                    component: () => import('./views/users/Edit.vue'),
                    beforeEnter(to, from, next) {
                        const token = $cookies.get("token")
                        if (!token) {
                            next('/')
                        } else {
                            next()
                        }
                        // store.dispatch('checkToken').then(response => {
                        //     if (response == 'success') {
                        //         next()
                        //     }
                        //     else {
                        //         next('/')
                        //     }
                        // }, error => {
                        //     next('/')
                        // })
                    }
                }
            ]
        }
    ]
})

router.afterEach((to, from) => {
    store.dispatch('createTitle')
    store.dispatch('createBreadcrumb')
})

export default router
