<template>
  <div class="article-meta">
    <a href="profile.html"><img :src="article.author.image"/></a>
    <div class="info">
      <a href="" class="author">
        {{ article.author.username }}
      </a>
      <span class="date">
        {{ article.createdAt | dateParse('MMM DD, YYYY') }}
      </span>
    </div>

    <button 
      v-if="!isSelf"
      class="btn btn-sm btn-outline-secondary"
      @click="handleFollow(article.author, )">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{ article.author.username }}
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
      class="btn btn-sm btn-outline-primary"
      @click="handleFavorite(article)">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post
      <span class="counter">
        {{ (`${ article.avoritesCount }`) }}
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
    }
  },
  computed: {
    isSelf() {
      return this.article.author.username === this.user.username
    }
  },
  methods: {
    handleDeleteArticle() {

    }
  }
}
</script>