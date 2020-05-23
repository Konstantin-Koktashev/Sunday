import React, { Component } from 'react'
import { connect } from 'react-redux'
import localBoardService from '../services/localBoardService'
import { saveBoard, loadBoards } from '../actions/boardActions'
import { loadUsers } from '../actions/UserActions'


class AddPerson extends Component {
    state = {
        usersToAdd: null
    }

    async componentDidMount() {
        await this.props.loadUsers()
        // this.props.column.persons =  await this.props.column.persons ? this.props.column : [];
        console.log('this.proops' , this.props.column)

    }

    addPerson = (person) => {
        const column = this.props.column
        const currBoard = this.props.currBoard
        const newBoard = localBoardService.addPersonToColumn(currBoard, column, person)
        saveBoard(newBoard)
        loadBoards()
    }
    searchPeople = (e) => {
        e.preventDefault()
        const users = this.props.users
        const usersToAdd = users.filter(user => {
            user.name.includes(e.target.value)
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
        const users = this.props.column.persons
        console.log('user', users)
        const usersToAdd = this.state.usersToAdd
        return (
            <div className='person-component'>
                <section className='people-in-task'>
                    {users && users.map(user => {
                        return (<section className='peron-preview-delet'>
                            <button className='person-preview'>{user.username}</button>
                            <button className='person-remove' onClick={() => this.removePerson(user)}>X</button>
                        </section>)
                    })}
                    {/* {!users&&    <input onChange={(e)=>this.searchPeople(e)}></input>} */}
                </section>
                < input onChange={(e) => this.searchPeople(e)}>
                </input>
                <hr></hr>
                <span>People:</span>
                <section className='found-people'>
                    {usersToAdd && usersToAdd.map(user => {
                        return (
                            <article className='min-user-card' onClick={() => this.addPerson(user)}>
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
