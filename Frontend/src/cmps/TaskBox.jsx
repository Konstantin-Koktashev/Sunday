import React from "react";
import "../style/cmps/taskBox.css";
export class TaskBox extends React.Component {
  dataToBox() {
    const col = this.props.col;
    let box;
    switch (col.type) {
      case "label":
        box = <div className="label-box">{col.value}</div>;
        break;
      case "number":
        box = <div className="number-box">{col.value}</div>;
        break;
      case "text":
        box = <div className="text-box">{col.value}</div>;
        break;
      case "poeple":
        box = <div className="poeple-box">{col.value}</div>;
        break;
      case "date":
        box = <div className="date-box">{col.value}</div>;
        break;
      default:
        box = <div className="text-box">{col.value}</div>;
        break;
    }
    return box;
  }

  render() {
    return <section>{this.dataToBox()}</section>;
  }
}

// contentEditable="true"
