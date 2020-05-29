import ChatService from '../services/ChatService';
import SocketService from '../services/SocketService'

export function loadRooms() {
  return async dispatch => {
    try {
      const rooms = await ChatService.query();
      let roomsAfterCheck = rooms ? rooms : [];
      console.log("ROOMS FROM SERVER", roomsAfterCheck)
      dispatch(setRooms(roomsAfterCheck));

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

export function saveRoom(room, allRooms) {
  return async dispatch => {
    try {
      const type = room._id ? 'UPDATE_ROOM' : 'ADD_ROOM'
      room.lastUpdate = Date.now()
      const savedRoom = await ChatService.saveChat(room, allRooms)
      SocketService.emit('doRefresh', 'js')
      dispatch({ type, savedRoom })
    } catch (err) {
      console.log('boardActions: err in add or update board', err);
    }
  }
}

export function setCurrChatRoom(room) {
  console.log("setCurrChatRoom -> room", room)
  return async dispatch => {
    dispatch({ type: 'SET_CURR_CHAT_ROOM', room })
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
