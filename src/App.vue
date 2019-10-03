<template>
    <div>
        <v-app id="inspire">
            <router-view name="header"></router-view>
            <transition
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut"
            mode="out-in">
                <router-view></router-view>
            </transition>
            <router-view name="footer"></router-view>
        </v-app>
    </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from './router'

export default {
    created() {
        axios.interceptors.response.use(res => {
            return res
        }, error => {
            if (error.response.status == '401') {
                $cookies.remove("token")
                router.push('/')
                return error
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        })

        let token = $cookies.get("token")
        if (token) {
            this.$store.dispatch('updateDetailUser')
        }
    }
}
</script>
