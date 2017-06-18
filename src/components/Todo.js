"use strict"

import React from "react";
import {Button, Icon } from 'antd';
import 'antd/dist/antd.css'; 
import '../styles/todo.css';


class Todo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todoListStyle:[]
		};
		
	}
	handleClick(index,e){
		if(this.state.todoListStyle[index].arrowIcon==="right"){
			this.state.todoListStyle[index].arrowIcon = "down";
			this.state.todoListStyle[index].todoDesc = "todo-desc todo-desc-show"; 
		}else{
			this.state.todoListStyle[index].arrowIcon = "right";
			this.state.todoListStyle[index].todoDesc ="todo-desc"; 
		}
		this.setState({todoListStyle:this.state.todoListStyle});
	}
	handleEdit(index,e){

	}
	handleDelete(index,e){

	}
	render(){
		var todoListArr = [];
		var todoListData = this.props.todoListData;
		var todoListStyle = this.state.todoListStyle;
		todoListData.forEach(function(value,index){
			if(!todoListStyle[index]){
  				todoListStyle[index]={arrowIcon:"right",todoDesc:"todo-desc"};
  			}
		});
		var that = this;
		todoListData.forEach(function(value,index){
			todoListArr.push(
			<div key={index}>
				<p className="todo-header" onClick={that.handleClick.bind(that,index)}>
					<Icon type={todoListStyle[index].arrowIcon}/><span className="todo-header-title">  {value.header}</span>
					<span className="todo-header-time"><Icon type="clock-circle-o"/></span>
				</p>
				<p className={todoListStyle[index].todoDesc}>{value.desc}</p>
				<p><Button type="primary" onClick={that.handleEdit.bind(that,index)}>编辑</Button>
					<Button type="danger" onClick={that.handleDelete.bind(that,index)}>删除</Button></p>
			</div>);
		});

		return (
			<div>
				{todoListArr}
			</div>
		);
	}
}

export default Todo;