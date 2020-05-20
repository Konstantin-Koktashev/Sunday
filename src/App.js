import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom'
import history from './history';
import './App.css';

import Home from './pages/Home.js';
import Login from './pages/Login.js';
<<<<<<< HEAD
import Signup from './pages/Signup.js';
import { BoardApp } from './pages/Boards';
=======
import About from './pages/About.js';
import ProgressBar from './cmps/ProgressBar'
>>>>>>> 674cdb6b54f5f0908610f833a4a9394097b46cbb


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
<<<<<<< HEAD
          <Route path="/" component={Home} exact />
          <Route path="/board" component={BoardApp} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/signup" component={Signup} exact />

=======
          <Route path="/" component={Home} exact/>
          <Route path="/about" component={About} exact/>
          <Route path="/login" component={Login} exact/>
          {/* <Route path="/" component={About} exact/> */}
          <Route path="/progress" component={ProgressBar} exact/>
>>>>>>> 674cdb6b54f5f0908610f833a4a9394097b46cbb
        </Switch>
      </Router>
    </div>
  );
}

export default App;
