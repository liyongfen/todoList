/**
 * reducer函数，用于变更状态容器中的状态
 * 如果action未知，则原样返回
 * 永远不要修改state，返回一个全新的state
 * @param state 当前状态
 * @param action 接收到的新指令
 */
import {ACTION_INCREMENT,ACTION_DECREMENT,addOneAction,removeOneAction} from '../actions/main';
const receiveActions = (state={count:0} , action = {type})=> {
    switch (action.type) {
        case ACTION_INCREMENT://加一
            return addOneAction(action.count+1);
        case ACTION_DECREMENT://减一
            return removeOneAction(action.count-1);
        default:
            return state;
    }
}
export default receiveActions;

/*const setCounter = (state = {count: 0}, action) => {  
    switch (action.type) {  
        case 'increase':  
            return {count: state.count + 1};  
        case 'decrease':  
            return {count: state.count - 1}  
        default:  
            return state;  
    }  
}  
  
export default setCounter;  */