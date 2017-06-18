"use strict"
import '../styles/main.css';
import 'antd/dist/antd.css'; 
import React from "react";
import ReactDOM from 'react-dom';
import moment from 'moment';  
import _ from 'lodash';
import { Modal, Button, Input, DatePicker,Icon,Form,Col,Select,Radio} from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
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
		this.state = {value:0,defaultType:0,data:this.props.data};
		this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
  	handleOk(e){
  		this.props.form.validateFields((err) => {
	        if (!err) {
	          if(_.isFunction(this.props._AddTodo)){
	          	var todo = this.props.form.getFieldsValue();
	          	todo.time = moment(todo.time).format('YYYY-MM-DD HH:mm:ss');
            	this.props._AddTodo(e,todo);
        	 }
	        }
	      });
  	}
  	handleCancel(){
  		this.state.data.visible = false;
  		this.setState({data: this.state.data});
  	}
  	handleRadio(e){
  		console.log('radio checked', e.target.value);
    	this.setState({value: e.target.value});
  	}
  	componentWillReceiveProps(nextProps){

  		this.setState({data:nextProps.data});
  	}
	render(){
		const { getFieldDecorator } = this.props.form;
		var data = this.state.data;
		console.log(data);
		return (
			<div className="todo-modal">
				<Modal
			        title={data.title}
			        visible={data.visible}
			        onOk={this.handleOk}
			        onCancel={this.handleCancel}
			        okText="确认"
			        cancelText="取消">
					<Form>
						<FormItem {...formItemLayout} label="标题">
							{getFieldDecorator('header', {initialValue:data.todo.header ||'',rules: [{ required: true, message: '请输入标题!'}]})(<Input />)}
	    				</FormItem>	
	    				<FormItem {...formItemLayout} label="日期">
					          {getFieldDecorator('time',  {initialValue:moment(data.todo.time),rules: [{ type: 'object', required: true, message: '请选择时间!'}]})(
					            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
					          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="重要性" >
				          {getFieldDecorator('importance',{initialValue:data.todo.importance+""||'0'})(
				            <RadioGroup onChange={this.handleRadio.bind(this)} >
				              <Radio value="0">重要</Radio>
				              <Radio value="1">一般</Radio>
				            </RadioGroup>
				          )}
				        </FormItem>
						<FormItem {...formItemLayout} label="类型">
							{getFieldDecorator('type',  {initialValue:data.todo.type+""||"0",rules: [{required: true, message: '请选择类型!'}]})(
					            <Select>
					              <Option value="0">日程<Icon type="check-square"/></Option>
					              <Option value="1">生日<Icon type="gift"/></Option>
					              <Option value="2">纪念日<Icon type="heart-o"/>  </Option>
					              <Option value="3">倒数日<Icon type="calendar"/></Option>
					            </Select>
					          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="详情">
				        	{getFieldDecorator('desc', {initialValue:data.todo.desc||'',rules: [{ required: true, message: '请输入详情!'}]})(<Input type="textarea" rows={4} />)}
				        </FormItem>
        			</Form>
        		</Modal>
			</div>
		);
	}
}
TodoModel = Form.create()(TodoModel);
export default TodoModel;