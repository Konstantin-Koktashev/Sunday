import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import Editupdate from '../cmps/Editupdate'
import { connect } from 'react-redux'
import theme from '../style/themes/inboxTheme';
import '../style/pages/inbox.css'
import checkbox from '../style/img/checkbox.png'
import SimpleReactCalendar from 'simple-react-calendar'
import { loadBoards, saveBoard, setCurrBoard } from '../actions/BoardActions';
import TimeLine from '../cmps/Timeline';
import calendar from 'simple-react-calendar/lib/calendar/calendar';
import DatePicker from '../cmps/Calendar';
import TimeLineTest from '../cmps/TimeLineTest';
import { loadUsers } from '../actions/UserActions'
import { NavLink } from 'react-router-dom';
import LocalBoardService from '../services/LocalBoardService.js';


class Inbox extends Component {
    state = {
        user: this.props.currUser,
        filtertedUpdates: [],
        txt: ''
    }
    async componentDidMount() {
        await this.props.loadUsers()
        this.checkUserHistory()
    }
    findBoard = (boardId) => {
        const board = this.props.userBoards.board.find(b => {
            return b._id === boardId
        })
        return board
    }
    saveAndUpdate = async (newBoard) => {
        const currBoard = this.props.currBoard;
        await this.props.saveBoard(newBoard)
        await this.props.setCurrBoard(currBoard)
        await this.props.loadBoards()
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
    sendUpdateMsg = async (e, update, boardId) => {
        if (e) e.preventDefault();

        const board = this.findBoard(boardId)
        const updateMsg = { msg: this.state.txt, sendBy: this.props.currUser }
        const newBoard = LocalBoardService.addUpdateMsg(board, update, updateMsg)
        // update.messeges.unshift(updateMsg)
        await this.saveAndUpdate(newBoard)
    }
    sendGreatJob = async (update, boardId) => {
        const board = this.findBoard(boardId)
        const updateMsg = { msg: 'Great Job!', sendBy: this.props.currUser }
        const newBoard = LocalBoardService.addUpdateMsg(board, update, updateMsg)
        await this.saveAndUpdate(newBoard)
    }
    sendTakeItFromHere = async (update, boardId) => {
        const board = this.findBoard(boardId)
        const updateMsg = { msg: 'Thanks Ill Take It From Here', sendBy: this.props.currUser }
        const newBoard = LocalBoardService.addUpdateMsg(board, update, updateMsg)
        await this.saveAndUpdate(newBoard)
    }
    sendNiceWork = async (update, boardId) => {
        const board = this.findBoard(boardId)
        const updateMsg = { msg: 'Nice Work! Whats Next?', sendBy: this.props.currUser }
        const newBoard = LocalBoardService.addUpdateMsg(board, update, updateMsg)
        await this.saveAndUpdate(newBoard)
    }




    handleChange = (e) => {
        this.setState({ txt: e.target.value });

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
                            <button className='great-job' onClick={() => this.sendGreatJob(update, update.boardId)}>Great Job!</button>
                            <button className='take-it-from-here' onClick={() => this.sendTakeItFromHere(update, update.boardId)}> Thanks I'll take it from here</button>
                            <button className='next' onClick={() => this.sendNiceWork(update, update.boardId)}> Nice Work! Whats next?</button>
                        </section>
                        <section className='add-update-msg flex'>
                            <NavLink to={`/profile/${this.props.currUser._id}`}>{this.props.currUser.username}</NavLink>

                            <form onSubmit={(e) => { this.sendUpdateMsg(e, update, update.boardId) }}>
                                <input onChange={(e) => this.handleChange(e)} ></input>
                                <button type='submit'>Send</button>
                            </form>
                        </section>
                        <section className='update-msgs'>
                            {update.messeges && update.messeges.length && update.messeges.map(msg => {
                                return <div className='sent-msg-box'>
                                    <NavLink to={`/profile/${msg.sendBy._id}`}>{msg.sendBy.username}</NavLink>
                                    <div className='update-msg-content'>{msg.msg}</div>
                                </div>
                            })}
                        </section>
                    </article>)

                })}

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


