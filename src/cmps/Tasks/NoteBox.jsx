import React, { Component } from 'react'
import { loadBoards, saveBoard } from '../../actions/BoardActions';

 class NoteBox extends Component {
    state = {
        txt: ''
    }
    handleChange = (e) => {
        this.setState({ txt: e.target.value });

    }
    addNoteToTask = async (e) => {
        const task = this.props.task
        const currBoard = this.props.CurrBoard
        const noteWithTimeStamp = { type: 'note', noteText: this.state.txt, timeStamp: Date.now() }
        task.notes.unshift(noteWithTimeStamp)
        await this.props.saveBoard(currBoard)
        this.props.loadBoards()
        this.getBoxesToRender()
    }
    render() {
        return (
            <div>
                <h3>Notes List</h3>
                <form className="send-btn-inbox flex col a a-center" onSubmit={(e) => { this.addNoteToTask(e, update, update.boardId) }}>
                    <input placeholder="Write a reply..." onChange={(e) => this.handleChange(e)} ></input>
                    <button type='submit'>Send</button>
                </form>
            </div>
        )
    }
}




const mapDispatchToProps = {
    loadBoards,
    saveBoard,
}

export default connect( mapDispatchToProps)(NoteBox)

