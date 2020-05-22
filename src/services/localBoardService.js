import { saveBoard } from '../actions/boardActions.js'

let gBoards = null
export default {
    // query,
    // save,
    remove,
    getById,
    addGroup,
    addTask,
    removeTask,
    removeGroup,
    changeGroupName,
    updateTaskName,
    addColumn,
    removeCol,
    updateColumnTitle,
    updateColumnText,
    addPersonToColumn,
    updateNumberColumn,
    changeColumn,
    removePersonToTask,
    changeTaskDateColumn

}



// groups //

//add group
function addGroup(board, group) {
    group._id = makeId()
    board.groups.push(group)
    return board
}



//remove group
function removeGroup(board, group) {
    const gIdx = board.groups.findIndex(g => g._id === group._id)
    board.groups.splice(gIdx, 1)
    return board
}

//update groupName
function changeGroupName(board, group, name) {
    group.name = name
    return board
}


///////////////////////////////////////////

// tasks //

//add task
function addTask(board, group, task) {
    task._id = makeId()
    group.tasks.push(task)
    return board
}

//remove task
function removeTask(board, group, task) {
    const idx = group.tasks.findIndex(t => t._id === task._id)
    group.tasks.splice(idx, 1)
    return board
}

//update task title
function updateTaskName(board, task, title) {
    task.taskTitle = title
    return board

}


///////////////////////////////////////////////////////

// main cloums//  

// add col
function addColumn(board, column) {
    column._id = makeId()
    board.groups.forEach(group => group.tasks.push(column))
    board.groups.forEach(group => group.tasks.forEach(task => task.push(column)))

    //need to CHECK !
    return board
}

// remove col


function removeCol(board, column, group) {
    const boardColIdx = board.columns.findIndex(col => col.order === column.order)
    board.columns.forEach(col => col.splice(boardColIdx, 1))
    const tasksColIdx = board.group[0].tasks[0].columns.findIndex(col => col.order === column.order)
    board.groups.forEach(gr => {
        gr.tasks.forEach(task => {
            task.columns.splice(tasksColIdx, 1)
        })
    })
    return board
}


// update column
function updateColumnTitle(board, column, text) {
    column.value = text
    return board
}


/////////////////////////////////////////////////////////////

/// text column ///
function updateColumnText(board, column, text) {
    column.value = text
    return board
}


/// person column ///

function addPersonToColumn(board, person, column) {
    column.push(person)
    return board
}
function removePersonToTask(board, person, column) {
    const personIdx = column.findIndex(pers => pers._id === person._id)
    column.splice(personIdx, 1)
    return board
}



// number column //

// update number //

function updateNumberColumn(board, column, num) {
    column.value = num
    return board
}



// date column //

function changeTaskDateColumn(board, column, date) {
    column.value = date
    return board
}




/// try generic
function changeColumn(board, column, value) {
    column.value = value
    return board
}







// function setBoards(boards) {
//     console.log("setBoards -> boards", boards)
//     gBoards = boards
// }






function changeTasklabelColumn(board, column, label) {
    column.value = label
    return board
}

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