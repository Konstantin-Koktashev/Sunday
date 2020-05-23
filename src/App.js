import React from 'react';
import { Router, Switch, Route } from 'react-router';
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
import TaskDetails from './cmps/TaskDetails';
import LabelContainer from './cmps/LabelContainer';
import FilterByText from './cmps/FilterByText';


function App() {
  return (

    <div className="App">
      <Router history={history}>
        <div className="bgc-black">

          <SideNav></SideNav>
          <BoardNav></BoardNav>

        </div>
        <section className="main-board-container">
          <Switch>

            <Route path="/" component={Boards} exact />
            <Route path="/board/:id?" component={Boards} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/progress" component={ProgressBar} exact />
            <Route path="/myweek" component={MyWeek} exact />
            <Route path="/user/inbox" component={Inbox} exact />
            <Route path="/details" component={TaskDetails} exact />
            <Route path="/label" component={LabelContainer} exact />
            <Route path="/filter" component={FilterByText} exact />
          </Switch>
        </section>
      </Router>
      <div className="loading-container fade-out">
        <div className="col-sm-2">
          <div id="nest6"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
