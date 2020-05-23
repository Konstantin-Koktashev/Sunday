import React, { Component } from 'react'
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
  removePerson=(person)=>{
    const column=this.props.column
    const currBoard=this.props.currBoard
    const newBoard=  localBoardService.removePersonToTask(currBoard,person,column)
    this.props.saveBoard(newBoard)
    this.props.loadBoards()
  }

    render() {
        const users= this.props.users
        const usersToAdd=this.state.usersToAdd
        return (
            <div>
                <section className='people-in-task'>
                    {users&&users.map(user=>{
                        return(<section className='peron-preview-delet'>
                        <button className='person-preview'>{user.name}</button>
                        <button className='person-remove' onClick={()=>this.removePerson(user)}>X</button>
                        </section>)
                    })}
                    {!users&&    <input onChange={(e)=>this.searchPeople(e)}></input>}
                </section>
                < input onChange={(e)=>this.searchPeople(e)}>
                    <hr></hr>
                    <span>People:</span>
                    <section className='found-people'>
                        {usersToAdd && usersToAdd.map(user=>{
                            return(
                                <article className='min-user-card' onClick={()=>this.addPerson(user)}>
                                    <img></img>
                            <span>{user.name}</span>
                                </article>
                            )
                        })}
                        <div className='invite-with-email'>
                            <img></img>
                            <span>Invite User By Email</span>
                        </div>
                    </section>
                </input>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users:state.user.users,
    currBoard:state.userBoards.board,
    currUser:state.users.loggedInUser
})


const mapDispatchToProps = {
    saveBoard,
    loadBoards
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson)
