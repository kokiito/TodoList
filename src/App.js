import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, withRouter } from 'react-router-dom'

import Articles from './Pages'


const Header = ({onClick}) => (
  <h1 className="text-center" style={{cursor: "pointer" }} onClick={onClick}>ToDo List</h1>
)

const Nav = () => (
  <ul className="nav nav-pills">
    <li><NavLink exact to="/articles">--ToDoList--</NavLink></li>
    <li><NavLink exact to="/articles/favorite">--Done List--</NavLink></li>
  </ul>
)

const Footer = () => (<p className="text-center">ToDo List</p>)

const Routes = withRouter(({history}) => (
  <div className="container">
    <Header onClick={() => history.push("/")} />


    <Nav />
    <Switch>
      <Route exact path="/" component={Articles.List}/>
      <Route exact path="/articles" component={Articles.List}/>
      <Route exact path="/articles/favorite" component={Articles.DoneList}/>
      <Route exact path="/articles/:id" component={Articles.Show}/>
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
