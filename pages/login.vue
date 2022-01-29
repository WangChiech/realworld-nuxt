<template>
  <AuthPage
    :key="type"
    :user="user"
    :type="type"
    :errorList="errorList"
    :onSubmit="onSubmit"/>
</template>

<script>
import { login } from '@/api/auth'

export default {
  middleware: 'notAuthenticated',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      type: 1,
      errorList: []
    }
  },
  methods: {
    async onSubmit() {
      delete this.user.username
      try {
        const { data } = await login({ user: this.user })
        this.$store.commit('setUser', data.user || {})
        this.$router.push('/')
      } catch (err) {
        const errorList = []
        const errors = err.response.data.errors
        for (let key in errors) {
          errors[key].forEach(item => {
            errorList.push(`${key} ${item}`)
          })
        }
        this.errorList = [...errorList]
      }
      
    }
  }
}
</script>
