import boardServices from '../services/BoardService'

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
        // example for rerouting - after changing the store
        // history.push('/some/path');
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
            dispatch({ type, board: savedBoard })
        } catch (err) {
            console.log('boardActions: err in add or update board', err);
        }
    }
}


export function removeBoard(boardId) {
    return async dispatch => {
      try {
        await boardServices.remove(boardId);
        dispatch(_removeBoard(boardId));
      } catch (err) {
        console.log('BoardActions: err in removeBoard', err);
      }
    };
  }








function setBoards(boards) {
    return {
      type: 'SET_BOARDS',
      boards
    };
  }


  function _removeBoard(boardId) {
    return {
      type: 'BOARD_REMOVE',
      boardId
    };
  }