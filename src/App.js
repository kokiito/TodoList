import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, withRouter } from 'react-router-dom'
import Pages from './Pages'


const Header = ({onClick}) => (
  <h1 className="text-center" style={{cursor: "pointer" }} onClick={onClick}>ToDo List</h1>
)

const Nav = () => (
  <ul className="nav nav-pills">
    <li style={{marginRight:"50px"}} class="siimple-btn siimple-btn--grey"><NavLink exact to="/pages">ToDoList</NavLink></li>
    <li style={{marginRight:"50px"}} class="siimple-btn siimple-btn--grey"><NavLink exact to="/pages/doing">DoingList</NavLink></li>
    <li class="siimple-btn siimple-btn--grey"><NavLink exact to="/pages/done" >DoneList</NavLink></li>
  </ul>
)

const Footer = () => (<p className="text-center">ToDo List</p>)

const Routes = withRouter(({history}) => (
  <div className="container">
    <Header onClick={() => history.push("/")} />
    <Nav />
    <Switch>
      <Route exact path="/" component={Pages.List}/>
      <Route exact path="/pages" component={Pages.List}/>
      <Route exact path="/pages/doing" component={Pages.DoingList}/>
      <Route exact path="/pages/done" component={Pages.DoneList}/>
    </Switch>
    <Footer />
  </div>
))

const App = () => (
  <Router>
    <Routes />
  </Router>
)

export default App
