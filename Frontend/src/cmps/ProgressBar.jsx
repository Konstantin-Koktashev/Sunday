import React from "react";
import { connect } from "react-redux";

class ProgressBar extends React.Component {
  componentDidMount() {
    console.log("e", this.props.boards);
  }

  showStatus = () => {
    const { boards } = this.props.boards;
    // console.log(boards[0])
    // place 0 boards = this.props.boardIndex = the indexnumber of the currBoard.
    // place 0 groups = this.props.groupIndex = the indexnumber of the currGruop.
    const doneMissions = boards[0].groups[0].tasks.filter(
      (task) => task.status === "done"
    );
    console.log("dm", doneMissions);
    if (doneMissions.length !== 0) {
      var precent = parseInt((doneMissions.length / boards.length) * 100);
    } else precent = 0;
    return precent;
  };
  render() {
    const pStyle = {
      width: `${this.showStatus()}%`,
    };
    return (
      <section className="progress-bar">
        <div className="full-width grey-status"></div>
        <div style={pStyle} className="color-status"></div>
        <div className="the-nubmer">{this.showStatus()}%</div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.userBoards,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
