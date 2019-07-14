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
        "todos": res.data || [],
        "links": parse(res.headers.link)
      }
    })
  }

  listFavoriteArticles(page=1) {
    return axios.get(`${this.baseUrl}/api/todos?isDoing=true&_page=${page}&_limit=50`).then((res) => {
      return {
        "todos": res.data || [],
        "links": parse(res.headers.link)
      }
    })
  }

  showPage(id) {
    return axios.get(`${this.baseUrl}/api/todos/${id}`).then((res) => {
      return { "todos": res.data }
   })
  }

  updateTodo(id, params) {
    return axios.put(`${this.baseUrl}/api/todos/${id}`, params).then((res) => {
      return { "todo": res.data }
    })
  }

  postTodo(title) {
    var uniqueId = function(digits) {
    var strong = typeof digits !== 'undefined' ? digits : 1000;
    return Date.now().toString(16) + Math.floor(strong * Math.random()).toString(16);
}

    return axios.post(`${this.baseUrl}/api/todos/`, {id: uniqueId(),title: title,isDoing:false}).then((res) => {
      return { "todo": res.data }
    })
  }

  deleteTodo(id) {

    return axios.delete(`${this.baseUrl}/api/todos/` + id).then((res) => {
      return { "todo": res.data }
    })
  }

}
