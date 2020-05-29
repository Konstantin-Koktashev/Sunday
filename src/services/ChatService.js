import HttpService from './HttpService';

export default {
  query,
  remove,
  getRoomById,
  saveChat,
  addMsg,
  getRoomKey
};

export async function query() {
  const res = await HttpService.get('chat');
  return res;
}

async function saveChat(room, allRooms) {
  console.log('room', room)

  let roomToApply;
  let ifTrue = true
  if (!room._id) roomToApply = await HttpService.post('chat', room)

  if (room.type === 'board') {
    allRooms.forEach(r => {
      if (r.chatRoomId === room.chatRoomId) ifTrue = false
    })


  }
  else if (true) roomToApply = await HttpService.put(`chat/${room._id}`, room)
  return roomToApply
}


function remove(boardId, rooms) {
  debugger
  let fixedId = _getMongoIdByBoardId(boardId, rooms)
  return HttpService.delete(`chat/${fixedId}`);
}



///////////////////////// local ///////////////////

/// filter after query

function getRoomById(chatWith, allRooms) {
  const roomKey = _getRoomById(chatWith)

  const room = allRooms && allRooms.length > 0 && allRooms.find(room => room.chatRoomId === roomKey)

  return room
}

function getRoomKey(obj) {
  let arr = [];
  arr.push(obj.id.myId)
  arr.push(obj.id.toUserId)
  let roomKey = arr.sort().join('')

  return roomKey
}


function _getRoomById(obj) {
  let arr = [];
  arr.push(obj.id.myId)
  arr.push(obj.id.toUserId)
  let roomKey = arr.sort().join('')

  return roomKey
}


function addMsg(room, newMsg) {
  if (!room.history) room.history = [];
  room.history.push(newMsg)
  return room
}

function _getMongoIdByBoardId(boardId, rooms) {
  var currRoom = rooms.find(room => room.chatRoomId === `${boardId}${boardId}`)
  return currRoom._id

}
