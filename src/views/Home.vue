<template>
    <div>
        <v-content>
            <v-container>
                <v-layout row>
                    <v-flex lg12>
                        <h2 class="display-3" slot="activator">Welcome</h2>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
export default {
    data: () => ({
        drawer: null
    }),
    props: {
        source: String
    }
}
</script>
