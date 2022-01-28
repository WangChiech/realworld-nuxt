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
              <li class="nav-item" v-if="!!user.token">
                <NuxtLink 
                  class="nav-link" 
                  :class="{ active: tab === 'followTab' }" 
                  exact
                  :to="{
                    path: '/',
                    query: {
                      tab: 'followTab'
                    }
                  }">
                  Your Feed
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink 
                  class="nav-link" 
                  :class="{ active: tab === 'globalTab' }" 
                  exact
                  :to="{
                    path: '/'
                  }">
                  Global Feed
                </NuxtLink>
              </li>
              <li class="nav-item" v-if="tag">
                <NuxtLink 
                  class="nav-link" 
                  :class="{ active: tab === 'tag' }" 
                  exact
                  :to="{
                    path: '/',
                    query: {
                      tab: 'tag',
                      tag
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
                    <NuxtLink :to="`/@${item.author.username}`">
                      {{ item.author.username }}
                    </NuxtLink>
                    <span class="date">{{ item.createdAt | dateParse('MMM DD, YYYY') }}</span>
                  </div>
                  <button 
                    class="btn btn-outline-primary btn-sm pull-xs-right"
                    :class="{ active: item.favorited ? true : false}"
                    :disabled="!!item.loading"
                    @click="handleFavorite(item)">
                      <i class="ion-heart"></i> {{ item.favoritesCount }}
                  </button>
              </div>
              <NuxtLink 
                :to="`/article/${item.slug}`"
                class="preview-link">
                <h1>{{ item.title }}</h1>
                <p>{{ item.description }}</p>
                <span>Read more...</span>
                <ul class="tag-list">
                  <li 
                    class="tag-default tag-pill tag-outline ng-binding ng-scope"
                    v-for="tagItem in item.tagList"
                    :key="tagItem">
                    {{ tagItem }}
                  </li>
                </ul>
              </NuxtLink>
          </div>

          <div class="ng-isolate-scope"><nav>
            <ul class="pagination">

              <li 
                class="page-item ng-scope"
                :class="{active: +item === +currentPage}"
                v-for="item in totlePage"
                :key="item">

                <NuxtLink 
                  class="page-link"
                  :to="{
                    path: '/',
                    query: {
                      tab,
                      tag,
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
import { mapState } from 'vuex'
import { getTags } from '@/api/tag'
import { 
  getRencentFollowArticles, 
  getRencentArticles,
  favoriteArticles,
  unfavoriteArticles
} from '@/api/article.js'

export default {
  async asyncData({ query }) {
    console.log(query)
    const tab = query.tab || 'globalTab'
    const tag = query.tag || ''
    const currentPage = parseInt(query.currentPage) || 1
    const pageSize = 20
    const articleApi = tab === 'followTab' ? getRencentFollowArticles : getRencentArticles
    const params = {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize
    }
    tag ? params.tag = tag : ''
    const [articleRes, tagRes] = await Promise.all([
      articleApi(params),
      getTags()
    ])
    const { articles, articlesCount } = articleRes.data
    articles.forEach(item => {
      item.loading = false
    })
    const { tags } = tagRes.data
    return {
      tab,
      tag,
      currentPage,
      pageSize,
      articles,
      articlesCount,
      tags
    }
  },
  watchQuery: ['tab', 'tag', 'currentPage'],
  computed: {
    ...mapState(['user']),
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
    }
  }
}
</script>