import React from "react";

import SmallImg from "../cmps/SmallImg";
import WeekModal from "../cmps/WeekModal";

export default class WeekPreview extends React.Component {
  state = {
    modal: false,
  };
  componentDidMount() {
    console.log('props from wweeek' , this.props);
  }

  openModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    console.log("props", this.props);
    const { modal } = this.state;
    const {text , tasktitle , status , priority , users } =this.props
    return (
      <div className="week-preview">
        <div className="week-prev-text">
          <p className="week-prev-title"> {text}</p>
          <p className="week-prev-desc"> Board -> Source</p>
        </div>
        {users.map((user, idx) => (
          <SmallImg zindex={idx} url={user.imgUrl} name={user.username} key={idx} />
        ))}
        <div
          onClick={() => this.openModal()}
          className={`${this.props.status} week-status`}
        >
          {this.props.status || "R"}
        </div>
        {modal && <WeekModal closeModal={this.closeModal} task={this.props} />}
      </div>
    );
  }
}
