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
    }

    componentDidMount() {
        this.loadLabels()
    }

    loadLabels = () => {
        this.setState({
            labels: [{
                order: 1,
                color: 'green',
                value: 'Done'
            },
            {
                order: 2,
                color: 'orange',
                value: 'Working'
            }, {
                order: 3,
                color: 'red',
                value: 'Stuck'
            }]

        })
    }

    // UNEDIT
    setLabel = (color, text) => {
        console.log('color', color, 'text', text)
        const { currBoard } = this.props
        const column = this.props.column
        const board = localBoardService.changeLabelColumn(currBoard, column, text, color)
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
        const label = {
            color: 'blue',
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
        const { isEditAble, labels } = this.state
        return (
            <section className="label-container">
                {!isEditAble && labels &&
                    labels.map((label, idx) => {
                        return <LabelPreviewUnEdit setLabel={this.setLabel} key={idx} isEdit={false} value={label.value} color={label.color} order={label.order} />
                    })
                }

                {isEditAble && labels &&
                    labels.map((label, idx) => {
                        return <LabelPreviewEdit
                            key={idx} value={label.value} color={label.color} order={label.order} onRemove={this.onRemove} setLabel={this.setLabel} />
                    })
                }

                {!isEditAble &&
                    <div className="label-submit" onClick={(ev) => this.toggleEdit(ev)}>
                        Add / Edit Labels
                </div>
                }
                {isEditAble &&
                    <>

                        <div onClick={ev => this.addLabel(ev)}>Add Label</div>

                        <div className="label-submit" onClick={(ev) => this.saveChanges(ev)}>Apply</div>

                    </>

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
