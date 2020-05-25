import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EditTask from '../cmps/EditTask'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import theme from '../style/themes/inboxTheme';
import '../style/pages/inbox.css'
import checkbox from '../style/img/checkbox.png'
import SimpleReactCalendar from 'simple-react-calendar'
import { loadBoards } from '../actions/boardActions';
import TimeLine from '../cmps/Timeline';
import calendar from 'simple-react-calendar/lib/calendar/calendar';
import DatePicker from '../cmps/Calendar';
import TimeLineTest from '../cmps/TimeLineTest';
import AddPerson from '../cmps/AddPerson';
import { loadUsers } from '../actions/UserActions'
import { MaterialPicker } from 'react-color';
import MaterialUIPickers from '.././cmps/calendar2'
import { NavLink } from 'react-router-dom';


class Inbox extends Component {

    componentDidMount() {
        this.props.loadUsers()
    }
    uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))



    // checkUserHistory = () => {
    //     //   await  this.props.loadBoards()
    //     const { board } = this.props.userBoards
    //     if (!this.props.currUser.loggedInUser) return
    //     const currUserId = this.props.currUser.loggedInUser._id

    //     var totalUserHistory = []
    //     board.forEach(board => {
    //         let userPersonalHistory = board.history.filter(history => {
    //             return history.users.filter(user => user._id === currUserId) && history.type === 'status'
    //         })
    //         totalUserHistory.push(...userPersonalHistory)
    //     });
    //     const test ={

    //     }
    //     return totalUserHistory
    // }
    checkUserHistory = () => {
        const { board } = this.props.userBoards
        if (!this.props.currUser.loggedInUser) return
        const currUserId = this.props.currUser.loggedInUser._id
        const historyToRender=[]
        for(var i=0;i<board.length;i++){
            let currBoard=board[i]
            for(var j=0;j<currBoard.history.length;j++){
                let currHistory=currBoard.history[j]
                if(!currHistory.user) continue;
                if(currHistory.user._id===currUserId&&currHistory.updateType==='Label Change') historyToRender.push(currHistory)
            }
        }
        return historyToRender
    }
    // checkUserHistory = () => {
    //     //   await  this.props.loadBoards()
    //     // debugger
    //     const  board  = this.props.userBoards.board
    //     if (!this.props.currUser.loggedInUser) return
    //     const currUserId = this.props.currUser.loggedInUser._id
    //     let totalUserHistory = []
    //     board.forEach(board => {
    //         board.groups.forEach(group => {
    //             group.tasks.forEach(task => {
    //                 task.columns.forEach(column => {
    //                     debugger
    //                     if (column.type === 'people' &&  column.persons &&column.persons.length>0 && column.persons.some(person => person._id === currUserId) && task.isDone===true)totalUserHistory.push(task)
    //                 })
    //             })
    //         })
    //     })
    //     return totalUserHistory
    // }
    // checkAssociatedTaskIds=()=>{
    //     const { board } = this.props.userBoards
    //     board.forEach(board => {
    //         let userPersonalHistory = board.tasks.filter(task => {
    //             return task.filter(user => +user._id === currUserId) && history.type === 'status'
    //         })
    //         totalUserHistory.push(...userPersonalHistory)
    //     });
    // }

    componentDidMount() {
        console.log('I JUST MOUNTEDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
    }
    componentDidUpdate() { }
    removeFromInbox = () => {
    }
    render() {
        let userHistory = this.checkUserHistory()
        userHistory=this.uniqueArray(userHistory)
        const isHistory=(userHistory.length)?true:false
        //  this.props.loadBoards()
        const isLoading = this.props.currBoard
        if (!this.props.currUser.loggedInUser) return <h1>No Logged User . </h1>
        return (

            <div className='inbox-container'>
                {!isHistory && <h1>Inbox Is Empty</h1>}
                <h2>Inbox</h2>
                {isHistory&&isLoading && userHistory.map(task => {
                    return (<article className='user-history flex col'>
                        <img className='complete-task' src={checkbox} onClick={() => { this.removeFromInbox() }}></img>
                        <section className='history-header flex col a-start'>
                            <div className='user-logo'>

                            </div>
                            <div className='updating-user'>
                                {task.title}

                            </div>
                            <div className='history-origin'>
                <NavLink to={`/board/${task.boardId}`}>{task.boardName  }</NavLink>
                                
                            </div>
                            <div className='inbox-icons'>11 22 33</div>
                        </section>
                        <section className='update-msg flex a-center'>
                            <span>{task.title}</span>
                            <div className='user-history-main-btns flex a-center '>

                                <button className='prev-value-inbox'> {task.prevValue}</button>
                                <span className='arrow-logo'> </span>

                                <button className='next-value-inbox'>{task.nextValue}</button>
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
                    </article>)

                })}
                {/* {isLoading&&<EditTask></EditTask>} */}
                {/* <TimeLine></TimeLine>
                <DatePicker></DatePicker>
                <MaterialUIPickers></MaterialUIPickers> */}
                {/* <AddPerson></AddPerson> */}
                {/* <TimeLineTest></TimeLineTest> */}

            </div>
        )
    }
    // render() {
    //     const userHistory = this.checkUserHistory()
    //     //  this.props.loadBoards()
    //     const isLoading = this.props.currBoard
    //     if (!this.props.currUser.loggedInUser) return <h1>No Logged User . </h1>
    //     return (

    //         <div className='inbox-container'>
    //             <h2>Inbox</h2>
    //             {isLoading && userHistory.map(history => {
    //                 console.log("Inbox -> render -> history", history)
    //                 return (<article className='user-history flex col'>
    //                     <img className='complete-task' src={checkbox} onClick={() => { this.removeFromInbox() }}></img>
    //                     <section className='history-header flex col a-start'>
    //                         <div className='user-logo'>

    //                         </div>
    //                         <div className='updating-user'>
    //                             {history.name}

    //                         </div>
    //                         <div className='history-origin'>
    //                             {history.path}
    //                         </div>
    //                         <div className='inbox-icons'>11 22 33</div>
    //                     </section>
    //                     <section className='update-msg flex a-center'>
    //                         <span>{history.defaultMsg}</span>
    //                         <div className='user-history-main-btns flex a-center '>

    //                             <button className='prev-value-inbox'> {history.prevValue}</button>
    //                             <span className='arrow-logo'> </span>

    //                             <button className='next-value-inbox'>{history.nextValue}</button>
    //                         </div>
    //                     </section>
    //                     <section className='like-reply-btns'>
    //                         <button className='reply'>Reply</button>
    //                         <button className='like'> Like</button>
    //                     </section>
    //                     <section className='task-reply-btns'>
    //                         <button className='great-job'>Great Job!</button>
    //                         <button className='take-it-from-here'> Thanks I'll take it from here</button>
    //                         <button className='next'> Nice Work! Whats next?</button>
    //                     </section>
    //                 </article>)

    //             })}
    //             {/* {isLoading&&<EditTask></EditTask>} */}
    //             {/* <TimeLine></TimeLine>
    //             <DatePicker></DatePicker>
    //             <MaterialUIPickers></MaterialUIPickers> */}
    //             {/* <AddPerson></AddPerson> */}
    //             {/* <TimeLineTest></TimeLineTest> */}

    //         </div>
    //     )
    // }
}


const mapStateToProps = (state) => ({
    userBoards: state.userBoards,
    currUser: state.user,
    currBoard: state.userBoards.currBoard
})

const mapDispatchToProps = {
    loadBoards,
    loadUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)


