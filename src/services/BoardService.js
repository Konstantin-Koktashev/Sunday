import HttpService from './HttpService';

export default {
  query,
  remove,
  getBoards,
  saveBoard,
  removeGroup,
  addGroup,
  updateGroup,
  removeTask,
  addTask
};


// return axios.get('api/toy/?id=1223&balance=13');
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}});
//Boards

export async function query(filterBy) {
  var filter = '?'
  if (filterBy.name) filter += `&task_name=${filterBy.name}`
  if (filterBy.inStock) filter += `&inStock=true`
  if (filterBy.sortBy) filter += `&_sort=${filterBy.sortBy}`
  const res = await HttpService.get(`board/${filter}`);
  return res.data;
}

function getBoards() {
  return HttpService.get(`board`)
}
function updateBoard(){

}


function remove(boardId) {
  return HttpService.delete(`board/${boardId}`);
}
function removeGroup(groupId) {
  return HttpService.delete(`board/${groupId}`);
}
function addGroup(board,groupId) {
  return HttpService.put(`board/${groupId}`,board);
}
function updateGroup(groupId,board) {
  return HttpService.put(`board/${groupId}`,board);
}
function removeTask(taskId) {
  return HttpService.delete(`board/${taskId}`);
}

// function updateTask(board) {
//   return HttpService.put(`board/${groupId}`,board);
// }
function removeColumn(columnId) {
  return HttpService.delete(`board/${columnId}`);
}
function addTask(board) {
  return HttpService.put(`board/`,board);
}
// function updateTask(board) {
//   return HttpService.put(`board/`,board);
// }
// async function addBoard(board) {
//   const addedBoard = await HttpService.post(`board`, board);
//   return addedBoard
// }
// async function UpdateBoard(board) {
//   const addedBoard = await HttpService.post(`board`, board);
//   return addedBoard
// }

async function saveBoard(board) {
  var boardToApply;
  if (!board._id) boardToApply = await HttpService.post('board', board)
  else boardToApply = await HttpService.put('board', board)
  return boardToApply
}

// async function addGroup(group, id) {
//   const newBoard = await HttpService.post(`board`, group);
//   return newBoard
// }
// async function removeGroup(groupId) {
//   return HttpService.delete(`board/${groupId}`);

// }

// //Groups

// async function removeGroup(groupId) {
//   return HttpService.delete(`board/${groupId}`);


// }
// async function addGroup(group) {
//   const addedGroup = await HttpService.post(`board`, group);
//   return addedGrou

// }

// async function updateGroup(group) {
//   const updatedGroup = await HttpService.post(`board`, group);
//   return updatedGroup
// }



// function addGroup(boardID , group){
//   let board = getById(boardID)
//   board.groups.push(group)
//   httpService.post
// }
