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

async function saveChat(room) {
  let roomToApply;
  if (!room._id) roomToApply = await HttpService.post('chat', room)
  else roomToApply = await HttpService.put(`chat/${room._id}`, room)
  return roomToApply
}


function remove(roomId) {
  return HttpService.delete(`chat/${roomId}`);
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
