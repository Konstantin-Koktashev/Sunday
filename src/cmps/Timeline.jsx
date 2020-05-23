import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux'

 class Timeline extends Component {

    
        onChange = date => this.setState({ date })
    
        render() {
            const task=this.props.task
            
            return (
                <div>
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                        howWeekNumbers
                        selectRange
                        hover
                    />
                </div>
            )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
