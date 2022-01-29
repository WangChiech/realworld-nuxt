<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ type ? 'Sign in' : 'Sign up' }}
          </h1>
          <p class="text-xs-center">
            <NuxtLink :to="type ? '/register' : '/login'">
              {{ type ? 'Need an account?' : 'Have an account?' }}
            </NuxtLink>
          </p>

          <ul class="error-messages">
            <li
              v-for="item in errorList"
              :key="item">
              {{ item }}
            </li>
          </ul>

          <form>
            <fieldset class="form-group" v-if="!type">
              <input 
                class="form-control form-control-lg" 
                type="text" 
                placeholder="Your Name"
                v-model="user.username"
                required>
            </fieldset>
            <fieldset class="form-group">
              <input 
                class="form-control form-control-lg" 
                type="email" 
                placeholder="Email"
                v-model="user.email"
                required>
            </fieldset>
            <fieldset class="form-group">
              <input 
                class="form-control form-control-lg" 
                type="password" 
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8">
            </fieldset>
            <button 
              type="button" 
              class="btn btn-lg btn-primary pull-xs-right"
              @click="onSubmit">
                Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthPage',
  props: {
    // 0 注册 | 1 登录
    type: {
      type: Number | String,
      default: 0
    },
    user: {
      type: Object,
      default() {
        return {}
      }
    },
    errorList: {
      type: Array,
      default() {
        return []
      }
    },
    onSubmit: {
      type: Function,
      default: () => {}
    }
  }
}
</script>