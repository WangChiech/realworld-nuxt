<template>
  <AuthPage
    :key="type"
    :user="user"
    :type="type"
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
      type: 1
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
        console.log('----------err---------------', err)
      }
      
    }
  }
}
</script>
