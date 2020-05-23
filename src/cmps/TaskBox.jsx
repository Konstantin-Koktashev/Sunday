import React from "react";
import "../style/cmps/taskBox.css";
import LabelContainer from "./LabelContainer";
import localBoardService from "../../src/services/localBoardService";
import { connect } from "react-redux";
import {
  saveBoard,
  removeBoard,
  setCurrBoard,
  loadBoards,
} from "../actions/boardActions";
class TaskBox extends React.Component {
  state = {
    containerIsShown: false,
    colIsEdit: false,
    colText: "",
  };
  toggleContainer = () => {
    this.setState(({ containerIsShown }) => ({
      containerIsShown: !containerIsShown,
    }));
  };

  toggleColEdit = () => {
    this.setState(({ colIsEdit }) => ({
      colIsEdit: !colIsEdit,
      colText: this.props.col.value,
    }));
  };

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ colText: value });
  };

  updateColTitle = (ev) => {
    ev.preventDefault();
    let { currBoard, col } = this.props;
    let text = this.state.colText;
    let newBoard = localBoardService.updateColumnTitle(currBoard, col, text);
    this.props.saveBoard(newBoard);
    this.props.loadBoards();
    this.toggleColEdit();
  };

  dataToBox = () => {
    const col = this.props.col;
    const { colIsEdit, containerIsShown, colText } = this.state;
    let box;
    switch (col.type) {
      case "label":
        box = (
          <>
            <div className="label-box box-div" style={{backgroundColor:col.color}} onClick={this.toggleContainer}>
              {col.value}
            </div>
            {containerIsShown && (
              <LabelContainer
                toggleContainer={this.toggleContainer}
                labels={col.labels}
                column={col}
                type={col.type}
              />
            )}
          </>
        );
        break;
      case "priority":
        box = (
          <>
            <div className="label-box box-div" style={{backgroundColor:col.color}} onClick={this.toggleContainer}>
              {col.value}
            </div>
            {containerIsShown && (
              <LabelContainer
                toggleContainer={this.toggleContainer}
                labels={col.labels}
                column={col}
                type={col.type}
              />
            )}
          </>
        );
        break;
      case "number":
        box = colIsEdit ? (
          <input
            type="text"
            name="colEdit"
            value={colText}
            onChange={this.handleChange}
            onBlur={(ev) => this.updateColTitle(ev)}
          />
        ) : (
          <div onClick={this.toggleColEdit} className="number-box box-div">
            {col.value}
          </div>
        );
        break;
      case "text":
        box = colIsEdit ? (
          <input
            type="text"
            name="colEdit"
            value={colText}
            onChange={this.handleChange}
            onBlur={(ev) => this.updateColTitle(ev)}
          />
        ) : (
          <div onClick={this.toggleColEdit} className="text-box box-div">
            {col.value}
          </div>
        );
        break;
      case "poeple":
        box = <div className="poeple-box box-div">{col.value}</div>;
        break;
      case "date":
        box = <div className="date-box box-div">{col.value}</div>;
        break;
      default:
        box = <div className="text-box box-div">{col.value}</div>;
        break;
    }
    return box;
  };

  render() {
    return (
      // <section onClick={() => this.props.removeCol(this.props.col)}>
      <section>{this.dataToBox()}</section>
    );
  }
}

const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    boards: state.userBoards.board,
    currBoard: state.userBoards.currBoard,
  };
};
const mapDispatchToProps = {
  saveBoard,
  removeBoard,
  setCurrBoard,
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskBox);
