import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom'
import history from './history';
import './App.css';

import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import { BoardApp } from './pages/Boards';


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <nav>
          <Link to="/login">Login</Link> |
          <Link to="/">User Reviews</Link> |
          <Link to="/signup">signup</Link>
        </nav>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/board" component={BoardApp} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
