import React from "react";
import { Polar } from "react-chartjs-2";
import { connect } from "react-redux";

<<<<<<< HEAD
import { loadBoards } from "../actions/BoardActions";
=======

import React from 'react'
import { Polar } from 'react-chartjs-2';
import { connect } from 'react-redux'

import { loadBoards } from '../actions/BoardActions'

>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834

class DoughnutChart extends React.Component {
  state = {
    tasks: null,
    datasets: [
      {
        data: [11, 16, 7, 3],
        backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED"],
        label: "My dataset", // for legend
      },
    ],
    labels: ["Stuck", "Done", "Working", "Others"],
  };

  async componentDidMount() {
    const { board } = this.props;
    const tasks = await this.loadTasks(board);
    this.setState({ tasks }, () => {
      this.makeData(this.state.tasks);
    });
  }

  loadTasks = (board) => {
    var groupsArr = [];
    var tasksArr = [];
    board.groups.forEach((group) => {
      groupsArr.push(group);
    });
    groupsArr.forEach((group) => {
      tasksArr.push(...group.tasks);
    });
<<<<<<< HEAD
=======
    groupsArr.forEach(group => {
      tasksArr.push(...group.tasks)
    })


    return tasksArr


>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834

    return tasksArr;
  };

  makeData = (tasks) => {
<<<<<<< HEAD
    if (!tasks || !tasks.length) return;
    const doneCount = tasks.filter((task) => {
      if (task.status === "Done") return task;
      return;
    });
    const workingCount = tasks.filter((task) => {
      if (task.status === "Working") return task;
      return;
    });

    const stuckCount = tasks.filter((task) => {
      if (task.status === "Stuck") return task;
      return;
    });
=======
    if (!tasks || !tasks.length) return
    const doneCount = tasks.filter(task => {
      if (task.status === 'Done') return task
      return
    })
    const workingCount = tasks.filter(task => {
      if (task.status === 'Working') return task
      return
    })

    const stuckCount = tasks.filter(task => {
      if (task.status === 'Stuck') return task
      return
    })

    const otherCount = tasks.length - (doneCount.length + workingCount.length + stuckCount.length)

    // const data = [stuckCount.length, doneCount.length, workingCount.length, otherCount];


    const newData = [{
      data: [
        stuckCount.length,
        doneCount.length,
        workingCount.length,
        otherCount
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED'
      ],
      label: 'My dataset' // for legend
    }]

    this.setState({datasets : newData})


>>>>>>> bb0351bb85cbe9b7b9b31e2573ae0dad40884834

    const otherCount =
      tasks.length -
      (doneCount.length + workingCount.length + stuckCount.length);

    // const data = [stuckCount.length, doneCount.length, workingCount.length, otherCount];

    const newData = [
      {
        data: [
          stuckCount.length,
          doneCount.length,
          workingCount.length,
          otherCount,
        ],
        backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED"],
        label: "My dataset", // for legend
      },
    ];

    this.setState({ datasets: newData });
  };

  render() {
    return (
      <div>
        <div className="doughnut">
          <Polar data={this.state} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currBoard: state.userBoards.currBoard,
  boards: state.userBoards.board,
});

const mapDispatchToProps = {
  loadBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(DoughnutChart);
