"use strict"
import '../styles/footer.css';
import React from "react";
import {Row,Col} from "antd"


class Footer extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="footer">
				<p className="footer-info">版权所有© 武汉理工大学  维护：武汉理工大学网络信息中心</p>
				<Row>
					<Col span={5} className="todo-color-one"></Col>
					<Col span={5} className="todo-color-two"></Col>
					<Col span={5} className="todo-color-three"></Col>
					<Col span={5} className="todo-color-frou"></Col>
					<Col span={4} className="todo-color-five"></Col>
				</Row>
			</div>
		);
	}
}

export default Footer;
