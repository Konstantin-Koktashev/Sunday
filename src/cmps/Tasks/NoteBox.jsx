import React, { Component } from 'react'
import { loadBoards, saveBoard } from '../../actions/BoardActions';
import { connect } from 'react-redux';

 class NoteBox extends Component {
    state = {
        txt: '',
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({ txt: e.target.value });
    }
    render() {
        return (
            <div>
                <h3>Notes List</h3>
                <form className="send-btn-inbox flex col a a-center" onSubmit={(e) => { this.props.addNoteToTask(e,this.state.txt) }}>
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

export default connect(null, mapDispatchToProps)(NoteBox)

