<template>
    <div>
        <v-content>
            <v-container>
                <v-layout row>
                    <v-flex lg12>
                        <v-card class="card-header">
                            <v-container>
                                <h4 class="display-1">Users</h4>
                                <v-divider></v-divider>
                                <v-breadcrumbs :items="breadcumbs">
                                    <template v-slot:divider>
                                        <v-icon>forward</v-icon>
                                    </template>
                                    <template v-slot:item="props">
                                        <router-link
                                        tag="a"
                                        :to="props.item.href"
                                        :class="[props.item.disabled && 'disabled']">{{ props.item.text }}</router-link>
                                    </template>
                                </v-breadcrumbs>
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
export default {
    data() {
        return {
            breadcumbs: []
        }
    },
    updated() {
        this.breadcumbs = this.$route.meta.breadcrumbs
    },
    mounted() {
        this.breadcumbs = this.$route.meta.breadcrumbs
    }
}
</script>

<style scoped>
.card-header {
    margin-bottom: 20px;
}
.disabled {
    color: grey;
    pointer-events: none;
}
</style>
