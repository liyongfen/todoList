"use strict"
import '../styles/main.css';
import 'antd/dist/antd.css'; 
import React from 'react';
import ReactDOM from 'react-dom';  
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { Button,DatePicker,Icon ,Badge,notification} from 'antd';  

import Header from './Header.js';
import Footer from './Footer.js';
import Todo from './Todo.js';
import TodoModel from './TodoModel.js';
import Search from './Search.js';
import {loadInitialDatas,loadRemoveOneTodo,loadAddOneTodo,loadSearchTodos} from '../actions/mainaction';  

var ButtonGroup = Button.Group;

var mapStateToProps= function(state){
	return{todoListDatas:state.todoListDatas}
}

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {data:{visible:false,
			todo:{header:'',status:null,desc:'',type:'schedule',importance:'0'},title:""}
		};
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
		this.state.data.todo = {header:'',desc:'',status:null,type:'schedule',importance:'0',time:"2017-06-12 12:12:12"}
		this.setState({data:this.state.data});
	}
	_AddTodo(e,addtodo,isadd){
		this.state.data.visible = false;
		this.setState({data:this.state.data});
		loadAddOneTodo(this.props.dispatch,"",addtodo);
		var message = '修改成功！';
		if(isadd==="新建活动"){
			message = '添加成功！'
		}
		notification.success({
			message: message,
		    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
		});
	}
	_SearchTodoLists(e,searchdata){
		loadSearchTodos(this.props.dispatch,"",searchdata);
	}
	componentDidMount(){
    	loadInitialDatas(this.props.dispatch,"");
  	}

	render(){
		var {todoListDatas} = this.props;
		return (
			<div className="content">
				<Header />
				<div className="main">
					<Search _getAddModel={this._getAddModel.bind(this)} _SearchTodoLists={this._SearchTodoLists.bind(this)}/>
					<div className="main-logo"></div>
					<Todo todoListDatas={todoListDatas} _DelTodo={this._DelTodo.bind(this)} _EditTodo={this._EditTodo.bind(this)} />
				</div>
				<TodoModel data={this.state.data}  _AddTodo={this._AddTodo.bind(this)}/>
				<Footer />
			</div>
		);
	}
}

App.propTypes = {  
    filterData:propTypes.array   
}

export default connect(mapStateToProps)(App);