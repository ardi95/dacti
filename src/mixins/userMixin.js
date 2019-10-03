export const userMixin = {
    data() {
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
            isActive: false
        }
    },
    methods: {
        pickFile () {
            this.$refs.image.click ()
        }
    },
    computed: {
        isItemRole() {
            return this.$store.getters.isRole
        },
        usernameErrors() {
            if (this.$v.username.$error) {
                if (!this.$v.username.required) {
                    return 'Username is required'
                }
            }
        },
        nameErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push('Name is required')
            return errors
        }
    }
}
