import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import localBoardService from '../services/localBoardService'
import { saveBoard, loadBoards } from '../actions/boardActions'

export class AddPerson extends Component {
    state={
        usersToAdd:null
    }
  addPerson=(person)=>{
    const column=this.props.column
    const currBoard=this.props.currBoard
    // const usersToAdd=this.state.usersToAdd
  const newBoard=  localBoardService.addPersonToColumn(currBoard,column,person)
    saveBoard(newBoard)
    loadBoards()
  }
  searchPeople=(e)=>{
      e.preventDefault()
      const users= this.props.users
     const usersToAdd= users.filter(user=>{
        user.name.includes(e.target.value)
      })
      this.setState({usersToAdd})
  }

    render() {
        return (
            <div>
                <input onChange={(e)=>this.searchPeople(e)}></input>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users:state.user.users,
    currBoard:state.userBoards.board
})


const mapDispatchToProps = {
    saveBoard,
    loadBoards
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson)
