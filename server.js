const jsonServer = require('json-server')
const server = jsonServer.create()

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://todoapp124573195.herokuapp.com")
  //res.header("Access-Control-Allow-Origin", "http://localhost:3000")
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
      "title": 'クライアントのフロントを作成する',
      "isdoing": false
    })

    todos.push({
      "id": 2,
      "title": 'サーバを立てる',
      "isdone": true
    })


  return { "todos": todos }
}

module.exports = server
