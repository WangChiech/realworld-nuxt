import { request } from '../plugins/request.js'

export const getRencentFollowArticles = (data) => { // 获取最近 follow 的所有文章
  return request({
    method: 'get',
    url: '/api/article/feed',
    data
  })
}

export const getRencentArticles = (data) => { // 获取最近的全部文章
  return request({
    method: 'get',
    url: '/api/articles',
    data
  })
}

export const createArticles = (data) => { // 创建文章
  return request({
    method: 'post',
    url: '/api/articles',
    data
  })
}

export const getArticles = (slug) => { // 获取文章
  return request({
    method: 'get',
    url: `/api/articles/${slug}`
  })
}

export const updateArticles = (slug) => { // 更新文章
  return request({
    method: 'put',
    url: `/api/articles/${slug}`
  })
}

export const delArticles = (slug) => { // 删除文章
  return request({
    method: 'delete',
    url: `/api/articles/${slug}`
  })
}

export const favoriteArticles = (slug) => { // 点赞
  return request({
    method: 'post',
    url: `/api/articles/${slug}/favorite`
  })
}

export const unfavoriteArticles = (slug) => { // 取消点赞
  return request({
    method: 'delete',
    url: `/api/articles/${slug}/favorite`
  })
}

export const getProfile = (username) => { // get a profile
  return request({
    method: 'get',
    url: `/api/profiles/${username}`
  })
}

export const followProfile = (username) => { // follow a user
  return request({
    method: 'post',
    url: `/api/profiles/${username}/follow`
  })
}

export const delProfile = (username) => { // unfollow a user
  return request({
    method: 'delet',
    url: `/api/profiles/${username}/follow`
  })
}

export const getComments = (slug) => { // get comments for an article
  return request({
    method: 'get',
    url: `/api/articles/${slug}/comments`
  })
}

export const CreateComment = (slug, comment) => { // create a comment for an article
  return request({
    method: 'post',
    url: `/api/articles/${slug}/comments`,
    data: comment
  })
}

export const delComment = (slug, id) => { // delete a comment for an article
  return request({
    method: 'post',
    url: `/api/articles/${slug}/comments${id}`
  })
}