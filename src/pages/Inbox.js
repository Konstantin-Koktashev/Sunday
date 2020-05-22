import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EditTask from '../cmps/EditTask'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core';
import theme from '../style/themes/inboxTheme';
import '../style/pages/inbox.css'
import checkbox from '../style/img/checkbox.png'
import SimpleReactCalendar from 'simple-react-calendar'

class Inbox extends Component {

    checkUserHistory = () => {
        const { board } = this.props.userBoards
        const currUserId = this.props.currUser.loggedInUser._id
        var totalUserHistory = []
        board.forEach(board => {
            let userPersonalHistory = board.history.filter(history => {
                return history.users.filter(user => +user._id === currUserId) && history.type === 'status'
            })
            totalUserHistory.push(...userPersonalHistory)
        });
        return totalUserHistory
    }
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
    }
    componentDidUpdate() { }

    render() {
        const userHistory = this.checkUserHistory()


        console.log("Inbox -> render -> userHistory", userHistory)
        return (

            <div className='inbox-container'>
                <h2>Inbox</h2>
                {userHistory.map(history => {
                    console.log("Inbox -> render -> history", history)
                    return (<article className='user-history flex col'>
                        <img className='complete-task' src={checkbox}></img>
                        <section className='history-header flex col a-start'>
                            <div className='user-logo'>

                            </div>
                            <div className='updating-user'>
                                {history.name}

                            </div>
                            <div className='history-origin'>
                                {history.path}
                            </div>
                            <div className='inbox-icons'>11 22 33</div>
                        </section>
                        <section className='update-msg flex a-center'>
                            <span>{history.defaultMsg}</span>
                            <div className='user-history-main-btns flex a-center '>

                                <button className='prev-value-inbox'> {history.prevValue}</button>
                                <span className='arrow-logo'> </span>

                                <button className='next-value-inbox'>{history.nextValue}</button>
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
                <EditTask></EditTask>

            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    userBoards: state.userBoards,
    currUser: state.user
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)
