import { request } from '../plugins/request.js'

export const getTags = (data) => {
  return request({
    method: 'get',
    url: '/api/tags',
    data
  })
}
