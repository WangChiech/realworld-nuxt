<template>
  <AuthPage
    :key="type"
    :user="user"
    :type="type"
    :errorList="errorList"
    :onSubmit="onSubmit"/>
</template>

<script>
import { register } from '@/api/auth'

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      type: 0,
      errorList: []
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await register({ user: this.user })
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
