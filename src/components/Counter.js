import React  from 'react';  

import propTypes from 'prop-types';
class Counter extends React.Component {  
    constructor(props){
        super(props);
    }
    render() {  
        const { onIncreaseClick,onDecreaseClick} = this.props,  
                btnStyle = {  
                    width: '110px',  
                    height: '30px',  
                    color: '#fff',  
                    backgroundColor: 'green',  
                    border: '1px solid green',  
                    borderRadius: '5px',  
                    cursor: 'pointer'  
                },  
                textStyle = {  
                    fontSize: '20px'  
                };  
        var value = this.props.value|0;
        return (  
            <div>  
                <span style={textStyle}>{value}</span>  
                <br />  
                <button style={btnStyle} type="button" onClick={onIncreaseClick}>Increase</button>  
                   
                <button style={btnStyle} type="button" onClick={onDecreaseClick}>Decrease</button>  
            </div>  
        )  
    }  
}  
  
Counter.propTypes = {  
    value: propTypes.number.isRequired,  
    onIncreaseClick: propTypes.func.isRequired,  
    onDecreaseClick: propTypes.func.isRequired  
}  
  
export default Counter;