import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import '../../css/login.css'

const TabPane = Tabs.TabPane;
const Option = Select.Option;


export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            account:'',
            password:''
        }
        this.handleAccount = this.handleAccount.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        
    }
    handleClick () {
        this.props.login(this.state);
    }
    handleAccount (e) {
      this.setState({account : e.target.value})
    }
    handlePassword (e) {
      this.setState({password : e.target.value})
    }

    render () {
        return (
            <div id='login'>
              <div className="center">
              <h2>图书管理系统</h2>
              <h6>管理员登录页</h6>
              <Row className="row">
              <Col span={4} ><label>账号</label></Col>
              <Col span={16} ><Input onChange={this.handleAccount} /></Col>
              </Row>
              <Row className="row">
              <Col span={4} ><label>密码</label></Col>
              <Col span={16} ><Input onChange={this.handlePassword} type="password"/></Col>
              </Row>
              <Col span={4} offset={10}><Button onClick={this.handleClick}>登录</Button></Col>
              </div>
            </div>
        )
    }
}