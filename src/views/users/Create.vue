<template>
    <div>
        <v-form>
            <v-container grid-list-xl>
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
                        required>
                        </v-text-field>
                        <!-- PASSWORD -->

                        <!-- Name -->
                        <v-text-field
                        v-model="name"
                        outline
                        label="Name"
                        prepend-inner-icon="person"
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
                        :items="itemsRole"
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
                        <div class="title mb-1">Photo: (300 x 300)</div>
                        <div class="div-image">
                            <v-img
                                :src="imageUrl"
                                height="300"
                                width="300"
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
        }
    },
    created () {
        axios.get('/users/create')
        .then(res => {
            const data = res.data
            this.itemsRole = data
        })
        .catch(error => {
        })
    },
    computed: {
        usernameErrors() {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push('Username is required')
            return errors
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
.div-image {
    height: 300px;
    width: 300px;
}
</style>
