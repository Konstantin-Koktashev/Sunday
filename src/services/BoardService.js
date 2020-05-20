import HttpService from './HttpService';

export default {
  add,
  query,
  remove
};


// return axios.get('api/toy/?id=1223&balance=13');
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}});
//Boards

 export async function query(filtetBy) {
    var filter = '?'
    if (filtetBy.name) filter += `&task_name=${filtetBy.name}`
    if (filtetBy.inStock) filter += `&inStock=true`
    if (filtetBy.sortBy) filter += `&_sort=${filtetBy.sortBy}`
    const res = await HttpService.get(`${baseUrl}${filter}`);
     return res.data;
}


function remove(boardId) {
  return HttpService.delete(`board/${boardId}`);
}
async function addBoard(board) {
  const addedBoard  = await HttpService.post(`board`, board);
  return  addedBoard
}
async function UpdateBoard(board) {
  const addedBoard  = await HttpService.post(`board`, board);
  return  addedBoard
}

async function addGroup(group,id){
    const newBoard  = await HttpService.post(`board`, group);
    return  newBoard
}
async function removeGroup(groupId){
    return HttpService.delete(`board/${groupId}`);
    
}

//Groups

async function removeGroup(groupId){
    return HttpService.delete(`board/${groupId}`);
    

}
async function addGroup(group){
    const addedGroup  = await HttpService.post(`board`, group);
    return  addedGrou

}

async function updateGroup(group) {
    const updatedGroup  = await HttpService.post(`board`, group);
    return  updatedGroup
  }

  

