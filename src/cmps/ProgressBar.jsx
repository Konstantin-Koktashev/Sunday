import React from 'react';
import { connect } from 'react-redux'



class ProgressBar extends React.Component {

    showStatus = () => {
        const { boards } = this.props
        const doneMissions = boards.groups.tasks.filter(task => task.status === 'done')
        if (doneMissions.length !== 0) {
            var precent = parseInt((doneMissions.length / boards.length) * 100);
        } else precent = 0
        return precent
    }
    render() {

        const pStyle = {
            width: `${this.showStatus()}%`
        }
        return (
            <section className="progress-bar">
                <div className="full-width" className="grey-status"></div>
                <div style={pStyle} className="color-status"></div>
                <div className="the-nubmer">{this.showStatus()}%</div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.board
    }
}
const mapDispatchToProps = {
    
}


export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar)
