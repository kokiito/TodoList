const jsonServer = require('json-server')
const server = jsonServer.create()

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://todoapp1990359.herokuapp.com")
  //res.header("Access-Control-Allow-Origin", "http://127.0.0.1:4000")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS")
  next()
})

const rewriter = jsonServer.rewriter({'/api/*': '/$1'})
const router = jsonServer.router(setTodos())

server.use(rewriter)
server.use(router)

function setTodos() {
  const todos = []

    todos.push({
      "id": 1,
      "title": 'コードを書く',
      "isdoing": false
    })

    todos.push({
      "id": 2,
      "title": 'サーバを立てる',
      "isdoing": true
    })


  return { "todos": todos }
}

module.exports = server
