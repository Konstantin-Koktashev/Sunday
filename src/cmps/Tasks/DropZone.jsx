import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { saveBoard, loadBoards } from '../../actions/BoardActions';

class DropZone extends Component {
  // state = {
  //   filesToRender: []
  // }
  // onChangeHandler=event=>{
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //     loaded: 0,
  //   })
  // }
  savefileToTask = (event) => {
    const task = this.props.task
    const currBoard = this.props.CurrBoard
    const fileWithTimeStamp={file:event.target.files[0],timeStamp:Date.now()}
    task.files.unshift(fileWithTimeStamp)
    this.props.saveBoard(currBoard)
    this.props.loadBoards()

  }


  render() {
    return (
      <div className='download-wrapper'>
        <input type="file" name="file" onChange={this.onChangeHandler} />
      </div>
      // {filesToRender&&filesToRender.map(=>{

      // })}

    )
  }
}

const mapStateToProps = (state) => ({
  currBoard: state.userBoards.currBoard
})


const mapDispatchToProps = {
  loadBoards,
  saveBoard,

}


export default connect(mapStateToProps, mapDispatchToProps)(DropZone)
