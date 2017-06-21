import moment from 'moment'; 
export const ACTION_INCREMENT ='INCREMENT';
export const ACTION_DECREMENT = 'DECREMENT';
export const TODOLIST_DATA = 'TODOLIST_DATA';
export const REMOVE_ONETODO ='REMOVE_ONETODO';
export const ADD_ONETODO = 'ADD_ONETODO';
export const SEARCH_TODOS = 'SEARCH_TODOS';
export const EDIT_ONETODO = 'EDIT_ONETODO';
var todoListDatas = [
	{id:1,title:"户外健身1",status:"0",type:"schedule",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐1",time:"2017-06-21 19:59:51",importance:"0"},
	{id:2,title:"户外健身2",status:"1",type:"birthday",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐2",time:"2017-04-13 20:13:12",importance:"1"},
	{id:3,title:"户外健身3",status:"2",type:"memorial",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐3",time:"2017-07-14 20:13:12",importance:"0"},
	{id:4,title:"户外健身4",status:"0",type:"countdown",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐4",time:"2017-06-21 20:13:12",importance:"1"},
    {id:5,title:"户外健身5",status:"1",type:"schedule",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐5",time:"2016-09-26 19:30:12",importance:"0"},
    {id:6,title:"户外健身6",status:"1",type:"schedule",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐6",time:"2017-06-21 19:59:51",importance:"0"},
    {id:7,title:"户外健身7",status:"1",type:"birthday",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐7",time:"2017-06-21 21:13:12",importance:"0"},
    {id:8,title:"户外健身8",status:"0",type:"memorial",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐8",time:"2017-07-14 20:13:12",importance:"1"},
    {id:9,title:"户外健身9",status:"0",type:"countdown",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐9",time:"2017-06-21 20:13:12",importance:"1"},
    {id:10,title:"户外健身10",status:"2",type:"schedule",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐10",time:"2017-06-21 19:20:12",importance:"0"}
];
function getTodayDatas(arr){
    var todayDatas = [];
    for(var i = 0; i < arr.length; i++){
        if(moment().isSame(arr[i]['time'],'day')){
            todayDatas.push(arr[i]);
        }
    }
    return todayDatas;
}
function quickSort(arr,name,flag){
    //如果数组<=1,则直接返回
    if(arr.length <= 1){
        return arr;
    }
    var pivotIndex = Math.floor(arr.length/2);
    //找基准，并把基准从原数组删除
    var pivot = arr.splice(pivotIndex,1)[0];
    var middleNum = pivot[name];
    // 定义左右数组
    var left = [];
    var right = [];
    //比基准小的放在left，比基准大的放在right
    switch(flag){
        case 'time':
            for(var i = 0; i < arr.length; i++){
                if(moment(arr[i][name]).isBefore(middleNum)){
                    left.push(arr[i]);
                }else{
                    right.push(arr[i]);
                }
            }
            break;
        case 'number':
            for(var i = 0; i < arr.length; i++){
                if(Number(arr[i][name]) <= Number(middleNum) ){
                    left.push(arr[i]);
                }else{
                    right.push(arr[i]);
                }
            }
            break;
        default:break;        
    }
    //递归,返回所需数组
    return quickSort(left,name,flag).concat([pivot],quickSort(right,name,flag));
}
//得到列表的初始值
export function initialDatas(todoListDatas,status) {
    return {
        type: TODOLIST_DATA,
        status:status,
        todoListDatas: todoListDatas
    }
}
export function loadInitialDatas(dispatch,url){
    var todayDatas = getTodayDatas(todoListDatas);
    var sortdata = quickSort(todayDatas,'time','time');
	dispatch(initialDatas(sortdata,1));
}
//删除一条记录
export function removeOneTodo(todoListDatas,status) {
    return {
        type: REMOVE_ONETODO,
        status:status,
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
    var todayDatas = getTodayDatas(todoListDatas);
    var sortdata = quickSort(todayDatas,'time','time');
	dispatch(removeOneTodo(sortdata,1));
}
//添加一个活动
export function addOneTodo(todoListDatas,status) {
    return {
        type: ADD_ONETODO,
        status:status,
        todoListDatas:todoListDatas
    };
}
export function loadAddOneTodo(dispatch,url,data) {
    data.id = todoListDatas[todoListDatas.length-1].id+1;
    todoListDatas.push(data);
    var todayDatas = getTodayDatas(todoListDatas);
    var sortdata = quickSort(todayDatas,'time','time');
    dispatch(addOneTodo(sortdata,1));
}
//编辑一个活动
export function editOneTodo(todoListDatas,status) {
    return {
        type: EDIT_ONETODO,
        status:status,
        todoListDatas:todoListDatas
    };
}
export function loadEditOneTodo(dispatch,url,data) {
    for(var i = 0, j = todoListDatas.length; i < j; i++){
        if(todoListDatas[i].id == data.id){
            todoListDatas[i] = data;
            break;
        }
    }
    var todayDatas = getTodayDatas(todoListDatas);
    var sortdata = quickSort(todayDatas,'time','time');
    dispatch(editOneTodo(sortdata,1));
}
//查询活动
export function searchTodos(searchDatas,status) {
    return {
        type: SEARCH_TODOS,
        status:status,
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
        var sortdata = quickSort(temp,'time','time');
        dispatch(searchTodos(sortdata,1));
    }else{
        for(var key in data){
            for (var i = 0; i < temp.length; i++) { 
                if(key==="rangetime"){
                    if(moment(temp[i]['time']).isAfter(data[key][0])  &&  moment(temp[i]['time']).isBefore(data[key][1])){
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
        var sortdata = quickSort(temp,'time','time');
        dispatch(searchTodos(sortdata,1));
    }
}
