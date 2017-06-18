export const ACTION_INCREMENT ='INCREMENT';
export const ACTION_DECREMENT = 'DECREMENT';

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
export const increaseAction = {  
    type: 'increase',
}  
  
export const decreaseAction = {  
    type: 'decrease',
}  