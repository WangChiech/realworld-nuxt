<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <ArticleMeta
          :article="article"
          :user="user"
          :handleFollow="handleFollow"
          :handleFavorite="handleFavorite"
          :handleDeleteArticle="handleDeleteArticle"/>

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
          :handleFavorite="handleFavorite"
          :handleDeleteArticle="handleDeleteArticle"/>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <form class="card comment-form" v-if="user.token">
            <div class="card-block">
              <textarea 
                v-model="commentContent"
                class="form-control" 
                placeholder="Write a comment..." 
                rows="3">
              </textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image"/>
              <button 
                type="button"
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
        
          <div 
            v-for="comment in comments"
            :key="comment.id"
            class="card">
            <div class="card-block" v-html="comment.body"></div>
            <div class="card-footer">
              <NuxtLink 
                :to="{
                  path: `/@${comment.author.username}`
                }"
                class="comment-author">
                <img :src="comment.author.image"/>
              </NuxtLink>
              &nbsp;
              <NuxtLink 
                :to="{
                  path: `/@${comment.author.username}`
                }"
                class="comment-author">
                {{ comment.author.username }}
              </NuxtLink>
              <span class="date-posted">
                {{ comment.updateAt | dateParse('MMM DD, YYYY') }}
              </span>
              <span 
                v-if="comment.author.username === user.username"
                class="mod-options"
                @click="handleDeleteComment(comment.id)">
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
  createComment,
  delComment,
  delArticles
} from '@/api/article'

export default {
  async asyncData({ params }) {
    const { slug } = params
    const [articlesData, commontsData] = await Promise.all([
      getArticles(slug),
      getComments(slug)
    ])
    const { article } = articlesData.data
    const { comments } = commontsData.data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    comments.forEach((comment) => {
      comment.body = md.render(comment.body)
    })
    return {
      slug,
      article,
      comments
    }
  },
  data() {
    return {
      commentContent: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async handleFollow(article) {
      if (!this.user.token) {
        this.$router.push('/register')
      } else {
        const api = article.author.following ? delProfile : followProfile
        const { data } = await api(article.author.username)
        article.author.following = data.profile.following
      }
    },
    async handleFavorite(item) {
      if (!this.user.token) {
        this.$router.push('/register')
      } else {
        const api = item.favorited 
          ? unfavoriteArticles : favoriteArticles
        await api(item.slug)
        item.favoritesCount = item.favorited 
          ? --item.favoritesCount : ++item.favoritesCount
        item.favorited = item.favorited ? false : true
      }
    },
    async handleCreateComment() {
      if (!this.user.token) {
        this.$router.push('/register')
      } else {
        try {
          const { data } = await createComment(this.slug, {
            comment: {
              body: this.commentContent
            }
          })
          this.comments.unshift(data.comment)
          this.commentContent = ''
        } catch (err) {

        }
      }
    },
    async handleDeleteArticle() {
      await delArticles(this.slug)
      this.$router.push('/')
    },
    async handleDeleteComment(id) {
      try {
        const { data } = await delComment(this.slug, id)
        this.comments.forEach((comment, index) => {
          if (comment.id === id) {
            this.comments.splice(index, 1)
          }
        })
      } catch (err) {

      }
    }
  }
}
</script>