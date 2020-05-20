import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

 class Inbox extends Component {
    
    checkItem=()=>{
    const userRelevantHistory=this.props.history
    const {_id,name}=userRelevantHistory
    }

    componentDidMount() {
       this.checkItem()
 }
 componentDidUpdate(){}

    render() {
        return (
            <div>
                User Inbox
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    history:state.userBoards.history,
    currUser:state.user.loggedInUser
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)
