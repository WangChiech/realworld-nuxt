<template>
  
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="!!user">
                <NuxtLink 
                  class="nav-link" 
                  :class="{ active: tab === 'followTab' }" 
                  :to="{
                    path: '/',
                    query: {
                      tab: 'followTab',
                      tag,
                      currentPage
                    }
                  }">
                  Your Feed
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink 
                  class="nav-link" 
                  :class="{ active: tab === 'globalTab' }" 
                  :to="{
                    path: '/',
                    query: {
                      tab: 'globalTab',
                      tag,
                      currentPage
                    }
                  }">
                  Global Feed
                </NuxtLink>
              </li>
              <li class="nav-item" v-if="tab === 'tag'">
                <NuxtLink 
                  :class="{ active: tab === 'tag' }" 
                  :to="{
                    path: '/',
                    query: {
                      tab: 'tag',
                      tag,
                      currentPage
                    }
                  }">
                  {{ `#${tag}` }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div 
            class="article-preview"
            v-for="item in articles"
            :key="item.slug">
              <div class="article-meta">
                  <NuxtLink :to="`/@${item.author.username}`">
                    <img :src="item.author.image"/>
                  </NuxtLink>
                  <div class="info">
                      <a href="" class="author">Eric Simons</a>
                      <span class="date">January 20th</span>
                  </div>
                  <button 
                    class="btn btn-outline-primary btn-sm pull-xs-right"
                    @click="handleFavorite(item)">
                      <i class="ion-heart"></i> {{ item.favoritesCount }}
                  </button>
              </div>
              <a href="" class="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
              </a>
          </div>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div 
              class="tag-list"
              v-for="item in tags"
              :key="item">
              <NuxtLink 
                class="tag-pill tag-default"
                :to="{
                  path: '/',
                  query: {
                    tab: 'tag',
                    tag: item,
                    currentPage
                  }
                }">
                {{ item }}
              </NuxtLink>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getTags } from '@/api/tag'
import { 
  getRencentFollowArticles, 
  getRencentArticles,
  favoriteArticles,
  unfavoriteArticles
} from '@/api/article.js'
export default {
  async asyncData({ store, query }) {
    const { user } = store.state
    const tab = query.tab || 'globalTab'
    const tag = query.tag || ''
    const currentPage = parseInt(query.currentPage) || 1
    const pageSize = 20
    const articleApi = tab === 'followTab' 
      ? getRencentFollowArticles : getRencentArticles
    const [articleRes, tagRes] = await Promise.all([
      articleApi({
        limit: pageSize,
        tag,
        offset: (currentPage - 1) * pageSize
      }),
      getTags()
    ])
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    return {
      tab,
      tag,
      currentPage,
      articles,
      articlesCount,
      tags,
      user
    }
  },
  watchQuery: ['tab', 'tag', 'currentPage'],
  data() {
    return {
      user: this.$store.state.user
    }
  },
  methods: {
    async handleFavorite(item) {
      if (!this.user) {
        this.$redirect('/login')
        return
      }
      const api = item.favorited 
        ? unfavoriteArticles : favoriteArticles
      await api(item.slug)
      item.favoritesCount = item.favorited 
        ? --item.favoritesCount : ++item.favoritesCount
      item.favorited = item.favorited ? false : true
    }
  }
}
</script>