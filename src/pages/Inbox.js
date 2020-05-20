import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Inbox extends Component {

    checkUserHistory = () => {
        const { board } = this.props.userBoards
        const currUserId = this.props.currUser.loggedInUser._id
        var totalUserHistory=[]
        board.forEach(board => {
            let userPersonalHistory  = board.history.filter(history => {
              return history.users.filter(user => +user._id === currUserId)
            })
            totalUserHistory.push(...userPersonalHistory)
        });
        return totalUserHistory
    }

    componentDidMount() {
    }
    componentDidUpdate() { }

    render() {
        const userHistory=this.checkUserHistory()
        const HistoryToRender={
            statusMsg:userHistory,

        }
        console.log("Inbox -> render -> userHistory", userHistory)
        return (
            <div className='Inbox'>
                {userHistory.map(history=>{
                    return (<article className='user-history'>
                        <section className='history-header'>
                            <div className='user-logo'></div>
                            <div className='updating-user'>
                            <div className='history-origin'></div>
                            </div>
                        </section>
                        <section className='update-msg'>
                            
                        </section>
                        <div className="flex">

                        </div>
                        {history.descryption}
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
