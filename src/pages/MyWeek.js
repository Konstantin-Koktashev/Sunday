import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadBoards} from '../actions/boardActions'

import WeekPreview from '../cmps/WeekPreview'


class MyWeek extends Component {

    state = {
        userTasks: null
    }

    async componentDidMount() {
        await this.props.loadBoards()
        this.currUser = await this.props.user
        console.log('thisuser', this.props)
        if (!this.currUser) return
        this.loadTasks(this.currUser)
    }

    loadTasks = async (loggedUser) => {
        var groupsArr = [];
        var tasksArr = [];
        let { board } = await this.props.boards
        console.log('board' , board)
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
        const user = this.props.user ? this.props.user.name : 'guest - please login to view your week'
        const { userTasks, color } = this.state
        return (

            <>
                <div className="header-container-myweek">
                    <h3>Wellcome {this.props.user.name}</h3>
                </div>
                <section className="my-week">
                    {userTasks && userTasks.map((task, idx) => <WeekPreview {...task} key={idx} />)}


                </section>
            </>

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
    loadBoards
}


export default connect(mapStateToProps, mapDispatchToProps)(MyWeek)
