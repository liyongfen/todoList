/**
 * reducer函数，用于变更状态容器中的状态
 * 如果action未知，则原样返回
 * 永远不要修改state，返回一个全新的state
 * @param state 当前状态
 * @param action 接收到的新指令
 */
import assign from 'lodash/assign';
import {ACTION_INCREMENT,ACTION_DECREMENT,TODOLIST_DATA,REMOVE_ONETODO,ADD_ONETODO,
	addOneAction,removeOneAction,removeOneTodo,initialDatas,addOneTodo} from '../actions/mainaction';
const receiveActions = (state={count:0,todoListDatas:[]} , action = {type})=> {
    switch (action.type) {
        case ACTION_INCREMENT://加一
            return addOneAction(action.count+1);
        case ACTION_DECREMENT://减一
            return removeOneAction(action.count-1); 
        case TODOLIST_DATA:      
        	return assign({}, state, initialDatas(action.todoListDatas)); 
        case REMOVE_ONETODO:      
        	return assign({}, state, removeOneTodo(action.todoListDatas));
        case ADD_ONETODO:      
            return assign({}, state, addOneTodo(action.todoListDatas));
        default:
            return state;
    }
}
export default receiveActions;
