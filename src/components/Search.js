"use strict"
require('../styles/header.css');
import React from "react";
import { Modal, Button, Input, DatePicker,Icon,Form,Col,Select} from 'antd';


class Search extends React.Component{
	constructor(props){
		super(props);
	
	}
	showModal(e){
		if(_.isFunction(this.props._getAddModel)){
            this.props._getAddModel(e,true);
        }
	}
	render(){
		return (
			<div className="search">
				<Button type="primary" onClick={this.showModal.bind(this)}>添加</Button>
			</div>
		);
	}
}

export default Search;