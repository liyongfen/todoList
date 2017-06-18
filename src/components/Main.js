"use strict"
import '../styles/main.css';
import 'antd/dist/antd.css'; 
import React from 'react';
import ReactDOM from 'react-dom';  
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { Button,DatePicker,Icon ,Badge} from 'antd';  

import Header from './Header.js';
import Todo from './Todo.js';
import TodoModel from './TodoModel.js';
import Search from './Search.js';
import {addOneAction, removeOneAction,loadInitialDatas,loadRemoveOneTodo,loadAddOneTodo} from '../actions/mainaction';  


var ButtonGroup = Button.Group;
var mapStateToProps= function(state){
	return{value: state.count,todoListDatas:state.todoListDatas}
}

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {data:{visible:false,todo:{header:'',desc:'',type:'0',importance:'0'},title:""}};
		this.onIncreaseClick = this.onIncreaseClick.bind(this);
		this.onDecreaseClick = this.onDecreaseClick.bind(this);
	}
	onIncreaseClick(){
		this.props.dispatch(addOneAction(this.props.value));
	}
	onDecreaseClick(){
		this.props.dispatch(removeOneAction(this.props.value));
	}
	_DelTodo(e,id){
		loadRemoveOneTodo(this.props.dispatch,"",id);
	}
	_EditTodo(e,todo){
		
		this.state.data.todo = todo;
		this.state.data.title = "编辑活动";
		this.state.data.visible = true;
		this.setState({data:this.state.data});
	}
	_getAddModel(e,visible){
		this.state.data.visible = visible;
		this.state.data.title = "新建活动";

		this.state.data.todo = {header:'',desc:'',type:'0',importance:'0',time:"2017-06-12 12:12:12"}
		this.setState({data:this.state.data});
	}
	_AddTodo(e,addtodo){
		this.state.data.visible = false;
		this.setState({data:this.state.data});
		loadAddOneTodo(this.props.dispatch,"",addtodo);
	}
	componentDidMount(){
    	loadInitialDatas(this.props.dispatch,"");
  	}

	render(){
		var {todoListDatas} = this.props;
		var value = this.props.value|0;
		return (
			<div className="content">
				<Header />
				<div className="main">
					<Search _getAddModel={this._getAddModel.bind(this)}/>
					<div className="main-logo"></div>
					<Todo todoListDatas={todoListDatas} _DelTodo={this._DelTodo.bind(this)} _EditTodo={this._EditTodo.bind(this)} />
					<p>{value}</p>  
					<ButtonGroup>
			          <Button type="primary" onClick={this.onIncreaseClick}>+1</Button>
			          <Button type="primary" onClick={this.onDecreaseClick}>-1</Button>
			        </ButtonGroup>
				</div>
				<TodoModel data={this.state.data}  _AddTodo={this._AddTodo.bind(this)}/>
				<div className="footer"></div>
			</div>
		);
	}
}

App.propTypes = {  
    value: propTypes.number.isRequired,
    filterData:propTypes.array   
}

export default connect(mapStateToProps)(App);