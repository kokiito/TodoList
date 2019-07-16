import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {FaRegCheckSquare} from 'react-icons/fa'

import immutable from 'immutable'


import Api from './Api'

//const api = new Api(`http://127.0.0.1:4000`)
const api = new Api(`https://todoapp1990359.herokuapp.com`)

const FavoriteButton = ({isDoing, onClick}) => (
  <FaRegCheckSquare style={{cursor: "pointer"}} color={isDoing ? "#ffa500" : "#eee"} onClick={onClick} />)




  class List extends Component {

    constructor(props) {
      super(props)
      this.state = { todos: [],name: '' }
    }

    onInput = (e) => {
      this.setState({
        name: e.target.value
      });
    }

    addTodo(index) {
      const { todos, name } = this.state;
      api.postTodo(name).then((result) => {
          todos.push({
          id: result.todo.id,
          title: result.todo.title,
          isDoing: false,
        })
        this.setState({
          todos:todos
        })
      })
    }

    removeTodo = (index) => {
      const { todos, name } = this.state;
      this.setState({
        todos: [...todos.slice(0, index), ...todos.slice(index + 1)]
      });
      api.deleteTodo(todos[index].id)
    }


    componentWillMount() {
      api.listArticles().then((result) => {
        this.setState({todos: result.todos, current: 1})
      })
    }

    handleFavorite(todo, index) {
      todo.isDoing = todo.isDoing !== true
      api.updateTodo(todo.id, todo).then((result) => {
        const nextArticles = immutable.List(this.state.todos)
        nextArticles[index] = result.article
        this.setState({todos: nextArticles})
      })
    }

    render() {
      const { todos } = this.state;
      return (
        <div>
          <h2>Todos</h2>


          <ul>
            {this.state.todos.map((x, index) => (
              <li key={index}>
              <FavoriteButton isDoing={x.isDoing} onClick={() => this.handleFavorite(x, index)} />
                <Link to={`/pages/${x.id}`}>{x.title}</Link>
                {" "}

                <button onClick={() => { this.removeTodo(index) }}>削除</button>
              </li>
            ))}
          </ul>

          <input type="text" onInput={this.onInput} />
          <button onClick={() => this.addTodo(todos.length)} >登録</button>


        </div>
      )
    }
  }



class DoingList extends Component {

  constructor(props) {
    super(props)
    this.state = { todos: [] }
  }

  componentWillMount() {
    api.listFavoriteArticles().then((result) => {
      this.setState({todos: result.todos})
    })
  }

  render() {

    const {todos} = this.state

    return (
      <div>
        <h2>DoingList</h2>
        <ul>
        {this.state.todos.map((x, index) => (
          <li key={index}><Link to={`/pages/${x.id}`}>{x.title}</Link></li>
        ))}
        </ul>
      </div>
    )
  }
}

class Show extends Component {

  constructor(props) {
    super(props)
    this.state = { todos: {} }
  }

  componentWillMount() {
    const { id } = this.props.match.params
    api.showPage(parseInt(id, 10)).then((result) => {
      this.setState({todos: result.todos})
    })
  }

  render() {
    const {todos} = this.state
    return (
      <div>
        <h2>{todos.title}</h2>

      </div>
    )
  }
}

export default { List, DoingList, Show }
