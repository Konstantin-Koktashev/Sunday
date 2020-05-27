import React, { Component } from 'react'
export default class InfoBoxes extends Component {
    state = {
        boxesToRender: [],
        note:''
    }
    getBoxesToRender = () => {
        const task = this.props.task
        const boxesToRender = [...task.notes, ...task.files]
        boxesToRender.sort(function compare(a, b) {
            var dateA = new Date(a.timeStamp);
            var dateB = new Date(b.timeStamp);
            return dateA - dateB;
        });
        this.setState = { boxesToRender }
    }
    savefileToTask = async (event) => {
        const task = this.props.task
        const currBoard = this.props.CurrBoard
        const fileWithTimeStamp = { type: 'file', file: event.target.files[0], timeStamp: Date.now() }
        task.files.unshift(fileWithTimeStamp)
        await this.props.saveBoard(currBoard)
        this.props.loadBoards()
        this.getBoxesToRender()

    }
    saveNoteToTask = async (event) => {
        const task = this.props.task
        const currBoard = this.props.CurrBoard
        const fileWithTimeStamp = { type: 'note', 'noteText': event.target.value, timeStamp: Date.now() }
        task.notes.unshift(fileWithTimeStamp)
        await this.props.saveBoard(currBoard)
        this.props.loadBoards()
        this.getBoxesToRender()

    }
    handleNoteChange = (e) => {
        this.setState({ note: e.target.value });

    }
    handleFileAdd=(event)=>{
        event.stopPropagation()
    }
    AddNoteBox = () => {

    }
    creatInfoBox = (type) => {
        return {

        }
    }
    render() {
const {boxesToRender}=this.state
        return (
            <div className='info-boxes-btns'>
                <div className='info-Boxes-btns'>
                    <form onSubmit={this.handleSubmit()}>
                        <input type='file' onChange={this.savefileToTask}></input>
                        <button type='submit'>Add File</button>
                    </form>
                    <form onSubmit={(e)=>this.handleNoteChange(e)}>
                        <input type ='text'></input>
                        <button type='submit'>Add Note</button>
                    </form>
                    <button onClick={() => { this.AddNoteBox() }}>Add Note</button>
                    <h2>INFO BOXES PAGE</h2>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userBoards: state.userBoards,
    currUser: state.user.loggedInUser,
    currBoard: state.userBoards.currBoard
})


const mapDispatchToProps = {
    loadBoards,
    loadUsers,
    saveBoard,
    setCurrBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)

