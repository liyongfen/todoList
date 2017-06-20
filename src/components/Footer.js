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
				<p className="footer-info">Copyright &copy; 2015-2017  武汉xx科技有限公司 鄂网文[2014]100-100号 鄂ICP证100000号</p>
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
