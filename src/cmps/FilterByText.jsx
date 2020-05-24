import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";
import localBoardService from "../services/localBoardService";

// import { setFilter} from '../actions/boardActions'

 class FilterByText extends Component {

  handleChange = ({ target }) => {
    let value = target.value;
    // const { currBoard } = this.props;
    // console.log("cur", currBoard);
    this.props.setFilter(value)

  };
  render() {
    return (
      <div>
        <TextField
          id="standard-basic"
          label="Filter"
          placeholder="Search By Text"
          onChange={(ev) => this.handleChange(ev)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
   
})

const mapDispatchToProps = {
  // setFilter

}
export default connect(mapStateToProps, mapDispatchToProps)(FilterByText)
