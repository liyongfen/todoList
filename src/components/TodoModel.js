"use strict"
require('../styles/main.css');

import React from "react";
import ReactDOM from 'react-dom';
import moment from 'moment';  
import _ from 'lodash';
import { Modal, Button, Input, DatePicker,Icon,Form,Col,Select} from 'antd';
import 'antd/dist/antd.css'; 
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
class TodoModel extends React.Component{
	constructor(props){
		super(props);
		this.state = {visible: false,todoData:{
			title:"新建活动",
			header:"",
			type:"1",
			time:"",
			desc:""
		}};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		
	}
 	showModal(){
    	this.setState({visible: false});
 	}
  	hideModal(){
  		this.props.form.validateFields((err) => {
	        if (!err) {
	          console.log(this.props.form.getFieldsValue());

	        }
	      });
  	}
	render(){
		const { getFieldDecorator } = this.props.form;
		var todoData = this.state.todoData;
		return (
			<div className="">
				<Button type="primary" onClick={this.showModal}>添加</Button>
				<Modal
			        title={todoData.title}
			        visible={this.state.visible}
			        onOk={this.hideModal}
			        onCancel={this.hideModal}
			        okText="确认"
			        cancelText="取消">
					<Form>
						<FormItem {...formItemLayout} label="标题">
							{getFieldDecorator('header', {rules: [{ required: true, message: '请输入标题!'}]})(<Input />)}
	    				</FormItem>	
	    				<FormItem {...formItemLayout} label="日期">
					          {getFieldDecorator('date-time-picker',  {rules: [{ type: 'object', required: true, message: '请选择时间!'}]})(
					            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
					          )}
				        </FormItem>
						<FormItem {...formItemLayout} label="类型">
							{getFieldDecorator('type',  {rules: [{required: true, message: '请选择类型!'}]})(
					            <Select>
					              <Option value="1">日程<Icon type="check-square"/></Option>
					              <Option value="2">生日<Icon type="gift"/></Option>
					              <Option value="3">纪念日<Icon type="heart-o"/>  </Option>
					              <Option value="4">倒数日<Icon type="calendar"/></Option>
					            </Select>
					          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="详情">
				        	{getFieldDecorator('desc', {rules: [{ required: true, message: '请输入详情!'}]})(<Input type="textarea" rows={4} />)}
				        </FormItem>
        			</Form>
        		</Modal>
			</div>
		);
	}
}
TodoModel = Form.create()(TodoModel);
export default TodoModel;