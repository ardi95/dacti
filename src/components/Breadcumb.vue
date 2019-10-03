<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs">
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
    </div>
</template>

<script>
import router from '../router'

export default {
    computed: {
        breadcrumbs() {
            return this.$store.getters.breadcrumbs
        }
    }, created() {
        // console.log(router);
    }
}
</script>

<style scoped>
.disabled {
    color: grey;
    pointer-events: none;
}
</style>
