"use strict"
require('../styles/main.css');

import React from "react";

import ReactDOM from 'react-dom';  
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { Button,DatePicker,Icon ,Badge} from 'antd';  

import Header from "./Header.js";
import Todo from "./Todo.js";
import TodoModel from "./TodoModel.js";
import Counter from  './Counter.js';
import {addOneAction, removeOneAction} from '../actions/main';  

import 'antd/dist/antd.css'; 
var ButtonGroup = Button.Group;
var mapStateToProps= function(state){
	console.log(state.count);
	return{value: state.count}
}

class App extends React.Component{
	constructor(props){
		super(props);
		this.onIncreaseClick = this.onIncreaseClick.bind(this);
		this.onDecreaseClick = this.onDecreaseClick.bind(this);
	}
	onIncreaseClick(){
		this.props.dispatch(addOneAction(this.props.value));
	}
	onDecreaseClick(){
		this.props.dispatch(removeOneAction(this.props.value));
	}
	render(){
		var todoListData = [{header:"户外健身1",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017/6/16",importance:"1"},
					{header:"户外健身2",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017/6/16",importance:"1"},
					{header:"户外健身3",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017/6/16",importance:"1"},
					{header:"户外健身4",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017/6/16",importance:"1"}]
		var value = this.props.value|0;
		return (
			<div className="content">
				<Header />
				<div className="main">
					<div className="main-logo"></div>
					<Todo todoListData={todoListData} />
					<TodoModel />
					<p>{value}</p>  
					<ButtonGroup>
			          <Button type="primary" onClick={this.onIncreaseClick}>+1</Button>
			          <Button type="primary" onClick={this.onDecreaseClick}>-1</Button>
			        </ButtonGroup>
				</div>
				<div className="footer"></div>
			</div>
		);
	}
}

App.propTypes = {  
    value: propTypes.number.isRequired,
    dispatch: propTypes.func,   
}

export default connect(mapStateToProps)(App);