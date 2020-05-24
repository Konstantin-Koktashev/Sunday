const initialState = {
    board: null,
    currBoard: null
};
window.state = initialState
export default function (state = initialState, action = {}) {
    switch (action.type) {
        // case 'SET_BOARD':
        //     return { ...state, board: action.reviews };
        case 'foundTasks':
            return {
                ...state,
                board: {
                    ...state.board,
                    groups: {
                        ...state.board.groups,
                        tasks: { ...state.board.groups.tasks }
                    }
                }
            };
        case 'ADD_BOARD':
            return {
                ...state,
                board: [...state.board, action.savedBoard]
            }
        case 'UPDATE_BOARD':
            return {
                ...state,
                board: [
                    ...state.board.map(board => {
                        if (board._id === action.savedBoard._id) return action.savedBoard
                        return board
                    })
                ]
            }
        case 'SET_BOARDS':
            return {
                ...state,
                board: action.board
            }
        case 'BOARD_REMOVE':
            return {
                ...state,
                board: [
                    ...state.board.filter(board => {
                        return board._id !== action.boardId
                    })
                ]
            }
        case 'ADD_GROUP':
            return {
                ...state,
                boards: action.board
            }
        case 'SET_CURRBOARD':
            return {
                ...state,
                currBoard: action.board
            }
        case 'REMOVE_GROUP':
            return {
                ...state,
                boards: {
                    ...state.board, groups:
                        [...state.board.groups.filter(group => {
                            return group.id !== action.id
                        })]
                }
            }
        // case 'UPDATE_GROUP':
        //     return {
        //         ...state,
        //         boards:{
        //             ...state.boards,groups:
        //             [...state.board.group.map(group => {
        //             ((group.id)===action.groupId)?action.payload:group
        //         })]

        //         }
        //     }
        // case 'ADD_TASK': {

        // }

        default:
            return state;
    }
}


//SET_BOARDS
//BOARD_REMOVE



// columns: [
//     { type: 'done' }
//     , { priority: 'important' }
//     , { dueDate: 'tommarow' }
//     , { budget: 100 }
//     , { text: 'hey' }
//     , { link: '' }]