import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import localBoardService from '../services/localBoardService';
import { connect } from 'react-redux'

import { saveBoard} from '../actions/boardActions'

 class DateSelector extends Component {

  handleChange = async({ target }) => {
    let value = target.value
    const {currBoard , column}= this.props
    let board = localBoardService.changeColumn(currBoard ,column , value)
    await this.props.saveBoard(board)


  }
  render() {
    return (
      <div>
        <form className={"classes.container"} noValidate>
          <TextField
            id="date"
            label="Due date"
            type="date"
            defaultValue={this.props.column.value}
            className={"classes.textField"}
            InputLabelProps={{
              shrink: true,
            }}
            onInput={(ev) => this.handleChange(ev)}
          />
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  currBoard: state.userBoards.currBoard
});

const mapDispatchToProps = {
  saveBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSelector);

