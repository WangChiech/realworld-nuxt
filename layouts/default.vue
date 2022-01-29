<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <NuxtLink class="navbar-brand" to="/">conduit</NuxtLink>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <NuxtLink 
              class="nav-link" 
              exact 
              :class="{ active: $route.path === '/' }" 
              to="/">Home</NuxtLink>
          </li>
          <li class="nav-item" v-if="!!user.token">
            <NuxtLink 
              class="nav-link" 
              :class="{ active: $route.path === '/editor' }" 
              to="/editor/">
              <i class="ion-compose"></i>&nbsp;New Article
            </NuxtLink>
          </li>
          <li class="nav-item" v-if="!!user.token">
            <NuxtLink 
              class="nav-link"
              :class="{ active: $route.path === '/settings' }"  
              to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </NuxtLink>
          </li>
          <li class="nav-item" v-if="!user.token">
            <NuxtLink 
              class="nav-link" 
              :class="{ active: $route.path === '/login' }" 
              to="/login">
              Sign in
            </NuxtLink>
          </li>
          <li class="nav-item" v-if="!user.token">
            <NuxtLink 
              class="nav-link" 
              :class="{ active: $route.path === '/register' }" 
              to="/register">
              Sign up
            </NuxtLink>
          </li>
          <li class="nav-item" v-if="!!user.token">
            <NuxtLink 
              class="nav-link ng-binding" 
              :to="`/@${user.username}`">
              <img class="user-pic" :src="user.image">
              {{ user.username }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
    <Nuxt />
    
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>