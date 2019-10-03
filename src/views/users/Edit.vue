<template>
    <div>
        <v-form @submit.prevent="submitUser">
            <v-container grid-list-xl>
                <v-layout row wrap>
                    <v-flex md8>
                        <v-alert
                            v-model="isSuccessStatus"
                            type="success"
                            dismissible
                            outline
                        >
                            Successfully Edit data user.
                        </v-alert>
                        <v-alert
                            v-model="isErrorStatus"
                            type="error"
                            dismissible
                            outline
                        >
                            <ul>
                                <li v-for="error in errorMessage">
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

                        <!-- Name -->
                        <v-text-field
                        v-model="name"
                        outline
                        label="Name"
                        prepend-inner-icon="person"
                        :error-messages="nameErrors"
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                        required
                        name="name">
                        </v-text-field>
                        <!-- Name -->

                        <!-- NOPEGAWAI -->
                        <v-text-field
                        v-model="no_pegawai"
                        outline
                        label="No Pegawai"
                        prepend-inner-icon="far fa-id-card"
                        required
                        name="no_pegawai">
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
                        v-model="imageName"
                        @click="pickFile"
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
                        <v-btn type="submit" large round outline color="warning" :disabled="$v.$invalid">Update</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios'
import { globalMixin } from '../../mixins/globalMixin'
import { userMixin } from '../../mixins/userMixin'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            statusUpdateImage: 0,
            errorStatus: false,
            errorMessage: [],
            successStatus: false
        }
    },
    created() {
        this.$store.dispatch('getRole')

        axios.get('/users/' + this.$route.params.id + '/edit')
        .then(res => {
            // console.log(res.data.role);
            this.username = res.data.user.email
            this.name = res.data.user.name
            this.no_pegawai = res.data.user.no_pegawai
            this.role = res.data.role
            if (res.data.user.status == 1) {
                this.isActive = true
            }
            if (res.data.user.photo != null) {
                this.closeImage = true
                this.imageName = res.data.user.photo
                this.imageUrl = this.urlDirPhotos + '/' + res.data.user.photo
            }
        })
        .catch(error => {
            console.log(error.response);
        })
    },
    methods: {
        onFilePicked (event) {
            const files = this.$refs.image.files[0];
            if (files !== undefined) {
                this.imageName = files.name
                const fr = new FileReader ()
                this.statusUpdateImage = 1
                this.closeImage = true
				fr.readAsDataURL(files)
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
                    this.imageFile = files
				})
            }
        },
        onCloseImage(index) {
            this.statusUpdateImage = 1
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
            let status = 0
            if (this.isActive == true) {
                status = '1'
            } else {
                status = '0'
            }
            formData.append('status', status)

            console.log(this.statusUpdateImage);

            if (this.statusUpdateImage == 1) {
                formData.append('photo', this.imageFile)
            }

            formData.append('status_photo', this.statusUpdateImage)
            formData.append('_method', 'PATCH')

            axios.post('/users/' + this.$route.params.id, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                this.errorStatus = false
                this.successStatus = true
                if (this.statusUpdateImage == 1) {
                    this.statusUpdateImage == 0
                }
            })
            .catch(error => {
                const dataError = error.response.data.errors

                this.errorStatus = true
                this.successStatus = false
                this.errorMessage = dataError
            })
        }
    },
    computed: {
        isErrorStatus: {
            get() {
                return this.errorStatus
            },
            set(v) {
                if (!v) {
                    this.errorStatus = false
                }
            }
        },
        isSuccessStatus: {
            get() {
                return this.successStatus
            },
            set(v) {
                if (!v) {
                    this.successStatus = false
                }
            }
        }
    },
    validations: {
        username: {
            required
        }, name: {
            required
        }
    },
    mixins: [globalMixin, userMixin]
}
</script>

<style scoped>
</style>
