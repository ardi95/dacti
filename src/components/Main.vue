<template>
    <div>
        <v-content>
            <v-container>
                <v-layout row>
                    <v-flex lg12>
                        <v-card class="card-header">
                            <v-container>
                                <app-title v-if="showTitle"></app-title>
                                <app-breadcumb v-if="showBreadcrumbs"></app-breadcumb>
                            </v-container>
                        </v-card>
                        <v-card>
                            <v-container>
                                <transition
                                enter-active-class="animated fadeInLeft"
                                leave-active-class="animated fadeOutRight"
                                mode="out-in">
                                    <router-view></router-view>
                                </transition>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import Title from './Title.vue'
import Breadcumb from './Breadcumb.vue'

export default {
    data() {
        return {
            // breadcumbs: []
        }
    },
    computed: {
        showTitle() {
            return this.$route.matched[0].meta.showTitle
        },
        showBreadcrumbs() {
            return this.$route.meta.showBreadcrumbs
        }
    },
    updated() {
        // this.$store.dispatch('createBreadcumbUsers')
        // if (this.$route.name == 'userEdit') {
        //     console.log('masuk sini');
        //     let arrBreadcumbs = []
        //     arrBreadcumbs = this.$route.meta.breadcrumbs
        //
        //     let dataid = {
        //         text: this.$route.params.id,
        //         disabled: true,
        //         href: '/users/edit/'
        //     }
        //
        //     arrBreadcumbs.push(dataid)
        //
        //     this.breadcumbs = arrBreadcumbs
        // }
        // else {
        //     this.breadcumbs = this.$route.meta.breadcrumbs
        // }
    },
    mounted() {
        // console.log(this.$route.matched[0].name);
    },
    components: {
        appTitle: Title,
        appBreadcumb: Breadcumb
    }
}
</script>

<style scoped>
.card-header {
    margin-bottom: 20px;
}
</style>
