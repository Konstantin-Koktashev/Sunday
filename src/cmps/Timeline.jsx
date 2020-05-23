import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux'
import localBoardService from '../services/localBoardService';
import { saveBoard } from '../actions/boardActions';

 class Timeline extends Component {

    
        onChange = date => {
            let currBoard=this.props.currBoard
            const column=this.props.column
            const newStateDay=date[0].getDate()
            const newEndDate=date[1].getDate()
            const newMonth=date[0].getMonth()
            const newDate={
                newStateDay,
                newEndDate,
                newMonth
            }
            const newBoard=localBoardService.changeDueDateColumn(currBoard,column,newDate)
            saveBoard(newBoard)
        }
    
        render() {
            var x= new Date(1590831130)
            return (
                <div>
                    <Calendar
                        onChange={this.onChange}
                        value={x}
                        howWeekNumbers
                        selectRange
                        hover
                    />
                </div>
            )
    }
}

const mapStateToProps = (state) => ({
 currBoard: state.userBoards.currBoard

})


const mapDispatchToProps = {
    saveBoard,
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)

