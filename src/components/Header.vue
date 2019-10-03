<template>
    <div>
        <v-toolbar color="#00c6d7" dark>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Daily Activity</v-toolbar-title>
        </v-toolbar>
        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        >
            <v-list class="pa-1">
                <!-- PROFILE -->
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img :src="urlImgProfile">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ nameUser }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!-- PROFILE -->

                <v-list class="pt-0" dense>
                    <v-divider></v-divider>
                </v-list>

                <!-- HOME -->
                <v-list-tile to="/home">
                    <v-list-tile-action>
                        <v-icon>
                            home
                        </v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!-- HOME -->

                <!-- SYSTEM ADMINISTRATOR -->
                <v-list-group
                prepend-icon="settings"
                v-if="roleAdmin">
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-title>System Administrator</v-list-tile-title>
                        </v-list-tile>
                    </template>

                    <!-- USERS -->
                    <v-list-tile to="/users">
                        <v-list-tile-action>
                            <v-icon>
                                person
                            </v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Users</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <!-- USERS -->
                </v-list-group>
                <!-- SYSTEM ADMINISTRATOR -->

                <!-- SYSTEM ADMINISTRATOR -->
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-tile>
                            <v-list-tile-title>System Administrator</v-list-tile-title>
                        </v-list-tile>
                    </template>

                    <!-- USERS -->
                    <v-list-tile to="/users">
                        <v-list-tile-action>
                            <v-icon>
                                person
                            </v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Users</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <!-- USERS -->
                </v-list-group>
                <!-- SYSTEM ADMINISTRATOR -->

                <!-- LOGOUT -->
                <v-list-tile @click="logout">
                    <v-list-tile-action>
                        <v-icon>fas fa-sign-out-alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!-- LOGOUT -->
            </v-list>

        </v-navigation-drawer>
    </div>
</template>

<script>
import { globalMixin } from '../mixins/globalMixin'

export default {
    data: () => ({
        drawer: null
    }),
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    },
    computed: {
        nameUser() {
            return this.$store.getters.isNameUser
        },
        urlImgProfile() {
            if (this.$store.getters.isUrlImgProfile != null) {
                return this.urlDirPhotos + '/' + this.$store.getters.isUrlImgProfile
            } else {
                return this.urlPhotoNewUser
            }
        },
        roleAdmin() {
            return this.$store.getters.isRoleAdmin
        }
    },
    mixins: [globalMixin]
}
</script>
