<template>
    <div>
        <v-form @submit.prevent="submitUser">
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
                        required>
                        </v-text-field>
                        <!-- USERNAME -->

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
                        <v-btn type="submit" large round outline color="warning">Update</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
