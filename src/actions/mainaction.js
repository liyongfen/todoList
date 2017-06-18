export const ACTION_INCREMENT ='INCREMENT';
export const ACTION_DECREMENT = 'DECREMENT';
export const TODOLIST_DATA = 'TODOLIST_DATA';
export const REMOVE_ONETODO ='REMOVE_ONETODO';
export const ADD_ONETODO = 'ADD_ONETODO';
var todoListDatas = [
	{id:1,header:"户外健身1",type:1,desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2016-09-26 19:30:12",importance:0},
	{id:2,header:"户外健身2",type:0,desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-06-13 20:13:12",importance:1},
	{id:3,header:"户外健身3",type:2,desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-06-14 20:13:12",importance:0},
	{id:4,header:"户外健身4",type:3,desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-06-15 20:13:12",importance:1}
];
//计数器--加1，减1
export function addOneAction(count) {
    return {
        type: ACTION_INCREMENT,
        count
    };
}
export function removeOneAction(count) {
    return {
        type: ACTION_DECREMENT,
        count
    };
}
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