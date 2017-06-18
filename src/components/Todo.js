"use strict"

import React from "react";
import {Button, Icon,Modal,notification } from 'antd';

import 'antd/dist/antd.css'; 
import '../styles/todo.css';
import _  from 'lodash';


class Todo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todoListStyle:[],modeal:{visible:false,modelHeader:"",id:null}
		};
	}
	handleClick(id,e){
		if(this.state.todoListStyle[id].arrowIcon==="right"){
			this.state.todoListStyle[id].arrowIcon = "down";
			this.state.todoListStyle[id].todoDesc = "todo-desc todo-desc-show"; 
		}else{
			this.state.todoListStyle[id].arrowIcon = "right";
			this.state.todoListStyle[id].todoDesc ="todo-desc"; 
		}
		this.setState({todoListStyle:this.state.todoListStyle});
	}
	handleEdit(todo,e){
		if(_.isFunction(this.props._EditTodo)){
            this.props._EditTodo(e,todo);
        }
	}
	handleDelete(id,e){
		var data = this.props.todoListDatas;
		for(let i = 0, j = data.length; i < j; i++){
			if(id == data[i].id){
				this.state.modeal.modelHeader=data[i].header;
				break;
			}
		}
		this.state.modeal.id = id;
		this.state.modeal.visible = true;
		this.setState({modeal:this.state.modeal});
	}
	handleOk(e){
		if(_.isFunction(this.props._DelTodo)){
            this.props._DelTodo(e,this.state.modeal.id);
        }
		this.state.modeal.visible = false;
		notification.success({
			message: '删除成功！',
		    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
		});
	    this.setState({modeal:this.state.modeal});
	}
	handleCancel(e){
	    this.state.modeal.visible = false;
	    this.setState({modeal:this.state.modeal});
	}
	showModal(){
    	this.state.modeal.visible = true;
    	this.setState({modeal:this.state.modeal});
 	}
	render(){
		var todoListArr = [];
		var todoListDatas = this.props.todoListDatas;
		var todoListStyle = this.state.todoListStyle;
		todoListDatas.forEach(function(value,index){
			if(!todoListStyle[value.id]){
  				todoListStyle[value.id]={arrowIcon:"right",todoDesc:"todo-desc"};
  			}
		});
		var that = this;
		todoListDatas.forEach(function(value,index){
			todoListArr.push(
			<div key={index}>
				<p className="todo-header" onClick={that.handleClick.bind(that,value.id)}>
					<Icon type={todoListStyle[value.id].arrowIcon}/><span className="todo-header-title">  {value.header}</span>
					<span className="todo-header-time"><Icon type="clock-circle-o"/>{value.time}</span>
				</p>
				<p className={todoListStyle[value.id].todoDesc}>{value.desc}</p>
				<p>
					<Button type="primary" onClick={that.handleEdit.bind(that,value)}>编辑</Button>
					<Button type="danger" onClick={that.handleDelete.bind(that,value.id)}>删除</Button>
				</p>
			</div>);
		});
		return (
			<div>
				{todoListArr}
				<Modal
			        title="删除活动"
			        visible={this.state.modeal.visible}
			        onOk={this.handleOk.bind(this)}
			        onCancel={this.handleCancel.bind(this)}>
			        <p>确定删除活动“{this.state.modeal.modelHeader}”?</p>
		        </Modal>
			</div>
		);
	}
}

export default Todo;