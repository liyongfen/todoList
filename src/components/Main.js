"use strict"
require('../styles/main.css');

import React from "react";
import Header from "./Header.js"

class App extends React.Component{
	render(){
		return (
			<div className="content">
				<Header />
				<div className="">

				</div>
				<div className="footer"></div>
			</div>
		);
	}
}

export default App;