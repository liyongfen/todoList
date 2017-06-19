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
		this.state = {data:this.props.data};
		this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
  	handleOk(e){
  		this.props.form.validateFields((err) => {
	        if (!err) {
	          if(_.isFunction(this.props._AddTodo)){
	          	var todo = this.props.form.getFieldsValue();
	          	todo.time = moment(todo.time).format('YYYY-MM-DD HH:mm:ss');
            	this.props._AddTodo(e,todo,this.state.data.title);
        	 }
	        }
	      });
  	}
  	handleCancel(){
  		this.state.data.visible = false;
  		this.setState({data: this.state.data});
  	}
  	onChangeRadio(e){
  		this.state.data.todo.importance = e.target.value;
    	this.setState({data:this.state.data});
  	}
  	onChangeHeader(e){
  		this.state.data.todo.header = e.target.value;
  		this.setState({data:this.state.data});
  	}
  	onChangeType(value){
  		this.state.data.type= `selected ${value}`;
  		this.setState({data:this.state.data});
  	}
  	onChangeDesc(e){
  		this.state.data.todo.desc = e.target.value;
  		this.setState({data:this.state.data});
  	}
  	onChangeTime(date, dateString){
  		this.state.data.todo.time = dateString;
  		this.setState({data:this.state.data});
  	}
  	componentWillReceiveProps(nextProps){
  		this.setState({data:nextProps.data});
  	}
  	componentDidMount(){
  		//console.log("dismount",this.state.data.todo);
  	}
	render(){
		const { getFieldDecorator } = this.props.form;
		var data = this.state.data;
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
							{getFieldDecorator('header', {initialValue:data.todo.header ||'',rules: [{ required: true, message: '请输入标题!'}]})(<Input onChange={this.onChangeHeader.bind(this)}/>)}
	    				</FormItem>	
	    				<FormItem {...formItemLayout} label="日期">
					        {getFieldDecorator('time',  {initialValue:moment(data.todo.time),rules: [{ type: 'object', required: true, message: '请选择时间!'}]})(
					            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.onChangeTime.bind(this)} />
					        )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="重要性" >
				          {getFieldDecorator('importance',{initialValue:data.todo.importance||'0'})(
				            <RadioGroup onChange={this.onChangeRadio.bind(this)} >
				              <Radio value="0">重要</Radio>
				              <Radio value="1">一般</Radio>
				            </RadioGroup>
				          )}
				        </FormItem>
						<FormItem {...formItemLayout} label="类型">
							{getFieldDecorator('type',  {initialValue:data.todo.type||"schedule",rules: [{required: true, message: '请选择类型!'}]})(
					            <Select onChange={this.onChangeType.bind(this)}>
					              <Option value="schedule">日程<Icon type="check-square"/></Option>
					              <Option value="birthday">生日<Icon type="gift"/></Option>
					              <Option value="memorial">纪念日<Icon type="heart-o"/>  </Option>
					              <Option value="countdown">倒数日<Icon type="calendar"/></Option>
					            </Select>
					          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="详情">
				        	{getFieldDecorator('desc', {initialValue:data.todo.desc||'',rules: [{ required: true, message: '请输入详情!'}]})(
				        		<Input type="textarea" rows={4} onChange={this.onChangeDesc.bind(this)}/>
				        	)}
				        </FormItem>
        			</Form>
        		</Modal>
			</div>
		);
	}
}
TodoModel = Form.create()(TodoModel);
export default TodoModel;