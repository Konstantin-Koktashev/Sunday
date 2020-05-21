import boardServices from '../services/boardServices.js'


export function updateBoard(board) {
    return dispatch => {
        const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD'
        boardServices.saveBoard(board)
            .then(savedBoard => dispatch({ type, board: saveBoard }))
    }
}