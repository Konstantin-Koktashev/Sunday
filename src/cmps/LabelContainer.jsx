import React, { Component } from "react";
import LabelPreviewUnEdit from "./LabelPreviewUnEdit";
import LabelPreviewEdit from "./LabelPreviewEdit";

import { connect } from "react-redux";
import localBoardService from "../services/localBoardService";

import { saveBoard, loadBoards, setCurrBoard } from "../actions/boardActions";

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
        },
        {
          _id: "222v",
          color: "#00a8ff",
          value: "Working",
        },
        {
          _id: "333b",
          color: "#eb2f06",
          value: "Stuck",
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
  setLabel = (label, color, text) => {
    console.log("label", label);
    console.log("color", color);
    console.log("text", text);
    const { currBoard } = this.props;
    const board = localBoardService.changeLabelColumn(
      currBoard,
      label,
      color,
      text
    );
    console.log("board after change", board);
    this.props.saveBoard(board);
    this.props.toggleContainer();
    this.props.loadBoards();
    this.props.setCurrBoard(board);

    //find the label with the order and set the label on the props who props column who submit the label
  };

  setColumn = (color, text) => {
    const { currBoard, column } = this.props;
    const board = localBoardService.setColumn(currBoard, column, color, text);
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
    };
    const column = this.props.column;
    const currBoard = this.props.currBoard;
    const board = localBoardService.addLabel(currBoard, column, label);
    this.props.saveBoard(board);
    this.props.toggleContainer();
    this.props.loadBoards();
    this.props.setCurrBoard(board);
  };

  render() {
    const { isEditAble, labels, allLabels } = this.state;
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
            <div onClick={(ev) => this.addLabel(ev)}>Add Label</div>
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
  };
};
const mapDispatchToProps = {
  saveBoard,
  loadBoards,
  setCurrBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelContainer);

///value={label.value} color={label.color} id={label._id} order={label.order}
