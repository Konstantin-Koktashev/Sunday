import React from 'react'

import SmallImg from '../cmps/SmallImg'
import WeekModal from '../cmps/WeekModal'

export default class WeekPreview extends React.Component {

    state = {
        modal: false
    }
    componentDidMount() {
        console.log(this.props)

    }

    openModal = () => {
        this.setState({ modal: true })

    }

    closeModal = () => {
        this.setState({ modal: false })

    }


    render() {
        console.log('props' , this.props)
        const { modal } = this.state
        return (
            <div className="week-preview">
                <div className="week-prev-text">
                    <p> {this.props.text}</p>
                    <p> Board -> Source</p>
                </div>
                {this.props.users.map((user, idx) => <SmallImg zindex={idx} url={user.imgUrl} name={user.name} key={idx} />)}
                <div onClick={() => this.openModal()} className={`${this.props.status} week-status`}>{this.props.status || 'R'}</div>
                {modal && <WeekModal closeModal={this.closeModal} task={this.props} />}
            </div>
        )




    }
}
