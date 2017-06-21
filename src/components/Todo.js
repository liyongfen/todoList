"use strict"

import React from "react";
import {Button, Icon,Modal,notification,Badge } from 'antd';

import 'antd/dist/antd.css'; 
import '../styles/todo.css';
import _  from 'lodash';


class Todo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todoListStyle:[],model:{visible:false,modelHeader:"",id:null}
		};
	}
	handleClick(id,e){
		if(this.state.todoListStyle[id].arrowIcon==="right"){
			this.state.todoListStyle[id].arrowIcon = "down";
			this.state.todoListStyle[id].todoDesc = " todo-desc-show"; 
		}else{
			this.state.todoListStyle[id].arrowIcon = "right";
			this.state.todoListStyle[id].todoDesc =" todo-desc-hide"; 
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
				this.state.model.modelHeader=data[i].title;
				break;
			}
		}
		this.state.model.id = id;
		this.state.model.visible = true;
		this.setState({model:this.state.model});
	}
	handleOk(e){
		if(_.isFunction(this.props._DelTodo)){
            this.props._DelTodo(e,this.state.model.id);
        }
		this.state.model.visible = false;
	    this.setState({model:this.state.model});
	}
	handleCancel(e){
	    this.state.model.visible = false;
	    this.setState({model:this.state.model});
	}
	showModal(){
    	this.state.model.visible = true;
    	this.setState({model:this.state.model});
 	}
	render(){
		var todoListArr = [];
		var todoListDatas = this.props.todoListDatas;
		var todoListStyle = this.state.todoListStyle;
		todoListDatas.forEach(function(value,index){
			if(!todoListStyle[value.id]){
  				todoListStyle[value.id]={arrowIcon:"right",todoDesc:" todo-desc-hide"};
  			}
		});
		var that = this;

		todoListDatas.forEach(function(value,index){
			var typeIcon = "";
			switch(value.type){
				case "schedule":typeIcon="check-square-o";break;
				case "birthday":typeIcon="gift";break;
				case "memorial":typeIcon="heart-o";break;
				case "countdown":typeIcon="calendar";break;
				default:break;

			}
			var statusStyle= "";
			switch(value.status){
				case "0":statusStyle = " todo-status-willdo ";break;
				case "1":statusStyle = " todo-status-doed ";break;
				case "2":statusStyle = " todo-status-givepu ";break;
				default:break;
			}
			var importStyle= "todo-improt-badge-hide";
			if(value.importance=="0"){
				importStyle = " todo-improt-badge ";
			}
			var statusHeader = "todo-header" + statusStyle;
			var statusDesc = "todo-desc " + statusStyle + todoListStyle[value.id].todoDesc;
			var statusContro = "todo-contro " + statusStyle;
			todoListArr.push(
			<div key={index} style={{marginBottom:15,clear:'both'}}>
				<p className={statusHeader} onClick={that.handleClick.bind(that,value.id)}>
					<Icon type={todoListStyle[value.id].arrowIcon}/><span className="todo-header-title">  {value.title}</span>
					<span className="todo-header-time">
						<Icon type="clock-circle-o"/>{value.time}<Icon type={typeIcon} style={{paddingLeft:16}}/>
					</span>
					<span className={importStyle}><Badge count={"重要"}></Badge></span>
				</p>
				<p className={statusDesc}>{value.desc}</p>
				<p className={statusContro}>
					<Button type="primary" className ="todo-edit-btn" onClick={that.handleEdit.bind(that,value)}>编辑</Button>
					<Button type="danger" onClick={that.handleDelete.bind(that,value.id)}>删除</Button>
				</p>
				
			</div>);
		});
		return (
			<div>
				{todoListArr}
				<Modal
			        title="删除活动"
			        visible={this.state.model.visible}
			        onOk={this.handleOk.bind(this)}
			        onCancel={this.handleCancel.bind(this)}>
			        <p>确定删除活动“{this.state.model.modelHeader}”?</p>
		        </Modal>
			</div>
		);
	}
}

export default Todo;