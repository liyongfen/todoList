"use strict"
import React from "react";
import {Row,Col} from "antd";
import '../styles/todoleft.css';
import imgreact from '../images/react.png';
import imgredux from '../images/redux.png';
import imgantd from '../images/antd.png';
import imgwebpack from '../images/webpack.png';

class TodoLeft extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="todo-left">
				<div className="todo-left-block">
					<img src={imgreact} className="todo-left-img" alt="占位符"/>
					<span className="todo-left-connector">+</span>
					<img src={imgredux} className="todo-left-img" alt="占位符"/>
				</div>
				<div className="todo-left-block">
					<img src={imgantd} className="todo-left-img" alt="占位符"/>
					<span className="todo-left-connector">+</span>
					<img src={imgwebpack} className="todo-left-img" alt="占位符"/>
				</div>
			</div>
		);
	}
}

export default TodoLeft;