"use strict"
import '../styles/main.css';
import 'antd/dist/antd.css'; 
import React from 'react';
import ReactDOM from 'react-dom';  
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {Icon,notification,Row,Col,Modal} from 'antd';  

import Header from './Header.js';
import Footer from './Footer.js';
import Todo from './Todo.js';
import TodoModel from './TodoModel.js';
import Search from './Search.js';
import TodoLeft from './TodoLeft.js';
import TimeUtils from "../core/utils/TimeUtils.js"
import {loadInitialDatas,loadRemoveOneTodo,loadAddOneTodo,loadEditOneTodo,loadSearchTodos} from '../actions/mainaction';  

var mapStateToProps= function(state){
	return{
		todoListDatas:state.todoListDatas,
		status:state.status
	}
}

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {data:{newKey:'',visible:false,title:0,
			todo:{id:0,header:'',status:'0',desc:'',type:'schedule',importance:'0'}
			}
		};
	}
	_DelTodo(e,id){
		loadRemoveOneTodo(this.props.dispatch,"",id);
		var title = "删除失败！";
		if(this.props.status==1){
			title = "删除成功！";
		}
		const modal = Modal.success({
		    title: title
		});
		setTimeout(() => modal.destroy(), 1000);
	}
	_EditTodo(e,todo){
		this.state.data.todo = todo;
		this.state.data.visible = true;
		this.state.data.newKey = TimeUtils.getCurrentTime('-');
		this.state.data.title = 0;
		this.setState({data:this.state.data});
	}
	_EditModal(e,todo){
		this.state.data.visible = false;
		this.setState({data:this.state.data});
		loadEditOneTodo(this.props.dispatch,"",todo);
		var title = "修改失败！";
		if(this.props.status==1){
			title = "修改成功！";
		}
		const modal = Modal.success({
		    title: title
		});
		setTimeout(() => modal.destroy(), 1000);
	}
	_getAddModel(e){
		this.state.data.title = 1;
		this.state.data.visible = true;
		this.state.data.newKey = TimeUtils.getCurrentTime('-');
		this.state.data.todo = {id:0,header:'',desc:'',status:'0',type:'schedule',importance:'0',time:"2017-06-12 12:12:12"}
		this.setState({data:this.state.data});
	}
	_AddTodo(e,addtodo){
		this.state.data.visible = false;
		this.setState({data:this.state.data});
		loadAddOneTodo(this.props.dispatch,"",addtodo);
		var title = "添加失败！";
		if(this.props.status==1){
			title = "添加成功！";
		}
		const modal = Modal.success({
		    title: title
		});
		setTimeout(() => modal.destroy(), 1000);
		
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
				<Search _getAddModel={this._getAddModel.bind(this)} _SearchTodoLists={this._SearchTodoLists.bind(this)}/>
				<div className="main">
					<Row>
						<Col span={10}>
							<TodoLeft />
						</Col>
						<Col span={14}>
							<Todo todoListDatas={todoListDatas} _DelTodo={this._DelTodo.bind(this)} _EditTodo={this._EditTodo.bind(this)} />
						</Col>
					</Row>
				</div>
				<TodoModel data={this.state.data}  _AddTodo={this._AddTodo.bind(this)} _EditModal={this._EditModal.bind(this)}/>
				<Footer />
			</div>
		);
	}
}

App.propTypes = {  
    filterData:propTypes.array,
    status:propTypes.number   
}

export default connect(mapStateToProps)(App);