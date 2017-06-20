import moment from 'moment'; 
export const ACTION_INCREMENT ='INCREMENT';
export const ACTION_DECREMENT = 'DECREMENT';
export const TODOLIST_DATA = 'TODOLIST_DATA';
export const REMOVE_ONETODO ='REMOVE_ONETODO';
export const ADD_ONETODO = 'ADD_ONETODO';
export const SEARCH_TODOS = 'SEARCH_TODOS';
var todoListDatas = [
	{id:1,header:"户外健身1",status:"0",type:"schedule",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-06-06 19:59:51",importance:"0"},
	{id:2,header:"户外健身2",status:"1",type:"birthday",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-04-13 20:13:12",importance:"1"},
	{id:3,header:"户外健身3",status:"2",type:"memorial",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-07-14 20:13:12",importance:"0"},
	{id:4,header:"户外健身4",status:"0",type:"countdown",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017-06-15 20:13:12",importance:"1"},
    {id:5,header:"户外健身5",status:"1",type:"schedule",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2016-09-26 19:30:12",importance:"0"}
];

function sortDatas(Arr){
    
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
//添加一个活动
export function searchTodos(searchDatas) {
    return {
        type: SEARCH_TODOS,
        todoListDatas:searchDatas
    };
}
export function loadSearchTodos(dispatch,url,data) {
    var searchDatas= [];
    var temp = todoListDatas;
    for(var key in data){
        if(_.isEmpty(data[key]) ||_.isNull(data[key]) ||_.isUndefined(data[key])){
            delete data[key];
        }
    }
    if(_.isEmpty(data)){
        dispatch(searchTodos(temp));
    }else{
        for(var key in data){
            for (var i = 0; i < temp.length; i++) { 
                if(key==="rangetime"){
                    if(data[key][0] < moment(temp[i]['time']) && data[key][1] > moment(temp[i]['time'])){
                        searchDatas.push(temp[i]);
                    }
                    continue;
                }
                if(data[key]===temp[i][key]){
                    searchDatas.push(temp[i]);
                }
            }
            temp = searchDatas;
            searchDatas = [];
        }

        dispatch(searchTodos(temp));
    }
}
