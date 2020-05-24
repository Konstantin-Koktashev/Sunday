import React from "react";
import { connect } from "react-redux";
import "../style/cmps/progressBar.css";

class ProgressBar extends React.Component {
  componentDidMount() {
    console.log("e", this.props.boards);
    console.log('progressbargroups' , this.props.group)
  }

  showStatus = () => {
    const { group, boards } = this.props;
    // console.log(boards[0])
    // place 0 boards = this.props.boardIndex = the indexnumber of the currBoard.
    // place 0 groups = this.props.groupIndex = the indexnumber of the currGruop.
    const doneMissions = group.tasks.filter((task) => task.status === "Done");
    console.log("dm", doneMissions);
    if (doneMissions.length !== 0) {
      var precent = parseInt((doneMissions.length / group.tasks.length) * 100);
    } else precent = 0;
    console.log(precent)
    return precent;
  };
  render() {
    const pStyle = {
      width: `${this.showStatus()}%`,
    };
    return (
      <section className="progress-bar">
        <div className="full-width grey-status"></div>
        <div style={pStyle} className="color-status progress-bar-anim">
          <div>{this.showStatus()}%</div>
        </div>
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
