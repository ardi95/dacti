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
export default {
    created() {
        this.$store.dispatch('reloadPage')
        // this.$store.dispatch('checkToken3')
    },
    updated() {
        // this.$store.dispatch('checkToken3')
    }
}
</script>
