import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import localBoardService from '../services/localBoardService'
import { loadBoards } from '../actions/boardActions'
import { loadUsers } from '../actions/UserActions'

 class UsersPreviewBox extends Component {
    componentDidMount(){
        this.props.loadUsers()
    }
    render() {
        const people=[]??this.props.people
        return (
            <div className='person-preview flex' onClick={()=>{this.props.togglePersonBox()}}>
                {people.map(person=>{
                    return (<div >{person.username}</div>)
                
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loadBoards,
    loadUsers
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPreviewBox)
