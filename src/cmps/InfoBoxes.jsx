import React, { Component } from 'react'
import { saveBoard, loadBoards } from '../actions/BoardActions'
import { connect } from 'react-redux'
import NoteBox from './Tasks/NoteBox'
 class InfoBoxes extends Component {
    state = {
        boxesToRender: [],
        note:'',
        isNoteBoxShown:false,
        isFileBoxShown:false,
    }
    componentDidMount(){
        this.getBoxesToRender()
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
 
    addNoteToTask = async (e,txt) => {
        e.preventDefault()
        const task = this.props.task
        const currBoard = this.props.CurrBoard
        const noteWithTimeStamp = { type: 'note', txt, timeStamp: Date.now() }
        task.notes.unshift(noteWithTimeStamp)
        this.getBoxesToRender()
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

    openNotBox=()=>{
        this.setState({isNoteBoxShown:true})
    }
    render() {
const {boxesToRender}=this.state
const isAddNoteShows=this.state.isNoteBoxShown
        return (
            <div className='info-boxes-btns'>
                <div className='info-Boxes-btns'>
                    <button onClick={() => { this.openNotBox() }}>Add Note</button>
                    <h2>INFO BOXES PAGE</h2>
                    {isAddNoteShows&& <NoteBox></NoteBox>}
                </div>
             {boxesToRender&&boxesToRender.map(box=>{
                 return(<article className='info-box note'>
                     <h3>{box.type}</h3>
                    {box.txt}
                 </article>)
             })}
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
    saveBoard,
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoBoxes)

