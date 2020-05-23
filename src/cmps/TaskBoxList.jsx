import React, { Component } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "../../node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.cjs";
import TaskBox from "./TaskBox";
import localBoardService from "../../src/services/localBoardService";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: "1px",
  // margin: `0 ${grid}px 0 0`,
  fontSize: "13px",

  // change background colour if dragging
  background: isDragging ? "#b2bec3" : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#74b9ff" : "white",
  display: "flex",
  // padding: grid, // No n eed
  overflow: "auto",
});

export class TaskBoxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.board.columns,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.items) !==
      JSON.stringify(this.props.board.columns)
    ) {
      this.setState({
        items: this.props.board.columns,
      });
    }
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
    // let order = [];
    // items.forEach((item) => {
    //   order.push(item.order);
    // });

    console.log("TaskBoxList -> onDragEnd -> items", items);

    let board = this.props.board;
    let newBoard = localBoardService.updateColumnOrder(board, items);
    this.props.updateBoardColOrder(newBoard);
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="task-box-list-cont flex a-center j-center"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable
                  key={item.order}
                  draggableId={item.order}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="group-col-box"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {<TaskBox isTaskBox={true} col={item}></TaskBox>}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
