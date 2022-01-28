<template>
  
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input 
                  v-model="article.title"
                  type="text" 
                  class="form-control form-control-lg" 
                  placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                <input 
                  v-model="article.description"
                  type="text" 
                  class="form-control" 
                  placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                <textarea 
                  v-model="article.body"
                  class="form-control" 
                  rows="8"
                  placeholder="Write your article (in markdown)">
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input 
                  v-model="tag"
                  type="text" 
                  class="form-control" 
                  placeholder="Enter tags"
                  @keyup.enter="handleAddTag">
                <div class="tag-list">
                  <span 
                    v-for="item in article.tagList"
                    :key="item"
                    class="tag-default tag-pill ng-binding ng-scope">
                    <i 
                      class="ion-close-round"
                      @click="handleDeleteTag(item)">
                    </i>
                    {{ item }}
                  </span>
                </div>
              </fieldset>
              <button 
                class="btn btn-lg pull-xs-right btn-primary" 
                type="button"
                @click="handlePublishArticle">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { 
  getArticles, 
  createArticles, 
  updateArticles 
} from '@/api/article.js'

export default {
  async asyncData({ params }) {
    const slug = params.slug
    let article = {
      tagList: []
    }
    console.log(params)
    if (slug) {
      const { data } = await getArticles(slug)
      console.log('111222', data)
      article = {
        title: data.article.title,
        description: data.article.description,
        body: data.article.body,
        tagList: data.article.tagList
      }
    }
    return {
      slug,
      article
    }
  },
  data() {
    return {
      tag: ''
    }
  },
  methods: {
    handleAddTag() {
      if (!this.tag || this.article.tagList.includes(this.tag)) {
        return
      }
      this.article.tagList.push(this.tag)
    },
    handleDeleteTag(item) {
      const tagListSet = new Set(this.article.tagList)
      tagListSet.delete(item)
      this.article.tagList = Array.from(tagListSet)
      this.tag = ''
    },
    async handlePublishArticle() {
      const api = this.slug === undefined ? createArticles : updateArticles
      const params = { 
        data: { article: this.article }
       }
      this.slug && (params.slug = this.slug)
      const { data } = await api(params)
      try {
        const { slug } = data.article
        this.$router.push({
          path: `/article/${slug}`
        })
      } catch(err) {
        console.log(err)      }
      
    }
  }
}
</script>