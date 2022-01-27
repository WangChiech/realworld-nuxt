<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <ArticleMeta
          :article="article"
          :handleFollow="handleFollow"
          :handleFavorite="handleFavorite"/>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content" v-html="article.body">
        
      </div>

      <hr/>

      <div class="article-actions">
        <ArticleMeta
          :article="article"
          :handleFollow="handleFollow"
          :handleFavorite="handleFavorite"/>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form" v-if="user">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <p style="display: inherit;" v-else>
            <NuxtLink  to="/login">
              Sign in
            </NuxtLink> or <NuxtLink to="/register">
              sign up
            </NuxtLink> to add comments on this article.
          </p>
        
          <div class="card">
            <div class="card-block">
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  async asyncData({ params, store }) {
    console.log(1111, params, params.slug)
    const { data } = await getArticles(params.slug)
    const { user } = store.state
    console.log(data)
    const article = data.article
    return {
      article,
      user
    }
  },
  methods: {
    handleFollow(article) {
      console.log('handleFollow',article)
      if (!this.user) {
        this.$router.push('/register')
      } else {

      }
    },
    handleFavorite(article) {
      console.log('handleFavorite',article)
      if (!this.user) {
        this.$router.push('/register')
      } else {
        
      }
    }
  }
}
</script>