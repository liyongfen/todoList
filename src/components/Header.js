"use strict"
require('../styles/header.css');
import React from "react";
import {Row,Col} from "antd"
import CurrentTime from "./CurrentTime.js";

class Header extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var username = "liyongfen";

		return (
			<div className="header">
				<Row>
					<Col span={5} className="todo-color-one"></Col>
					<Col span={5} className="todo-color-two"></Col>
					<Col span={5} className="todo-color-three"></Col>
					<Col span={5} className="todo-color-frou"></Col>
					<Col span={4} className="todo-color-five"></Col>
				</Row>
				<p className="header-title">to<span className="header-title-sub">Do</span>List</p>
				<div className="header-username-time">
					<p className="header-username">Hi,<span className="header-username-sub">{username}</span></p>
					<CurrentTime/>
				</div>
			</div>
		);
	}
}

export default Header;