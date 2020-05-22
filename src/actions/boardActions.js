import boardServices from '../services/BoardService'
import localBoardService from '../services/localBoardService'
import { loading, doneLoading } from './SystemActions';

export function loadBoards() {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading());
      const boards = await boardServices.getBoards();
      dispatch(setBoards(boards));
    } catch (err) {
      console.log('BoardActions: err in loadBoards', err);
    } finally {
      dispatch(doneLoading());
    }
  };
}



export function saveBoard(board) {
  return async dispatch => {
    try {
      const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD'
      const savedBoard = await boardServices.saveBoard(board)
      dispatch({ type, savedBoard })

    } catch (err) {
      console.log('boardActions: err in add or update board', err);
    }
  }
}

// export function saveBoard(board){
//   return dispatch =>{
//     console.log('bdika')
//     console.log(dispatch)
//     console.log(board)
//   }
// }


export function removeBoard(boardId) {
  console.log("REMOVING -> boardId", boardId)
  return async dispatch => {
    try {
      await boardServices.remove(boardId);
      dispatch(_removeBoard(boardId));
    } catch (err) {
      console.log('BoardActions: err in removeBoard', err);
    }
  };
}

export function setCurrBoard(board) {
  console.log("setCurrBoard -> board", board)
  return dispatch => {
    dispatch({ type: 'SET_CURRBOARD', board });
  }
}

// export function addGroup(boardId,group) {
//   return async dispatch => {
//     try {
//     const board=await boardServices.saveBoard(board)
//       dispatch(_updateBoard(board))
//     } catch (error) {
//       console.log('failed to add group');
//     }
//   }
// }


// export function removeGroup(board) {
//   return async dispatch => {
//     try {
//       await boardServices.removeGroup(board)
//       dispatch(_removeGroup(group))
//     } catch (error) {
//       console.log('failed to remove group');
//     }
//   }

// }

// function addGroup(boardID , group){
//   return async dispatch => {  let board = getById(boardID)
//     board.groups.push(group)
//     dispatch(_addGroup(group))
//     try {
//        await boardServices.updateBoard(board)
//     } catch (error) {

//     }}
// }

// export async function addGroup(group) {
//   try {
//     await boardServices.removeGroup(group)
//     dispatch(_addGroup)
//   } catch (error) {
//     console.log('failed to add group');
//   }
// }






function setBoards(board) {
  return {
    type: 'SET_BOARDS',
    board
  };
}


function _removeBoard(boardId) {
  console.log("HELLO function_removeBoard -> boardId", boardId)
  return {
    type: 'BOARD_REMOVE',
    boardId
  };
}


// function _addGroup(board) {
//   return {
//     type: 'ADD_GROUP',
//     board
//   }
// }

// function _removeGroup(board) {
//   return {
//     type: 'REMOVE_BOARD',
//     board
//   }
// }

// function _addTask(board) {
//   return {
//     type: 'ADD_TASK',
//     board
//   }
// }
// function _removeTask(board) {
//   return {
//     type: 'REMOVE_TASK',
//     board
//   }
// }
// function _updateTask(board) {
//   return {
//     type: 'UPDATE_TASK',
//     board
//   }
// }
// function _updateBoard={

// }