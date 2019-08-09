<template>
    <div>
        <v-layout row wrap>
            <v-flex xs6 md6 lg6>
                <v-text-field
                v-model="search"
                label="Search"
                prepend-icon="search">
                </v-text-field>
            </v-flex>
            <v-flex xs6 md6 lg6 class="text-xs-right">
                <v-tooltip left>
                    <template v-slot:activator="{ on }">
                        <v-btn fab outline
                        color="primary"
                        v-on="on"
                        to="/users/create">
                            <v-icon dark>add</v-icon>
                        </v-btn>
                    </template>
                    <span>Create User</span>
                </v-tooltip>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex lg12>
                <v-data-table
                :headers="headers"
                :items="desserts"
                :pagination.sync="pagination"
                :total-items="totalDesserts"
                :loading="loading"
                class="elevation-1"
                >
                    <template v-slot:items="props">
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>
                            <v-btn fab outline
                            color="warning"
                            @click="viewEdit(props.item.id)">
                                <v-icon dark>edit</v-icon>
                            </v-btn>
                            <v-btn fab outline
                            color="error"
                            to="/users/create">
                                <v-icon dark>delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'

export default {
    data () {
        return {
            pagestart: {},
            search: '',
            totalDesserts: 0,
            desserts: [],
            loading: true,
            pagination: {},
            headers: [
                { text: 'Name', value: 'name', sortable: false, },
                { text: 'Username', value: 'email', sortable: false, },
                { text: 'Actions', value: 'name', sortable: false }
            ]
        }
    },
    // computed: {
    //     tesvariabel: function() {
    //         return this.pagestart
    //     }
    // },
    watch: {
        pagination: {
            handler () {
                let checkCall = 'nosearch'
                this.getDataFromApi(checkCall)
                .then(data => {
                    this.desserts = data.items
                    this.totalDesserts = data.total
                })
            },
            deep: true
        },
        search(newValue) {
            this.updatePaginationSearch()
            let checkCall = 'search'
            this.getDataFromApi(checkCall)
            .then(data => {
                this.desserts = data.items
                this.totalDesserts = data.total
            })
        }
    },
    mounted () {
        // let checkCall = 'nosearch'
        // this.getDataFromApi(checkCall)
        // .then(data => {
        //     this.desserts = data.items
        //     this.totalDesserts = data.total
        // })
    },
    methods: {
        updatePaginationSearch () {
            this.pagination.page = 1
        },
        getDataFromApi (checkCall) {
            this.loading = true
            return new Promise((resolve, reject) => {
                let { sortBy, descending, page, rowsPerPage } = this.pagination

                if (checkCall == 'search') {
                    page = 1
                }

                let valueSearch = this.search
                let items
                let total
                axios.get('/users?page=' + page + '&rowperpage=' + rowsPerPage + '&search=' + valueSearch)
                .then(res => {
                    items = res.data.users.data
                    total = res.data.users.total
                })
                .catch(error => {

                })

                setTimeout(() => {
                    this.loading = false
                    resolve({
                        items,
                        total
                    })
                }, 3000)
            })
        },
        viewEdit(id) {
            router.push('users/edit/' + id)
        }
    }
}
</script>

<style scoped>
</style>
