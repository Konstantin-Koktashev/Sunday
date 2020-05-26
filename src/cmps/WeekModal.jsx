import React from "react";

import SmallImg from "../cmps/SmallImg";
import { connect } from "react-redux";
import { saveBoard, loadBoards } from "../actions/BoardActions";
import LocalBoardService from "../services/LocalBoardService";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();



class WeekModal extends React.Component {
  componentDidMount() {
    console.log("modal-props", this.props);
  }

  changePriority = () => {
    console.log("changing priority");
  };

  changeStatus = () => {
    console.log("changing status");
  };

  containerClicked = (ev) => {
    ev.stopPropagation();

  };
  onChangeDueDate = () => {

  }
  onChangeTaskGroup = async (group) => {
    const { task } = this.props;
    const currBoard = this.props.currBoard
    const boardAfterAdding = LocalBoardService.addTaskToGroup(currBoard, group, task)
    const boardAfterRemoving = LocalBoardService.removeTaskFromGroup(currBoard, group, task)
    await this.saveAndLoad(boardAfterAdding)
  }
  onAddMemebers = () => {

  }
  findTaskGroups = () => {
    const { task } = this.props;
    const boards = this.props.userBoards
    const taskGroups = []
    boards.forEach(board => {
      board.groups.forEach(group => {
        if (group.tasks.some(t => t._id === task._id)) taskGroups.push(...board.groups);
      })
    })
    taskGroups.forEach(group => {
      group.value = group.name
      group.label = group.name
    })
    return taskGroups
  }
  saveAndLoad = async (board) => {
    await this.props.saveBoard(board)
    await this.props.loadBoards()
  }
  findCurrTaskGroup = () => {
    const { task } = this.props;
    const boards = this.props.userBoards
    const group = boards.find(board => {
      return board.groups.find(g => {
        return g.tasks.find(t => {
          return t._id === task._id
        })
      })
    })
    group.value = group.name
    group.label = group.name
    return group
  }

  render() {
    const groupOptions = this.findTaskGroups()
    const x = this.findCurrTaskGroup()
    const { task } = this.props;
    return (
      <div className="week-modal">
        <div onClick={() => this.props.closeModal()} className="modal-screen">
          <section className="week-modal-opts">
            <div
              onClick={(ev) => this.containerClicked(ev)}
              className="opts-container"
            >

              <div className="flex col j-center a-center">
                <h2>{task.text}</h2>
              </div>

              <div className="opts-bar flex">
                {/* <div className="opts-title">Group</div>
                <div className="opts-info">unvalid right now</div> */}
                Groups:
                 <Select options={groupOptions} components={animatedComponents} defaultValue={x} onChange={(e) => this.onChangeTaskGroup(e)} />
              </div>

              <div className="opts-bar">
                <div className="opts-title">Members</div>
                <div className="opts-info">
                  {task.users.map((user, idx) => (
                    <SmallImg
                      zindex={idx}
                      url={user.imgUrl}
                      name={user.username}
                      key={idx}
                    />
                  ))}
                </div>
              </div>

              <div className="opts-bar">
                <div className="opts-title">Priority</div>
                <div
                  className="opts-info"
                  onClick={() => this.changePriority()}
                >
                  {task.priority}
                </div>
              </div>

              <div className="opts-bar">
                <div className="opts-title">Status</div>
                <div className="opts-info" onClick={() => this.changeStatus()}>
                  {task.status}
                </div>
              </div>

              <div className="opts-bar">
                <div className="opts-title">Due Date</div>
                <div className="opts-info">{task.DueDate}</div>
              </div>

              <div className="opts-bar">
                <div className="opts-title">Project</div>
                <div className="opts-info">unvalid yet</div>
              </div>

              <div className="opts-bar">
                <div className="opts-title">Time Est</div>
                <div className="opts-info">unvalid yet</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userBoards: state.userBoards.board,
  currUser: state.user,
  currBoard: state.userBoards.currBoard
});


const mapDispatchToProps = {
  saveBoard,
  loadBoards
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekModal);
