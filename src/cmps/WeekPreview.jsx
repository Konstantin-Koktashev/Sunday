import React from "react";

import SmallImg from "../cmps/SmallImg";
import WeekModal from "../cmps/WeekModal";

export default class WeekPreview extends React.Component {
  state = {
    modal: false,
  };
  componentDidMount() {
    console.log('props from wweeek', this.props);
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
    const { text, tasktitle, status, priority, users, taskTitle, groupName } = this.props
    return (
      <div className="week-preview">
        <div className="week-prev-text">
          <p className="week-prev-title">{taskTitle}</p>
          {groupName && <p className="week-prev-desc">  from {groupName} group</p> }
          
        </div>
        {users.map((user, idx) => (
          <SmallImg zindex={idx} url={user.imgUrl} name={user.username} key={idx} />
        ))}
        <div
          onClick={() => this.openModal()}
          className={`${status} week-status`}
        >
          {status}
        </div>
        {modal && <WeekModal closeModal={this.closeModal} task={this.props} />}
      </div>
    );
  }
}
