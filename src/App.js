import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom'
import history from './history';
import './App.css';

import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import { BoardApp } from './pages/Boards';
import SideNav from './cmps/SideNav';
import ProgressBar from './cmps/ProgressBar'


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <SideNav></SideNav>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/board" component={BoardApp} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/progress" component={ProgressBar} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
