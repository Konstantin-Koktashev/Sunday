import HttpService from './HttpService';

export default {
  query,
  remove,
  getRoomById,
  saveChat,
  addMsg,
  getRoomKey,
  createNewRoom,
  getUser,
  chatMsgByUser,
  filterChatsByUser
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

function createNewRoom(chatWith, messageList, id, type) {
  let chatRoom = {
    chatRoomId: getRoomKey(chatWith), //Sort function
    roomHistory: messageList,
    userA: id.myId,
    userB: id.toUserId,
    type,
  };

  return chatRoom

}

function remove(roomId) {
  return HttpService.delete(`chat/${roomId}`);
}

function filterChatsByUser(chatRooms, myUser) {
  chatRooms.filter((room) => {
    if (room) {
      if (room.userA === myUser._id || room.userB === myUser._id) return true;
    }
  });

  let sortedRooms = sortByKey(chatRooms, "lastUpdate");
  return sortedRooms;


}
function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

function chatMsgByUser(chatRoom, myUser) {
  let chatMsgsByUser = chatRoom.roomHistory.map((msg) => {
    let author = "them";
    if (msg && msg.senderId === myUser._id) {
      author = "me";
    } else {
      let isSeen = false;
      msg.data.isSeen.forEach((seenUser) => {
        if (myUser._id === seenUser._id) isSeen = true;
      });
      if (!isSeen) {
        this.newMessagePopup();
        msg.data.isSeen.push(myUser);
      }
    }
    author = "me";
    msg.author = author;
    return msg;
  });

  return chatMsgsByUser

}


function getUser(chatWith, board, users) {
  // if (!chatWith) return;
  if (chatWith.type === "board") {
    let data = {};
    data.username = "Board Chat: " + board.name;
    return data;
  } else {
    let user = users.find((user) => user._id === chatWith.id.toUserId);
    return user;
  }
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
