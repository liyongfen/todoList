"use strict"
import '../styles/header.css';
import React from "react";
import _ from 'lodash';
import { Modal, Button, Input, DatePicker,Icon,Form,Row,Col,Select} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
class Search extends React.Component{
	constructor(props){
		super(props);

	
	}
	addModal(e){
		if(_.isFunction(this.props._getAddModel)){
            this.props._getAddModel(e,true);
        }
	}
	handleSearch(e){
		var searchdata = this.props.form.getFieldsValue();
		console.log("searchdata:",searchdata);
		if(_.isFunction(this.props._SearchTodoLists)){
			this.props._SearchTodoLists(e,searchdata);
		}	
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="search" style={{marginTop:24}}>
				<Form >
					<Row>
						<Col span="4">
							<FormItem {...formItemLayout} label="重要性">
								{getFieldDecorator('importance',{initialValue:''})(
									<Select allowClear={true}>
										<Option value="0">重要活动</Option>
										<Option value="1">一般活动</Option>
									</Select>
								)}
							</FormItem>
						</Col>
						<Col span="4">
							<FormItem  {...formItemLayout} label="活动状态">
								{getFieldDecorator('status',{initialValue:''})(
									<Select allowClear={true}>
										<Option value="0">将要执行</Option>
										<Option value="1">已经执行</Option>
										<Option value="2">搁置状态</Option>
									</Select>
								)}
							</FormItem>
						</Col>
						<Col span="4">
							<FormItem {...formItemLayout} label="活动类型">
								{getFieldDecorator('type',{initialValue:''})(
									<Select allowClear={true}>
										<Option value="schedule">日程<Icon type="check-square-o"/></Option>
							            <Option value="birthday">生日<Icon type="gift"/></Option>
							            <Option value="memorial">纪念日<Icon type="heart-o"/>  </Option>
							            <Option value="countdown">倒数日<Icon type="calendar"/></Option>
									</Select>
								)}
							</FormItem>
						</Col>
						<Col span="8">
							<FormItem labelCol={{xs:{span:24},sm:{span:6}}} wrapperCol={{xs:{span:24},sm:{span:18}}} label="时间范围">
					          {getFieldDecorator('rangetime', { rules: [{ type: 'array'}]})(
					            <RangePicker />
					          )}
					        </FormItem>
						</Col>
						<Col span="2" >
							<Button type="primary" style={{marginLeft:15}} onClick={this.handleSearch.bind(this)}>查询</Button>
						</Col>
						<Col span="2">
							<Button type="primary" style={{marginLeft:7}} onClick={this.addModal.bind(this)}>添加</Button>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}
Search = Form.create()(Search);
export default Search;