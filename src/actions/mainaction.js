export const ACTION_INCREMENT ='INCREMENT';
export const ACTION_DECREMENT = 'DECREMENT';
export const TODOLIST_DATA = 'TODOLIST_DATA';
export const REMOVE_ONETODO ='REMOVE_ONETODO';
export const ADD_ONETODO = 'ADD_ONETODO';
export const SEARCH_TODOS = 'SEARCH_TODOS';
var todoListDatas = [
	{id:1,header:"户外健身1",status:0,type:"schedule",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2016-09-26 19:30:12",importance:"0"},
	{id:2,header:"户外健身2",status:1,type:"birthday",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-06-13 20:13:12",importance:"1"},
	{id:3,header:"户外健身3",status:2,type:"memorial",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-06-14 20:13:12",importance:"0"},
	{id:4,header:"户外健身4",status:0,type:"countdown",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-06-15 20:13:12",importance:"1"}
];
//得到列表的初始值
export function initialDatas(todoListDatas) {
    return {
        type: TODOLIST_DATA,
        todoListDatas: todoListDatas
    }
}
//
export function loadInitialDatas(dispatch,url){
	dispatch(initialDatas(todoListDatas));
}
//删除一条记录
export function removeOneTodo(todoListDatas) {
    return {
        type: REMOVE_ONETODO,
        todoListDatas:todoListDatas
    };
}

export function loadRemoveOneTodo(dispatch,url,id) {
	for(let i = 0, j = todoListDatas.length; i < j; i++){
		if(id == todoListDatas[i].id){
			todoListDatas.splice(i,1);
			break;
		}
	}
	dispatch(removeOneTodo(todoListDatas));
}
//添加一个活动
export function addOneTodo(todoListDatas) {
    return {
        type: ADD_ONETODO,
        todoListDatas:todoListDatas
    };
}
export function loadAddOneTodo(dispatch,url,data) {
    data.id = todoListDatas[todoListDatas.length-1].id+1;
    todoListDatas.push(data);
    dispatch(addOneTodo(todoListDatas));
}
//添加一个活动
export function searchTodos(todoListDatas) {
    return {
        type: SEARCH_TODOS,
        todoListDatas:todoListDatas
    };
}
export function loadSearchTodos(dispatch,url,data) {
    console.log(data);
    var searchTodos = [];
    //todoListDatas
    //dispatch(searchTodos(todoListDatas));
}
