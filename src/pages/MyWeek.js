import React, { Component } from 'react'
import { connect } from 'react-redux';
import { loadBoards } from '../actions/BoardActions'
import WeekPreview from '../cmps/WeekPreview'


class MyWeek extends Component {

    state = {
        openTasks: null,
        closeTasks: null

    }

    async componentDidMount() {
        await this.props.loadBoards()
        this.currUser = await this.props.user
        if (!this.currUser) return
        this.loadTasks(this.currUser)
    }

    loadTasks = async (loggedUser) => {
        var groupsArr = [];
        var tasksArr = [];
        let { board } = await this.props.boards
        const groups = await board.map(b => b.groups)
        await groups.forEach(group => {
            groupsArr.push(...group)
        });
        groupsArr.forEach(group => {
            tasksArr.push(...group.tasks)
        })
        var userTasks = tasksArr.filter(task => task.users.find(user => user._id === loggedUser._id))
        let openTasks = [];
        let closeTasks = []
        userTasks.forEach(task => {
            if (task.status === 'Done') closeTasks.push(task)
            else openTasks.push(task)
        })


        this.setState({ openTasks, closeTasks })



    }





    render() {
        const user = this.props.user ? this.props.user.name : 'guest - please login to view your week'
        const { closeTasks, openTasks } = this.state
        return (

            <>
                <div className="header-container-myweek">
                    <h3>Wellcome {user}</h3>
                </div>

                {!openTasks && !closeTasks && <h3>No tasks for this week</h3>}

                <section className="my-week">
                    {openTasks && openTasks.length && <h3>Open Tasks</h3>}
                    {openTasks && openTasks.map((task, idx) => <WeekPreview {...task} key={idx} />)}
                </section>




                <section className="my-week">
                    {closeTasks && closeTasks.length && <h3>Closed Tasks</h3>}
                    {closeTasks && closeTasks.map((task, idx) => <WeekPreview {...task} key={idx} />)}
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
