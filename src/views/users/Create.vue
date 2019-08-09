<template>
    <div>
        <v-form @submit.prevent="submitUser">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex md8>
                        <v-alert
                            v-model="successResultUser"
                            type="success"
                            dismissible
                            outline
                        >
                            Successfully add data user.
                        </v-alert>
                        <v-alert
                            v-model="errorResultUser"
                            type="error"
                            dismissible
                            outline
                        >
                            <ul>
                                <li v-for="error in errorMessageUser">
                                    {{ error }}
                                </li>
                            </ul>
                        </v-alert>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex md6>
                        <!-- USERNAME -->
                        <v-text-field
                        v-model="username"
                        outline
                        label="Username"
                        prepend-inner-icon="person"
                        required
                        name="username"
                        :error-messages="usernameErrors"
                        @input="$v.username.$touch()"
                        @blur="$v.username.$touch()"
                        required>
                        </v-text-field>
                        <!-- USERNAME -->

                        <!-- PASSWORD -->
                        <v-text-field
                        v-model="password"
                        outline label="Password"
                        prepend-inner-icon="lock"
                        :append-icon="fieldPassword ? 'visibility' : 'visibility_off'"
                        :type="fieldPassword ? 'text' : 'password'"
                        @click:append="fieldPassword = !fieldPassword"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        required>
                        </v-text-field>
                        <!-- PASSWORD -->

                        <!-- Name -->
                        <v-text-field
                        v-model="name"
                        outline
                        label="Name"
                        prepend-inner-icon="person"
                        :error-messages="nameErrors"
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                        required>
                        </v-text-field>
                        <!-- Name -->

                        <!-- NOPEGAWAI -->
                        <v-text-field
                        v-model="no_pegawai"
                        outline
                        label="No Pegawai"
                        prepend-inner-icon="far fa-id-card"
                        required>
                        </v-text-field>
                        <!-- NOPEGAWAI -->

                        <!-- ROLE -->
                        <v-select
                        v-model="role"
                        :items="isItemRole"
                        chips
                        label="Roles"
                        multiple
                        outline
                        prepend-inner-icon="fas fa-briefcase"
                        item-value="id"
                        item-text="display_name"></v-select>
                        <!-- ROLE -->

                        <!-- IS ACTIVE -->
                        <v-switch
                        v-model="isActive"
                        label="User Active?"
                        color="primary"
                        hide-details></v-switch>
                        <!-- IS ACTIVE -->
                    </v-flex>
                    <v-flex md6>
                        <!-- PHOTO -->
                        <v-text-field
                        label="Select Image"
                        @click="pickFile"
                        v-model="imageName"
                        prepend-icon="attach_file"
                        readonly="readonly"
                        :append-icon="closeImage ? 'close' : ''"
                        @click:append="onCloseImage">
                        </v-text-field>

                        <input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked">
                        <!-- PHOTO -->

                        <!-- SAMPLE PHOTO -->
                        <div class="title mb-1">Photo: (128 x 128)</div>
                        <div class="div-image">
                            <v-img
                                :src="imageUrl"
                                height="128"
                                width="128"
                            ></v-img>
                        </div>
                        <!-- SAMPLE PHOTO -->
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex md12>
                        <v-btn type="submit" large round outline color="primary" :disabled="$v.$invalid">Submit</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    data () {
        return {
            username: '',
            password: '',
            name: '',
            no_pegawai: '',
            imageName: '',
            imageFile: '',
            imageUrl: '',
            role: [],
            itemsRole: [],
            closeImage: false,
            isActive: false,
            fieldPassword: false
        }
    },
    methods: {
        pickFile () {
            this.$refs.image.click ()
        },
        onFilePicked (e) {
            const files = this.$refs.image.files[0];
            if (files !== undefined) {
                this.imageName = files.name
                const fr = new FileReader ()
                this.closeImage = true
				fr.readAsDataURL(files)
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
                    this.imageFile = files
				})
            }
        },
        onCloseImage(index) {
            this.$refs.image.value = null
            this.imageName = ''
            this.imageUrl = ''
            this.imageFile = ''
            this.closeImage = false
        },
        submitUser() {
            let formData = new FormData()
            let arrayRole = this.role
            let role = []
            let a = 0

            arrayRole.forEach(ar => {
                formData.append('role[' + a + ']', ar)
                a++
            });

            formData.append('email', this.username)
            formData.append('password', this.password)
            formData.append('name', this.name)
            formData.append('no_pegawai', this.no_pegawai)
            formData.append('status', this.isActive)
            formData.append('photo', this.imageFile)

            axios.post('/users', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                this.$store.dispatch('openSuccessUser')
                this.username = '',
                this.password = '',
                this.name = '',
                this.no_pegawai = '',
                this.imageName = '',
                this.imageFile = '',
                this.imageUrl = '',
                this.role = [],
                this.closeImage = false,
                this.isActive = false,
                this.fieldPassword = false
                // this.$v.username.$error = false
                this.$nextTick(() => { this.$v.$reset() })
                return
            })
            .catch(error => {
                const dataError = error.response.data.errors
                // console.log(dataError);
                this.$store.dispatch('openErrorUser', dataError)
                // console.log(dataError);
                return
            })
        }
    },
    created () {
        this.$store.dispatch('getRole')
    },
    // updated () {
    //     console.log('masuk update')
    // },
    computed: {
        isItemRole() {
            return this.$store.getters.isRole
        },
        usernameErrors() {
            // const errors = []
            // if (!this.$v.username.$dirty) return errors
            // !this.$v.username.required && errors.push('Username is required')
            // return errors
            if (this.$v.username.$error) {
                if (!this.$v.username.required) {
                    return 'Username is required'
                }
            }
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            !this.$v.password.minLen && errors.push('minimum of 8 characters')
            return errors
        },
        nameErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push('Name is required')
            return errors
        },
        errorResultUser: {
            get() {
                return this.$store.getters.errorResultUser
            },
            set(v) {
                if (!v) {
                    this.$store.dispatch('closeErrorUser')
                }
            }
        },
        successResultUser: {
            get() {
                return this.$store.getters.successResultUser
            },
            set(v) {
                if (!v) {
                    this.$store.dispatch('closeSuccessUser')
                }
            }
        },
        errorMessageUser() {
            return this.$store.getters.errorMessageUser
        }
    },
    validations: {
        username: {
            required
        },
        password: {
            required,
            minLen: minLength(8)
        },
        name: {
            required
        }
    }
}
</script>

<style scoped>
.div-image {
    height: 300px;
    width: 300px;
}
</style>
