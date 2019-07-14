import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import parse from 'parse-link-header'

// https://github.com/mzabriskie/axios/issues/305#issuecomment-233141731
// for jest. force the node adapter
if (process.env.NODE_ENV === "test") {
  axios.defaults.adapter = httpAdapter
}

export default class Api {

  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  listArticles(page=1) {
    return axios.get(`${this.baseUrl}/api/todos?_page=${page}`).then((res) => {
      return {
        "articles": res.data || [],
        "links": parse(res.headers.link)
      }
    })
  }

  listFavoriteArticles(page=1) {
    return axios.get(`${this.baseUrl}/api/todos?isdoing=true&_page=${page}&_limit=50`).then((res) => {
      return {
        "articles": res.data || [],
        "links": parse(res.headers.link)
      }
    })
  }

  showPage(id) {
    return axios.get(`${this.baseUrl}/api/todos/${id}`).then((res) => {
      return { "todos": res.data }
   })
  }

  updateArticle(id, params) {
    return axios.put(`${this.baseUrl}/api/todos/${id}`, params).then((res) => {
      return { "article": res.data }
    })
  }

  postArticle(id, params) {
    return axios.put(`${this.baseUrl}/api/todos/${id}`, params).then((res) => {
      return { "article": res.data }
    })
  }

}
