"use strict"
require('../styles/header.css');
import React from "react";
import TimeUtils from "../core/utils/TimeUtils.js"

class CurrentTime extends React.Component{
	constructor(props){
		super(props);
		this.state = {getCurrentTime:TimeUtils.getCurrentTime('-')};
	}
	componentDidMount(){
		this.timerID = setInterval(() =>{this.setState({getCurrentTime:TimeUtils.getCurrentTime('-')})},1000);
	}
	componentWillUnmount(){
		clearInterval(this.timerID);
	}
	render(){
		var getCurrentTime = this.state.getCurrentTime;
		return (
			<div className="header-current-time">
				<p>当前时间：<span>{getCurrentTime}</span></p>
			</div>
		);
	}
}

export default CurrentTime;