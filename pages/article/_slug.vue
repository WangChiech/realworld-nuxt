<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <ArticleMeta
          :article="article"
          :user="user"
          :handleFollow="handleFollow"
          :handleFavorite="handleFavorite"/>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content" v-html="article.body"></div>

      <ul class="tag-list">
          <li 
            v-for="item in article.tagList"
            :key="item"
            class="tag-default tag-pill tag-outline ng-binding ng-scope">
            {{ item }}
          </li>
        </ul>

      <hr/>

      <div class="article-actions">
        <ArticleMeta
          :article="article"
          :user="user"
          :handleFollow="handleFollow"
          :handleFavorite="handleFavorite"/>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form" v-if="user.token">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img"/>
              <button 
                class="btn btn-sm btn-primary"
                @click="handleCreateComment">
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
import MarkdownIt from 'markdown-it'
import { mapState } from 'vuex'
import { 
  getArticles,
  favoriteArticles,
  unfavoriteArticles,
  followProfile,
  delProfile,
  getComments,
  CreateComment,
  delComment,
  delArticles
} from '@/api/article'

export default {
  async asyncData({ params }) {
    console.log(1111, params, params.slug)
    const { data } = await getArticles(params.slug)
    console.log(data)
    const article = data.article
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleFollow(article) {
      console.log('handleFollow',article)
      if (!this.user.token) {
        this.$router.push('/register')
      } else {

      }
    },
    handleFavorite(article) {
      console.log('handleFavorite',article)
      if (!this.user.token) {
        this.$router.push('/register')
      } else {
        
      }
    },
    handleCreateComment() {
      if (!this.user.token) {
        this.$router.push('/register')
      } else {
        
      }
    }
  }
}
</script>