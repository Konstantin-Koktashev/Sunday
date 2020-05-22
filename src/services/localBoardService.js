import { saveBoard } from '../actions/boardActions.js'

let gBoards = null
export default {
    // query,
    // save,
    remove,
    getById,
    addGroup,
    setBoards

}

function setBoards(boards) {
    console.log("setBoards -> boards", boards)

    gBoards = boards
}

async function addGroup(boardID, group) {
    let board = getById(boardID)
    board.groups.push(group)
    try {
        await saveBoard(board)
    } catch (error) {
        console.log('Cant Add Group')
    }
}


// function save(boardId, boardToSave) {
//     if (boardToSave.id) {
//         const boardIdx = _getIdxById(boardToSave._id)
//         gBoards[boardIdx] = boardToSave;
//     } else {
//         const newBoard = _createBoard(boardToSave.vendor, boardToSave.price)
//         gBoards.push(newBoard)
//     }
// }

// function query() {
//     return gBoard  // return gBoards
// }
function remove(boardId) {
    const boardIdx = _getIdxById(boardId)
    gBoards.splice(boardIdx, 1)

}
function getById(boardId) {
    const board = gBoards.find(board => board._id === boardId)
    return board;
}
function _getIdxById(boardId) {
    return gBoards.findIndex(board => board._id === boardId)
}


function makeId(length = 3) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}