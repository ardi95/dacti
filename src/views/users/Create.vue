<template>
    <div>
        <v-form>
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex md6>
                        <v-text-field
                        v-model="username"
                        outline
                        label="Username"
                        prepend-inner-icon="person"
                        required
                        name="username">
                        </v-text-field>
                    </v-flex>
                    <v-flex md6>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: ''
        }
    }
}
</script>

<style scoped>
</style>
