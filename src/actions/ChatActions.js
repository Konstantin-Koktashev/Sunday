import ChatService from '../services/ChatService';
import SocketService from '../services/SocketService'

export function loadRooms() {
  return async dispatch => {
    try {
      const rooms = await ChatService.query();
      dispatch(setRooms(rooms));

    } catch (err) {
      console.log('ReviewActions: err in loatchats', err);
    }
  };
}

export function addRoom(room) {
  return async dispatch => {
    try {
      const addedRoom = await ChatService.add(room);
      dispatch(_addRoom(addedRoom));
    } catch (err) {
      console.log('ReviewActions: err in addRooms', err);
    }
  };
}

export function saveRoom(room) {
    return async dispatch => {
      try {
        const type = room._id ? 'UPDATE_ROOM' : 'ADD_ROOM'
        const savedRoom = await ChatService.saveChat(room)
        SocketService.emit('doRefresh', 'js')
        dispatch({ type, savedRoom })
      } catch (err) {
        console.log('boardActions: err in add or update board', err);
      }
    }
  }

  export function setCurrChatRoom(chatObj){
    return async dispatch=>{
      dispatch({type:'SET_CURRCHAT_ROOM' , chatObj})
    }
  }
  

function setRooms(rooms) {
  return {
    type: 'SET_ROOMS',
    rooms
  };
}

function _addRoom(room) {
  return {
    type: 'ADD_ROOM',
    room
  };
}
