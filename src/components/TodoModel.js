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
	}
  	handleOk(e){
  		this.props.form.validateFields((err) => {
	        if (!err) {
	        	var todo = this.props.form.getFieldsValue();
	        	todo.time = moment(todo.time).format('YYYY-MM-DD HH:mm:ss');
	          	if(_.isFunction(this.props._AddTodo) && this.state.data.title==1){
            		this.props._AddTodo(e,todo);
        		 }else if(_.isFunction(this.props._EditModal) && this.state.data.title==0){
        	 		this.props._EditModal(e,todo);
        	 }
	        }
	      });
  	}
  	handleCancel(){
  		this.state.data.visible = false;
  		this.setState({data: this.state.data});
  	}
  	componentWillReceiveProps(nextProps){
  		this.setState({data:nextProps.data});
  	}
	render(){
		const { getFieldDecorator } = this.props.form;
		var data = this.state.data;
		var title="新建活动"; 
		if(data.title==0){
			title="编辑活动"; 
		}
		return (
			!data.visible ? null :
			<Modal
		        title={title}
		        visible={data.visible}
		        onOk={this.handleOk.bind(this)}
		        onCancel={this.handleCancel.bind(this)}
		        okText="确认"
		        cancelText="取消">
				<Form>
					<FormItem {...formItemLayout} label="">
						{getFieldDecorator('id', {initialValue:data.todo.id ||0})(
							<Input style={{display:'none'}} />
						)}
    				</FormItem>	
					<FormItem {...formItemLayout} label="标题">
						{getFieldDecorator('title', {initialValue:data.todo.title ||'',rules: [{ required: true, message: '请输入标题!'}]})(
							<Input/>
						)}
    				</FormItem>	
    				<FormItem {...formItemLayout} label="日期">
				        {getFieldDecorator('time',  {initialValue:moment(data.todo.time),rules: [{ type: 'object', required: true, message: '请选择时间!'}]})(
				            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
				        )}
			        </FormItem>
			        <FormItem {...formItemLayout} label="重要性" >
			          {getFieldDecorator('importance',{initialValue:data.todo.importance||'0'})(
			            <RadioGroup>
			              <Radio value="0">重要</Radio>
			              <Radio value="1">一般</Radio>
			            </RadioGroup>
			          )}
			        </FormItem>
			        <FormItem {...formItemLayout} label="状态">
						{getFieldDecorator('status',  {initialValue:data.todo.status||"0",rules: [{required: true, message: '请选择状态!'}]})(
				            <Select>
				              <Option value="0" style={{color:'#d2eafb'}}>将要完成</Option>
				              <Option value="1" style={{color:'#fcdbd9'}}>已经完成</Option>
				              <Option value="2" style={{color:'#d9d9d9'}}>搁置状态</Option>
				            </Select>
				          )}
			        </FormItem>
					<FormItem {...formItemLayout} label="类型">
						{getFieldDecorator('type',  {initialValue:data.todo.type||"schedule",rules: [{required: true, message: '请选择类型!'}]})(
				            <Select>
				              <Option value="schedule">日程<Icon type="check-square-o"/></Option>
				              <Option value="birthday">生日<Icon type="gift"/></Option>
				              <Option value="memorial">纪念日<Icon type="heart-o"/>  </Option>
				              <Option value="countdown">倒数日<Icon type="calendar"/></Option>
				            </Select>
				          )}
			        </FormItem>
			        <FormItem {...formItemLayout} label="详情">
			        	{getFieldDecorator('desc', {initialValue:data.todo.desc||'',rules: [{ required: true, message: '请输入详情!'}]})(
			        		<Input type="textarea" rows={4} />
			        	)}
			        </FormItem>
    			</Form>
    		</Modal>
		);
	}
}
TodoModel = Form.create()(TodoModel);
export default TodoModel;