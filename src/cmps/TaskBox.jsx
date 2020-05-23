import React from "react";
import "../style/cmps/taskBox.css";
import LabelContainer from "./LabelContainer";
export class TaskBox extends React.Component {
  state = {
    containerIsShown: false,
  };
  toggleContainer = () => {
    this.setState(({ containerIsShown }) => ({
      containerIsShown: !containerIsShown,
    }));
  };

  dataToBox = () => {
    const col = this.props.col;
    let box;
    switch (col.type) {
      case "label":
        box = (
          <>
            <div className="label-box box-div" onClick={this.toggleContainer}>
              {col.value}
            </div>
            {this.state.containerIsShown && (
              <LabelContainer labels={col.labels} />
            )}
          </>
        );
        break;
      case "number":
        box = <div className="number-box box-div">{col.value}</div>;
        break;
      case "text":
        box = <div className="text-box box-div">{col.value}</div>;
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

// contentEditable="true"
