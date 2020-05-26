import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { connect } from 'react-redux'
import { loadUsers } from './actions/UserActions'
import { loadBoards } from './actions/BoardActions'
import history from './history';
import './App.css';
import './style/main.css';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Boards from './pages/Boards';
import SideNav from './cmps/SideNav';
import BoardNav from './cmps/Board/BoardNav';
import ProgressBar from './cmps/Statistics/ProgressBar'
import MyWeek from './pages/MyWeek'
import Inbox from './pages/Inbox';
import TaskDetails from './cmps/Tasks/TaskDetails';
import LabelContainer from './cmps/Columns/LabelContainer';
import FilterByText from './cmps/Filters/FilterByText';
import Profile from './pages/Profile.js';
import SocketService from './services/SocketService';
import Chat from './cmps/Chat/Chat';
import DoughnutChart from './cmps/Statistics/DoughnutChart'
import Notifications from './cmps/Notifications';
import UserChatList from '../src/cmps/Chat/UserChatList'
class App extends React.Component {
  state = {
    notificationsIsShown: false,
    chatWith: null
  }
  async componentDidMount() {
    SocketService.setup()
    await this.props.loadUsers()
    await this.props.loadBoards()
    const { currUser } = this.props
    this.setState({
      currUser, chatWith: {
        id: this.props.boards[0]._id,
        type: 'board'
      }
    })
    // SocketService.on('hello' , data=>{
    //   console.log('data' , data)
    // })
  }

  componentWillUnmount() {
    SocketService.terminate()
  }




  setPrivateChat = (userId, toUserId) => {
    console.log("App -> setPrivateChat -> userId, toUserId", userId, toUserId)

    this.setState({
      chatWith: {
        id: { userId, toUserId },
        type: 'private'
      }
    })
  }


  setBoardChat = (boardId) => {
    this.setState({
      chatWith: {
        id: boardId,
        type: 'board'
      }
    })
  }

  toggleNotifications = () => {
    this.setState(({ notificationsIsShown }) => ({
      notificationsIsShown: !notificationsIsShown,
    }));
  };

  logOut = (ev) =>{
    ev.stopPropagation()
    sessionStorage.clear();
    history.push('/login')

  }



  render() {
    return (
      <div className="App">
        <Router history={history}>

          <div className="bgc-black">
            <>
              {/* <userChatList chatObjects={} ></userChatList> */}
              {this.props.currUser && <SideNav logOut={this.logOut} toggleNotifications={this.toggleNotifications} user={this.props.currUser}></SideNav>}
              {this.props.currUser && <BoardNav></BoardNav>}
              {this.props.currUser && this.props.board && this.state.notificationsIsShown && <Notifications toggleNotifications={this.toggleNotifications}></Notifications>}
            </>
          </div>
          {/* {this.props.currUser && this.props.board && this.props.chatWith && <Chat user={this.props.currUser} ></Chat>}
          <UserChatList></UserChatList> */}




          <section className="main-board-container ">
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
              <Route path="/profile/:id?" component={Profile} exact />
              <Route path="/stat" component={DoughnutChart} exact />
            </Switch>
            <div className="loading-container fade-out">
              <div className="col-sm-2">
                <div id="nest6"></div>
              </div>
            </div>
          </section >
        </Router >

      </div >
    );
  }
}
const mapStateToProps = (state) => ({
  currUser: state.user.loggedInUser,
  board: state.userBoards.currBoard,
  boards: state.userBoards.board,
  chatWith: state.user.chatWith
});
const mapDispatchToProps = {
  loadUsers,
  loadBoards
};
export default connect(mapStateToProps, mapDispatchToProps)(App);