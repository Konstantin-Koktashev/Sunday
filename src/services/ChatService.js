import HttpService from './HttpService';

export default {
  query,
  remove,
  add,
  getMsgsById
};

export async function query() {
  const res = await HttpService.get('chat');
  return res.data;
}


function remove(chatId) {
  return HttpService.delete(`board/${chatId}`);
}


function add(msg){
    return HttpService.post('chat' , msg)
}

///////////////////////// local ///////////////////

/// filter after query

function getMsgsById(id , msgs){
    const filterMsgs = msgs.filter(msg => msg._id.includes(id))
    return filterMsgs
}
