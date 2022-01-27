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
      class="btn btn-sm btn-outline-secondary"
      @click="handleFollow(article.author)">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons
    </button>
    &nbsp;
    <button 
      class="btn btn-sm btn-outline-primary"
      @click="handleFavorite(article)">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">
        {{ (`${ article.avoritesCount }`) }}
      </span>
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
    handleFollow: {
      type: Function,
      default: () => {}
    },
    handleFavorite: {
      type: Function,
      default: () => {}
    }
  }
}
</script>