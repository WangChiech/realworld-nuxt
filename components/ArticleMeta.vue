<template>
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
      <span class="date">
        {{ article.createdAt | dateParse('MMM DD, YYYY') }}
      </span>
    </div>

    <button 
      v-if="!isSelf"
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.following ? true : false
      }"
      @click="handleFollow(article)">
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ `${article.author.following ? 'Un' : ''}Follow` }} {{ article.author.username }}
    </button>
    <NuxtLink 
      v-else
      class="btn btn-outline-secondary btn-sm" 
      :to="{ path: `/editor/${article.slug}`}">
      <i class="ion-edit"></i> Edit Article
    </NuxtLink>
    &nbsp;
    <button 
      v-if="!isSelf"
      :class="{
        active: article.favorited ? true : false
      }"
      class="btn btn-sm btn-outline-primary"
      @click="handleFavorite(article)">
      <i class="ion-heart"></i>
      &nbsp;
      {{ `${ article.favorited ? 'Un' : '' }Favorite Post` }}
      <span class="counter">
        {{ (`(${ article.favoritesCount })`) }}
      </span>
    </button>
    <button 
      v-else
      class="btn btn-outline-danger btn-sm"
      @click="handleDeleteArticle">
      <i class="ion-trash-a"></i> Delete Article
    </button>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    },
    user: {
      type: Object,
      default() {
        return {}
      }
    },
    handleFollow: {
      type: Function,
      default: () => {}
    },
    handleFavorite: {
      type: Function,
      default: () => {}
    },
    handleDeleteArticle: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    isSelf() {
      return this.article.author.username === this.user.username
    }
  }
}
</script>