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
    changeTaskDateColumn,
    changeLabelColumn,
    addLabel,
    changeDueDateColumn,
    sortColumnsByBox,
    updateColumnOrder,
    setColumn,
    filter,
    changeDueDateColumn2
}




//Sort Cols

function sortColumnsByBox(cols, order) {
    cols = _mapOrder(cols, order, 'order')
    return cols
}



function _mapOrder(array, order, key) {
    array.sort(function (a, b) {
        var A = a[key],
            B = b[key];
        if (order.indexOf(A) > order.indexOf(B)) {
            return -1;
        } else {
            return 1;
        }
    });
    return array;
};


/// Update Columns (ON BOARD ) Order 
function updateColumnOrder(board, reOrderedCols) {
    board.columns = reOrderedCols
    return board
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
    task.assignedGroupId = group._id
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

function addPersonToColumn(board, column, person) {
    column.persons = typeof column.persons === 'array' ? column.persons : [];
    // column.persons = column.persons.length ? column.persons : [];
    column.persons.push(person)
    return board
}


function removePersonToTask(board, person, column) {
    column.persons = (column.persons && column.persons.length) ? column.persons : [];
    const personIdx = column.persons.findIndex(pers => pers._id === person._id)
    console.log('idx', personIdx)
    column.persons.splice(personIdx, 1)
    return board
}



// number column //

// update number //

function updateNumberColumn(board, column, num) {
    column.value = num
    return board
}



// date column //

function changeTaskDateColumn(board, column, momentToSet, task, date) {
    task.dueDate = date.getTime()
    column.value = momentToSet
    return board
}
function changeDueDateColumn(board, column, date) {
    column.stateDate = date.newStateDay
    column.endDate = date.newEndDate
    column.month = date.newMonth
    return board
}

function changeDueDateColumn2(board, column, date,originalDates) {
    column.startDate=originalDates[0].getTime()
    column.endDate=originalDates[1].getTime()
    column.startDate = date.from
    column.endDate = date.to
    return board
}




/// try generic
function changeColumn(board, column, value) {
    column.value = value
    return board
}

function changeLabelColumn(board, label, color, text) {
    
    console.log('labelBefore:', label)
    label.status = text
    label.value = text
    label.color = color
    console.log('labelafter', label)
    return board
}




function setColumn(board, column, color, value , task) {
    task.status = value
    column.value = value
    column.color = color
    console.log(task , 'taststatsasta')
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

function addLabel(board, column, label) {
    if (!column.labels && !column.length) column.labels = [];
    if (!label._id) label._id = makeId()
    column.labels.push(label)
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




function filter(board, value) {
    var newBoard = board

    if (value) {
        const groupsAfterFilter = board.groups.filter(group => {
            return group.name.includes(value)
        })
        const tasksAfterFilter = board.groups.map(group => {
            return group.tasks.filter(task => {
                return task.taskTitle.includes(value)
            })
        })
    }
    return newBoard

}



function makeId(length = 3) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}