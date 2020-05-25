import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Editupdate from '../cmps/Editupdate'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import theme from '../style/themes/inboxTheme';
import '../style/pages/inbox.css'
import checkbox from '../style/img/checkbox.png'
import SimpleReactCalendar from 'simple-react-calendar'
import { loadBoards, saveBoard, setCurrBoard } from '../actions/boardActions';
import TimeLine from '../cmps/Timeline';
import calendar from 'simple-react-calendar/lib/calendar/calendar';
import DatePicker from '../cmps/Calendar';
import TimeLineTest from '../cmps/TimeLineTest';
import AddPerson from '../cmps/AddPerson';
import { loadUsers } from '../actions/UserActions'
import { MaterialPicker } from 'react-color';
import MaterialUIPickers from '.././cmps/calendar2'
import { NavLink } from 'react-router-dom';
import localBoardService from '../services/localBoardService';


class Inbox extends Component {
    state = {
        user: this.props.currUser,
        filtertedUpdates: []
    }
    async componentDidMount() {
        await this.props.loadUsers()
        await this.checkUserHistory()
    }

    checkUserHistory = () => {

        console.log('ggggggggggggggggggggggggggggggg');
        const board = this.props.userBoards.board
        if (!this.props.currUser) return
        const currUserId = this.props.currUser._id
        const historyToRender = []
        for (var i = 0; i < board.length; i++) {
            let currBoard = board[i]
            for (var j = 0; j < currBoard.history.length; j++) {
                let currHistory = currBoard.history[j]
                if (!currHistory.user) continue;
                if (currHistory.user._id === currUserId && currHistory.updateType === 'Label Change') historyToRender.push(currHistory)
            }
        }


        debugger;
        let filtertedUpdates = []
        historyToRender.forEach(update => {
            let isSeen = false
            update.seenBy.forEach(user => {
                if (user._id === currUserId) {
                    isSeen = true
                    console.log("checking", user._id, 'and curr user id ', currUserId)
                }

            })
            if (!isSeen) filtertedUpdates.push(update)
        })
        debugger;
        this.setState({ filtertedUpdates })
        return Promise.resolve()
    }

    async updateById(newUpdate) {
        const user = this.props.currUser
        let board = this.props.userBoards.board
        board.forEach(board => {
            board.history.forEach(async update => {
                if (update._id === newUpdate._id) {
                    update.seenBy.push(user)
                    await this.props.saveBoard(board)
                    await this.props.setCurrBoard(board)
                    await this.props.loadBoards()
                    await this.checkUserHistory()
                }
            })
        })


    }


    setUpdateAsSeen = async (update) => {
        await this.updateById(update)

    }
    sendUpdateMsg = async (e, update) => {
        const currBoard = this.props.currBoard
        e.preventDefault()
        const value = e.target.value
        const updateMsg = { msg: value, sendBy: this.props.currUser }
        update.messeges.unshift(value)
        await this.props.saveBoard(currBoard)
        await this.props.setCurrBoard(currBoard)
        await this.props.loadBoards()
        await this.checkUserHistory()
    }
    render() {

        let userHistory = this.state.filtertedUpdates
        const isHistory = (userHistory.length) ? true : false
        const isLoading = this.props.currBoard
        if (!this.props.currUser) return <h1>No Logged User . </h1>
        return (

            <div className='inbox-container'>
                {!isHistory && <h1>Inbox Is Empty</h1>}
                <h2>Inbox</h2>
                {isHistory && isLoading && userHistory.map(update => {
                    return (<article className='user-history flex col'>
                        <img className='complete-task' src={checkbox} onClick={() => { this.setUpdateAsSeen(update) }}></img>
                        <section className='history-header flex col a-start'>
                            <div className='user-logo'>
                                <NavLink to={`/profile/${update.user._id}`}>{update.user.username}</NavLink>

                            </div>
                            <div className='updating-user'>
                                {update.title}

                            </div>
                            <div className='history-origin'>
                                <NavLink to={`/board/${update.boardId}`}>{update.boardName}</NavLink>

                            </div>
                            <div className='inbox-icons'>11 22 33</div>
                        </section>
                        <section className='update-msg flex a-center'>
                            <span>{update.title}</span>
                            <div className='user-history-main-btns flex a-center '>

                                <button className='prev-value-inbox'> {update.prevValue}</button>
                                <span className='arrow-logo'> </span>

                                <button className='next-value-inbox'>{update.nextValue}</button>
                            </div>
                        </section>
                        <section className='like-reply-btns'>
                            <button className='reply'>Reply</button>
                            <button className='like'> Like</button>
                        </section>
                        <section className='task-reply-btns'>
                            <button className='great-job'>Great Job!</button>
                            <button className='take-it-from-here'> Thanks I'll take it from here</button>
                            <button className='next'> Nice Work! Whats next?</button>
                        </section>
                        <section className='add-update-msg flex'>
                            <NavLink to={`/profile/${this.props.currUser._id}`}>{this.props.currUser.username}</NavLink>

                            <form onSubmit={(e, update) => { this.sendUpdateMsg(e, update) }}>
                                <input clasName='inbox-reply'></input>
                                <button type='submit'>Send</button>
                            </form>
                        </section>
                        <section className='update-msgs'>
                            {update.messeges.length && update.messges.map(msg => {
                                return <div className='sent-msg-box'>
                                    <NavLink to={`/profile/${msg.sendBy._id}`}>{msg.sendBy.username}</NavLink>
                                    <div className='update-msg-content'>{msg.msg}</div>
                                </div>
                            })}
                        </section>
                    </article>)

                })}
                {/* {isLoading&&<Editupdate></Editupdate>} */}
                {/* <TimeLine></TimeLine>
                <DatePicker></DatePicker>
                <MaterialUIPickers></MaterialUIPickers> */}
                {/* <AddPerson></AddPerson> */}
                {/* <TimeLineTest></TimeLineTest> */}

            </div>
        )
    }

}


const mapStateToProps = (state) => ({
    userBoards: state.userBoards,
    currUser: state.user.loggedInUser,
    currBoard: state.userBoards.currBoard
})


const mapDispatchToProps = {
    loadBoards,
    loadUsers,
    saveBoard,
    setCurrBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)


