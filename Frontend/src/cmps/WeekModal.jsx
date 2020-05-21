import React from 'react'

import SmallImg from '../cmps/SmallImg'

export default class WeekModal extends React.Component {

    componentDidMount() {

        console.log('modal-props', this.props)
    }

    changePriority = () => {
        console.log('changing priority')
    }

    changeStatus = () => {
        console.log('changing status')
    }

    containerClicked = (ev) => {
        ev.stopPropagation()
    }

    render() {
        const { task } = this.props
        return (
            <div className="week-modal">
                <div onClick={() => this.props.closeModal()} className="modal-screen">


                    <section className="week-modal-opts">

                        <div onClick={(ev) => this.containerClicked(ev)} className="opts-container">

                            <h2>{task.text}</h2>


                            <div className="opts-bar">
                                <div className="opts-title">Group</div>
                                <div className="opts-info">unvalid right now</div>
                            </div>

                            <div className="opts-bar">
                                <div className="opts-title">Members</div>
                                <div className="opts-info">{task.users.map((user, idx) => <SmallImg zindex={idx} url={user.imgUrl} name={user.name} key={idx} />)}</div>
                            </div>

                            <div className="opts-bar">
                                <div className="opts-title">Priority</div>
                                <div className="opts-info" onClick={() => this.changePriority()}>{task.priority}</div>
                            </div>

                            <div className="opts-bar">
                                <div className="opts-title">Status</div>
                                <div className="opts-info" onClick={() => this.changeStatus()}>{task.status}</div>
                            </div>

                            <div className="opts-bar">
                                <div className="opts-title">Due Date</div>
                                <div className="opts-info">{task.DueDate}</div>
                            </div>

                            <div className="opts-bar">
                                <div className="opts-title">Project</div>
                                <div className="opts-info">unvalid yet</div>
                            </div>

                            <div className="opts-bar">
                                <div className="opts-title">Time Est</div>
                                <div className="opts-info">unvalid yet</div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        )
    }
}
