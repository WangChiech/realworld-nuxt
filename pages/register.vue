<template>
  <AuthPage
    :key="type"
    :user="user"
    :type="type"
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
      type: 0
    }
  },
  methods: {
    onSubmit() {
      register({ user: this.user }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
