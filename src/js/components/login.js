import React from 'react';
import {Row, Col} from 'antd';
import { Form, Icon, Input, Button, Checkbox,Select } from 'antd';
import { Tabs, Table } from 'antd';
import '../../css/login.css'

const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit (e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (err) {
          console.log('err:', err);
        }
        this.props.submit(values)
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入账号' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      );
    }
  }

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Rname:'',
            password:''
        }
        this.handleClick = this.handleClick.bind(this);     
    }
    handleClick (value) {
        this.props.login({
            account: value.account,
            password: value.password
        });
        console.log(value,'login')
    }
    render () {
        return (
            <div id='login'>
            <WrappedNormalLoginForm submit={this.handleClick}/>         
            </div>
        )
    }
}
