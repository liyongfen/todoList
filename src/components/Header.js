"use strict"
require('../styles/header.css');
import React from "react";
import CurrentTime from "./CurrentTime.js";

class Header extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var username = "liyongfen";
		return (
			<div className="header">
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