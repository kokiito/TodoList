import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, withRouter } from 'react-router-dom'
import Pages from './Pages'


const Header = ({onClick}) => (
  <h1 className="text-center" style={{cursor: "pointer" }} onClick={onClick}>ToDo List</h1>
)

const Nav = () => (
  <ul className="nav nav-pills">
    <li><NavLink exact to="/pages">--ToDoList--</NavLink></li>
    <li><NavLink exact to="/pages/doing">--Doning List--</NavLink></li>
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
      <Route exact path="/pages/doning" component={Pages.DoningList}/>
      <Route exact path="/pages/:id" component={Pages.Show}/>
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
