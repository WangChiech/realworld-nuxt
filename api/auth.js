import { request } from '@/plugins/request.js'

export const register = (data) => {
  return request({
    method: 'post',
    url: '/api/users',
    data
  })
}

export const login = (data) => {
  return request({
    method: 'post',
    url: '/api/users/login',
    data
  })
}

export const getUser = () => {
  return request({
    method: 'get',
    url: '/api/user'
  })
}