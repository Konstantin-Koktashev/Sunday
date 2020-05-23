import React, { Component } from 'react'
import LabelPreviewUnEdit from './LabelPreviewUnEdit'
import LabelPreviewEdit from './LabelPreviewEdit'

import { connect } from 'react-redux'
import localBoardService from '../services/localBoardService'

import { saveBoard, loadBoards, setCurrBoard } from '../actions/boardActions'


class LabelContainer extends Component {
    state = {
        isEditAble: false,
        labels: null,
        allLabels: null
    }

    componentDidMount() {
        console.log('labels', this.props.labels)
        var HardCoded;
        if (this.props.labels) {
            HardCoded = [
                {
                    _id: '111a',
                    color: 'green',
                    value: 'Done'
                },
                {
                    _id: '222v',
                    color: 'orange',
                    value: 'Working'
                }, {
                    _id: '333b',
                    color: 'red',
                    value: 'Stuck'
                }
            ]
        }

        else if (this.props.priority) {
            HardCoded = [
                {
                    _id: '111safa',
                    color: 'red',
                    value: 'High'
                },
                {
                    _id: '22afs2v',
                    color: 'purple',
                    value: 'Medium'
                }, {
                    _id: '3fsa33b',
                    color: 'blue',
                    value: 'Low'
                }
            ]

        }

        this.setState({ labels: HardCoded }, () => {
            this.loadAllLabels()
        })


    }

    loadAllLabels = () => {
        const labels = this.state.labels
        labels.push(...this.props.labels)
        this.setState({ allLabels: labels }, () => console.log('2', this.state))
    }

    // UNEDIT
    setLabel = (label, color, text, id) => {
        console.log('label' , label)
        console.log('color' , color)
        console.log('text' , text)

        const { currBoard } = this.props
        // const column = this.props.column
        const board = localBoardService.changeLabelColumn(currBoard, label, color, text)
        console.log('board after change', board)
        this.props.saveBoard(board)
        this.props.toggleContainer()
        this.props.loadBoards()
        this.props.setCurrBoard(board)

        //find the label with the order and set the label on the props who props column who submit the label


    }

    onRemove = (onRemove, orderId) => {

    }

    toggleEdit = (ev) => {
        ev.stopPropagation()
        this.setState(({ isEditAble }) => ({ isEditAble: !isEditAble }))
    }

    saveChanges = (ev) => {
        ev.stopPropagation()
        this.setState(({ isEditAble }) => ({ isEditAble: !isEditAble }))

    }

    addLabel = (ev) => {
        ev.stopPropagation()
        let label = {
            color: 'gray',
            value: 'New Label'
        }
        const column = this.props.column
        const currBoard = this.props.currBoard
        const board = localBoardService.addLabel(currBoard, column, label)
        this.props.saveBoard(board)
        this.props.toggleContainer()
        this.props.loadBoards()
        this.props.setCurrBoard(board)




    }






    render() {
        const { isEditAble, labels, allLabels } = this.state
        console.log('thisthis', this.state)
        return (
            <section className="label-container">

                {isEditAble && labels &&
                    this.props.labels.map((label, idx) => {
                        return <LabelPreviewEdit
                            key={idx} label={label} onRemove={this.onRemove} setLabel={this.setLabel} />
                    })
                }

                {isEditAble &&
                    <>
                        <div onClick={ev => this.addLabel(ev)}>Add Label</div>
                        <div className="label-submit" onClick={(ev) => this.saveChanges(ev)}>Apply</div>

                    </>

                }







                {!isEditAble && allLabels &&
                    allLabels.map((label, idx) => {
                        return <LabelPreviewUnEdit setLabel={this.setLabel} key={idx} isEdit={false} label={label} />
                    })
                }

                {!isEditAble &&
                    <div className="label-submit" onClick={(ev) => this.toggleEdit(ev)}>
                        Add / Edit Labels
                </div>
                }





            </section>
        )
    }
}

const mapStateToProps = (state) => {
    //State of the store to props of the cmp
    return {
        currBoard: state.userBoards.currBoard

    };
};
const mapDispatchToProps = {
    saveBoard,
    loadBoards,
    setCurrBoard

};

export default connect(mapStateToProps, mapDispatchToProps)(LabelContainer);


///value={label.value} color={label.color} id={label._id} order={label.order}