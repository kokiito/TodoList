import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {FaRegCheckSquare} from 'react-icons/fa'

import immutable from 'immutable'


import Api from './Api'

const api = new Api(`http://127.0.0.1:4000`)

const FavoriteButton = ({isFavorite, onClick}) => (
  <FaRegCheckSquare style={{cursor: "pointer"}} color={isFavorite ? "#ffa500" : "#eee"} onClick={onClick} />)




class List extends Component {

    constructor(props) {
      super(props);
      this.state = {
        todos: [],
        name: ''
      };
    }

    onInput = (e) => {
      this.setState({
        name: e.target.value
      });
    }

    addTodo = () => {
      const { todos, name } = this.state;
      this.setState({
        todos: [...todos, name]
      });
    }

    removeTodo = (index) => {
      const { todos, name } = this.state;
      this.setState({
        todos: [...todos.slice(0, index), ...todos.slice(index + 1)]
      });
    }

    render() {
      const { todos } = this.state;
      return (<div>
        <input type="text" onInput={this.onInput} />
        <button onClick={this.addTodo} >登録</button>
        <ul>
          {todos.map((todo, index) => <li key={index}>
            {todo}
            <button onClick={() => { this.removeTodo(index) }}>削除</button>
          </li>)}
        </ul>
      </div>);
    }



}

class DoneList extends Component {

  constructor(props) {
    super(props)
    this.state = { articles: [] }
  }

  componentWillMount() {
    api.listFavoriteArticles().then((result) => {
      this.setState({articles: result.articles})
    })
  }

  render() {

    const {articles} = this.state

    return (
      <div>
        <h2>Favorites</h2>
        <ul>
        {this.state.articles.map((x, index) => (
          <li key={index}><Link to={`/articles/${x.id}`}>{x.title}</Link></li>
        ))}
        </ul>
      </div>
    )
  }
}

class Show extends Component {

  constructor(props) {
    super(props)
    this.state = { article: {} }
  }

  componentWillMount() {
    const { id } = this.props.match.params
    api.showArticle(parseInt(id, 10)).then((result) => {
      this.setState({article: result.article})
    })
  }

  render() {
    const {article} = this.state
    return (
      <div>
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </div>
    )
  }
}

export default { List, DoneList, Show }
