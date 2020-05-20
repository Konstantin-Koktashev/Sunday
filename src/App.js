import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { Link } from 'react-router-dom'
import history from './history';
import './App.css';
import './style/main.css';

import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Boards from './pages/Boards';
import SideNav from './cmps/SideNav';
import BoardNav from './cmps/BoardNav';
import ProgressBar from './cmps/ProgressBar'
import MyWeek from './pages/MyWeek'
import Inbox from './pages/Inbox';


function App() {
  return (
    <div className="App">
      <Router history={history}>
        <SideNav></SideNav>
        <BoardNav></BoardNav>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/board/:id?" component={Boards} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/progress" component={ProgressBar} exact />
          <Route path="/myweek" component={MyWeek} exact />
          <Route path="/user/inbox" component={Inbox} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
