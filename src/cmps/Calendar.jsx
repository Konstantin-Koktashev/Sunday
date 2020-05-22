import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

 export default class DatePicker extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    howWeekNumbers
                    hover
                    
                />
            </div>
        );
    }
}