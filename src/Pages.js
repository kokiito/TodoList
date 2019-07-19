import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {FaRegCheckSquare} from 'react-icons/fa'
import immutable from 'immutable'
import Api from './Api'


const api = new Api(`http://127.0.0.1:4000`)
//const api = new Api(`https://todoapp1990359.herokuapp.com`)

const CheckBox = ({isDone, onClick}) => (
  <FaRegCheckSquare style={{cursor: "pointer"}} color={isDone ? "#ffa500" : "#eee"} onClick={onClick} />)



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
          isDone: false,
        })
        this.setState({
          todos:todos,
          name:''
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
      api.listTodos().then((result) => {
        this.setState({todos: result.todos, current: 1})
      })
    }

    handleCheckBox(todo, index) {
      todo.isDone = todo.isDone !== true
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


          <ul className="siimple-list" style={{padding:'0px'}}>
            {this.state.todos.map((x, index) => (
              <li key={index}  className="siimple-list-item siimple--bg-white">
                <CheckBox isDone={x.isDone} onClick={() => this.handleCheckBox(x, index)} />
                <span style={{marginLeft:'20px'}}>{x.title}</span>
                {" "}

                <button onClick={() => { this.removeTodo(index) }} className="siimple-tag siimple-tag--error siimple-hover">delete</button>
              </li>
            ))}
          </ul>

          <div class="siimple-form">
            <div class="siimple-form-field">
              <div class="siimple-form-field-label">Enter your task </div>
              <input type="text" class="siimple-input siimple-input--fluid" onInput={this.onInput} value={this.state.name} placeholder="Your task" />
            </div>
            <div class="siimple-form-field">
              <div class="siimple-btn siimple-btn--green" onClick={() => this.addTodo(todos.length)} >Add</div>
            </div>
          </div>
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
      api.listDoings().then((result) => {
        this.setState({todos: result.todos})
      })
    }

    render() {

      const {todos} = this.state

      return (
        <div>
          <h2>DoingList</h2>
          <ul className="siimple-list" style={{padding:'0px'}}>
          {this.state.todos.map((x, index) => (
            <li key={index} className="siimple-list-item siimple--bg-white"><span>{x.title}</span></li>
          ))}
          </ul>
        </div>
      )
    }
  }



class DoneList extends Component {

  constructor(props) {
    super(props)
    this.state = { todos: [] }
  }

  componentWillMount() {
    api.listisDones().then((result) => {
      this.setState({todos: result.todos})
    })
  }

  render() {

    const {todos} = this.state

    return (
      <div>
        <h2>DoneList</h2>
        <ul className="siimple-list" style={{padding:'0px'}}>
        {this.state.todos.map((x, index) => (
          <li key={index} className="siimple-list-item siimple--bg-white"><span>{x.title}</span></li>
        ))}
        </ul>
      </div>
    )
  }
}


export default { List, DoingList, DoneList }
