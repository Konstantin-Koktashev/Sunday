import BoardServices from '../services/BoardService'
import { loading, doneLoading } from './SystemActions';
import SocketService from '../services/SocketService'


export function loadBoards() {
  return async dispatch => {
    try {
      // example for loading
      dispatch(loading());
      const boards = await BoardServices.getBoards();
      dispatch(setBoards(boards));
    } catch (err) {
      console.log('BoardActions: err in loadBoards', err);
    } finally {
      dispatch(doneLoading());
    }
  };
}

export function setFilter(text){
  return async dispatch =>{
    try{
      dispatch({ type: 'SET_FILTER', text });
    } catch(err){
      console.log('BoardActions: err in setfilter', err);
    }
  }
}



export function saveBoard(board) {
  return async dispatch => {
    try {
      const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD'
      const savedBoard = await BoardServices.saveBoard(board)
      SocketService.emit('doRefresh', 'js')
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
  
  return async dispatch => {
    try {
      await BoardServices.remove(boardId);
      dispatch(_removeBoard(boardId));
    } catch (err) {
      console.log('BoardActions: err in removeBoard', err);
    }
  };
}

export function setCurrBoard(board) {
  return dispatch => {
    dispatch({ type: 'SET_CURRBOARD', board });
  }
}

// export function addGroup(boardId,group) {
//   return async dispatch => {
//     try {
//     const board=await BoardServices.saveBoard(board)
//       dispatch(_updateBoard(board))
//     } catch (error) {
//       console.log('failed to add group');
//     }
//   }
// }


// export function removeGroup(board) {
//   return async dispatch => {
//     try {
//       await BoardServices.removeGroup(board)
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
//        await BoardServices.updateBoard(board)
//     } catch (error) {

//     }}
// }

// export async function addGroup(group) {
//   try {
//     await BoardServices.removeGroup(group)
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