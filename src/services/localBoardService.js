import { saveBoard } from '../actions/boardActions.js'

let gBoards = null
export default {
    // query,
    // save,
    remove,
    getById,
    addGroup,
    setBoards,
    addTask,
    removeTask

}

function setBoards(boards) {
    console.log("setBoards -> boards", boards)
    gBoards = boards
}

function addGroup(board, group) {
    // let board = getById(boardID)
    board.groups.push(group)
    return board
    // try {
    //      saveBoard(board)
    // } catch (error) {
    //     console.log('Cant Add Group')
    // }
}

function removeTask(board, taskToRemove) {
    taskToRemove.
        console.log('board after add task', board)
    return board
}


function addTask(board, group, task) {
    group.tasks.push(task)
    return board
}

function addPersonToTask(board, person, task) {
    const column = task.columns.find(col => col.type === 'people')
    column.push(person)
    return board
}
function removePersonFromTask(board, person, task) {
    const columnIdx = task.columns.findIdx(col => col.type === 'people')
    task.columns.splice(columnIdx, 1)
    return board
}


function changeTaskDateColumn(board, task, date) {
    const col = task.columns.find(col => col.type === 'number')
    col.value = date
    return board
}
function changeTaskTextColumn(board, task, text) {
    const col = task.columns.find(col => col.type === 'text')
    col.value = text
    return board
}
function changeTasklabelColumn(board, column, label) {
    column.value = label
    return board
}








// function getGroupById(boardId, groupid) {
//     return getbyid(boardId)
//         .then(board => {
//             return board.groups.filter(group => group._id === groupid)
//         })
// }

// function getColumnById(boardId, groupId, colId) {
//     getGroupById(boardId, groupId)
//         .then(group => group.columns.filter(col => col._id === colId))
// }


// function getByid(boardId) {
//     var board = gBoards.find(board => board._id === boardId)
//     return Promise.resolve(board)
// }

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