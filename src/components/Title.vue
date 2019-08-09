<template>
    <div>
        <h4 class="display-1">{{ title }}</h4>
        <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    computed: {
        title() {
            return this.$store.getters.title
        }
    }
}
</script>

<style scoped>
</style>
