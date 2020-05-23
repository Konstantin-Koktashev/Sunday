import React, { Component } from 'react'
import { connect } from 'react-redux'

import { TextField } from '@material-ui/core';
import localBoardService from '../services/localBoardService';


export default class FilterByText extends Component {

    state = {
        text: ''
    }


    handleChange = ({ target }) => {
        let value = target.value
        const { currBoard } = this.props
        console.log('cur', currBoard)
        localBoardService.filter(currBoard, value)
        console.log('thisValue', value)


    }
    render() {
        return (
            <div>
                <TextField id="standard-basic" label="Standard" placeholder="Search By Text" onChange={(ev) => this.handleChange(ev)} />
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     currBoard: state.userBoards.currBoard
// })

// const mapDispatchToProps = {


// }
// export default connect(mapStateToProps, mapDispatchToProps)(FilterByText)
