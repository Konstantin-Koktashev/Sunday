import React, { Component } from "react";
import LabelPreviewUnEdit from "./LabelPreviewUnEdit";
import LabelPreviewEdit from "./LabelPreviewEdit";

import { connect } from "react-redux";
import LocalBoardService from "../../services/LocalBoardService";

import {
  saveBoard,
  loadBoards,
  setCurrBoard,
} from "../../actions/BoardActions";

class LabelContainer extends Component {
  state = {
    isEditAble: false,
    labels: null,
    allLabels: null,
  };

  componentDidMount() {
    console.log("labels", this.props.labels);
    var HardCoded;
    if (this.props.type === "label") {
      HardCoded = [
        {
          _id: "111a",
          color: "#44bd32",
          value: "Done",
          status: "Done",
        },
        {
          _id: "222v",
          color: "#00a8ff",
          value: "Working",
          status: "Working",
        },
        {
          _id: "333b",
          color: "#eb2f06",
          value: "Stuck",
          status: "Stuck",
        },
      ];
    } else if (this.props.type === "priority") {
      HardCoded = [
        {
          _id: "111safa",
          color: "#eb2f06",
          value: "High",
        },
        {
          _id: "22afs2v",
          color: "#5f27cd",
          value: "Medium",
        },
        {
          _id: "3fsa33b",
          color: "#00a8ff",
          value: "low",
        },
      ];
    }

    this.setState({ labels: HardCoded }, () => {
      this.loadAllLabels();
    });
  }

  loadAllLabels = () => {
    const labels = this.state.labels;
    if (this.props.labels) labels.push(...this.props.labels);

    this.setState({ allLabels: labels }, () => console.log("2", this.state));
  };

  // UNEDIT
  setLabel = async (label, color, text) => {
    const { currBoard } = this.props;
    const board = LocalBoardService.changeLabelColumn(
      currBoard,
      label,
      color,
      text
    );
    await this.props.saveBoard(board);
    await this.props.toggleContainer();
    await this.props.loadBoards();
    await this.props.setCurrBoard(board);

    //find the label with the order and set the label on the props who props column who submit the label
  };

  setColumn = (color, text) => {
    const task = this.props.task;
    const { currBoard, column, currUser } = this.props;
    let updateInfo = {
      column,
      user: currUser,
      nextValue: text,
      updateType: "Label Change",
      task,
    };
    let board = LocalBoardService.addBoardHistory(currBoard, updateInfo);
    board = LocalBoardService.setColumn(currBoard, column, color, text, task);
    // board = LocalBoardService.addBoardHistory(board, updateInfo)
    this.props.saveBoard(board);
    this.props.toggleContainer();
    this.props.loadBoards();
    this.props.setCurrBoard(board);
  };

  onRemove = (onRemove, orderId) => {};

  toggleEdit = (ev) => {
    ev.stopPropagation();
    this.setState(({ isEditAble }) => ({ isEditAble: !isEditAble }));
  };

  saveChanges = (ev) => {
    ev.stopPropagation();
    this.setState(({ isEditAble }) => ({ isEditAble: !isEditAble }));
  };

  addLabel = (ev) => {
    ev.stopPropagation();
    let label = {
      color: "lightgray",
      value: "New Label",
      status: "new",
    };
    const column = this.props.column;
    const currBoard = this.props.currBoard;
    const board = LocalBoardService.addLabel(currBoard, column, label);
    this.props.saveBoard(board);
    this.props.toggleContainer();
    this.props.loadBoards();
    this.props.setCurrBoard(board);
  };

  render() {
    const { isEditAble, allLabels } = this.state;
    let labelsFromProps =
      this.props.labels && this.props.labels.length > 0
        ? this.props.labels
        : [];
    return (
      <section className="label-container fade-in-editor flex col">
        {isEditAble &&
          labelsFromProps &&
          labelsFromProps.map((label, idx) => {
            return (
              <LabelPreviewEdit
                key={idx}
                label={label}
                onRemove={this.onRemove}
                setLabel={this.setLabel}
              />
            );
          })}

        {isEditAble && (
          <>
            <div className="add-label-btn" onClick={(ev) => this.addLabel(ev)}>
              Add Label
            </div>
            <div
              className="label-submit"
              onClick={(ev) => this.saveChanges(ev)}
            >
              Go Back
            </div>
          </>
        )}

        {!isEditAble &&
          allLabels &&
          allLabels.map((label, idx) => {
            return (
              <LabelPreviewUnEdit
                setColumn={this.setColumn}
                key={idx}
                isEdit={false}
                label={label}
              />
            );
          })}

        {!isEditAble && (
          <div className="label-submit" onClick={(ev) => this.toggleEdit(ev)}>
            Add / Edit Labels
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  //State of the store to props of the cmp
  return {
    currBoard: state.userBoards.currBoard,
    currUser: state.user.loggedInUser,
  };
};
const mapDispatchToProps = {
  saveBoard,
  loadBoards,
  setCurrBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelContainer);

///value={label.value} color={label.color} id={label._id} order={label.order}
