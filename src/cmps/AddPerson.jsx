import React, { Component } from 'react'
import { connect } from 'react-redux'
import localBoardService from '../services/localBoardService'
import { saveBoard, loadBoards } from '../actions/boardActions'
import { loadUsers } from '../actions/UserActions'


class AddPerson extends Component {
    state = {
        usersToAdd: null,
        isShown:false
    }

    async componentDidMount() {
        await this.props.loadUsers()
    }

    addPerson = (person) => {
        const column = this.props.column
        const currBoard = this.props.currBoard
        const newBoard = localBoardService.addPersonToColumn(currBoard, column, person)
        saveBoard(newBoard)
        loadBoards()
    }
    searchPeople = (e) => {
        debugger
        e.preventDefault()
        const users = this.props.users
        const usersToAdd = users.filter(user => {
          return  user.username.includes(e.target.value)
        })
        this.setState({ usersToAdd })
    }
    removePerson = (person) => {
        // const column=this.props.column
        // const currBoard=this.props.currBoard
        const { column, currBoard } = this.props
        const newBoard = localBoardService.removePersonToTask(currBoard, person, column)
        this.props.saveBoard(newBoard)
        this.props.loadBoards()
    }

    render() {
        const isShows=this.state.isShows
        const users = this.props.column.persons
        const allUsers=this.props.users
        console.log('user', users)
        const usersToAdd = this.state.usersToAdd
        return (
            <div className='person-component flex col'>
              
                    < input onChange={(e) => this.searchPeople(e)}/>
           
                  
                <section className='people-in-task'>
                    {users && users.map(user => {
                        return (<section className='peron-preview-delet'>
                            <button className='person-preview'>{user.username}</button>
                            <button className='person-remove' onClick={() => this.removePerson(user)}>X</button>
                        </section>)
                    })}
                    {/* {!users&&    <input onChange={(e)=>this.searchPeople(e)}></input>} */}
                </section>
                <hr></hr>
                <span>People:</span>
                <section className='found-people'>
                    {usersToAdd && usersToAdd.map(user => {
                        debugger
                        return (
                            <article className='min-user-card' onClick={() => this.addPerson(user)}>
                                <img></img>
                                <span>{user.username}</span>
                            </article>
                        )
                    })}
                    <div className='invite-with-email'>
                        <img></img>
                        <span>Invite User By Email</span>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    currBoard: state.userBoards.board,
    currUser: state.user.loggedInUser
})


const mapDispatchToProps = {
    saveBoard,
    loadBoards,
    loadUsers

}

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson)
