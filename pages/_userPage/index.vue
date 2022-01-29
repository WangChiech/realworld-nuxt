<template>
  
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img"/>
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.description }}
            </p>
            <button 
              v-if="!isSelf"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="handleChangeFollow(profile)">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ `${ profile.following ? 'un' : ''}Follow`}}
              {{ profile.username }}
            </button>
            <NuxtLink
              v-else
              class="btn btn-sm btn-outline-secondary action-btn" 
              to="/settings">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </NuxtLink>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <NuxtLink 
                  class="nav-link" 
                  exact
                  :class="{
                    active: tab === 'me'
                  }"
                  :to="{
                    path: `/@${slug}`,
                    query: {
                      tab: 'me'
                    }
                  }">
                  My Articles
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink 
                  class="nav-link" 
                  :class="{
                    active: tab === 'favorited'
                  }"
                  exact
                  :to="{
                    path: `/@${slug}`,
                    query: {
                      tab: 'favorited'
                    }
                  }">
                  Favorited Articles
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div 
            v-for="article in articles"
            :key="article.slug"
            class="article-preview">
            <div class="article-meta">
              <NuxtLink 
                :to="{
                  path: `/@${article.author.username}`
                }">
                <img :src="article.author.image"/>
              </NuxtLink>
              <div class="info">
                <NuxtLink 
                  :to="{
                    path: `/@${article.author.username}`
                  }" 
                  class="author">
                  {{ article.author.username }}
                </NuxtLink>
                <span class="date">{{ article.createdAt | dateParse('MMM DD, YYYY') }}</span>
              </div>
              <button 
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :disabled="article.loading ? true : false"
                :class="{
                  active: article.favorited ? true : false
                }"
                @click="handleFavorite(article)">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <NuxtLink 
              :to="{
                path: `/article/${article.slug}`
              }" 
              class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </NuxtLink>
          </div>

          <div class="ng-isolate-scope">
            <nav>
              <ul class="pagination">

                <li 
                  class="page-item ng-scope"
                  :class="{active: +item === +currentPage}"
                  v-for="item in totlePage"
                  :key="item">

                  <NuxtLink 
                    class="page-link"
                    :to="{
                      path: `/@${slug}`,
                      query: {
                        tab,
                        currentPage: item
                      }
                    }">
                    {{ item }}
                  </NuxtLink>

                </li>

              </ul>
            </nav>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { 
  getProfile,
  getRencentArticles,
  favoriteArticles,
  unfavoriteArticles,
  followProfile,
  delProfile
} from '@/api/article'

export default {
  async asyncData({ store, params, query }) {
    const tab = query.tab || 'me'
    const currentPage = query.currentPage || 1
    const pageSize = 10
    const { user } = store.state
    const slug = params.userPage.substr(1)
    const isSelf = user.username  === slug
    const { data } = await getProfile(slug)
    const { profile } = data
    const articleParams = {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize
    }
    articleParams[tab === 'me' ? 'author' : 'favorited'] = slug
    const { data : articleData } = await getRencentArticles(articleParams)
    const { articles, articlesCount } = articleData
    articles.forEach(item => {
      item.loading = false
    })
    return {
      user,
      isSelf,
      slug,
      profile,
      articles,
      articlesCount,
      pageSize,
      currentPage,
      tab
    }
  },
  watchQuery: ['tab', 'currentPage'],
  computed: {
    totlePage() {
      return Math.ceil(this.articlesCount / this.pageSize)
    }
  },
  methods: {
    async handleFavorite(item) {
      if (!this.user.token) {
        this.$redirect('/login')
        return
      }
      item.loading = true
      const api = item.favorited 
        ? unfavoriteArticles : favoriteArticles
      await api(item.slug)
      item.favoritesCount = item.favorited 
        ? --item.favoritesCount : ++item.favoritesCount
      item.favorited = item.favorited ? false : true
      item.loading = false
    },
    async handleChangeFollow(profile) {
      const api = profile.following ? delProfile : followProfile
      const { data } = await api(profile.username)
      profile.following = data.profile.following
    }
  }
}
</script>