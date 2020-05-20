import React, { Component } from 'react'
import { connect } from 'react-redux';


class MyWeek extends Component {

    state = {
        userTasks: null
    }

    componentDidMount() {
        this.currUser = this.props.user
        console.log('thisuser', this.props.user)
        this.loadTasks(this.currUser)
    }

    loadTasks = async (loggedUser) => {
        var groupsArr = [];
        var tasksArr = [];
        let { board } = this.props.boards
        const groups = await board.map(b => b.groups)
        await groups.forEach(group => {
            groupsArr.push(...group)
        });
        console.log(groupsArr)
        await groupsArr.forEach(group => {
            tasksArr.push(...group.tasks)
        })
        var userTasks = await tasksArr.filter(task => task.users.find(user => user._id === loggedUser._id))
        this.setState({userTasks})
    }



    render() {
        return (
            <div>
                <h1>HELLO MY WEEK</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.userBoards,
        user: state.user.loggedInUser
    }
}
const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(MyWeek)
