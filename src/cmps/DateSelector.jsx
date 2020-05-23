import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import localBoardService from '../services/localBoardService';
import { connect } from 'react-redux'

import { saveBoard , loadBoards } from '../actions/boardActions'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


class DateSelector extends Component {
  state = {
    startDate: new Date()
  };

  async componentDidMount() {
    const startDate = await this.props.column.value
    let fixedDate =  new Date(startDate)
    if (startDate !== 'Date') this.setState({ startDate:fixedDate })
  }


  handleChange = async (date) => {
    let fixedDate =  date.getTime()
    const { currBoard, column } = this.props
    const board = localBoardService.changeColumn(currBoard, column, fixedDate)
    await this.props.saveBoard(board)
    await this.props.loadBoards()


  }
  render() {
    const { column } = this.props
    const value = (column.value === 'Date') ? (new Date()) : column.value
    return (
      <div>
        <form className={"classes.container"} noValidate>
<<<<<<< HEAD
          <TextField
            id="date"
            type="date"
            defaultValue={this.props.column.value}
            className={"classes.textField"}
            InputLabelProps={{
              shrink: true,
            }}
            onInput={(ev) => this.handleChange(ev)}
=======
          <DatePicker
            // id="date"
            // type="date"
            // defaultValue={this.props.column.value}
            // className={"classes.textField"}
            // InputLabelProps={{
            //   shrink: true,
            // }}
            // placeholderText="Click to select a date" 
            selected={this.state.startDate}
            onChange={(ev) => this.handleChange(ev)}
>>>>>>> 9bacb30650f704e3cf7b57fe5deb9736904a5d28
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
<<<<<<< HEAD
  currBoard: state.userBoards.currBoard,
=======

  currBoard: state.userBoards.currBoard
  
>>>>>>> 9bacb30650f704e3cf7b57fe5deb9736904a5d28
});

const mapDispatchToProps = {
  saveBoard,
<<<<<<< HEAD
=======
  loadBoards
>>>>>>> 9bacb30650f704e3cf7b57fe5deb9736904a5d28
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);
