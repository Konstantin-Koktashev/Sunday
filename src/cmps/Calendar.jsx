import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { moment } from 'moment';

import { connect } from 'react-redux'
import localBoardService from '../services/localBoardService';
import { saveBoard } from '../actions/boardActions';



   class DatePicker extends Component {


    onChange = async date =>{
        let currBoard=this.props.currBoard
        const dateToSet=date.getMonth()+' ' +date.getDate()
        const momentToSet=moment(date).format('MM-DD')
       const newBoard= localBoardService.changeColumn(currBoard,this.props.column,dateToSet)
        saveBoard(newBoard)
    }
    render() {
        // const taskDueDate=new Date(this.props.column.value)
        var x= new Date(1590831130)
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={x}
                    howWeekNumbers
                    hover
                    
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currBoard: state.userBoards.currBoard
})

const mapDispatchToProps = {
    saveBoard,

}
export default connect(mapStateToProps, mapDispatchToProps)(DatePicker)
