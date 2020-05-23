import React, { Component } from 'react'
import LabelPreviewUnEdit from './LabelPreviewUnEdit'
import LabelPreviewEdit from './LabelPreviewEdit'

import { connect } from 'react-redux'
import localBoardService from '../services/localBoardService'

import { saveBoard } from '../actions/boardActions'


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
    setLabel = (label) => {
        const { currBoard } = this.props
        const board = localBoardService.changeColumn(currBoard, label , label.value)
        this.props.saveBoard(board)
        //find the label with the order and set the label on the props who props column who submit the label
        // console.log('got to set label with order num:', order)


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
                    <div className="label-submit" onClick={(ev) => this.saveChanges(ev)}>
                        Apply
                </div>
                }





            </section>
        )
    }
}

const mapStateToProps = (state) => {
    //State of the store to props of the cmp
    return {
        boards: state.userBoards.board,
        currBoard: state.userBoards.currBoard

    };
};
const mapDispatchToProps = {
    saveBoard

};

export default connect(mapStateToProps, mapDispatchToProps)(LabelContainer);
