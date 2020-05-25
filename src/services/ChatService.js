import HttpService from './HttpService';

export default {
  query,
  remove,
  getRoomById,
  saveChat,
  addMsg
};

export async function query() {
  const res = await HttpService.get('chat');
  return res.data;
}

async function saveChat(room) {
  var roomToApply;
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
  const filterRooms = allRooms.find(room => room.chatRoomId === roomKey)
  return filterRooms
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
