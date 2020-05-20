import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../style/pages/inbox.css'
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
                        <div className='complete-Task Btn'>V</div>
                        <section className='history-header flex'>
                            <div className='user-logo'>

                            </div>
                            <div className='updating-user'>
                                {history.name}

                                <div className='history-origin'>
                                    {history.path}
                                </div>
                                <div>11 22 33</div>
                            </div>
                        </section>
                        <section className='update-msg'>
                            {history.defaultMsg}
                            <span className='prev-value-inbox'> {history.prevValue}</span>
                            <span className='arrow-logo'>>{}</span>

                            <span className='next-value-inbox'>{history.nextValue}</span>
                        </section>
                        <section className='like-reply-btns'>
                            <button className='reply'>Reply</button>
                            <button className='like'> >Like</button>
                        </section>
                        <section className='like-reply-btns'>
                            <button className='reply'>Great Job!</button>
                            <button className='like'> >Thanks I'll take it from here</button>
                            <button className='like'> >Nice Work! Whats next?</button>
                        </section>
                    </article>)

                })}
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
