<template>
  
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input 
                  class="form-control" 
                  type="text" 
                  placeholder="URL of profile picture"
                  v-model="userDto.image">
              </fieldset>
              <fieldset class="form-group">
                <input 
                  class="form-control form-control-lg" 
                  type="text"
                  placeholder="Your Name"
                  v-model="userDto.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea 
                  class="form-control form-control-lg" 
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="userDto.bio">
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input 
                  class="form-control form-control-lg" 
                  type="text" 
                  placeholder="Email"
                  v-model="userDto.email">
              </fieldset>
              <fieldset class="form-group">
                <input 
                  class="form-control form-control-lg" 
                  type="password" 
                  placeholder="Password"
                  v-model="userDto.password">
              </fieldset>
              <button 
                type="button"
                class="btn btn-lg btn-primary pull-xs-right"
                @click="handleChangeInfo">
                  Update Settings
              </button>
            </fieldset>
          </form>

          <hr>

          <button 
            class="btn btn-outline-danger"
            @click="handleLogout">
            Or click here to logout.
          </button>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { updateUser } from '@/api/auth'

export default {
  asyncData({ store }) {
    const { user } = store.state
    const userDto = { ...user }
    delete userDto.token
    return {
      userDto
    }
  },
  methods: {
    ...mapMutations(['setUser', 'removeUser']),
    async handleChangeInfo() {
      try {
        const { data } = await updateUser({ user: this.userDto })
        this.setUser(data.user)
        this.$router.push(`/@${data.user.username}`)
      } catch (err) {
        console.log('err---', err)
      }
    },
    handleLogout() {
      this.removeUser()
      this.$router.push('/')
    }
  }
}
</script>