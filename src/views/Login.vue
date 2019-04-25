<template>
    <div>
        <v-content>
            <v-container fill-height>
                <v-layout
                row
                wrap>
                    <v-flex lg6 offset-lg3>
                        <transition
                            enter-active-class="animated bounceIn"
                            leave-active-class="animated bounceOut"
                            mode="out-in"
                        >
                            <v-alert
                                v-model="errorResult"
                                type="error"
                                dismissible
                                outline
                            >
                                {{ errorMessage }}
                            </v-alert>
                        </transition>
                        <v-card class="v-card-login">
                            <form class="form-login" @submit.prevent="login">
                                <h3 class="display-3 font-weight-thin">Login</h3>
                                <hr class="header-form">
                                <!-- EMAIL -->
                                <v-text-field
                                v-model="username"
                                outline label="Username"
                                prepend-inner-icon="person"
                                :error-messages="usernameErrors"
                                @input="$v.username.$touch()"
                                @blur="$v.username.$touch()"
                                required
                                name="username">
                                </v-text-field>
                                <!-- EMAIL -->

                                <!-- PASSWORD -->
                                <v-text-field
                                v-model="password"
                                outline label="Password"
                                prepend-inner-icon="lock"
                                :append-icon="fieldPassword ? 'visibility' : 'visibility_off'"
                                :type="fieldPassword ? 'text' : 'password'"
                                :error-messages="passwordErrors"
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                                @click:append="fieldPassword = !fieldPassword"
                                required>
                                </v-text-field>
                                <!-- PASSWORD -->

                                <div class="text-xs-right font-weight-bold">
                                    <v-btn type="submit" round outline color="primary" dark>Login</v-btn>
                                </div>
                            </form>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    data () {
        return {
            username: '',
            password: '',
            fieldPassword: false
        }
    },
    computed: {
        usernameErrors() {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push('Username is required')
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            !this.$v.password.minLen && errors.push('minimum of 6 characters')
            return errors
        },
        errorResult: {
            get() {
                return this.$store.getters.errorResult
            },
            set(v) {
                if (!v) {
                    this.$store.dispatch('closeError')
                }
            }
        },
        errorMessage() {
            return this.$store.getters.errorMessage
        }
    },
    methods: {
        login() {
            var data = {
                username: this.username,
                password: this.password
            }
            this.$store.dispatch('login', data)
        }
    },
    validations: {
        username: {
            required
        },
        password: {
            required,
            minLen: minLength(6)
        }
    }
}
</script>

<style scoped>
#grid-alert {
    height: 70px;
}
.form-login {
    padding: 35px;
}
/* .v-card-login {
    margin-top: 50px;
} */
.header-form {
    margin-bottom: 20px;
}
</style>
