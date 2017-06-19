/**
 * reducer函数，用于变更状态容器中的状态
 * 如果action未知，则原样返回
 * 永远不要修改state，返回一个全新的state
 * @param state 当前状态
 * @param action 接收到的新指令
 */
import assign from 'lodash/assign';
import {TODOLIST_DATA,REMOVE_ONETODO,ADD_ONETODO,SEARCH_TODOS,
	   removeOneTodo,initialDatas,addOneTodo,searchTodos} from '../actions/mainaction';
const receiveActions = (state={todoListDatas:[]} , action = {type})=> {
    switch (action.type) {
        case TODOLIST_DATA:      
        	return assign({}, state, initialDatas(action.todoListDatas)); 
        case REMOVE_ONETODO:      
        	return assign({}, state, removeOneTodo(action.todoListDatas));
        case ADD_ONETODO:      
            return assign({}, state, addOneTodo(action.todoListDatas));
        case SEARCH_TODOS:      
            return assign({}, state, searchTodos(action.todoListDatas));
        default:
            return state;
    }
}
export default receiveActions;
