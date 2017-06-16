"use strict"
require('../styles/main.css');

import React from "react";
import ReactDOM from 'react-dom';  
import { Button,DatePicker} from 'antd';

import 'antd/dist/antd.css'; 
import Header from "./Header.js";


class App extends React.Component{
	render(){
		var todoListData = [{title:"户外健身1",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017/6/16",importance:"1"},
					{title:"户外健身2",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017/6/16",importance:"1"},
					{title:"户外健身3",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017/6/16",importance:"1"},
					{title:"户外健身4",desc:"5公里短跑，20个俯卧撑，10个引体向上，50个仰卧起坐",time:"2017/6/16",importance:"1"}]
		var todoListArr = [];
		todoListData.forEach(function(value,index){
			todoListArr.push(<li key={index}><span>{index+1}.</span> {value.title}</li>);
		})
		return (
			<div className="content">
				<Header />
				<div className="main">
					<div className="main-logo"></div>
					<ul>{todoListArr}</ul>
					<Button type="primary">Primary</Button>
					<DatePicker/>
				</div>
				<div className="footer"></div>
			</div>
		);
	}
}

export default App;