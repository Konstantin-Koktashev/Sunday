import React, { Component } from 'react'
import { connect } from 'react-redux';

import WeekPreview from '../cmps/WeekPreview'


class MyWeek extends Component {

    state = {
        userTasks: null
    }

    componentDidMount() {
        this.currUser = this.props.user
        console.log('thisuser', this.props)
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
        groupsArr.forEach(group => {
            tasksArr.push(...group.tasks)
        })
        var userTasks = tasksArr.filter(task => task.users.find(user => user._id === loggedUser._id))
        this.setState({ userTasks })


    }



    render() {
        const {userTasks} = this.state
        return (


            <section className="my-week">

                <h3>hey {this.props.user.name}</h3>
                {userTasks && userTasks.map((task , idx)=> <WeekPreview {...task} key={idx} />)}
            </section>

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
