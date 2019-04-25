import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueCookies from 'vue-cookies'

import store from './store'

Vue.use(Router)

export default new Router({
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
                store.dispatch('checkToken').then(response => {
                    if (response == 'success') {
                        next('/home')
                    }
                    else {
                        next()
                    }
                }, error => {
                    next()
                })
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

                store.dispatch('checkToken').then(response => {
                    if (response == 'success') {
                        next()
                    }
                    else {
                        next('/')
                    }
                }, error => {
                    // console.log('masuk bawah');
                    next('/')
                })
            }
        },
        {
            path: '/users',
            components: {
                default: () => import('./views/users/Main.vue'),
                'header': () => import('./components/Header.vue'),
                'footer': () => import('./components/Footer.vue')
            },
            children: [
                {
                    path: '',
                    meta: {
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
                        store.dispatch('checkToken').then(response => {
                            if (response == 'success') {
                                next()
                            }
                            else {
                                next('/')
                            }
                        }, error => {
                            next('/')
                        })
                    }
                },
                {
                    path: 'create',
                    meta: {
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
                        store.dispatch('checkToken').then(response => {
                            if (response == 'success') {
                                next()
                            }
                            else {
                                next('/')
                            }
                        }, error => {
                            next('/')
                        })
                    }
                }
            ]
        }
    ]
})
